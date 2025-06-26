let currentLang = 'kh';

function switchLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-kh]').forEach(el => {
    el.innerText = el.getAttribute(`data-${lang}`);
  });
}

function downloadPDF() {
  const element = document.getElementById('cv-container');
  html2pdf().from(element).save(`MyCV_${currentLang.toUpperCase()}.pdf`);
}

// Init lang
switchLang(currentLang);

// Hamburger toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

hamburgerBtn.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('show');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});




//Banner

let currentSlide = 0;
const slides = document.querySelectorAll("#carousel-images img");
const totalSlides = slides.length;

function updateSlidePosition() {
  const slideWidth = slides[0].clientWidth;
  document.getElementById("carousel-images").style.transform =
    `translateX(-${currentSlide * slideWidth}px)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlidePosition();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
}

// Auto Slide every 5 seconds
setInterval(() => {
  nextSlide();
}, 5000);

// Resize fix
window.addEventListener("resize", updateSlidePosition);


















  // Load Header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    });

  // Load content (button click inside header)
  function loadContent(page) {
    fetch(page + '.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('main-content').innerHTML = data;
      });
  }


















