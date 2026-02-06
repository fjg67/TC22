/**
 * ============================================
 * CAHIER DES CHARGES - GESTION DE STOCK IT
 * Script JavaScript principal
 *
 * Fonctionnalités :
 * - Menu mobile toggle
 * - Smooth scroll
 * - Active link highlighting
 * ============================================
 */

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // MENU MOBILE TOGGLE
  // ============================================
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("open");
      mainNav.classList.toggle("open");

      // Empêcher le scroll du body quand le menu est ouvert
      document.body.style.overflow = mainNav.classList.contains("open")
        ? "hidden"
        : "";
    });

    // Fermer le menu quand on clique sur un lien
    const navLinks = mainNav.querySelectorAll(".nav-link");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("open");
        mainNav.classList.remove("open");
        document.body.style.overflow = "";
      });
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("open")) {
        menuToggle.classList.remove("open");
        mainNav.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL POUR LES ANCRES
  // ============================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Ignorer les liens vides
      if (href === "#") return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Calculer l'offset pour le header fixe
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // HIGHLIGHT SECTION ACTIVE DANS LE TOC
  // ============================================
  const tocLinks = document.querySelectorAll(".toc-list a");
  const sections = document.querySelectorAll("section[id]");

  if (tocLinks.length > 0 && sections.length > 0) {
    function highlightActiveSection() {
      const headerHeight = document.querySelector(".header").offsetHeight;
      let current = "";

      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (
          window.pageYOffset >= sectionTop &&
          window.pageYOffset < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      tocLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", highlightActiveSection);
    highlightActiveSection(); // Initial call
  }

  // ============================================
  // ANIMATION AU SCROLL (INTERSECTION OBSERVER)
  // ============================================
  const animatedElements = document.querySelectorAll(
    ".context-card, .nav-card, .requirement-item, .trace-card, .analysis-card, .summary-category",
  );

  if (animatedElements.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    animatedElements.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });
  }

  // ============================================
  // AFFICHER LA DATE DE DERNIÈRE MODIFICATION
  // ============================================
  const footerMeta = document.querySelector(".footer-meta p");
  if (footerMeta && footerMeta.textContent.includes("Février 2024")) {
    // Optionnel : remplacer par la date actuelle si souhaité
    // const now = new Date();
    // const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    // footerMeta.textContent = 'Version 1.0 – ' + months[now.getMonth()] + ' ' + now.getFullYear();
  }

  // ============================================
  // PRINT FUNCTIONALITY
  // ============================================
  // Ajouter un bouton d'impression si nécessaire
  // (Non implémenté par défaut, décommenter si souhaité)
  /*
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ Imprimer';
    printButton.className = 'btn btn-secondary print-btn';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '20px';
    printButton.style.right = '20px';
    printButton.style.zIndex = '100';
    printButton.addEventListener('click', function() {
        window.print();
    });
    document.body.appendChild(printButton);
    */
});

/**
 * Fonction utilitaire pour formater les dates
 * @param {Date} date - L'objet Date à formater
 * @returns {string} - Date formatée en français
 */
function formatDateFR(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
}

/**
 * Console log pour le débogage
 * Peut être désactivé en production
 */
console.log("📦 Site Cahier des charges - Gestion de stock IT chargé");
