using Abp.Application.Navigation;
using Abp.Localization;
using InfinitySales.Authorization;

namespace InfinitySales.Web.Startup
{
    /// <summary>
    /// This class defines menus for the application.
    /// </summary>
    public class InfinitySalesNavigationProvider : NavigationProvider
    {
        public override void SetNavigation(INavigationProviderContext context)
        {
            context.Manager.MainMenu
                .AddItem(
                    new MenuItemDefinition(
                        PageNames.Home,
                        L("HomePage"),
                        url: "",
                        icon: "home",
                        requiresAuthentication: true
                    )
                ).AddItem(
                    new MenuItemDefinition(
                        PageNames.Tenants,
                        L("Tenants"),
                        url: "Tenants",
                        icon: "business",
                        requiredPermissionName: PermissionNames.Pages_Tenants
                    )
                ).AddItem(
                    new MenuItemDefinition(
                        "Settings",
                        L("Settings"),
                        icon: "menu"
                    ).AddItem(
                        new MenuItemDefinition(
                        PageNames.Users,
                        L("Users"),
                        url: "Users",
                        icon: "people",
                        requiredPermissionName: PermissionNames.Pages_Users
                    )
                  ).AddItem(
                        new MenuItemDefinition(
                        PageNames.Roles,
                        L("Roles"),
                        url: "Roles",
                        icon: "local_offer",
                        requiredPermissionName: PermissionNames.Pages_Roles
                    )
                  ).AddItem(
                        new MenuItemDefinition(
                        PageNames.MySettings,
                        L("MySettings"),
                        url: "UserSettings",
                        icon: "local_offer",
                        requiredPermissionName: PermissionNames.Pages_UserSettings
                    )
                  ).AddItem(
                        new MenuItemDefinition(
                        PageNames.TenantSettings,
                        L("TenantSettings"),
                        url: "TenantSettings",
                        icon: "local_offer",
                        requiredPermissionName: PermissionNames.Pages_TenantSettings
                    )
                  )
              );
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, InfinitySalesConsts.LocalizationSourceName);
        }
    }
}
