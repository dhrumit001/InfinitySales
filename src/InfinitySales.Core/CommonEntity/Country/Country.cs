using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace InfinitySales.CommonEntity.Country
{
    [Table("AbpCountries")]
    public class ApplicationCountry : FullAuditedEntity, IMayHaveTenant
    {
        //
        // Summary:
        //     The maximum name length.
        public const int MaxNameLength = 10;
        //
        // Summary:
        //     The maximum display name length.
        public const int MaxDisplayNameLength = 64;

        public ApplicationCountry() { }

        public ApplicationCountry(int? tenantId, string name, string displayName, bool isDisabled = false)
        {
            TenantId = tenantId;
            Name = name;
            DisplayName = displayName;
            IsDisabled = isDisabled;
        }

        public virtual int? TenantId { get; set; }

        [Required]
        [StringLength(64)]
        public virtual string DisplayName { get; set; }

        [Required]
        [StringLength(20)]
        public virtual string Name { get; set; }
        public virtual bool IsDisabled { get; set; }
    }
}
