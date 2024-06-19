using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TMS.Models
{
    public class CourseModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int CreditHour { get; set; }
        public int TeacherId { get; set; }
        [ForeignKey("TeacherId")]
        [JsonIgnore]
        [ValidateNever]
        public virtual TeacherModel Teacher { get; set; }
    }
}
