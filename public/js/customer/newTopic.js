function myFunction() {
    var x = document.getElementById("topNav");
    if (x.className === "nav-list") {
      x.className += " responsive";
    } else {
      x.className = "nav-list";
    }
  }

  const base = "https://ecommerce-xpla.onrender.com";
  const baseUrl = `${base}/api/v1`;

// Authorize User 
const getUserInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem('current-user'));
  if (!userInfo) {
      alert("You need to log in to get access");
      window.location.href = `${baseUrl}/customers/signup`
  }
}

getUserInfo();

// Check if user come to this page by nav bar or by search bar
const searchValue = localStorage.getItem('search');

// get all clothes
let itemPerPage = 9;
let currentPage = 1;

// Get sorted value from local storage
let sorted = localStorage.getItem('sorted');

//Change and Save the sorted value on localStorage, then updatePage function called 
const sort = (event) => {
  sorted = event.target.options[event.target.selectedIndex].textContent;
  localStorage.setItem('sorted', sorted);
  updatePage();
}

const fetchSameTopicClothes = async () => {
    
    const response = await fetch(`${baseUrl}/clothes`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'  
        }
    })
    const clothesData = await response.json();
    const data = clothesData.data;

    const result = data.filter((item) => {
        return item.topic === "Players";
    })
    return result;


}

// get each item by getting its id and send user to individual item page
const fetchIndividualClothes = async (event) => {
    const clothesId = event.target.id;
    const response = await fetch(`${baseUrl}/clothes/${clothesId}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      }
    })
  
    const clothesData = await response.json();
    window.location.href = `${baseUrl}/customers/individualProduct/${clothesData.data._id}`
  }
  


const updatePage = async () => {
    const data = await fetchSameTopicClothes();

    const clothesCardContainer = document.querySelector('#clothes-card-container');
    clothesCardContainer.innerHTML = '';
    for(let item of data) {
        clothesCardContainer.innerHTML += `<div class="clothes-card"  >
        <div class="image-background" style="background-image: url(${item.img})"></div>
        <div id=${item._id} class="clothes-type description" onclick="fetchIndividualClothes(event)">
            ${item.name}
        </div>
        <div class="clothes-price description">
            ${item.price} VND
        </div>
    </div>`
    }
}
// Call fetchAllClothes function whenever reload the page
window.onload = async () => {
    sorted = 'All Products';
    await updatePage();
}

// Call fetchAllClothes function whenever user navigate to other page
const goToPage = async (page) => {
    currentPage = page;
    await updatePage();
}

// Search Bar Function
const searchBar = () => {
  const searchBarValue = document.querySelector('#searchBar').value;
  localStorage.setItem('search', searchBarValue);
  window.location.href = `${baseUrl}/customers/search`;

}


// home nav
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