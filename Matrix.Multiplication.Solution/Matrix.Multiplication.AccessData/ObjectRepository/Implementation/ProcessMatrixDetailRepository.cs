﻿using Matrix.Multiplication.AccessData.Data;
using Matrix.Multiplication.AccessData.ObjectRepository.Interface;
using Matrix.Multiplication.AccessData.Repository.Implementation;
using Matrix.Multiplication.DTOObjects.Models;

namespace Matrix.Multiplication.AccessData.ObjectRepository.Implementation
{
    public class ProcessMatrixDetailRepository : Repository<ProcessMatrixDetail>, IProcessMatrixDetailRepository
    {
        private readonly AppDbContext _dbcontext;

        public ProcessMatrixDetailRepository(AppDbContext dbcontext) : base(dbcontext)
        {
            _dbcontext = dbcontext;
        }
    }
}
