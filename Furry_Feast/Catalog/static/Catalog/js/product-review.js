$(document).ready(function () {
    $('.product_review-block').on('submit', function(event) {
        event.preventDefault();
        let count_star = document.querySelectorAll(".select-star").length
        if (count_star > 0){
            $.ajax({
                type: "POST", 
                url: $('.product_review-block').action,
                data: { csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,
                "content":document.querySelector(".product_review-card-text").value,
                "count_star":count_star,
                }
            });
            location.reload();
        }
        else{
            let modalWindow = document.querySelector(".modal-window");
            let coverDiv = document.createElement('div');
            coverDiv.classList.add('cover-div'); 
            document.body.append(coverDiv);
            modalWindow.style.display = "flex";
            setTimeout(()=>{modalWindow.style.opacity = 1;},10)

            setTimeout(function(){
                let coverdiv = document.querySelector('.cover-div');
                coverdiv.remove();
                modalWindow.style.opacity = 0;
                setTimeout(function(){
                    modalWindow.style.display = "none";
                },1000)
            },3000)
        }
        
    })
})

function countStar() {
    let listStarProductBlock = document.querySelectorAll(".stars");
    listStarProductBlock.forEach(function(starProductBlock,index,listStarProductBlock) {
        let countStarInBlock = starProductBlock.querySelector("input").value
        let imgStarPath = document.querySelector(".starPath").value;
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

let listStar = document.querySelectorAll(".star");

listStar.forEach(function(star,index,listStar){
    star.addEventListener("pointerenter",function(event){
        listStar.forEach(function(anotherStar,anotherIndex,listStar){
            anotherStar.src = anotherStar.src.split("img/")[0] + "img/star.png";
        })
        let step;
        for (step = 0; step < index+1; step++) {
            listStar[step].src = listStar[step].src.split("star")[0] + "select-star.png"
            listStar[step].classList.add("star-hover")
        }
    })
    star.addEventListener("pointerout",function(event){
        
        let step;
        for (step = 0; step < index+1; step++) {
            listStar[step].src = listStar[step].src.split("select")[0] + "star.png"
            listStar[step].classList.remove("star-hover")
        }

        listStar.forEach(function(anotherStar,anotherIndex,listStar){
            if (anotherStar.classList.contains("select-star")){
                anotherStar.src = anotherStar.src.split("img/")[0] + "img/select-star.png";
            }
        })   
    })
    star.addEventListener("click",function(event){
        listStar.forEach(function(anotherStar,anotherIndex,listStar){
            if (anotherStar.classList.contains("select-star")){
                anotherStar.classList.remove("select-star")
            }
            anotherStar.src = anotherStar.src.split("img/")[0] + "img/star.png";
        })
        let step;
        for (step = 0; step < index+1; step++) {
            listStar[step].src = listStar[step].src.split("img/")[0] + "img/select-star.png"
            listStar[step].classList.add("select-star")
        }
    })
})