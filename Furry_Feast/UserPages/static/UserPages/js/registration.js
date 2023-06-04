$(document).ready(function () {
    $(".registration-form").on("submit", function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).action,
            data: $(this).serialize(),
            success: function(response){

                let modalWindow = document.querySelector(".modal-window");
                modalWindow.style.display = "flex"
                if (! response.result){
                    let registrationTitle = modalWindow.querySelector(".title");
                    registrationTitle.textContent = "Не вдала реєстрація"
                }
                let registrationMessage = modalWindow.querySelector(".message");
                registrationMessage.textContent = response.text
                let coverDiv = document.createElement('a'); 
                if (response.result){
                    coverDiv.href = document.querySelector(".logo").href
                }
                coverDiv.classList.add('cover-div'); 
                document.body.append(coverDiv);
                modalWindow.style.display = "flex";
                setTimeout(()=>{modalWindow.style.opacity = 1;},10)

                coverDiv.addEventListener("click",function(event){
                    let coverdiv = document.querySelector('.cover-div');
                    coverdiv.remove();
                    modalWindow.style.opacity = 0;
                    setTimeout(()=>{modalWindow.style.display = "none";},1000)
                    
                })
            }
        });
    })
});


let listEayPassword = document.querySelectorAll(".password-eay");
listEayPassword.forEach(function(eayPassword,index,listEayPassword){
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
})