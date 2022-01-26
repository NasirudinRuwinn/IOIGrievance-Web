using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOIGrieviance_Web.Common;
using IOIGrieviance_Web.Models;
using IOIGrieviance_Web.ServiceAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IOIGrieviance_Web.Controllers
{
    public class ForgotPasswordController : Controller
    {
        // GET: /<controller>/
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public ForgotPasswordController(ApiClientFactory client)
        {
            this._client = client;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult ResetPassword()
        {
            return View();
        }
        public IActionResult ConfirmOTP()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> RequestOTP(string email)
        {
            string msg, sts, is_success;

            var response = new ApiResponseConfirmPassword();
            try
            {
                response = await _client.PutApiResponseAuth<MasterUserAccount>($"{url}/api/Authentication/generate-otp-code?email={email}");
                sts = response.StatusCode;
                msg = response.Message;
                is_success = response.IsSuccess;
            }
            catch (Exception e)
            {
                msg = response.Message;
                sts = "fail";
                is_success = response.IsSuccess;
            }

            return Json(new { data = "", status = sts, message = msg, success = is_success });
        }

        [HttpPost]
        public async Task<IActionResult> ConfirmOTP(string email, string otp)
        {
            string msg, sts, is_success;

            var response = new ApiResponseConfirmPassword();
            try
            {
                response = await _client.PutApiResponseAuth<MasterUserAccount>($"{url}/api/Authentication/verifate-otp-code?email={email}&otp={otp}");
                HttpContext.Session.SetString(AppConstants.ResetPasswordToken, response.TokenResetPassword);
                sts = response.StatusCode;
                msg = response.Message;
                is_success = response.IsSuccess;
            }
            catch (Exception e)
            {
                msg = response.Message;
                sts = "fail";
                is_success = response.IsSuccess;
            }

            return Json(new { data = "", status = sts, message = msg, success = is_success });

        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword(string email, string password, string confirmPassword, string otp)
        {
            string msg, sts, is_success;

            var response = new ApiResponseConfirmPassword();
            try
            {
                var reqDTO = new ResetPassword
                {
                    email = email,
                    newPassword = password,
                    confirmNewPassword = confirmPassword,
                    otp = Convert.ToInt32(otp),
                    resetPasswordToken = HttpContext.Session.GetString(AppConstants.ResetPasswordToken)
            };
                response = await _client.PutApiResponseAuth<MasterUserAccount>($"{url}/api/Authentication/reset-password", reqDTO);
                sts = response.StatusCode;
                msg = response.Message;
                is_success = response.IsSuccess;
            }
            catch (Exception e)
            {
                msg = response.Message;
                sts = "fail";
                is_success = response.IsSuccess;
            }

            return Json(new { data = "", status = sts, message = msg, success = is_success });
        }

    }
}
