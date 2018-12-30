$(function () {
    let searchParams = new URLSearchParams(window.location.search)
    let param = -1
    if (searchParams.has('reservation'))
        param = searchParams.get('reservation')
    $("#txtDate").datepicker();
    $("#txtDate").datepicker("option", "dateFormat", "yy-mm-dd");

    var operation = "A", //"A"=Adding; "E"=Editing
        selected_index = param, //Index of the selected list item
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
            init: function () {
                if (selected_index>=0){
                    operation = "E";
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
            doc.bind("onload", CRUD.init());
        },
        submitFx: function () {
            if (operation == "A")
                return CRUD.add();
            else
                return CRUD.edit();
        }
    }

    // Initialize Event Handlers for form CRUD
    event.init();
});
