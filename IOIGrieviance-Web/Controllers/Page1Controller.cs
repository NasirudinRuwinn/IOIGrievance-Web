using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOIGrieviance_Web.ServiceAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IOIGrieviance_Web.Controllers
{
    public class Page1Controller : Controller
    {
        // GET: /<controller>/
        private readonly ApiClientFactory _client;

        public Page1Controller(ApiClientFactory client)
        {
            this._client = client;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
