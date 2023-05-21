
localStorage.clear();
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

    const newAdmin = {
        name: name.value,
        email: email.value,
        password: password.value 
    }

    const response = await fetch(`${baseUrl}/admins`, {
        method: "POST",
        body: JSON.stringify(newAdmin),
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

    const adminData = {
        email: email.value,
        password: password.value 
    }

    const response = await fetch(`${baseUrl}/admins/login`, {
        method: "POST",
        body: JSON.stringify(adminData),
        headers: {
            'Content-type': 'application/json',
        }
    })
    const res = await response.json();
    notification.innerHTML = "";
    // Check to see if the response give me the token of the admin
    if(res.token) {
        notification.innerHTML +=  `<div class="alert-successfully">${res.message}</div>`
        localStorage.setItem('access-token', res.token),
        localStorage.setItem('current-admin', JSON.stringify(res.data));
        setTimeout(() => {
            window.location.href = `${baseUrl}/admins/dashboard`
        }, 3000)

    } else {
        notification.innerHTML +=  `<div class="alert-error">${res.message}</div>`
    }


}