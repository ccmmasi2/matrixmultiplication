using Microsoft.EntityFrameworkCore.Migrations;

namespace Matrix.Multiplication.AccessData.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProcessPpal",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Process", x => x.ID);
                });
             

            migrationBuilder.CreateTable(
                name: "ProcessMatrix",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IDProcess = table.Column<int>(type: "int", nullable: false),
                    MatrixName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Rows = table.Column<int>(type: "int", nullable: false),
                    Columns = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessMatrix", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ProcessMatrix_Process",
                        column: x => x.IDProcess,
                        principalTable: "ProcessPpal",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IXProcessMatrix_IDProcess",
                table: "ProcessMatrix",
                column: "IDProcess");


            migrationBuilder.CreateTable(
                name: "ProcessMatrixDetail",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IDProcessMatrix = table.Column<int>(type: "int", nullable: false),
                    Row = table.Column<int>(type: "int", nullable: false),
                    Column = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessMatrixDetail", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ProcessMatrixDetail_ProcessMatrix",
                        column: x => x.IDProcessMatrix,
                        principalTable: "ProcessMatrix",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IXProcessMatrixDetail_IDProcessMatrix",
                table: "ProcessMatrixDetail",
                column: "IDProcessMatrix");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProcessMatrixDetail");

            migrationBuilder.DropTable(
                name: "ProcessMatrix");

            migrationBuilder.DropTable(
                name: "ProcessPpal");
        }
    }
}
