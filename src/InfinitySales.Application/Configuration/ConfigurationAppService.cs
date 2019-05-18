using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using InfinitySales.Configuration.Dto;

namespace InfinitySales.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : InfinitySalesAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
