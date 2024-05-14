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

    // Sett standardtema til lyst hvis ikke annet er lagret
    if (!savedTheme || savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.remove('high-contrast');
    } else if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (savedTheme === 'highContrast') {
        document.body.classList.remove('dark-mode');
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
            themePopup.style.display = 'none';
        });
    });

    themeLink.addEventListener('click', function() {
        themePopup.style.display = 'block';
    });

    window.addEventListener('click', function(e) {
        if (e.target === themePopup || !themeLink.contains(e.target)) {
            themePopup.style.display = 'none';
        }
    });

    darkThemeBtn.addEventListener('click', function() {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('high-contrast');
        themePopup.style.display = 'none';
        localStorage.setItem('theme', 'dark');
    });

    lightThemeBtn.addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
        document.body.classList.remove('high-contrast');
        themePopup.style.display = 'none';
        localStorage.setItem('theme', 'light');
    });

    highContrastThemeBtn.addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('high-contrast');
        themePopup.style.display = 'none';
        localStorage.setItem('theme', 'highContrast');
    });

    // Quizfunksjonalitet
    const quizSection = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextBtn = document.getElementById('nextBtn');
    const scoreElement = document.getElementById('scoreValue');

    const questions = [
        {
            question: 'Hva er hovedfunksjonen til en prosessor?',
            options: ['Lagre data', 'Behandle data', 'Vise data', 'Overføre data'],
            answer: 1 // Index av riktig svaralternativ
        },
        {
            question: 'Hva er RAM?',
            options: ['En type lagringsenhet', 'En type prosessor', 'En type minne', 'En type skjerm'],
            answer: 2
        }
        // Legg til flere spørsmål her etter behov
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        optionsElement.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', function() {
                handleAnswer(index);
            });
            optionsElement.appendChild(button);
        });
    }

    function handleAnswer(selectedIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedIndex === currentQuestion.answer) {
            score++;
            scoreElement.textContent = score;
            // Sett knappens bakgrunnsfarge til grønn for riktig svar
            optionsElement.children[currentQuestion.answer].style.backgroundColor = 'green';
        } else {
            // Sett knappens bakgrunnsfarge til rød for feil svar
            optionsElement.children[selectedIndex].style.backgroundColor = 'red';
            optionsElement.children[currentQuestion.answer].style.backgroundColor = 'green';
        }
        // Deaktiver alle knappene etter svar
        Array.from(optionsElement.children).forEach(button => {
            button.disabled = true;
        });
        // Vis neste-knappen
        nextBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
            // Nullstill farge på knappene
            Array.from(optionsElement.children).forEach(button => {
                button.style.backgroundColor = '';
                button.disabled = false;
            });
            // Skjul neste-knappen
            nextBtn.style.display = 'none';
        } else {
            // Quiz'en er fullført
            quizSection.innerHTML = '<h2>Quiz fullført!</h2><p>Din endelige poengsum er: ' + score + '</p>';
        }
    });

    // Start quiz ved lasting av siden
    displayQuestion();
});
