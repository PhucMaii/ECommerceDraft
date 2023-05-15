function myFunction() {
    const mainContainer = document.getElementById("main-container");
    var x = document.getElementById("topNav");
    if (x.className === "nav-list") {
        x.className += " responsive";
        mainContainer.style.transform = 'translateY(150px)';
    } else {
        x.className = "nav-list";
        mainContainer.style.transform = 'translateY(0)';

    }
  }
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

// Log out
const logout = () => {
    console.log('hi');
    localStorage.clear();
    window.location.href = `${baseUrl}/customers/signup`
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

const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('current-user'));
    if(!userInfo) {
      alert("You need to log in to get access");
      window.location.href = `${baseUrl}/customers/signup`
    }
  }

// Fetch API
// Take the id from req.params
const baseUrl = 'http://localhost:2000/api/v1';
const url = window.location.href;
const clothesId = url.substring(url.lastIndexOf('/') + 1);

// get clothes type to find related product
let clothesType = "";

// Get clothes which is showed in this website, then avoid it to be shown in product related
let mainClothesData;
const fetchIndividualClothes = async () => {
    const response = await fetch(`${baseUrl}/clothes/${clothesId}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })

    const clothesData = await response.json();
    const data = clothesData.data;
    mainClothesData = data;
    clothesType = data.description.type;
    // Fetch Images and send images to UI
    imageContainer.innerHTML += `
    <div class="image"  style="background-image: url(${data.img}); background-size: cover; background-repeat: no-repeat; background-position: center;">

    </div>`
    if(data.sideImg1) {
        imageContainer.innerHTML += `
        <div class="image"  style="background-image: url(${data.sideImg1}); background-size: cover; background-repeat: no-repeat; background-position: center;">
    
        </div>`
    }
    if(data.sideImg2) {
        imageContainer.innerHTML += `
        <div class="image"  style="background-image: url(${data.sideImg2}); background-size: cover; background-repeat: no-repeat; background-position: center;">
    
        </div>`
    }
    image = document.querySelectorAll('.image');
    imgCounts = imageContainer.childElementCount;

    // Fetch Clothes Info and send UI
    const price = document.querySelector('#price');
    price.innerHTML += `${data.price} VND`;

    // Size Options
    const sizeContainer = document.querySelector('#size-container')
    for (let i = 0; i < data.size.length; i++) {
        sizeContainer.innerHTML += ` <div class="size-child-container">
        <label>
          <input type="radio" name="size" value=${data.size[i]}> ${data.size[i]}
        </label>
      </div>`
    }

    // Color Options
    const colorContainer = document.querySelector('#color-container');
    for (let i = 0; i < data.color.length; i++) {
        colorContainer.innerHTML += `<div class="color-child-container">
        <input type="radio" name="color" value="${data.color[i]}"> 
      </div>`
    }

    // Display Diescription
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
        if(data[i].description.type === clothesType && data[i]._id !== mainClothesData._id) {
            sameTypeClothes.push(data[i])
        }
    }

    const productRelatedContainer = document.querySelector('#productRelatedContainer');
    for(let i = 0; i < 4; i++) {
        productRelatedContainer.innerHTML += `<div class="image-child">
        <div class="image1" style="background-image: url(${sameTypeClothes[i].img}); background-position: center; background-repeat: no-repeat; background-size: cover;" ></div>
        <div class="clothes-info">
          <h3 class="clothes-name" id=${sameTypeClothes[i]._id} onclick=toProductRelatedPage(event)>${sameTypeClothes[i].name}</h3>
          <p class="price">${sameTypeClothes[i].price} VND</p>
        </div>
      </div>`
    }
}

const toProductRelatedPage = async (event) => {
    const id = event.target.id;

    const response = await fetch(`${baseUrl}/clothes/${id}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    const clothesData = await response.json();
    const data = clothesData.data;
    window.location.href = `${baseUrl}/customers/individualProduct/${data._id}`
    
}

const currentUser = JSON.parse(localStorage.getItem('current-user'));

// Add to cart feature
const addToCart = async () => {
    
    // Get size and color value
    let sizeValue = "";
    let colorValue = "";

    // get size and color container
    const size = document.getElementsByName('size');
    const color = document.getElementsByName('color');

    // Get quantity value
    const quantity = document.querySelector('#displayQuantity');

    // Loop through all elements has name = size to find if is there anythin checked
    for(let i = 0; i < size.length; i++) {
        if(size[i].checked) {
            sizeValue = size[i].value;
        }
    }

    for(let i = 0; i < color.length; i++) {
        if(color[i].checked) {
            colorValue = color[i].value;
        }
    }

    // Get notification line when user don't choose any options for size or color
    const resultNotification = document.querySelector('#result-notification');
    resultNotification.innerHTML = "";

    if(sizeValue === "" || colorValue === "") {
        resultNotification.innerHTML += `<div class="alert-error">No options selected for size or color</div>`
    }  else if(quantity.innerHTML <= 0) {
        resultNotification.innerHTML += `<div class="alert-error">Quantity must be greater than 0</div>`

    }
    
    else{
            // Get all information of item that user want to add to their cart
        const addToCartItem = {
            clothesId: clothesId,
            color: colorValue,
            size: sizeValue,
            quantity: quantity.innerHTML 
        }

        const response = await fetch(`${baseUrl}/customers/addToCart/${currentUser._id}`, {
            method: "PUT",
            body: JSON.stringify(addToCartItem),
            headers: {
                'Content-type': 'application/json'
            }
        })
        resultNotification.innerHTML += `<div class="alert-successfully">Add To Cart Successfully</div>`
        setTimeout(() => {
            window.location.href = `${baseUrl}/customers/cart`
        }, 2000 )
    }
}

// Search Bar Function
const searchBar = () => {
    const searchBarValue = document.querySelector('#searchBar').value;
    localStorage.setItem('search', searchBarValue);
    window.location.href = `${baseUrl}/customers/search`;
  
  }
  

// Home Nav
const homeNav = () => {
    window.location.href = `${baseUrl}/customers/dashboard`;
}

// Shop Nav
const shopNav = () => {
    window.location.href = `${baseUrl}/customers/allClothes`;
}
  
// Shop specific clothes type nav
const shopSpecificType = (type) => {
    window.location.href = `${baseUrl}/customers/${type}`;
}

// Cart Nav
const cartNav = () => {
    window.location.href = `${baseUrl}/customers/cart`;
  }
fetchIndividualClothes()
fetchProductRelated()