using Abp.AutoMapper;
using InfinitySales.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfinitySales.Settings.UserSettings.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UserProfileSettingDto
    {
        public string EmailAddress { get; set; }
        
        public string Name { get; set; }

        public string Surname { get; set; }

        public virtual string PhoneNumber { get; set; }

        public string CultureName { get; set; }
    }
}
