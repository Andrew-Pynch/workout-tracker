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
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private ModelService _ms = new ModelService();

        // GET /user
        [HttpGet]
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _ms.GetAllUsers();
        }

        // GET /user/{id}
        [Route("[controller]/{id}")]
        public async Task<User> GetUserByIdAsync(int _id)
        {
            return await _ms.GetUserById(_id);
        }
    }
}
