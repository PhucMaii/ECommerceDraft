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