

let listKind = document.querySelectorAll(".kind");
let listAnimal = document.querySelectorAll(".animal");
let listWeight = document.querySelectorAll(".weight");

let listCategories = [listKind,listAnimal,listWeight]

let selectKind = "";
let selectAnimal = "";
let selectWeight = "";

let listSelectCategories = [selectKind,selectAnimal,selectWeight]


function generatePaginationButton(countPage,userPage) {
    console.log(countPage,userPage);
    const divNumberButtonPagination = document.querySelector(".number-pagination");
    divNumberButtonPagination.innerHTML = '';
    const buutonBackPagination = document.querySelector(".back-pagination");
    const buutonForwardPagination = document.querySelector(".forward-pagination");
    if (String(userPage) == "1"){
        buutonBackPagination.classList.add("disable");
    }
    if (String(userPage) == String(countPage)){
        buutonForwardPagination.classList.add("disable");
    }
    
    buutonBackPagination.addEventListener("click",function(event) {
        if (! buutonBackPagination.classList.contains("disable")){
            window.location.href = `/catalog/${Number(window.location.href.split("catalog/")[1].split("/")[0]) - 1}/${window.location.href.split("/")[window.location.href.split("/").length - 1]}`
        }
        
    })
    buutonForwardPagination.addEventListener("click",function(event) {
        if (! buutonForwardPagination.classList.contains("disable")){
            window.location.href = `/catalog/${Number(window.location.href.split("catalog/")[1].split("/")[0]) + 1}/${window.location.href.split("/")[window.location.href.split("/").length - 1]}`
        }
    })
    
    if (countPage <= 7){
        let step;
        for (step = 1; step <= countPage; step++) {
            let numberButtonPagination = document.createElement("button");
            numberButtonPagination.textContent = String(step);
            if (String(numberButtonPagination.textContent) == String(userPage)){
                numberButtonPagination.classList.add("select-button-pagination");
            }
            numberButtonPagination.classList.add("button-pagination");
            divNumberButtonPagination.append(numberButtonPagination)
        }
    }

    else{
        let step;
        for (step = 1; step <= 7; step++) {
            let numberButtonPagination = document.createElement("button");
            numberButtonPagination.classList.add("button-pagination");
            divNumberButtonPagination.append(numberButtonPagination)
        }
        const listNumberPaginationButton = document.querySelectorAll(".button-pagination");
        listNumberPaginationButton[0].textContent = "1";
        listNumberPaginationButton[6].textContent = String(countPage);
        if (Number(userPage) >= 4){
            listNumberPaginationButton[1].textContent = "...";
            listNumberPaginationButton[1].classList.add("disable");
            listNumberPaginationButton[2].textContent = String(Number(userPage) - 1);
            listNumberPaginationButton[3].textContent = String(Number(userPage));
            listNumberPaginationButton[4].textContent = String(Number(userPage) + 1);
            if (Number(userPage) > Number(countPage)-3){
                listNumberPaginationButton[2].textContent = String(Number(countPage)-4);
                listNumberPaginationButton[3].textContent = String(Number(countPage)-3);
                listNumberPaginationButton[4].textContent = String(Number(countPage)-2);
                listNumberPaginationButton[5].textContent = String(Number(countPage)-1);
            }
        }
        if (Number(userPage) <= Number(countPage)-3){
            listNumberPaginationButton[5].textContent = "...";
            listNumberPaginationButton[5].classList.add("disable");
            listNumberPaginationButton[2].textContent = String(Number(userPage) - 1);
            listNumberPaginationButton[3].textContent = String(Number(userPage));
            listNumberPaginationButton[4].textContent = String(Number(userPage) + 1);
            if (Number(userPage) < 4){
                listNumberPaginationButton[1].textContent = "2";
                listNumberPaginationButton[2].textContent = "3";
                listNumberPaginationButton[3].textContent = "4";
                listNumberPaginationButton[4].textContent = "5";
            }
        }
        listNumberPaginationButton.forEach(function(numberPaginationButton,index,listNumberPaginationButton){
            if (numberPaginationButton.textContent == String(userPage)){
                numberPaginationButton.classList.add("select-button-pagination");
            }
                
        })
    }


    const listNumberPaginationButton = document.querySelectorAll(".button-pagination");
        listNumberPaginationButton.forEach(function(numberPaginationButton,index,listNumberPaginationButton){
            numberPaginationButton.addEventListener("click",function(event) {
                if (numberPaginationButton.textContent != "..."){
                    window.location.href = `/catalog/${numberPaginationButton.textContent}/${window.location.href.split("/")[window.location.href.split("/").length - 1]}`
                }
            })
        })

}

generatePaginationButton(document.querySelector(".count-page").value,window.location.href.split("catalog/")[1].split("/")[0])


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
                $(".goods").html(response.html_product_list);
                let countPage2 = document.querySelector(".count-page");
                countPage2.value = response.count_page;
                let page = window.location.href.split("catalog/")[1].split("/")[0];
                let countPage = response.count_page;
                if (response.count_page < page){
                    window.location.href = "/catalog/1/"+window.location.href.split("/")[window.location.href.split("/").length - 1]
                }
                generatePaginationButton(countPage,page)
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



const params = new URLSearchParams(window.location.search);

const param1 = params.get('Вид:');
const param2 = params.get('Тварина:');
const param3 = params.get('Вага:');
const param4 = params.get('Поиск:');
const param5 = params.get('Цена:');


let listParam = [param1,param2,param3]
let listParamInput =[param4,param5]


listParam.forEach(function(param,indexSelectCategories,listParam) {
    if (param != null){
        
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
