using InfinitySales.CommonEntity.Country;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InfinitySales.EntityFrameworkCore.Seed.Host
{
    public class DefaultCountriesCreator
    {
        public static List<ApplicationCountry> InitialCountries => GetInitialContries();

        private readonly InfinitySalesDbContext _context;

        private static List<ApplicationCountry> GetInitialContries()
        {
            return new List<ApplicationCountry>
            {
                new ApplicationCountry(null, "UK", "United Kingdom"),
                new ApplicationCountry(null, "US", "United States"),
            };
        }

        public DefaultCountriesCreator(InfinitySalesDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateTimeZones();
        }

        private void CreateTimeZones()
        {
            foreach (var countries in InitialCountries)
            {
                AddCountryIfNotExists(countries);
            }
        }

        private void AddCountryIfNotExists(ApplicationCountry country)
        {
            if (_context.Contries.IgnoreQueryFilters().Any(l => l.TenantId == country.TenantId && l.Name == country.Name))
            {
                return;
            }

            _context.Contries.Add(country);
            _context.SaveChanges();
        }
    }
}
