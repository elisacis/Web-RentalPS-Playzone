document.addEventListener("DOMContentLoaded", function () {
  // Function to load navbar HTML
  function loadNavbar() {
    fetch("./src/components/navbar/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
        addActiveClass(); // Add active class to current page link
        setupToggleButton(); // Setup toggle button click event
        setupScrollBehavior(); // Setup scroll behavior
      })
      .catch((error) => console.log("Error loading navbar:", error));
  }

  // Function to add active class to current page link
  function addActiveClass() {
    var currentLocation = window.location.href;
    var navLinks = document.querySelectorAll("#navbar a");

    navLinks.forEach(function (link) {
      if (link.href === currentLocation) {
        link.classList.add("active");
      }
    });
  }

  function setupToggleButton() {
    const mobileMenu = document.querySelector("header nav .mobile-menu");
    const menu = document.querySelector("header nav .menu");
    mobileMenu.addEventListener("click", function () {
      menu.classList.toggle("show");
    });
    // Remove class kalau diklik diluar
    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !mobileMenu.contains(event.target)) {
        menu.classList.remove("show");
      }
    });
  }

  function setupScrollBehavior() {
    const header = document.querySelector("header");
    window.onscroll = function () {
      if (document.documentElement.scrollTop >= 200) {
        console.log("test");
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
  }

  // Load the navbar when the DOM is ready
  loadNavbar();
});

var body = document.querySelector("body");

document.querySelector(".tab").innerHTML = `<p class="all">All Categories</p>${[
  ...new Set(
    [...document.querySelectorAll(".category")].map(
      (c) =>
        `<p class="${c.textContent.toLowerCase().replace(" ", "")}">${
          c.textContent
        }</p>`
    )
  ),
].join("")}`;



const products = document.querySelectorAll(".product");

for (var i = 0; i < products.length; i++) {
  var product = products[i];
  var category = product.getElementsByClassName("category")[0];
  var categoryText = category.innerText.toLowerCase().replace(" ", "");
  product.classList.add(categoryText);
}

var tabs = document.querySelectorAll(".tab > p");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      var tabClass = this.className;
      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });
      this.classList.add("active");
      Array.from(products).forEach(function (product) {
        var productClass = product.classList;
        var shouldDisplay =
          tabClass === "all" || productClass.contains(tabClass);

        product.style.display = shouldDisplay ? "block" : "none";
      });
    }
  });
});

//Mengatur tab "All Menu" sebagai tab default yang aktif
if (tabs.length > 0) {
  tabs[0].classList.add("active");
}

products.forEach((product) => {
  product.addEventListener("click", () => {
    const clonedContent = product.cloneNode(true);
    const popup = document.querySelector(".popup");
    const ov = document.querySelector(".overlay");
    popup.innerHTML = "";
    popup.appendChild(clonedContent);

    // Ambil kategori dan subkategori
    const category = product.getAttribute("data-category") || "Snack";
    const subcategory = product.getAttribute("data-subcategory") || "";

    // Set data-category di popup
    popup.setAttribute("data-category", category);
    popup.setAttribute("data-subcategory", subcategory);

    // Cek apakah ada elemen price
    const productPriceElement = product.querySelector(".price");
    const popupPriceElement = popup.querySelector(".price");

    if (productPriceElement && popupPriceElement) {
      const originalPrice = productPriceElement.getAttribute("value") || productPriceElement.textContent.replace(/\D/g, '');
      popupPriceElement.setAttribute("value", originalPrice);
      popupPriceElement.textContent = "Rp " + parseInt(originalPrice).toLocaleString("id-ID");
    }

    // Set amount default
    const amountInput = popup.querySelector("#product-amount");
    if (amountInput) {
      let initialAmount = 1;
      if (category === "Play") {
        if (subcategory === "VIP") {
          initialAmount = 2;
        } else if (subcategory === "Bawa Pulang") {
          initialAmount = 12;
        } else if (subcategory === "Reguler") {
          initialAmount = 1;
        }
      }
      amountInput.value = initialAmount;
      // jangan langsung updatePrice di sini
    }

    popup.classList.add("show");
    ov.classList.add("show");
    body.classList.add("ov");
    fadeIn(document.querySelector(".overlay"));
  });
});


function closePopup() {
  document.querySelector(".popup").classList.remove("show");
  document.querySelector(".overlay").classList.remove("show");
  fadeOut(document.querySelector(".overlay"));
  body.classList.remove("ov");
}

function appendHTML(selector, html) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (element) {
    element.innerHTML += html;
  });
}

function beforeHTML(selector, html) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (element) {
    element.insertAdjacentHTML("beforebegin", html);
  });
}

function addToCart() {
  const productName = document.querySelector(".popup h3").textContent;
  const productPrice = document.querySelector(".popup .price").textContent;
  const productQuantity = document.querySelector(".popup #product-amount").value;
  const productImage = document.querySelector(".popup .img img").getAttribute("src");
  const originalPrice = document.querySelector(".popup .price").getAttribute("value");

  const typeElement = document.querySelector(".popup #hiddenTypeInput");
  const sugarElement = document.querySelector(".popup #hiddenSugarInput");
  const type = typeElement ? typeElement.value : null;
  const sugar = sugarElement ? sugarElement.value : null;

  // Ambil juga kategori dan subkategori dari popup
  const popup = document.querySelector(".popup");
  const category = popup.getAttribute("data-category") || "Snack";
  const subcategory = popup.getAttribute("data-subcategory") || "";

  let cartItems = [];

  const existingCartItems = localStorage.getItem("cartItems");
  if (existingCartItems) {
    cartItems = JSON.parse(existingCartItems);
  }

  const finalType = type || "Tidak ada tipe";
  const finalTempatDuduk = sugar || "Tidak ada tempat duduk";

  const newProductData = {
    name: productName,
    price: productPrice,
    image: productImage,
    quantity: productQuantity,
    originalPrice: originalPrice,
    type: finalType,
    sugar: finalTempatDuduk,
    category: category,           
    subcategory: subcategory      
  };

  cartItems.push(newProductData);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  alert("Product added to cart!");
  closePopup();
}


