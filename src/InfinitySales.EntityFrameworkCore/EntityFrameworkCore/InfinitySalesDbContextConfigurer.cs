using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace InfinitySales.EntityFrameworkCore
{
    public static class InfinitySalesDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<InfinitySalesDbContext> builder, string connectionString)
        {
            builder.UseMySql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<InfinitySalesDbContext> builder, DbConnection connection)
        {
            builder.UseMySql(connection);
        }
    }
}
