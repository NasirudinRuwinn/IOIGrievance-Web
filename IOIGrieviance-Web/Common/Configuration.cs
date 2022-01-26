using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOIGrieviance_Web.Common
{

    public class Configuration
    {
        public AppConfiguration AppConfiguration { get; set; }
    }
    public class AppConfiguration
    {
        //public ApplicationSetting();

        public string dataurl { get; set; }
    }
}
