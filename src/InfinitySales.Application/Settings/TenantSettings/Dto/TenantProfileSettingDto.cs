using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.MultiTenancy;
using InfinitySales.MultiTenancy;
using System.ComponentModel.DataAnnotations;

namespace InfinitySales.Settings.TenantSettings.Dto
{
    [AutoMap(typeof(Tenant),typeof(TenantDetail))]
    public class TenantProfileSettingDto 
    {
        [Required]
        [StringLength(AbpTenantBase.MaxNameLength)]
        public string Name { get; set; }

        [StringLength(TenantDetail.MaxStreetLength)]
        public string Street { get; set; }

        [StringLength(TenantDetail.MaxCityLength)]
        public string City { get; set; }

        [StringLength(TenantDetail.MaxStateLength)]
        public string State { get; set; }

        [StringLength(TenantDetail.MaxCountryLength)]
        public string Country { get; set; }

        [StringLength(TenantDetail.MaxPhoneLength)]
        public string Phone { get; set; }

        [StringLength(TenantDetail.MaxMobileLength)]
        public string Mobile { get; set; }
    }
}
