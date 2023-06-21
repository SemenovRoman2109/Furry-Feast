if (document.querySelectorAll(".item").length == 0){
    window.location.href = window.location.href.split("order")[0] + "cart/"
}

$('#phone-number').inputmask("+380 99 999 9999");

function calculate_all_product_sum() {
    let items = document.querySelectorAll(".item");
    let finalPrice = 0
    items.forEach(function(item){
        let itemPrice = item.querySelector(".price").textContent.split(" ")[0]
        finalPrice += Number(itemPrice)
    })
    let priceObj = document.querySelector(".final-price-block").querySelector(".price")
    priceObj.textContent = `${finalPrice} грн`
}

function calculate_product_price(item) {
    let priceOneProduct = item.querySelector(".price-one-product");
    let countProduct = item.querySelector(".count-product");
    let finalPriceObj = item.querySelector(".price");
    finalPriceObj.textContent = `${Number(priceOneProduct.value)*Number(countProduct.textContent)} грн`;
}

function buttonMinus(event,button) {
    event.preventDefault();
    let quantity = this.closest(".quantity");
    let countProduct = quantity.querySelector(".count-product");
    if (!this.classList.contains("disable")) {
        countProduct.textContent = String(Number(countProduct.textContent) - 1);
        if (countProduct.textContent === "1") {
            this.classList.add("disable");
        }
    }
    send(event, quantity);
}

function buttonPlus(event,button) {
    event.preventDefault();
    let quantity = this.closest(".quantity");
    let countProduct = quantity.querySelector(".count-product");
    countProduct.textContent = String(Number(countProduct.textContent) + 1);
    if (quantity.querySelector(".minus").classList.contains("disable")) {
        quantity.querySelector(".minus").classList.remove("disable");
    }
    send(event, quantity);
}


function send(event, quantity) {
    let countProduct = ""
    countProduct = quantity.querySelector(".count-product").textContent;
    $.ajax({
        type: "POST",
        url: quantity.getAttribute("action"),
        data: {
            csrfmiddlewaretoken: quantity.querySelectorAll("input")[0].value,
            "change_count":true,
            "select_city":false,
            "count_product": countProduct,
            "product_pk": quantity.closest(".item").querySelector(".product_pk").value
        }
        
    });
    calculate_product_price(quantity.closest(".item"));
    calculate_all_product_sum()
}  


let minusButtons = document.querySelectorAll(".minus");
let plusButtons = document.querySelectorAll(".plus");
let itemList = document.querySelectorAll(".item")

minusButtons.forEach(function (button) {
    if (String(button.closest(".quantity").querySelector(".count-product").textContent) == "1") {
        button.classList.add("disable");
    }
    button.addEventListener("click", buttonMinus);
});

plusButtons.forEach(function (button) {
    button.addEventListener("click", buttonPlus);
});

itemList.forEach(function(item){
    calculate_product_price(item)
})


let toOrderButton = document.querySelector(".to-order-button");

toOrderButton.addEventListener("click",function(event){
    event.preventDefault()
    let form = toOrderButton.closest("form");
    let inputs = document.querySelectorAll(".method");
    let payment_method
    if (inputs[0].checked){
        payment_method = inputs[0].closest(".input-field").querySelector("p").textContent
    }
    else{
        payment_method = inputs[1].closest(".input-field").querySelector("p").textContent
    }

    data = {
        csrfmiddlewaretoken:form.querySelectorAll("input")[0].value,
        "phone_number":form.querySelector("#phone-number").value,
        "name_surname":form.querySelector("#name-surname").value,
        "city":form.querySelector("#city").value,
        "number_mail":form.querySelector("#number-mail").value,
        "payment_method":payment_method,
        "select_city":false,
        "change_count":false
    }
    let result = true

    let options = document.querySelector("#number-mail-datalist").querySelectorAll("option");
    let resultOption = true
    options.forEach(function(option){
        if (option.textContent == data["number_mail"]){
            resultOption = false
        }
    })

    if (data["phone_number"][data["phone_number"].length-1] == "_" || data["phone_number"] == "" || data["name_surname"] == "" || data["city"] == "" || data["number_mail"] == "" || data["name_surname"].trim().split(" ").length != 2 || resultOption){
        let modalWindow = document.querySelector(".modal-window");
        let modalWindowTitle = modalWindow.querySelector(".title");
        modalWindowTitle.textContent = "Невiрний ввiд данних"
        let modalWindowMessage = modalWindow.querySelector(".message");
        
        if (resultOption){
            if (document.documentElement.clientWidth > 530){
                modalWindowMessage.textContent = "Оберiть відповідне вам відділення зі списку"
            }
            else{
                modalWindowMessage.textContent = "Оберiть бажане відділення зі списку"
            }
        }

        if (data["phone_number"][data["phone_number"].length-1] == "_"){
            if (document.documentElement.clientWidth > 530){
                modalWindowMessage.textContent = "Номер телефону повинен відповідати шаблону"
            }
            else{
                modalWindowMessage.textContent = "Номер телефону має відповідати шаблону"
            }
        }
        if (data["name_surname"].trim().split(" ").length != 2){
            if (document.documentElement.clientWidth > 530){
                modalWindowMessage.textContent = "Поле iм'я та прiзвище повинно мiстити два слова"
            }
            else{
                modalWindowMessage.textContent = "Поле iменi повинно мiстити два слова"
            }
            
        }

        let array = [form.querySelector("#phone-number"),form.querySelector("#name-surname"),form.querySelector("#city")];


        let numberMail = document.querySelector("#number-mail");
        if (numberMail.type == "hidden"){
            modalWindowMessage.textContent = "В цьому мiстi немае нової пошти"
        }
        else{
            array.push(form.querySelector("#number-mail"))
        }

        for (let i = 0; i < array.length; i++) {
            if (array[i].value == ""){
                modalWindowMessage.textContent = `Заповнiть поле "${array[i].placeholder}"`
                break;
            }    
        }

        result = false
        let coverDiv = document.createElement('div');
        coverDiv.classList.add('cover-div'); 
        let main = document.querySelector("main");
        main.append(coverDiv);
        modalWindow.style.display = "flex";
        setTimeout(()=>{modalWindow.style.opacity = 1;},10)
        let coverdiv = document.querySelector('.cover-div');
        let closed = false
        coverdiv.addEventListener("click",function(event){
            coverdiv.remove();
            modalWindow.style.opacity = 0;
            setTimeout(()=>{modalWindow.style.display = "none";},1000)
            closed = true
        })
        setTimeout(function(){
            if (closed != true){
                coverdiv.remove();
                modalWindow.style.opacity = 0;
                setTimeout(()=>{modalWindow.style.display = "none";},1000)
            }
        },3000)
    }
    if (result){
        let modalWindow = document.querySelector(".modal-window");
        let modalWindowTitle = modalWindow.querySelector(".title");
        modalWindowTitle.textContent = "Успiшне замовлення"
        let modalWindowMessage = modalWindow.querySelector(".message");
        modalWindowMessage.textContent = ""
        let coverDiv = document.createElement('div'); 
        coverDiv.classList.add('cover-div'); 
        let main = document.querySelector("main");
        main.append(coverDiv);
        modalWindow.style.display = "flex";
        setTimeout(()=>{modalWindow.style.opacity = 1;},10)
        $.ajax({
            type: "POST",
            url: form.getAttribute("action"),
            data:data,
            success: function(response){
                let coverdiv = document.querySelector('.cover-div');
                let modalWindow = document.querySelector(".modal-window");
                coverdiv.addEventListener("click",function(event){
                    coverdiv.remove();
                    modalWindow.style.opacity = 0;
                    setTimeout(()=>{modalWindow.style.display = "none";},1000)
                    window.location.href = window.location.href.split("order")[0]
                })
                setTimeout(function(){
                    coverdiv.remove();
                    modalWindow.style.opacity = 0;
                    setTimeout(()=>{modalWindow.style.display = "none";},1000)
                    window.location.href = window.location.href.split("order")[0]
                },3000)
            }
        });  
    }
})


