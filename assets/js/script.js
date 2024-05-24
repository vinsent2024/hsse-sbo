document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
  });

  const button = document.getElementById('dark-mode-toggle');
  let darkMode = false;

  button.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
      button.innerHTML = '<i class="fas fa-moon"></i>Dark Theme';
      // Add dark mode styles or toggle a dark mode class on body or other elements
      document.body.style.backgroundColor = '#222';
      document.body.style.color = '#fff';
    } else {
      button.innerHTML = '<i class="fas fa-sun"></i>Light Theme';
      // Remove dark mode styles or toggle a dark mode class on body or other elements
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#000';
    }
  });
