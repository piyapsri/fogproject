(function($) {

    var reportString = window.atob(Common.f),
        reportButtons = [
            'copy',
            'csv',
            'excel',
            {
                extend: 'pdfHtml5',
                download: 'open',
                exportOptions: {
                    columns: ':visible',
                    search: 'applied',
                    order: 'applied'
                },
                customize: function (doc) {
                    doc.content[1].table.widths =
                        Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                }
            },
            'print',
            'colvis'
        ];

    // This will call our respective calls
    // to report the requested data.
    switch (reportString) {
        // History Report
        case 'history report':
            var historyTable = $('#history-table'),
                table = Common.registerTable(historyTable, null, {
                    order: [
                        [1, 'desc']
                    ],
                    rowGroup: {
                        dataSrc: function(row) {
                            return moment(row.createdTime, moment.ISO_8601).format('MMM DD YYYY');
                        }
                    },
                    buttons: reportButtons,
                    columns: [
                        {data: 'createdBy'},
                        {data: 'createdTime'},
                        {data: 'info'},
                        {data: 'ip'}
                    ],
                    rowId: 'id',
                    processing: true,
                    serverSide: true,
                    ajax: {
                        url: '../fog/history',
                        type: 'get'
                    }
                });
            break;
        // Host List
        case 'host list':
            var hostTable = $('#hostlist-table'),
                table = Common.registerTable(hostTable, null, {
                    order: [
                        [0, 'asc']
                    ],
                    buttons: reportButtons,
                    columns: [
                        {data: 'mainlink'},
                        {data: 'primac'},
                        {data: 'deployed'},
                        {data: 'imageLink'}
                    ],
                    rowGroup: {
                        dataSrc: 'deployed'
                    },
                    rowId: 'id',
                    processing: true,
                    serverSide: true,
                    ajax: {
                        url: '../fog/host',
                        type: 'get'
                    }
                });
            break;
        // Hosts and users
        case 'hosts and users':
            var userloginTable = $('#userlogin-table'),
                table = Common.registerTable(userloginTable, null, {
                    order: [
                        [0, 'asc']
                    ],
                    buttons: reportButtons,
                    columns: [
                        {data: 'username'},
                        {data: 'hostLink'},
                        {data: 'createdTime'}
                    ],
                    rowGroup: {
                        dataSrc: 'hostLink'
                    },
                    rowId: 'id',
                    processing: true,
                    serverSide: true,
                    ajax: {
                        url: '../fog/usertracking',
                        type: 'get'
                    }
                });
            break;
        // Imaging Log
        case 'imaging log':
            break;
        // Inventory Report
        case 'inventory report':
            break;
        // Pending MAC
        case 'pending mac list':
            break;
        // Product Keys
        case 'product keys':
            break;
        // Snapin Log
        case 'snapin log':
            break;
        // User Tracking
        case 'user tracking':
            break;
    }
})(jQuery);
