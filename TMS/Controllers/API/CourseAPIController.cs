using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TMS.Data;
using TMS.Global;
using TMS.Models;
using TMS.Services;

namespace TMS.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseAPIController : ControllerBase
    {
        protected readonly ApplicationDbContext _db;
        protected readonly ICourseServices _course;
        protected readonly ITeacherServices _teacher;
        public CourseAPIController(ApplicationDbContext db, ICourseServices course, ITeacherServices teacher)
        {
            _db = db;
            _course = course;
            _teacher = teacher;
        }
        //[HttpGet("{id}")]
        //public async Task<ActionResult<CourseVM>> GetCourse(int id)
        //{
        //    var course = await _db.Courses.Include(c => c.Teacher)
        //                               .FirstOrDefaultAsync(c => c.Id == id);

        //    if (course == null)
        //    {
        //        return NotFound();
        //    }

        //    var courseVM = new CourseVM
        //    {
        //        Id = course.Id,
        //        Name = course.Name,
        //        CreditHour = course.CreditHour,
        //        TeacherId = course.TeacherId,
        //        TeacherName = course.Teacher.firstName 
        //    };

        //    return Ok(courseVM);
        //}

        [HttpGet]
        public async Task<ActionResult<List<CourseVM>>> GetAllCourse()
        {
            if (_db.Courses == null)
            {
                return NotFound();
            }

            var data = await _db.Courses
                                .Include(c => c.Teacher)
                                .Select(c => new CourseVM
                                {
                                    Id = c.Id,
                                    Name = c.Name,
                                    CreditHour = c.CreditHour,
                                    TeacherId = c.TeacherId,
                                    TeacherName = c.Teacher.firstName
                                })
                                .ToListAsync();

            if (data == null || !data.Any())
            {
                return NotFound();
            }

            return Ok(data);
        }

        [HttpGet("GetDropdownData")]
        public async Task<ActionResult<IEnumerable<DropdownVM>>> GetDropdownData()
        {
            var teachers = await _teacher.GetAllAsync();
            return Ok(teachers);
        }

        [HttpPost]
        public ActionResult<bool> CreateCourse(CourseModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var addCourse = _course.CreateCourse(model);
            return Ok(addCourse);
        }

        [HttpPut]
        public ActionResult<int> UpdateCourse( CourseModel model)
        {
            if( model.Id == 0)
            {
                return BadRequest();
            }
            return _course.UpdateCourse(model);  
        }

        [HttpDelete]
        public ActionResult<int> DeleteCourse(int id)
        {
            if (_db.Courses == null)
            {
                return BadRequest();
            }
            return _course.DeleteCourse(id);
        }
    }

    public class CourseVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CreditHour { get; set; }
        public int TeacherId { get; set; }
        public string TeacherName { get; set; }

    }
}
