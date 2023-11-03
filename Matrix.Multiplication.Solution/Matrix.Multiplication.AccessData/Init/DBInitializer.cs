using Matrix.Multiplication.AccessData.Data;
using Matrix.Multiplication.DTOObjects.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Matrix.Multiplication.AccessData.Init
{
    public class DBInitializer : IDBInitializer
    {
        private readonly AppDbContext _db;

        public DBInitializer(AppDbContext db)
        {
            _db = db;
        }

        public void Initialize()
        {
            try
            {
                if (_db.Database.GetPendingMigrations().Count() > 0)
                {
                    _db.Database.Migrate();
                }
            }
            catch (Exception)
            {
                throw;
            }

            if (!_db.Process.Any())
            {
                var LProcessDataJson = File.ReadAllText("../Matrix.Multiplication.AccessData/Data/SeedData/Process.json");
                var LProcess = JsonSerializer.Deserialize<List<Process>>(LProcessDataJson);
                _db.Process.AddRange(LProcess);
            }

            if (!_db.ProcessMatrix.Any())
            {
                var LProcessMatrixDataJson = File.ReadAllText("../Matrix.Multiplication.AccessData/Data/SeedData/ProcessMatrix.json");
                var LProcessMatrix = JsonSerializer.Deserialize<List<ProcessMatrix>>(LProcessMatrixDataJson);
                _db.ProcessMatrix.AddRange(LProcessMatrix);
            }

            if (!_db.ProcessMatrixDetail.Any())
            {
                var LProcessMatrixDetailDataJson = File.ReadAllText("../Matrix.Multiplication.AccessData/Data/SeedData/ProcessMatrixDetail.json");
                var LProcessMatrixDetail = JsonSerializer.Deserialize<List<ProcessMatrixDetail>>(LProcessMatrixDetailDataJson);
                _db.ProcessMatrixDetail.AddRange(LProcessMatrixDetail);
            }

            if (_db.ChangeTracker.HasChanges())
                _db.SaveChanges();
        }
    }
}
