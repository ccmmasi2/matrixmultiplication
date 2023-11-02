using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Matrix.Multiplication.DTOObjects.Models;

namespace Matrix.Multiplication.AccessData.Configuration
{
    public class ProcessMatrixConfiguration : IEntityTypeConfiguration<ProcessMatrix>
    {
        public void Configure(EntityTypeBuilder<ProcessMatrix> builder)
        {
            builder.Property(c => c.ID).IsRequired();
            builder.Property(c => c.IDProcess).IsRequired();
            builder.Property(c => c.MatrixName).IsRequired().HasMaxLength(50);
            builder.Property(c => c.Rows).IsRequired();
            builder.Property(c => c.Columns).IsRequired();

            builder.HasOne(e => e.Process).WithMany().HasForeignKey(e => e.IDProcess);
        }
    }
}