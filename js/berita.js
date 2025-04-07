document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const header = document.getElementById('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const scrollTopBtn = document.getElementById('scroll-top');
  const aboutButton = document.querySelector('.about-button');
  const additionalContent = document.querySelector('.additional-content');
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const closeSidebar = document.querySelector('.close-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const dropdownButtons = document.querySelectorAll('.sidebar-dropbtn');

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('show');
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // Hide mobile menu when clicking on links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768 && navLinks) {
        navLinks.classList.remove('show');
        if (mobileMenuBtn) {
          const icon = mobileMenuBtn.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      }
    });
  });

  // Sidebar toggle functions
  function openSidebar() {
    if (sidebar && overlay) {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    }
  }

  function closeSidebarMenu() {
    if (sidebar && overlay) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }

    document.querySelectorAll('.sidebar-dropdown-content').forEach(content => {
      content.style.maxHeight = null;
    });

    document.querySelectorAll('.sidebar-dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }

  if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
  if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarMenu);
  if (overlay) overlay.addEventListener('click', closeSidebarMenu);

  // Sidebar dropdown toggle
  dropdownButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      let parentDropdown = this.closest('.sidebar-dropdown');
      let dropdownContent = parentDropdown.querySelector('.sidebar-dropdown-content');

      if (!dropdownContent) return;

      if (parentDropdown.classList.contains('active')) {
        parentDropdown.classList.remove('active');
        dropdownContent.style.maxHeight = null;
      } else {
        document.querySelectorAll('.sidebar-dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
          let content = dropdown.querySelector('.sidebar-dropdown-content');
          if (content) content.style.maxHeight = null;
        });

        parentDropdown.classList.add('active');
        dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
      }
    });
  });

  // Header background on scroll
  window.addEventListener('scroll', function () {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      scrollTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
    }
  });

  // Scroll to top button
  if (scrollTopBtn) {
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({ top: targetSection.offsetTop - 80, behavior: 'smooth' });
        }
      }
    });
  });

  // Slide toggle function
  function slideToggle(element) {
    if (!element) return;
    if (element.style.maxHeight && element.style.maxHeight !== '0px') {
      element.style.maxHeight = '0px';
      element.style.opacity = '0';
      if (aboutButton) aboutButton.textContent = 'Pelajari Lebih Lanjut';
    } else {
      element.style.maxHeight = element.scrollHeight + 'px';
      element.style.opacity = '1';
      if (aboutButton) aboutButton.textContent = 'Tutup';
    }
  }

  if (aboutButton) {
    aboutButton.addEventListener('click', function () {
      slideToggle(additionalContent);
    });
  }

  // Close sidebar on window resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeSidebarMenu();
    }
  });

  // Tampilkan tanggal atau "days ago"
  let tanggalElements = document.querySelectorAll(".post-tgl");
  tanggalElements.forEach(function (element, index) {
    let tanggalPost = element.getAttribute("data-tanggal");
    if (tanggalPost) {
      let postDate = new Date(tanggalPost);
      let today = new Date();
      let selisihMs = today - postDate;
      let selisihHari = Math.floor(selisihMs / (1000 * 60 * 60 * 24));

      if (index === 0) {
        element.textContent = `${selisihHari} days ago`;
      } else {
        if (selisihHari <= 7) {
          element.textContent = `${selisihHari} days ago`;
        } else {
          let options = { month: 'long', day: 'numeric' };
          element.textContent = postDate.toLocaleDateString('en-US', options);
        }
      }
    }
  });

  function formatTanggal(tanggalPost) {
    const postDate = new Date(tanggalPost);
    const today = new Date();
    const selisihMs = today - postDate;
    const selisihHari = Math.floor(selisihMs / (1000 * 60 * 60 * 24));

    if (selisihHari <= 7) {
      return `${selisihHari === 0 ? 'Today' : selisihHari + ' days ago'}`;
    } else {
      let options = { month: 'long', day: 'numeric', year: 'numeric' };
      return postDate.toLocaleDateString('en-US', options);
    }
  }

  document.querySelectorAll('.tanggal-post').forEach(function (el) {
    const tanggal = el.getAttribute('data-tanggal');
    if (tanggal) {
      el.textContent = `By ipnu / ${formatTanggal(tanggal)}`;
    }
  });

  // ===============================
  // Navigasi otomatis prev dan next
  // ===============================
  const posts = [
    { id: 1, title: "Selamat & sukses rekan rekanita Telah lolos jalur SPAN-PTKIN...", url: "berita-post-1.html" },
    { id: 2, title: "Selamat dan sukses rekan Raja Muhammad Surya...", url: "berita-post-2.html" },
    { id: 3, title: "Pra Pelantikan PAC IPNU IPPNU...", url: "berita-post-3.html" }
    // Tambahkan post baru di sini
  ];

  const currentPostId = parseInt(document.body.dataset.postId);
  const currentIndex = posts.findIndex(p => p.id === currentPostId);
  const navWrapper = document.querySelector('.nav-wrapper');

  if (navWrapper && !isNaN(currentIndex)) {
    navWrapper.innerHTML = '';

    if (currentIndex > 0) {
      const prev = posts[currentIndex - 1];
      navWrapper.innerHTML += `
        <div class="prev-post">
          <a href="${prev.url}" class="nav-label">&larr; PREVIOUS</a>
          <a href="${prev.url}">${prev.title}</a>
        </div>
      `;
    }

    if (currentIndex < posts.length - 1) {
      const next = posts[currentIndex + 1];
      navWrapper.innerHTML += `
        <div class="next-post">
          <a href="${next.url}" class="nav-label">NEXT &rarr;</a>
          <a href="${next.url}">${next.title}</a>
        </div>
      `;
    }
  }

});
