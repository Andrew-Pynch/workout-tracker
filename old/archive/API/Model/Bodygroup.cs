using System;
using System.Collections.Generic;

namespace API.Model
{
    public partial class Bodygroup
    {
        public Bodygroup()
        {
            Exercise = new HashSet<Exercise>();
            Workout = new HashSet<Workout>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Exercise> Exercise { get; set; }
        public virtual ICollection<Workout> Workout { get; set; }
    }
}
