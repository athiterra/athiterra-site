// =====================================================================
// script.js — Page-specific behaviour only
// Shared components (nav, footer, WhatsApp, QR) are in components.js
// =====================================================================

// ===== Scroll reveal =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => revealObserver.observe(el));

// ===== Sticky nav =====
window.addEventListener('scroll', () => {
  var nav = document.getElementById('site-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== Mobile menu =====
function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('open');
}
// Close mobile menu on link click (delegated since nav is injected by components.js)
document.addEventListener('click', function(e) {
  if (e.target.matches('.nav-menu a')) {
    var menu = document.getElementById('navMenu');
    if (menu) menu.classList.remove('open');
  }
});

// ===== Anti-spam: record page load time =====
var formLoadedEl = document.getElementById('formLoadedAt');
if (formLoadedEl) formLoadedEl.value = Date.now();

// ===== Contact form submission via Formspree =====
var submitBtn = document.getElementById('submitBtn');
if (submitBtn) submitBtn.addEventListener('click', async () => {
  const btn = document.getElementById('submitBtn');
  const toast = document.getElementById('toast');

  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('email').value.trim();
  const company   = document.getElementById('company').value.trim();
  const enquiry   = document.getElementById('enquiryType').value;
  const message   = document.getElementById('message').value.trim();

  function showToast(msg, isError) {
    toast.textContent = msg;
    toast.style.background = isError ? '#c0392b' : '#2d6a4f';
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); toast.style.background = ''; }, 5000);
  }

  function fieldError(id, msg) {
    const el = document.getElementById(id);
    el.style.border = '2px solid #c0392b';
    el.style.background = '#fff5f5';
    let err = el.parentNode.querySelector('.field-err');
    if (!err) {
      err = document.createElement('span');
      err.className = 'field-err';
      err.style.cssText = 'color:#c0392b;font-size:0.78rem;margin-top:4px;display:block;';
      el.parentNode.appendChild(err);
    }
    err.textContent = msg;
  }

  function clearError(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.border = '';
    el.style.background = '';
    const err = el.parentNode.querySelector('.field-err');
    if (err) err.remove();
  }

  ['firstName', 'email', 'message'].forEach(clearError);

  const honeypot = document.getElementById('_gotcha').value;
  const loadedAt = parseInt(document.getElementById('formLoadedAt').value, 10);
  const elapsed = (Date.now() - loadedAt) / 1000;

  if (honeypot) {
    showToast('\u2713 Thanks! Our team will reach out to you.', false);
    return;
  }
  if (elapsed < 3) {
    showToast('\u26A0\uFE0F Please take a moment before submitting.', true);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let hasError = false;

  if (!firstName) { fieldError('firstName', 'First name is required.'); hasError = true; }
  if (!email) { fieldError('email', 'Email address is required.'); hasError = true; }
  else if (!emailRegex.test(email)) { fieldError('email', 'Please enter a valid email address.'); hasError = true; }
  if (!message) { fieldError('message', 'Message is required.'); hasError = true; }

  if (hasError) {
    showToast('\u26A0\uFE0F Please fix the highlighted fields before submitting.', true);
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending\u2026';

  try {
    const response = await fetch('https://formspree.io/f/xbdapprw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        first_name: firstName, last_name: lastName, email: email,
        company: company, enquiry_type: enquiry, message: message,
        _replyto: email,
        _subject: 'New Enquiry from ' + firstName + ' ' + lastName + ' \u2014 AthiTerra'
      })
    });

    if (response.ok) {
      const successMsg = document.getElementById('formSuccess');
      successMsg.textContent = '\u2713 Thanks ' + firstName + '. Our team will reach out to you.';
      successMsg.style.display = 'block';
      ['firstName','lastName','email','company','message'].forEach(id => {
        document.getElementById(id).value = '';
        clearError(id);
      });
      document.getElementById('enquiryType').value = '';
      btn.textContent = 'Send Enquiry \u2192';
      btn.disabled = true;
    } else {
      const data = await response.json();
      if (data.errors) {
        data.errors.forEach(e => {
          if (e.field === 'email') fieldError('email', 'Please enter a valid email address.');
          else showToast('\u26A0\uFE0F ' + e.message, true);
        });
      }
      throw new Error('Server error');
    }
  } catch (err) {
    if (!toast.classList.contains('show')) {
      showToast('\u274C Something went wrong. Please try again or email us directly.', true);
    }
    btn.disabled = false;
    btn.textContent = 'Send Enquiry \u2192';
  }
});
