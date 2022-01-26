"use strict";

// Class definition
var KTProjectUsers = function () {

    const table = document.getElementById('kt_table_trx');
    const element = document.getElementById('kt_modal_add_trx');
    const form = element.querySelector('#kt_modal_add_trx_form');
    const formValidate = document.getElementById('kt_modal_add_trx_form');
    //var toolbarBase;
    //var toolbarSelected;
    //var selectedCount;
    const modal = new bootstrap.Modal(element);
    var initTable = function () {

        //Bypass empty table
        if (!table) {
            return;
        }

        // Init datatable
        const actionButtonAll = document.getElementById('default-button-action-all').children[0].innerHTML;
        const actionButtonView = document.getElementById('default-button-action-view').children[0].innerHTML;
        //const actionButton = document.getElementById('default-button-action-all').children[0].innerHTML;

        $.ajax({
            url: "Transaction/GetAllData",
            data: "",
            dataType: "json",
            type: "GET",
            contentType: "application/json;chartset=utf-8",
            success: function (response) {
                var columnHeaders = [];
                var _table = table.rows[0];

                for (var i = 0; i < _table.cells.length; i++) {
                    if (_table.cells[i].headers == "date") {
                        columnHeaders.push({ 'data': _table.cells[i].id, 'width': _table.cells[i].width, render: function (data, type, row) { return data ? moment(data).format('DD-MMM-YYYY') : ''; } });
                    }
                    else if (_table.cells[i].headers == "status") {
                        columnHeaders.push({
                            'data': 'id_status', render: function (data, type, row) {
                                return data == '1' ? '<span class="badge badge-light-info">HQ Verification</span>' : data == '2' ? '<span class="badge badge-light-warning">On Progress</span>' : data == '3' ? '<span class="badge badge-light-primary">HQ Final Verification</span>' : data == '4' ? '<span class="badge badge-light-success">New</span>' : '<span class="badge badge-light-info"> Reject</span>'
                            }//,
                            //'width': table.cells[i].width, targets: i
                        });
                    }
                    else {
                        columnHeaders.push({ 'data': _table.cells[i].id, 'width': _table.cells[i].width });
                    }
                }

                var t = $('#kt_table_trx').DataTable({
                    data: response.data,
                    "columns": columnHeaders,
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
                        {
                            "searchable": false,
                            "orderable": false,
                            "targets": 0,
                            "data": null,
                            "defaultContent": ""
                        },
                        {
                            "searchable": false,
                            "orderable": false,
                            "targets": 1,
                            "data": null,
                            "defaultContent": "",
                            "className": "d-none"
                            //"visible": false
                        },
                        {
                            "searchable": false,
                            "orderable": false,
                            "targets": 9,
                            "data": 'id_status',
                            "className": "d-flex justify-content-end flex-shrink-0",
                            "render": function (data, type, row, meta) {
                                return row.id_status == 2 ? actionButtonView : actionButtonAll;
                            },
                            //"defaultContent": actionButton
                        }
                    ],
                    "order": [[2, 'desc']]
                });

                t.on('draw', function () {
                    //initToggleToolbar();
                    //handleDeleteRows();
                    //toggleToolbars();
                    //initSelectAllData();
                }).on('order.dt search.dt', function () {
                    t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }).draw();;
                t.page('last').draw('page');

                // Search 
                var filterSearch = document.getElementById('transaction_filter_search');
                if (filterSearch) {
                    filterSearch.addEventListener('keyup', function (e) {
                        t.search(e.target.value).draw();
                    });
                }
            },

            error: function () {
                console.log("Error loading data! Please try again.");
            }
        });

        // Submit button handler
        const submitButton = document.getElementById('btn-submit');
        submitButton.addEventListener('click', e => {
            e.preventDefault();
            // Validate form before submit

            if (validator) {
                validator.validate().then(function (status) {
                    console.log('validated!');
                    var AttchValid = attachmentValidation();
                    if (status == 'Valid') {
                        if (AttchValid == 'Valid') {
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
                                        callActionTrx({ formId: "kt_modal_add_trx_form", title: "save", type: "POST", url: '/Transaction/create' });
                                        //form.submit(); // Submit form
                                    }, 2000);
                                }
                            });
                        } else {
                            Swal.fire({
                                text: AttchValid,
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });
                        }

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

        // Reject button handler
        const rejectButton = document.getElementById('btn-reject');
        rejectButton.addEventListener('click', e => {
            e.preventDefault();
            // Validate form before submit

            if (validator) {
                validator.validate().then(function (status) {

                    console.log('validated!');
                    var AttchValid = attachmentValidation();
                    if (status == 'Valid') {
                        if (AttchValid == 'Valid') {
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
                                        callActionTrx({ formId: "kt_modal_add_trx_form", title: "save", type: "POST", url: '' });
                                        //form.submit(); // Submit form
                                    }, 2000);
                                }
                            });
                        } else {
                            Swal.fire({
                                text: AttchValid,
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });
                        }

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
        const cancelButton = element.querySelector('[data-kt-trx-modal-action="cancel"]');
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
        const closeButton = element.querySelector('[data-kt-trx-modal-action="close"]');
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
        const addNewButton = document.querySelector('[data-bs-target="#kt_modal_add_trx"]');
        addNewButton.addEventListener('click', e => {
            e.preventDefault();
            $("#kt_modal_add_trx_form *").prop('disabled', false);
            $('#bstop').attr('disabled', true);
            $('#pauseButton').attr('disabled', true);
            $("#kt_modal_add_trx_form *").val('');
            $('#id').val('');
            $("#kt_modal_add_trx_form *").closest('.invalid-feedback').children().remove();
            $("#kt_dropzonejs_example_1 *").closest('.dz-image-preview').remove();
            $("#kt_dropzonejs_example_1 .dz-message.needsclick *").removeClass('d-none')
            $('#lbl-upload-image').css('display', 'flex');
            $('#voice_note').val('');
            $('#div-button-voice-translate').css('display', 'none');
            $('#div-voice-translate-result').css('display', 'none');
            $('#div-button-desc-translate').css('display', 'none');
            $('#div-desc-translate-result').css('display', 'none');
            $('#div-recipient').css('display', 'none');
            $('#div-notes').css('display', 'none');
            $("#lbl-recipient").removeClass("required");
            $("#btn-reject").addClass("d-none");
            $("#lbl-notes").removeClass("required");
            $('#btn-approve').css('display', 'none');
            $('#btn-reject').css('display', 'none');
            //document.getElementById('id_recipient').removeAttribute('name');
            //document.getElementById('notes').removeAttribute('name');
            //$('#notes').rules('add', {
            //    required: false
            //});
            //$('#id_recipient').rules('add', {
            //    required: false
            //});
            if (document.getElementById('ul').children.length > 0) { document.getElementById('ul').children[0].remove(); }
            //Date Format for .Requested  Date
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            today = dd + '/' + mm + '/' + yyyy;
            $("#created_date").val(today);
            //$("#id_location").select2("destroy");
            //$("#id_bussiness").select2("destroy");
        });

        // dropdown
        _loc(); _bussiness(); _allLang();

        $('#id_recipient').select2({
            ajax: {
                url: "/Transaction/GetAllRecipient",
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

        // end ddl

        // Define form element
        const forms = document.getElementById('kt_modal_add_trx_form');

        // Init form validation rules.
        var validator = FormValidation.formValidation(
            forms,
            {
                fields: {
                    'suspected': {
                        validators: {
                            notEmpty: {
                                message: 'Text input is required'
                            }
                        }
                    },
                    'id_bussiness': {
                        validators: {
                            notEmpty: {
                                message: 'Business Unit is required'
                            }
                        }
                    },
                    'id_location': {
                        validators: {
                            notEmpty: {
                                message: 'Location is required'
                            }
                        }
                    },
                    'fraud': {
                        validators: {
                            notEmpty: {
                                message: 'Note is required'
                            }
                        }
                    },
                    'id_recipient': {
                        validators: {
                            notEmpty: {
                                message: 'Recipients is required'
                            }
                        }
                    },
                    'justification_request_from_dispatcher': {
                        validators: {
                            notEmpty: {
                                message: 'Justification Request is required'
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

        $(form.querySelector('[name="id_location"]')).on('change', function () {
            // Revalidate the field when an option is chosen
            validator.revalidateField('id_location');
        });
        $(form.querySelector('[name="id_bussiness"]')).on('change', function () {
            // Revalidate the field when an option is chosen
            validator.revalidateField('id_bussiness');
        });
    }

    function attachmentValidation() {
        // Start image validation
        var statusReturn = 'Valid';
        const total_image = document.querySelector('#kt_dropzonejs_example_1').childElementCount - 1;
        console.log(total_image);
        if (total_image > 5) {
            statusReturn = 'Max required image file is 5';
        }
        if (total_image == 0) {
            statusReturn = 'Attachment is required';
        }
        return statusReturn;
        // End image validation
    }


    // Prepare Create Data
    var callActionTrx = (parameter) => {
        var object = {};
        var params = $('#' + parameter.formId).serializeArray();
        const submitButton1 = element.querySelector('[data-kt-trx-modal-action="submit"]');


        //Start image collection data
        var arrayImage = [];
        document.querySelector('#kt_dropzonejs_example_1').children.forEach(previmg => {
            previmg.firstElementChild.children.forEach(a => {
                //collect a.currentSrc
                var x = JSON.parse(JSON.stringify(a.currentSrc));
                arrayImage.push(x);
            });
        });
        //end image collection data

        //Start property collection data
        $.each(params, function (i, val) {
            object[val.name] = val.value;
        });
        //end property collection data

        //Start get lits recipient
        $.each(params, function (i, val) {
            object[val.name] = val.value;
        });
        //end get lits recipient

        object['createTransDAttachmentDto'] = arrayImage;
        object['createTransDSTTDto'] = $('#voice_note').val();
        object['code_location'] = $('#id_location').val();
        object['code_bussiness_unit'] = $('#id_bussiness').val();
        object['user_dispatcher'] = $('#hdn_nik').val();
        object['createTransDRecipientDto'] = $('#id_recipient').val();
        object['code'] = $('#code').val();
        //end property collection data

        //Start call ajax
        $.ajax({
            url: "Transaction/Create",
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

    // Prepare Create Data
    var callActionApproveReject = (parameter) => {
        var object = {};
        var params = $('#' + parameter.formId).serializeArray();
        const submitButton1 = document.getElementById()
        var url = "";
        if ($('#status_id').val() == '4')
            url = "Transaction/Reject";
        else
            url = "Transaction/Approve";
        //end image collection data

        //Start property collection data
        $.each(params, function (i, val) {
            object[val.name] = val.value;
        });
        //end property collection data

        object['code_location'] = $('#id_location').val();
        object['code_bussiness_unit'] = $('#id_bussiness').val();
        object['user_dispatcher'] = $('#hdn_nik').val();
        object['createTransDRecipientDto'] = $('#id_recipient').val();
        object['code'] = $('#code').val();
        //end property collection data

        //Start call ajax
        $.ajax({
            url: url,
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

    //getAjaxDataToSelectPicker("", "id_location", "/Transaction/GetDDLLocation", calbackSelectedValueLocation);
    var _loc = () => {
        $('#id_location').select2({
            ajax: {
                url: "/Transaction/GetDDLLocation",
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
    //getAjaxDataToSelectPicker("", "id_bussiness", "/Transaction/GetDDLLBusinnessType", calbackSelectedValueBusiness);
    var _bussiness = () => {
        $('#id_bussiness').select2({
            ajax: {
                url: "/Transaction/GetDDLLBusinnessType",
                data: function (params) {
                    return {
                        code_location: $('#id_location').val()
                    };
                },
                // data: { 'code_location': $('#id_location').val() },
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
    //ddl all lang
    var _allLang = () => {
        $('.all-lang-ddl').select2({
            ajax: {
                url: "/Transaction/GetAllLang",
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
    // end dropdown

    // Public methods
    return {
        init: function () {
            initTable();
        }
    }
}();

var KTFormsDropzoneJSDemos = {
    init: function (e) {


        var l = new Dropzone("#kt_dropzonejs_example_1", {
            url: "*",
            paramName: "file",
            maxFiles: 5,
            //maxFilesize: 10,
            addRemoveLinks: !0,
            accept: function (e, o) {
                //console.log(e.dataTransfer.files.length);
                "wow.jpg" == e.name ? o("Naha, you don't.") : o();
                document.getElementsByClassName('dz-progress')[0].remove();
                document.getElementsByClassName('dz-error-message')[0].remove();
                document.getElementsByClassName('dz-success-mark')[0].remove();
                document.getElementsByClassName('dz-error-mark')[0].remove();

            }
        });
        l.on("addedfile", (function (r) {

        }))
    }
};

//Start collect audio
var KTFormsAudio = {

    init: function () {
        const element = document.getElementById('kt_modal_add_trx');
        const bstart = document.getElementById('bstart');
        const bstop = document.getElementById('bstop');
        const bpause = document.getElementById('pauseButton');
        const bvoicetranslate = document.getElementById('btn-voice-transalate');
        const bdesctranslate = document.getElementById('btn-desc-transalate');
        const ul = document.getElementById('ul');
        const ewave = document.querySelector('#waveform');
        let recorder, stream, audio, chunks, media, counter = 1, wavesurfer, context, processor;;
        bstart.disabled = false;
        // Start rec button handler
        bstart.addEventListener('click', e => {
            e.preventDefault();
            chunks = [];
            ul.innerHTML = "";
            ewave.innerHTML = "";
            audio = {
                tag: 'audio',
                type: 'audio/ogg',
                ext: '.ogg',
                gUM: { audio: true }
            };

            media = audio;
            navigator.mediaDevices.getUserMedia(audio.gUM).then(_stream => {
                stream = _stream;
                bstart.removeAttribute('disabled');
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = e => {
                    chunks.push(e.data);
                    if (recorder.state == 'inactive') makeLink();
                };
                console.log('got media successfully');
                recorder.start();
            }).catch(console.log('got media error'));

            bstart.disabled = true;
            bstop.disabled = false;
            bpause.disabled = false;



            // Init wavesurfer
            wavesurfer = WaveSurfer.create({
                container: '#waveform',
                waveColor: 'black',
                interact: false,
                cursorWidth: 0,
                audioContext: context || null,
                audioScriptProcessor: processor || null,
                plugins: [
                    WaveSurfer.microphone.create({
                        bufferSize: 4096,
                        numberOfInputChannels: 1,
                        numberOfOutputChannels: 1,
                        constraints: {
                            video: false,
                            audio: true
                        }
                    })
                ]
            });

            wavesurfer.microphone.on('deviceReady', function () {
                console.info('Device ready!');
            });
            wavesurfer.microphone.on('deviceError', function (code) {
                console.warn('Device error: ' + code);
            });
            wavesurfer.on('error', function (e) {
                console.warn(e);
            });
            wavesurfer.microphone.start();
        });

        // Stop rec button handler
        bstop.addEventListener('click', e => {
            e.preventDefault();
            bstop.disabled = true;
            recorder.stop();
            bstart.disabled = false;
            bpause.disabled = true;
            wavesurfer.microphone.stop();
            ewave.innerHTML = "";
            chunks = [];
            wavesurfer.microphone.destroy();
        });

        //pause
        bpause.addEventListener('click', e => {
            e.preventDefault();
            recorder.pause();
            wavesurfer.microphone.pause();
            bstart.disabled = false;
            bpause.disabled = true;
        });

        //translate voice
        bvoicetranslate.addEventListener('click', e => {
            e.preventDefault();
            $('#div-voice-translate-result').css('display', 'block');
        });

        //translate desc
        bdesctranslate.addEventListener('click', e => {
            e.preventDefault();
            $('#div-desc-translate-result').css('display', 'block');
        });

        function makeLink() {
            let blob = new Blob(chunks, { type: media.type })
                , url = URL.createObjectURL(blob)
                , li = document.createElement('li')
                , mt = document.createElement(media.tag)
                , hf = document.createElement('a')
                ;
            mt.controls = true;
            mt.src = url;
            hf.href = url;
            hf.download = `${counter++}${media.ext}`;
            //hf.innerHTML = `donwload ${hf.download}`;
            li.appendChild(mt);
            li.appendChild(hf);
            ul.appendChild(li);

            // Converting audio blob to base64
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                var base64data = reader.result;
                document.getElementById("voice_note").value = base64data;
                // $('#voice_note').val(base64data)//console.log(base64data);
            }

        }
    }
};
//End collect audio

// On document ready
$(document).ready(function () {
    KTProjectUsers.init();
    KTFormsDropzoneJSDemos.init();
    KTFormsAudio.init();
});

function btnViewAction(e, action) {
    var rowId = e.parentNode.closest('tr').cells[1].innerText;
    const divImage = document.getElementById('kt_dropzonejs_example_1');
    $("#kt_dropzonejs_example_1 *").closest('.dz-image-preview').remove();
    $("#kt_dropzonejs_example_1 .dz-message.needsclick *").addClass('d-none');
    $("#ul").children().remove();
    $("#kt_modal_add_trx_form *").prop('disabled', true);
    $("#kt_modal_add_trx_form *").closest('.invalid-feedback').children().remove();
    KTProjectUsers._loc;
    var divImg = '';
    $.ajax({
        url: "/Transaction/GetDataByID",
        type: 'GET',
        data: { 'Id': rowId },
        dataType: 'json',
        success: function (result) {

            //Location
            var newOptionLoc = $("<option selected='selected'></option>").val(result.data.code_location).text(result.data.location_name);
            $("#id_location").append(newOptionLoc).trigger('change');
            //Business
            var newOptionBus = $("<option selected='selected'></option>").val(result.data.code_bussiness_unit).text(result.data.bussiness_unit_name);
            $("#id_bussiness").append(newOptionBus).trigger('change');

            document.querySelector('[name="created_date"]').value = result.data.created_date;
            document.querySelector('[name="suspected"]').value = result.data.suspected;
            document.querySelector('[name="fraud"]').value = result.data.fraud;
            $('#code').val(result.data.code);

            if (action === 'view') {
                $('#div-button-voice-translate').css('display', 'none');
                $('#div-button-desc-translate').css('display', 'none');
                $('#lbl-upload-image').css('display', 'none');
                $('#div-recipient').css('display', 'none');
                $('#div-notes').css('display', 'none');
            } else {
                $('#div-button-voice-translate').css('display', 'block');
                $('#div-button-desc-translate').css('display', 'block');
                $('#lbl-upload-image').css('display', 'block');
                //$('#btn-reject').css('display', 'block'); d-none
                $("#btn-reject").removeClass("d-none");
                document.getElementById('btn-voice-transalate').removeAttribute('disabled');
                document.getElementById('btn-desc-transalate').removeAttribute('disabled');
                document.getElementById('id_all_lang_desc').removeAttribute('disabled');
                document.getElementById('id_all_lang_voice').removeAttribute('disabled');
                document.getElementById('btn-reject').removeAttribute('disabled');
                document.getElementById('btn-submit').removeAttribute('disabled');
                document.getElementById('id_recipient').removeAttribute('disabled');
                document.getElementById('justification_request_from_dispatcher').removeAttribute('disabled');
                $('#div-recipient').css('display', 'block');
                $('#div-notes').css('display', 'block');
                $("#lbl-recipient").addClass("required");
                $("#lbl-notes").addClass("required");

                if ($('#hdn_user_static').val() == '2' && (result.data.id_status == '1' || result.data.id_status == '4')) {
                    $('#btn-approve').css('display', 'none');
                    $('#btn-reject').css('display', 'block');
                }

                if ($('#hdn_user_static').val() == '2' && result.data.status_id == '5') {
                    $('#btn-approve').css('display', 'block');
                    $('#btn-reject').css('display', 'none');
                }
            }

            document.getElementById('btn-cancel').removeAttribute('disabled');
            // dinamic create image
            result.data.createTransDAttachmentDto.forEach(c => {
                divImg += "<div class='dz-preview dz-processing dz-image-preview dz-error dz-complete'><div class='dz-image'><img data-dz-thumbnail='' src='" + c + "'></div></div>";
            });

            $('#kt_dropzonejs_example_1').append(divImg);

            // AUDIO PLAY
            const ul = document.getElementById('ul');
            let li = document.createElement('li'), audio = document.createElement('audio');
            audio.controls = true;
            audio.src = result.data.createTransDSTTDto;
            li.appendChild(audio);
            ul.appendChild(li);
            // END AUDIO

            $('#kt_modal_add_trx').modal('show');
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

function wavePlayDetail(url) {
    var wavesurfer;
    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#428bca',
        progressColor: '#31708f',
        height: 120,
        barWidth: 3
    });
    wavesurfer.load(url);
    wavesurfer.play();
}
