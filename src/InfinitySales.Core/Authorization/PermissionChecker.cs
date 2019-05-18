using Abp.Authorization;
using InfinitySales.Authorization.Roles;
using InfinitySales.Authorization.Users;

namespace InfinitySales.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
