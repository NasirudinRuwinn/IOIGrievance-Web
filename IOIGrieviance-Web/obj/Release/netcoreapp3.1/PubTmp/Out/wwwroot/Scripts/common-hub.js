
let bindNotifyContent = function () {
    let urlApi = "/Notification/GetAllNotification";
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: urlApi,
        success: function (data) {
            let cax = 0;
            let cnx = 0;

            var htmlElement = "";
            if (data.status === "Success") {
                if (data.data != null) {
                    $('#notification-count')[0].innerText = data.data.length;
                    $('#span_counter_notif_list')[0].innerText = data.data.length;
                    if (data.data !== null) {
                        for (var i = 0; i < data.data.length; i++) {
                            var _icon = '';
                            var _menu = '';
                            if (data.data[i].MENU_CD == '1')// CONTOH 1 TRVLREQ
                                _icon = 'fa fa-plane';
                            if (data.data[i].MENU_CD == '2')// CONTOH 1 TRVLREQ
                                _icon = 'fa fa-calendar';
                            if (data.data[i].MENU_CD == '3')// CONTOH 1 TRVLREQ
                                _icon = 'fa fa-calendar-times-o';
                            if (data.data[i].MENU_CD == '4')// CONTOH 1 TRVLREQ
                                _icon = 'fa fa-check';

                            htmlElement += "<li><a href='" + data.data[i].HREF + "' target='_top' onclick='NotificationClick(" + data.data[i].ID + ")'><span class='details'><span class='label label-sm label-icon label-success'><i class='" + _icon + "'></i></span>" + data.data[i].NOTIFICATION_NAME + " </span></a></li>";
                        }
                    }
                }
            }

            var ulElementCompleted = document.getElementById("ul_list_notification");
            ulElementCompleted.innerHTML = htmlElement;
        },
        error: function (e, t, s) {
            console.log('build notification getting error');
            console.log(e);
            console.log(t);
            console.log(s);
            console.log('======= END OF build notification getting error =========');
        }
    });
};

function NotificationClick(id) {
    $.ajax({
        data: {},
        type: "POST",
        dataType: "JSON",
        url: '/Notification/UpdateNotificationStatus',
        data: { 'Id': id },
        success: function (result) {
        },
        error: function (e, t, s) {
            console.log('UpdateNotificationStatus build notification getting error');
            console.log(e);
            console.log(t);
            console.log(s);
            console.log('======= END OF build notification getting error =========');
        }
    });
}

let bindLoginUser = function () {
    $.ajax({
        data: {},
        type: "GET",
        dataType: "JSON",
        url: '/Authentication/GetUserLogin',
        success: function (result) {
            $('#usrname')[0].innerText = result.data.fullname;
            $('#hdnnik').val(result.data.nik);
        },
        error: function (e, t, s) {
            console.log('build notification getting error');
            console.log(e);
            console.log(t);
            console.log(s);
            console.log('======= END OF build notification getting error =========');
        }
    });
};

$(function () {
    bindNotifyContent();
    bindLoginUser();
    connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl("http://localhost:3001/Hubs/Notification", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .build();

    //tell to client, if hub is getting error....
    connection.start().catch(err => console.log('Error WCS-HUB : ' + err.toString()));

    connection.on("ReceiveMessage", function (message) {
        bindNotifyContent();
        bindLoginUser();
    });

});