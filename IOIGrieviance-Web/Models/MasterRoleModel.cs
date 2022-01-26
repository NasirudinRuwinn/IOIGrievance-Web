using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOIGrieviance_Web.Models
{
    public class MasterRoleModel : HomeViewModel
    {
        public int id { get; set; }
        //public string code_id { get; set; }
        public string code_header { get; set; }
        public string name { get; set; }
        public string desc { get; set; }
    }
}
