if (document.querySelector(".is-authenticated").value == "True"){
    window.location.href = window.location.href.split("registration")[0]
}
    
function eror(result,text,resultText="") {
    let modalWindow = document.querySelector(".modal-window");
    let registrationTitle = modalWindow.querySelector(".title");
    if (! result){
        registrationTitle.textContent = "Невдала реєстрація"
    }
    if (result){
        registrationTitle.textContent = "Успiшна реєстрація"
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

const bannedWords = [
    "%","^","&","*","!","@","?","#","№"
]

function validation(input) {
    if (input.value == '') {
        eror(false,`Введіть данні в порожнє поле`,"Неправильне введення даних");
        return false;
    }
    if (input.name == 'username') {
        for (let symbol of input.value) {
            if (bannedWords.includes(symbol)) {
                eror(false,`Iм'я містить заборонений символ: ${symbol}`,"Неправильне введення даних");
                return false;
            }
            if (input.value.length > 16){
                eror(false,`Довжина iменi повинна бути до 16 символів`,"Неправильне введення даних");
                return false;
            }
        }
    }
    else if (input.name == "email"){
        if (!input.value.includes("@")) {
            eror(false,"Електронна адреса повинна містити символ @","Неправильне введення даних");
            return false;
        }
        if (input.value.length > 30){
            eror(false,`Довжина електронної адресси повинна бути до 30 символів`,"Неправильне введення даних");
            return false;
        }
    }
    else if (input.name == "password" || input.name == "confirm-password"){
        if (input.value.length < 8){
            eror(false,`Довжина поролю повинна бути від 8 символів`,"Неправильне введення даних");
            return false;
        }
        if (input.value.length > 16){
            eror(false,`Довжина поролю повинна бути до 16 символів`,"Неправильне введення даних");
            return false;
        }
        for (let symbol of input.value) {
            if (bannedWords.includes(symbol)) {
                eror(false,`Пароль містить заборонений символ: ${symbol}`,"Неправильне введення даних");
                return false;
            }
        }
    }
    return true
}



$(document).ready(function () {
    $(".form").on("submit", function (event) {
        let result = true
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