using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Organizations;
using Abp.Runtime.Caching;
using InfinitySales.Authorization.Roles;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using InfinitySales.MultiTenancy;
using Abp.UI;
using Abp.Localization;

namespace InfinitySales.Authorization.Users
{
    public class UserManager : AbpUserManager<Role, User>
    {
        private TenantManager _tenantManager;

        public UserManager(
    RoleManager roleManager,
    UserStore store,
    IOptions<IdentityOptions> optionsAccessor,
    IPasswordHasher<User> passwordHasher,
    IEnumerable<IUserValidator<User>> userValidators,
    IEnumerable<IPasswordValidator<User>> passwordValidators,
    ILookupNormalizer keyNormalizer,
    IdentityErrorDescriber errors,
    IServiceProvider services,
    ILogger<UserManager<User>> logger,
    IPermissionManager permissionManager,
    IUnitOfWorkManager unitOfWorkManager,
    ICacheManager cacheManager,
    IRepository<OrganizationUnit, long> organizationUnitRepository,
    IRepository<UserOrganizationUnit, long> userOrganizationUnitRepository,
    IOrganizationUnitSettings organizationUnitSettings,
    ISettingManager settingManager,
    IRepository<User, long> userRepository,
    TenantManager tenantManager)
    : base(
        roleManager,
        store,
        optionsAccessor,
        passwordHasher,
        userValidators,
        passwordValidators,
        keyNormalizer,
        errors,
        services,
        logger,
        permissionManager,
        unitOfWorkManager,
        cacheManager,
        organizationUnitRepository,
        userOrganizationUnitRepository,
        organizationUnitSettings,
        settingManager)
        {
            _tenantManager = tenantManager;
        }


        public override async Task<IdentityResult> DeleteAsync(User user)
        {
            if (user.TenantId.HasValue)
            {
                if (await IsUserIsPrimaryUserAsync(user.TenantId.Value, user.Id))
                {
                    throw new UserFriendlyException(string.Format(L("CanNotDeletePrimaryUser"), user.UserName));
                }
            }
            return await base.DeleteAsync(user);
        }

        public async Task<IdentityResult> ChangeStatusAsync(User user,bool isActive)
        {
            if (user.TenantId.HasValue)
            {
                if (await IsUserIsPrimaryUserAsync(user.TenantId.Value, user.Id))
                {
                    throw new UserFriendlyException(string.Format(L("CanNotChangeStatusOfPrimaryUser"), user.UserName));
                }
            }
            user.IsActive = isActive;

            return IdentityResult.Success;
        }

        public async Task<bool> IsUserIsPrimaryUserAsync(int tenantId, long userId)
        {
            var tenant = await _tenantManager.GetByIdAsync(tenantId);
            return userId == tenant.PrimaryUserId;

        }

    }

}
