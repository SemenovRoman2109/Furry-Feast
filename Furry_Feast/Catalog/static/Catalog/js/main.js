let listKind = document.querySelectorAll(".kind");
let listAnimal = document.querySelectorAll(".animal");
let listWeight = document.querySelectorAll(".weight");

let listCategories = [listKind,listAnimal,listWeight]

let selectKind = "";
let selectAnimal = "";
let selectWeight = "";

let listSelectCategories = [selectKind,selectAnimal,selectWeight]

function sendSelectCategory(){
    $(document).ready(function () {
        let text =  document.querySelector(".input-field").value;
        $.ajax({
            type: "POST",
            url: $(".all-filter").action,
            data: { csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,"animal":listSelectCategories[1],"kind":listSelectCategories[0],"weight":listSelectCategories[2],"text": text},
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

listCategories.forEach(function(listCategory,indexCategory,listCategories){
    listCategory.forEach(function(category,index,listCategory){
        category.addEventListener("click",function(event){
            if (! category.classList.contains("select-category")){
                listCategory.forEach(function(anotherCategory,index,listCategory){
                    anotherCategory.style.color = "#DFDFDF";
                    anotherCategory.classList.remove("select-category")
                })
                category.style.color = "#FFC700";
                category.classList.add("select-category")
                listSelectCategories[indexCategory] = category.textContent;
                sendSelectCategory(selectKind,selectAnimal)
            }
            else{
                category.style.color = "#DFDFDF";
                category.classList.remove("select-category")
                listSelectCategories[indexCategory] = "";
                sendSelectCategory()
            }

        })
    })
})



$(document).ready(function () {
    $(".input-search").on("submit", function (event) {
        event.preventDefault();
        let text =  document.querySelector(".input-field").value;
        $.ajax({
            type: "POST",
            url: $(this).action,
            data: { csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,"animal":listSelectCategories[1],"kind":listSelectCategories[0],"text":text,"weight":listSelectCategories[2]},
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
