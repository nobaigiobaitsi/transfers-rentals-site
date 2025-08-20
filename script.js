// Simple interactivity: mobile menu toggle and year injection
(function () {
  const menuBtn = document.querySelector('[data-menu]');
  const links = document.querySelector('[data-links]');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', () => {
      links.classList.toggle('show');
    });
  }
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// EmailJS booking form handling
(function () {
  const form = document.getElementById('booking-form');
  if (!form) return;

  // Initialize EmailJS with your public key
  if (window.emailjs) {
    emailjs.init({ publicKey: 'HvMOHpXJqbOoyAYpK' });
  }

  const statusEl = document.getElementById('form-status');
  const sendBtn = document.getElementById('send-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!window.emailjs) return;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      service: form.service.value,
      dates: form.dates.value,
      message: form.message.value,
    };

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';
    try {
      await emailjs.send('service_a5r1qwa', 'template_ezqtgtk', formData);
      statusEl.style.display = 'block';
      statusEl.textContent = 'Booking Sent!';
      statusEl.style.color = '#1a7f37';
      form.reset();
    } catch (err) {
      statusEl.style.display = 'block';
      statusEl.textContent = 'Something went wrong. Please try again.';
      statusEl.style.color = '#b00020';
      console.error('EmailJS error:', err);
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send';
    }
  });
})();


