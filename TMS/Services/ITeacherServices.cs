using TMS.Models;

namespace TMS.Services
{
    public interface ITeacherServices
    {
        //retrive all TeacherModel record
        IEnumerable<TeacherModel> GetAll();
        //retrive single TeacherModel record by id
        TeacherModel GetTeacher(int id);
        //delete TeacherModel record by id
        int DeleteTeacher(int id);
        //Update the existing TeacherModel
        void UpdateTeacher(TeacherModel model);
        //Create a new TeacherModel
        bool CreateTeacher(TeacherModel model);
    }
}
