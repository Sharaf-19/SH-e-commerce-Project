const form = document.querySelector('.login100-form.validate-form');

const userEmailInputEl = document.getElementById('user-email')
const userPassInputEl = document.getElementById('user-pass')

form.addEventListener('submit', async e=> {
    e.preventDefault();

    console.log(JSON.stringify({
        email: userEmailInputEl.value,
        password:userPassInputEl.value
    }));

    const response = await fetch('http://localhost:4000/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // You may need to set the appropriate content type
          },
        body: JSON.stringify({
            email: userEmailInputEl.value,
            password:userPassInputEl.value
        })
    })

    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data.user))

    window.location.assign(`${window.location.href.split('/').slice(0, -1).join('/')}/s.html`);
});