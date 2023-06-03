let listKind = document.querySelectorAll(".kind");
let listAnimal = document.querySelectorAll(".animal");

let selectKind = "none";
let selectAnimal = "none";

function sendSelectCategory(kind,animal){
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: $(".all-filter").action,
            data: { csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,"animal":animal.textContent,"kind":kind.textContent,"text": "none"},
            success: function(response){
                let listAllProduct = document.querySelectorAll(".section")
                listAllProduct.forEach(function(product,index,listAllProduct){
                    product.style.display = "flex";
                })
                listAllProduct.forEach(function(product,index,listAllProduct){
                    if (! response.products.includes(Number(product.id.split("-")[1])) ){
                        product.style.display = "none";
                    }
                })
            }
                    
        });
        
    });
}

listKind.forEach(function(kind,index,listKind){
    kind.addEventListener("click",function(event){
        if (! kind.classList.contains("select-category")){
            listKind.forEach(function(anotherKind,index,listKind){
                anotherKind.style.color = "#DFDFDF";
                anotherKind.classList.remove("select-category")
            })
            kind.style.color = "#FFC700";
            kind.classList.add("select-category")
            selectKind = kind;
            sendSelectCategory(selectKind,selectAnimal)
        }
        else{
            kind.style.color = "#DFDFDF";
            kind.classList.remove("select-category")
            selectKind = "none";
            sendSelectCategory(selectKind,selectAnimal)
        }
        
    })
})
    
listAnimal.forEach(function(animal,index,listAnimal){
    animal.addEventListener("click",function(event){
        if (! animal.classList.contains("select-category")){
            listAnimal.forEach(function(anotherAnimal,index,listAnimal){
                anotherAnimal.style.color = "#DFDFDF";
                anotherAnimal.classList.remove("select-category")
            })
            animal.style.color = "#FFC700";
            animal.classList.add("select-category")
            selectAnimal = animal;
            sendSelectCategory(selectKind,selectAnimal)
        }
        else{
            animal.style.color = "#DFDFDF";
            animal.classList.remove("select-category")
            selectAnimal = "none";
            sendSelectCategory(selectKind,selectAnimal)
        }
    })
    
})


$(document).ready(function () {
    $(".input-search").on("submit", function (event) {
        event.preventDefault();
        let text =  document.querySelector(".input-field").value;
        $.ajax({
            type: "POST",
            url: $(this).action,
            data: { csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,"animal":"none","kind":"none","text":text},
            success: function(response){
                let listAllProduct = document.querySelectorAll(".section")
                listAllProduct.forEach(function(product,index,listAllProduct){
                    product.style.display = "flex";
                })
                listAllProduct.forEach(function(product,index,listAllProduct){
                    if (! response.products.includes(Number(product.id.split("-")[1])) ){
                        product.style.display = "none";
                    }
                })
            }

        });
    })
});

let buttonsBasket = document.querySelectorAll(".button-basket");
buttonsBasket.forEach(function(buttonBasket,index,buttonsBasket){
    buttonBasket.addEventListener("click",function(event){
        let modalWindow = document.querySelector(".modal-window-add-cart");
        let coverDiv = document.createElement('div'); 
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
        
    })
})
