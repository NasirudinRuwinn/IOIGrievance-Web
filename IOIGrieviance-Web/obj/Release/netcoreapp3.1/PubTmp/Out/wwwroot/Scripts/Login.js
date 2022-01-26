"use strict";

var KTSigninGeneral = function () {
	var t, e, i;
	var settings;
	var f, _username, _pass;
	return {
		init: function () {
			f = document.querySelector("#kt_sign_in_form"),
				_username = document.querySelector("[name='username']").value,
				_pass = document.querySelector("[name='password']").value,
				t = document.querySelector("#kt_sign_in_form"), e = document.querySelector("#kt_sign_in_submit"), i = FormValidation.formValidation(t, {
					fields: {
						username: {
							validators: {
								notEmpty: {
									message: "Email address is required"
								}
							}
						},
						password: {
							validators: {
								notEmpty: {
									message: "The password is required"
								}
							}
						}
					},
					plugins: {
						trigger: new FormValidation.plugins.Trigger,
						bootstrap: new FormValidation.plugins.Bootstrap5({
							rowSelector: ".fv-row"
						})
					}
				}), e.addEventListener("click", (function (n) {
					n.preventDefault(), i.validate().then((function (i) {
						"Valid" == i ? (e.setAttribute("data-kt-indicator", "on"), e.disabled = !0, setTimeout((function () {
							e.removeAttribute("data-kt-indicator"), e.disabled = !1,
								//	settings = {
								//		"url": "/Authentication/Login",
								//		"method": "POST",
								//		"timeout": 0,
								//		"headers": {
								//			"contentType": "application/json;chartset=utf-8",
								//		},
								//		"data": JSON.stringify({ "userName": _username, "password": _pass, "login_Date": new Date(), "lan": $('#kt_docs_select2_country').val() }),
								//	};
								//$.ajax(settings).done(function (response) {
								//	console.log(response);
								//	window.location.href = '/Home/Index';
								//})

								$.ajax({
									url: 'Authentication/Login',
									type: 'POST',
									data: { "userName": document.querySelector("[name='username']").value, "password": document.querySelector("[name='password']").value, "login_Date": new Date(), "lan": $('#kt_docs_select2_country').val() },
									//dataType: "json",
									success: function (respond) {
										if (respond.success === "true") {
											// Show popup confirmation 
											//resolve()
											Swal.fire({
												text: "You have successfully logged in!",
												icon: "success",
												buttonsStyling: !1,
												confirmButtonText: "Ok, got it!",
												customClass: {
													confirmButton: "btn btn-primary"
												}
											}).then((function (e) {
												e.isConfirmed && (f.querySelector('[name="username"]').value = "", f.querySelector('[name="password"]').value = "");
												window.location.href = '/Home/Index';
											}))
										} else {
											Swal.fire({
												text: respond.message,
												icon: "error",
												buttonsStyling: false,
												confirmButtonText: "Ok, got it!",
												customClass: {
													confirmButton: "btn fw-bold btn-primary",
												}
											});
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
										//mApp.unblock("#m_blockui_list");
									}
								}).then(setTimeout(function () {
									//mApp.unblock("#m_blockui_list");
								}, 2e3));

						}), 2e3)) : Swal.fire({
							text: "Sorry, looks like there are some errors detected, please try again.",
							icon: "error",
							buttonsStyling: !1,
							confirmButtonText: "Ok, got it!",
							customClass: {
								confirmButton: "btn btn-primary"
							}
						})
					}))
				}));

			// Format options
			const format = (item) => {
				if (!item.id) {
					return item.text;
				}

				var url = 'assets/media/' + item.element.getAttribute('data-kt-select2-country');
				var img = $("<img>", {
					class: "rounded-circle me-2",
					width: 26,
					src: url
				});
				var span = $("<span>", {
					text: " " + item.text
				});
				span.prepend(img);
				return span;
			}

			$('#kt_docs_select2_country').select2({
				templateResult: function (item) {
					return format(item);
				}
			});
		}
	}

}();


function CallAction() {



	//$.ajax({
	//	url: 'Authentication/Login',
	//	type: 'POST',
	//	data: { 'username': _username, 'password': _pass },
	//	dataType: "json",
	//	contentType: "application/json",
	//	success: function (respond) {
	//		if (respond.success === "true") {
	//			// Show popup confirmation 
	//			//resolve()
	//			Swal.fire({
	//				text: "You have successfully logged in!",
	//				icon: "success",
	//				buttonsStyling: !1,
	//				confirmButtonText: "Ok, got it!",
	//				customClass: {
	//					confirmButton: "btn btn-primary"
	//				}
	//			}).then((function (e) {
	//				e.isConfirmed && (f.querySelector('[name="username"]').value = "", f.querySelector('[name="password"]').value = "");
	//				window.location.href = '/Home/Index';
	//			}))
	//		} else {
	//			//$('#loadbar').remove();
	//			Swal.fire('Warning', respond.message, 'warning');
	//		}
	//		//mApp.unblock("#m_blockui_list");
	//	},
	//	error: function (e, t, s) {
	//		$('#loadbar').remove();
	//		var errorMessage = e.message;
	//		if (errorMessage === "" || errorMessage === undefined) {
	//			errorMessage = "Ooops, something went wrong !";
	//		}
	//		Swal.fire('Error', errorMessage, 'error');
	//		//mApp.unblock("#m_blockui_list");
	//	}
	//}).then(setTimeout(function () {
	//	//mApp.unblock("#m_blockui_list");
	//}, 2e3));
}
// On document ready
$(document).ready(function () {
	KTSigninGeneral.init();
});


