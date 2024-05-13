document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('main section');
    const links = document.querySelectorAll('nav a');
    const themeLink = document.getElementById('themeLink');
    const themePopup = document.getElementById('themePopup');
    const darkThemeBtn = document.getElementById('darkThemeBtn');
    const lightThemeBtn = document.getElementById('lightThemeBtn');
    const highContrastThemeBtn = document.getElementById('highContrastThemeBtn');

    // Sjekk om det er lagret et temavalg i lokal lagring
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themePopup.classList.add('dark-mode'); // Legg til dark-mode klassen på popup-boksen
    } else if (savedTheme === 'highContrast') {
        document.body.classList.add('high-contrast');
    }

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
            themePopup.style.display = 'none'; // Skjul boksen når en lenke klikkes
        });
    });

    themeLink.addEventListener('click', function(e) {
        e.preventDefault();
        themePopup.style.display = 'block';
    });

    // Lukk popup hvis brukeren klikker utenfor den
    window.addEventListener('click', function(e) {
        if (e.target === themePopup || !themeLink.contains(e.target)) {
            themePopup.style.display = 'none';
        }
    });

    // Sett opp event-lyttere for temaendringsknappene
    darkThemeBtn.addEventListener('click', function() {
        document.body.classList.add('dark-mode');
        themePopup.classList.add('dark-mode'); // Legg til dark-mode klassen på popup-boksen
        document.body.classList.remove('high-contrast');
        localStorage.setItem('theme', 'dark'); // Lagre temaet i lokal lagring
    });

    lightThemeBtn.addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
        themePopup.classList.remove('dark-mode'); // Fjern dark-mode klassen fra popup-boksen
        document.body.classList.remove('high-contrast');
        localStorage.setItem('theme', 'light'); // Lagre temaet i lokal lagring
    });

    highContrastThemeBtn.addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
        themePopup.classList.remove('dark-mode'); // Fjern dark-mode klassen fra popup-boksen
        document.body.classList.add('high-contrast');
        localStorage.setItem('theme', 'highContrast'); // Lagre temaet i lokal lagring
    });
});
