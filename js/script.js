const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const flipSound = document.getElementById('flipSound');

// --- 📏 Función para obtener tamaño responsivo ---
function getBookSize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isPortrait = h > w;

  let width, height, isPC = false;

  if (isPortrait) {
    if (w <= 320) { width = 300; height = 450; }       // iPhone SE
    else if (w <= 375) { width = 350; height = 550; }  // iPhone 8
    else if (w <= 414) { width = 320; height = 480; }  // iPhone 11/XR
    else if (w <= 768) { width = 350; height = 550; }  // Tablets pequeñas
    else if (w <= 1024) { width = 500; height = 650; } // iPad vertical
    else { width = 500; height = 600; isPC = true;}                // PC pequeño
  } else {
    if (w <= 568) { width = 400; height = 50; }       // Teléfonos horizontales
    else if (w <= 768) { width = 500; height = 100; }  // Tablets horizontales
    else if (w <= 1024) { width = 600; height = 400; } // iPad horizontal
    else { width = 500; height = 600; isPC = true;}                // PC / Laptop
  }

  return { width, height , isPC};
}

// --- 🔄 Inicializar PageFlip responsivo ---
let pageFlip;

function initPageFlip() {
  const size = getBookSize();

  pageFlip = new St.PageFlip(document.getElementById("book"), {
    width: size.width,
    height: size.height,
    showCover: size.isPC,
    drawShadow: true,
    flippingTime: 800,
    autoSize: true
  });

  pageFlip.loadFromHTML(document.querySelectorAll(".page, .page-cover-top, .page-cover-bottom"));

  prevBtn.style.display = 'none';

  // // Reemplazar los métodos para incluir sonido
  // const originalFlipNext = pageFlip.flipNext.bind(pageFlip);
  // const originalFlipPrev = pageFlip.flipPrev.bind(pageFlip);

  function playSound() {
    flipSound.currentTime = 0;
    flipSound.play().catch(() => {});
  }

  document.getElementById("nextBtn").addEventListener("click", () => {
    playSound();
    pageFlip.flipNext();
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    playSound();
    pageFlip.flipPrev();
  });

  // Navegación con teclado
  document.addEventListener('keydown', function(event) {
    const size = getBookSize();

    let keyName = event.key; 
    let current = pageFlip.getCurrentPageIndex();
    let lastInternalPage = pageFlip.getPageCount();

    if(size.isPC){
      lastInternalPage = lastInternalPage - 2;
    }


    if (keyName === "ArrowRight" && current < lastInternalPage) {      
      playSound();	
      pageFlip.flipNext();
    }
    if (keyName === "ArrowLeft" && current !== 0) {
      playSound();	
      pageFlip.flipPrev();
    }
    
  });

  pageFlip.on("flip", () => {
    let current = pageFlip.getCurrentPageIndex();
    let lastInternalPage = pageFlip.getPageCount() - 2;	
    nextBtn.style.display = current > lastInternalPage ? 'none' : 'block';	
    prevBtn.style.display = current === 0 ? 'none' : 'block';	
  });
}

// --- ⚡ Inicialización y ajuste automático ---
window.addEventListener('load', initPageFlip);
window.addEventListener('resize', () => {
  clearTimeout(window._resizeTimeout);
  window._resizeTimeout = setTimeout(initPageFlip, 300); // Evita reinicios excesivos
});
window.addEventListener('orientationchange', initPageFlip);
