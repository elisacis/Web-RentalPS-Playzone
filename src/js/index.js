document.addEventListener("DOMContentLoaded", function () {
  // function setupToggleButton() {
  //   const mobileMenu = document.querySelector("header nav .mobile-menu");
  //   const menu = document.querySelector("header nav .menu");
  //   mobileMenu.addEventListener("click", function () {
  //     menu.classList.toggle("show");
  //   });
  //   // Remove class kalau diklik diluar
  //   document.addEventListener("click", function (event) {
  //     if (!menu.contains(event.target) && !mobileMenu.contains(event.target)) {
  //       menu.classList.remove("show");
  //     }
  //   });
  // }
});

window.addEventListener("DOMContentLoaded", function () {
  function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log(cartItems);
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }
  }

  updateCartCount();
});

// Hero button smooth scroll to #recent
window.addEventListener("DOMContentLoaded", (event) => {
  document
    .querySelector("#hero .text .button")
    .addEventListener("click", function () {
      var targetElement = document.querySelector("#best");
      var targetOffset = targetElement.offsetTop - 60;
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    });
});

// Testimonial Slider

var testimonials = document.querySelectorAll(".testimonial");
var navigationContainer = document.querySelector(".navigation");
var currentIndex = 0;
function showTestimonial(index) {
  var navigationButtons = navigationContainer.querySelectorAll("button");
  navigationButtons.forEach(function (button) {
    button.classList.remove("active");
  });
  navigationButtons[index].classList.add("active");
  var testimonialContainer = document.querySelector(".slider-container");
  testimonialContainer.style.transform = "translateX(-" + index * 100 + "%)";
}
function nextTestimonial() {
  currentIndex++;
  if (currentIndex >= testimonials.length) {
    currentIndex = 0;
  }
  showTestimonial(currentIndex);
}
var autoplayInterval = setInterval(nextTestimonial, 3000);
testimonials.forEach(function (testimonial, index) {
  var button = document.createElement("button");
  button.addEventListener("click", function () {
    clearInterval(autoplayInterval);
    currentIndex = index;
    showTestimonial(index);
  });
  navigationContainer.appendChild(button);
});
showTestimonial(currentIndex);

fetch("./menu.html", { mode: "no-cors" })
  .then((response) => response.text())
  .then((data) => {
    const menuWrapElement = new DOMParser()
      .parseFromString(data, "text/html")
      .querySelector(".menu-wrap");
    const bestProductElements = Array.from(
      menuWrapElement.querySelectorAll(".product.best")
    );
    const indexContainer = document.getElementById("index-container");
    bestProductElements.forEach((product) => {
      indexContainer.appendChild(product);
    });
  });

setTimeout(() => {
  const scriptElement = document.createElement("script");
  scriptElement.src = "./src/js/menu.js";
  document.body.appendChild(scriptElement);
}, 5000);

// Modals function

const cartButton = document.querySelector(".cart-button");

// Add a click event listener to the cart button
cartButton.addEventListener("click", displayCartModal);

// Get references to the modal and close button
const modal = document.getElementById("cartModal");
const closeButton = document.querySelector(".close");

// Add click event listener to close button
closeButton.addEventListener("click", closeModal);

