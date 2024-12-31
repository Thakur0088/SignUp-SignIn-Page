const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.querySelector(".sign-up-form");
  const signInForm = document.querySelector(".sign-in-form");

  signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = signUpForm.querySelector("input[placeholder='Username']").value;
    const email = signUpForm.querySelector("input[placeholder='Email']").value;
    const password = signUpForm.querySelector("input[placeholder='Password']").value;

    if (!username || !email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Successfully Created An Account!");
        signUpForm.reset();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      alert("Failed to connect to the server. Please try again.");
    }
  });

  signInForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = signInForm.querySelector("input[placeholder='Username']").value;
    const password = signInForm.querySelector("input[placeholder='Password']").value;

    if (!username || !password) {
      alert("Please fill in all fields!");
      return;
    }

    const userData = { username, password };

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Login successful!");
        signInForm.reset();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      alert("Failed to connect to the server. Please try again.");
    }
  });
});
