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
const itemPerPage = 9;
const currentPage = 1;
const fetchAllClothes = async (page) => {
    const response = await fetch(`${baseUrl}/clothes?page=${page}&limit=${itemPerPage}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'  
        }
    })
    const clothesData = await response.json();
    const data = clothesData.data;
    console.log(data);
    const clothesCardContainer = document.querySelector('#clothes-card-container');
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

const homeNav = () => {
    window.location.href = `${baseUrl}/customers/dashboard`;
}

fetchAllClothes(1);