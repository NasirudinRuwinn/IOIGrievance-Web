using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOIGrieviance_Web.Common;
using IOIGrieviance_Web.Models;
using IOIGrieviance_Web.ServiceAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IOIGrieviance_Web.Controllers
{
    public class LocationController : BaseController
    {
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;
        public LocationController(ApiClientFactory client)
        {
            this._client = client;
        }
        public IActionResult Index()
        {
            MasterLocationModel model = new MasterLocationModel();
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
                string userId = HttpContext.Session.GetString(AppConstants.NIK);
                response = await _client.GetApiResponse<List<MasterLocationModel>>($"{url}/api/MLocation");
               
                response.Data = response.Data;
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

        public async Task<ActionResult> GetByCode(string code)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            MasterLocationModel model = new MasterLocationModel();
            try
            {
                string language = HttpContext.Session.GetString(AppConstants.Language);
                response = await _client.GetApiResponse<MasterLocationModel>($"{url}/api/MLocation/code={code}");

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

        public async Task<IActionResult> Create(MasterLocationModel data)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            try
            {
                data.created_by = HttpContext.Session.GetString(AppConstants.NIK);

                if (string.IsNullOrEmpty(data.code_header))
                {
                    response = await _client.PostApiResponse<MasterLocationModel>($"{url}/api/MLocation/create", data);
                }
                else
                {
                    data.updated_by = HttpContext.Session.GetString(AppConstants.NIK);
                    response = await _client.PutApiResponse<MasterLocationModel>($"{url}/api/MLocation/update?code_header={data.code_header}", data);
                }

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
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess, url = Url.Action(nameof(Index)) });
        }

        public async Task<IActionResult> Delete(string code)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            string deleted_by = "";
            try
            {
                deleted_by = HttpContext.Session.GetString(AppConstants.NIK);
                response = await _client.PutApiResponse<MasterLocationModel>($"{url}/api/MLocation/delete?code={code}&deleted_by={deleted_by}");

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
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess, url = Url.Action(nameof(Index)) });
        }
    }
}