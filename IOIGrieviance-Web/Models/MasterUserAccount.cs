using System;

namespace IOIGrieviance_Web.Models
{
    public class MasterUserAccount : HomeViewModel
    {
        public int id { get; set; }
        public string code { get; set; }
        public string id_app_user { get; set; }
        public string code_employee { get; set; }
        public string code_role { get; set; }
        public string code_location { get; set; }
        public string code_company { get; set; }
        public string code_user_account_type { get; set; }
        public string id_device { get; set; }
        public string token { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string mobile_phone { get; set; }
        public string image { get; set; }
        public string password { get; set; }
        public string created_by { get; set; }
        public int? updated_by { get; set; }
        public int? deleted_by { get; set; }
        public DateTime? created_date { get; set; }
        public DateTime? updated_date { get; set; }
        public DateTime? deleted_date { get; set; }
        public DateTime? last_login_date { get; set; }
        public bool is_login { get; set; }
        public bool is_deleted { get; set; }

        //not mapped
        public string user_account_type_name { get; set; }
        public string role_name { get; set; }
        public int id_static_user_account_type { get; set; }
        public string company_name { get; set; }
        public string location_name { get; set; }
    }

    public class MasterUserAccountCreateDTO
    {
        public string id { get; set; }
        public string code { get; set; }
        public string id_app_user { get; set; }
        public string code_employee { get; set; }
        public string code_role { get; set; }
        public string code_location { get; set; }
        public string code_user_account_type { get; set; }
        public int id_static_user_account_type { get; set; }
        public string id_device { get; set; }
        public string token { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string mobile_phone { get; set; }
        public string image { get; set; }
        public string password { get; set; }
        public string created_by { get; set; }
        public DateTime created_date { get; set; }
        public bool is_login { get; set; }
        public bool is_deleted { get; set; }
    }


    public class UPDATEMasterUserAccountDto
    {
        public int id { get; set; }
        public string code { get; set; }
        public int? updated_by { get; set; }
        public string code_employee { get; set; }
        public string code_role { get; set; }
        public string code_location { get; set; }
        public string code_user_account_type { get; set; }
        public int id_static_user_account_type { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public string mobile_phone { get; set; }
        public string image { get; set; }
    }
}
