using TMS.Data;
using TMS.Models;

namespace TMS.Services
{
    public class TeacherServices : ITeacherServices
    {
        private readonly ApplicationDbContext _db;
        public TeacherServices(ApplicationDbContext db) { 
        _db = db;
        }
        public bool CreateTeacher(TeacherModel model)
        {
            _db.Teachers.Add(model);
            _db.SaveChanges();
            return true;
        }

        public int DeleteTeacher(int id)
        {
            var did = id;
            var data = _db.Teachers.FirstOrDefault(u => u.id == id);
            _db.Teachers.Remove(data);
            _db.SaveChanges();
            return did;
        }

        public IEnumerable<TeacherModel> GetAll()
        {
            var data = _db.Teachers.ToList();
            return data;
        }

        public TeacherModel GetTeacher(int id)
        {
            var data = _db.Teachers.FirstOrDefault(u =>u.id == id);
            return data;
        }

        public void UpdateTeacher(TeacherModel model)
        {
            _db.Teachers.Update(model);
            _db.SaveChanges();
        }
    }
}
