using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryMap.Models
{
    public class ApplicationDb : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDb(DbContextOptions<ApplicationDb> options) : base(options)
        {

        }
        public DbSet<Century> Century { get; set; }
        public DbSet<Country> Country { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
