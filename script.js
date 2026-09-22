document.addEventListener('DOMContentLoaded', () => {
  const bgAudio = document.getElementById('bg-audio');
  const audioToggle = document.getElementById('audio-toggle');
  const audioIcon = document.getElementById('audio-icon');
  const splashScreen = document.getElementById('splash-screen');
  const mainContent = document.getElementById('main-content');
  
  let isPlaying = false;

  // Function to toggle Audio
  function toggleAudio() {
    if (isPlaying) {
      bgAudio.pause();
      audioIcon.className = 'fa-solid fa-volume-xmark';
      isPlaying = false;
    } else {
      bgAudio.play().then(() => {
        audioIcon.className = 'fa-solid fa-volume-high';
        isPlaying = true;
      }).catch(err => {
        console.log("Audio play blocked by browser:", err);
      });
    }
  }

  // Audio button click listener
  audioToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAudio();
  });

  // Tap anywhere on splash screen to enter
  splashScreen.addEventListener('click', () => {
    splashScreen.classList.add('fade-out');
    mainContent.classList.remove('hidden');
    
    // Play audio on initial tap
    if (!isPlaying) {
      toggleAudio();
    }
    
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 600);
  });

  // ----------------------------------------------------
  // ROTATING STATUS QUOTE (Tiap 5 Detik)
  // ----------------------------------------------------
  const rotatingQuotes = [
    "Thanatos Prin Atimian Dexamai",
    "Kleo's Aphthiton Eis Aei Menei",
    "Mēden Phobou, Mēden Hypochōrei"
  ];

  let quoteIndex = 0;
  const quoteEl = document.getElementById('rotating-quote');

  // Set teks awal agar sesuai dengan pilihan pertama
  if (quoteEl) {
    quoteEl.textContent = rotatingQuotes[0];
  }

  setInterval(() => {
    if (quoteEl) {
      quoteEl.style.opacity = '0';
      setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % rotatingQuotes.length;
        quoteEl.textContent = rotatingQuotes[quoteIndex];
        quoteEl.style.opacity = '1';
      }, 500);
    }
  }, 5000); // 5000 ms = 5 detik

  // ----------------------------------------------------
  // DYNAMIC STATS COUNTER (Dapat Naik / Turun Secara Acak)
  // ----------------------------------------------------
  let currentStats = {
    views: 1300000,      // 1.3M
    followers: 17200,    // 17.2K
    likes: 710200,       // 710.2K
    cart: 295,           // 295
    analytics: 1150      // 1.15K
  };

  const viewsEl = document.getElementById('stat-views');
  const followersEl = document.getElementById('stat-followers');
  const likesEl = document.getElementById('stat-likes');
  const cartEl = document.getElementById('stat-cart');
  const analyticsEl = document.getElementById('stat-analytics');

  // Format Angka ke Format Ringkas
  function formatNumber(num, isCart = false) {
    if (isCart) {
      return `${Math.round(num)} +`;
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return Math.round(num).toString();
  }

  // Fungsi untuk mengacak angka naik/turun
  function updateStatsDynamic() {
    const randomChange = (base, maxChangePercent) => {
      const isUp = Math.random() > 0.35;
      const factor = (Math.random() * maxChangePercent) / 100;
      const change = base * factor;
      return isUp ? base + change : base - change;
    };

    currentStats.views = randomChange(currentStats.views, 1.5);
    currentStats.followers = randomChange(currentStats.followers, 0.8);
    currentStats.likes = randomChange(currentStats.likes, 2.0);
    currentStats.cart = Math.max(100, Math.round(randomChange(currentStats.cart, 5.0)));
    currentStats.analytics = randomChange(currentStats.analytics, 3.0);

    const statElements = [
      { el: viewsEl, val: formatNumber(currentStats.views) },
      { el: followersEl, val: formatNumber(currentStats.followers) },
      { el: likesEl, val: formatNumber(currentStats.likes) },
      { el: cartEl, val: formatNumber(currentStats.cart, true) },
      { el: analyticsEl, val: formatNumber(currentStats.analytics) }
    ];

    statElements.forEach(item => {
      if (item.el) {
        item.el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        item.el.style.opacity = '0.3';
        item.el.style.transform = 'translateY(-2px)';
        
        setTimeout(() => {
          item.el.textContent = item.val;
          item.el.style.opacity = '1';
          item.el.style.transform = 'translateY(0)';
        }, 400);
      }
    });
  }

  setInterval(updateStatsDynamic, 5000);
});