let inputs = document.querySelectorAll(".method")

inputs.forEach(function(input) {
    input.addEventListener("click", function(event){
        inputs.forEach(function(another_input) {
            another_input.checked = false
            another_input.classList.remove("select-input")
        })
        input.checked = true
        input.classList.add("select-input")
    })
})

let inputCity = document.querySelector("#city");

let inputCityValue = inputCity.value

inputCity.addEventListener("blur",function(event) {
    if (event.target.value == ""){
        let numberMail = document.querySelector("#number-mail");
        numberMail.type = "hidden";
        let datalist = document.querySelector("#number-mail-datalist");
        datalist.innerHTML = ""
    }
    else if (inputCityValue != inputCity.value){
        let modalWindow = document.querySelector(".modal-window");
        let modalWindowTitle = modalWindow.querySelector(".title");
        modalWindowTitle.textContent = "Шукаемо вiддiлення у вашому мiстi"
        let modalWindowMessage = modalWindow.querySelector(".message");
        modalWindowMessage.textContent = ""
        let coverDiv = document.createElement('div'); 
        coverDiv.classList.add('cover-div'); 
        let main = document.querySelector("main");
        main.append(coverDiv);
        modalWindow.style.display = "flex";
        setTimeout(()=>{modalWindow.style.opacity = 1;},10)
    
        $.ajax({
            type: "POST",
            url: "/order/",
            data: {
                csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,
                "select_city":true,
                "city":event.target.value,
            },
            success: function(response){
                
                if (response.list_branches.length != 0){
                    let coverdiv = document.querySelector('.cover-div');
                    coverdiv.remove();
                    modalWindow.style.opacity = 0;
                    setTimeout(()=>{modalWindow.style.display = "none";},1000)
                    let numberMail = document.querySelector("#number-mail");
                    numberMail.type =  "text";
                    let datalist = document.querySelector("#number-mail-datalist");
                    datalist.innerHTML = ""
                    response.list_branches.forEach(function(branches) {
                        let option = document.createElement("option");
                        option.textContent = branches;
                        datalist.append(option)
                    })
                }
                else{
                    if (document.documentElement.clientWidth > 530){
                        modalWindowTitle.textContent = "Ми не знайшли вiддiлень у вашому мiстi"
                    }
                    else{
                        modalWindowTitle.textContent = "Не має у вашому мiстi"
                    }     
                    modalWindowMessage.textContent = "Перевiрте правильнiсть назви мiста"
                    setTimeout(function(){
                        let coverdiv = document.querySelector('.cover-div');
                        coverdiv.remove();
                        modalWindow.style.opacity = 0;
                        setTimeout(()=>{modalWindow.style.display = "none";},1000)
                    },3000)
                    let numberMail = document.querySelector("#number-mail");
                    numberMail.type = "hidden";
                    let datalist = document.querySelector("#number-mail-datalist");
                    datalist.innerHTML = ""
                }
            }
        });
    }
    inputCityValue = inputCity.value
})

calculate_all_product_sum()