$(function () {


    var operation = "A", //"A"=Adding; "E"=Editing
        selected_index = -1, //Index of the selected list item
        id = $("#txtID"), //Id Input
        name = $("#txtName"), // Name Input
        phone = $("#txtPhone"), // Phone Input
        email = $("#txtEmail"), // Email Input
        date = $("#txtDate"),
        num = $("#txtNumber"),
        search = $("#txtSearch"),
        color = $("#txtColor"),
        tbClients = localStorage.getItem("tbClients"),//Retrieve the stored data
        tbClients = JSON.parse(tbClients); //Converts string to object

    //If there is no data, initialize an empty array
    if (tbClients == null) {
        tbClients = [];
    }
    id.val(tbClients.length + 1);

    var LIST = function () {
        return {
            delete: function () {
                tbClients.splice(selected_index, 1);
                localStorage.setItem("tbClients", JSON.stringify(tbClients));
            },
            list: function () {
                $("#tblList").html("");
                $("#tblList").html(
                    "<thead>" +
                    "<tr>" +
                    "<th>Operation</th>" +
                    "<th>ID</th>" +
                    "<th>Name</th>" +
                    "<th>Phone</th>" +
                    "<th>Email</th>" +
                    "<th>Date</th>" +
                    "<th>Number</th>" +
                    "<th>Time</th>" +
                    "<th>Table</th>" +
                    "</tr>" +
                    "</thead>" +
                    "<tbody>" +
                    "</tbody>");
                for (var i in tbClients) {
                    var cli = JSON.parse(tbClients[i]);
                    $("#tblList tbody").append("<tr>" +
                        "<td>" +
                        "<img src='img/edit.png' alt='Edit" + i + "' class='btnEdit'/>" +
                        "<img src='img/delete.png' alt='Delete" + i + "' class='btnDelete'/>" +
                        "</td>" +
                        "<td>" +
                        cli.ID + "</td>" + "<td>" +
                        cli.Name + "</td>" + "<td>" +
                        cli.Phone + "</td>" + "<td>" +
                        cli.Email + "</td>" + "<td>" +
                        cli.Date + "</td>" + "<td>" +
                        cli.Number + "</td>" + "<td>" +
                        cli.Search + "</td>" + "<td>" +
                        cli.Color + "</td>" +
                        "</tr>"
                    );
                }
            }
        };

    }();

    // Event Handlers and Its Callback Functions
    var event = {
        init: function () {
            var doc = $(document);
            // Event Listener
            doc.on("click", ".btnEdit", this.editFx);
            doc.on("click", ".btnDelete", this.deleteFx);
            doc.bind("onload", LIST.list());
        },
        editFx: function () {
            selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
            window.location.href = 'reservation.html?reservation='+selected_index;
        },
        deleteFx: function (e) {
            selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
            LIST.delete();
            LIST.list();
        }
    }

    // Initialize Event Handlers for form CRUD
    event.init();
});
