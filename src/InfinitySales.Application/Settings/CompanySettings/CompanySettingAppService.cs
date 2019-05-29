using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using InfinitySales.MultiTenancy;
using InfinitySales.MultiTenancy.Dto;
using InfinitySales.Settings.CompanySettings.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfinitySales.Settings.CompanySettings
{
    [AbpAllowAnonymous]
    public class CompanySettingAppService : ApplicationService, ICompanySettingAppService
    {
        private readonly TenantManager _tenantManager;
        public CompanySettingAppService(TenantManager tenantManager)
        {
            _tenantManager = tenantManager;
        }

        public async Task<CompanyDetailDto> GetCompanyDetails(EntityDto input)
        {
            var tenant = await _tenantManager.GetByIdAsync(input.Id);
            var companyDetail = new CompanyDetailDto { Id = tenant.Id, Name = tenant.Name };
            var tenantDetail = await _tenantManager.GetTenantDetailByTenantId(input.Id);

            if (tenantDetail != null)
            {
                companyDetail.Street = tenantDetail.Street;
                companyDetail.City = tenantDetail.City;
                companyDetail.State = tenantDetail.State;
                companyDetail.Phone = tenantDetail.Phone;
                companyDetail.Mobile = tenantDetail.Mobile;
                companyDetail.Country = tenantDetail.Country;
            }

            return companyDetail;
        }
        public async Task UpdateCompanyDetails(CompanyDetailDto input)
        {
            try
            {
                var tenant = await _tenantManager.GetByIdAsync(input.Id);
                ObjectMapper.Map(input, tenant);
                await _tenantManager.UpdateAsync(tenant);

                var tenantDetail = await _tenantManager.GetTenantDetailByTenantId(input.Id);
                if (tenantDetail == null)
                    tenantDetail = new TenantDetail();

                tenantDetail.TenantId = input.Id;
                tenantDetail.City = input.City;
                tenantDetail.State = input.State;
                tenantDetail.Country = input.Country;
                tenantDetail.Mobile = input.Mobile;
                tenantDetail.Phone = input.Phone;
                tenantDetail.Street = input.Street;
                await _tenantManager.InsertOrUpdateTenantDetailAsync(tenantDetail);

            }
            catch (Exception e)
            {

            }

        }

    }
}
