document.addEventListener("DOMContentLoaded", () => {
    const username = document.getElementById("username");
    const code = document.getElementById("code");
    const btn = document.getElementById("auth-btn");
    const nameError = document.getElementById("name-error");
    const codeError = document.getElementById("code-error");
    nameError.style.color = "red"
    codeError.style.color = "red"
    nameError.style.fontSize = "15px"
    codeError.style.fontSize = "15px"

    const validateInputs = () => {
        let isValid = true;

        if (username.value.length === 0) {
            nameError.innerText = "username is required";
            isValid = false;
        } else if (username.value.length >= 8) {
            nameError.innerText = "username must be less than 8 characters";
            isValid = false;
        } else {
            nameError.innerText = "";
        }

        if (code.value.length === 0) {
            codeError.innerText = "code is required";
            isValid = false;
        } else {
            codeError.innerText = "";
        }

        btn.disabled = !isValid;
    };

    username.addEventListener("input", validateInputs);
    code.addEventListener("input", validateInputs);

    btn.addEventListener("click", (event) => {
        if (btn.disabled) {
            event.preventDefault();
        } else {
            localStorage.setItem("username", username.value);
        }
    });

    validateInputs();
});