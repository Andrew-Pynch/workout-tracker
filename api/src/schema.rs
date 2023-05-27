// @generated automatically by Diesel CLI.

diesel::table! {
    workout (id) {
        id -> Int4,
        userid -> Text,
        exercisedate -> Timestamp,
        bodygroup -> Text,
        exercise -> Text,
        weight -> Float8,
        sets -> Int4,
        reps -> Int4,
        specialmodifier -> Nullable<Text>,
    }
}
