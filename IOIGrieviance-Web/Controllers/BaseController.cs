using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace IOIGrieviance_Web.Controllers
{
    public class BaseController : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("TokenSessionKey")))
            {
                Response.Redirect("/Authentication?status=sessionExpired");
            }
        }
    }
}