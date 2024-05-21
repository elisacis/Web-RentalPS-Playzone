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



// Ambil semua elemen dengan class ".product"
const products = document.querySelectorAll('.product');

// Loop melalui setiap elemen produk
products.forEach(product => {
  // Tambahkan event listener untuk setiap elemen produk
  product.addEventListener('click', () => {
    // Duplikat isi elemen produk yang diklik
    const clonedContent = product.cloneNode(true);
    
    // Dapatkan elemen popup
    const popup = document.querySelector('.popup');
    
    // Bersihkan isi elemen popup sebelumnya (jika ada)
    popup.innerHTML = '';
    
    // Tambahkan kloned konten ke dalam elemen popup
    popup.appendChild(clonedContent);
    
    // Tambahkan class "show" ke elemen popup
    popup.classList.add('show');
  });
});

function closePopup() {
  var popup = document.querySelector('.popup');
  popup.classList.remove('show');
}

// Temukan semua elemen dengan kelas "product-wrap"
var productWraps = document.querySelectorAll('.product-wrap');

// Iterasi melalui setiap elemen "product-wrap"
productWraps.forEach(function(productWrap) {
    // Tambahkan HTML ke elemen "product-wrap" saat ini
    productWrap.innerHTML += `
        <div class="amount">
            <span>Amount</span>
            <input type="number" value="1" min="1"/>
        </div>
        <div class="add"><span>Add to cart</span><i class="fas fa-cart-plus"></i></div>
        <div class="close-pop" onclick="closePopup()"><i class="fas fa-times"></i></div>
    `;
});