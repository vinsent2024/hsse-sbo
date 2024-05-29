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
  const noResults = document.getElementById("no-results");
  const searchQuerySpan = document.getElementById("search-query");

  // Event listener for search input
  searchInput.addEventListener("input", function() {
      const query = searchInput.value.toLowerCase();
      const forms = document.querySelectorAll(".courses-card");
      let found = false;

      forms.forEach(form => {
          const title = form.querySelector('h4').textContent.toLowerCase();
          if (title.includes(query)) {
              form.style.display = "";
              found = true;
          } else {
              form.style.display = "none";
          }
      });

      if (!found && query !== "") {
          searchQuerySpan.textContent = query;
          noResults.style.display = "block";
      } else {
          noResults.style.display = "none";
      }
  });
});


 // Get the modal
 var modal = document.getElementById("policy-modal");

 // Get the button that opens the modal
 var button = document.getElementById("terms-button");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close-button")[0];

 // When the user clicks the button, open the modal 
 button.onclick = function() {
   modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
   modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }

//pwa
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}