using System.Collections.Generic;
using InfinitySales.Roles.Dto;

namespace InfinitySales.Web.Models.Common
{
    public interface IPermissionsEditViewModel
    {
        List<FlatPermissionDto> Permissions { get; set; }
    }
}