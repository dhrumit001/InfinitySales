using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using InfinitySales.Configuration;

namespace InfinitySales.Web.Host.Startup
{
    [DependsOn(
       typeof(InfinitySalesWebCoreModule))]
    public class InfinitySalesWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public InfinitySalesWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(InfinitySalesWebHostModule).GetAssembly());
        }
    }
}
