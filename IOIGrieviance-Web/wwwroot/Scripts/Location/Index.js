"use strict";

// Class definition
var KTProjectUsers = function () {

    const table = document.getElementById('kt_table_location');
    const element = document.getElementById('kt_modal_add_location');
    const form = element.querySelector('#kt_modal_add_location_form');
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
            url: "Location/GetAllData",
            data: "",
            dataType: "json",
            type: "GET",
            contentType: "application/json;chartset=utf-8",
            success: function (response) {
                var columnHeaders = [];
                var _table = table.rows[0];

                $('#kt_table_location thead tr')
                    .clone(true)
                    .addClass('filters')
                    .appendTo('#kt_table_location thead');

                var t = $('#kt_table_location').DataTable({
                    data: response.data,
                    "columns": [
                        //{
                        //    data: null,
                        //    className: "center",
                        //    defaultContent: "<div class='form-check form-check-sm form-check-custom form-check-solid'><input class='form-check-input select-checkbox' type ='checkbox' value = '1'></div>"
                        //},
                        { "data": null, "targets": 0 },
                        { "data": "code_header" },
                        { "data": "name" },
                        {
                            data: null,
                            className: "d-flex text-center flex-shrink-0",
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
                    "language": {
                        "paginate": {
                            "next": "<i class='fas fa-angle-right'>",
                            "previous": "<i class='fas fa-angle-left'>",
                            "first": "<i class='fas fa-angle-double-left'>",
                            "last": "<i class='fas fa-angle-double-right'>",
                        }
                    },
                    "pagingType": "full_numbers",
                    "order": [[1, 'desc']],
                    orderCellsTop: true,
                    fixedHeader: true,
                    initComplete: function () {
                        var api = this.api();

                        // For each column
                        api
                            .columns()
                            .eq(0)
                            .each(function (colIdx) {
                                // Set the header cell to contain the input element
                                if (colIdx != 0) {
                                    if (colIdx != 10) {
                                        var cell = $('.filters th').eq(
                                            $(api.column(colIdx).header()).index()
                                        );
                                        var title = $(cell).text();
                                        $(cell).html('<input type="text" placeholder="' + title + '" />');

                                        // On every keypress in this input
                                        $(
                                            'input',
                                            $('.filters th').eq($(api.column(colIdx).header()).index())
                                        )
                                            .off('keyup change')
                                            .on('keyup change', function (e) {
                                                e.stopPropagation();

                                                // Get the search value
                                                $(this).attr('title', $(this).val());
                                                var regexr = '({search})'; //$(this).parents('th').find('select').val();

                                                var cursorPosition = this.selectionStart;
                                                // Search the column for that value
                                                api
                                                    .column(colIdx)
                                                    .search(
                                                        this.value != ''
                                                            ? regexr.replace('{search}', '(((' + this.value + ')))')
                                                            : '',
                                                        this.value != '',
                                                        this.value == ''
                                                    )
                                                    .draw();

                                                $(this)
                                                    .focus()[0]
                                                    .setSelectionRange(cursorPosition, cursorPosition);
                                            });
                                    }
                                }
                            });
                    },//end filter column
                });

                $('.filters th:contains("No")').html('');
                $('.filters th:contains("Action")').html('');

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
                                    callActionCreate({ formId: "kt_modal_add_location_form", title: "save", type: "POST", url: '/Location/create' });
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
        const cancelButton = element.querySelector('[data-kt-location-modal-action="cancel"]');
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
        const closeButton = element.querySelector('[data-kt-location-modal-action="close"]');
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
        const addNewButton = document.querySelector('[data-bs-target="#kt_modal_add_location"]');
        addNewButton.addEventListener('click', e => {
            e.preventDefault();
            $("#kt_modal_add_location_form *").prop('disabled', false);
            $("#kt_modal_add_location_form *").val('');
            $('#code_header').val('');
            $("#kt_modal_add_location_form *").closest('.invalid-feedback').children().remove();
        });


        // Define form element
        const forms = document.getElementById('kt_modal_add_location_form');

        // Init form validation rules.
        var validator = FormValidation.formValidation(
            forms,
            {
                fields: {
                    'name': {
                        validators: {
                            notEmpty: {
                                message: 'Name is required'
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
            url: "Location/Create",
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
        url: "/Location/GetByCode",
        type: 'GET',
        data: { 'code': rowId },
        dataType: 'json',
        success: function (result) {
            if (result.success == 'true') {
                document.querySelector('[name="name"]').value = result.data.name;

                $('#code_header').val(result.data.code_header);

                if (action === 'view') {
                    $("#kt_modal_add_location_form *").prop('disabled', true);
                } else {
                    $("#kt_modal_add_location_form *").prop('disabled', false);
                }

                $("#kt_modal_add_location_form *").closest('.invalid-feedback').children().remove();
                $('#kt_modal_add_location').modal('show');
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
                url: "/Location/Delete",
                type: 'Post',
                data: { 'code': rowId },
                dataType: 'json',
                success: function (result) {
                    if (result.success === "true") {
                        Swal.fire({
                            text: "You have deleted " + rowId + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            //modal.hide();
                            window.location.href = "/Location/Index";
                        });
                    } else {
                        Swal.fire('Warning', result.message, 'warning');
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