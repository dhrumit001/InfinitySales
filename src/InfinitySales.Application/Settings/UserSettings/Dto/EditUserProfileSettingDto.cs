using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Localization;
using InfinitySales.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace InfinitySales.Settings.UserSettings.Dto
{
    [AutoMapTo(typeof(User))]
    public class EditUserProfileSettingDto 
    {

        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxSurnameLength)]
        public string Surname { get; set; }

        [StringLength(AbpUserBase.MaxPhoneNumberLength)]
        public virtual string PhoneNumber { get; set; }

        [Required]
        public string CultureName { get; set; }

    }
}
