using Abp.Auditing;
using Abp.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace InfinitySales.Settings.UserSettings.Dto
{
    public class ChangePasswordDto
    {
        [Required,StringLength(AbpUserBase.MaxPlainPasswordLength)]
        [DisableAuditing]
        public string CurrentPassword { get; set; }
        [StringLength(AbpUserBase.MaxPlainPasswordLength)]

        [Required,DisableAuditing]
        public string NewPassword { get; set; }
        [StringLength(AbpUserBase.MaxPlainPasswordLength)]

        [Required,DisableAuditing]
        public string ConfirmPassword { get; set; }
    }
}
