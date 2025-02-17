document.addEventListener('DOMContentLoaded', function() {
    /* --- Özel Fare İmleci Takibi (Mantar Emojisi) --- */
    const customCursor = document.getElementById('customCursor');
    document.addEventListener('mousemove', function(e) {
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    });
    document.addEventListener('mousedown', function() {
      customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    document.addEventListener('mouseup', function() {
      customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    /* --- Smooth Scroll & Bölüm Geçişleri --- */
    document.getElementById('startBtn').addEventListener('click', function() {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.querySelectorAll('.scroll-down').forEach(function(arrow) {
      arrow.addEventListener('click', function() {
        const targetId = arrow.getAttribute('data-target');
        if (targetId) {
          document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    /* --- Portfolyo Slider --- */
    function rotateSlides(slider) {
      const slides = slider.querySelectorAll('.slide');
      let currentIndex = 0;
      setInterval(() => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
      }, 3000);
    }
    document.querySelectorAll('.bg-slider').forEach(function(slider) {
      rotateSlides(slider);
    });
    
    /* --- İletişim Formu --- */
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert("Mesajınız gönderildi! En kısa sürede dönüş yapacağız.");
      contactForm.reset();
    });
    
    /* --- Font Size Slider --- */
    const textSizeSlider = document.getElementById('textSizeSlider');
    textSizeSlider.addEventListener('input', function() {
      document.body.style.fontSize = textSizeSlider.value + 'px';
    });
    
    /* --- Font Weight Slider --- */
    const fontWeightSlider = document.getElementById('fontWeightSlider');
    fontWeightSlider.addEventListener('input', function() {
      document.body.style.fontWeight = fontWeightSlider.value;
    });
    
    /* --- Zoom Kontrolü: Draggable Yeşil Top --- */
    const zoomBall = document.getElementById('zoomBall');
    const contentWrapper = document.getElementById('contentWrapper');
    let isDragging = false;
    
    zoomBall.addEventListener('mousedown', function(e) {
      isDragging = true;
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      const windowWidth = window.innerWidth;
      let x = e.clientX;
      x = Math.max(0, Math.min(x, windowWidth));
      
      const zoomControl = document.getElementById('zoomControl');
      zoomControl.style.left = x + 'px';
      
      const ratio = x / windowWidth;
      const scale = 1 + (Math.abs(ratio - 0.5) / 0.5) * 0.5;
      contentWrapper.style.transformOrigin = (ratio * 100) + '% 50%';
      contentWrapper.style.transform = 'scale(' + scale + ')';
    });
    
    document.addEventListener('mouseup', function() {
      isDragging = false;
    });
    
    /* --- Dinamik Renk Teması (Yumuşak Geçiş, yalnızca her 500px kaydırmada) --- */
    const scrollThreshold = 500;
    let targetHue = 0;
    let currentHue = 0;
    
    window.addEventListener('scroll', function() {
      // Hedef hue: her 500px kaydırmada 20 derece artıyor
      let newHue = (Math.floor(window.scrollY / scrollThreshold) * 20) % 360;
      targetHue = newHue;
    });
    
    function animateHue() {
      // Yavaşça geçiş (lerp)
      currentHue += (targetHue - currentHue) * 0.05;
      // Daha yumuşak tonlar için doygunluk ve parlaklık oranlarını ayarlıyoruz
      const newColor = `hsl(${currentHue}, 60%, 60%)`;
      const newBubbleColor = `hsla(${currentHue}, 60%, 60%, 0.5)`;
      document.documentElement.style.setProperty('--primary-color', newColor);
      document.documentElement.style.setProperty('--bubble-color', newBubbleColor);
      requestAnimationFrame(animateHue);
    }
    animateHue();
    
    /* --- Yatay Scroll / Ok Tuşları ile Dinamik Metin Rengi --- */
    let lastScrollX = window.scrollX;
    window.addEventListener('scroll', function() {
      if (window.scrollX !== lastScrollX) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.color = randomColor;
        lastScrollX = window.scrollX;
      }
    });
    
    window.addEventListener('keydown', function(e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        document.body.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      }
    });
    
    /* --- Arka Plan Baloncuk Animasyonu --- */
    function createBubble() {
      const bubble = document.createElement('span');
      bubble.classList.add('bubble');
      const size = Math.random() * 40 + 10;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 100 + '%';
      const duration = Math.random() * 4 + 4;
      bubble.style.animationDuration = duration + 's';
      document.getElementById('bubbles').appendChild(bubble);
      setTimeout(() => {
        bubble.remove();
      }, duration * 1000);
    }
    setInterval(createBubble, 500);
  });
  