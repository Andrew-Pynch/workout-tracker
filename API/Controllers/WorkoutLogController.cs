using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services;
using API.Model;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutLogController : ControllerBase
    {
        private ModelService _ms = new ModelService();

        // GET /api/workoutlog/get/list
        [HttpGet("get/list")]
        public async Task<List<Bodygroup>> GetAllBodyGroupsAsync()
        {
            return await _ms.GetAllBodyGroups();
        }
    }
}
