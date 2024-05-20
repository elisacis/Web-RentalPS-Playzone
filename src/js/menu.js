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