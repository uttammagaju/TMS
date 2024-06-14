using System.ComponentModel.DataAnnotations;

namespace TMS.Models
{
    public class TeacherModel
    {
        [Key]
        public int id { get; set; }
        [Required]
        [MaxLength(20)]
        public string firstName { get; set; }
        [Required]
        [MaxLength (20)]
        public string  lastName { get; set; }
        [Required]
        public string address { get; set; }
        [Required]
        public string gender { get; set; }  
        public DateTime dob { get; set; }
        [Required]
        public string qualification { get; set; }
        public double salary { get; set; }


    }
}
