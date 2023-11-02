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
            return _dbcontext.Process
                .Join(
                    _dbcontext.ProcessMatrix,
                    process => process.ID,
                    matrix => matrix.IDProcess,
                    (process, matrix) => new
                    {
                        process.ID,
                        process.Date,
                        process.Status,
                        matrix.MatrixName,
                        matrix.Rows,
                        matrix.Columns
                    })
                .AsQueryable();
        }
    }
}
