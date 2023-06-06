let logout = document.querySelector(".logout");
let form = logout.closest("form");

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
                    location.reload();
                },1000)
            },1000)

        }

    });
})

const arrowTopButton = document.querySelector("#button-up")
window.addEventListener("scroll",()=>{
    console.log(window.innerHeight);
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