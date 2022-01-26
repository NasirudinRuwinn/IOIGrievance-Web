"use strict";

// Class definition
var KTProjectUsers = function () {

    const table = document.getElementById('kt_table_users_account');
    const element = document.getElementById('kt_modal_add_user');
    const form = element.querySelector('#kt_modal_add_user_form');
    var toolbarBase;
    var toolbarSelected;
    var selectedCount;
    const modal = new bootstrap.Modal(element);

    var initTable = function () {

        // Bypass empty table
        if (!table) {
            return;
        }

        // Init datatable
        const actionButton = document.getElementById('default-button-action').children[0].innerHTML;
        $.ajax({
            url: "UserAccount/GetAllData",
            data: "",
            //dataType: "json",
            type: "GET",
            //contentType: "application/json;chartset=utf-8",
            success: function (response) {
                var columnHeaders = [];
                var _table = table.rows[0];

                //for (var i = 0; i < _table.cells.length; i++) {
                //    if (_table.cells[i].headers == "date") {
                //        columnHeaders.push({ 'data': _table.cells[i].id, 'width': _table.cells[i].width, targets: 4, render: function (data, type, row) { return data ? moment(data).format('DD-MMM-YYYY') : ''; } });
                //    } else {
                //        columnHeaders.push({ 'data': _table.cells[i].id, 'width': _table.cells[i].width, targets: 4 });
                //    }
                //}

                var t = $('#kt_table_users_account').DataTable({
                    data: response.data,
                    "columns": [
                        //{
                        //    data: null,
                        //    className: "center",
                        //    defaultContent: "<div class='form-check form-check-sm form-check-custom form-check-solid'><input class='form-check-input select-checkbox' type ='checkbox' value = '1'></div>"
                        //},
                        { "data": null, "targets": 0 },
                        { "data": "code" },
                        { "data": "username" },
                        { "data": "email" },
                        { "data": "mobile_phone" },
                        { "data": "user_account_type_name" },
                        { "data": "company_name" },
                        {
                            data: null,
                            className: "d-flex justify-content-end flex-shrink-0",
                            defaultContent: actionButton
                        }
                    ],
                    "buttons": [
                        "copy", "excel", "pdf"
                    ],
                    "dom": "ltipr",
                    "language": {
                        "paginate": {
                            "next": "<i class='fas fa-angle-right'>",
                            "previous": "<i class='fas fa-angle-left'>",
                            "first": "<i class='fas fa-angle-double-left'>",
                            "last": "<i class='fas fa-angle-double-right'>",
                        }
                    },
                    "pagingType": "full_numbers",
                    "columnDefs": [
                        //{
                        //    "searchable": false,
                        //    "orderable": false,
                        //    "targets": 0,
                        //    "data": null,
                        //    "defaultContent": "<div class='form-check form-check-sm form-check-custom form-check-solid'><input class='form-check-input select-checkbox' type ='checkbox' value = '1'></div>"
                        //},
                        //{
                        //    "searchable": false,
                        //    "orderable": false,
                        //    "targets": 0,
                        //    "data": null
                        //}
                        //{
                        //    "searchable": false,
                        //    "orderable": false,
                        //    "targets": 5,
                        //    "data": null,
                        //    "defaultContent": actionButton
                        //}
                    ],
                    "order": [[1, 'desc']]
                });

                t.on('draw', function () {
                    initToggleToolbar();
                    handleDeleteRows();
                    toggleToolbars();
                    initSelectAllData();
                }).on('order.dt search.dt', function () {
                    t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }).draw();;
                t.page('last').draw('page');

                // Search 
                var filterSearch = document.getElementById('user_account_filter_search');
                if (filterSearch) {
                    filterSearch.addEventListener('keyup', function (e) {
                        t.search(e.target.value).draw();
                    });
                }
            },

            error: function (e) {
                console.log("Error loading data! Please try again." + e);
            }
        });


        // Init form validation rules.
        const e = document.querySelector("#kt_modal_add_user_form")
        const pscore = KTPasswordMeter.getInstance(e.querySelector('[data-kt-password-meter="true"]'));
        var validatePassword = function () {
            return 100 === pscore.getScore();
        };

        var validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'username': {
                        validators: {
                            notEmpty: {
                                message: 'Full name is required'
                            }
                        }
                    },
                    'email': {
                        validators: {
                            notEmpty: {
                                message: 'Valid email address is required'
                            }
                        }
                    },
                    'firstname': {
                        validators: {
                            notEmpty: {
                                message: 'First name is required'
                            }
                        }
                    },
                    'lastname': {
                        validators: {
                            notEmpty: {
                                message: 'Last name is required'
                            }
                        }
                    },
                    'mobile_phone': {
                        validators: {
                            notEmpty: {
                                message: 'Phone is required'
                            }
                        }
                    },
                    'code_role': {
                        validators: {
                            notEmpty: {
                                message: 'Role is required'
                            }
                        }
                    },
                    'code_user_account_type': {
                        validators: {
                            notEmpty: {
                                message: 'User Type is required'
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
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger({
                        event: {
                            password: !1
                        }
                    }),
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

        // Submit button handler
        const submitButton = element.querySelector('[data-kt-users-modal-action="submit"]');
        submitButton.addEventListener('click', e => {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.revalidateField("password"),
                    validator.validate().then(function (status) {
                        console.log('validated!');

                        if (status == 'Valid') {
                            // Show loading indication
                            submitButton.setAttribute('data-kt-indicator', 'on');

                            // Disable button to avoid multiple click 
                            submitButton.disabled = true;

                            // Simulate form submission
                            setTimeout(function () {
                                // Remove loading indication
                                submitButton.removeAttribute('data-kt-indicator');

                                // Enable button
                                submitButton.disabled = false;

                                var purl = $('#code').val() == '' ? "/UserAccount/Create" : "/UserAccount/Update"
                                // Call action post
                                callAction({ formId: "kt_modal_add_user_form", title: "save", type: "POST", url: purl });
                                //form.submit(); // Submit form
                            }, 2000);
                        } else {
                            // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
        const cancelButton = element.querySelector('[data-kt-users-modal-action="cancel"]');
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
        const closeButton = element.querySelector('[data-kt-users-modal-action="close"]');
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
        const addNewButton = document.querySelector('[data-bs-target="#kt_modal_add_user"]');
        addNewButton.addEventListener('click', e => {
            e.preventDefault();
            $("#kt_modal_add_user_form *").prop('disabled', false);
            $("#kt_modal_add_user_form *").val('');
            $('#id').val('');
            $('#preview-file-image').css('background-image', '');
            $("#kt_modal_add_user_form *").closest('.invalid-feedback').children().remove();
            $('#div-password').css('display', 'block');
            $('#div-password-confirm').css('display', 'block');
            $("#username").prop('disabled', false);
        });

        //ddl role
        $('#code_role').select2({
            ajax: {
                url: "/UserAccount/GetDDLLRole",
                dataType: 'json',
                processResults: function (data) {
                    var results = [];
                    $.each(data, function (index, account) {
                        $.each(account, function (i, val) {
                            results.push({
                                id: val.Value,
                                text: val.Text
                            });
                        });
                    });

                    return {
                        results: results
                    };
                }
            }
        });

        //ddl userType
        $('#code_user_account_type').select2({
            ajax: {
                url: "/UserAccount/GetDDLLUserType",
                dataType: 'json',
                processResults: function (data) {
                    var results = [];
                    $.each(data, function (index, account) {
                        $.each(account, function (i, val) {
                            results.push({
                                id: val.Value,
                                text: val.Text
                            });
                        });
                    });

                    return {
                        results: results
                    };
                }
            }
        });
    }

    // Init select all
    var initSelectAllData = () => {

        const selectAll = table.querySelector('[data-kt-check-target="#kt_table_users .form-check-input"]');
        const allCheckboxes = table.querySelectorAll('tbody [type="checkbox"]');
        selectAll.addEventListener('click', e => {
            // Count checked boxes
            if (e.target.checked) {
                allCheckboxes.forEach(c => {
                    console.log(c);
                    c.checked = true;
                });
                console.log(allCheckboxes);
            }
            else {
                allCheckboxes.forEach(c => {
                    c.checked = false;
                });
            }
        });
    }

    // Init toggle toolbar
    var initToggleToolbar = () => {
        // Toggle selected action toolbar
        // Select all checkboxes
        const checkboxes = table.querySelectorAll('[type="checkbox"]');
        var th_select = document.querySelectorAll('[data-kt-check-target="#kt_table_users .form-check-input"]')[0].checked;
        // Select elements
        toolbarBase = document.querySelector('[data-kt-user-table-toolbar="base"]');
        toolbarSelected = document.querySelector('[data-kt-user-table-toolbar="selected"]');
        selectedCount = document.querySelector('[data-kt-user-table-select="selected_count"]');
        const deleteSelected = document.querySelector('[data-kt-user-table-select="delete_selected"]');

        // Toggle delete selected toolbar
        checkboxes.forEach(c => {
            // Checkbox on click event
            c.addEventListener('click', function () {
                setTimeout(function () {
                    toggleToolbars();
                }, 50);
            });
        });

        // Deleted selected rows
        deleteSelected.addEventListener('click', function () {
            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
            Swal.fire({
                text: "Are you sure you want to delete selected customers?",
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
                    Swal.fire({
                        text: "You have deleted all selected customers!.",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary",
                        }
                    }).then(function () {
                        // Remove all selected customers
                        checkboxes.forEach(c => {
                            if (c.checked) {
                                datatable.row($(c.closest('tbody tr'))).remove().draw();
                            }
                        });

                        // Remove header checked box
                        const headerCheckbox = table.querySelectorAll('[type="checkbox"]')[0];
                        headerCheckbox.checked = false;
                    }).then(function () {
                        toggleToolbars(); // Detect checked checkboxes
                        initToggleToolbar(); // Re-init toolbar to recalculate checkboxes
                    });
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Selected customers was not deleted.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary",
                        }
                    });
                }
            });
        });
    }

    // Toggle toolbars
    const toggleToolbars = () => {
        // Select refreshed checkbox DOM elements 
        const allCheckboxes = table.querySelectorAll('tbody [type="checkbox"]');
        // Detect checkboxes state & count
        let checkedState = false;
        let count = 0;

        // Count checked boxes
        allCheckboxes.forEach(c => {
            if (c.checked) {
                checkedState = true;
                count++;
            }
        });

        // Toggle toolbars
        if (checkedState) {
            selectedCount.innerHTML = count;
            toolbarBase.classList.add('d-none');
            toolbarSelected.classList.remove('d-none');
        } else {
            toolbarBase.classList.remove('d-none');
            toolbarSelected.classList.add('d-none');
        }
    }

    // Delete subscirption
    var handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll('[data-kt-users-table-filter="delete_row"]');

        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get user name
                const userName = parent.querySelectorAll('td')[1].querySelectorAll('a')[1].innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + userName + "?",
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
                        Swal.fire({
                            text: "You have deleted " + userName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            // Remove current row
                            datatable.row($(parent)).remove().draw();
                        }).then(function () {
                            // Detect checked checkboxes
                            toggleToolbars();
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
            })
        });
    }

    // Prepare Create Data
    var callAction = (parameter) => {
        var object = {};
        var params = $('#' + parameter.formId).serializeArray();
        const imageURL = $('#preview-file-image').css('background-image');
        var imageValue = '';
        if (imageURL !== 'none') {
            imageValue = imageURL.replace('url("', "").replace('")', "");
        }

        $.each(params, function (i, val) {
            object[val.name] = val.value;
        });
        object.image = imageValue;
        object['code'] = $('#code').val();
        object['id'] = $('#id').val();
        object['code_role'] = $('#code_role').val();
        object['code_user_account_type'] = $('#code_user_account_type').val();

        $.ajax({
            url: "UserAccount/Create",
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
                            window.location.href = "UserAccount/Index";
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
                //mApp.unblock("#m_blockui_list");
            }
        }).then(setTimeout(function () {
            //mApp.unblock("#m_blockui_list");
        }, 2e3));


    }

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
        url: "/UserAccount/GetUserByID",
        type: 'GET',
        data: { 'Id': rowId },
        dataType: 'json',
        success: function (result) {
            if (result.success == 'true') {
                document.querySelector('[name="image"]').value = result.data.image;
                document.querySelector('[name="firstname"]').value = result.data.firstname;
                document.querySelector('[name="lastname"]').value = result.data.lastname;
                document.querySelector('[name="email"]').value = result.data.email;
                document.querySelector('[name="mobile_phone"]').value = result.data.mobile_phone;
                document.querySelector('[name="password"]').value = result.data.password;
                document.querySelector('[name="confirm_password"]').value = result.data.password;
                document.querySelector('[name="username"]').value = result.data.username;
                $('#id').val(result.data.id);
                $('#code').val(result.data.code);
                //ddl role
                var newOptionRole = $("<option selected='selected'></option>").val(result.data.code_role).text(result.data.role_name);
                $("#code_role").append(newOptionRole).trigger('change');

                //ddl userType
                var newOptionUType = $("<option selected='selected'></option>").val(result.data.code_user_account_type).text(result.data.user_account_type_name);
                $("#code_user_account_type").append(newOptionUType).trigger('change');
                $('#div-password').css('display', 'none');
                $('#div-password-confirm').css('display', 'none');
                $("#username").prop('disabled', true);
                if (action === 'view') {
                    $("#kt_modal_add_user_form *").prop('disabled', true);
                } else {
                    $("#kt_modal_add_user_form *").prop('disabled', false);
                }
                $('#preview-file-image').css('background-image', 'url(' + result.data.image + ')');
                $("#kt_modal_add_user_form *").closest('.invalid-feedback').children().remove();
                $('#kt_modal_add_user').modal('show');
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
    var rowId = e.parentNode.closest('tr').cells[3].innerText;
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
            Swal.fire({
                text: "You have deleted " + rowId + "!.",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                    confirmButton: "btn fw-bold btn-primary",
                }
            }).then(function () {
                // Remove current row
                datatable.row($(parent)).remove().draw();
            }).then(function () {
                // Detect checked checkboxes
                toggleToolbars();
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
    //$.ajax({
    //    url: "/UserAccount/Delete",
    //    type: 'Post',
    //    data: { 'Id': rowId },
    //    dataType: 'json',
    //    success: function (result) {
    //        document.querySelector('[name="image"]').value = result.data.image;
    //        document.querySelector('[name="firstname"]').value = result.data.firstname;
    //        document.querySelector('[name="lastname"]').value = result.data.lastname;
    //        document.querySelector('[name="email"]').value = result.data.email;
    //        document.querySelector('[name="mobile_phone"]').value = result.data.mobile_phone;
    //        document.querySelector('[name="password"]').value = result.data.password;
    //        document.querySelector('[name="confirm_password"]').value = result.data.password;
    //        $('#id').val(result.data.id);
    //        if (action === 'view') {
    //            $("#kt_modal_add_user_form *").prop('disabled', true);
    //        } else {
    //            $("#kt_modal_add_user_form *").prop('disabled', false);
    //        }
    //        $('#preview-file-image').css('background-image', 'url(' + result.data.image + ')');
    //        $("#kt_modal_add_user_form *").closest('.invalid-feedback').children().remove();
    //        $('#kt_modal_add_user').modal('show');
    //    },
    //    error: function (e, t, s) {
    //        var errorMessage = e.message;
    //        if (errorMessage === "" || errorMessage === undefined) {
    //            errorMessage = "Ooops, something went wrong !";
    //        }
    //        Swal.fire('Error', errorMessage, 'error');
    //    }
    //});
}



