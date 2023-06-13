

// "change_count":false

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
            "count_product": countProduct,
            "product_pk": quantity.closest(".item").querySelector(".product_pk").value
        },
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
        "change_count":false
    }
    console.log(data);
    
    $.ajax({
        type: "POST",
        url: form.getAttribute("action"),
        data:data
    });  
})


let inputs = document.querySelectorAll(".method")

inputs.forEach(function(input) {
    input.addEventListener("click", function(event){
        inputs.forEach(function(another_input) {
            another_input.checked = false
        })
        input.checked = true
    })
})
