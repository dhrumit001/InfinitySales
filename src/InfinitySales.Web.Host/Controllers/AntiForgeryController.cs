using Microsoft.AspNetCore.Antiforgery;
using InfinitySales.Controllers;

namespace InfinitySales.Web.Host.Controllers
{
    public class AntiForgeryController : InfinitySalesControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
