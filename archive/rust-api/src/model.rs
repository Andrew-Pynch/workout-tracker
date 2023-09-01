use crate::schema::workout;
use chrono;
use diesel::prelude::*;
use rocket::serde::{Deserialize, Serialize};

#[derive(Serialize, Queryable)]
#[serde(crate = "rocket::serde")]
pub struct Workout {
    pub id: i32,
    pub user_id: String,
    pub date: chrono::NaiveDateTime,
    pub body_group: String,
    pub exercise: String,
    pub weight: f64,
    pub sets: i32,
    pub reps: i32,
    pub special_modifier: Option<String>,
}

#[derive(Insertable, Deserialize)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = workout)]
pub struct WorkoutInput {
    pub userid: String,
    pub exercisedate: chrono::NaiveDateTime,
    pub bodygroup: String,
    pub exercise: String,
    pub weight: f64,
    pub sets: i32,
    pub reps: i32,
    pub specialmodifier: Option<String>,
}
