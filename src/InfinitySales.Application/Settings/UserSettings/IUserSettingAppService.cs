using Abp.Application.Services;
using InfinitySales.Settings.UserSettings.Dto;
using System.Threading.Tasks;

namespace InfinitySales.Settings.UserSettings
{
    public interface IUserSettingAppService : IApplicationService
    {
        Task<GetUserMiniProfileOutput> GetUserMiniProfile();
        Task UpdateUserProfileSetting(EditUserProfileSettingDto input);
    }
}
