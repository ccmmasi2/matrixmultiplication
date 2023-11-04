﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Matrix.Multiplication.DTOObjects.Models
{
    public class ProcessMatrix
    {
        [Key]
        public int ID { get; set; }


        public int IDProcess { get; set; }
        [ForeignKey("IDProcess")]
        public ProcessPpal ProcessPpal { get; set; }


        [Required(ErrorMessage = "Required field")]
        [MaxLength(50, ErrorMessage = "The length of the field should be less than 50")]
        public string MatrixName { get; set; }


        [Required(ErrorMessage = "Required field")]
        public int Rows { get; set; }


        [Required(ErrorMessage = "Required field")]
        public int Columns { get; set; }

        public List<ProcessMatrixDetail> LProcessMatrixDetail = new List<ProcessMatrixDetail>();
    }
}
