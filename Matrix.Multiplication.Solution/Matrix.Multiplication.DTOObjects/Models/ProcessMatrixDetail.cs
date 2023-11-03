using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Matrix.Multiplication.DTOObjects.Models
{
    public class ProcessMatrixDetail
    {
        [Key]
        public int ID { get; set; }


        public int IDProcessMatrix { get; set; }
        [ForeignKey("IDProcessMatrix")]
        public ProcessMatrix ProcessMatrix { get; set; }


        [Required(ErrorMessage = "Required field")]
        public int Row { get; set; }


        [Required(ErrorMessage = "Required field")]
        public int Column { get; set; }


        [Required(ErrorMessage = "Required field")]
        public int Value { get; set; }
    }
}
