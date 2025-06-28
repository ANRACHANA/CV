// Sidebar toggle
const hamburger = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

// Language dropdown toggle
document.querySelector('.lang-dropdown').addEventListener('click', function(e) {
  e.stopPropagation();
  const options = document.getElementById('langOptions');
  options.style.display = options.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('click', function(e){
  const dropdown = document.getElementById('langOptions');
  const selected = document.getElementById('langSelected');
  if (!dropdown.contains(e.target) && !selected.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

function setLang(lang) {
  document.querySelectorAll("[data-kh], [data-en]").forEach(el => {
    el.textContent = el.getAttribute('data-en') || el.textContent;
  });

  setTimeout(() => {
    document.querySelectorAll("[data-kh], [data-en]").forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`) || el.textContent;
    });
  }, 100);

  const langSelected = document.getElementById('langSelected');
  if (lang === 'kh') {
    langSelected.innerHTML = `<img src="https://flagcdn.com/w40/kh.png" class="flag-icon" alt="KH"> ភាសាខ្មែរ`;
  } else if (lang === 'en') {
    langSelected.innerHTML = `<img src="https://flagcdn.com/w40/us.png" class="flag-icon" alt="US"> English`;
  }

  document.getElementById('langOptions').style.display = 'none';
}

function switchLang(lang) {
  setLang(lang);
}

// PDF handling
function handlePDFSwitch() {
  const val = document.getElementById('pdfSelector').value;
  if (!val) return;

  if(val === 'download') {
    downloadPDF();
  } else if(val === 'preview') {
    showPDFPreview();
  } else if(val === 'print') {
    printCV();
  }

  setTimeout(() => {
    document.getElementById('pdfSelector').value = "";
  }, 100);
}

function addPageNumbers(doc) {
  const totalPages = doc.internal.getNumberOfPages();
  doc.setFontSize(10);
  doc.setTextColor(150);

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageNumberText = `Page ${i} / ${totalPages}`;
    doc.text(pageNumberText, pageWidth / 2, pageHeight - 15, { align: 'center' });
  }
}

function downloadPDF() {
  const element = document.getElementById("cv-container");
  const opt = {
    margin: 0.5,
    filename: 'An_Rachana_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
    addPageNumbers(pdf);
  }).save();
}

function showPDFPreview() {
  const element = document.getElementById("cv-container");
  const opt = {
    margin: 0.5,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
    addPageNumbers(pdf);
  }).outputPdf('blob').then(function (pdfBlob) {
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, 'RACHANA');
  });
}

function printCV() {
  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Print CV</title></head><body>');
  printWindow.document.write(document.getElementById('cv-container').outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

// Auto-load English by default
window.addEventListener('DOMContentLoaded', () => {
  setLang('en');
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
















