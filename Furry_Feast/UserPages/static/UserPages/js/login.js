$(document).ready(function () {
    $(".login-form").on("submit", function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).action,
            data: $(this).serialize(),
            success: function(response){
                alert(response.result)
                alert(response.text)
            }
        });
    })
});


let eayPassword = document.querySelector(".password-eay");

eayPassword.addEventListener("click",function(event){
    let divEay = eayPassword.closest("div");
    let input = divEay.querySelector("input");
    if (input.type === "password") {
        input.type = "text";
        eayPassword.src = eayPassword.src.split("-hide")[0] + ".png"
        } 
    else {
        input.type = "password";
        console.log(eayPassword.src);
        eayPassword.src = eayPassword.src.split(".png")[0] + "-hide.png"
        }
})
