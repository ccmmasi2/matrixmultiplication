using System.ComponentModel.DataAnnotations;
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
        [MaxLength(1, ErrorMessage = "The length of the field should be less than 1")]
        public string MatrixName { get; set; }


        [Required(ErrorMessage = "Required field")]
        [MaxLength(10, ErrorMessage = "The length of the field should be less than 10")]
        public string Tipo { get; set; }


        [Required(ErrorMessage = "Required field")]
        public int Rows { get; set; }


        [Required(ErrorMessage = "Required field")]
        public int Columns { get; set; }
    }
}
