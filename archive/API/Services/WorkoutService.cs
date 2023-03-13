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
        // Get all exercises for a given user
        public async Task<List<Workout>> GetAllUserWorkouts(int _id)
        {
            return await _db.Workout
                .Where(u => u.UserId == _id)
                .ToListAsync();
        }

        // Get all exercises for a given user by body group
        public async Task<List<Workout>> GetAllUserWorkoutsByBodyGroup(
            int _userId,
            int _bodyGroupdId
            )
        {
            return await _db.Workout
                .Where(
                u => u.UserId == _userId &&
                u.BodyGroupId == _bodyGroupdId
                )
                .ToListAsync();
        }

        // Get all exercises for a given user by exercise
        public async Task<List<Workout>> GetAllUserWorkoutsByExercise(
            int _userId,
            int _exerciseId
            )
        {
            return await _db.Workout
                .Where(
                u => u.UserId == _userId &&
                u.ExerciseId == _exerciseId
                )
                .ToListAsync();
        }

        // Post a new workout
        public async Task PostNewWorkout(Workout _newWorkout)
        {
            try
            {
                await _db.Workout.AddAsync(_newWorkout);
                await _db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
