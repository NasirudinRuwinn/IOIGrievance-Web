using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOIGrieviance_Web.Models
{
    public class AuthSignInDto
    {
        public string userName { get; set; }
        public string password { get; set; }
        public DateTime login_Date { get; set; }
        public string language { get; set; }
    }

    public class ResetPassword
    {
        public string email { get; set; }
        public string newPassword { get; set; }
        public string confirmNewPassword { get; set; }
        public int otp { get; set; }
        public string resetPasswordToken  { get; set; }
    }
}
