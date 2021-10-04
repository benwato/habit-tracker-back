const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', (e) => {
    console.log('clicked')
    e.preventDefault()
    doLogin()
})

async function doLogin() {
    const emailVal = emailInput.value;
    const passVal = passwordInput.value;
    const options = {
        "method": 'POST',
        "credentials": "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            "email": emailVal,
            "password": passVal,

        })
    }
    await fetch('http://localhost:3000/api/user/login', options)



}