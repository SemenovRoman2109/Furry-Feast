let listKind = document.querySelectorAll(".kind");
let listAnimal = document.querySelectorAll(".animal");

let selectKind = "none";
let selectAnimal = "none";

function sendSelectCategory(kind,animal){
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: $(".all-filter").action,
            data: { csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,
                "animal":animal.textContent,
                "kind":kind.textContent,
                    }
                    
        });
        
    });
}

listKind.forEach(function(kind,index,listKind){
    kind.addEventListener("click",function(event){
        listKind.forEach(function(anotherKind,index,listKind){
            anotherKind.style.color = "#DFDFDF";
        })
        kind.style.color = "#FFC700";
        selectKind = kind;
        sendSelectCategory(selectKind,selectAnimal)
    })
})
    
listAnimal.forEach(function(animal,index,listAnimal){
    animal.addEventListener("click",function(event){
        listAnimal.forEach(function(anotherAnimal,index,listAnimal){
            anotherAnimal.style.color = "#DFDFDF";
        })
        animal.style.color = "#FFC700";
        selectAnimal = animal;
        sendSelectCategory(selectKind,selectAnimal)
    })
})