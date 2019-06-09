using Abp.Localization;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfinitySales.Settings.UserSettings.Dto
{
    public class GetUserProfileSettingForEditOutput
    {
        public UserProfileSettingDto UserProfileSetting { get; set; }
        public IReadOnlyList<LanguageInfo> Languages { get; set; }
    }
}
