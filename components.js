// =====================================================================
// components.js — SINGLE SOURCE OF TRUTH for shared site elements
// Edit here once → changes apply across ALL pages automatically
// =====================================================================

// ----- SITE CONFIG (edit these to update globally) -----
const SITE = {
  name: "AthiTerra",
  tagline: "Pure Tropical. Bold Flavors.",
  desc: "Harnessing nature's abundance to enrich global well-being through premium, export-grade gherkin ingredients.",
  phone: "+1 479 412 0868",
  phoneTel: "+14794120868",
  email: "info@athiterra.com",
  whatsapp: "919176492844",
  location: "Bentonville, AR, USA",
  website: "www.athiterra.com",
  websiteUrl: "https://www.athiterra.com",
  facebook: "https://www.facebook.com/athiterra",
  instagram: "https://www.instagram.com/athiterra",
  logo: "images/image_01.webp",
  footerLogo: "images/image_09.webp",
  copyright: "2025 AthiTerra. All rights reserved."
};

// ----- NAVIGATION LINKS (edit to add/remove/reorder nav items) -----
const NAV_LINKS = [
  { label: "Home",     href: "index.html",    id: "home" },
  { label: "About Us", href: "about.html",     id: "about" },
  { label: "Products", href: "products.html",  id: "products" },
  { label: "Quality",  href: "quality.html",   id: "quality" },
  { label: "Contact",  href: "contact.html",   id: "contact", isButton: true }
];

// ----- PRODUCT LINKS (edit to add new products to footer/nav) -----
const PRODUCT_LINKS = [
  { label: "Whole Gherkins",  href: "product-whole-gherkins.html" },
  { label: "Sliced Gherkins", href: "product-sliced-gherkins.html" },
  { label: "Diced Gherkins",  href: "product-diced-gherkins.html" },
  { label: "Gherkin Relish",  href: "product-gherkin-relish.html" },
  { label: "Bulk Packs",      href: "product-bulk-packs.html" },
  { label: "Custom Solutions", href: "product-custom-solutions.html" }
];

// =====================================================================
// RENDER FUNCTIONS (you shouldn't need to edit below unless redesigning)
// =====================================================================

// ----- Detect active page -----
function getActivePage() {
  var path = window.location.pathname;
  var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return file;
}

function isProductPage() {
  return getActivePage().startsWith('product-');
}

// ----- NAV -----
function renderNav() {
  var active = getActivePage();
  var navEl = document.getElementById('site-nav');
  if (!navEl) return;

  var linksHtml = NAV_LINKS.map(function(link) {
    var isActive = (active === link.href);
    // Product pages: highlight "Products" nav
    if (link.id === 'products' && (isProductPage() || active === 'products.html')) isActive = true;

    var cls = '';
    if (link.isButton) {
      cls = 'nav-contact-btn' + (isActive ? ' active' : '');
    } else {
      cls = isActive ? 'active' : '';
    }
    return '<li><a href="' + link.href + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + link.label + '</a></li>';
  }).join('\n      ');

  navEl.innerHTML = '\
    <a href="index.html" class="nav-logo"><img src="' + SITE.logo + '" alt="' + SITE.name + '" fetchpriority="high"/></a>\
    <ul class="nav-menu" id="navMenu">\
      ' + linksHtml + '\
    </ul>\
    <div class="burger" id="burger" onclick="toggleMenu()">\
      <span></span><span></span><span></span>\
    </div>';
}

// ----- FOOTER -----
function renderFooter() {
  var footerEl = document.getElementById('site-footer');
  if (!footerEl) return;

  var navLinksHtml = NAV_LINKS.map(function(link) {
    return '<li><a href="' + link.href + '">' + link.label + '</a></li>';
  }).join('\n            ');

  var productLinksHtml = PRODUCT_LINKS.map(function(link) {
    return '<li><a href="' + link.href + '">' + link.label + '</a></li>';
  }).join('\n            ');

  footerEl.innerHTML = '\
    <div class="footer-inner">\
      <div class="footer-swoosh"></div>\
      <div class="footer-top">\
        <div>\
          <div class="footer-logo"><img src="' + SITE.footerLogo + '" alt="' + SITE.name + ' logo" width="120" height="60" loading="lazy"/></div>\
          <p class="footer-tagline">' + SITE.tagline + '</p>\
          <p class="footer-desc">' + SITE.desc + '</p>\
          <div class="footer-social">\
            <a href="' + SITE.facebook + '" target="_blank" rel="noopener" title="Facebook">f</a>\
            <a href="' + SITE.instagram + '" target="_blank" rel="noopener" title="Instagram">\
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>\
            </a>\
          </div>\
        </div>\
        <div class="footer-col">\
          <h4>Navigate</h4>\
          <ul>\
            ' + navLinksHtml + '\
            <li><a href="AthiTerra-Brochure.pdf" target="_blank" rel="noopener">&#x1F4C4; Download Brochure</a></li>\
          </ul>\
        </div>\
        <div class="footer-col">\
          <h4>Products</h4>\
          <ul>\
            ' + productLinksHtml + '\
          </ul>\
        </div>\
        <div class="footer-col">\
          <h4>Contact</h4>\
          <ul>\
            <li><a href="mailto:' + SITE.email + '">' + SITE.email + '</a></li>\
            <li><a href="tel:' + SITE.phoneTel + '">' + SITE.phone + '</a></li>\
            <li><a href="contact.html">' + SITE.location + '</a></li>\
          </ul>\
          <div style="margin-top:18px;">\
            <div id="qrcode" style="background:#fff;padding:8px;border-radius:8px;display:inline-block;box-shadow:0 2px 12px rgba(0,0,0,0.15);"></div>\
            <p style="font-size:0.72rem;color:#a0b8a8;margin-top:6px;">Scan to save contact</p>\
          </div>\
        </div>\
      </div>\
      <div class="footer-bottom">\
        <span>&#169; ' + SITE.copyright + '</span>\
        <span><a href="mailto:' + SITE.email + '">' + SITE.email + '</a></span>\
      </div>\
    </div>';
}

