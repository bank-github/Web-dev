const formRepass = document.querySelector('#formRepass');
formRepass.onsubmit = async function (e) {
    e.preventDefault();
    const password = formRepass.elements['txtpass'].value;
    const rePassword = formRepass.elements['txtrepass'].value;
    const repassID = localStorage.getItem('repassID');

    const data = {
        "password": password
    }
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }
    try {
        // check pass word match or not
        if (password != rePassword) {
            throw Error('Password not match!');
        }
        const response = await fetch(`/repass/${repassID}`, options);
        if (response.ok) {
            const data = await response.text();
            Swal.fire({
                icon: "success",
                title: "Complete",
                text: data
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('repassID');
                    window.location.replace('/');
                }
            })

        } else if (response == 401) {
            const data = await response.text();
            throw Error(data);
        } else {
            const data = await response.text();
            throw Error(data);
        }
    } catch (err) {
        console.error(err.message);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message
        }
        );
    }
}


// when click cancel
function goBack() {
    window.localStorage.removeItem('repassID');
    window.location.replace('/login');
}