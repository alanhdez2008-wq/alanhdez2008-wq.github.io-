function goRegister() {
  const login = document.getElementById("loginPanel");
  const register = document.getElementById("registerPanel");

  login.classList.remove("active");
  login.classList.add("move-left");

  register.classList.remove("move-right");
  register.classList.add("active");
}

function goLogin() {
  const login = document.getElementById("loginPanel");
  const register = document.getElementById("registerPanel");

  register.classList.remove("active");
  register.classList.add("move-right");

  login.classList.remove("move-left");
  login.classList.add("active");
}

function goHome() {
  window.location.href = "index.html";
}
