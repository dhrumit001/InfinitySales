using Abp.Application.Services.Dto;
using Abp.Authorization;
using InfinitySales.Authorization;
using InfinitySales.Controllers;
using InfinitySales.Settings.TenantSettings;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InfinitySales.Web.Mvc.Controllers
{
    [AbpAuthorize(PermissionNames.Pages_TenantSettings)]
    public class TenantSettingsController : InfinitySalesControllerBase
    {
        private readonly ITenantSettingAppService _tenantSettingAppService;

        public TenantSettingsController(ITenantSettingAppService companySettingAppService)
        {
            _tenantSettingAppService = companySettingAppService;
        }

        public async Task<IActionResult> Index()
        {
            var output = await _tenantSettingAppService.GetTenantProfileSettingForEdit();
            return View(output);
        }
    }
}