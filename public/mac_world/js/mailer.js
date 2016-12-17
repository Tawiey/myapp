/**
 * Created by tawanda on 2016/09/27.
 */
$(document).ready(function(){
    var name,to,subject,text, email, contact;
    $("#contactButton").click(function(event){
        event.preventDefault();
        email = $("#contactEmail").val();
        subject = $("#contactSubject").val();
        text = $("#contactMessage").val();
        name = $("#contactName").val();
        contact = $("#contactCell").val();
        if(email === "" || text=== "" || contact ==="" || name==="" || subject === ""){
            swal("Opps!", "Seems like you left out some info, Please fill in", "warning");
        }
        else {

            swal({
                    title: "Post An Issue",
                    text: "My details are correct and i want to submit",
                    type: "warning",
                    confirmButtonText: "submit",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                    animation: "slide-from-bottom"
                },
                function () {


                    console.log("Sending!!");
                    $.post("/send", {
                        email: email,
                        subject: subject,
                        text: text,
                        name: name,
                        contact: contact
                    }, function (data) {
                        if (data == "sent") {
                            $("#contactEmail").val(" ");
                            $("#contactSubject").val(" ");
                            $("#contactMessage").val(" ");
                            $("#contactName").val(" ");
                            $("#contactCell").val(" ");
                            swal("Dope!", "Request successfully posted, check your inbox", "success");
                            //$("#message").fadeIn();
                        }
                        else {
                            swal("Snap!", "Failed to connect to server, try again in a little bit", "error");

                        }

                    });
                });
        }
    });
});
$(document).ready(function(){
    var email;
    $("#subscribeButton").click(function(event){
        event.preventDefault();
        email=$("#mce-EMAIL").val();
        if(email === "") {
            swal("Email", "Your email is missing, please fill in", "error");
        }
        else {
            swal({
                    title: "Subscribe",
                    text: "My email is correct and i want to recieve a newsletter",
                    type: "warning",
                    confirmButtonText: "subscribe",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                    animation: "slide-from-bottom"
                },
                function () {


                    $.post("/subscribe", {email: email}, function (data) {
                        if (data == "sent") {
                            $("#mce-EMAIL").val("");
                            swal("Great!", "Welcome to Mac's World Newsletter.", "success");

                        }
                        else {

                            swal("Ohh No!", "Failed to connect to server", "error");
                        }

                    });
                });
        }
    });
});
 $(document).ready(function(){
    var name,to,subject,text, contact;
    $("#contactButton").click(function(event){
        event.preventDefault();
        email=$("#contactEmail").val();
        subject=$("#contactSubject").val();
        text=$("#contactMessage").val();
        name=$("#contactName").val();
        contact = $("#contactCell").val();
        if(email === "" || text=== "" || contact ==="" || name===""){
            return;
        }
        else {
            $.post("/admin/insert", {
                email: email,
                subject: subject,
                text: text,
                name: name,
                contact: contact
            }, function (data) {
                console.log(data);
            });
        }
    });
});