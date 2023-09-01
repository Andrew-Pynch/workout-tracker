use diesel::prelude::*;
use rocket::http::Status;
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

#[patch("/workout/<id>", data = "<workout_data>")]
pub fn update_workout(
    id: i32,
    workout_data: Json<WorkoutInput>,
) -> Result<Json<Workout>, rocket::response::status::Custom<String>> {
    use crate::schema::workout::dsl::*;

    let connection = &mut database::establish_connection();

    let workout_form = workout_data.into_inner();

    let updated_workout = diesel::update(workout.filter(id.eq(id)))
        .set((
            userid.eq(workout_form.userid),
            exercisedate.eq(workout_form.exercisedate),
            bodygroup.eq(workout_form.bodygroup),
            exercise.eq(workout_form.exercise),
            weight.eq(workout_form.weight),
            sets.eq(workout_form.sets),
            reps.eq(workout_form.reps),
            specialmodifier.eq(workout_form.specialmodifier),
        ))
        .get_result::<Workout>(connection);

    match updated_workout {
        Ok(updated_workout) => Ok(Json(updated_workout)),
        Err(err) => Err(rocket::response::status::Custom(
            Status::InternalServerError,
            err.to_string(),
        )),
    }
}

#[delete("/workout/<id>")]
pub fn delete_workout(id: i32) -> rocket::response::status::NoContent {
    use crate::schema::workout::dsl::{workout as workout_table, *};
    use rocket::response::status;

    let connection = &mut database::establish_connection();

    diesel::delete(workout_table.find(id))
        .execute(connection)
        .expect("Error deleting workout");

    status::NoContent
}
