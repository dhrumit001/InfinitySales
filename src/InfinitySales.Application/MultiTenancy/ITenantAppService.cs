using Abp.Application.Services;
using Abp.Application.Services.Dto;
using InfinitySales.MultiTenancy.Dto;

namespace InfinitySales.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
