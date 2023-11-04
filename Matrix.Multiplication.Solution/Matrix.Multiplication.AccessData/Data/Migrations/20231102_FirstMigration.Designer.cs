using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Matrix.Multiplication.AccessData.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20231102_FirstMigration")]
    partial class FirstMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Matrix.Multiplication.DTOObjects.Models.ProcessPpal", b =>
            {
                b.Property<int>("ID")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                b.Property<DateTime>("Date")
                    .IsRequired()
                    .HasColumnType("Date");

                b.Property<bool>("Status")
                    .IsRequired() 
                    .HasColumnType("bit");

                b.HasKey("ID");

                b.ToTable("ProcessPpal");
            });

            modelBuilder.Entity("Matrix.Multiplication.DTOObjects.Models.ProcessMatrix", b =>
            {
                b.Property<int>("ID")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                b.Property<int>("IDProcess")
                    .IsRequired()
                    .HasColumnType("int");

                b.Property<string>("MatrixName")
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnType("nvarchar(50)");

                b.Property<int>("Rows")
                    .IsRequired()
                    .HasColumnType("int");

                b.Property<int>("Columns")
                    .IsRequired()
                    .HasColumnType("int");

                b.HasKey("ID");

                b.HasIndex("IDProcess");

                b.ToTable("ProcessMatrix");
            });

            modelBuilder.Entity("Matrix.Multiplication.DTOObjects.Models.ProcessMatrixDetail", b =>
            {
                b.Property<int>("ID")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                b.Property<int>("IDProcessMatrix")
                    .IsRequired()
                    .HasColumnType("int");

                b.Property<int>("Row")
                    .IsRequired()
                    .HasColumnType("int");

                b.Property<int>("Column")
                    .IsRequired()
                    .HasColumnType("int");

                b.Property<int>("Value")
                    .IsRequired()
                    .HasColumnType("int");

                b.HasKey("ID");

                b.HasIndex("IDProcessMatrix");

                b.ToTable("ProcessMatrixDetail");
            });

            base.BuildTargetModel(modelBuilder);
        }
    }
}
