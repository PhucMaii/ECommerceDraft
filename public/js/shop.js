// FETCH API
const baseUrl = 'http://localhost:2000/api/v1';

const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('current-user'));
    if(!userInfo) {
      alert("You need to log in to get access");
      window.location.href = `${baseUrl}/customers/signup`
    }
  }

// get all clothes
let itemPerPage = 9;
let currentPage = 1;

const fetchAllClothes = async (page) => {
    const response = await fetch(`${baseUrl}/clothes?page=${page}&limit=${itemPerPage}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'  
        }
    })
    const clothesData = await response.json();
    const data = clothesData.data;

    return data;


}

// Call fetchAllClothes function whenever reload the page
window.onload = async () => {
    const data = await fetchAllClothes(currentPage);
    
    totalPages = data.totalPages;
    const clothesCardContainer = document.querySelector('#clothes-card-container');
    clothesCardContainer.innerHTML = '';
    for(let item of data.docs) {
        clothesCardContainer.innerHTML += `<div class="clothes-card"  >
        <div class="image-background" style="background-image: url(${item.img})"></div>
        <div class="clothes-type description">
            ${item.name}
        </div>
        <div class="clothes-price description">
            ${item.price} VND
        </div>
    </div>`
    }
}

// Call fetchAllClothes function whenever user navigate to other page
const goToPage = async (page) => {
    currentPage = page;
    const data = await fetchAllClothes(currentPage);
    const clothesCardContainer = document.querySelector('#clothes-card-container');
    clothesCardContainer.innerHTML = '';
    for(let item of data.docs) {
        clothesCardContainer.innerHTML += `<div class="clothes-card"  >
        <div class="image-background" style="background-image: url(${item.img})"></div>
        <div class="clothes-type description">
            ${item.name}
        </div>
        <div class="clothes-price description">
            ${item.price} VND
        </div>
    </div>`
    }
}

// Add goToPage function to each of the page navigator
const pagination = async () => {
    const response = await fetch(`${baseUrl}/clothes`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    const clothesData = await response.json();
    const data = clothesData.data;

    const paginationControls = document.querySelector('#pagination-controls');
    for (let i = 1; i <= totalPages; i++) {
        console.log('hi');
        const button = document.createElement('button');
        button.classList.add('page-button');
        button.textContent = i;
        button.onclick = () => goToPage(i);
        paginationControls.appendChild(button);
    }

}
pagination();


const homeNav = () => {
    window.location.href = `${baseUrl}/customers/dashboard`;
}
