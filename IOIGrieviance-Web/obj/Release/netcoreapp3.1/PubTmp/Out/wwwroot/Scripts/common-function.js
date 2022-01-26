"use strict";

var KTSigninGeneral = function () {
    var nik, userType, role;
    return {
        init: function () {
            // Get Role and U-Type
            $.ajax({
                data: {},
                type: "GET",
                dataType: "JSON",
                url: '/Authentication/GetUserLogin',
                success: function (result) {
                    $('#hdn_user_type').val(result.data.userType);
                    $('#hdn_nik').val(result.data.nik);
                    $('#hdn_role').val(result.data.role);
                    $('#hdn_user_static').val(result.data.userStatic);
                    //document.getElementById("imageAvatarUser").src = result.data.imageAvatar;
                    menuValidation(role);
                },
                error: function (e, t, s) {
                    console.log('build notification getting error');
                    console.log(e);
                    console.log(t);
                    console.log(s);
                    console.log('======= END OF build notification getting error =========');
                }
            });
        }
    }

    function menuValidation(role, userType) {
        if (role != "1") { // 1. Administrator 2. Estate Manager 3. Assistant Manager 4. Manager 5. Staff 6. Anynomous 
            //document.getElementById('all-menu-master-data').remove();
            //document.getElementById('all-menu-user-management').remove();
            //document.getElementById('all-menu-user-management').remove();
        }
        if (userType == "1") { // 1 REPORTER 2 HQ DISPATCHER 3 JUSTIFICATOR

        }
    }

}();


// On document ready
$(document).ready(function () {
    KTSigninGeneral.init();
});