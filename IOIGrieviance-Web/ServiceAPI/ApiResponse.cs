using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace IOIGrieviance_Web.ServiceAPI
{
    public class ApiResponse
    {
        [JsonProperty("status_code")]
        public string StatusCode { get; set; }

        [JsonProperty("success")]
        public string IsSuccess { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }
        [JsonProperty("token")]
        public string Token { get; set; }


        public object Data { get; set; }

    }


    public class ApiResponseConfirmPassword
    {
        [JsonProperty("status_code")]
        public string StatusCode { get; set; }

        [JsonProperty("success")]
        public string IsSuccess { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }
        [JsonProperty("reset_password_token")]
        public string TokenResetPassword { get; set; }
    }

    public class ApiResponseLogin
    {
        [JsonProperty("status_code")]
        public string StatusCode { get; set; }

        [JsonProperty("is_success")]
        public string IsSuccess { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }
        [JsonProperty("token")]
        public string Token { get; set; }


        public object Data { get; set; }
    }
    public class ApiErrorResponse : ApiResponse
    {
        public HttpStatusCode StatusCode { get; set; }

        public string Description { get; set; }

        public string Status { get; set; }
    }

    public class FileResponse : ApiResponse
    {
        public string FileName { get; set; }
        public byte[] File { get; set; }
    }
}
