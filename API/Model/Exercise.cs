using System;
using System.Collections.Generic;

namespace API.Model
{
    public partial class Exercise
    {
        public int Id { get; set; }
        public int BodyGroupId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ExampleVideo { get; set; }

        public virtual Bodygroup BodyGroup { get; set; }
        public virtual User User { get; set; }
    }
}
