if (document.querySelector(".is-authenticated").value == "True"){
    window.location.href = window.location.href.split("login")[0]
}

function eror(result,text,resultText="") {
    let modalWindow = document.querySelector(".modal-window");
    modalWindow.style.display = "flex"
    let registrationTitle = modalWindow.querySelector(".title");
    if (! result){
        registrationTitle.textContent = "Невдала авторизація"
    }
    if (result){
        registrationTitle.textContent = "Успiшна авторизація"
    }
    if (resultText != ""){
        registrationTitle.textContent = resultText
    }

    let registrationMessage = modalWindow.querySelector(".message");
    registrationMessage.textContent = text
    let coverDiv = document.createElement('a'); 
    if (result){
        coverDiv.href = document.querySelector(".catalog-side-menu").href
    }
    coverDiv.classList.add('cover-div'); 
    let main = document.querySelector("main");
    main.append(coverDiv);
    modalWindow.style.display = "flex";
    setTimeout(()=>{modalWindow.style.opacity = 1;},10)

    coverDiv.addEventListener("click",function(event){
        let coverdiv = document.querySelector('.cover-div');
        coverdiv.remove();
        modalWindow.style.opacity = 0;
        setTimeout(()=>{modalWindow.style.display = "none";},1000)
        
    })
}

function validation(input) {
    if (input.value == '') {
        eror(false,`Введіть данні в порожнє поле`,"Неправильне введення даних");
        return false;
    }
    return true
}


let result = true

$(document).ready(function () {
    $(".form").on("submit", function (event) {
        event.preventDefault();
        let inputs = document.querySelectorAll('input');
        for (let input of inputs){
            if (validation(input) == false){
                result = false;
                break
            }
        }
        if (result == true){
            $.ajax({
                type: "POST",
                url: $(this).action,
                data: $(this).serialize(),
                success: function(response){
                    eror(response.result,response.text)
                }
            });
        
        }
    })
})




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
            eayPassword.src = eayPassword.src.split(".png")[0] + "-hide.png"
          }
    })
})