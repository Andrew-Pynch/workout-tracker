using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public partial class ModelService
    {
        private readonly workout_trackerContext _db;

        public ModelService()
        {
            _db = new workout_trackerContext();
        }
    }
}
