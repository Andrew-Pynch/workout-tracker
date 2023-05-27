use diesel::prelude::*;
use rocket::response::status::NoContent;
use rocket::serde::json::Json;

use crate::database;
use crate::model::*;

#[get("/workouts")]
pub fn index() -> Json<Vec<Workout>> {
    use crate::schema::workout::dsl::workout;
    let connection = &mut database::establish_connection();
    workout
        .load::<Workout>(connection)
        .map(Json)
        .expect("Error loading workouts")
}

#[post("/workout", data = "<workout>")]
pub fn new_workout(workout: Json<WorkoutInput>) -> Json<Workout> {
    use crate::schema::workout;

    let connection = &mut database::establish_connection();

    diesel::insert_into(workout::table)
        .values(workout.into_inner())
        .execute(connection)
        .expect("Error adding workout");

    Json(
        workout::table
            .order(workout::id.desc())
            .first(connection)
            .unwrap(),
    )
}
