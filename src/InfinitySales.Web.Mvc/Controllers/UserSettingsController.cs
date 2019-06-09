using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Controllers;
using Abp.Authorization;
using Abp.Localization;
using Abp.Timing;
using InfinitySales.Authorization;
using InfinitySales.Settings.UserSettings;
using InfinitySales.Settings.UserSettings.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;

namespace InfinitySales.Web.Mvc.Controllers
{
    [AbpAuthorize(PermissionNames.Pages_UserSettings)]
    public class UserSettingsController : AbpController
    {
        private readonly IUserSettingAppService _userSettingAppService;

        public UserSettingsController(IUserSettingAppService userSettingAppService)
        {
            _userSettingAppService = userSettingAppService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task Update([FromBody] EditUserProfileSettingDto input)
        {

            await _userSettingAppService.UpdateUserProfileSetting(input);

            var cookieValue = CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(input.CultureName, input.CultureName));

            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                cookieValue,
                new CookieOptions
                {
                    Expires = Clock.Now.AddYears(2),
                    HttpOnly = true
                }
            );

        }
    }
}