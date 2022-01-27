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

namespace IOIGrieviance_Web.Controllers
{
    public class AuthenticationController : Controller
    {
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;
        public AuthenticationController(ApiClientFactory client)
        {
            this._client = client;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string userName, string password, string lan)
        {
            string msg, sts, is_success;

            var response = new ApiResponseLogin();
            var param = new AuthSignInDto
            {
                userName = userName,
                password = password,
                login_Date = DateTime.Now,
                language = "en"
            };
            try
            {
                response = await _client.PostApiResponseLogin<MasterUserAccount>($"{url}/api/Authentication/web/login", param);
                sts = response.StatusCode;
                msg = response.Message;
                is_success = response.IsSuccess;
                if (response.Data != null)
                {
                    MasterUserAccount usr = (MasterUserAccount)response.Data;
                    HttpContext.Session.SetString(AppConstants.TokenSessionKey, response.Token);
                    HttpContext.Session.SetString(AppConstants.NIK, usr.code.ToString());
                    HttpContext.Session.SetString(AppConstants.Email, string.IsNullOrEmpty(usr.email) ? "" : usr.email);
                    //HttpContext.Session.SetString(AppConstants.RoleID, usr.code_role.ToString());
                    HttpContext.Session.SetString(AppConstants.Fullname, (string.IsNullOrEmpty(usr.firstname) ? "" : usr.firstname) + " - " + (string.IsNullOrEmpty(usr.lastname) ? "" : usr.lastname));
                    HttpContext.Session.SetString(AppConstants.Language, lan);
                    HttpContext.Session.SetString(AppConstants.LocationID, usr.code_location);
                    HttpContext.Session.SetString(AppConstants.UserType, string.IsNullOrEmpty(usr.user_account_type_name) ? "" : usr.user_account_type_name);
                    HttpContext.Session.SetString(AppConstants.ImageAvatar, string.IsNullOrEmpty(usr.image) ? "" : usr.image);
                    HttpContext.Session.SetString(AppConstants.UserTypeStatic, usr.id_static_user_account_type);
                    HttpContext.Session.SetString(AppConstants.UserTypeStaticName, usr.id_static_user_account_type == "1" ? "Administrator" : usr.id_static_user_account_type == "2" ? "HQ Dispatcher" : usr.id_static_user_account_type == "3" ? "Justificator" : "Reporter");
                }
            }
            catch (Exception e)
            {
                msg = response.Message;
                sts = "fail";
                is_success = response.IsSuccess;
            }

            return Json(new { data = "", status = sts, message = msg, success = is_success });
        }
        public void Logout()
        {
            HttpContext.Session.Clear();
            Response.Redirect("/Authentication/index");
        }

        public IActionResult UnAuthorized()
        {
            return View();
        }

        public JsonResult GetUserLogin()
        {
            var datas = new
            {
                userType = HttpContext.Session.GetString(AppConstants.UserType),
                nik = HttpContext.Session.GetString(AppConstants.NIK),
                role = HttpContext.Session.GetString(AppConstants.RoleID),
                imageAvatar = HttpContext.Session.GetString(AppConstants.ImageAvatar),
                userStatic = HttpContext.Session.GetString(AppConstants.UserTypeStatic)
            };
            return Json(new { data = datas, status = "200", message = "success", success = "success" });
        }


    }
}