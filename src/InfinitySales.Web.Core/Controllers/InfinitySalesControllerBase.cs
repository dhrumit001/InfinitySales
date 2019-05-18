using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace InfinitySales.Controllers
{
    public abstract class InfinitySalesControllerBase: AbpController
    {
        protected InfinitySalesControllerBase()
        {
            LocalizationSourceName = InfinitySalesConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
