using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfinitySales.CommonEntity.TimeZone
{
    public class TimeZoneManager
    {
        private readonly IRepository<ApplicationTimeZone> _timeZoneRepository;
        public TimeZoneManager(IRepository<ApplicationTimeZone> timeZoneRepository)
        {
            this._timeZoneRepository = timeZoneRepository;
        }

        public IList<ApplicationTimeZone> GetTimeZones()
        {
            return _timeZoneRepository.GetAllList();
        }
    }
}
