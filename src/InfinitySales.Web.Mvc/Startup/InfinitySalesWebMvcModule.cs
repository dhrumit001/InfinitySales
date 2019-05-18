using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using InfinitySales.Configuration;
using Abp.MailKit;

namespace InfinitySales.Web.Startup
{
    [DependsOn(typeof(InfinitySalesWebCoreModule))]
    [DependsOn(typeof(AbpMailKitModule))]
    public class InfinitySalesWebMvcModule : AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public InfinitySalesWebMvcModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            Configuration.Navigation.Providers.Add<InfinitySalesNavigationProvider>();
            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(InfinitySalesWebMvcModule).GetAssembly());
        }
    }
}
