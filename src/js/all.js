document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".mobile-nav").addEventListener("click", () => {
    document.querySelector("header nav").classList.toggle("show");
  });
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

    // Tampilkan Size kalau ada
    if (item.size && item.size !== "null" && item.size !== "undefined" && item.size !== "Tidak ada size") {
      const itemSize = document.createElement("p");
      itemSize.textContent = "Size : " + item.size;
      itemDescription.appendChild(itemSize);
    }

    // Tampilkan Type kalau ada
    if (item.type && item.type !== "null" && item.type !== "undefined" && item.type !== "Tidak ada tipe") {
      const itemType = document.createElement("p");
      itemType.textContent = "Versi : " + item.type;
      itemDescription.appendChild(itemType);
    }

    // Tampilkan Sugar (Tempat Duduk) kalau ada
    if (item.sugar && item.sugar !== "null" && item.sugar !== "undefined" && item.sugar !== "Tidak ada tempat duduk") {
      const itemSugar = document.createElement("p");
      itemSugar.textContent = "Nomor Tempat Duduk : " + item.sugar;
      itemDescription.appendChild(itemSugar);
    }


    // Create item price element
    const itemPrice = document.createElement("p");
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
    
      let step = 1;
      if (item.category === "Play") {
        if (item.subcategory === "VIP") {
          step = 2;
        } else if (item.subcategory === "Bawa Pulang") {
          step = 12;
        } else if (item.subcategory === "Reguler") {
          step = 1;
        }
      }
    
      if (currentValue > step) {
        currentValue -= step;
        inputElement.value = currentValue;
        item.quantity = currentValue; // Update quantity
        updatePrice(currentValue);
      }
    }
    
    function increaseValue() {
      const inputElement = document.getElementById(`product-amount-${index}`);
      let currentValue = parseInt(inputElement.value);
    
      let step = 1;
      if (item.category === "Play") {
        if (item.subcategory === "VIP") {
          step = 2;
        } else if (item.subcategory === "Bawa Pulang") {
          step = 12;
        } else if (item.subcategory === "Reguler") {
          step = 1;
        }
      }
    

      currentValue += step;
      inputElement.value = currentValue;
      item.quantity = currentValue; // Update quantity
      updatePrice(currentValue);
    }
    

    function updatePrice(quantity) {
      const priceElement = document.querySelector(`.item-price-${index}`);
      const price = parseInt(priceElement.getAttribute("value"));

      let totalPrice = 0;

      if (item.category === "Play") {
        if (item.subcategory === "VIP") {
          // VIP: 18.000 per 2 jam
          totalPrice = (quantity / 2) * 18000;
        } else if (item.subcategory === "Bawa Pulang") {
          // Bawa Pulang: 12 jam = 48.000, 24 jam = 75.000
          let paket24 = Math.floor(quantity / 24);
          let sisaJam = quantity % 24;

          totalPrice = paket24 * 75000;

          if (sisaJam > 0) {
            // Kalau ada sisa, dianggap ambil paket 12 jam
            totalPrice += 48000;
          }
        } else if (item.subcategory === "Reguler") {
          // Reguler: harga normal x jam
          totalPrice = quantity * price;
        }
      } else {
        // Snack, Game, dll
        totalPrice = price * quantity;
      }

      // Tampilkan harga
      priceElement.textContent = "Rp " + totalPrice.toLocaleString("id-ID");
      
      // Update data di localStorage
      cartItemsData[index].quantity = quantity;
      cartItemsData[index].price = "Rp " + totalPrice.toLocaleString("id-ID");
      localStorage.setItem("cartItems", JSON.stringify(cartItemsData));

      updateTotalPrice();
    }


    function updateTotalPrice() {
      totalPriceAllItems = cartItemsData.reduce((total, item) => {
        // Ambil angka dari string harga
        let priceNumber = parseInt(item.price.replace(/[^\d]/g, ""));
        return total + priceNumber;
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

    // update new price
    updatePrice(item.quantity);

  });

  totalPriceElement.setAttribute("value", totalPriceAllItems);
  totalPriceElement.textContent =
    "Rp " + totalPriceAllItems.toLocaleString("id-ID");
  // Open the modal
  openModal();
}

function deleteCartItem(index) {
  // Retrieve the cart items from localStorage
  const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Remove the item at the specified index
  cartItemsData.splice(index, 1);

  // Update the cart items in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItemsData));

  // Re-render the cart items
  displayCartModal();
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
