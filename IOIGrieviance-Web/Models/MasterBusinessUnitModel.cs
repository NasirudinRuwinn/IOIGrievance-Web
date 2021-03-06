using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOIGrieviance_Web.Models
{
    public class MasterBusinessUnitModel : HomeViewModel
    {
        public int id { get; set; }
        public string code_header { get; set; }
        public string name { get; set; }
        public string desc { get; set; }
        public string code_location { get; set; }
        public string location_name { get; set; }
        public string created_by { get; set; }
        public string updated_by { get; set; }
        public string deleted_by { get; set; }
        public DateTime? created_date { get; set; }
        public DateTime? updated_date { get; set; }
        public DateTime? deleted_date { get; set; }
        public bool is_deleted { get; set; }
        public MasterBussinessUnitDetail createMasterBussinessUnitDto { get; set; }
    }

    public class MasterBusinessUnitModelDTOCreate
    {
        public string code_location { get; set; }
        public string created_by { get; set; }
        public MasterBussinessUnitDetailDTO createMasterBussinessUnitDto { get; set; }
    }
    public class MasterBusinessUnitModelDTOUpdate
    {
        public string code_header { get; set; }
        public string code_location { get; set; }
        public string updated_by { get; set; }
        public MasterBussinessUnitDetailDTO updateMasterBussinessUnitDto { get; set; }
    }
}
