using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services;
using API.Model;
using System.Net.Http;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutController : ControllerBase
    {
        private ModelService _ms = new ModelService();

        // GET /api/workout/get/list/user/id
        [HttpGet("get/list/user/{_id:int}")]
        public async Task<List<Workout>> GetAllUserWorkoutsAsync(
            int _id
            )
        {
            return await _ms.GetAllUserWorkouts(_id);
        }

        // GET /api/workout/get/list/user/id/bodygroup/id
        [HttpGet(
            "get/list/user/{_userId:int}/bodygroup/{_bodyGroupId:int}"
            )]
        public async Task<List<Workout>> GetAllUserWorkoutsByBodyGroupAsync(
            int _userId,
            int _bodyGroupId
            )
        {
            return await _ms.GetAllUserWorkoutsByBodyGroup(
                _userId, _bodyGroupId
                );
        }

        // GET /api/workout/get/list/user/id/exercise/id
        [HttpGet(
            "get/list/user/{_userId:int}/exercise/{_exerciseId:int}"
            )]
        public async Task<List<Workout>> GetAllUserWorkoutsByExerciseAsync(
            int _userId,
            int _exerciseId
            )
        {
            return await _ms.GetAllUserWorkoutsByExercise(
                _userId, _exerciseId
                );
        }

        // POST /api/workout/post
        [HttpPost("post")]
        public async Task<IActionResult> PostWorkoutAsync(
            [FromBody] Workout _newWorkout
            )
        {
            try
            {
                await _ms.PostNewWorkout(_newWorkout);
                return Ok();
            }
            catch
            {
                return StatusCode(500, "Unable to add new workout");
            }
        }
    }
}
