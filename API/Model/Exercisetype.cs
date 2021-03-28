using System;
using System.Collections.Generic;

namespace API.Model
{
    public partial class Exercisetype
    {
        public int Id { get; set; }
        public int BodyGroupId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ExampleVideo { get; set; }
    }
}
