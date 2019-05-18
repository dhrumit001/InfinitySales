using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace InfinitySales.Localization
{
    public static class InfinitySalesLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(InfinitySalesConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(InfinitySalesLocalizationConfigurer).GetAssembly(),
                        "InfinitySales.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
