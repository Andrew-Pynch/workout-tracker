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
        // Get all body groups
        public async Task<List<Bodygroup>> GetAllBodyGroups()
        {
            return await _db.Bodygroup
                .ToListAsync();
        }

        // Get body group by id
        public async Task<Bodygroup> GetBodyGroupById(int _id)
        {
            return await _db.Bodygroup
                .Where(u => u.Id == _id)
                .FirstOrDefaultAsync();
        }
    }
}
