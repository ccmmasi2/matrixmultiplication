using Matrix.Multiplication.AccessData.Data;
using Matrix.Multiplication.AccessData.ObjectRepository.Interface;
using Matrix.Multiplication.AccessData.Repository.Implementation;
using Matrix.Multiplication.DTOObjects.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Diagnostics;

namespace Matrix.Multiplication.AccessData.ObjectRepository.Implementation
{
    public class ProcessRepository : Repository<ProcessPpal>, IProcessRepository
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
                            Date = _dbcontext.ProcessPpal
                                .Where(p => p.ID == grouped.Key)
                                .Select(p => p.Date)
                                .FirstOrDefault(),
                            Status = _dbcontext.ProcessPpal
                                .Where(p => p.ID == grouped.Key)
                                .Select(p => p.Status ? "Valido" : "Invalido")
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
        public IQueryable<object> GetProcessById(int ID)
        {
            var query = from process in _dbcontext.ProcessPpal
                        join matrix in _dbcontext.ProcessMatrix on process.ID equals matrix.IDProcess
                        join detail in _dbcontext.ProcessMatrixDetail on matrix.ID equals detail.IDProcessMatrix
                        where process.ID == ID
                        group detail by new { process.ID, process.Date, process.Status, matrix.MatrixName, matrix.Rows, matrix.Columns } into groupedDetails
                        select new
                        {
                            processID = groupedDetails.Key.ID,
                            processDate = groupedDetails.Key.Date,
                            processStatus = groupedDetails.Key.Status,
                            matrix = new
                            {
                                matrixName = groupedDetails.Key.MatrixName,
                                rows = groupedDetails.Key.Rows,
                                columns = groupedDetails.Key.Columns,
                                detail = groupedDetails.Select(detailItem => new
                                {
                                    row = detailItem.Row,
                                    column = detailItem.Column,
                                    value = detailItem.Value
                                }).ToList()
                            }
                        };

            return query.AsQueryable();
        }

        //public IQueryable<object> GetProcessById(int ID)
        //{
        //    var query = from process in _dbcontext.Process
        //                join matrix in _dbcontext.ProcessMatrix on process.ID equals matrix.IDProcess
        //                join detail in _dbcontext.ProcessMatrixDetail on matrix.ID equals detail.IDProcessMatrix
        //                where process.ID == ID
        //                select new
        //                {
        //                    ProcessID = process.ID,
        //                    ProcessDate = process.Date,
        //                    ProcessStatus = process.Status,
        //                    Matix = new
        //                    {
        //                        MatrixName = matrix.MatrixName,
        //                        Rows = matrix.Rows,
        //                        Columns = matrix.Columns,
        //                        Detail = new
        //                        {
        //                            Row = detail.Row,
        //                            Column = detail.Column,
        //                            Value = detail.Value
        //                        }
        //                    }
        //                };

        //    var result = query.ToList();

        //    return query.AsQueryable();
        //}
    }
}
