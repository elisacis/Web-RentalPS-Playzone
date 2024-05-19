document.addEventListener("DOMContentLoaded", function () {
  // Function to load navbar HTML
  function loadNavbar() {
    fetch("src/components/navbar/navbar.html")
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
      if (document.body.scrollTop >= 200) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
  }

  // Load the navbar when the DOM is ready
  loadNavbar();
});

// Hero button smooth scroll to #recent
window.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector("#hero .text .button").addEventListener("click", function() {
      var targetElement = document.querySelector("#recent");
      var targetOffset = targetElement.offsetTop - 60;
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth"
      });
  });
});

// Testimonial Slider

var testimonials = document.querySelectorAll('.testimonial');
var navigationContainer = document.querySelector('.navigation');
var currentIndex = 0;
function showTestimonial(index) {
  var navigationButtons = navigationContainer.querySelectorAll('button');
  navigationButtons.forEach(function(button) {
    button.classList.remove('active');
  });
  navigationButtons[index].classList.add('active');
  var testimonialContainer = document.querySelector('.slider-container');
  testimonialContainer.style.transform = 'translateX(-' + (index * 100) + '%)';
}
function nextTestimonial() {
  currentIndex++;
  if (currentIndex >= testimonials.length) {
    currentIndex = 0;
  }
  showTestimonial(currentIndex);
}
var autoplayInterval = setInterval(nextTestimonial, 3000);
testimonials.forEach(function(testimonial, index) {
  var button = document.createElement('button');
  button.addEventListener('click', function() {
    clearInterval(autoplayInterval);
    currentIndex = index;
    showTestimonial(index);
  });
  navigationContainer.appendChild(button);
});
showTestimonial(currentIndex);