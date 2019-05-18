using System.Collections.Generic;
using InfinitySales.Roles.Dto;
using InfinitySales.Users.Dto;

namespace InfinitySales.Web.Models.Users
{
    public class UserListViewModel
    {
        public IReadOnlyList<UserDto> Users { get; set; }

        public IReadOnlyList<RoleDto> Roles { get; set; }
    }
}
