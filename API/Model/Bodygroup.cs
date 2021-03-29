using System;
using System.Collections.Generic;

namespace API.Model
{
    public partial class Bodygroup
    {
        public Bodygroup()
        {
            Exercise = new HashSet<Exercise>();
            Workoutlog = new HashSet<Workoutlog>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Exercise> Exercise { get; set; }
        public virtual ICollection<Workoutlog> Workoutlog { get; set; }
    }
}
