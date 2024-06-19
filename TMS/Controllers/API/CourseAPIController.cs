using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TMS.Data;
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
        public CourseAPIController(ApplicationDbContext db, ICourseServices course)
        {
            _db = db;
            _course = course;
        }
        [HttpGet("{id}")]
        public CourseModel GetTeacher(int id)
        {
            if(_db.Courses == null)
            {
                return null;
            }
            var course = _course.Get(id);
            if(course == null)
            {
                return null;
            }
            return course;
        }

        [HttpGet]
        public List<CourseModel> GetAllCourse()
        { if(_db.Courses == null)
            {
                return null;
            }
            var data = _course.GetAll();
            if (data == null)
            {
                return null;
            }
            return data;
            
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
}
