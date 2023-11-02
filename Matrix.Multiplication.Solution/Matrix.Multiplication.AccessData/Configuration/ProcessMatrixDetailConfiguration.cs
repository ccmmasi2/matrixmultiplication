using Matrix.Multiplication.DTOObjects.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Matrix.Multiplication.AccessData.Configuration
{
    public class ProcessMatrixDetailConfiguration : IEntityTypeConfiguration<ProcessMatrixDetail>
    {
        public void Configure(EntityTypeBuilder<ProcessMatrixDetail> builder)
        {
            builder.Property(c => c.ID).IsRequired();
            builder.Property(c => c.IDProcessMatrix).IsRequired();
            builder.Property(c => c.Row).IsRequired();
            builder.Property(c => c.Column).IsRequired();
            builder.Property(c => c.Value).IsRequired();

            builder.HasOne(e => e.ProcessMatrix).WithMany().HasForeignKey(e => e.IDProcessMatrix);
        }
    }
}