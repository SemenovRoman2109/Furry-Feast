let listAnimal = document.querySelectorAll(".animal");
let formAnimal = document.querySelector(".animals");

listAnimal.forEach(function(animal,index,listAnimal){
    animal.addEventListener("click",function(event){
        event.preventDefault()
        $.ajax({
            type: "POST",
            url: formAnimal.action,
            data: { csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,"start-animal":String(animal.querySelector("p").className)},

        });
    })
});
    

