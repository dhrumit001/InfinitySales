using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using InfinitySales.Configuration;
using InfinitySales.Web;

namespace InfinitySales.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class InfinitySalesDbContextFactory : IDesignTimeDbContextFactory<InfinitySalesDbContext>
    {
        public InfinitySalesDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<InfinitySalesDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            InfinitySalesDbContextConfigurer.Configure(builder, configuration.GetConnectionString(InfinitySalesConsts.ConnectionStringName));

            return new InfinitySalesDbContext(builder.Options);
        }
    }
}
