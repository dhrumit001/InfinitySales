using Abp.AutoMapper;
using InfinitySales.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfinitySales.Settings.UserSettings.Dto
{
    [AutoMapFrom(typeof(User))]
    public class GetUserMiniProfileOutput
    {
        public string FullName { get; set; }
        public string[] RoleNames { get; set; }
        public string GetRoleNamesString()
        {
            if (RoleNames == null)
                return string.Empty;

            return string.Join(", ", RoleNames);
        }
    }
}
