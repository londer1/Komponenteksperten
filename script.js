document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('main section');
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('main section');
    const links = document.querySelectorAll('nav a');
    const themeButton = document.getElementById('themeButton');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
        });
    });

    themeButton.addEventListener('click', function() {
        // Her kan du legge til koden for å vise en boks med temaalternativer
        alert('Her kan du velge tema: mørk, lys, høykontrast');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('main section');
    const links = document.querySelectorAll('nav a');
    const themeLink = document.getElementById('themeLink');
    const themePopup = document.getElementById('themePopup');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
        });
    });

    themeLink.addEventListener('click', function(e) {
        e.preventDefault();
        themePopup.style.display = 'block';
    });

    // Lukk popup hvis brukeren klikker utenfor den
    window.addEventListener('click', function(e) {
        if (e.target === themePopup) {
            themePopup.style.display = 'none';
        }
    });
});
