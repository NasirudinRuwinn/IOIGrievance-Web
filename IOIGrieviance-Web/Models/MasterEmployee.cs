
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace Grievances_Web.Models
{
    public class MasterEmployee
    {
        #region "Main Property"
        public int id { get; set; }

        public int id_bussiness { get; set; }
        public string code { get; set; }
        public string firstname { get; set; }

        public string lastname { get; set; }

        #endregion

        #region "Log Property"
        public int? created_by { get; set; }

        public int? updated_by { get; set; }

        public int? deleted_by { get; set; }

        #endregion

        #region "Date Property"
        public DateTime? created_date
        {
            get
            {
                return this.Created_Date.HasValue
                   ? this.Created_Date.Value
                   : DateTime.Now;
            }
            set { this.Created_Date = value; }
        }
        private DateTime? Created_Date = null;

        public DateTime? updated_date
        {
            get
            {
                return this.Updated_Date.HasValue
                   ? this.Updated_Date.Value
                   : DateTime.Now;
            }
            set { this.Updated_Date = value; }
        }
        private DateTime? Updated_Date = null;

        public DateTime? deleted_date
        {
            get
            {
                return this.Deleted_Date.HasValue
                   ? this.Deleted_Date.Value
                   : DateTime.Now;
            }
            set { this.Deleted_Date = value; }
        }
        private DateTime? Deleted_Date = null;

        #endregion

        #region "Status Property
        public bool is_deleted { get; set; }

        #endregion

    }
}