beforeHTML(
  ".price",
  `
  <div class="amount">
      <span>Amount</span>
      <div class="number">
        <div class="minus" onclick="decreaseValue()"><i class="fas fa-minus"></i></div>
        <div class="value"><input id="product-amount" value=""/></div>
        <div class="plus" onclick="increaseValue()"><i class="fas fa-plus"></i></div>
      </div>
  </div>
`
);


appendHTML(
  ".product-wrap .type",
  `
  <span>Versi</span>
  <select class="fixed" onchange="stillValue(); updateHiddenInput('hiddenTypeInput', this.value)">
      <option selected>PS 4</option>
      <option>PS 5</option>
  </select>
  <input name="type" type="hidden" id="hiddenTypeInput" value="PS 4" />

`
);

appendHTML(
  ".product-wrap .sugar",
  `
  <span>Nomor Tempat Duduk</span>
  <select class="fixed" onchange="stillValue(); updateHiddenInput('hiddenSugarInput', this.value)">
      <option selected=''>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
      <option>11</option>
      <option>12</option>
      <option>13</option>
      <option>14</option>
      <option>15</option>
      <option>16</option>
      <option>17</option>
      <option>18</option>
      <option>19</option>
      <option>20</option>
      <option>21</option>
      <option>22</option>
      <option>23</option>
      <option>24</option>
      <option>25</option>
      <option>26</option>
      <option>27</option>
      <option>28</option>
      <option>29</option>
      <option>30</option>
  </select>
  <input name="sugar" type="hidden" id="hiddenSugarInput" value="1" />

`
);


document.querySelectorAll(".product").forEach((product) => {
  const hasPrice = product.querySelector(".price");

  // Tambahkan tombol close (semua produk dapat ini)
  product.querySelector(".product-wrap").insertAdjacentHTML("beforeend", `
    <div class="close-pop" onclick="closePopup()"><i class="fas fa-times"></i></div>
  `);

  // Hanya tambahkan tombol cart jika ada harga
  if (hasPrice) {
    product.querySelector(".product-wrap").insertAdjacentHTML("beforeend", `
      <div onclick="addToCart()" class="add"><span>Add to cart</span><i class="fas fa-cart-plus"></i></div>
    `);
  }
});



Array.from(document.getElementsByClassName("price")).forEach((e) =>
  e.setAttribute(
    "value",
    e.textContent.replace("Rp", "").replace(/\s/g, "").replace(/\./g, "")
  )
);

function getStepValue() {
  const popup = document.querySelector(".popup");
  const category = popup.getAttribute("data-category");
  const subcategory = popup.getAttribute("data-subcategory");

  // Default step
  let step = 1;

  if (category === "Snack") {
    step = 1;
  } else if (category === "Play") {
    if (subcategory === "VIP") {
      step = 2;
    } else if (subcategory === "Reguler") {
      step = 1;
    } else if (subcategory === "Bawa Pulang") {
      step = 12;
    }
  }
  return step;
}

function increaseValue() {
  const input = document.getElementById("product-amount");
  let currentValue = parseInt(input.value);
  const step = getStepValue();
  const newValue = currentValue + step;
  input.value = newValue;
  updatePrice(newValue);
}

function decreaseValue() {
  const input = document.getElementById("product-amount");
  let currentValue = parseInt(input.value);
  const step = getStepValue();
  if (currentValue - step >= step) {
    const newValue = currentValue - step;
    input.value = newValue;
    updatePrice(newValue);
  }
}



function stillValue() {
  const inputElement = document.getElementById("product-amount");
  let currentValue = parseInt(inputElement.value);
  inputElement.value = currentValue;
  updatePrice(currentValue);
}

// Function to update the hidden input based on the selected option
function updateHiddenInput(inputId, value) {
  const hiddenInput = document.getElementById(inputId);
  hiddenInput.value = value;
  console.log(`Hidden input ${inputId} updated to:`, hiddenInput.value);
}

function updatePrice(quantity) {
  const popup = document.querySelector(".popup");
  const category = popup.getAttribute("data-category");
  const subcategory = popup.getAttribute("data-subcategory");
  const priceElement = popup.querySelector(".price");

  let totalPrice = 0;

  if (category === "Play") {
    if (subcategory === "VIP") {
      // VIP: 18.000 per 2 jam
      totalPrice = (quantity / 2) * 18000;
    } else if (subcategory === "Bawa Pulang") {
      // Bawa Pulang: 12 jam = 48.000, 24 jam = 75.000
      let paket24 = Math.floor(quantity / 24);
      let sisaJam = quantity % 24;

      totalPrice = paket24 * 75000;

      if (sisaJam > 0) {
        // Kalau masih ada sisa jam, dianggap ambil paket 12 jam
        totalPrice += 48000;
      }
    } else if (subcategory === "Reguler") {
      // Reguler: 10.000 per jam
      const price = parseInt(priceElement.getAttribute("value"));
      totalPrice = quantity * price;
    }
  } else {
    // Snack atau lainnya (harga normal x amount)
    const price = parseInt(priceElement.getAttribute("value"));
    totalPrice = price * quantity;
  }

  // Tampilkan hasil
  priceElement.textContent = "Rp " + totalPrice.toLocaleString("id-ID");
  priceElement.setAttribute("priceValue", totalPrice);
}


function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.08) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.08) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
