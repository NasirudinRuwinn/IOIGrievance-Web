using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOIGrieviance_Web.Models
{
    public class ViewSelectListModel
    {
        public string Text { get; set; }
        public string Value { get; set; }
        public string OptionValue1 { get; set; }
        public string OptionValue2 { get; set; }
        public string OptionValue3 { get; set; }
        public string OptionValue4 { get; set; }
        public string OptionValue5 { get; set; }
        public string OptionValue6 { get; set; }
        public string OptionValue7 { get; set; }
        public string OptionValue8 { get; set; }
    }

    public class ViewSelectData
    {

        [JsonProperty("name")]
        public string Text { get; set; }

        [JsonProperty("code_header")]
        public string Value { get; set; }
    }

    public class ViewSelectDataLanguage
    {

        [JsonProperty("name")]
        public string Text { get; set; }

        [JsonProperty("code")]
        public string Value { get; set; }
    }

    public class ViewSelectDataLocation
    {

        [JsonProperty("firstname")]
        public string Text { get; set; }

        [JsonProperty("code")]
        public string Value { get; set; }
    }

    public class ViewSelectListItem
    {

    }
}
