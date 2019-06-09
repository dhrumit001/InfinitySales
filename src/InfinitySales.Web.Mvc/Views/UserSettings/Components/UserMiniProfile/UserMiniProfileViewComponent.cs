using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InfinitySales.Settings.UserSettings;

namespace InfinitySales.Web.Views.UserSettings.Components.UserMiniProfile
{
    public class UserMiniProfileViewComponent : InfinitySalesViewComponent
    {
        private readonly IUserSettingAppService _userSettingAppService;

        public UserMiniProfileViewComponent(IUserSettingAppService userSettingAppService)
        {
            _userSettingAppService = userSettingAppService;
        }

        public async  Task<IViewComponentResult> InvokeAsync()
        {
            var model = await _userSettingAppService.GetUserMiniProfile();

            return View(model);
        }
    }
}