function displayCartModal() {
  const totalPriceElement = document.getElementById("total-price");

  const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cartItemsContainer");

  var totalPriceAllItems = 0;

  // Clear previous content
  cartItemsContainer.innerHTML = "";

  // Loop through cart items data and display them
  cartItemsData.forEach((item, index) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    // Create container for item details
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("item-details");

    // Create container for item image
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("item-image");
    const itemImage = document.createElement("img");
    itemImage.src = item.image; // Assuming you have imageUrl property in your cartItemsData
    imageContainer.appendChild(itemImage);

    const itemText = document.createElement("div");
    itemText.classList.add("item");

    // Create item name element
    const itemName = document.createElement("h5");
    itemName.textContent = item.name;

    const itemDescription = document.createElement("div");
    itemDescription.classList.add("item-description");

    const itemSize = document.createElement("p");
    itemSize.textContent = "Size : " + item.size;
    const itemType = document.createElement("p");
    itemType.textContent = "Ice : " + item.type;
    const itemSugar = document.createElement("p");
    itemSugar.textContent = "Sugar : " + item.sugar;

    itemDescription.appendChild(itemSize);
    itemDescription.appendChild(itemType);
    itemDescription.appendChild(itemSugar);

    // Create item price element
    const itemPrice = document.createElement("p");
    itemPrice.textContent = item.price;
    itemPrice.classList.add(`item-price-${index}`);
    itemPrice.setAttribute("value", item.originalPrice); // Store the base price for calculations

    itemText.appendChild(itemName);
    itemText.appendChild(itemDescription);
    itemText.appendChild(itemPrice);

    // Append name and price to details container
    detailsContainer.appendChild(imageContainer);
    detailsContainer.appendChild(itemText);

    // Create container for buttons (delete, increase, decrease)
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create delete button
    const deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-container");
    deleteContainer.onclick = () => {
      deleteCartItem(index);
    };

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fas", "fa-trash");

    deleteContainer.appendChild(deleteButton);

    const quantity = document.createElement("div");
    quantity.classList.add("item-quantity");

    // Create elements for minus button
    const minusButton = document.createElement("div");
    minusButton.classList.add("minus");
    minusButton.dataset.itemName = item.name;
    minusButton.onclick = () => {
      decreaseValue();
    }; // Assuming decreaseValue is defined elsewhere
    minusButton.innerHTML = '<i class="fas fa-minus"></i>';

    // Create element for input field
    const inputField = document.createElement("div");
    inputField.classList.add("value");
    const inputElement = document.createElement("input");
    inputElement.id = `product-amount-${index}`;
    inputElement.value = item.quantity || 1; // Assuming you have a quantity property
    inputField.appendChild(inputElement);

    // Create elements for plus button
    const plusButton = document.createElement("div");
    plusButton.classList.add("plus");
    plusButton.dataset.itemName = item.name;
    plusButton.onclick = () => {
      increaseValue();
    }; // Assuming increaseValue is defined elsewhere
    plusButton.innerHTML = '<i class="fas fa-plus"></i>';

    function decreaseValue() {
      const inputElement = document.getElementById(`product-amount-${index}`);
      let currentValue = parseInt(inputElement.value);
      if (currentValue > 1) {
        currentValue--;
        inputElement.value = currentValue;
        item.quantity = currentValue; // Update the quantity in the data
        updatePrice(currentValue);
      }
    }

    function increaseValue() {
      const inputElement = document.getElementById(`product-amount-${index}`);
      let currentValue = parseInt(inputElement.value);
      currentValue++;
      inputElement.value = currentValue;
      item.quantity = currentValue; // Update the quantity in the data
      updatePrice(currentValue);
    }

    function updatePrice(quantity) {
      const priceElement = document.querySelector(`.item-price-${index}`);
      const price = parseInt(priceElement.getAttribute("value"));
      const totalPrice = price * quantity;
      priceElement.textContent = "Rp " + totalPrice.toLocaleString("id-ID");
      updateTotalPrice();
    }

    function updateTotalPrice() {
      totalPriceAllItems = cartItemsData.reduce((total, item) => {
        return total + item.originalPrice * item.quantity;
      }, 0);
      totalPriceElement.textContent =
        "Rp " + totalPriceAllItems.toLocaleString("id-ID");
    }

    // Append the elements to the quantity container
    quantity.appendChild(minusButton);
    quantity.appendChild(inputField);
    quantity.appendChild(plusButton);

    // Append buttons to button container
    buttonContainer.appendChild(quantity);
    buttonContainer.appendChild(deleteContainer);

    // Append image, details and buttons to item container
    itemContainer.appendChild(detailsContainer);
    itemContainer.appendChild(buttonContainer);

    // Append item container to cart items container
    cartItemsContainer.appendChild(itemContainer);

    totalPriceAllItems +=
      parseInt(item.originalPrice) * parseInt(item.quantity);
  });

  totalPriceElement.setAttribute("value", totalPriceAllItems);
  totalPriceElement.textContent =
    "Rp " + totalPriceAllItems.toLocaleString("id-ID");
  // Open the modal
  openModal();
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}
// Function to open the modal
function openModal() {
  modal.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  const dropbtn = document.getElementById("dropbtn");
  const dropdownContent = document.getElementById("dropdown-content");

  dropbtn.addEventListener("click", function () {
    dropdownContent.style.display = "block";
  });

  dropdownContent.addEventListener("click", function (event) {
    dropbtn.textContent = event.target.getAttribute("data-value");
    dropdownContent.style.display = "none";
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener("click", function (event) {
    if (!event.target.matches("#dropbtn")) {
      if (dropdownContent.style.display == "block") {
        dropdownContent.style.display = "none";
      }
    }
  });
});