// ----- WHATSAPP BUTTON -----
function renderWhatsApp() {
  var wa = document.getElementById('site-whatsapp');
  if (!wa) return;

  wa.innerHTML = '\
    <a href="https://wa.me/' + SITE.whatsapp + '" target="_blank" rel="noopener noreferrer" class="whatsapp-float" title="Chat with us on WhatsApp">\
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">\
        <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"/>\
        <path fill="#25D366" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.308-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.918,43.798,4.893,43.803,4.868,43.803z"/>\
        <path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"/>\
      </svg>\
    </a>';
}

// ----- QR CODE -----
function renderQRCode() {
  var qrDiv = document.getElementById("qrcode");
  if (!qrDiv || typeof QRCode === 'undefined') return;

  var vCard = [
    "BEGIN:VCARD", "VERSION:3.0",
    "FN:" + SITE.name + " Info",
    "N:Info;" + SITE.name + ";;;",
    "ORG:" + SITE.name,
    "TEL;TYPE=WORK,VOICE:" + SITE.phoneTel,
    "EMAIL:" + SITE.email,
    "ADR;TYPE=WORK:;;Bentonville;;AR;;USA",
    "URL:" + SITE.websiteUrl,
    "END:VCARD"
  ].join("\n");

  new QRCode(qrDiv, {
    text: vCard, width: 130, height: 130,
    colorDark: "#2d4a3e", colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });

  // Overlay logo in center
  setTimeout(function() {
    var qrImg = qrDiv.querySelector("img");
    if (!qrImg) return;
    var canvas = document.createElement("canvas");
    canvas.width = 130; canvas.height = 130;
    var ctx = canvas.getContext("2d");
    var qrImage = new Image();
    qrImage.onload = function() {
      ctx.drawImage(qrImage, 0, 0, 130, 130);
      var ox = 65, oy = 65, r = 18;
      ctx.beginPath(); ctx.arc(ox, oy, r + 3, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffffff"; ctx.fill();
      var logo = new Image();
      logo.onload = function() {
        ctx.save(); ctx.beginPath(); ctx.arc(ox, oy, r, 0, 2 * Math.PI); ctx.clip();
        ctx.drawImage(logo, ox - r, oy - r, r * 2, r * 2); ctx.restore();
        qrDiv.innerHTML = ""; qrDiv.appendChild(canvas);
      };
      logo.onerror = function() { qrDiv.innerHTML = ""; qrDiv.appendChild(canvas); };
      var fl = document.querySelector(".footer-logo img");
      if (fl) logo.src = fl.src;
    };
    qrImage.src = qrImg.src;
  }, 500);
}

// ----- INJECT PHONE & EMAIL into page content -----
// Any element with these classes gets auto-filled from SITE config:
//   .site-phone-link  → sets href="tel:..."
//   .site-phone-text  → sets innerText to phone number
//   .site-email-link  → sets href="mailto:..."
//   .site-email-text  → sets innerText to email
function renderContactInfo() {
  // Phone links
  document.querySelectorAll('.site-phone-link').forEach(function(el) {
    el.href = 'tel:' + SITE.phoneTel;
  });
  // Phone display text
  document.querySelectorAll('.site-phone-text').forEach(function(el) {
    el.textContent = SITE.phone;
  });
  // Email links
  document.querySelectorAll('.site-email-link').forEach(function(el) {
    el.href = 'mailto:' + SITE.email;
  });
  // Email display text
  document.querySelectorAll('.site-email-text').forEach(function(el) {
    el.textContent = SITE.email;
  });
}

// ----- INJECT PHONE into Schema JSON-LD -----
// Updates any schema <script> blocks that contain a placeholder phone
function renderSchemaContact() {
  document.querySelectorAll('script[type="application/ld+json"]').forEach(function(el) {
    try {
      var schema = JSON.parse(el.textContent);
      var updated = false;
      // Update phone in schema
      if (schema.telephone) { schema.telephone = SITE.phoneTel; updated = true; }
      if (schema.email) { schema.email = SITE.email; updated = true; }
      // Check nested contactPoint
      if (schema.contactPoint) {
        if (schema.contactPoint.telephone) { schema.contactPoint.telephone = SITE.phoneTel; updated = true; }
        if (schema.contactPoint.email) { schema.contactPoint.email = SITE.email; updated = true; }
      }
      if (updated) el.textContent = JSON.stringify(schema);
    } catch(e) { /* skip non-JSON */ }
  });
}

// ----- INIT: render all shared components -----
document.addEventListener('DOMContentLoaded', function() {
  renderNav();
  renderFooter();
  renderWhatsApp();
  renderContactInfo();
  renderSchemaContact();
});

// QR code needs QRCode library loaded first (deferred)
window.addEventListener("load", function() {
  renderQRCode();
});
