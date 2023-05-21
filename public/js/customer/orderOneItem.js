

const base = "https://ecommerce-r7tm.onrender.com";
const baseUrl = `${base}/api/v1`;

const currentUser = JSON.parse(localStorage.getItem('current-user'));
const token = localStorage.getItem('access-token');

// Authorize User 
const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('current-user'));
    if (!userInfo) {
        alert("You need to log in to get access");
        window.location.href = `${baseUrl}/customers/signup`
    }
}

getUserInfo();
const itemToBuy = JSON.parse(localStorage.getItem('itemToBuy'));


const updateUICart = async () => {
    const response = await fetch(`${baseUrl}/clothes/${itemToBuy.clothesId}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    const clothesData = await response.json();
    const data = clothesData.data;
    const itemList = document.querySelector('#item-list');

    const price = data.price * itemToBuy.quantity;
    itemList.innerHTML += `<div class="item-card">
    <div class="item-image" style="background-image: url(${data.img}); background-position: center; background-repeat: no-repeat; background-size: cover;" ></div>
    <div class="item-name-and-color-size">
        <div class="item-name">${data.name}</div>
        <div class="color-and-size">${itemToBuy.color}/${itemToBuy.size}</div>
    </div>
    <div class="quantity">${itemToBuy.quantity}</div>
    <div class="price">$${price}</div>
    </div>
    <div class="whiteline-container payment-whiteline" >
    <div class="whiteline" style="height: 1px; margin-bottom: 20px; margin-top: 20px">
    </div>
    </div>`


    const subtotal = document.querySelector('#subtotal');
    subtotal.innerHTML += `<p>$ <span>${price}</span></p>`


    const priceContainer = document.querySelector('#price-container');
    priceContainer.innerHTML += `  <div class="subtotal-container price-child-container">
            <h4>Subtotal</h4>
            <p>$${price}</p>
        </div>

        <div class="discount-container price-child-container">
            <h4>Discount</h4>
            <p id="discount">$0</p>
        </div>

        <div class="whiteline-container">
            <div class="whiteline" style="height: 1px">
            </div>
        </div>

        <div class="total-amount-container price-child-container">
            <h4>Total Amount</h4>
            <p id="totalPrice">$${price}</p>
        </div>

        <button id="purchase">Make Payment</button>`;
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
    displayDiscount.innerHTML = `$${discount}`;
    const displayTotal = document.querySelector('#totalPrice');
    displayTotal.innerHTML = `${totalPrice - discount}`;

}

const getCustomerOrderInfo = async (event) => {
    event.preventDefault();
    const customerFirstName = document.querySelector('#customer-first-name').value;
    const customerLastName = document.querySelector('#customer-last-name').value;
    const customerEmailAddress = document.querySelector('#customer-email-address').value;
    const customerAddress = document.querySelector('#customer-address').value;
    const customerAddress2 = document.querySelector('#customer-address2').value;
    const country = document.querySelector('#country-options').value;
    const state = document.querySelector('#state-options').value;
    const postalCode = document.querySelector('#customer-postal-code').value;

    const creditCardNumber = document.querySelector('#credit-card-number').value;
    const expirationMonth = document.querySelector('#expirationMonth').value;
    const expirationYear = document.querySelector('#expirationYear').value;
    const cvv = document.querySelector('#cvv').value;

    const countryNotification = document.querySelector('#country-notification');
    countryNotification.innerHTML = '';
    const stateNotification = document.querySelector('#state-notification');
    stateNotification.innerHTML = '';

    if(country === "default") {
        countryNotification.innerHTML += "Please select the country";
        return;
    }
    if(state === "default") {
        stateNotification.innerHTML += "Please select the state";
        return;
    }


    const newOrder = {
        firstName: customerFirstName,
        lastName: customerLastName,
        emailAddress: customerEmailAddress,
        address: customerAddress,
        address2: customerAddress2,
        country: country,
        state: state,
        postalCode: postalCode,
        creditCardNumber: creditCardNumber,
        expirationMonth: expirationMonth,
        expirationYear: expirationYear,
        cvv: cvv
    };

    const orderResponse = await fetch(`${baseUrl}/customers/order/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(newOrder),
        headers: {
            'Content-type': 'application/json'
        }
    })
    
    const orderData = await orderResponse.json();
    if(orderData.error){
        console.log(orderData.error)
    } else {
        window.location.href = `${baseUrl}/customers/cart/purchaseMethod/purchaseSuccessfully`

    }


}

// only allow user to input number
function validateNumber(event) {
    const input = event.target;
    const value = input.value;

    // remove all non-numeric value
    const numericValue = value.replace(/\D/g, '');

    // Update the input value
    input.value = numericValue;
}
  
// disable spacebar key
function disableSpaceKey(event) {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
}

  

updateUICart();