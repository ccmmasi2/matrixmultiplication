using Matrix.Multiplication.AccessData.Repository.Interface;
using Matrix.Multiplication.DTOObjects.Models;

namespace Matrix.Multiplication.AccessData.ObjectRepository.Interface
{
    public interface IProcessPpalRepository : IRepository<ProcessPpal>
    {
        IQueryable<object> GetProcessAndMatrixInfo();
        ProcessPpal GetProcessById(int ID);
    }
}
