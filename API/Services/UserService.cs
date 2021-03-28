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
        // Post a new user
        public async Task PostNewUser(
            string _firstName,
            string _lastName, 
            string _email)
        {
            User newUser = new User();
            newUser.FirstName = _firstName;
            newUser.LastName = _lastName;
            newUser.Email = _email;
            await _db.User.AddAsync(newUser);
            await _db.SaveChangesAsync();
        }
    }
}
