using Abp;
using Abp.Application.Features;
using Abp.Domain.Repositories;
using Abp.MultiTenancy;
using Abp.UI;
using InfinitySales.Authorization.Users;
using InfinitySales.Editions;
using System.Linq;
using System.Threading.Tasks;

namespace InfinitySales.MultiTenancy
{
    public class TenantManager : AbpTenantManager<Tenant, User>
    {
        private IRepository<Tenant> _tenantRepository;
        private IRepository<TenantDetail> _tenantDetailRepository;
        public TenantManager(
            IRepository<Tenant> tenantRepository,
            IRepository<TenantFeatureSetting, long> tenantFeatureRepository,
            EditionManager editionManager,
            IRepository<TenantDetail> tenantDetailRepository,
            IAbpZeroFeatureValueStore featureValueStore)
            : base(
                tenantRepository,
                tenantFeatureRepository,
                editionManager,
                featureValueStore)
        {
            _tenantRepository = tenantRepository;
            _tenantDetailRepository = tenantDetailRepository;
        }

        public async override Task CreateAsync(Tenant tenant)
        {
            await ValidateTenantAsync(tenant);
            await TenantRepository.InsertAsync(tenant);
        }

        public async Task<TenantDetail> InsertOrUpdateTenantDetailAsync(TenantDetail tenantDetail)
        {
            return await (tenantDetail.IsTransient()
                ? _tenantDetailRepository.InsertAsync(tenantDetail)
                : _tenantDetailRepository.UpdateAsync(tenantDetail));
        }

        public async Task<TenantDetail> GetTenantDetailByTenantId(int tenantId)
        {
            var tenantDetail = await _tenantDetailRepository.FirstOrDefaultAsync(t => t.TenantId == tenantId);
            return tenantDetail;
        }
    }
}
