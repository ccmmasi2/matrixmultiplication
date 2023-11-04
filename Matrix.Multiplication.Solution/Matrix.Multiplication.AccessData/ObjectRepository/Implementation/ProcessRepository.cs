﻿using Matrix.Multiplication.AccessData.Data;
using Matrix.Multiplication.AccessData.ObjectRepository.Interface;
using Matrix.Multiplication.AccessData.Repository.Implementation;
using Matrix.Multiplication.DTOObjects.Models;
using Microsoft.EntityFrameworkCore;

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

        public object GetProcessById(int ID)
        {
            ProcessPpal ProcessObject = null;
            List<ProcessMatrix> LProcessMatrixObject = null;
            List<ProcessMatrixDetail> LProcessMatrixDetailObject = null;

            ProcessObject = (from ProcessPpal in _dbcontext.ProcessPpal
                             where ProcessPpal.ID == ID
                             select ProcessPpal).FirstOrDefault();

            LProcessMatrixObject = (from ProcessPpal in _dbcontext.ProcessPpal
                                    join matrix in _dbcontext.ProcessMatrix on ProcessPpal.ID equals matrix.IDProcess
                                    where ProcessPpal.ID == ID
                                    select matrix).ToList();

            foreach (ProcessMatrix item in LProcessMatrixObject)
            {
                LProcessMatrixDetailObject = new List<ProcessMatrixDetail>();
                LProcessMatrixDetailObject = (from matrix in _dbcontext.ProcessMatrix
                                              join matrixDetail in _dbcontext.ProcessMatrixDetail on matrix.ID equals matrixDetail.IDProcessMatrix
                                              where matrix.ID == item.ID
                                              select matrixDetail).ToList();
            }

            var result = new
            {
                processID = ProcessObject.ID,
                processDate = ProcessObject.Date,
                processStatus = ProcessObject.Status,
                matrix = LProcessMatrixObject.Select(matrix => new
                {
                    matrixName = matrix.MatrixName,
                    rows = matrix.Rows,
                    columns = matrix.Columns,
                    detail = LProcessMatrixDetailObject.Select(detail => new
                    {
                        row = detail.Row,
                        column = detail.Column,
                        value = detail.Value
                    }).ToList()
                }).ToList()
            };

            return result;
        }
    }
}
