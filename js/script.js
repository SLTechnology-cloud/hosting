const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const flipSound = document.getElementById('flipSound');
	
  const pageFlip = new St.PageFlip(document.getElementById("book"), {
    width: 500,
    height: 600,
    showCover: true,
    drawShadow: true,
    flippingTime: 800,
    autoSize: true
  });

  pageFlip.loadFromHTML(document.querySelectorAll(".page, .page-cover-top, .page-cover-bottom"));
  
  prevBtn.style.display = 'none';  
  
  const originalFlipNext = pageFlip.flipNext.bind(pageFlip);
  const originalFlipPrev = pageFlip.flipPrev.bind(pageFlip);
 
  pageFlip.flipNext = () => {
		flipSound.currentTime = 0;
		flipSound.play().catch(() => {});
		originalFlipNext();	
  };

  pageFlip.flipPrev = () => {
    flipSound.currentTime = 0;
    flipSound.play().catch(() => {});
    originalFlipPrev();
  };

  document.addEventListener('keydown', function(event) {
    const keyName = event.key; 
    const current = pageFlip.getCurrentPageIndex();
	  const lastInternalPage = pageFlip.getPageCount() - 2;	

    if(keyName == "ArrowRight" && current < lastInternalPage){
      flipSound.currentTime = 0;
      flipSound.play().catch(() => {});
      originalFlipNext();
    }

    if(keyName == "ArrowLeft" && current != 0){
      flipSound.currentTime = 0;
      flipSound.play().catch(() => {});
      originalFlipPrev();      
    }
  });
  
  pageFlip.on('flip', (e) => {
	  const current = pageFlip.getCurrentPageIndex();
	  const lastInternalPage = pageFlip.getPageCount() - 2;	
	
	  nextBtn.style.display = current > lastInternalPage ? 'none' : 'block';	
	  prevBtn.style.display = current === 0 ? 'none' : 'block';	
	
	/*flipSound.currentTime = 0;
    flipSound.play().catch(() => {});
    originalFlipPrev();*/
  });
