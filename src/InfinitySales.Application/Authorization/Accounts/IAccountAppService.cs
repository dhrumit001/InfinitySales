using System.Threading.Tasks;
using Abp.Application.Services;
using InfinitySales.Authorization.Accounts.Dto;

namespace InfinitySales.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
