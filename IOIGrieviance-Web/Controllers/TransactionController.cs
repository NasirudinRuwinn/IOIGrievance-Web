using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOIGrieviance_Web.Common;
using IOIGrieviance_Web.Models;
using IOIGrieviance_Web.ServiceAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace IOIGrieviance_Web.Controllers
{
    public class TransactionController : BaseController
    {
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;
        public TransactionController(ApiClientFactory client)
        {
            this._client = client;
        }
        public IActionResult Index()
        {
            //TransactionHeader model = new TransactionHeader();
            //model.userTypeCode = HttpContext.Session.GetString(AppConstants.UserType);
            //model.userCode = HttpContext.Session.GetString(AppConstants.NIK);
            //model.roleCode = HttpContext.Session.GetString(AppConstants.RoleID);
            //model.imageAvatar = HttpContext.Session.GetString(AppConstants.ImageAvatar);
            //model._FullName = HttpContext.Session.GetString(AppConstants.Fullname);
            //model._Email = HttpContext.Session.GetString(AppConstants.Email);
            //model._id_static_user_type = HttpContext.Session.GetString(AppConstants.UserTypeStatic);
            //return View(model);
            var model = new HomeViewModel();
            model.userTypeCode = "1";// HttpContext.Session.GetString(AppConstants.UserType);
            model.userCode = HttpContext.Session.GetString(AppConstants.NIK);
            model.roleCode = "1";// HttpContext.Session.GetString(AppConstants.RoleID);
            model.imageAvatar = HttpContext.Session.GetString(AppConstants.ImageAvatar);
            model._FullName = HttpContext.Session.GetString(AppConstants.Fullname);
            model._Email = HttpContext.Session.GetString(AppConstants.Email);
            model._id_static_user_type = HttpContext.Session.GetString(AppConstants.UserTypeStatic);
            if (model._id_static_user_type == "3" || model._id_static_user_type == "4")
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
                string userId = HttpContext.Session.GetString(AppConstants.Email);
                if (HttpContext.Session.GetString(AppConstants.UserTypeStatic) == "1")
                    response = await _client.GetApiResponse<List<TransactionHeader>>($"{url}/api/TReport/lan-en/created_by={HttpContext.Session.GetString(AppConstants.NIK)}/2020-01-01/2022-12-12");
                else
                    response = await _client.GetApiResponse<List<TransactionHeader>>($"{url}/api/TReport/lan-en/code_location={HttpContext.Session.GetString(AppConstants.LocationID)}");

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
        public async Task<ActionResult> GetDDLLocation()
        {
            var response = new ApiResponse();
            response = await _client.GetApiResponse<List<ViewSelectData>>($"{url}/api/MLocation");
            return Json(new { data = response.Data });
        }

        public async Task<ActionResult> GetAllRecipient(string code_location)
        {
            string location = "";
            if (HttpContext.Session.GetString(AppConstants.UserTypeStatic) == "1")
                location = code_location;
            else
                location = HttpContext.Session.GetString(AppConstants.LocationID);

            var response = new ApiResponse();
            response = await _client.GetApiResponse<List<ViewSelectDataLocation>>($"{url}/api/MUserAccount/recipient/code_location={location}");
            return Json(new { data = response.Data });
        }

        public async Task<ActionResult> GetAllLang()
        {
            //var getUrl = $"{url}/getddlchargecode";
            //var model = await _client.Get<List<ViewSelectListItem>>(getUrl) ?? new List<ViewSelectListItem>();
            List<ViewSelectListModel> list_location = new List<ViewSelectListModel>();
            list_location.Add(new ViewSelectListModel { Text = "Indonesian", Value = "ID" });
            list_location.Add(new ViewSelectListModel { Text = "English", Value = "EN" });
            list_location.Add(new ViewSelectListModel { Text = "Malay", Value = "MY" });
            list_location.Add(new ViewSelectListModel { Text = "Vietnamese", Value = "VI" });
            //return Json(list_location, new JsonSerializerSettings { ContractResolver = new DefaultContractResolver() });
            return Json(new { data = list_location });
        }

        public async Task<ActionResult> GetUserStaticType()
        {
            List<ViewSelectListModel> list_location = new List<ViewSelectListModel>();
            list_location.Add(new ViewSelectListModel { Text = "Administrator", Value = "1" });
            list_location.Add(new ViewSelectListModel { Text = "HQ Dispatcher", Value = "2" });
            list_location.Add(new ViewSelectListModel { Text = "Justificator", Value = "3" });
            list_location.Add(new ViewSelectListModel { Text = "Reporter", Value = "4" });
            //return Json(list_location, new JsonSerializerSettings { ContractResolver = new DefaultContractResolver() });
            return Json(new { data = list_location });
        }

        public async Task<ActionResult> GetDDLLBusinnessType(string code_location)
        {
            var response = new ApiResponse();
            response = await _client.GetApiResponse<List<ViewSelectData>>($"{url}/api/MBussinessUnit/lan-en/code_location={code_location}");
            List<ViewSelectListModel> list_business = new List<ViewSelectListModel>();
            return Json(new { data = response.Data });
        }

        public async Task<ActionResult> GetDDLLRole()
        {
            var response = new ApiResponse();
            response = await _client.GetApiResponse<List<ViewSelectData>>($"{url}/api/MRole/lan-en");
            List<ViewSelectListModel> list_location = new List<ViewSelectListModel>();
            return Json(list_location, new JsonSerializerSettings { ContractResolver = new DefaultContractResolver() });
        }

        public async Task<ActionResult> GetAllLanguageSupported()
        {
            var response = new ApiResponse();
            response = await _client.GetApiResponse<List<ViewSelectDataLanguage>>($"{url}/api/MSupportedLanguage");
            return Json(new { data = response.Data });
        }

        public async Task<IActionResult> Create(TransactionHeaderDTO dataTrx)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            try
            {
                if (string.IsNullOrEmpty(dataTrx.code))// create
                {
                    dataTrx.created_by = HttpContext.Session.GetString(AppConstants.NIK);
                    dataTrx.created_date = DateTime.Now;
                    response = await _client.PostApiResponse<MasterUserAccount>($"{url}/api/TReport/create-report-user-registered", dataTrx);
                }
                else // update
                {
                    var dataDTO = new SendToRecipientDTO
                    {
                        code_header = dataTrx.code,
                        dispatch_by = HttpContext.Session.GetString(AppConstants.NIK),
                        hq_note_to_justificator = dataTrx.hq_note_to_justificator,
                        user_recipient = dataTrx.createTransDRecipientDto
                    };
                    response = await _client.PostApiResponse<MasterUserAccount>($"{url}/api/TReport/send-report-to-recepient", dataDTO);
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
            //return Json(new { data = "", status = sts, message = msg, url = Url.Action(nameof(Index)) });
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess });
        }

        public async Task<IActionResult> CreateForAdmin(TransactionHeaderDTO dataTrx)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            try
            {
                var dataDTO = new TransactionAdminDTO
                {
                    code_bussiness_unit = dataTrx.code_bussiness_unit,
                    code_location = dataTrx.code_location,
                    created_by = HttpContext.Session.GetString(AppConstants.NIK),
                    createTransDAttachmentDto = dataTrx.createTransDAttachmentDto,
                    createTransDSTTDto = dataTrx.createTransDSTTDto,
                    fraud = dataTrx.fraud,
                    justification_request_from_administrator = dataTrx.hq_note_to_justificator,
                    suspected = dataTrx.suspected,
                    user_recipient = dataTrx.createTransDRecipientDto,
                    language_code = dataTrx.language_code_stt
                };

                response = await _client.PostApiResponse<TransactionAdminDTO>($"{url}/api/TReport/create-report-user-administrator", dataDTO);
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
            //return Json(new { data = "", status = sts, message = msg, url = Url.Action(nameof(Index)) });
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess });
        }
        public async Task<IActionResult> Reject(TransactionHeader dataTrx)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            try
            {
                var dataDTO = new HQReportCloseDTO
                {
                    code_header = dataTrx.code,
                    completed_by = HttpContext.Session.GetString(AppConstants.NIK),
                    hq_note_to_reporter = dataTrx.hq_note_to_reporter,
                    is_approved = false
                };

                response = await _client.PostApiResponse<MasterUserAccount>($"{url}/api/TReport/hq-close-report", dataDTO);
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
            //return Json(new { data = "", status = sts, message = msg, url = Url.Action(nameof(Index)) });
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess });
        }

        public async Task<IActionResult> Approve(TransactionHeader dataTrx)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            try
            {
                var dataDTO = new HQReportCloseDTO
                {
                    code_header = dataTrx.code,
                    completed_by = HttpContext.Session.GetString(AppConstants.NIK),
                    hq_note_to_reporter = dataTrx.hq_note_to_reporter,
                    is_approved = true
                };

                response = await _client.PostApiResponse<MasterUserAccount>($"{url}/api/TReport/hq-close-report", dataDTO);
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
            //return Json(new { data = "", status = sts, message = msg, url = Url.Action(nameof(Index)) });
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess });
        }

        public async Task<ActionResult> GetDataByID(string Id)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            TransactionHeader model = new TransactionHeader();
            try
            {
                string language = HttpContext.Session.GetString(AppConstants.Language);
                response = await _client.GetApiResponse<TransactionHeader>($"{url}/api/TReport/lan-en/code={Id}");

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

        public async Task<ActionResult> GetTimeline(string Id)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            TransactionHeader model = new TransactionHeader();
            try
            {
                string language = HttpContext.Session.GetString(AppConstants.Language);
                response = await _client.GetApiResponse<Timeline>($"{url}/api/TReport/time-line/report_code={Id}");

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
        public async Task<IActionResult> VoiceTranslate(string base64Voice, string code, string lan)
        {
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            string base64Reformat = "";
            try
            {
                //base64Reformat = base64Voice.Replace("/ ^data:audio\/[a - z] +; base64,/", "");
                var dataDTO = new VoiceTransalateDTO
                {
                    code_header_report = code,
                    code_header_speech = "SP01312022133051",
                    code_language = "en-US",
                    country = "English",
                    language = "English",
                    speech_base64 = base64Voice
                };

                response = await _client.PostApiResponse<STTResponseModel>($"{url}/api/GoogleAPI/speech-to-text/file-base-64", dataDTO);
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
            //return Json(new { data = "", status = sts, message = msg, url = Url.Action(nameof(Index)) });
            return Json(new { data = response.Data, status = sts, message = msg, success = isSuccess });
        }

        public async Task<IActionResult> TextTranslate(string lan, string ttt)
        {
            var response = new ApiResponseTTT();
            string msg = "";
            string sts = "";
            string isSuccess = "";
            try
            {
                response = await _client.GetApiResponseTTT<MasterUserAccount>($"{url}/api/GoogleAPI/translate?code_language={lan}&text={ttt}");
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
            //return Json(new { data = "", status = sts, message = msg, url = Url.Action(nameof(Index)) });
            return Json(new { data = response.data, status = sts, message = msg, success = isSuccess });
        }
    }
}

