document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
  });

  const button = document.getElementById('dark-mode-toggle');
    let darkMode = localStorage.getItem('darkMode') === 'true';

    function applyDarkMode(isDark) {
      if (isDark) {
        button.innerHTML = '<i class="fas fa-moon"></i>Dark Theme';
        document.body.style.backgroundColor = '#222';
        document.body.style.color = '#fff';
      } else {
        button.innerHTML = '<i class="fas fa-sun"></i>Light Theme';
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
      }
    }

    // Apply the saved dark mode preference on page load
    applyDarkMode(darkMode);

    button.addEventListener('click', () => {
      darkMode = !darkMode;
      localStorage.setItem('darkMode', darkMode);
      applyDarkMode(darkMode);
    });

    // Ensure dark mode class is toggled correctly with the body class
    document.body.classList.toggle('dark-mode', darkMode);

    //search filter
    document.addEventListener('DOMContentLoaded', function() {
      const input = document.querySelector('.input');
      const cards = document.querySelectorAll('.card');
      const noResults = document.getElementById('no-results');
      const userInputSpan = document.getElementById('userinput');
    
      input.addEventListener('input', function() {
        const filter = input.value.toLowerCase();
        
        // Check if the input is "breaktime" and redirect if true
        if (filter === 'breaktime') {
          window.location.href = 'trex.html';
          return; // Exit the function after redirection
        }
    
        let hasMatch = false;
    
        cards.forEach(card => {
          const text = card.querySelector('p').textContent.toLowerCase();
          if (text.includes(filter)) {
            card.style.display = '';
            hasMatch = true;
          } else {
            card.style.display = 'none';
          }
        });
    
        if (hasMatch) {
          noResults.style.display = 'none';
        } else {
          noResults.style.display = 'block';
          userInputSpan.textContent = input.value;
        }
      });
    });
    