﻿using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace InfinitySales.Authorization
{
    public class InfinitySalesAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_UserSettings, L("UserSettings"));
            context.CreatePermission(PermissionNames.Pages_TenantSettings, L("CompanySettings"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, InfinitySalesConsts.LocalizationSourceName);
        }
    }
}
