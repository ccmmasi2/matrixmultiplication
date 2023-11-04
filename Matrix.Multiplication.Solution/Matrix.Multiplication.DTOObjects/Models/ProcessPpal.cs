using System.ComponentModel.DataAnnotations;

namespace Matrix.Multiplication.DTOObjects.Models
{
    public class ProcessPpal
    {
        [Key]
        public int ID { get; set; }


        [Required(ErrorMessage = "Required field")]
        public DateTime Date { get; set; }


        [Required(ErrorMessage = "Required field")]
        public bool Status { get; set; }

        public List<ProcessMatrix> LProcessMatrix = new List<ProcessMatrix>();
    }
}
