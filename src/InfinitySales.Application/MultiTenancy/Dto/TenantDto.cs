using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.MultiTenancy;

namespace InfinitySales.MultiTenancy.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantDto : EntityDto
    {
        [Required]
        [StringLength(AbpTenantBase.MaxTenancyNameLength)]
        [RegularExpression(AbpTenantBase.TenancyNameRegex)]
        public string TenancyName { get; set; }

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

        public bool IsActive { get; set; }
    }
}
