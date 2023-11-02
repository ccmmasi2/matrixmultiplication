using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Matrix.Multiplication.DTOObjects.Models;

namespace Matrix.Multiplication.AccessData.Configuration
{
    public class ProcessConfiguration : IEntityTypeConfiguration<Process>
    {
        public void Configure(EntityTypeBuilder<Process> builder)
        {
            builder.Property(c => c.ID).IsRequired();
            builder.Property(c => c.Date).IsRequired();
            builder.Property(c => c.Status).IsRequired();
        }
    }
}
