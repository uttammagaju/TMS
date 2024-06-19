using TMS.Data;
using TMS.Models;

namespace TMS.Services
{
    public class CourseServices : ICourseServices
    {
        private readonly ApplicationDbContext _db;
        public CourseServices(ApplicationDbContext db)
        {
            _db= db;
        }
        public bool CreateCourse(CourseModel course)
        {
            _db.Courses.Add(course);
            _db.SaveChanges();
            return true;
        }

        public int DeleteCourse(int id)
        {
            var data = _db.Courses.FirstOrDefault(U => U.Id == id);
            _db.Courses.Remove(data);
            _db.SaveChanges();
            return id;
        }

        public CourseModel Get(int id)
        {
            var data = _db.Courses.FirstOrDefault(u => u.Id == id);
            return data;
        }

        public List<CourseModel> GetAll()
        {
            var data = _db.Courses.ToList();
            return data;
        }

        public int UpdateCourse(CourseModel course)
        {
            _db.Courses.Update(course);
            _db.SaveChanges();
            return course.Id;
        }
    }
}
