using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.MultiTenancy;
using InfinitySales.MultiTenancy;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace InfinitySales.Settings.CompanySettings.Dto
{
    [AutoMap(typeof(Tenant))]
    public class CompanyDetailDto : EntityDto
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
