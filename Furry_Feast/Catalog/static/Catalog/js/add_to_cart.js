

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
                console.log(response.result);
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