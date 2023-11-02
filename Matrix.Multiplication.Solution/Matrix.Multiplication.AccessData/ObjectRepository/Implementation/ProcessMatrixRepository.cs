using Matrix.Multiplication.AccessData.Data;
using Matrix.Multiplication.AccessData.ObjectRepository.Interface;
using Matrix.Multiplication.AccessData.Repository.Implementation;
using Matrix.Multiplication.DTOObjects.Models;

namespace Matrix.Multiplication.AccessData.ObjectRepository.Implementation
{
    public class ProcessMatrixRepository : Repository<ProcessMatrix>, IProcessMatrixRepository
    {
        private readonly AppDbContext _dbcontext;

        public ProcessMatrixRepository(AppDbContext dbcontext) : base(dbcontext)
        {
            _dbcontext = dbcontext;
        }
    }
}
