const formForgot = document.querySelector('#forgot');
formForgot.onsubmit = async function (e) {
    e.preventDefault();
    const email = formForgot.elements['txtemail'].value
    const data = {
        "email": email
    }
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch('/forgot', options);
        if (response.ok) {
            const data = await response.text();
            // save id user to localstorage
            localStorage.setItem("repassID",data);
            window.location.replace(`/user/repass`);
        } else if (response.status == 400 || response.status == 401) {
            const data = await response.text();
            throw Error(data);
        } else {
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

// click cancel button
function goBack(){
    window.location.replace('/login');
}