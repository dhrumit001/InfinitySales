using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using InfinitySales.Authorization;
using InfinitySales.MultiTenancy;
using InfinitySales.Settings.TenantSettings.Dto;
using System.Threading.Tasks;

namespace InfinitySales.Settings.TenantSettings
{
    [AbpAuthorize(PermissionNames.Pages_TenantSettings)]
    public class TenantSettingAppService : InfinitySalesAppServiceBase, ITenantSettingAppService
    {
        private readonly TenantManager _tenantManager;
        public TenantSettingAppService(TenantManager tenantManager)
        {
            _tenantManager = tenantManager;
        }

        public async Task<TenantProfileSettingDto> GetTenantProfileSettingForEdit()
        {
            var tenant = await GetCurrentTenantAsync();
            var tenantProfileSetting = new TenantProfileSettingDto { Name = tenant.Name };
            var tenantDetail = await _tenantManager.GetTenantDetailByTenantId(tenant.Id);

            if (tenantDetail != null)
            {
                ObjectMapper.Map(tenantDetail, tenantProfileSetting);
            }

            return tenantProfileSetting;
        }

        public async Task UpdateTenantProfileSetting(TenantProfileSettingDto input)
        {
            var tenant = await GetCurrentTenantAsync();
            ObjectMapper.Map(input, tenant);
            await _tenantManager.UpdateAsync(tenant);

            var tenantDetail = await _tenantManager.GetTenantDetailByTenantId(tenant.Id);
            if (tenantDetail == null)
                tenantDetail = new TenantDetail();

            ObjectMapper.Map(input, tenantDetail);

            await _tenantManager.InsertOrUpdateTenantDetailAsync(tenantDetail);
        }

    }
}
