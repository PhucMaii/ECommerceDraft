function myFunction() {
    var x = document.getElementById("topNav");
    if (x.className === "nav-list") {
      x.className += " responsive";
    } else {
      x.className = "nav-list";
    }
  }

// FETCH API
const baseUrl = 'http://localhost:2000/api/v1'
const fetchClothes = async () =>  {

  const token = localStorage.getItem('access-token');
  const response = await fetch(`${baseUrl}/clothes`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
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
  for (let i = 0; i < newArrival.length ; i++){
    newArrivalClothesSection.innerHTML += `
    <div class="clothes-card" >
      <div style="background-image: url('${newArrival[i].img}'); " class="image-background"></div>
      <div class="clothes-type">
          ${newArrival[i].name}
      </div>
      <div class="clothes-price">
          ${newArrival[i].price}
      </div>
    </div>
  `
  }

  for (let i = 0; i < bestSeller.length ; i++){
    bestSellerSection.innerHTML += `
    <div class="clothes-card" >
      <div style="background-image: url('${bestSeller[i].img}'); " class="image-background"></div>
      <div class="clothes-type">
          ${bestSeller[i].name}
      </div>
      <div class="clothes-price">
          ${bestSeller[i].price}
      </div>
    </div>
  `
  }


}
fetchClothes();