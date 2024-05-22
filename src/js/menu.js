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

var body = document.querySelector('body');

document.querySelector('.tab').innerHTML = `<p class="all">All Menu</p>${[...new Set([...document.querySelectorAll('.category')].map(c=>`<p class="${c.textContent.toLowerCase().replace(' ','')}">${c.textContent}</p>`))].join('')}`;

const products = document.querySelectorAll('.product');

for (var i = 0; i < products.length; i++) {
  var product = products[i];
  var category = product.getElementsByClassName('category')[0];
  var categoryText = category.innerText.toLowerCase().replace(' ', '');
  product.classList.add(categoryText);
}

var tabs = document.querySelectorAll('.tab > p');

tabs.forEach(function(tab) {
  tab.addEventListener('click', function() {
    if (!this.classList.contains('active')) {
      var tabClass = this.className;
      tabs.forEach(function(tab) {
        tab.classList.remove('active');
      });
      this.classList.add('active');
      Array.from(products).forEach(function(product) {
        var productClass = product.classList;
        var shouldDisplay = tabClass === 'all' || productClass.contains(tabClass);

        product.style.display = shouldDisplay ? 'block' : 'none';
      });
    }
  });
});

// Mengatur tab "All Menu" sebagai tab default yang aktif
tabs[0].classList.add('active');

products.forEach(product => {
  product.addEventListener('click', () => {
    const clonedContent = product.cloneNode(true);
    const popup = document.querySelector('.popup');
    const ov = document.querySelector('.overlay');
    popup.innerHTML = '';
    popup.appendChild(clonedContent);
    popup.classList.add('show');
    ov.classList.add('show');
    body.classList.add('ov');
    fadeIn(document.querySelector('.overlay'));
  });
});

function closePopup() {
  document.querySelector('.popup').classList.remove('show');
  document.querySelector('.overlay').classList.remove('show');
  fadeOut(document.querySelector('.overlay'));
  body.classList.remove('ov');
}

function appendHTML(selector, html) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function(element) {
      element.innerHTML += html;
  });
}

function beforeHTML(selector, html) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function(element) {
    element.insertAdjacentHTML('beforebegin', html);
  });
}

beforeHTML('.price', `
  <div class="amount">
      <span>Amount</span>
      <div class="number">
        <div class="minus" onclick="decreaseValue()"><i class="fas fa-minus"></i></div>
        <div class="value"><input id="product-amount" value="1"/></div>
        <div class="plus" onclick="increaseValue()"><i class="fas fa-plus"></i></div>
      </div>
  </div>
`);

appendHTML('.product-wrap', `
  <div class="add"><span>Add to cart</span><i class="fas fa-cart-plus"></i></div>
  <div class="close-pop" onclick="closePopup()"><i class="fas fa-times"></i></div>
`);

appendHTML('.product-wrap .size', `
  <span>Size</span>
  <select class="fixed" onchange="stillValue()">
      <option selected=''>Regular</option>
      <option>Medium</option>
      <option>Large</option>
  </select>
`);

appendHTML('.product-wrap .type', `
  <span>Ice</span>
  <select>
      <option>Less</option>
      <option selected=''>Normal</option>
      <option>Extra</option>
  </select>
`);

appendHTML('.product-wrap .sugar', `
  <span>Sugar</span>
  <select>
      <option>Less</option>
      <option selected=''>Normal</option>
      <option>Extra</option>
  </select>
`);

Array.from(document.getElementsByClassName('price')).forEach(e => e.setAttribute('value', e.textContent.replace('Rp', '').replace(/\s/g, '').replace(/\./g, '')));

function decreaseValue() {
  const inputElement = document.getElementById('product-amount');
  let currentValue = parseInt(inputElement.value);
  if (currentValue > 1) {
    currentValue--;
    inputElement.value = currentValue;
    updatePrice(currentValue);
  };
}

function increaseValue() {
  const inputElement = document.getElementById('product-amount');
  let currentValue = parseInt(inputElement.value);
  currentValue++;
  inputElement.value = currentValue;
  updatePrice(currentValue);
};

function stillValue() {
  const inputElement = document.getElementById('product-amount');
  let currentValue = parseInt(inputElement.value);
  inputElement.value = currentValue;
  updatePrice(currentValue);
};

function updatePrice(quantity) {
  const priceElement = document.querySelector('.price');
  const price = parseInt(priceElement.getAttribute('value'));
  const sizeSelect = document.querySelector('.popup .size select');
  const calculateTotalPrice = () => {
    let multiplier = 1;
    if (sizeSelect && sizeSelect.value === 'Medium') {
      multiplier = 1.25;
    } else if (sizeSelect && sizeSelect.value === 'Large') {
      multiplier = 1.5;
    }
    const totalPrice = price * quantity * multiplier;
    priceElement.textContent = 'Rp ' + totalPrice.toLocaleString('id-ID');
  };
  if (sizeSelect) {
    sizeSelect.addEventListener('change', calculateTotalPrice);
  }
  calculateTotalPrice();
}

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
      if ((el.style.opacity -= .08) < 0) {
          el.style.display = "none";
      } else {
          requestAnimationFrame(fade);
      }
  })();
};

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .08) > 1)) {
          el.style.opacity = val;
          requestAnimationFrame(fade);
      }
  })();
};