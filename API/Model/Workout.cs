﻿using System;
using System.Collections.Generic;

namespace API.Model
{
    public partial class Workout
    {
        public int Id { get; set; }
        public int BodyGroupId { get; set; }
        public int UserId { get; set; }
        public int ExerciseId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan? Time { get; set; }
        public float? Weight { get; set; }
        public float? Sets { get; set; }
        public float? Reps { get; set; }

        public virtual Bodygroup BodyGroup { get; set; }
        public virtual User User { get; set; }
    }
}
