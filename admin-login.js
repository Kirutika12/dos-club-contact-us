const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#login-error");
const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector("#togglePassword");


/* SHOW / HIDE PASSWORD */

togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

        togglePassword.title = "Hide password";

    } else {

        passwordInput.type = "password";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

        togglePassword.title = "Show password";

    }

});


/* LOGIN */

loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const username =
        document.querySelector("#username").value.trim();

    const password =
        passwordInput.value;


    try {

        const response = await fetch("/api/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                password: password
            })

        });


        const data = await response.json();


        if (data.success) {

            window.location.href = "/admin.html";

        } else {

            loginError.textContent = data.message;

        }


    } catch (error) {

        loginError.textContent =
            "Unable to connect to the server.";

        console.error(error);

    }

});