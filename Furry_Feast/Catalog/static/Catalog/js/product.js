let starBlock = document.querySelector(".stars");

let countStarInBlock = starBlock.querySelector("input").value
let imgStarPath = document.querySelector(".imgStarPath").value;
let step;

for (step = 0; step < 5; step++) {
    let img = document.createElement("img");
    img.classList.add("star-product")
    img.src = imgStarPath
    starBlock.append(img)
}
step = 0;
let listImg = starBlock.querySelectorAll("img");
for (step = 0; step < countStarInBlock; step++) {
    listImg[step].src = listImg[step].src.split("star")[0] + "select-star.png"
}
