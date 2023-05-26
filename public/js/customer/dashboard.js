localStorage.clear();
function myFunction() {
    var x = document.getElementById("topNav");
    if (x.className === "nav-list") {
        x.className += " responsive";
    } else {
        x.className = "nav-list";
    }
}

const apiKey = 'b4e5bf38966d4d65922ae9bc587ab071';

const compressImage = async (imageUrl) => {
    const response = await fetch('https://images.abstractapi.com/v1/url/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          api_key: 'b4e5bf38966d4d65922ae9bc587ab071',
          url: imageUrl,
          lossy: true
        })
       });
    
       const compressImage = await response.json();
       console.log(compressImage);
}

compressImage('https://images.unsplash.com/photo-1684769797923-d6c181da48da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80')

// FETCH API
// const base = "https://ecommerce-r7tm.onrender.com";
const baseUrl = `/api/v1`;

const login = () => {
    window.location.href = `${baseUrl}/customers/signup`;
}


const fetchClothes = async () => {
    const response = await fetch(`${baseUrl}/clothes`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
        }
    })

    const res = await response.json();
    // Add each newArrival Data and Best Seller clothes data in their section
    const newArrivalClothesSection = document.querySelector('#newArrivalClothes');
    const bestSellerSection = document.querySelector('#bestSellerClothes');

    const data = res.data;
    // get best seller item by sorting the data by their sales
    const bestSeller = data.map((obj) => {
        if (!obj.hasOwnProperty('sales')) {
            obj.sales = 0;
        }
        return obj;
    }).sort((a, b) => b.sales - a.sales);

    const newArrival = [];
    // const bestSeller = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].isNewArrival) {
            newArrival.push(data[i]);
        }
    }
    // console.log(bestSeller);
    for (let i = 0; i < 4; i++) {
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

    for (let i = 0; i < 4; i++) {
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

// Search Bar Function
const searchBar = () => {
    const searchBarValue = document.querySelector('#searchBar').value;
    localStorage.setItem('search', searchBarValue);
    window.location.href = `${baseUrl}/customers/search`;

}

// go to new topic page
const toNewTopicPage = () => {
    window.location.href = `${baseUrl}/customers/dashboard/newTopic`
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
fetchClothes();
getUserInfo();


