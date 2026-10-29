(function () {
  const isSubfolder = window.location.pathname.indexOf('/pages/') !== -1 || window.location.pathname.indexOf('\\pages\\') !== -1;
  const basePath = isSubfolder ? '../' : './';
  const pagesPath = isSubfolder ? './' : 'pages/';

  const appHeader = `
  <!-- ═══════════════════════ NAVBAR ═══════════════════════ -->
  <header class="navbar" id="navbar">
    <div class="container nav__inner">
      <a href="${basePath}index.html#home" class="nav__logo">
        <img src="${basePath}assets/images/brand/logo%20001.png" alt="GraphicTECH Logo" class="nav__logo-img">
      </a>

      <button class="nav__toggle" id="navToggle" aria-label="เปิดเมนู" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="nav__backdrop" id="navBackdrop"></div>

      <nav class="nav__menu" id="navMenu" aria-label="เมนูหลัก">
        <div class="nav__item">
          <a href="${basePath}index.html#home" class="nav__link is-active">หน้าแรก</a>
        </div>
        <div class="nav__item">
          <a href="${basePath}index.html#services" class="nav__link">
            บริการของเรา
            <svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
          <div class="nav__mega">
            <div class="nav__mega-grid">
              <a href="${pagesPath}service-uiux.html" class="mega-link">
                <span class="mega-link__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.6">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg></span>
                <span><b>UI/UX Design</b>
                  <p>ออกแบบประสบการณ์ผู้ใช้ที่ใช้งานง่ายและสวยงาม</p>
                </span>
              </a>
              <a href="${pagesPath}service-graphic.html" class="mega-link">
                <span class="mega-link__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.6">
                    <circle cx="13.5" cy="6.5" r="2.5" />
                    <circle cx="6.5" cy="14.5" r="2.5" />
                    <path d="M17 21v-1a4 4 0 00-4-4H5a4 4 0 00-4 4v1" />
                    <path d="M22 11l-3-3-7 7-3-3" />
                  </svg></span>
                <span><b>Graphic Design</b>
                  <p>งานกราฟิกดิจิทัลและสิ่งพิมพ์ที่โดดเด่น</p>
                </span>
              </a>
              <a href="${pagesPath}service-web.html" class="mega-link">
                <span class="mega-link__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.6">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg></span>
                <span><b>Web Development</b>
                  <p>เว็บไซต์และแอปพลิเคชันที่รวดเร็วปลอดภัย</p>
                </span>
              </a>
              <a href="${pagesPath}service-marketing.html" class="mega-link">
                <span class="mega-link__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.6">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg></span>
                <span><b>Digital Marketing</b>
                  <p>กลยุทธ์การตลาดดิจิทัลที่ขับเคลื่อนด้วยข้อมูล</p>
                </span>
              </a>
              <a href="${pagesPath}service-erp.html" class="mega-link">
                <span class="mega-link__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.6">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg></span>
                <span><b>ERP System</b>
                  <p>ระบบจัดการองค์กรครบวงจร เพิ่มประสิทธิภาพธุรกิจ</p>
                </span>
              </a>
              <a href="${pagesPath}service-branding.html" class="mega-link">
                <span class="mega-link__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.6">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg></span>
                <span><b>Branding</b>
                  <p>สร้างตัวตนแบรนด์ที่จดจำได้และแข็งแกร่ง</p>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="nav__item"><a href="${basePath}index.html#portfolio" class="nav__link">ผลงานของเรา</a></div>
        <div class="nav__item"><a href="${basePath}index.html#contact" class="nav__link">ติดต่อเรา</a></div>
      </nav>

      <div class="nav__actions">
        <div class="nav__phone">
          <span class="nav__phone-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
          </span>
          <span><small>โทรปรึกษาฟรี</small><b>082-972-7122</b></span>
        </div>
      </div>
    </div>
    <span class="scroll-progress" id="scrollProgress"></span>
  </header>
  `;

  const appFooter = `
  <!-- ═══════════════════════ FOOTER ═══════════════════════ -->
  <footer class="footer">
    <div class="container footer__top">
      <div class="footer__col footer__brand">
        <a href="${basePath}index.html#home" class="nav__logo">
          <img src="${basePath}assets/images/brand/logo%20002.png" alt="GraphicTECH Logo" class="nav__logo-img">
        </a>
        <p style="margin-bottom: 24px; color: rgba(255,255,255,0.85); font-weight: 500; font-size: 1.05rem; line-height: 1.6;">
          บริษัท กราฟิกเทค จำกัด<br>
          <span style="font-weight: 400; color: rgba(255,255,255,0.68);">150 หมู่ที่ 3 ซอย 4 ถนนรังสิต-นครนายก<br>ตำบลประชาธิปัตย์ อำเภอธัญบุรี จ.ปทุมธานี 12130</span>
        </p>
        <h4 style="margin-bottom: 12px; font-size: 1.1rem; color: #fff;">ติดต่อสอบถาม</h4>
        <ul class="footer__contact" style="gap: 8px;">
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <a href="tel:0829727122">082-972-7122</a>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=graphictech.co.ltd@gmail.com" target="_blank">graphictech.co.ltd@gmail.com</a>
          </li>
        </ul>
      </div>

      <div class="footer__col">
        <h4>บริการของเรา</h4>
        <nav class="footer__links">
          <a href="${pagesPath}service-uiux.html">UI/UX Design</a>
          <a href="${pagesPath}service-graphic.html">Graphic Design</a>
          <a href="${pagesPath}service-web.html">Web Development</a>
          <a href="${pagesPath}service-marketing.html">Digital Marketing</a>
          <a href="${pagesPath}service-erp.html">ERP System</a>
          <a href="${pagesPath}service-branding.html">Branding</a>
        </nav>
      </div>

      <div class="footer__col">
        <h4>เมนูอื่นๆ</h4>
        <nav class="footer__links">
          <a href="${basePath}index.html#portfolio">ผลงานของเรา</a>
          <a href="${basePath}index.html#contact">ติดต่อเรา</a>
        </nav>
      </div>

      <div class="footer__col">
        <h4>ช่องทางการติดตาม</h4>
        <div class="footer__social" style="margin-bottom: 24px;">
          <a href="https://www.facebook.com/profile.php?id=61574200404276" target="_blank" aria-label="Facebook" style="background: #1877F2; border-radius: 50%; width: 40px; height: 40px;"><svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
            </svg></a>
          <a href="https://www.instagram.com/graphictech.co.ltd/" target="_blank" aria-label="Instagram" style="background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); border-radius: 50%; width: 40px; height: 40px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg></a>
        </div>
      </div>
    </div>

    <div class="container footer__bottom">
      <p>© 2026 Graphic TECH. All rights reserved.</p>
    </div>
  </footer>

  <!-- ═══════════════════════ FLOATING ACTION BUTTONS ═══════════════════════ -->
  <div class="fab-stack" id="fabStack">
    <div class="fab-group">
      <a class="fab fab--fb" href="https://www.facebook.com/profile.php?id=61574200404276" target="_blank" rel="noopener" aria-label="Facebook">
        <span class="fab__label">Facebook</span>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      </a>
      <a class="fab fab--ig" href="https://www.instagram.com/graphictech.co.ltd/" target="_blank" rel="noopener" aria-label="Instagram">
        <span class="fab__label">Instagram</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
      <a class="fab fab--phone fab--pulse" href="tel:0829727122" aria-label="โทรหาเรา">
        <span class="fab__label">โทร 082-972-7122</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      </a>
    </div>

    <a class="to-top" id="toTop" aria-label="กลับขึ้นด้านบน">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
    
    <button class="fab-toggle" id="fabToggle" aria-label="ติดต่อเรา">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  </div>
  `;

  // Insert Header
  const headerEl = document.getElementById('app-header');
  if (headerEl) {
    headerEl.innerHTML = appHeader;
  }

  // Insert Footer
  const footerEl = document.getElementById('app-footer');
  if (footerEl) {
    footerEl.innerHTML = appFooter;
  }



  // Setup FAB Toggle logic
  setTimeout(() => {
    const fabToggle = document.getElementById('fabToggle');
    const fabStack = document.getElementById('fabStack');
    if (fabToggle && fabStack) {
      fabToggle.addEventListener('click', () => {
        fabStack.classList.toggle('is-open');
      });
      // Optionally close when clicking outside
      document.addEventListener('click', (e) => {
        if (!fabStack.contains(e.target)) {
          fabStack.classList.remove('is-open');
        }
      });
    }
  }, 100);

})();


