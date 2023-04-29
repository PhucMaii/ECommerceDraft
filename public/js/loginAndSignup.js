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
    console.log('hi')
    const email = document.querySelector('#signup-email');
    const name = document.querySelector('#signup-name');
    const password = document.querySelector('#signup-password');

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
    console.log(response)
    const res = await response.json();

    console.log(res);
    window.location.href = `${baseUrl}/customers/dashboard`
}
