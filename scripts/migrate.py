from __future__ import print_function

import os
import os.path
import re

import pandas as pd
import psycopg2
from dotenv import load_dotenv
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from psycopg2 import sql

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = "1fWdUV91BP367UmVn5cKOZZzAPBm_ExAogeCP0O2t0CY"
WORKSHEETS = ["Chest", "Arms", "Shoulders", "Back", "Core", "Legs"]


# Load environment variables from .env file
load_dotenv()

# Access environment variables
USER_ID = os.getenv("WORKOUT_USER_ID")
DATABASE_URL = os.getenv("WORKOUT_DATABASE_URL")


def get_sets_reps_special_modifier_string(r):
    # Use regex to match weight, sets, reps, and special_modifier_string
    match = re.match(r"(\d+(\.\d+)?[a-zA-Z]*)?x(\d+)([a-zA-Z]+)?", r)
    if match:
        sets_and_modifier, _, reps, special_modifier_string = match.groups()
        if sets_and_modifier:
            # Extract the numeric part and the alphabetical part separately
            sets_match = re.match(r"(\d+(\.\d+)?)([a-zA-Z]*)?", sets_and_modifier)
            sets, modifier = sets_match.groups()[0:3:2]
            sets = int(sets) if sets else None
            special_modifier_string = modifier if modifier else ""
        else:
            sets = None

        reps = int(reps) if reps else None
        if special_modifier_string is None:
            special_modifier_string = ""
    else:
        sets, reps, special_modifier_string = None, None, ""

    return sets, reps, special_modifier_string


def get_dataframes_from_google_sheets():
    """Shows basic usage of the Sheets API.
    Prints values from a sample spreadsheet.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        service = build("sheets", "v4", credentials=creds)

        # Initialize an empty dictionary to store the dataframes
        dataframes = {}

        # Loop through each worksheet and select relevant data into a dataframe
        for worksheet in WORKSHEETS:
            range_name = f"{worksheet}!A1:ZZ"
            result = (
                service.spreadsheets()
                .values()
                .get(spreadsheetId=SAMPLE_SPREADSHEET_ID, range=range_name)
                .execute()
            )
            values = result.get("values", [])

            if not values:
                print(f"No data found in worksheet {worksheet}.")
            else:
                # Get the exercise names from the column headers (first row of values)
                exercise_names = values[0][1::2]

                # Loop through each row of the data and extract relevant columns
                rows = []
                for row in values[1:]:
                    # parse out the date since some of the values have a trailing period
                    try:
                        date = pd.to_datetime(row[0].rstrip(".")).strftime("%Y-%m-%d")
                    except ValueError:
                        print(f"Invalid date found: {row[0]}, skipping row")
                        continue

                    # Change the loop iteration step to 2 to skip the 'R' columns
                    for i in range(1, len(row) - 1, 2):
                        weight_r_pair = f"{row[i]} {row[i+1]}".strip()
                        if weight_r_pair and weight_r_pair.count(" ") == 1:
                            weight, r = weight_r_pair.split()
                            exercise_name = exercise_names[(i - 1) // 2]
                            (
                                sets,
                                reps,
                                special_modifier_string,
                            ) = get_sets_reps_special_modifier_string(r)

                            print("PAIR", exercise_name, weight, r)

                            # if weight contains a letter, extract it and split it into weight and modifier
                            if re.search(r"[a-zA-Z]", weight):
                                weight_match = re.match(
                                    r"(\d+(\.\d+)?)([a-zA-Z]*)?", weight
                                )
                                weight, modifier = weight_match.groups()[0:3:2]
                                special_modifier_string = modifier if modifier else ""

                            rows.append(
                                (
                                    date,
                                    worksheet,
                                    exercise_name,
                                    float(weight),
                                    sets,
                                    reps,
                                    special_modifier_string,
                                )
                            )

                # Convert the rows to a Pandas dataframe and store it in the dictionary
                df = pd.DataFrame(
                    rows,
                    columns=[
                        "date",
                        "body_group",
                        "exercise_name",
                        "weight",
                        "sets",
                        "reps",
                        "special_modifier_string",
                    ],
                )
                dataframes[worksheet] = df

        # Print the head of each dataframe
        for worksheet, df in dataframes.items():
            print(f"Worksheet {worksheet}:")
            print(df.head())
            print()

        return dataframes

    except HttpError as err:
        print(err)


def save_dataframes_to_csv(dataframes):
    for worksheet_name, df in dataframes.items():
        file_name = f"{worksheet_name}.csv"
        df.to_csv(file_name, index=False)
        print(f"Saved dataframe '{worksheet_name}' to file '{file_name}'")


def load_dataframes_from_csv():
    dataframes = {}
    for worksheet_name in WORKSHEETS:
        file_name = f"{worksheet_name}.csv"
        df = pd.read_csv(file_name)
        dataframes[worksheet_name] = df

    for worksheet_name, df in dataframes.items():
        print(f"Worksheet {worksheet_name}:")
        print(df.head())
        print()
    return dataframes


def insert_exercises(dataframes, user_id, database_url):
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()

    for body_group, df in dataframes.items():
        for _, row in df.iterrows():
            (
                date,
                body_group,
                exercise_name,
                weight,
                sets,
                reps,
                special_modifier_string,
            ) = row  # Include body_group here

            # Add print statements before executing the query
            print(f"Inserting exercise:")
            print(f"User ID: {user_id}")
            print(f"Date: {date}")
            print(f"Body Group: {body_group}")
            print(f"Exercise Name: {exercise_name}")
            print(f"Weight: {weight}")
            print(f"Sets: {sets}")
            print(f"Reps: {reps}")
            print(f"Special Modifier: {special_modifier_string}")

            query = sql.SQL(
                """
                INSERT INTO "Exercise" ("id", "userId", "date", "bodyGroup", "exercise", "weight", "sets", "reps", "specialModifier")
                VALUES (uuid_generate_v4(), %s, %s, %s, %s, %s, %s, %s, %s);
                """
            )
            cur.execute(
                query,
                (
                    user_id,
                    date,
                    body_group,
                    exercise_name,
                    weight,
                    sets,
                    reps,
                    special_modifier_string,
                ),
            )

    # Commit the changes and close the connection
    conn.commit()
    cur.close()
    conn.close()


def main():
    dataframes = get_dataframes_from_google_sheets()
    # save_dataframes_to_csv(dataframes)
    # dataframes = load_dataframes_from_csv()
    insert_exercises(dataframes, USER_ID, DATABASE_URL)


if __name__ == "__main__":
    main()
