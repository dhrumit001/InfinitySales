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
            PrimaryUserId1 = primaryUserId;
        }

        public virtual long PrimaryUserId1 { get; set; }

        [ForeignKey("PrimaryUserId1")]
        public virtual User PrimaryUser { get; set; }

    }
}
