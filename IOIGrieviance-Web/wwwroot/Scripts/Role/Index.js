"use strict";

// Class definition
var KTProjectUsers = function () {

    const table = document.getElementById('kt_table_role');
    //const element = document.getElementById('kt_modal_add_trx');
    //const form = element.querySelector('#kt_modal_add_trx_form');
    //const formValidate = document.getElementById('kt_modal_add_trx_form');

    //const modal = new bootstrap.Modal(element);
    var initTable = function () {

        //Bypass empty table
        if (!table) {
            return;
        }

        // Init datatable
        const actionButton = document.getElementById('default-button-action').children[0].innerHTML;

        $.ajax({
            url: "Role/GetAllData",
            data: "",
            dataType: "json",
            type: "GET",
            contentType: "application/json;chartset=utf-8",
            success: function (response) {
                var columnHeaders = [];
                var _table = table.rows[0];

                //for (var i = 0; i < _table.cells.length; i++) {
                //    if (_table.cells[i].headers == "date") {
                //        columnHeaders.push({ 'data': _table.cells[i].id, 'width': _table.cells[i].width, render: function (data, type, row) { return data ? moment(data).format('DD-MMM-YYYY') : ''; } });
                //    }
                //    else if (_table.cells[i].headers == "status") {
                //        columnHeaders.push({
                //            'data': 'id_status', render: function (data, type, row) {
                //                return data == '2' ? '<span class="badge badge-light-warning">In Progress</span>' : data == '3' ? '<span class="badge badge-light-success">Done</span>' : data == '4' ? '<span class="badge badge-light-danger">Rejected</span>' : '<span class="badge badge-light-primary">New</span>'
                //            }
                //        });
                //    }
                //    else {
                //        columnHeaders.push({ 'data': _table.cells[i].id, 'width': _table.cells[i].width });
                //    }
                //}

                var t = $('#kt_table_role').DataTable({
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
        //    const submitButton = document.getElementById('btn-submit');
        //    submitButton.addEventListener('click', e => {
        //        e.preventDefault();
        //        // Validate form before submit

        //        if (validator) {
        //            validator.validate().then(function (status) {
        //                console.log('validated!');
        //                var AttchValid = attachmentValidation();
        //                if (status == 'Valid') {
        //                    if (AttchValid == 'Valid') {
        //                        Swal.fire({
        //                            title: "Confirmation",
        //                            text: 'Are you sure want to submit this data?',
        //                            type: "question",
        //                            icon: 'question',
        //                            showCancelButton: !0,
        //                            confirmButtonText: "Yes",
        //                            cancelButtonText: "No",
        //                            confirmButtonColor: '#3085d6',
        //                            cancelButtonColor: '#d33',
        //                            reverseButtons: !0,
        //                            customClass: {
        //                                //confirmButton: "btn btn-primary"
        //                            }
        //                        }).then(function (ok) {
        //                            if (ok.value) {
        //                                // Simulate form submission
        //                                // Show loading indication
        //                                submitButton.setAttribute('data-kt-indicator', 'on');
        //                                // Disable button to avoid multiple click 
        //                                submitButton.disabled = true;
        //                                setTimeout(function () {
        //                                    Swal.close();

        //                                    // Remove loading indication
        //                                    //submitButton.removeAttribute('data-kt-indicator');
        //                                    // Enable button
        //                                    //submitButton.disabled = false;

        //                                    // Call action post
        //                                    callActionTrx({ formId: "kt_modal_add_trx_form", title: "save", type: "POST", url: '/Transaction/create' });
        //                                    //form.submit(); // Submit form
        //                                }, 2000);
        //                            }
        //                        });
        //                    } else {
        //                        Swal.fire({
        //                            text: AttchValid,
        //                            icon: "error",
        //                            buttonsStyling: false,
        //                            confirmButtonText: "Ok, got it!",
        //                            customClass: {
        //                                confirmButton: "btn btn-primary"
        //                            }
        //                        });
        //                    }

        //                } else {
        //                    // Show popup warning.
        //                    Swal.fire({
        //                        text: "Sorry, looks like there are some errors detected, please try again.",
        //                        icon: "error",
        //                        buttonsStyling: false,
        //                        confirmButtonText: "Ok, got it!",
        //                        customClass: {
        //                            confirmButton: "btn btn-primary"
        //                        }
        //                    });
        //                }
        //            });
        //        }
        //    });

        //    // Cancel button handler
        //    const cancelButton = element.querySelector('[data-kt-trx-modal-action="cancel"]');
        //    cancelButton.addEventListener('click', e => {
        //        e.preventDefault();

        //        Swal.fire({
        //            text: "Are you sure you would like to cancel?",
        //            icon: "warning",
        //            showCancelButton: true,
        //            buttonsStyling: false,
        //            confirmButtonText: "Yes, cancel it!",
        //            cancelButtonText: "No, return",
        //            customClass: {
        //                confirmButton: "btn btn-primary",
        //                cancelButton: "btn btn-active-light"
        //            }
        //        }).then(function (result) {
        //            if (result.value) {
        //                form.reset(); // Reset form			
        //                modal.hide();
        //            } else if (result.dismiss === 'cancel') {
        //                Swal.fire({
        //                    text: "Your form has not been cancelled!.",
        //                    icon: "error",
        //                    buttonsStyling: false,
        //                    confirmButtonText: "Ok, got it!",
        //                    customClass: {
        //                        confirmButton: "btn btn-primary",
        //                    }
        //                });
        //            }
        //        });
        //    });

        //    // Close button handler
        //    const closeButton = element.querySelector('[data-kt-trx-modal-action="close"]');
        //    closeButton.addEventListener('click', e => {
        //        e.preventDefault();

        //        Swal.fire({
        //            text: "Are you sure you would like to cancel?",
        //            icon: "warning",
        //            showCancelButton: true,
        //            buttonsStyling: false,
        //            confirmButtonText: "Yes, cancel it!",
        //            cancelButtonText: "No, return",
        //            customClass: {
        //                confirmButton: "btn btn-primary",
        //                cancelButton: "btn btn-active-light"
        //            }
        //        }).then(function (result) {
        //            if (result.value) {
        //                form.reset(); // Reset form			
        //                modal.hide();
        //            } else if (result.dismiss === 'cancel') {
        //                Swal.fire({
        //                    text: "Your form has not been cancelled!.",
        //                    icon: "error",
        //                    buttonsStyling: false,
        //                    confirmButtonText: "Ok, got it!",
        //                    customClass: {
        //                        confirmButton: "btn btn-primary",
        //                    }
        //                });
        //            }
        //        });
        //    });

        //    // Add new button
        //    const addNewButton = document.querySelector('[data-bs-target="#kt_modal_add_trx"]');
        //    addNewButton.addEventListener('click', e => {
        //        e.preventDefault();
        //        $("#kt_modal_add_trx_form *").prop('disabled', false);
        //        $('#bstop').attr('disabled', true);
        //        $('#pauseButton').attr('disabled', true);
        //        $("#kt_modal_add_trx_form *").val('');
        //        $('#id').val('');
        //        $("#kt_modal_add_trx_form *").closest('.invalid-feedback').children().remove();
        //        $("#kt_dropzonejs_example_1 *").closest('.dz-image-preview').remove();
        //        $("#kt_dropzonejs_example_1 .dz-message.needsclick *").removeClass('d-none')
        //        $('#lbl-upload-image').css('display', 'flex');
        //        $('#voice_note').val('');
        //        $('#div-button-voice-translate').css('display', 'none');
        //        $('#div-voice-translate-result').css('display', 'none');
        //        $('#div-button-desc-translate').css('display', 'none');
        //        $('#div-desc-translate-result').css('display', 'none');
        //        $('#div-recipient').css('display', 'none');
        //        $('#div-notes').css('display', 'none');
        //        $("#lbl-recipient").removeClass("required");
        //        $("#btn-reject").addClass("d-none");
        //        $("#lbl-notes").removeClass("required");
        //        //document.getElementById('id_recipient').removeAttribute('name');
        //        //document.getElementById('notes').removeAttribute('name');
        //        //$('#notes').rules('add', {
        //        //    required: false
        //        //});
        //        //$('#id_recipient').rules('add', {
        //        //    required: false
        //        //});
        //        if (document.getElementById('ul').children.length > 0) { document.getElementById('ul').children[0].remove(); }
        //        //Date Format for .Requested  Date
        //        var today = new Date();
        //        var dd = today.getDate();
        //        var mm = today.getMonth() + 1; //January is 0!
        //        var yyyy = today.getFullYear();

        //        if (dd < 10) {
        //            dd = '0' + dd
        //        }
        //        if (mm < 10) {
        //            mm = '0' + mm
        //        }
        //        today = dd + '/' + mm + '/' + yyyy;
        //        $("#created_date").val(today);
        //        //$("#id_location").select2("destroy");
        //        //$("#id_bussiness").select2("destroy");
        //    });


        //    //ddl
        //    $('#id_recipient').select2({
        //        ajax: {
        //            url: "/Transaction/GetAllRecipient",
        //            dataType: 'json',
        //            processResults: function (data) {
        //                var results = [];
        //                $.each(data, function (index, account) {
        //                    $.each(account, function (i, val) {
        //                        results.push({
        //                            id: val.Value,
        //                            text: val.Text
        //                        });
        //                    });
        //                });

        //                return {
        //                    results: results
        //                };
        //            }
        //        }
        //    });
        //    // end ddl

        //    // Define form element
        //    const forms = document.getElementById('kt_modal_add_trx_form');

        //    // Init form validation rules.
        //    var validator = FormValidation.formValidation(
        //        forms,
        //        {
        //            fields: {
        //                'suspected': {
        //                    validators: {
        //                        notEmpty: {
        //                            message: 'Text input is required'
        //                        }
        //                    }
        //                },
        //                'id_bussiness': {
        //                    validators: {
        //                        notEmpty: {
        //                            message: 'Business Unit is required'
        //                        }
        //                    }
        //                },
        //                'id_location': {
        //                    validators: {
        //                        notEmpty: {
        //                            message: 'Location is required'
        //                        }
        //                    }
        //                },
        //                'fraud': {
        //                    validators: {
        //                        notEmpty: {
        //                            message: 'Note is required'
        //                        }
        //                    }
        //                },
        //                'id_recipient': {
        //                    validators: {
        //                        notEmpty: {
        //                            message: 'Recipients is required'
        //                        }
        //                    }
        //                },
        //                'hq_note_to_justificator': {
        //                    validators: {
        //                        notEmpty: {
        //                            message: 'Justification Request is required'
        //                        }
        //                    }
        //                },
        //            },

        //            plugins: {
        //                trigger: new FormValidation.plugins.Trigger(),
        //                excluded: new FormValidation.plugins.Excluded(),
        //                submitButton: new FormValidation.plugins.SubmitButton(),
        //                bootstrap: new FormValidation.plugins.Bootstrap5({
        //                    rowSelector: '.fv-row',
        //                    eleInvalidClass: '',
        //                    eleValidClass: ''
        //                })
        //            }
        //        }
        //    );

        //    $(form.querySelector('[name="id_location"]')).on('change', function () {
        //        // Revalidate the field when an option is chosen
        //        validator.revalidateField('id_location');
        //    });
        //}

        //// Prepare Create Data
        //var callActionTrx = (parameter) => {
        //    var object = {};
        //    var params = $('#' + parameter.formId).serializeArray();
        //    const submitButton1 = element.querySelector('[data-kt-trx-modal-action="submit"]');


        //    //Start image collection data
        //    var arrayImage = [];
        //    document.querySelector('#kt_dropzonejs_example_1').children.forEach(previmg => {
        //        previmg.firstElementChild.children.forEach(a => {
        //            //collect a.currentSrc
        //            var x = JSON.parse(JSON.stringify(a.currentSrc));
        //            arrayImage.push(x);
        //        });
        //    });
        //    //end image collection data

        //    //Start property collection data
        //    $.each(params, function (i, val) {
        //        object[val.name] = val.value;
        //    });
        //    //end property collection data

        //    //Start get lits recipient
        //    $.each(params, function (i, val) {
        //        object[val.name] = val.value;
        //    });
        //    //end get lits recipient

        //    object['createTransDAttachmentDto'] = arrayImage;
        //    object['createTransDSTTDto'] = $('#voice_note').val();
        //    object['code_location'] = $('#id_location').val();
        //    object['code_bussiness_unit'] = $('#id_bussiness').val();
        //    object['user_dispatcher'] = $('#hdn_nik').val();
        //    object['createTransDRecipientDto'] = $('#id_recipient').val();
        //    object['code'] = $('#code').val();
        //    //end property collection data

        //    //Start call ajax
        //    $.ajax({
        //        url: "Transaction/Create",
        //        type: 'POST',
        //        data: object,
        //        dataType: 'json',
        //        success: function (result) {
        //            if (result.success === "true") {
        //                // Show popup confirmation 
        //                Swal.fire({
        //                    text: "Form has been successfully submitted!",
        //                    icon: "success",
        //                    buttonsStyling: false,
        //                    confirmButtonText: "Ok, got it!",
        //                    customClass: {
        //                        confirmButton: "btn btn-primary"
        //                    }
        //                }).then(function (result) {
        //                    if (result.isConfirmed) {
        //                        modal.hide();
        //                        window.location.reload();
        //                    }
        //                });
        //                // Remove loading indication
        //                submitButton1.removeAttribute('data-kt-indicator');
        //                // Enable button
        //                submitButton1.disabled = false;
        //                //$('#id_location').select2(); $('#id_bussiness').select2();
        //                //_loc(); _bussiness();
        //            } else {
        //                //$('#loadbar').remove();
        //                Swal.fire('Warning', result.message, 'warning');
        //            }
        //            //mApp.unblock("#m_blockui_list");
        //        },
        //        error: function (e, t, s) {
        //            $('#loadbar').remove();
        //            var errorMessage = e.message;
        //            if (errorMessage === "" || errorMessage === undefined) {
        //                errorMessage = "Ooops, something went wrong !";
        //            }
        //            Swal.fire('Error', errorMessage, 'error');
        //            // Remove loading indication
        //            submitButton1.removeAttribute('data-kt-indicator');
        //            // Enable button
        //            submitButton1.disabled = false;
        //            //mApp.unblock("#m_blockui_list");
        //        }
        //    }).then(setTimeout(function () {
        //        //mApp.unblock("#m_blockui_list");
        //    }, 2e3));

        //    //end call ajax

        //}
        //// end create data


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