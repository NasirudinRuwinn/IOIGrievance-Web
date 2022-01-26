"use strict";

// Class definition
var KTProjectUsers = function () {

    const table = document.getElementById('kt_table_user_type');
    const element = document.getElementById('kt_modal_add_user_type');
    const form = element.querySelector('#kt_modal_add_user_type_form');
    //const formValidate = document.getElementById('kt_modal_add_trx_form');

    const modal = new bootstrap.Modal(element);
    var initTable = function () {

        //Bypass empty table
        if (!table) {
            return;
        }

        // Init datatable
        const actionButton = document.getElementById('default-button-action').children[0].innerHTML;

        $.ajax({
            url: "UserType/GetAllData",
            data: "",
            dataType: "json",
            type: "GET",
            contentType: "application/json;chartset=utf-8",
            success: function (response) {
                var columnHeaders = [];
                var _table = table.rows[0];

                var t = $('#kt_table_user_type').DataTable({
                    data: response.data,
                    "columns": [
                        //{
                        //    data: null,
                        //    className: "center",
                        //    defaultContent: "<div class='form-check form-check-sm form-check-custom form-check-solid'><input class='form-check-input select-checkbox' type ='checkbox' value = '1'></div>"
                        //},
                        { "data": null, "targets": 0 },
                        { "data": "code_header" },
                        { "data": "id_static_type_name" },
                        { "data": "name" },
                        { "data": "desc" },
                        {
                            data: null,
                            className: "d-flex justify-content-end flex-shrink-0",
                            defaultContent: actionButton
                        }
                    ],
                    "columnDefs": [
                        //{
                        //    "searchable": false,
                        //    "orderable": false,
                        //    "targets": 0,
                        //    "data": null
                        //}
                    ],
                    "order": [[1, 'desc']]
                });

                t.on('draw', function () {
                }).on('order.dt search.dt', function () {
                    t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }).draw();;
                t.page('last').draw('page');

                //// Search 
                //var filterSearch = document.getElementById('transaction_filter_search');
                //if (filterSearch) {
                //    filterSearch.addEventListener('keyup', function (e) {
                //        t.search(e.target.value).draw();
                //    });
                //}
            },

            error: function () {
                console.log("Error loading data! Please try again.");
            }
        });

        //    // Submit button handler
        const submitButton = document.getElementById('btn-submit');
        submitButton.addEventListener('click', e => {
            e.preventDefault();
            // Validate form before submit

            if (validator) {
                validator.validate().then(function (status) {
                    console.log('validated!');
                    if (status == 'Valid') {
                        Swal.fire({
                            title: "Confirmation",
                            text: 'Are you sure want to submit this data?',
                            type: "question",
                            icon: 'question',
                            showCancelButton: !0,
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            reverseButtons: !0,
                            customClass: {
                                //confirmButton: "btn btn-primary"
                            }
                        }).then(function (ok) {
                            if (ok.value) {
                                // Simulate form submission
                                // Show loading indication
                                submitButton.setAttribute('data-kt-indicator', 'on');
                                // Disable button to avoid multiple click 
                                submitButton.disabled = true;
                                setTimeout(function () {
                                    Swal.close();

                                    // Remove loading indication
                                    //submitButton.removeAttribute('data-kt-indicator');
                                    // Enable button
                                    //submitButton.disabled = false;

                                    // Call action post
                                    callActionCreate({ formId: "kt_modal_add_user_type_form", title: "save", type: "POST", url: '/UserType/create' });
                                    //form.submit(); // Submit form
                                    submitButton.removeAttribute('data-kt-indicator');
                                }, 2000);
                            }
                        });

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

        // Cancel button handler
        const cancelButton = element.querySelector('[data-kt-user-type-modal-action="cancel"]');
        cancelButton.addEventListener('click', e => {
            e.preventDefault();

            Swal.fire({
                text: "Are you sure you would like to cancel?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, cancel it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form			
                    modal.hide();
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Your form has not been cancelled!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        });

        // Close button handler
        const closeButton = element.querySelector('[data-kt-user-type-modal-action="close"]');
        closeButton.addEventListener('click', e => {
            e.preventDefault();

            Swal.fire({
                text: "Are you sure you would like to cancel?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, cancel it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form			
                    modal.hide();
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Your form has not been cancelled!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        });

        // Add new button
        const addNewButton = document.querySelector('[data-bs-target="#kt_modal_add_user_type"]');
        addNewButton.addEventListener('click', e => {
            e.preventDefault();
            $("#kt_modal_add_user_type_form *").prop('disabled', false);
            $("#kt_modal_add_user_type_form *").val('');
            $('#code_header').val('');
            $("#kt_modal_add_user_type_form *").closest('.invalid-feedback').children().remove();
        });


        // Define form element
        const forms = document.getElementById('kt_modal_add_user_type_form');

        // Init form validation rules.
        var validator = FormValidation.formValidation(
            forms,
            {
                fields: {
                    'name_bd': {
                        validators: {
                            notEmpty: {
                                message: 'Name Bangladesh is required'
                            }
                        }
                    },
                    'desc_bd': {
                        validators: {
                            notEmpty: {
                                message: 'Desc Bangladesh is required'
                            }
                        }
                    },
                    'name_en': {
                        validators: {
                            notEmpty: {
                                message: 'Name English is required'
                            }
                        }
                    },
                    'desc_en': {
                        validators: {
                            notEmpty: {
                                message: 'Desc English is required'
                            }
                        }
                    },
                    'name_hi': {
                        validators: {
                            notEmpty: {
                                message: 'Name India is required'
                            }
                        }
                    },
                    'desc_hi': {
                        validators: {
                            notEmpty: {
                                message: 'Desc India is required'
                            }
                        }
                    },
                    'name_id': {
                        validators: {
                            notEmpty: {
                                message: 'Name Indonesia is required'
                            }
                        }
                    },
                    'desc_id': {
                        validators: {
                            notEmpty: {
                                message: 'Desc Indonesia is required'
                            }
                        }
                    },
                    'name_mm': {
                        validators: {
                            notEmpty: {
                                message: 'Name Myanmar is required'
                            }
                        }
                    },
                    'desc_mm': {
                        validators: {
                            notEmpty: {
                                message: 'Desc Myanmar is required'
                            }
                        }
                    },
                    'name_ms': {
                        validators: {
                            notEmpty: {
                                message: 'Name Malaysia is required'
                            }
                        }
                    },
                    'desc_ms': {
                        validators: {
                            notEmpty: {
                                message: 'Desc Malaysia is required'
                            }
                        }
                    },
                    'name_nep': {
                        validators: {
                            notEmpty: {
                                message: 'Name Nepal is required'
                            }
                        }
                    },
                    'desc_nep': {
                        validators: {
                            notEmpty: {
                                message: 'Desc Nepal is required'
                            }
                        }
                    },
                    'name_phi': {
                        validators: {
                            notEmpty: {
                                message: 'Name Philippines is required'
                            }
                        }
                    },
                    'desc_phi': {
                        validators: {
                            notEmpty: {
                                message: 'Desc Philippines is required'
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
        var object = {};
        var params = $('#' + parameter.formId).serializeArray();
        const submitButton1 = element.querySelector('[data-kt-users-modal-action="submit"]');

        //Start property collection data
        $.each(params, function (i, val) {
            object[val.name] = val.value;
        });

        object['code_header'] = $('#code_header').val();
        //end property collection data

        //Start call ajax
        $.ajax({
            url: "UserType/Create",
            type: 'POST',
            data: object,
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

function btnViewAction(e, action) {
    var rowId = e.parentNode.closest('tr').cells[1].innerText;
    $.ajax({
        url: "/UserType/GetByCode",
        type: 'GET',
        data: { 'code': rowId },
        dataType: 'json',
        success: function (result) {
            if (result.success == 'true') {
                document.querySelector('[name="name_bd"]').value = result.data.name_bd;
                document.querySelector('[name="desc_bd"]').value = result.data.desc_bd;
                document.querySelector('[name="name_en"]').value = result.data.name_en;
                document.querySelector('[name="desc_en"]').value = result.data.desc_en;
                document.querySelector('[name="name_hi"]').value = result.data.name_hi;
                document.querySelector('[name="desc_hi"]').value = result.data.desc_hi;
                document.querySelector('[name="name_id"]').value = result.data.name_id;
                document.querySelector('[name="desc_id"]').value = result.data.desc_id;
                document.querySelector('[name="name_mm"]').value = result.data.name_mm;
                document.querySelector('[name="desc_mm"]').value = result.data.desc_mm;
                document.querySelector('[name="name_ms"]').value = result.data.name_ms;
                document.querySelector('[name="desc_ms"]').value = result.data.desc_ms;
                document.querySelector('[name="name_nep"]').value = result.data.name_nep;
                document.querySelector('[name="desc_nep"]').value = result.data.desc_nep;
                document.querySelector('[name="name_phi"]').value = result.data.name_phi;
                document.querySelector('[name="desc_phi"]').value = result.data.desc_phi;

                $('#code_header').val(result.data.code_header);
              
                if (action === 'view') {
                    $("#kt_modal_add_user_type_form *").prop('disabled', true);
                } else {
                    $("#kt_modal_add_user_type_form *").prop('disabled', false);
                }

                $("#kt_modal_add_user_type_form *").closest('.invalid-feedback').children().remove();
                $('#kt_modal_add_user_type').modal('show');
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        },
        error: function (e, t, s) {
            var errorMessage = e.message;
            if (errorMessage === "" || errorMessage === undefined) {
                errorMessage = "Ooops, something went wrong !";
            }
            Swal.fire('Error', errorMessage, 'error');
        }
    });
}

function btnDeleteAction(e) {
    var rowId = e.parentNode.closest('tr').cells[1].innerText;
    Swal.fire({
        text: "Are you sure you want to delete " + rowId + "?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, delete!",
        cancelButtonText: "No, cancel",
        customClass: {
            confirmButton: "btn fw-bold btn-danger",
            cancelButton: "btn fw-bold btn-active-light-primary"
        }
    }).then(function (result) {
        if (result.value) {
            // ACTION DELETE
            $.ajax({
                url: "/UserType/Delete",
                type: 'Post',
                data: { 'code': rowId },
                dataType: 'json',
                success: function (result) {
                    Swal.fire({
                        text: "You have deleted " + rowId + "!.",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary",
                        }
                    }).then(function () {
                        modal.hide();
                        window.location.href = "UserAccount/Index";
                    });
                },
                error: function (e, t, s) {
                    var errorMessage = e.message;
                    if (errorMessage === "" || errorMessage === undefined) {
                        errorMessage = "Ooops, something went wrong !";
                    }
                    Swal.fire('Error', errorMessage, 'error');
                }
            });

        } else if (result.dismiss === 'cancel') {
            Swal.fire({
                text: customerName + " was not deleted.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                    confirmButton: "btn fw-bold btn-primary",
                }
            });
        }
    });
}