function myFunction() {
    var x = document.getElementById("topNav");
    if (x.className === "nav-list") {
      x.className += " responsive";
    } else {
      x.className = "nav-list";
    }
  }
// Log out
const logout = () => {
    console.log('hi');
    localStorage.clear();
    window.location.href = `${baseUrl}/customers/signup`
  }
  
  const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('current-user'));
    if(!userInfo) {
      alert("You need to log in to get access");
      window.location.href = `${baseUrl}/customers/signup`
    }
  }

// FETCH API
const baseUrl = "http://localhost:2000/api/v1";

const currentUser = JSON.parse(localStorage.getItem('current-user'));
const token = localStorage.getItem('access-token')

// get total price from the fetchCartClothes and then use it for the applyCoupon function
let totalPrice = 0;

const fetchCartClothes = async () => {
    const response = await fetch(`${baseUrl}/customers/${currentUser._id}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })

    const customerData = await response.json();
    const data = customerData.data;
    const cart = data.cart;
    // Send UI from customer's cart data
    const showCartTable = document.querySelector('#show-cart-table');

    // Loop through cart to fetch each item and send UI for each of them
    if(cart.length === 0) {
        showCartTable.innerHTML += "<h2 class='alert-error alert-empty-cart'>Your Cart Is Empty Now. Let's Grab Some Items</h2>";
        setTimeout(() => {
            window.location.href = `${baseUrl}/customers/allClothes`;
        }, 3000)
    } else {
        for(let item of cart) {
            const clothesResponse = await fetch(`${baseUrl}/clothes/${item.clothesId}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const clothesData = await clothesResponse.json();
            const data = clothesData.data;
            
            // Get price of each clothes
            let price = data.price * item.quantity;
            totalPrice += price;
    
            showCartTable.innerHTML += `   <tr>
            <td class="product-section">
                <div class="image" style="background-image: url(${data.img}); background-position: center; background-repeat: no-repeat; background-size: cover"></div>
                <div class="product-info">
                    <h3>${data.name}</h3>
                    <p>Size: ${item.size}, Color: ${item.color}</p>
                </div>
            </td>
    
            <td>
                <div class="quantity">${item.quantity}</div>
            </td>
    
            <td class="price-container">
                <h3>${price} VND</h3>
                <p>${data.price} VND each</p>
            </td>
    
            <td>
                <button id=${item._id} class="remove-button" onclick="deleteItemInCart(event)">REMOVE</button>
            </td>
            
    
        </tr>`
        }
    
    }

    // Show price in UI
    const showPrice = document.querySelector('#show-price');
    showPrice.innerHTML += `<h3>Total Price</h3>
    <p>${totalPrice} VND</p>
    <h3>Discount</h3>
    <p id="discount">0 VND</p>
    <h3>Total</h3>
    <p id="totalPrice">${totalPrice} VND</p>`
}

// Remove Button feature
const deleteItemInCart = async (event) => {
    const id = event.target.id;
    const response = await fetch(`${baseUrl}/customers/cart/deleteItem/${currentUser._id}`, {
        method: "PUT",
        body:JSON.stringify({
            clothesId: id
        }),
        headers:{
            'Content-type': 'application/json'
        }
    })
    window.location.href = `${baseUrl}/customers/cart`;

}

//Apply coupon feature
const applyCoupon = async () => {
    const couponResponse = await fetch(`${baseUrl}/coupon`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    const couponData = await couponResponse.json();
    const cData = couponData.data;

    // get input coupon from customer
    const inputCoupon = document.querySelector('#coupon-value').value;

    // get notification block
    const notification = document.querySelector('#coupon-notification');
    notification.innerHTML = "";

    // count variable to count if coupon doesn't match any of the user input
    let count = 0;

    let amountOfDiscount = 0;
    for(let coupon of cData) {
        if(coupon.code === inputCoupon) {
            notification.innerHTML += `<div class="alert-successfully">Coupon Applied</div>`;
            amountOfDiscount = coupon.amountOfDiscount;
        } else {
            count += 1;
        }
    }
    if(count == cData.length) {
        notification.innerHTML += `<div class="alert-error">Coupon Doesn't Exist</div>`
    }

    const discount = amountOfDiscount < 1? totalPrice * amountOfDiscount : amountOfDiscount
    // Add Discount 
    const displayDiscount = document.querySelector('#discount');
    displayDiscount.innerHTML = `${discount} VND`;
    const displayTotal = document.querySelector('#totalPrice');
    displayTotal.innerHTML = `${totalPrice - discount}`;

}

// Continue shopping feature
const continueShopping = () => {
    window.location.href = `${baseUrl}/customers/dashboard`;
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
fetchCartClothes();