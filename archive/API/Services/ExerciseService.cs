using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public partial class ModelService
    {
        // Get all exercises
        public async Task<List<Exercise>> GetAllExercises()
        {
            return await _db.Exercise
                .ToListAsync();
        }

        // Get exercise by id
        public async Task<Exercise> GetExerciseById(int _id)
        {
            return await _db.Exercise
                .Where(u => u.Id == _id)
                .FirstOrDefaultAsync();
        }

        // Get a body group by exercise id
        public async Task<Bodygroup> GetBodyGroupByExerciseId(int _id)
        {
            Bodygroup result = await _db.Exercise
                .Where(u => u.Id == _id)
                .Select(u => u.BodyGroup)
                .FirstOrDefaultAsync();
            return result;
        }

        // Get default exercises 
        public async Task<List<Exercise>> GetDefaultExercises()
        {
            return await _db.Exercise
                .Where(u => u.Id == 4)
                .ToListAsync();
        }

        // Post a new exercise
        public async Task PostNewExercise(Exercise _newExercise)
        {
            try
            {
                await _db.Exercise.AddAsync(_newExercise);
                await _db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
