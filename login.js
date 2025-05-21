// login.js
document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Simple authentication
  if (username === "user" && password === "1234") {
    // Redirect to main grammar page
    window.location.href = "index.html";
  } else {
    document.getElementById("errorMsg").textContent = "Invalid username or password.";
  }
});
