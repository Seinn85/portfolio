// main.js

// Awards Section Carousel
function initAwardsCarousel() {
    const slides = document.getElementById('awardsSlides');
    const images = slides ? slides.querySelectorAll('.carousel-img') : [];
    const prev = document.getElementById('awardsPrev');
    const next = document.getElementById('awardsNext');
    const dots = document.querySelectorAll('#awardsDots .carousel-dot');
    let current = 0;
    let interval;
    const total = images.length;

    function updateCarousel(index) {
        if (!slides) return;
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-star-glow', i === index);
            dot.classList.toggle('bg-gray-400', i !== index);
        });
        current = index;
    }
    function goToNext() {
        updateCarousel((current + 1) % total);
    }
    function goToPrev() {
        updateCarousel((current - 1 + total) % total);
    }
    function startAutoSlide() {
        interval = setInterval(goToNext, 3500);
    }
    function stopAutoSlide() {
        clearInterval(interval);
    }
    if (next) next.addEventListener('click', () => { stopAutoSlide(); goToNext(); startAutoSlide(); });
    if (prev) prev.addEventListener('click', () => { stopAutoSlide(); goToPrev(); startAutoSlide(); });
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { stopAutoSlide(); updateCarousel(i); startAutoSlide(); });
    });
    updateCarousel(0);
    startAutoSlide();
    slides.addEventListener('mouseenter', stopAutoSlide);
    slides.addEventListener('mouseleave', startAutoSlide);
}
document.addEventListener('DOMContentLoaded', function () {
    initAwardsCarousel();
});

// Example: Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// EmailJS form handling
// This block will initialize EmailJS and handle the contact form submission
// Make sure to replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, and YOUR_TEMPLATE_ID

document.addEventListener("DOMContentLoaded", function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("YOUR_PUBLIC_KEY");
    const form = document.getElementById("contact-form");
    const resultDiv = document.getElementById("result");
    if (form) {
      form.addEventListener("submit", async function(event) {
        event.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        const name = form.querySelector('[name="user_name"]');
        const email = form.querySelector('[name="user_email"]');
        const message = form.querySelector('[name="message"]');
        let errors = [];

        // Validation
        if (!name || !name.value.trim()) {
          errors.push("お名前を入力してください。");
        }
        if (!email || !email.value.trim()) {
          errors.push("メールアドレスを入力してください。");
        } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
          errors.push("有効なメールアドレスを入力してください。");
        }
        if (!message || !message.value.trim()) {
          errors.push("メッセージを入力してください。");
        }

        if (errors.length > 0) {
          resultDiv.textContent = errors.join("\n");
          resultDiv.style.color = "red";
          return;
        }

        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>送信中...';
        btn.disabled = true;
        resultDiv.textContent = "";

        try {
          await emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form);
          resultDiv.textContent = "メッセージを送信いたしました。ありがとうございます！";
          resultDiv.style.color = "green";
          form.reset();
        } catch (error) {
          resultDiv.textContent = "送信に失敗しました。もう一度お試しください。";
          resultDiv.style.color = "red";
          console.error("EmailJS Error:", error);
        } finally {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      });
    }
  }
});
