
// FETCH API
const baseUrl = "http://localhost:2000/api/v1";

const currentUser = JSON.parse(localStorage.getItem('current-user'));
const token = localStorage.getItem('access-token')

const fetchUserInfo = async () => {
    const response = await fetch(`${baseUrl}/customers/${currentUser._id}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    const customerData = await response.json();
    const data = customerData.data;
    return data;
}


let totalPrice = 0;
const updateUICart = async () => {
    const customerData = await fetchUserInfo();
    const customerCart = customerData.cart;
    
    const itemList = document.querySelector('#item-list');

    for(let item of customerCart) {
        const clothesResponse = await fetch(`${baseUrl}/clothes/${item.clothesId}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        const clothesData = await clothesResponse.json();
        const data = clothesData.data;
        let price = data.price * item.quantity;
        totalPrice += price;
        itemList.innerHTML += `<div class="item-card">
        <div class="item-image" style="background-image: url(${data.img}); background-position: center; background-repeat: no-repeat; background-size: cover;" ></div>
        <div class="item-name-and-color-size">
            <div class="item-name">${data.name}</div>
            <div class="color-and-size">${item.color}/${item.size}</div>
        </div>
        <div class="quantity">${item.quantity}</div>
        <div class="price">$${price}</div>
    </div>
    <div class="whiteline-container payment-whiteline" >
                    <div class="whiteline" style="height: 1px; margin-bottom: 20px; margin-top: 20px">
                    </div>
                </div>`
    }

    const subtotal = document.querySelector('#subtotal');
    subtotal.innerHTML += `<p>$ <span>${totalPrice}</span></p>`


    const priceContainer = document.querySelector('#price-container');
    priceContainer.innerHTML += `  <div class="subtotal-container price-child-container">
            <h4>Subtotal</h4>
            <p>$${totalPrice}</p>
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
            <p id="totalPrice">$${totalPrice}</p>
        </div>

        <button id="purchase">Make Payment</button>`
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