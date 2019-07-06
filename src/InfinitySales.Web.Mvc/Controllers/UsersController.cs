using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Authorization;
using InfinitySales.Authorization;
using InfinitySales.Controllers;
using InfinitySales.Users;
using InfinitySales.Web.Models.Users;
using InfinitySales.Web.Models.Common.Modals;
using Abp.Web.Models;

namespace InfinitySales.Web.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages_Users)]
    public class UsersController : InfinitySalesControllerBase
    {
        private readonly IUserAppService _userAppService;

        public UsersController(IUserAppService userAppService)
        {
            _userAppService = userAppService;
        }

        public ActionResult Index()
        {
            //var users = (await _userAppService.GetAll(new PagedResultRequestDto {MaxResultCount = int.MaxValue})).Items; // Paging not implemented yet
            //var roles = (await _userAppService.GetRoles()).Items;
            //var model = new UserListViewModel
            //{
            //    Users = users,
            //    Roles = roles
            //};
            return View();
        }

        [DontWrapResult]
        public JsonResult List(DataSourceLoadOptionsViewModel input)
        {
            return Json(_userAppService.GetAll(input));
        }

    }
}
