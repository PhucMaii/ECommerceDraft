const changePageBtnSignup = document.querySelector('#changePageBtnSignup');
const changePageBtnLogin = document.querySelector('#changePageBtnLogin');
const signupPage = document.querySelector('#signupPage');
const loginPage = document.querySelector('#loginPage');

function toLoginPage(){
    signupPage.classList.add('up');
    loginPage.classList.add('up')
}


function toSignUpPage() {
    signupPage.classList.remove('up');
    loginPage.classList.remove('up')
}

// Fetch API
const baseUrl = 'http://localhost:2000/api/v1';
let token;
const signUpFormSubmit = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#signup-email');
    const name = document.querySelector('#signup-name');
    const password = document.querySelector('#signup-password');
    const confirmPassword = document.querySelector('#signup-confirmPassword');

    const confirmPasswordNotification = document.querySelector('#confirmPassword-notification');
    const emailNotification = document.querySelector('#email-notification')

    const newCustomer = {
        name: name.value,
        email: email.value,
        password: password.value 
    }

    const response = await fetch(`${baseUrl}/customers/signup`, {
        method: "POST",
        body: JSON.stringify(newCustomer),
        headers: {
            'Content-type': 'application/json',
        }
    })
    const res = await response.json();


    // Add notification for user if their password and confirm password doesn't match
    emailNotification.innerHTML = '';
    confirmPasswordNotification.innerHTML = '';
    if(!res.error) {
        if (password.value === confirmPassword.value ) {

            emailNotification.innerHTML += `<div class="alert-successfully">${res.message}</div>`
            // Move to login section when they signup successfully
            setTimeout(() => {
                toLoginPage();
            }, 2000)

            
        } else {
    
            confirmPasswordNotification.innerHTML += `<div class="alert-error">Password Doesn't Match</div>`
        }
    } else {
        emailNotification.innerHTML += `<div class="alert-error">Email Existed Already</div>`
    }


}


const loginFormSubmit =  async (event) => {
    event.preventDefault();
    const email = document.querySelector('#login-email');
    const password = document.querySelector('#login-password');

    const notification = document.querySelector('#notification')

    const userData = {
        email: email.value,
        password: password.value 
    }

    const response = await fetch(`${baseUrl}/customers/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            'Content-type': 'application/json',
        }
    })
    const res = await response.json();
    notification.innerHTML = "";
    // Check to see if the response give me the token of the user
    if(res.token) {
        notification.innerHTML +=  `<div class="alert-successfully">${res.message}</div>`
        localStorage.setItem('access-token', res.token),
        localStorage.setItem('current-user', JSON.stringify(res.data));
        setTimeout(() => {
            window.location.href = `${baseUrl}/customers/dashboard`
        }, 3000)

    } else {
        notification.innerHTML +=  `<div class="alert-error">${res.message}</div>`
    }


}