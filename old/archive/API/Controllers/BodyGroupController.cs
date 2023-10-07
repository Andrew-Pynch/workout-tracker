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
    public class BodyGroupController : ControllerBase
    {
        private ModelService _ms = new ModelService();

        // GET /api/bodygroup/get/list
        [HttpGet("get/list")]
        public async Task<List<Bodygroup>> GetAllBodyGroupsAsync()
        {
            return await _ms.GetAllBodyGroups();
        }

        // GET /api/bodygroup/get/id
        [HttpGet("get/{_id:int}")]
        public async Task<Bodygroup> GetBodyGroupByIdAsync(int _id)
        {
            return await _ms.GetBodyGroupById(_id);
        }
    }
}
