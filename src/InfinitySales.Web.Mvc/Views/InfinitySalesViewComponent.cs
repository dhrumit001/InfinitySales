using Abp.AspNetCore.Mvc.ViewComponents;

namespace InfinitySales.Web.Views
{
    public abstract class InfinitySalesViewComponent : AbpViewComponent
    {
        protected InfinitySalesViewComponent()
        {
            LocalizationSourceName = InfinitySalesConsts.LocalizationSourceName;
        }
    }
}
