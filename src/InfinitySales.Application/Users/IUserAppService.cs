using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using InfinitySales.Roles.Dto;
using InfinitySales.Users.Dto;

namespace InfinitySales.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, EditUserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();
        Task ChangeLanguage(ChangeUserLanguageDto input);
        LoadResult GetAll(DataSourceLoadOptionsBase param);
    }
}
