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
        payment_method = inputs[0].closest("div").querySelector("p").textContent
    }
    else{
        payment_method = inputs[1].closest("div").querySelector("p").textContent
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
    if (data["phone_number"] == "" || data["name_surname"] == "" || data["city"] == "" || data["number_mail"] == "" || data["name_surname"].trim().split(" ").length != 2){
        let modalWindow = document.querySelector(".modal-window");
        let modalWindowTitle = modalWindow.querySelector(".title");
        modalWindowTitle.textContent = "Невiрний ввiд данних"
        let modalWindowMessage = modalWindow.querySelector(".message");
        
        console.log(data["name_surname"].trim().split(" "));
        console.log(data["name_surname"].trim().split(" ").length);
        if (data["name_surname"].trim().split(" ").length != 2){
            modalWindowMessage.textContent = "Поле iм`я та прiзвище повинно мiстити два слова"
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
    
        setTimeout(function(){
            let coverdiv = document.querySelector('.cover-div');
            coverdiv.remove();
            modalWindow.style.opacity = 0;
            setTimeout(()=>{modalWindow.style.display = "none";},1000)
        },3000)
    }
    if (result){
        $.ajax({
            type: "POST",
            url: form.getAttribute("action"),
            data:data,
            success: function(response){
                console.log(response);
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
            
                setTimeout(function(){
                    let coverdiv = document.querySelector('.cover-div');
                    coverdiv.remove();
                    modalWindow.style.opacity = 0;
                    setTimeout(()=>{modalWindow.style.display = "none";},1000)
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

inputCity.addEventListener("blur",function(event) {
    if (event.target.value == ""){
        let numberMail = document.querySelector("#number-mail");
        numberMail.type = "hidden";
        let datalist = document.querySelector("#number-mail-datalist");
        datalist.innerHTML = ""
    }
    else{
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
                    let numberMail = document.querySelector("#number-mail");
                    numberMail.type = "hidden";
                    let datalist = document.querySelector("#number-mail-datalist");
                    datalist.innerHTML = ""
                }
            }
        });
    }
    
})