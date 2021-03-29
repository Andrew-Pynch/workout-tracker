using System;
using System.Collections.Generic;

namespace API.Model
{
    public partial class User
    {
        public User()
        {
            Exercise = new HashSet<Exercise>();
            Workout = new HashSet<Workout>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Exercise> Exercise { get; set; }
        public virtual ICollection<Workout> Workout { get; set; }
    }
}
