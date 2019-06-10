using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Domain.Uow;
using Abp.Localization;
using Abp.Runtime.Session;
using Abp.UI;
using InfinitySales.Authorization;
using InfinitySales.Authorization.Roles;
using InfinitySales.Authorization.Users;
using InfinitySales.Settings.UserSettings.Dto;
using InfinitySales.Users.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace InfinitySales.Settings.UserSettings
{
    [AbpAuthorize(PermissionNames.Pages_UserSettings)]
    public class UserSettingAppService : InfinitySalesAppServiceBase, IUserSettingAppService
    {
        private readonly RoleManager _roleManager;
        private readonly UserManager _userManager;
        private readonly ILanguageManager _languageManager;
        public UserSettingAppService(RoleManager roleManager, UserManager userManager, ILanguageManager languageManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _languageManager = languageManager;
        }

        public async Task<GetUserMiniProfileOutput> GetUserMiniProfile()
        {
            var output = new GetUserMiniProfileOutput();
            if (AbpSession.TenantId.HasValue)
            {
                var user = await GetCurrentUserAsync();
                output = ObjectMapper.Map<GetUserMiniProfileOutput>(user);
                output.RoleNames = (await UserManager.GetRolesAsync(user)).ToArray();
            }

            return output;
        }

        public async Task<GetUserProfileSettingForEditOutput> GetUserProfileSettingForEdit()
        {
            var output = new GetUserProfileSettingForEditOutput();
            if (AbpSession.TenantId.HasValue)
            {
                var user = await GetCurrentUserAsync();
                output.UserProfileSetting = ObjectMapper.Map<UserProfileSettingDto>(user);
                output.UserProfileSetting.CultureName = _languageManager.CurrentLanguage?.Name;
                output.Languages = _languageManager.GetLanguages().Where(l => !l.IsDisabled).ToList();
                return output;
            }
            return output;
        }

        public async Task UpdateUserProfileSetting(EditUserProfileSettingDto input)
        {
            var user = await _userManager.GetUserByIdAsync(AbpSession.GetUserId());
            ObjectMapper.Map(input, user);
            CheckErrors(await _userManager.UpdateAsync(user));

            await SettingManager.ChangeSettingForUserAsync(
                AbpSession.ToUserIdentifier(),
                LocalizationSettingNames.DefaultLanguage,
                input.CultureName
            );

        }

        public async Task ChangePassword(ChangePasswordDto input)
        {
            var user = await GetCurrentUserAsync();

            if (!await _userManager.CheckPasswordAsync(user, input.CurrentPassword))
                throw new UserFriendlyException("InvalidPassword", "Current password is not valid.");

            CheckErrors(await _userManager.ChangePasswordAsync(user, input.NewPassword));


        }
    }
}
