using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TMS.Data;
using TMS.Models;
using TMS.Services;

namespace TMS.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly ITeacherServices _Teacher;
        public TeacherAPIController(ApplicationDbContext db, ITeacherServices Teacher)
        {
            _db = db;
            _Teacher = Teacher;
        }

        [HttpGet("{id}")]
        public TeacherModel GetTeacherModels(int id)
        {
            if (_db.Teachers == null)
            {
                return null;
            }
            var teacher = _Teacher.GetTeacher(id);
            if (teacher == null)
            {
                return null;
            }
            return teacher;

        }

        [HttpPut("{id}")]
        public IActionResult PutTeacherModel(int id, TeacherModel model)
        {
            if (id != model.id)
            {
                return BadRequest();
            }
            _Teacher.UpdateTeacher(model);
            return NoContent();
        }
        [HttpPost("PostTeacher")]
        public ActionResult<bool> PostTeacher([FromBody] TeacherModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addTeacher = _Teacher.CreateTeacher(model);
            return Ok(addTeacher);
        }

        [HttpDelete("{id}")]
        public int DeleteTeacher(int id)
        {
           return _Teacher.DeleteTeacher(id);
        }
        [HttpGet]
        public List<TeacherModel> GetAllTeacher()
        {

            if (_db.Teachers == null)
            {
                return null;
            }
            var data =  _Teacher.GetAll();
            if (data == null)
            {
                return null;
            }
            return (List<TeacherModel>)data;
        }

    }
    
}
