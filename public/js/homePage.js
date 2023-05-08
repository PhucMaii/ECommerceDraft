

// FETCH API
const baseUrl = 'http://localhost:2000/api/v1';

const getUserInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem('current-user'));
  if(!userInfo) {
    alert("You need to log in to get access");
    window.location.href = `${baseUrl}/customers/signup`
  }
}

// Log out
const logout = () => {
  console.log('hi');
  localStorage.clear();
  window.location.href = `${baseUrl}/customers/signup`
}



const fetchClothes = async () =>  {
  const response = await fetch(`${baseUrl}/clothes`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json',
    }
  })

  const res = await response.json();
  console.log(res);
  // Add each newArrival Data and Best Seller clothes data in their section
  const newArrivalClothesSection = document.querySelector('#newArrivalClothes');
  const bestSellerSection = document.querySelector('#bestSellerClothes');

  const data = res.data;
  const newArrival = [];
  const bestSeller = [];
  for(let i = 0; i < data.length; i++) {
    if(data[i].isNewArrival) {
      newArrival.push(data[i]);
    }
    if(data[i].isBestSeller) {
      bestSeller.push(data[i])
    }
  }
  console.log(newArrival);
  console.log(bestSeller);
  for (let i = 0; i < 4 ; i++){
    newArrivalClothesSection.innerHTML += `
    <div class="clothes-card" >
      <div style="background-image: url('${newArrival[i].img}'); " class="image-background"></div>
      <div class="clothes-type" id=${newArrival[i]._id} onclick="fetchIndividualClothes(event)">
          ${newArrival[i].name}
      </div>
      <div class="clothes-price">
          ${newArrival[i].price} VND
      </div>
    </div>
  `
  }

  for (let i = 0; i < 4; i++){
    bestSellerSection.innerHTML += `
    <div class="clothes-card" >
      <div style="background-image: url('${bestSeller[i].img}'); " class="image-background" ></div>
      <div class="clothes-type" id=${bestSeller[i]._id} onclick="fetchIndividualClothes(event)">
          ${bestSeller[i].name}
      </div>
      <div' class="clothes-price">
          ${bestSeller[i].price} VND
      </div>
    </div>
  `
  }
}

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
fetchClothes();
getUserInfo();


