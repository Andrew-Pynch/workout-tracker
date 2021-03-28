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
    public class UserController : ControllerBase
    {
        private ModelService _ms = new ModelService();

        // GET /api/user/get/list
        [HttpGet("get/list")]
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _ms.GetAllUsers();
        }

        // GET /api/user/get/1
        [HttpGet("get/{_id:int}")]
        public async Task<User> GetUserByIdAsync(int _id)
        {
            return await _ms.GetUserById(_id);
        }
        
        // POST /api/user/post/{payload}
        [HttpPost(
            "post/{_firstName}/{_lastName}/{_email}"
            )]
        public async Task<IActionResult> PostNewUserAsync(
            string _firstName, 
            string _lastName, 
            string _email)
        {
            try
            {
                await _ms.PostNewUser(_firstName, _lastName, _email);
                return Ok();
            }
            catch
            {
                return StatusCode(500, "Unable to add new user");
            }
            
        }
    }
}
