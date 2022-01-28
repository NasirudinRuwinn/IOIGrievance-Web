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
                Response.Redirect("/Authentication/AccessDenied");

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
                response = await _client.GetApiResponse<List<MasterUserAccount>>($"{url}/api/MUserAccount");

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
                response = await _client.GetApiResponse<MasterUserAccount>($"{url}/api/MUserAccount/code={Id}");
                msg = response.Message;
                sts = response.StatusCode;
                isSuccess = response.IsSuccess;
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
            string locationID = "";
            try
            {
                if (useraccount.id_static_user_account_type == 4)
                    locationID = "99";
                else
                    locationID = useraccount.code_location;

                if (string.IsNullOrEmpty(useraccount.code))//add
                {
                    var modelDTO = new MasterUserAccountCreateDTO
                    {
                        id = "",
                        code = "",
                        id_app_user = "",
                        code_employee = "",
                        code_role = "",
                        code_location = locationID,
                        id_static_user_account_type = useraccount.id_static_user_account_type,
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
                    model.code_location = locationID;
                    model.id_static_user_account_type = useraccount.id_static_user_account_type;
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
