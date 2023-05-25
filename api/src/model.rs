use diesel::prelude::Queryable;
use rocket::serde::Serialize;

#[derive(Serialize, Queryable)]
#[serde(crate = "rocket::serde")]
pub struct Workout {
    pub id: String,
    pub userid: String,
    pub date: chrono::NaiveDateTime,
    pub bodygroup: String,
    pub exercise: String,
    pub weight: f64,
    pub sets: i32,
    pub reps: i32,
    pub specialmodifier: Option<String>,
}
