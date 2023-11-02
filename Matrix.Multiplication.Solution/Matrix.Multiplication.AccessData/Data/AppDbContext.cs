using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Matrix.Multiplication.DTOObjects.Models;

namespace Matrix.Multiplication.AccessData.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Process> Process { get; set; }
        public DbSet<ProcessMatrix> ProcessMatrix { get; set; }
        public DbSet<ProcessMatrixDetail> ProcessMatrixDetail { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
