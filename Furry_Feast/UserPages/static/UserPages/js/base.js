let isAuthenticated = document.querySelector(".is-authenticated").value

let logout = document.querySelector(".logout");
let form = logout.closest("form");

let login = document.querySelector(".login")
let registration = document.querySelector(".registration")

let userName = document.querySelector(".user-name");

if (isAuthenticated == "True"){
    login.style.display = "none"
    registration.style.display = "none"
    logout.style.display = "flex"
    userName.style.display = "flex"
}
else{
    logout.style.display = "none"
    login.style.display = "flex"
    registration.style.display = "flex"
    userName.style.display = "none"
}


logout.addEventListener("click",function(event){
    event.preventDefault()
    $.ajax({
        type: "POST",
        url: form.action,
        data: { csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,"logout":true},
        success: function(response){
            let modalWindow = document.querySelector(".modal-window-logout");
            let coverDiv = document.createElement('a');
            coverDiv.classList.add('cover-div'); 
            document.body.append(coverDiv);
            modalWindow.style.display = "flex";
            setTimeout(()=>{modalWindow.style.opacity = 1;},10)

            setTimeout(function(){
                let coverdiv = document.querySelector('.cover-div');
                coverdiv.remove();
                modalWindow.style.opacity = 0;
                setTimeout(function(){
                    modalWindow.style.display = "none";
                    login.style.display = "flex"
                    registration.style.display = "flex"
                    logout.style.display = "none"
                    userName.style.display = "none"
                },1000)
            },1000)

        }

    });
})

const arrowTopButton = document.querySelector("#button-up")
window.addEventListener("scroll",()=>{
    if (window.scrollY > window.innerHeight){
        arrowTopButton.style.display = "block";
    }
    else{
        arrowTopButton.style.display = "none";
    }
})

arrowTopButton.addEventListener("click",(event) => {
    window.scrollTo({
        top: 0,
        behavior : "smooth"
      });
})

