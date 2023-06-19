window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
}

let pageName = "catalog";
if (window.location.href.includes("catalog")){
    pageName = "catalog";
}
else{
    pageName = "discount";
}

let paginationTop = document.querySelector(".paginationTop")
if (document.querySelector("main").clientHeight > document.documentElement.clientHeight){
    paginationTop.style.display = "flex"
}
else{
    paginationTop.style.display = "none"
}

function countStar() {
    let listStarProductBlock = document.querySelectorAll(".stars");
    listStarProductBlock.forEach(function(starProductBlock,index,listStarProductBlock) {
        let countStarInBlock = starProductBlock.querySelector("input").value
        let imgStarPath = document.querySelector(".imgStarPath").value;
        let step;
        for (step = 0; step < 5; step++) {
            let img = document.createElement("img");
            img.classList.add("star-product")
            img.src = imgStarPath
            starProductBlock.append(img)
        }
        step = 0;
        let listImg = starProductBlock.querySelectorAll("img");
        for (step = 0; step < countStarInBlock; step++) {
            listImg[step].src = listImg[step].src.split("star")[0] + "select-star.png"
        }
    })
}
countStar()

let listKind = document.querySelectorAll(".kind");
let listAnimal = document.querySelectorAll(".animal");
let listWeight = document.querySelectorAll(".weight");

let listCategories = [listKind,listAnimal,listWeight]

let selectKind = "";
let selectAnimal = "";
let selectWeight = "";

let listSelectCategories = [selectKind,selectAnimal,selectWeight]


function generatePaginationButton(countPage,userPage,pagination) {
    const paginationBlock = document.querySelector(pagination);
    paginationBlock.style.display = "flex";
    if (countPage > 1){
        const divNumberButtonPagination = paginationBlock.querySelector(".number-pagination");
        divNumberButtonPagination.innerHTML = '';
        const buutonBackPagination = paginationBlock.querySelector(".back-pagination");
        const buutonForwardPagination = paginationBlock.querySelector(".forward-pagination");
        if (String(userPage) == "1"){
            buutonBackPagination.classList.add("disable");
        }
        if (String(userPage) == String(countPage)){
            buutonForwardPagination.classList.add("disable");
        }
        
        buutonBackPagination.addEventListener("click",function(event) {
            if (! buutonBackPagination.classList.contains("disable")){
                window.location.href = `/${pageName}/${Number(window.location.href.split(`${pageName}/`)[1].split("/")[0]) - 1}/${window.location.href.split("/")[window.location.href.split("/").length - 1]}`
                
            }
            
        })
        buutonForwardPagination.addEventListener("click",function(event) {
            if (! buutonForwardPagination.classList.contains("disable")){
                window.location.href = `/${pageName}/${Number(window.location.href.split(`${pageName}/`)[1].split("/")[0]) + 1}/${window.location.href.split("/")[window.location.href.split("/").length - 1]}`
                
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
            const listNumberPaginationButton = paginationBlock.querySelectorAll(".button-pagination");
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
    }
    else{
        paginationBlock.style.display = "none";
    }
    


    const listNumberPaginationButton = paginationBlock.querySelectorAll(".button-pagination");
        listNumberPaginationButton.forEach(function(numberPaginationButton,index,listNumberPaginationButton){
            numberPaginationButton.addEventListener("click",function(event) {
                if (numberPaginationButton.textContent != "..."){
                    window.location.href = `/${pageName}/${numberPaginationButton.textContent}/${window.location.href.split("/")[window.location.href.split("/").length - 1]}`
                }
            })
        })

}
generatePaginationButton(document.querySelector(".count-page").value,window.location.href.split(`${pageName}/`)[1].split("/")[0],".pagination")
generatePaginationButton(document.querySelector(".count-page").value,window.location.href.split(`${pageName}/`)[1].split("/")[0],".paginationTop")





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
                countStar()

                let listButtonBasket = document.querySelectorAll(".button-basket");

                listButtonBasket.forEach(function(buttonBasket,index,listButtonBasket){
                    buttonBasket.addEventListener("click",function(event){
                        event.preventDefault();
                        let form = buttonBasket.closest("form");
                        $.ajax({
                            type: "POST",
                            url: "/add_cart/",
                            data: {
                                csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,
                                "product_pk":form.querySelector(".product_pk").value,
                            },
                            success: function(response){
                                let modalWindow = document.querySelector(".modal-window-add-cart");
                                let coverDiv = document.createElement('div'); 
                                coverDiv.classList.add('cover-div'); 
                                document.body.append(coverDiv);
                                modalWindow.style.display = "flex";
                                setTimeout(()=>{modalWindow.style.opacity = 1;},100)
                
                                coverDiv.addEventListener("click",function(event){
                                    let coverdiv = document.querySelector('.cover-div');
                                    modalWindow.style.opacity = 0;
                                    setTimeout(function(){
                                        coverdiv.remove();
                                    },500)  
                                    setTimeout(function(){
                                        modalWindow.style.display = "none";
                                        
                                    },1000)  
                                })
                            }  
                        });
                    })
                })

                let countPage2 = document.querySelector(".count-page");
                countPage2.value = response.count_page;
                let page = window.location.href.split(`${pageName}/`)[1].split("/")[0];

                let countPage = response.count_page;
                if (Number(response.count_page) != 0){
                    if (response.count_page < page){
                        window.location.href = `/${pageName}/1/`+window.location.href.split("/")[window.location.href.split("/").length - 1]
                    }
                }
                const zeroProduct = document.querySelector(".zero-product");
                if (! response.zero_product){
                    zeroProduct.style.display = "none";
                }
                else{
                    zeroProduct.style.display = "block";
                }

                
                generatePaginationButton(countPage,page,".pagination")
                generatePaginationButton(countPage,page,".paginationTop")
                let paginationTop = document.querySelector(".paginationTop")
                if (document.querySelector("main").clientHeight > document.documentElement.clientHeight){
                    paginationTop.style.display = "flex"
                }
                else{
                    paginationTop.style.display = "none"
                }

                if (countPage <= 1){
                    paginationTop.style.display = "none"
                }
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

let mobileSize = 651 
if (document.querySelector("main").clientHeight > document.documentElement.clientHeight){
    mobileSize = 641
}
let paginationForward = document.querySelectorAll(".forward-pagination");
let paginationBack = document.querySelectorAll(".back-pagination");
if (document.documentElement.clientWidth >= mobileSize){
    paginationForward[0].textContent = "Вперед→"
    paginationBack[0].textContent = "←Назад"
    paginationForward[1].textContent = "Вперед→"
    paginationBack[1].textContent = "←Назад"
}
else{
    paginationForward[0].textContent = "→"
    paginationBack[0].textContent = "←"
    paginationForward[1].textContent = "→"
    paginationBack[1].textContent = "←"
}

window.addEventListener("resize",function() {
    let mobileSize = 651 
    if (document.querySelector("main").clientHeight > document.documentElement.clientHeight){
        mobileSize = 641
    }
    let paginationForward = document.querySelectorAll(".forward-pagination");
    let paginationBack = document.querySelectorAll(".back-pagination");
    if (document.documentElement.clientWidth >= mobileSize){
        paginationForward[0].textContent = "Вперед→"
        paginationBack[0].textContent = "←Назад"
        paginationForward[1].textContent = "Вперед→"
        paginationBack[1].textContent = "←Назад"
    }
    else{
        paginationForward[0].textContent = "→"
        paginationBack[0].textContent = "←"
        paginationForward[1].textContent = "→"
        paginationBack[1].textContent = "←"
    }
})