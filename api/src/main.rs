mod database;
mod model;
mod schema;

#[macro_use]
extern crate rocket;

use diesel::prelude::*;
use rocket::serde::json::Json;
use rocket::{Build, Rocket};

use self::model::*;
use self::schema::workout::dsl::*;

#[get("/")]
fn index() -> Json<Vec<Workout>> {
    let connection = &mut database::establish_connection();
    workout
        .load::<Workout>(connection)
        .map(Json)
        .expect("Error loading workouts")
}

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build().mount("/", routes![index])
}
