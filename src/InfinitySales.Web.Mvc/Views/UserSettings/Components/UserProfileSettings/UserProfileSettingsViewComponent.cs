using InfinitySales.Settings.UserSettings;
using InfinitySales.Users;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfinitySales.Web.Views.UserSettings.Components.UserProfileSettings
{
    public class UserProfileSettingsViewComponent : InfinitySalesViewComponent
    {
        private readonly UserSettingAppService _userSettingAppService;
        public UserProfileSettingsViewComponent(UserSettingAppService userSettingAppService)
        {
            _userSettingAppService = userSettingAppService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var model = await _userSettingAppService.GetUserProfileSettingForEdit();
            return View(model);
        }
    }
}
