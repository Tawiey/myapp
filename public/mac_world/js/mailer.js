/**
 * Created by tawanda on 2016/09/27.
 */
$(document).ready(function(){
    var name,to,subject,text;
    $("#contactButton").click(function(){
        to=$("#contactEmail").val();
        subject=$("#contactSubject").val();
        text=$("#contactMessage").val();
        name=$("#contactName").val();
        $(".text-loader").text("Sending E-mail...Please wait");
        $.post("http://localhost:3000/send",{to:to,subject:subject,text:text,name:name},function(data) {
            console.log('data is', data);
            if(data=="sent")
            {
                $("#message").html("Email is been sent at "+to+" . Please check inbox !");
                $("#message").fadeIn();
            }
            else { $("#message").html(data);
                $("#message").fadeIn();

            }

        });
    });
});
$(document).ready(function(){
    var email;
    $("#subscribeButton").click(function(){
        email=$("#mce-EMAIL").val();

        $(".text-loader").text("Sending E-mail...Please wait");
        $.get("http://localhost:3000/subscribe",{email: email},function(data){
            if(data=="sent")
            {
                alert("Email is been sent at "+to+" . Please check inbox !");
                //$("#message").fadeIn();
            }
            else { alert(data);
                //$("#message").fadeIn();

            }

        });
    });
});