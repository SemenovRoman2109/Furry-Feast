$(document).ready(function () {
    $(".feedback").on("submit", function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: document.querySelector(".feedback").getAttribute("action"),
            data: $(this).serialize(),
            success: function(response){
                let modalWindow = document.querySelector(".modal-window");
                let registrationMessage = modalWindow.querySelector(".message");
                let coverDiv = document.createElement('div'); 
                coverDiv.classList.add('cover-div'); 
                let main = document.querySelector("main");
                main.append(coverDiv);
                modalWindow.style.display = "flex";
                setTimeout(()=>{modalWindow.style.opacity = 1;},10)
            
                setTimeout(function(){
                    let coverdiv = document.querySelector('.cover-div');
                    coverdiv.remove();
                    modalWindow.style.opacity = 0;
                    setTimeout(()=>{modalWindow.style.display = "none";},1000)
                },3000)
            }
        });
    })
})