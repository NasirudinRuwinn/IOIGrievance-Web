using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grievances_Web.Models;
using IOIGrieviance_Web.Common;
using IOIGrieviance_Web.Models;
using IOIGrieviance_Web.ServiceAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IOIGrieviance_Web.Controllers
{

    public class UserAccountController : BaseController
    {
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;
        public UserAccountController(ApiClientFactory client)
        {
            this._client = client;
        }
        // GET: /<controller>/
        public IActionResult Index()
        {
            MasterUserAccount model = new MasterUserAccount();
            model.userTypeCode = HttpContext.Session.GetString(AppConstants.UserType);
            model.userCode = HttpContext.Session.GetString(AppConstants.NIK);
            model.roleCode = HttpContext.Session.GetString(AppConstants.RoleID);
            model.imageAvatar = HttpContext.Session.GetString(AppConstants.ImageAvatar);
            model._FullName = HttpContext.Session.GetString(AppConstants.Fullname);
            model._Email = HttpContext.Session.GetString(AppConstants.Email);
            model._id_static_user_type = HttpContext.Session.GetString(AppConstants.UserTypeStatic);
            if (model._id_static_user_type != "1")
                Response.Redirect("/Authorization/UnAuthorized");

            return View(model);
        }

        public async Task<ActionResult> GetAllData()
        {
            string msg = "";
            string sts = "";
            string isSuccess = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<MasterUserAccount>>($"{url}/api/MUserAccount/lan-en");

                msg = response.Message;
                sts = response.StatusCode;
                isSuccess = response.IsSuccess;
            }
            catch (Exception e)
            {
                msg = e.Message;
                sts = "fail";
                isSuccess = "false";
            }
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess });
        }

        public async Task<ActionResult> GetUserByID(string Id)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            MasterUserAccount model = new MasterUserAccount();
            try
            {
                string userId = HttpContext.Session.GetString(AppConstants.NIK);
                response = await _client.GetApiResponse<MasterUserAccount>($"{url}/api/MUserAccount/lan-en/code={Id}");
                msg = response.Message;
                sts = response.StatusCode;
                isSuccess = response.IsSuccess;
                //model = new MasterUserAccount
                //{
                //    id = 1,
                //    id_app_user = "55368037-13b8-4e49-b9a5-647bf2626176",
                //    code_user_account_type = "0",
                //    code_role = "0",
                //    code_employee = "0",
                //    code = "M/AU/12/28/2021/16/56/26",
                //    username = "user01",
                //    firstname = "Nasirudin",
                //    lastname = "Ruwin",
                //    mobile_phone = "0987654321",
                //    email = "user01@domain.com",
                //    image = "data:image/png;base64,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",
                //    is_login = false,
                //    is_deleted = false,
                //    password = "12345678"
                //};
                //msg = response.Message;
                //sts = response.StatusCode;
            }
            catch (Exception e)
            {
                msg = e.Message;
                sts = "fail";
            }
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess });
        }

        public async Task<IActionResult> Create(MasterUserAccount useraccount)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            try
            {
                if (string.IsNullOrEmpty(useraccount.code))//add
                {
                    var modelDTO = new MasterUserAccountCreateDTO
                    {
                        id = "",
                        code = "",
                        id_app_user = "",
                        code_employee = "",
                        code_role = "",
                        code_user_account_type = useraccount.user_account_type_name,
                        id_device = "",
                        token = "",
                        firstname = useraccount.firstname,
                        lastname = useraccount.lastname,
                        username = useraccount.username,
                        password = useraccount.password,
                        email = useraccount.email,
                        mobile_phone = useraccount.mobile_phone,
                        image = useraccount.image,
                        created_by = HttpContext.Session.GetString(AppConstants.NIK),
                        created_date = DateTime.Now,
                        is_login = false,
                        is_deleted = false
                    };
                    response = await _client.PostApiResponse<MasterUserAccount>($"{url}/api/MUserAccount/create", modelDTO);
                    msg = response.Message;
                    sts = response.StatusCode;
                    isSuccess = response.IsSuccess;
                }
                else //edit
                {
                    var model = new UPDATEMasterUserAccountDto();
                    model.id = useraccount.id;
                    model.image = useraccount.image;
                    model.lastname = useraccount.lastname;
                    model.mobile_phone = useraccount.mobile_phone;
                    model.firstname = useraccount.firstname;
                    model.code = useraccount.code;
                    model.code_employee = useraccount.code_employee;
                    model.code_role = useraccount.code_role;
                    model.code_user_account_type = useraccount.code_user_account_type;
                    model.email = useraccount.email;
                    model.updated_by = 1;
                    model.code_employee = HttpContext.Session.GetString(AppConstants.NIK);

                    //useraccount.updated_date = DateTime.Now;
                    response = await _client.PutApiResponse<MasterUserAccount>($"{url}/api/MUserAccount/update", model);
                    msg = response.Message;
                    sts = response.StatusCode;
                    isSuccess = response.IsSuccess;
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
                sts = "400";
                isSuccess = "false";
            }
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess });
        }

        public async Task<IActionResult> Delete(string code)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            try
            {
                response = await _client.PutApiResponse<MasterUserAccount>($"{url}/api/MUserAccount/delete?code={code}&deleted_by={HttpContext.Session.GetString(AppConstants.NIK)}");
                msg = response.Message;
                sts = response.StatusCode;
                isSuccess = response.IsSuccess;
            }
            catch (Exception e)
            {
                msg = e.Message;
                sts = "400";
                isSuccess = "false";
            }
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess });
        }

        public async Task<ActionResult> GetDDLLRole()
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            response = await _client.GetApiResponse<List<ViewSelectData>>($"{url}/api/MRole/lan-en");
            List<ViewSelectListModel> list_business = new List<ViewSelectListModel>();
            return Json(new { data = response.Data });
        }
        public async Task<ActionResult> GetDDLLUserType()
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            response = await _client.GetApiResponse<List<ViewSelectData>>($"{url}/api/MUserAccountType/lan-en");
            List<ViewSelectListModel> list_business = new List<ViewSelectListModel>();
            return Json(new { data = response.Data });
        }
    }
}
