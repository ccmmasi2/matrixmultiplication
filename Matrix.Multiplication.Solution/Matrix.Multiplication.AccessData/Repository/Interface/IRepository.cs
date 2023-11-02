using System.Linq.Expressions;

namespace Matrix.Multiplication.AccessData.Repository.Interface
{
    public interface IRepository<T> where T : class
    {
        Task<IQueryable<T>> AsQueryable();

        Task<IEnumerable<T>> GetAll(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = null
            );
        Task<T> GetOne(
            Expression<Func<T, bool>> filter = null,
            string includeProperties = null
            );
        Task Insert(T entity);
        bool Remove(T entity);
        bool Update(T entity);
        Task SaveChanges();
    }
}
