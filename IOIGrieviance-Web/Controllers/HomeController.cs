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
    public class HomeController : BaseController
    {
        // GET: /<controller>/
        private readonly ApiClientFactory _client;

        public HomeController(ApiClientFactory client)
        {
            this._client = client;
        }
        public IActionResult Index()
        {
            var model = new HomeViewModel();
            model.userTypeCode = "1";// HttpContext.Session.GetString(AppConstants.UserType);
            model.userCode = HttpContext.Session.GetString(AppConstants.NIK);
            model.roleCode = "1";// HttpContext.Session.GetString(AppConstants.RoleID);
            model.imageAvatar = HttpContext.Session.GetString(AppConstants.ImageAvatar);
            model._FullName = HttpContext.Session.GetString(AppConstants.Fullname);
            model._Email = HttpContext.Session.GetString(AppConstants.Email);
            model._id_static_user_type = HttpContext.Session.GetString(AppConstants.UserTypeStatic);
            return View(model);
        }
    }
}
