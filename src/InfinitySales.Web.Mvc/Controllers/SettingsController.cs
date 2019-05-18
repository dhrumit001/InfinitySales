using InfinitySales.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace InfinitySales.Web.Mvc.Controllers
{
    public class SettingsController : InfinitySalesControllerBase
    {

        public SettingsController()
        {

        }

        public IActionResult Index()
        {
            return View();
        }
    }
}