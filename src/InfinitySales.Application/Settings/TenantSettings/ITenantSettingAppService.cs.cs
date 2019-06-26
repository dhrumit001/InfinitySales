using Abp.Application.Services;
using Abp.Application.Services.Dto;
using InfinitySales.Settings.TenantSettings.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfinitySales.Settings.TenantSettings
{
    public interface ITenantSettingAppService : IApplicationService
    {
        Task<TenantProfileSettingDto> GetTenantProfileSettingForEdit();
        Task UpdateTenantProfileSetting(TenantProfileSettingDto input);
    }
}
