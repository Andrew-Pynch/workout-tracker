mod database;
mod model;
mod schema;
mod workout;

#[macro_use]
extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, from Rocket!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}

// use diesel::prelude::*;
// use rocket::serde::json::Json;
// use rocket::{Build, Rocket};

// use self::model::*;
// use self::schema::workout::dsl::*;

// #[launch]
// fn rocket() -> Rocket<Build> {
//     rocket::build().mount(
//         "/",
//         routes![
//             index,
//             workout::workout_controller::index,
//             workout::workout_controller::new_workout,
//             workout::workout_controller::update_workout,
//             workout::workout_controller::delete_workout,
//         ],
//     )
// }
