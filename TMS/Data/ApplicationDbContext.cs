using Microsoft.EntityFrameworkCore;
using TMS.Models;

namespace TMS.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
            
        public DbSet<Teacher> teachers { get; set; }
    }
}
