using Matrix.Multiplication.AccessData.Data;
using Matrix.Multiplication.AccessData.ObjectRepository.Interface;
using Matrix.Multiplication.AccessData.Repository.Implementation;
using Matrix.Multiplication.DTOObjects.Models;

namespace Matrix.Multiplication.AccessData.ObjectRepository.Implementation
{
    public class ProcessRepository : Repository<Process>, IProcessRepository
    {
        private readonly AppDbContext _dbcontext;

        public ProcessRepository(AppDbContext dbcontext) : base(dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public IQueryable<object> GetProcessAndMatrixInfo()
        {
            var query = from matrix in _dbcontext.ProcessMatrix
                        group matrix by matrix.IDProcess into grouped
                        select new
                        {
                            ProcessId = grouped.Key,
                            Date = _dbcontext.Process
                                .Where(p => p.ID == grouped.Key)
                                .Select(p => p.Date)
                                .FirstOrDefault(),
                            Status = _dbcontext.Process
                                .Where(p => p.ID == grouped.Key)
                                .Select(p => p.Status)
                                .FirstOrDefault(),
                            MatrixA = grouped
                                .Where(item => item.MatrixName == "A")
                                .Select(item => item.MatrixName)
                                .FirstOrDefault(),
                            MatrixB = grouped
                                .Where(item => item.MatrixName == "B")
                                .Select(item => item.MatrixName)
                                .FirstOrDefault(),
                            DimensionA = grouped
                                .Where(item => item.MatrixName == "A")
                                .Select(item => (item.Rows.ToString() + " x " + item.Columns.ToString()))
                                .FirstOrDefault(),
                            DimensionB = grouped
                                .Where(item => item.MatrixName == "B")
                                .Select(item => (item.Rows.ToString() + " x " + item.Columns.ToString()))
                                .FirstOrDefault(),
                        };

            return query.AsQueryable();
        }
    }
}
