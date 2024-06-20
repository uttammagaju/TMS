using TMS.Models;

namespace TMS.Services
{
    public interface ICourseServices
    {
        List<CourseModel> GetAll();
        CourseModel Get(int id);
        bool CreateCourse (CourseModel course);
        int UpdateCourse (CourseModel course);
        int DeleteCourse(int id);
    }
}
