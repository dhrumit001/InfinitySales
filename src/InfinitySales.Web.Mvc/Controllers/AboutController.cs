using Microsoft.AspNetCore.Mvc;
using Abp.AspNetCore.Mvc.Authorization;
using InfinitySales.Controllers;

namespace InfinitySales.Web.Controllers
{
    [AbpMvcAuthorize]
    public class AboutController : InfinitySalesControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}
