function eror(result,text,resultText="") {
    let modalWindow = document.querySelector(".modal-window");
    modalWindow.style.display = "flex"
    let registrationTitle = modalWindow.querySelector(".title");
    if (! result){
        registrationTitle.textContent = "Не вдала реєстрація"
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

const bannedWords = [
    "%","^","&","*","'",".",",",")","(","{","}","[","]","+","!","@",
]

function validation(input) {
    if (input.value == '') {
        createError(`Поле пустое`);
        return false;
    }
    if (input.name == 'username') {
        for (let symbol of input.value) {
            if (bannedWords.includes(symbol)) {
                eror(false,`Имя содержит недопустимый символ: ${symbol}`,"Неверный ввод данных");
                return false;
            }
        }
    }
    else if (input.name == "email"){
        if (!input.value.includes("@")) {
            eror(false,"Email адресс должен содержать символ @","Неверный ввод данных");
            return false;
        }
    }
    else if (input.name == "password" || input.name == "confirm-password"){
        if (input.value.length < 3 || input.value.length > 16){
            console.log("пароль");
            eror(false,`Длина пароля должна быть от 3 до 16 символов`,"Неверный ввод данных");
            return false;
        }
        for (let symbol of input.value) {
            if (bannedWords.includes(symbol)) {
                eror(false,`Пароль содержит недопустимый символ: ${symbol}`,"Неверный ввод данных");
                return false;
            }
        }
    }
    return true
}

const form = document.querySelector(".form");

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    let inputs = form.querySelectorAll('input');
    let result = true
    for (let input of inputs){
        if (validation(input) == false){
            result = false;
        }
    }
    if (result == true){
        console.log(result);
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