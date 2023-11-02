using Matrix.Multiplication.AccessData.Repository.Interface;
using Matrix.Multiplication.DTOObjects.Models;

namespace Matrix.Multiplication.AccessData.ObjectRepository.Interface
{
    public interface IProcessRepository : IRepository<Process>
    {
        IQueryable<object> GetProcessAndMatrixInfo();
    }
}
