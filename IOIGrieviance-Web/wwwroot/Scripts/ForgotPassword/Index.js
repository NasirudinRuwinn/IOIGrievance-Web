"use strict";

// Class definition
var KTProjectUsers = function () {

    var initTable = function () {


        // Submit button handler
        const submitReqOTPButton = document.getElementById('kt_password_request_otp_submit');
        submitReqOTPButton.addEventListener('click', e => {
            e.preventDefault();
            // Validate form before submit

            if (validatorRequest) {
                validatorRequest.validate().then(function (status) {
                    console.log('validated!');
                    if (status == 'Valid') {
                        submitReqOTPButton.disabled = true;
                        submitReqOTPButton.setAttribute('data-kt-indicator', 'on');
                        $.ajax({
                            url: "ForgotPassword/RequestOTP",
                            type: 'POST',
                            data: { 'email': $('#email').val() },
                            dataType: 'json',
                            success: function (result) {
                                if (result.success === "true") {
                                    // Show popup confirmation 
                                    Swal.fire({
                                        text: "Form has been successfully submitted!",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then(function (result) {
                                        if (result.isConfirmed) {
                                            $('#kt_password_request_otp_form').css('display', 'none');
                                            $('#kt_password_confirm_otp_form').css('display', 'block');
                                            $('#kt_password_reset_form').css('display', 'none');
                                            submitReqOTPButton.disabled = false;
                                            submitReqOTPButton.removeAttribute('data-kt-indicator');
                                            //window.location.href = '/ForgotPassword/ConfirmOTP';
                                            //submitButton.removeAttribute('data-kt-indicator');
                                        }
                                    });

                                } else {
                                    //$('#loadbar').remove();
                                    Swal.fire('Warning', result.message, 'warning');
                                }
                                //mApp.unblock("#m_blockui_list");
                            },
                            error: function (e, t, s) {
                                $('#loadbar').remove();
                                var errorMessage = e.message;
                                if (errorMessage === "" || errorMessage === undefined) {
                                    errorMessage = "Ooops, something went wrong !";
                                }
                                Swal.fire('Error', errorMessage, 'error');
                                // Remove loading indication
                                submitReqOTPButton.removeAttribute('data-kt-indicator');
                                // Enable button
                                submitReqOTPButton.disabled = false;
                                //mApp.unblock("#m_blockui_list");
                            }
                        }).then(setTimeout(function () {
                            //mApp.unblock("#m_blockui_list");
                        }, 2e3));

                    } else {
                        // Show popup warning.
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }
                });
            }
        });

        const submitConfirmOTPButton = document.getElementById('kt_password_confirm_otp_submit');
        submitConfirmOTPButton.addEventListener('click', e => {
            e.preventDefault();
            // Validate form before submit

            if (validatorConfirm) {
                validatorConfirm.validate().then(function (status) {
                    console.log('validated!');
                    if (status == 'Valid') {
                        $.ajax({
                            url: "ForgotPassword/ConfirmOTP",
                            type: 'POST',
                            data: { 'email': $('#email-confirm').val(), 'otp': $('#otp-confirm').val() },
                            dataType: 'json',
                            success: function (result) {
                                if (result.success === "true") {
                                    // Show popup confirmation 
                                    Swal.fire({
                                        text: "Form has been successfully submitted!",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then(function (result) {
                                        if (result.isConfirmed) {
                                            submitConfirmOTPButton.disabled = true;
                                            submitConfirmOTPButton.setAttribute('data-kt-indicator', 'on');
                                            $('#kt_password_request_otp_form').css('display', 'none');
                                            $('#kt_password_confirm_otp_form').css('display', 'none');
                                            $('#kt_password_reset_form').css('display', 'block');
                                            //window.location.href = '/ForgotPassword/ResetPassword';
                                            //submitButton.removeAttribute('data-kt-indicator');
                                        }
                                    });

                                } else {
                                    //$('#loadbar').remove();
                                    Swal.fire('Warning', result.message, 'warning');
                                }
                                //mApp.unblock("#m_blockui_list");
                            },
                            error: function (e, t, s) {
                                $('#loadbar').remove();
                                var errorMessage = e.message;
                                if (errorMessage === "" || errorMessage === undefined) {
                                    errorMessage = "Ooops, something went wrong !";
                                }
                                Swal.fire('Error', errorMessage, 'error');
                                // Remove loading indication
                                submitConfirmOTPButton.removeAttribute('data-kt-indicator');
                                // Enable button
                                submitConfirmOTPButton.disabled = false;
                                //mApp.unblock("#m_blockui_list");
                            }
                        }).then(setTimeout(function () {
                            //mApp.unblock("#m_blockui_list");
                        }, 2e3));

                    } else {
                        // Show popup warning.
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }
                });
            }
        });

        const submitResetPasswordButton = document.getElementById('kt_password_reset_submit');
        submitResetPasswordButton.addEventListener('click', e => {
            e.preventDefault();
            // Validate form before submit

            if (validatorReset) {
                validatorReset.validate().then(function (status) {
                    console.log('validated!');
                    if (status == 'Valid') {
                        $.ajax({
                            url: "ForgotPassword/ResetPassword",
                            type: 'POST',
                            data: { 'email': $('#email-reset').val(), 'password': $('#password').val(), 'confirmPassword': $('#confirm_password').val(), 'otp': $('#otp-reset').val() },
                            dataType: 'json',
                            success: function (result) {
                                if (result.success === "true") {
                                    // Show popup confirmation 
                                    Swal.fire({
                                        text: "Form has been successfully submitted!",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then(function (result) {
                                        if (result.isConfirmed) {
                                            submitResetPasswordButton.disabled = true;
                                            submitResetPasswordButton.setAttribute('data-kt-indicator', 'on');
                                            window.location.href = '/Authentication/Indesx';
                                            //submitButton.removeAttribute('data-kt-indicator');
                                        }
                                    });

                                } else {
                                    //$('#loadbar').remove();
                                    Swal.fire('Warning', result.message, 'warning');
                                }
                                //mApp.unblock("#m_blockui_list");
                            },
                            error: function (e, t, s) {
                                $('#loadbar').remove();
                                var errorMessage = e.message;
                                if (errorMessage === "" || errorMessage === undefined) {
                                    errorMessage = "Ooops, something went wrong !";
                                }
                                Swal.fire('Error', errorMessage, 'error');
                                // Remove loading indication
                                submitResetPasswordButton.removeAttribute('data-kt-indicator');
                                // Enable button
                                submitResetPasswordButton.disabled = false;
                                //mApp.unblock("#m_blockui_list");
                            }
                        }).then(setTimeout(function () {
                            //mApp.unblock("#m_blockui_list");
                        }, 2e3));

                    } else {
                        // Show popup warning.
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }
                });
            }
        });

        //// Cancel button handler
        //const cancelButton = element.querySelector('[data-kt-location-modal-action="cancel"]');
        //cancelButton.addEventListener('click', e => {
        //    e.preventDefault();

        //    Swal.fire({
        //        text: "Are you sure you would like to cancel?",
        //        icon: "warning",
        //        showCancelButton: true,
        //        buttonsStyling: false,
        //        confirmButtonText: "Yes, cancel it!",
        //        cancelButtonText: "No, return",
        //        customClass: {
        //            confirmButton: "btn btn-primary",
        //            cancelButton: "btn btn-active-light"
        //        }
        //    }).then(function (result) {
        //        if (result.value) {
        //            form.reset(); // Reset form			
        //            modal.hide();
        //        } else if (result.dismiss === 'cancel') {
        //            Swal.fire({
        //                text: "Your form has not been cancelled!.",
        //                icon: "error",
        //                buttonsStyling: false,
        //                confirmButtonText: "Ok, got it!",
        //                customClass: {
        //                    confirmButton: "btn btn-primary",
        //                }
        //            });
        //        }
        //    });
        //});


        // Define form element
        const forms_req = document.getElementById('kt_password_request_otp_form');
        const forms_confirm = document.getElementById('kt_password_confirm_otp_form');
        const forms_reset = document.getElementById('kt_password_reset_form');

        // Init form validation rules.
        var validatorRequest = FormValidation.formValidation(
            forms_req,
            {
                fields: {
                    'email': {
                        validators: {
                            notEmpty: {
                                message: 'Email is required'
                            }
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    excluded: new FormValidation.plugins.Excluded(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

        // Init form validation rules.
        var validatorConfirm = FormValidation.formValidation(
            forms_confirm,
            {
                fields: {
                    'email-confirm': {
                        validators: {
                            notEmpty: {
                                message: 'Email is required'
                            }
                        }
                    },
                    'otp-confirm': {
                        validators: {
                            notEmpty: {
                                message: 'OTP is required'
                            }
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    excluded: new FormValidation.plugins.Excluded(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

        // Init form validation rules.
        var validatorReset = FormValidation.formValidation(
            forms_reset,
            {
                fields: {
                    'email-reset': {
                        validators: {
                            notEmpty: {
                                message: 'Email is required'
                            }
                        }
                    },
                    'password': {
                        validators: {
                            notEmpty: {
                                message: 'The password is required'
                            },
                            callback: {
                                message: 'Please enter valid password',
                                callback: function (input) {
                                    if (input.value.length > 0) {
                                        return validatePassword();
                                    }
                                }
                            }
                        }
                    },
                    'confirm_password': {
                        validators: {
                            notEmpty: {
                                message: 'The password confirmation is required'
                            },
                            identical: {
                                compare: function () {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: 'The password and its confirm are not the same'
                            }
                        }
                    },
                    'otp-confirm': {
                        validators: {
                            notEmpty: {
                                message: 'OTP is required'
                            }
                        }
                    },
                    
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    excluded: new FormValidation.plugins.Excluded(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

    }

    // Prepare Create Data
    var callActionCreate = (parameter) => {

        //Start call ajax
        $.ajax({
            url: "FrogotPassword/RequestOTP",
            type: 'POST',
            data: { 'email': $('#email-request').val() },
            dataType: 'json',
            success: function (result) {
                if (result.success === "true") {
                    // Show popup confirmation 
                    Swal.fire({
                        text: "Form has been successfully submitted!",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then(function (result) {
                        if (result.isConfirmed) {
                            modal.hide();
                            window.location.reload();
                        }
                    });
                    // Remove loading indication
                    submitButton1.removeAttribute('data-kt-indicator');
                    // Enable button
                    submitButton1.disabled = false;
                    //$('#id_location').select2(); $('#id_bussiness').select2();
                    //_loc(); _bussiness();
                } else {
                    //$('#loadbar').remove();
                    Swal.fire('Warning', result.message, 'warning');
                }
                //mApp.unblock("#m_blockui_list");
            },
            error: function (e, t, s) {
                $('#loadbar').remove();
                var errorMessage = e.message;
                if (errorMessage === "" || errorMessage === undefined) {
                    errorMessage = "Ooops, something went wrong !";
                }
                Swal.fire('Error', errorMessage, 'error');
                // Remove loading indication
                submitButton1.removeAttribute('data-kt-indicator');
                // Enable button
                submitButton1.disabled = false;
                //mApp.unblock("#m_blockui_list");
            }
        }).then(setTimeout(function () {
            //mApp.unblock("#m_blockui_list");
        }, 2e3));

        //end call ajax

    }
    // end create data

    // Public methods
    return {
        init: function () {
            initTable();
        }
    }
}();
// On document ready
$(document).ready(function () {
    KTProjectUsers.init();
});
