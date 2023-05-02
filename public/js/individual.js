
let image = document.querySelectorAll('.image');
const imageContainer = document.querySelector('#image-slider');
// Count how many images in total in image slider
let imgCounts = imageContainer.childElementCount;

let percentageUp = 0;

function up() {
    console.log(image);
    // -2, because I have the button-group div in imageContainer and the percentage should be less than the images 1 and times 100%
    if(percentageUp < ((imgCounts - 2) * 100)) {
        percentageUp += 100;
        console.log('work')
    }


    for(let i = 0; i < image.length; i++) {
        image[i].style.transform = `translateY(-${percentageUp}%)`;
    }
}

function down() {

    if(percentageUp <= 0) {
        percentageUp = 0;
    } else {
        percentageUp -= 100;
    }

    for(let i = 0; i < image.length; i++) {
        image[i].style.transform = `translateY(-${percentageUp}%)`;
    }
}

// ADd and subtract quantity
const displayQuantity = document.querySelector('#displayQuantity');
let quantity = 0;
displayQuantity.innerHTML = 0;

function addQuantity() {
    quantity++;
    return displayQuantity.innerHTML = quantity;
}

function subtractQuantity() {
    if(quantity > 0) {
        quantity--;
    }
    return displayQuantity.innerHTML = quantity;

}

function addToCart() {
    
}



// Fetch API
// Take the id from req.params
const baseUrl = 'http://localhost:2000/api/v1';
const url = window.location.href;
const clothesId = url.substring(url.lastIndexOf('/') + 1);

// get clothes type to find related product
let clothesType = "";

const fetchIndividualClothes = async () => {
    const response = await fetch(`${baseUrl}/clothes/${clothesId}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })

    const clothesData = await response.json();
    const data = clothesData.data;
    clothesType = data.description.type;
    // Fetch Images and send images to UI
    imageContainer.innerHTML += `
    <div class="image"  style="background-image: url(${data.img}); background-size: cover; background-repeat: no-repeat; background-position: center;">

    </div>

    <div class="image"  style="background-image: url(${data.sideImg1}); background-size: cover; background-repeat: no-repeat; background-position: center;">

    </div>

    <div class="image"  style="background-image: url(${data.sideImg2}); background-size: cover; background-repeat: no-repeat; background-position: center;">

    </div>
    `
    image = document.querySelectorAll('.image');
    imgCounts = imageContainer.childElementCount;

    // Fetch Clothes Info and send UI
    const price = document.querySelector('#price');
    price.innerHTML += `${data.price} VND`;

    const sizeContainer = document.querySelector('#size-container')
    for (let i = 0; i < data.size.length; i++) {
        sizeContainer.innerHTML += ` <div class="size-child-container">
        <label>
          <input type="radio" name="size" value=${data.size[i]}> ${data.size[i]}
        </label>
      </div>`
    }

    const colorContainer = document.querySelector('#color-container');
    for (let i = 0; i < data.color.length; i++) {
        colorContainer.innerHTML += `<div class="color-child-container">
        <input type="radio" name="color" value="${data.color[i]}"> 
      </div>`
    }

    const descriptionContainer = document.querySelector('#description-container');
    descriptionContainer.innerHTML += `
        <li>Type: ${data.description.type}</li>
        <li>Fabric: ${data.description.fabric}</li>
        <li>Style: ${data.description.style}</li>
    `


} 

const fetchProductRelated = async () => {
    const response = await fetch(`${baseUrl}/clothes`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })

    const clothesData = await response.json();
    const data = clothesData.data;

    const sameTypeClothes = [];
    for(let i = 0; i < data.length; i++) {
        if(data[i].description.type === clothesType) {
            sameTypeClothes.push(data[i])
        }
    }

    const productRelatedContainer = document.querySelector('#productRelatedContainer');
    for(let i = 0; i < 4; i++) {
        productRelatedContainer.innerHTML += `<div class="image-child">
        <div class="image1" style="background-image: url(${sameTypeClothes[i].img}); background-position: center; background-repeat: no-repeat; background-size: cover;" ></div>
        <div class="clothes-info">
          <h3 class="clothes-name">${sameTypeClothes[i].name}</h3>
          <p class="price">${sameTypeClothes[i].price} VND</p>
        </div>
      </div>`
    }
}

fetchIndividualClothes()
fetchProductRelated()