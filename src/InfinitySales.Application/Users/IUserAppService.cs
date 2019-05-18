using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using InfinitySales.Roles.Dto;
using InfinitySales.Users.Dto;

namespace InfinitySales.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, EditUserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
