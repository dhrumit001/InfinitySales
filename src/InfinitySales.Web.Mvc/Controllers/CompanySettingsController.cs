using Abp.Application.Services.Dto;
using Abp.Authorization;
using InfinitySales.Controllers;
using InfinitySales.MultiTenancy;
using InfinitySales.Settings.CompanySettings;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InfinitySales.Web.Mvc.Controllers
{
    [AbpAllowAnonymous]
    public class CompanySettingsController : InfinitySalesControllerBase
    {
        private readonly ICompanySettingAppService _companySettingAppService;

        public CompanySettingsController(ICompanySettingAppService companySettingAppService)
        {
            _companySettingAppService = companySettingAppService;
        }

        public async Task<IActionResult> Index()
        {
            var output = await _companySettingAppService.GetCompanyDetails(new EntityDto(AbpSession.TenantId.Value));
            return View(output);
        }
    }
}