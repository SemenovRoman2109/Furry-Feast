

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
            const url = new URL(window.location.href);
            if (! category.classList.contains("select-category")){
                listCategory.forEach(function(anotherCategory,index,listCategory){
                    anotherCategory.style.color = "#DFDFDF";
                    anotherCategory.classList.remove("select-category")
                })
                category.style.color = "#FFC700";
                category.classList.add("select-category");

                url.searchParams.set(category.closest("div").querySelector("p").textContent, category.textContent);

                listSelectCategories[indexCategory] = category.textContent;
                sendSelectCategory(selectKind,selectAnimal)
            }
            else{
                category.style.color = "#DFDFDF";
                category.classList.remove("select-category")

                url.searchParams.delete(category.closest("div").querySelector("p").textContent);

                listSelectCategories[indexCategory] = "";
                sendSelectCategory()
            }
            window.history.replaceState({}, "", url.toString());

            const listPaginationLinks = document.querySelectorAll(".redirect-page");
            listPaginationLinks.forEach(function(paginationLink,index,listPaginationLinks) {
                if ( paginationLink.href.includes("?")){
                    paginationLink.href = paginationLink.href.split("?")[0];
                }
                paginationLink.href += "?" + window.location.href.split("?")[1];
            })

        })
    })
})



$(document).ready(function () {
    $(".input-search").on("submit", function (event) {
        event.preventDefault();
        let text =  document.querySelector(".input-field").value;
        let minPriceInput = document.querySelector(".price-min").value;
        let maxPriceInput = document.querySelector(".price-max").value;
        const url = new URL(window.location.href);

        url.searchParams.set("Поиск:", text);
        
        window.history.replaceState({}, "", url.toString());

        const listPaginationLinks = document.querySelectorAll(".redirect-page");
        listPaginationLinks.forEach(function(paginationLink,index,listPaginationLinks) {
            if ( paginationLink.href.includes("?")){
                paginationLink.href = paginationLink.href.split("?")[0];
            }
            paginationLink.href += "?" + window.location.href.split("?")[1];
        })
        
        sendSelectCategory()

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
    const url = new URL(window.location.href);
    
    url.searchParams.set("Цена:", String(minPriceInput.value)+" - "+String(maxPriceInput.value));
        
    window.history.replaceState({}, "", url.toString());

    const listPaginationLinks = document.querySelectorAll(".redirect-page");
    listPaginationLinks.forEach(function(paginationLink,index,listPaginationLinks) {
        if ( paginationLink.href.includes("?")){
            paginationLink.href = paginationLink.href.split("?")[0];
        }
        paginationLink.href += "?" + window.location.href.split("?")[1];
    })

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
    const url = new URL(window.location.href);

    url.searchParams.set("Цена:", `${minPriceInput.value} - ${maxPriceInput.value}`);
        
    window.history.replaceState({}, "", url.toString());

    const listPaginationLinks = document.querySelectorAll(".redirect-page");
    listPaginationLinks.forEach(function(paginationLink,index,listPaginationLinks) {
        if ( paginationLink.href.includes("?")){
            paginationLink.href = paginationLink.href.split("?")[0];
        }
        paginationLink.href += "?" + window.location.href.split("?")[1];
    })

    sendSelectCategory()
})


let goods = document.querySelector(".goods");
let inputSearch = document.querySelector(".input-search");
let titlePage = document.querySelector(".title-page");
let allFilter = document.querySelector(".all-filter");

let listStartAnimal = document.querySelectorAll(".start-animal");
let animals = document.querySelector(".select-animal");

listStartAnimal.forEach(function(standartAnimal,index,listStartAnimal) {
    standartAnimal.addEventListener("click",function(event) {
        goods.style.display = "flex";
        inputSearch.style.display = "flex";
        titlePage.style.display = "block";
        allFilter.style.display = "block";
        animals.style.display = "none";

        
        
        listAnimal[index].style.color = "#FFC700";
        listAnimal[index].classList.add("select-category")
        listSelectCategories[1] = listAnimal[index].textContent;
                
        sendSelectCategory()
    })
})


const params = new URLSearchParams(window.location.search);

const param1 = params.get('Вид:');
const param2 = params.get('Тварина:');
const param3 = params.get('Вага:');
const param4 = params.get('Поиск:');
const param5 = params.get('Цена:');


let listParam = [param1,param2,param3]
let listParamInput =[param4,param5]

if (window.location.href.split("?")[1] != undefined){
    const listPaginationLinks = document.querySelectorAll(".redirect-page");
    listPaginationLinks.forEach(function(paginationLink,index,listPaginationLinks) {
        if ( paginationLink.href.includes("?")){
            paginationLink.href = paginationLink.href.split("?")[0];
        }
        paginationLink.href += "?" + window.location.href.split("?")[1];
    })
}

listParam.forEach(function(param,indexSelectCategories,listParam) {
    if (param != null){
        goods.style.display = "flex";
        inputSearch.style.display = "flex";
        titlePage.style.display = "block";
        allFilter.style.display = "block";
        animals.style.display = "none";
        
        listCategories.forEach(function(category,index,listCategories){
            category.forEach(function(categoryValue,indexCategory,category) {
                if (param == categoryValue.textContent){
                    category[indexCategory].style.color = "#FFC700";
                    category[indexCategory].classList.add("select-category")
                    listSelectCategories[indexSelectCategories] = category[indexCategory].textContent;     
                    sendSelectCategory()  
                }
            })
        })
        
    }
})

listParamInput.forEach(function(param,index,listParamInput) {
    if (param != null){
        goods.style.display = "flex";
        inputSearch.style.display = "flex";
        titlePage.style.display = "block";
        allFilter.style.display = "block";
        animals.style.display = "none";
        
        if (index == 0){
            let inputField =  document.querySelector(".input-field");
            inputField.value = param
            sendSelectCategory()  
        }
        if (index == 1){
            minPriceInput.value = param.split(" - ")[0]
            maxPriceInput.value = param.split(" - ")[1]
            sendSelectCategory()  
        }
    }
})
