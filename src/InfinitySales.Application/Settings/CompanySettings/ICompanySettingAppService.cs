using Abp.Application.Services;
using Abp.Application.Services.Dto;
using InfinitySales.Settings.CompanySettings.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InfinitySales.Settings.CompanySettings
{
    public interface ICompanySettingAppService : IApplicationService
    {
        Task<CompanyDetailDto> GetCompanyDetails(EntityDto input);
        Task UpdateCompanyDetails(CompanyDetailDto input);
    }
}
