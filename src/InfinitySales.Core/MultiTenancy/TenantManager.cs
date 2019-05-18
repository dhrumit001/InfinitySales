using Abp.Application.Features;
using Abp.Domain.Repositories;
using Abp.MultiTenancy;
using Abp.UI;
using InfinitySales.Authorization.Users;
using InfinitySales.Editions;
using System.Threading.Tasks;

namespace InfinitySales.MultiTenancy
{
    public class TenantManager : AbpTenantManager<Tenant, User>
    {
        private IRepository<Tenant> _tenantRepository;
        public TenantManager(
            IRepository<Tenant> tenantRepository,
            IRepository<TenantFeatureSetting, long> tenantFeatureRepository,
            EditionManager editionManager,
            IAbpZeroFeatureValueStore featureValueStore)
            : base(
                tenantRepository,
                tenantFeatureRepository,
                editionManager,
                featureValueStore)
        {
            _tenantRepository = tenantRepository;
        }

        public async override Task CreateAsync(Tenant tenant)
        {
            
            await ValidateTenantAsync(tenant);
            await TenantRepository.InsertAsync(tenant);
        }
    }
}
