document.addEventListener('DOMContentLoaded', () => {

  /* --- MOBILE NAVIGATION TOGGLE --- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinksList = document.getElementById('navLinks');

  if (menuToggle && navLinksList) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinksList.classList.toggle('open');
      
      // Update hamburger menu icon dynamically
      if (navLinksList.classList.contains('open')) {
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });

    // Close menu when a link is clicked (on mobile)
    const links = navLinksList.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = navLinksList.contains(event.target);
      const isClickInsideToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideMenu && !isClickInsideToggle && navLinksList.classList.contains('open')) {
        navLinksList.classList.remove('open');
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }


  /* --- SCROLL DETECTOR (HEADER SHRINK) --- */
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initial state check


  /* --- INTERACTIVE SECTOR PILLAR TABS --- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const sectorPanels = document.querySelectorAll('.sector-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPillar = btn.getAttribute('data-target');

      // Update active button state
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Transition panels with smooth opacity fade
      sectorPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.getAttribute('id') === targetPillar) {
          // Slight delay to allow smooth cross-fade spacing
          setTimeout(() => {
            panel.classList.add('active');
          }, 50);
        }
      });
    });
  });


  /* --- MAP PATH HOVER HIGHLIGHTS (WEST AFRICAN REGIONAL CORRIDOR) --- */
  const mapNodes = document.querySelectorAll('.map-node');
  
  // Maps target locations to their corresponding SVG route IDs
  const locationRoutes = {
    'Abidjan': 'route-abidjan',
    'Lomé': 'route-lome',
    'Cotonou': 'route-cotonou'
  };

  mapNodes.forEach(node => {
    const loc = node.getAttribute('data-location');
    
    node.addEventListener('mouseenter', () => {
      if (loc === 'Accra') {
        // Highlight all regional routes when hovering Accra (HQ)
        Object.values(locationRoutes).forEach(rId => {
          const routeElement = document.getElementById(rId);
          if (routeElement) {
            routeElement.style.strokeWidth = '3.5px';
            routeElement.style.stroke = 'var(--color-gold-dark)';
            routeElement.style.opacity = '1.0';
            routeElement.style.filter = 'drop-shadow(0 0 6px var(--color-gold))';
          }
        });
      } else {
        const routeId = locationRoutes[loc];
        if (routeId) {
          const routeElement = document.getElementById(routeId);
          if (routeElement) {
            routeElement.style.strokeWidth = '3.5px';
            routeElement.style.stroke = 'var(--color-gold-dark)';
            routeElement.style.opacity = '1.0';
            routeElement.style.filter = 'drop-shadow(0 0 6px var(--color-gold))';
          }
        }
      }
    });

    node.addEventListener('mouseleave', () => {
      if (loc === 'Accra') {
        // Reset all regional routes when leaving Accra (HQ)
        Object.values(locationRoutes).forEach(rId => {
          const routeElement = document.getElementById(rId);
          if (routeElement) {
            routeElement.style.strokeWidth = '1.8px';
            routeElement.style.stroke = 'var(--color-gold-dark)';
            routeElement.style.opacity = '0.7';
            routeElement.style.filter = 'none';
          }
        });
      } else {
        const routeId = locationRoutes[loc];
        if (routeId) {
          const routeElement = document.getElementById(routeId);
          if (routeElement) {
            routeElement.style.strokeWidth = '1.8px';
            routeElement.style.stroke = 'var(--color-gold-dark)';
            routeElement.style.opacity = '0.7';
            routeElement.style.filter = 'none';
          }
        }
      }
    });
  });


  /* --- INTERSECTION OBSERVER FOR ACTIVE NAV --- */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Triggers when section occupies central screen area
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });


  /* --- SCROLL REVEAL ANIMATIONS --- */
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Triggers slightly before element enters viewport
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once revealed to maintain performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* --- CONTACT FORM INTERACTION & SUBMISSION --- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Visual feedback: loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Transmitting Data...';
      submitButton.style.opacity = '0.7';

      // Capture values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const sector = document.getElementById('sector').value;
      const message = document.getElementById('message').value;

      // Map sector selector values to human readable descriptions
      const sectorNames = {
        'fintech': 'Telco Mobile Money Services',
        'agriculture': 'Agribusiness & Cattle Trade',
        'infrastructure': 'Infrastructure & Construction Materials',
        'trade': 'Freight Logistics & Merchandise Trading',
        'partnership': 'General Corporate Partnership'
      };

      const selectedSectorName = sectorNames[sector] || 'General Business Collaboration';

      // Submit to Formspree (Option 1)
      // NOTE: Replace 'FORM_ID' with your actual Formspree form ID (e.g., 'mqkvgwpz')
      const formspreeEndpoint = 'https://formspree.io/f/mjgdbokb';

      // Fallback/Simulated submit if FORM_ID is not replaced yet
      if (formspreeEndpoint.endsWith('FORM_ID')) {
        setTimeout(() => {
          // Reset button state
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          submitButton.style.opacity = '1.0';

          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong>Simulation: Transmission Successful!</strong><br>
            Thank you, ${name}. To enable live submissions, please replace the <code>FORM_ID</code> placeholder in <code>app.js</code> with your actual Formspree form ID.<br>
            Inquiry segment: <strong>${selectedSectorName}</strong>, Contact email: <strong>${email}</strong>.
          `;
          contactForm.reset();
          
          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 12000);
        }, 1500);
        return;
      }

      // Real live post request to Formspree
      fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          sector: selectedSectorName,
          message: message
        })
      })
      .then(response => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1.0';

        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong>Secure Transmission Successful!</strong><br>
            Thank you, ${name}. Your inquiry regarding our <strong>${selectedSectorName}</strong> operations has been successfully routed. An official representative from the Accra head office of <strong>Ali’s Primedge Ventures</strong> will correspond with you at <strong>${email}</strong> within 24 business hours.
          `;
          contactForm.reset();
        } else {
          throw new Error('Server returned an error');
        }
      })
      .catch(error => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1.0';

        formStatus.className = 'form-status error';
        formStatus.innerHTML = `
          <strong>Transmission Error</strong><br>
          We encountered an error transmitting your inquiry. Please try again or email us directly at <a href="mailto:umarali90123@gmail.com">umarali90123@gmail.com</a>.
        `;
      })
      .finally(() => {
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 12000);
      });
    });
  }

  /* --- CUSTOM SELECT DROPDOWN LOGIC --- */
  const customSelectWrapper = document.getElementById('customSectorWrapper');
  const customTrigger = document.getElementById('customSectorTrigger');
  const hiddenSelect = document.getElementById('sector');

  if (customSelectWrapper && customTrigger && hiddenSelect) {
    const customOptions = customSelectWrapper.querySelectorAll('.custom-option');

    // Toggle dropdown on trigger click
    customTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      customSelectWrapper.classList.toggle('open');
      const isOpen = customSelectWrapper.classList.contains('open');
      customTrigger.setAttribute('aria-expanded', isOpen);
    });

    // Handle option selections
    customOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = option.getAttribute('data-value');
        const text = option.textContent;

        // Set value in native select and trigger change event
        hiddenSelect.value = val;
        hiddenSelect.dispatchEvent(new Event('change', { bubbles: true }));

        // Update trigger UI and options classes
        customTrigger.querySelector('span').textContent = text;
        customOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        // Close menu
        customSelectWrapper.classList.remove('open');
        customTrigger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside of the dropdown
    document.addEventListener('click', (event) => {
      const isClickInside = customSelectWrapper.contains(event.target);
      if (!isClickInside && customSelectWrapper.classList.contains('open')) {
        customSelectWrapper.classList.remove('open');
        customTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Keep UI synced if form resets
    const parentForm = customSelectWrapper.closest('form');
    if (parentForm) {
      parentForm.addEventListener('reset', () => {
        setTimeout(() => {
          customTrigger.querySelector('span').textContent = 'Select Segment';
          customOptions.forEach(opt => opt.classList.remove('selected'));
        }, 10);
      });
    }
  }

});
