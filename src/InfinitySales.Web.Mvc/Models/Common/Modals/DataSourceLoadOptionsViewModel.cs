using Microsoft.AspNetCore.Mvc;
using DevExtreme.AspNet.Data;
using InfinitySales.Web.ModelBinding;
using InfinitySales.DevExtreme;

namespace InfinitySales.Web.Models.Common.Modals
{
    [ModelBinder(typeof(DataSourceLoadOptionsBinder))]
    public class DataSourceLoadOptionsViewModel : DataSourceLoadOptionsDto
    {

    }
}
