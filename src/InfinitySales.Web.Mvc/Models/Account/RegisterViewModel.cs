using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.Auditing;
using Abp.Authorization.Users;
using Abp.Extensions;
using Abp.MultiTenancy;
using InfinitySales.Validation;

namespace InfinitySales.Web.Models.Account
{
    //public class RegisterViewModel : IValidatableObject
    public class RegisterViewModel
    {
        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxSurnameLength)]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }

        [MaxLength(AbpUserBase.MaxPlainPasswordLength)]
        [MinLength(AbpUserBase.MinPlainPasswordLength)]
        [DisableAuditing]
        public string Password { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(AbpTenantBase.MaxNameLength)]
        [MinLength(AbpTenantBase.MinNameLength)]
        public string TenancyName { get; set; }

        public bool IsExternalLogin { get; set; }

        public string ExternalLoginAuthSchema { get; set; }

        //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        //{
        //    if (!UserName.IsNullOrEmpty())
        //    {
        //        if (!UserName.Equals(EmailAddress) && ValidationHelper.IsEmail(UserName))
        //        {
        //            yield return new ValidationResult("Username cannot be an email address unless it's the same as your email address!");
        //        }
        //    }
        //}
    }
}
