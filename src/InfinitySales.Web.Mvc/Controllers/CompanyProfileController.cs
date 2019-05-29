using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace InfinitySales.Web.Mvc.Controllers
{
    public class CompanyProfileController : AbpController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}