

CREATE TABLE Workout (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    date TIMESTAMP(3) NOT NULL,
    bodyGroup TEXT NOT NULL,
    exercise TEXT NOT NULL,
    weight FLOAT8 NOT NULL,
    sets INT4 NOT NULL,
    reps INT4 NOT NULL,
    specialModifier TEXT
);

