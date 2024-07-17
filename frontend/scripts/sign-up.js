const form = document.querySelector('.signup-form');

const userNameInputEl = document.getElementById('name');
const userEmailInputEl = document.getElementById('email');
const userPhoneNumInputEl = document.getElementById('phone')
const userPassInputEl = document.getElementById('pass')

form.addEventListener('submit', async e=> {
    e.preventDefault();

    console.log(JSON.stringify({
        name: userNameInputEl.value,
        phone: userPhoneNumInputEl.value,
        email: userEmailInputEl.value,
        password:userPassInputEl.value
    }));

    const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // You may need to set the appropriate content type
          },
        body: JSON.stringify({
            name: userNameInputEl.value,
            phone: userPhoneNumInputEl.value,
            email: userEmailInputEl.value,
            password:userPassInputEl.value
        })
    })

    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data.user))

    window.location.assign(`${window.location.href.split('/').slice(0, -1).join('/')}/login.html`);
});