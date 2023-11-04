using Matrix.Multiplication.AccessData.Repository.Interface;
using Matrix.Multiplication.DTOObjects.Models;

namespace Matrix.Multiplication.AccessData.ObjectRepository.Interface
{
    public interface IProcessRepository : IRepository<ProcessPpal>
    {
        IQueryable<object> GetProcessAndMatrixInfo();
        IQueryable<object> GetProcessById(int ID);
    }
}
