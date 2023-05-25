// @generated automatically by Diesel CLI.

diesel::table! {
    Account (id) {
        id -> Text,
        userId -> Text,
        #[sql_name = "type"]
        type_ -> Text,
        provider -> Text,
        providerAccountId -> Text,
        refresh_token -> Nullable<Text>,
        access_token -> Nullable<Text>,
        expires_at -> Nullable<Int4>,
        token_type -> Nullable<Text>,
        scope -> Nullable<Text>,
        id_token -> Nullable<Text>,
        session_state -> Nullable<Text>,
    }
}

diesel::table! {
    Example (id) {
        id -> Text,
        createdAt -> Timestamp,
        updatedAt -> Timestamp,
    }
}

diesel::table! {
    Exercise (id) {
        id -> Text,
        userId -> Text,
        date -> Timestamp,
        bodyGroup -> Text,
        exercise -> Text,
        weight -> Float8,
        sets -> Int4,
        reps -> Int4,
        specialModifier -> Nullable<Text>,
    }
}

diesel::table! {
    Session (id) {
        id -> Text,
        sessionToken -> Text,
        userId -> Text,
        expires -> Timestamp,
    }
}

diesel::table! {
    User (id) {
        id -> Text,
        name -> Nullable<Text>,
        email -> Nullable<Text>,
        emailVerified -> Nullable<Timestamp>,
        image -> Nullable<Text>,
    }
}

diesel::joinable!(Account -> User (userId));
diesel::joinable!(Exercise -> User (userId));
diesel::joinable!(Session -> User (userId));

diesel::allow_tables_to_appear_in_same_query!(
    Account,
    Example,
    Exercise,
    Session,
    User,
);
