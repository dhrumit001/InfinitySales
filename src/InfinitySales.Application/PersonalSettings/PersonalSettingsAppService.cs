using Abp.Application.Services;
using InfinitySales.Authorization.Users;
using System.Threading.Tasks;

namespace InfinitySales.PersonalSettings
{
    public class PersonalSettingsAppService : ApplicationService,IPersonalSettingsAppService
    {
        private readonly UserManager _userManager;

        public PersonalSettingsAppService(UserManager userManager)
        {
            _userManager = userManager;
        }

    }
}
