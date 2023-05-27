mod database;
mod model;
mod schema;
mod workout;

#[macro_use]
extern crate rocket;

use diesel::prelude::*;
use rocket::serde::json::Json;
use rocket::{Build, Rocket};

use self::model::*;
use self::schema::workout::dsl::*;

#[get("/")]
fn index() -> Json<String> {
    // return a basic success string

    Json(String::from("Success"))
}

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build().mount(
        "/",
        routes![
            index,
            workout::workout_controller::index,
            workout::workout_controller::new_workout
        ],
    )
}
