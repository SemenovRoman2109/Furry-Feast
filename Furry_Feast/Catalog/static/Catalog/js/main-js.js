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
        let minPriceInput = document.querySelector(".price-min").value;
        let maxPriceInput = document.querySelector(".price-max").value;
        $.ajax({
            type: "POST",
            url: $(".all-filter").action,
            data: { csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,"animal":listSelectCategories[1],"kind":listSelectCategories[0],"weight":listSelectCategories[2],"minPrice":minPriceInput,"maxPrice":maxPriceInput,"text": text},
            success: function(response){
                let title = document.querySelector(".zero-product");
                if (response.products.length == 0){
                    title.style.display = "block";
                    title.style.top = String(window.screen.height/2) + "px"
                }
                else{
                    title.style.display = "none";
                }


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
        let minPriceInput = document.querySelector(".price-min").value;
        let maxPriceInput = document.querySelector(".price-max").value;
        $.ajax({
            type: "POST",
            url: $(this).action,
            data: { csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,"animal":listSelectCategories[1],"kind":listSelectCategories[0],"weight":listSelectCategories[2],"minPrice":minPriceInput,"maxPrice":maxPriceInput,"text": text},
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




let minPriceInput = document.querySelector(".price-min");
let maxPriceInput = document.querySelector(".price-max");

minPriceInput.addEventListener("blur",function(event) {
    if (Number(minPriceInput.value) < minPriceInput.min){
        minPriceInput.value = minPriceInput.min
    }
    if (minPriceInput.value == ""){
        minPriceInput.value = minPriceInput.min
    }
    if (Number(minPriceInput.value) > Number(maxPriceInput.value)-1){
        minPriceInput.value = Number(maxPriceInput.value)-1
    }
    
    sendSelectCategory()
})

maxPriceInput.addEventListener("blur",function(event) {
    if (Number(maxPriceInput.value) > maxPriceInput.max){
        maxPriceInput.value = maxPriceInput.max
    }
    if (maxPriceInput.value == ""){
        maxPriceInput.value = maxPriceInput.max
    }
    if (Number(maxPriceInput.value) < Number(minPriceInput.value)+1){
        maxPriceInput.value = Number(minPriceInput.value)+1
    }
    sendSelectCategory()
})