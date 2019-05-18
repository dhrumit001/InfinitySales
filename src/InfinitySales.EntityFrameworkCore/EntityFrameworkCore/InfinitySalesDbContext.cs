using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using InfinitySales.Authorization.Roles;
using InfinitySales.Authorization.Users;
using InfinitySales.MultiTenancy;
using InfinitySales.CommonEntity.TimeZone;
using InfinitySales.CommonEntity.Country;

namespace InfinitySales.EntityFrameworkCore
{
    public class InfinitySalesDbContext : AbpZeroDbContext<Tenant, Role, User, InfinitySalesDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public virtual DbSet<ApplicationTimeZone> TimeZones { get; set; }
        public virtual DbSet<ApplicationCountry> Contries { get; set; }

        public InfinitySalesDbContext(DbContextOptions<InfinitySalesDbContext> options)
            : base(options)
        {
        }
    }
}
