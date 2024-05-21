// Mengambil elemen-elemen yang diperlukan
const tabItems = document.querySelectorAll('.tab p');
const productItems = document.querySelectorAll('.product');

// Tambahkan event listener untuk setiap tab item
tabItems.forEach((tabItem) => {
  tabItem.addEventListener('click', (event) => {
    event.preventDefault(); // Mencegah perilaku default

    // Hilangkan class 'active' dari semua tab items
    tabItems.forEach((item) => {
      item.classList.remove('active');
    });

    // Tambahkan class 'active' pada tab item yang diklik
    tabItem.classList.add('active');

    // Dapatkan kategori yang sesuai dengan tab item yang diklik
    const category = tabItem.textContent.toLowerCase();

    // Tampilkan atau sembunyikan produk berdasarkan kategori
    productItems.forEach((productItem) => {
      if (category === 'all') {
        // Jika kategori adalah 'all', tampilkan semua produk
        productItem.style.display = 'block';
      } else {
        // Jika kategori bukan 'all', sembunyikan produk yang tidak sesuai dengan kategori
        const productCategory = productItem.querySelector('.category').textContent.toLowerCase();
        if (productCategory === category) {
          productItem.style.display = 'block';
        } else {
          productItem.style.display = 'none';
        }
      }
    });
  });
});

const products = document.querySelectorAll('.product');

products.forEach(product => {
  product.addEventListener('click', () => {
    const clonedContent = product.cloneNode(true);
    
    const popup = document.querySelector('.popup');
    const ov = document.querySelector('.overlay');
    
    popup.innerHTML = '';
    
    popup.appendChild(clonedContent);
    
    popup.classList.add('show');
    ov.classList.add('show');

    fadeIn(document.querySelector('.overlay'));
  });
});

function closePopup() {
  document.querySelector('.popup').classList.remove('show');
  document.querySelector('.overlay').classList.remove('show');
  fadeOut(document.querySelector('.overlay'));
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
  <select onchange="stillValue()">
      <option disabled='' selected=''>Select size</option>
      <option>Regular</option>
      <option>Medium</option>
      <option>Large</option>
  </select>
`);

appendHTML('.product-wrap .type', `
  <span>Ice</span>
  <select>
      <option disabled='' selected=''>Select ice</option>
      <option>Less</option>
      <option>Normal</option>
      <option>Extra</option>
  </select>
`);

appendHTML('.product-wrap .sugar', `
  <span>Sugar</span>
  <select>
      <option disabled='' selected=''>Select sugar</option>
      <option>Less</option>
      <option>Normal</option>
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
    if (sizeSelect.value === 'Medium') {
      multiplier = 1.1;
    } else if (sizeSelect.value === 'Large') {
      multiplier = 1.2;
    }
    const totalPrice = price * quantity * multiplier;
    priceElement.textContent = 'Rp ' + totalPrice.toLocaleString('id-ID');
  };

  sizeSelect.addEventListener('change', calculateTotalPrice);
  calculateTotalPrice();
};

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
      if ((el.style.opacity -= .07) < 0) {
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
      if (!((val += .07) > 1)) {
          el.style.opacity = val;
          requestAnimationFrame(fade);
      }
  })();
};