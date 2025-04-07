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

    document.addEventListener("DOMContentLoaded", function () {
        gsap.fromTo(
            ".background-svg path",
            { 
                opacity: 0, 
                x: (i) => (i % 2 === 0 ? 100 : -100) // Layer ganjil dari kiri, genap dari kanan
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                stagger: 0.5, // Delay antar layer
                ease: "power2.out",
            }
        );
    });
    
});
  