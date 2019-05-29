using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace InfinitySales.MultiTenancy
{
    public class TenantDetail : Entity, IMustHaveTenant
    {
        public const int MaxStreetLength = 50;
        public const int MaxCityLength = 50;
        public const int MaxStateLength = 50;
        public const int MaxCountryLength = 50;
        public const int MaxPhoneLength = 15;
        public const int MaxMobileLength = 15;

        public int TenantId { get; set; }

        [StringLength(MaxStreetLength)]
        public string Street { get; set; }

        [StringLength(MaxCityLength)]
        public string City { get; set; }

        [StringLength(MaxStateLength)]
        public string State { get; set; }

        [StringLength(MaxCountryLength)]
        public string Country { get; set; }

        [StringLength(MaxPhoneLength)]
        public string Phone { get; set; }

        [StringLength(MaxMobileLength)]
        public string Mobile { get; set; }
    }
}
