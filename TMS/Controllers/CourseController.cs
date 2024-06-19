using Microsoft.AspNetCore.Mvc;

namespace TMS.Controllers
{
    public class CourseController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
