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
        // Get all users
        public async Task<List<User>> GetAllUsers()
        {
            return await _db.User.ToListAsync();
        }
        // Get a user by id
        public async Task<User> GetUserById(int _id)
        {
            return await _db.User
                .Where(u => u.Id == _id)
                .FirstOrDefaultAsync();
        }
    }
}
