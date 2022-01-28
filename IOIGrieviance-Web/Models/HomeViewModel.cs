using IOIGrieviance_Web.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOIGrieviance_Web.Models
{
    public class HomeViewModel : ViewModelBase
    {
        public string id_ { get; set; }
    }
    public abstract class ViewModelBase
    {
        public string roleCode { get; set; } 
        public string userTypeCode { get; set; }
        public string userCode { get; set; }
        public string imageAvatar { get; set; }
        public string _FullName { get; set; }
        public string _Email { get; set; }
        public string _id_static_user_type { get; set; }
        public string _locationName { get; set; }
    }
}
