/**
 * Created by tawanda on 2016/09/27.
 */
$(document).ready(function(){
    var name,to,subject,text;
    $("#contactButton").click(function(event){
        event.preventDefault();
        to=$("#contactEmail").val();
        subject=$("#contactSubject").val();
        text=$("#contactMessage").val();
        name=$("#contactName").val();
        $(".text-loader").text("Sending E-mail...Please wait");
        console.log("Sending!!");
        $.get("/send",{to:to,subject:subject,text:text,name:name},function(data){
            if(data=="sent")
            {
                $("#contactEmail").val(" ");
                $("#contactSubject").val(" ");
                $("#contactMessage").val(" ");
                $("#contactName").val(" ");
                alert("Email is been sent at "+to+" . Please check inbox !");
                //$("#message").fadeIn();
            }
            else { $("#message").html(data);
                $("#message").fadeIn();

            }

        });
    });
});
$(document).ready(function(){
    var email;
    $("#subscribeButton").click(function(event){
        event.preventDefault();
        email=$("#mce-EMAIL").val();

        $(".text-loader").text("Sending E-mail...Please wait");
        $.get("/subscribe",{email: email},function(data){
            if(data=="sent")
            {
                $("#mce-EMAIL").val("");
                alert("Email is been sent at "+email+" . Please check inbox !");
                //$("#message").fadeIn();
            }
            else {
                $("message").html(data);
                //$("#message").fadeIn();

            }

        });
    });
});