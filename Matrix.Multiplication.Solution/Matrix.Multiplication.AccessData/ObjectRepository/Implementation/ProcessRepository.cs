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
            var query = from process in _dbcontext.Process
                        join matrix in _dbcontext.ProcessMatrix 
                        on process.ID equals matrix.IDProcess
                        select new
                        {
                            process.ID,
                            process.Date,
                            process.Status,
                            matrix.MatrixName,
                            matrix.Rows,
                            matrix.Columns
                        };

            return query
                .AsQueryable();
        }
    }
}
