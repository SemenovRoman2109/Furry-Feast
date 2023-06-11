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
    send(event, quantity, false);
}

function buttonPlus(event,button) {
    event.preventDefault();
    let quantity = this.closest(".quantity");
    let countProduct = quantity.querySelector(".count-product");
    countProduct.textContent = String(Number(countProduct.textContent) + 1);
    if (quantity.querySelector(".minus").classList.contains("disable")) {
        quantity.querySelector(".minus").classList.remove("disable");
    }
    send(event, quantity, false);
}

function buttonDelete(event, button){
    event.preventDefault();
    let blockItem = this.closest(".item");
    let quantity = this.closest("form");
    blockItem.remove();
    send(event, quantity, true);
}

function send(event, quantity ,deleteProduct) {
    let countProduct = ""
    if (! deleteProduct){
        countProduct = quantity.querySelector(".count-product").textContent;
    }
    
    $.ajax({
        type: "POST",
        url: quantity.getAttribute("action"),
        data: {
            csrfmiddlewaretoken: quantity.querySelectorAll("input")[0].value,
            "count_product": countProduct,
            "delete_product": deleteProduct,
            "product_pk": quantity.closest(".item").querySelector(".product_pk").value
        },
    });

    if (! deleteProduct){
        calculate_product_price(quantity.closest(".item"));
    }
    
    
}

let minusButtons = document.querySelectorAll(".minus");
let plusButtons = document.querySelectorAll(".plus");
let deleteButtons = document.querySelectorAll(".bin");
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

deleteButtons.forEach(function (button) {
    button.addEventListener("click", buttonDelete);
});

itemList.forEach(function(item){
    calculate_product_price(item)
})