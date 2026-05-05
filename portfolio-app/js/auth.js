let users = JSON.parse(localStorage.getItem("users") || "[]");

let isLogin = true;

/* ---------------- TOGGLE LOGIN / REGISTER ---------------- */
function toggleMode() {
  isLogin = !isLogin;

  document.getElementById("authTitle").innerText = isLogin
    ? "Login"
    : "Register";

  document.getElementById("name").style.display = isLogin ? "none" : "block";

  document.getElementById("authBtn").innerText = isLogin ? "Login" : "Register";

  document.getElementById("switchText").innerText = isLogin
    ? "Don't have account? Register"
    : "Already have account? Login";

  document.getElementById("msg").innerText = "";
}

/* ---------------- MAIN ACTION ---------------- */
function authAction() {
  if (isLogin) login();
  else register();
}

/* ---------------- REGISTER ---------------- */
function register() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let msg = document.getElementById("msg");

  if (!name || !email || !password) {
    msg.innerText = "⚠ Please fill all fields!";
    return;
  }

  let exists = users.find((u) => u.email === email);

  if (exists) {
    msg.innerText = "⚠ User already exists! Please login.";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  msg.innerText = "✅ Registration successful! Switching to login...";

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";

  setTimeout(() => {
    isLogin = true;
    toggleMode();
  }, 800);
}

/* ---------------- LOGIN ---------------- */
function login() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let msg = document.getElementById("msg");

  if (!email || !password) {
    msg.innerText = "⚠ Enter email & password!";
    return;
  }

  let foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!foundUser) {
    msg.innerText = "❌ Invalid credentials!";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(foundUser));

  msg.innerText = "✅ Login successful! Redirecting...";

  setTimeout(() => {
    // 🔥 FIXED: dashboard nahi hai → index.html
    window.location.href = "./index.html";
  }, 800);
}

/* ---------------- LOGOUT ---------------- */
function logout() {
  localStorage.removeItem("currentUser");

  // 🔥 FIXED: dashboard nahi hai → index.html
  window.location.href = "./index.html";
}
