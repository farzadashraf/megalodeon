// Navigation active state
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
    e.target.classList.add('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Mobile nav toggle
const header = document.querySelector('header');
const nav = document.querySelector('nav');
let menuBtn = document.createElement('button');
menuBtn.innerHTML = '☰';
menuBtn.style.cssText = 'display:none; background:transparent; border:none; color:#e3a84c; font-size:20px; cursor:pointer;';
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

header.appendChild(menuBtn);

// Show menu button on mobile
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    menuBtn.style.display = 'block';
  } else {
    menuBtn.style.display = 'none';
    nav.classList.remove('open');
  }
});

// Initial check
if (window.innerWidth <= 768) {
  menuBtn.style.display = 'block';
}

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideIn 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .signal-item, .indicator-card').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Button interactions
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', function() {
    // Toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #e3a84c;
      color: #1a1108;
      padding: 14px 24px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 1000;
      animation: slideUp 0.3s ease;
    `;
    
    if (this.textContent.includes('ثبت')) {
      toast.textContent = '✓ رویداد ثبت‌نام شروع شد!';
    } else if (this.textContent.includes('ورود')) {
      toast.textContent = '✓ صفحه ورود باز می‌شود...';
    } else if (this.textContent.includes('نمودار')) {
      toast.textContent = '✓ در حال بارگذاری نمودار...';
    } else if (this.textContent.includes('قیمت')) {
      toast.textContent = '✓ در حال بارگذاری قیمت‌ها...';
    } else {
      toast.textContent = '✓ درخواست شما دریافت شد!';
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideDown 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  });
});

// Add slide animations
const slideStyle = document.createElement('style');
slideStyle.textContent = `
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
  @keyframes slideDown {
    from {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    to {
      transform: translateX(-50%) translateY(20px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(slideStyle);

// Live price ticker simulation
const indicators = document.querySelectorAll('.indicator-card .value');
const priceData = [79865.37, 3456.78, 12, 13, 85, 1000];

setInterval(() => {
  indicators.forEach((el, i) => {
    if (i < 2) {
      const variation = (Math.random() - 0.5) * 100;
      el.textContent = (priceData[i] + variation).toFixed(2);
    }
  });
}, 3000);

// Parallax effect on hero
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scroll = window.scrollY;
    hero.style.transform = `translateY(${scroll * 0.5}px)`;
  }
});

console.log('✓ مگالودون آماده است!');
