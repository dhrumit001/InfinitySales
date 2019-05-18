using InfinitySales.CommonEntity.TimeZone;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InfinitySales.EntityFrameworkCore.Seed.Host
{
    public class DefaultTimeZonesCreator
    {
        public static List<ApplicationTimeZone> InitialTimeZones => GetInitialTimeZones();

        private readonly InfinitySalesDbContext _context;

        private static List<ApplicationTimeZone> GetInitialTimeZones()
        {
            return new List<ApplicationTimeZone>
            {
                new ApplicationTimeZone(null, "Dateline Standard Time", "International Date Line West", "-12:00"),
                new ApplicationTimeZone(null, "UTC-11", "Coordinated Universal Time-11", "-11:00"),
                new ApplicationTimeZone(null, "Hawaiian Standard Time", "Hawaii", "-10:00"),
            };
        }

        public DefaultTimeZonesCreator(InfinitySalesDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateTimeZones();
        }

        private void CreateTimeZones()
        {
            foreach (var timeZones in InitialTimeZones)
            {
                AddTimeZoneIfNotExists(timeZones);
            }
        }

        private void AddTimeZoneIfNotExists(ApplicationTimeZone timeZone)
        {
            if (_context.TimeZones.IgnoreQueryFilters().Any(l => l.TenantId == timeZone.TenantId && l.Name == timeZone.Name))
            {
                return;
            }

            _context.TimeZones.Add(timeZone);
            _context.SaveChanges();
        }
    }
}
