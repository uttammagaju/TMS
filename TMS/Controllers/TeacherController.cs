using Microsoft.AspNetCore.Mvc;

namespace TMS.Controllers
{
    public class TeacherController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
