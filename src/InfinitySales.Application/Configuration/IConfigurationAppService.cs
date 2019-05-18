using System.Threading.Tasks;
using InfinitySales.Configuration.Dto;

namespace InfinitySales.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
