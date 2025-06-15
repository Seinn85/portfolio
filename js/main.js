// main.js

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
