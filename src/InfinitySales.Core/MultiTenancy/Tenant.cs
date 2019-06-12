using Abp.MultiTenancy;
using InfinitySales.Authorization.Users;
using System.ComponentModel.DataAnnotations.Schema;

namespace InfinitySales.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {
        }

        public Tenant(string tenancyName, string name, long primaryUserId)
            : base(tenancyName, name)
        {
            PrimaryUserId = primaryUserId;
        }

        public virtual long PrimaryUserId { get; set; }

        [ForeignKey("PrimaryUserId")]
        public virtual User PrimaryUser { get; set; }

    }
}
