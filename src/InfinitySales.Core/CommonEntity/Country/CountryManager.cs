using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfinitySales.CommonEntity.Country
{
    public class CountryManager : ICountryManager
    {
        private readonly IRepository<ApplicationCountry> _countryRepository;
        public CountryManager(IRepository<ApplicationCountry> countryRepository)
        {
            this._countryRepository = countryRepository;
        }

        public IList<ApplicationCountry> GetLanguages()
        {
            return _countryRepository.GetAllList();
        }
    }
}
