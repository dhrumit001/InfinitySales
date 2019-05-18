using InfinitySales.Users.Dto;
using System.Collections.Generic;

namespace InfinitySales.Roles.Dto
{
    public class GetUserForEditOutput
    {
        public UserDto User { get; set; }

        public IReadOnlyList<RoleDto> Roles { get; set; }
    }
}