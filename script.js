// REGISTER USER
function registerUser() {
    let email = document.getElementById("reg-email").value;
    let password = document.getElementById("reg-password").value;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "") {
        document.getElementById("register-msg").style.color = "red";
        document.getElementById("register-msg").innerHTML = "Please fill all fields!";
        return;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("register-msg").style.color = "red";
        document.getElementById("register-msg").innerHTML = "Enter a valid email address!";
        return;
    }

    // Save to localStorage
    localStorage.setItem("restaurantEmail", email);
    localStorage.setItem("restaurantPass", password);

    document.getElementById("register-msg").style.color = "green";
    document.getElementById("register-msg").innerHTML = "Registration Successful! You can now login.";
}



// LOGIN USER
function validateLogin() {
    let email = document.getElementById("email-id").value;
    let password = document.getElementById("password").value;

    let savedEmail = localStorage.getItem("restaurantEmail");
    let savedPass = localStorage.getItem("restaurantPass");

    if (email === savedEmail && password === savedPass) {
        window.location.href = "main.html";
    } else {
        document.getElementById("error-message").innerHTML = "Invalid email or password!";
    }
}
function filterMenu() {
    let selected = document.getElementById("categoryFilter").value;
    let items = document.querySelectorAll(".menu-item");

    items.forEach(item => {
        let category = item.getAttribute("data-category");

        if (selected === "all" || selected === category) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}
function loadCart() {
    let area = document.getElementById("cart-items");
    let total = 0;
    area.innerHTML = "";

    cart.forEach((item, i) => {
        area.innerHTML += `<p>${item.name} — ₹${item.price}</p>`;
        total += item.price;
    });

    document.getElementById("totalBill").innerHTML = "Total: ₹" + total;
    localStorage.setItem("bill", total);
}
function goToCheckout() {
    window.location.href = "checkout.html";
}
function placeOrder() {
    let name = document.getElementById("custName").value;
    let address = document.getElementById("custAddress").value;
    let mobile = document.getElementById("custMobile").value;
    let total = localStorage.getItem("bill");

    if (!name || !address || !mobile) {
        document.getElementById("orderMsg").innerHTML = "Fill all fields!";
        return;
    }

    document.getElementById("orderMsg").innerHTML =
        `Order placed successfully! Total Bill: ₹${total}`;
}
if (window.location.pathname.includes("cart.html")) {
    loadCart();
}
if (window.location.pathname.includes("checkout.html")) {
    document.getElementById("checkoutTotal").innerHTML =
        "Total Bill: ₹" + localStorage.getItem("bill");
}