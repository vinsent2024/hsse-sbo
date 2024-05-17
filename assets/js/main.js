const navToggler = document.querySelector(".nav-toggler");
const navLinks = document.querySelectorAll(".header--menu>li>a");

navToggler.addEventListener("click", changeMenuState);

function changeMenuState() {
  const headerMenu = document.querySelector("ul.header--menu");
  const navIcon = document.querySelectorAll(".navIcon");

  // Show menu programatically
  headerMenu.classList.toggle("show");

  navIcon.forEach((icon) => {
    icon.classList.toggle("hidden");
  });
}

function navbarFixed() {
  const header_dom = document.querySelector(".header");
  const nav_offset_top = header_dom.clientHeight + 50;

  window.addEventListener("scroll", () => {
    let scroll = window.pageYOffset || document.documentElement.scrollTop;

    if (scroll >= nav_offset_top) {
      header_dom.classList.add("navbar-fixed");
    } else {
      header_dom.classList.remove("navbar-fixed");
    }
  });
}

function setMenuActive() {
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((li) => {
      li.classList.remove("active");

      if (current == li.getAttribute("href").split("#")[1]) {
        li.classList.add("active");
      }
    });
  });
}

function onMenuClick() {
  console.log(navLinks);
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", changeMenuState);
  }
}

navbarFixed();
setMenuActive();
onMenuClick();  



document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");

  // Event listener for search input
  searchInput.addEventListener("input", function() {
      const query = searchInput.value.toLowerCase();
      const forms = document.querySelectorAll(".courses-card");

      forms.forEach(form => {
          const title = form.dataset.title.toLowerCase();
          if (title.includes(query)) {
              form.style.display = "";
          } else {
              form.style.display = "none";
          }
      });
  });
});

// Function to sort forms
function sortForms(criteria) {
  const formsContainer = document.getElementById("forms-container");
  const forms = Array.from(formsContainer.getElementsByClassName("courses-card"));

  forms.sort((a, b) => {
      if (criteria === 'title') {
          return a.dataset.title.localeCompare(b.dataset.title);
      } else if (criteria === 'date') {
          return new Date(a.dataset.date) - new Date(b.dataset.date);
      }
  });

  // Append sorted forms back to the container
  forms.forEach(form => formsContainer.appendChild(form));
}
