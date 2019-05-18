using Microsoft.AspNetCore.Mvc.Razor.Internal;
using Abp.AspNetCore.Mvc.Views;
using Abp.Runtime.Session;

namespace InfinitySales.Web.Views
{
    public abstract class InfinitySalesRazorPage<TModel> : AbpRazorPage<TModel>
    {
        [RazorInject]
        public IAbpSession AbpSession { get; set; }

        protected InfinitySalesRazorPage()
        {
            LocalizationSourceName = InfinitySalesConsts.LocalizationSourceName;
        }
    }
}
