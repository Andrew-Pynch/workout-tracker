from __future__ import print_function

import os.path

import pandas as pd
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = "1fWdUV91BP367UmVn5cKOZZzAPBm_ExAogeCP0O2t0CY"
WORKSHEETS = ["Chest", "Arms", "Shoulders", "Back", "Core", "Legs"]


def main():
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
                    date = row[0]
                    # Change the loop iteration step to 2 to skip the 'R' columns
                    for i in range(1, len(row) - 1, 2):
                        weight_r_pair = f"{row[i]} {row[i+1]}".strip()
                        if weight_r_pair and weight_r_pair.count(" ") == 1:
                            weight, r = weight_r_pair.split()
                            exercise_name = exercise_names[(i - 1) // 2]
                            print("PAIR", exercise_name, weight, r)
                            rows.append((date, exercise_name, weight, r))

                # Convert the rows to a Pandas dataframe and store it in the dictionary
                df = pd.DataFrame(
                    rows, columns=["date", "exercise_name", "weight", "r"]
                )
                dataframes[worksheet] = df

        # Print the head of each dataframe
        for worksheet, df in dataframes.items():
            print(f"Worksheet {worksheet}:")
            print(df.head())
            print()

    except HttpError as err:
        print(err)


if __name__ == "__main__":
    main()
