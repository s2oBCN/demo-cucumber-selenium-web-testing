$(function () {

    $("#txtDate").datepicker();
    $("#txtDate").datepicker("option", "dateFormat", "yy-mm-dd");

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

    // Perform Create, Read, Update, Delete Functions
    var CRUD = function () {
        return {
            add: function () {
                var client = JSON.stringify({
                    ID: id.val(),
                    Name: name.val(),
                    Phone: phone.val(),
                    Email: email.val(),
                    Date: date.val(),
                    Number: num.val(),
                    Search: search.val(),
                    Color: color.val()
                });
                tbClients.push(client);
                localStorage.setItem("tbClients", JSON.stringify(tbClients));
                showMessage("The data was saved.");
                return true;
            },
            edit: function () {
                tbClients[selected_index] = JSON.stringify({
                    ID: id.val(),
                    Name: name.val(),
                    Phone: phone.val(),
                    Email: email.val(),
                    Date: date.val(),
                    Number: num.val(),
                    Search: search.val(),
                    Color: color.val()
                });

                //Alter the selected item on the table
                localStorage.setItem("tbClients", JSON.stringify(tbClients));
                showMessage("The data was edited.");
                operation = "A";
                //Return to default value
                return true;
            },
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
            doc.on("submit", "#frmItem", this.submitFx);
            doc.on("click", ".btnEdit", this.editFx);
            doc.on("click", ".btnDelete", this.deleteFx);
            doc.bind("onload", CRUD.list());
        },
        editFx: function () {
            operation = "E";
            selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
            var cli = JSON.parse(tbClients[selected_index]);
            id.val(cli.ID);
            name.val(cli.Name);
            phone.val(cli.Phone);
            email.val(cli.Email);
            date.val(cli.Date);
            num.val(cli.Number);
            search.val(cli.Search);
            color.val(cli.Color);
            id.attr("readonly", "readonly");
            name.focus();
        },
        deleteFx: function (e) {
            selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
            CRUD.delete();
            CRUD.list();
        },
        submitFx: function () {
            if (operation == "A") {
                return CRUD.add();
            } else
                window.location.href = '/reservation.html';
                return CRUD.edit();
        }
    }

    // Initialize Event Handlers for form CRUD
    event.init();
});
