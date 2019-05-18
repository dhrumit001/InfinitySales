using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using InfinitySales.Authorization;

namespace InfinitySales
{
    [DependsOn(
        typeof(InfinitySalesCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class InfinitySalesApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<InfinitySalesAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(InfinitySalesApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
