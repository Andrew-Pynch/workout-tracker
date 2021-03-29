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
    public class ExerciseController : ControllerBase
    {
        private ModelService _ms = new ModelService();

        // GET /api/exercise/get/list
        [HttpGet("get/list")]
        public async Task<List<Exercise>> GetAllExercisesAsync()
        {
            return await _ms.GetAllExercises();
        }

        // GET /api/exercise/get/id
        [HttpGet("get/{_id:int}")]
        public async Task<Exercise> GetExerciseByIdAsync(int _id)
        {
            return await _ms.GetExerciseById(_id);
        }

        // GET /api/exercise/bodygroup/get/id
        [HttpGet("get/bodygroup/{_id}")]
        public async Task<Bodygroup> GetBodyGroupByExerciseIdAsync(int _id)
        {
            return await _ms.GetBodyGroupByExerciseId(_id);
        }

        // POST /api/user/post
        [HttpPost("post")]
        public async Task<IActionResult> PostExerciseAsync([FromBody] Exercise _newExercise)
        {
            try
            {
                await _ms.PostNewExercise(_newExercise);
                return Ok();
            }
            catch
            {
                return StatusCode(500, "Unable to add new user");
            }

        }
    }
}
