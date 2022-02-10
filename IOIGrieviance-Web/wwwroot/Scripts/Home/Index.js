"use strict";

// Class definition
var KTProjectUsers = function () {

    //const table = document.getElementById('kt_table_role');

    var initTable = function () {

        // Init datatable
        // =====================================================================================================================
        var tempDataSet = [];
        var dataSet = [];
        var tbodyElement = document.getElementById('tbodyElement').innerHTML;
        var tbodyAppend = '';
        var tbody = '';
        var tempTbody = '';
        $.ajax({
            url: "Transaction/GetAllData",
            data: "",
            dataType: "json",
            type: "GET",
            contentType: "application/json;chartset=utf-8",
            success: function (response) {
                if (response.data != null) {
                    for (var i = 0; i < response.data.length; i++) {
                        var statusColor = response.data[i].id_status == '1' ? 'bg-primary' : response.data[i].id_status == '2' ? 'bg-info' : response.data[i].id_status == '3' ? 'bg-info' : response.data[i].id_status == '4' ? 'bg-danger' : response.data[i].id_status == '5' ? 'bg-success' : 'bg-danger';
                        var statusName = response.data[i].id_status == '1' ? 'New' : (response.data[i].id_status == '2' && $('#hdn_user_static').val() != '1') ? 'HQ Verified' : (response.data[i].id_status == '2' && $('#hdn_user_static').val() == '1') ? 'New' : response.data[i].id_status == '3' ? 'Justificator Approved' : response.data[i].id_status == '4' ? 'Justificator Rejected' : response.data[i].id_status == '5' ? 'Closed' : 'Closed';
                        var creator = response.data[i].created_by_name == null ? 'Anonymous' : response.data[i].created_by_name;
                        var docStatus = (response.data[i].id_status == '5' || response.data[i].id_status == '6') ? 'Closed' : 'Open';
                        var docColor = (response.data[i].id_status == '5' || response.data[i].id_status == '6') ? 'border-dark' : 'border-primary';
                        tbody += "<div class='col-lg-3 pb-4'>" +
                            "<!--begin::Card-->" +
                            "<div class='card card-custom'>" +
                            "<div class='card-header ribbon ribbon-clip ribbon-end'>" +
                            "<div class='card-title'>" +
                            "<h3 class='card-label pt-3' id='busciness_unit'>" + response.data[i].bussiness_unit_name +
                            "</h3>" +
                            "</div>" +
                            "<div class='ribbon-label bg-primary' style='top: 12px;'>" +
                            "<span class='ribbon-inner " + statusColor + "'></span>" + statusName +
                            "</div>" +
                            "</div>" +

                            "<div class='ribbon ribbon-triangle ribbon-top-start " + docColor + "'>" +
                            "<div class='ribbon-icon mt-n5 ms-n6' style='transform: rotate(-45deg);'>" +
                            "<span class='text-light' style='font-size:smaller;'>" + docStatus + "</span>" +
                            "</div></div>" +

                            "<div class='card-body' style='padding: 0.5rem 2.25rem'>" +
                            "<div class='d-flex align-items-center mb-10'>" +
                            "<!--begin::Text-->" +
                            "<div class='d-flex flex-column font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<!--begin::Svg Icon | path: icons/duotune/communication/com006.svg-->" +
                            "<span class='svg-icon svg-icon-2 me-2'>" +
                            "<i class='bi bi-geo-alt-fill'></i>" +
                            "</span>" +
                            "<!--end::Svg Icon-->" + response.data[i].location_name +
                            "</div>" +
                            "<div class='d-flex align-items-center'>" +
                            "<!--begin::Svg Icon | path: icons/duotune/communication/com006.svg-->" +
                            "<span class='svg-icon svg-icon-2 me-2'>" +
                            "<i class='bi bi-person-fill'></i>" +
                            "</span>" +
                            "<!--end::Svg Icon-->" + creator +
                            "</div>" +
                            "<div class='d-flex align-items-center'>" +
                            "<!--begin::Svg Icon | path: icons/duotune/communication/com006.svg-->" +
                            "<span class='svg-icon svg-icon-2 me-2'>" +
                            "    <i class='bi bi-exclamation-triangle-fill'></i>" +
                            "</span>" +
                            "<!--end::Svg Icon-->" + response.data[i].suspected +
                            "</div>" +
                            "<div class='d-flex align-items-center'>" +
                            "<!--begin::Svg Icon | path: icons/duotune/communication/com006.svg-->" +
                            "<span class='svg-icon svg-icon-2 me-2'>" +
                            "<i class='bi bi-calendar-check-fill'></i>" +
                            "</span>" +
                            "<!--end::Svg Icon-->" + moment(response.data[i].reporter_created_date).format('YYYY-MM-DD') +
                            "</div>" +
                            "</div>" +
                            "<!--end::Text-->" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "<!--end::Card-->" +
                            "</div>";

                        if ((i + 1) % 4 === 0) {
                            tbody = "<div class='row'>" + tbody + "</div>";
                            tempDataSet.push(tbody);
                            dataSet.push(tempDataSet);
                            tbody = '';
                            tempDataSet = [];
                        }
                    }
                }
                if (tbody !== '') {
                    tbody = "<div class='row'>" + tbody + "</div>";
                    tempDataSet.push(tbody);
                    dataSet.push(tempDataSet);
                    tbody = '';
                    tempDataSet = [];
                }

                $('#table-report').DataTable({
                    data: dataSet,
                    columns: [
                        { title: null },
                    ], "ordering": false, "sorting": false
                });

            },
            error: function () {
                console.log("Error loading data! Please try again.");
            }
        });

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