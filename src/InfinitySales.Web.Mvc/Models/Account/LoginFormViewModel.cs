using Abp.MultiTenancy;

namespace InfinitySales.Web.Models.Account
{
    public class LoginFormViewModel
    {
        public string ReturnUrl { get; set; }

        public bool IsMultiTenancyEnabled { get; set; }

        public MultiTenancySides MultiTenancySide { get; set; }
    }
}
