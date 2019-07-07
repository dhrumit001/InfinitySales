using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfinitySales.Common.Services.Dto
{
    public class UpdateStatusDto : EntityDto<int>
    {
        public bool IsActive { get; set; }
    }

    public class ChangeStatusDto<TPrimaryKey> : EntityDto<TPrimaryKey>
    {
        public bool IsActive { get; set; }
    }
}
