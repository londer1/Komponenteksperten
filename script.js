document.addEventListener('DOMContentLoaded', function() {
    // Skjule seksjoner
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => section.style.display = 'none');
    const initialSection = document.querySelector('section#home');
    if (initialSection) {
        initialSection.style.display = 'block';
    }

    // Bytte seksjon ved klikk i menyen
    const menuLinks = document.querySelectorAll('nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetSection = document.querySelector(link.getAttribute('href'));
            sections.forEach(section => section.style.display = 'none');
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // Tema popup og knapper
    const themePopup = document.getElementById('themePopup');
    const themeLink = document.getElementById('themeLink');
    const darkThemeBtn = document.getElementById('darkThemeBtn');
    const lightThemeBtn = document.getElementById('lightThemeBtn');
    const highContrastThemeBtn = document.getElementById('highContrastThemeBtn');

    themeLink.addEventListener('click', () => {
        themePopup.style.display = 'block';
    });

    darkThemeBtn.addEventListener('click', () => {
        setTheme('dark-mode');
    });

    lightThemeBtn.addEventListener('click', () => {
        setTheme('');
    });

    highContrastThemeBtn.addEventListener('click', () => {
        setTheme('high-contrast');
    });

    function setTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        themePopup.style.display = 'none';
    }

    // Last inn tema fra localStorage
    const savedTheme = localStorage.getItem('theme') || '';
    document.body.className = savedTheme;

    // Quiz kode
    const quizSection = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextBtn = document.getElementById('nextBtn');
    const scoreElement = document.getElementById('score');
    const scoreValueElement = document.getElementById('scoreValue');

    const questions = [
        { question: 'Hva er hovedkort også kjent som?', options: ['Motherboard eller MOBO', 'CPU', 'GPU', 'RAM'], answer: 3 },
        { question: 'Hva er en annen betegnelse for prosessor?', options: ['CPU', 'GPU', 'RAM', 'SSD'], answer: 1 },
        { question: 'Hva er RAM en forkortelse for?', options: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Memory', 'Random Algorithm Memory'], answer: 0 },
        { question: 'Hva er den primære forskjellen mellom en harddisk og en SSD?', options: ['En harddisk har mekaniske deler, mens en SSD er solid state', 'De er begge like raske', 'SSD er billigere enn harddisk', 'Harddisken har bedre holdbarhet enn SSD'], answer: 0 },
        { question: 'Hva er hovedoppgaven til RAM?', options: ['Midlertidig lagring av data for rask tilgang', 'Permanent lagring av data', 'Grafikkproduksjon', 'Prosessering av komplekse beregninger'], answer: 0 },
        { question: 'Hvorfor har grafikkortprisene økt nylig?', options: ['På grunn av økt etterspørsel fra kryptovalutamining og AI-teknologier', 'På grunn av fallende etterspørsel', 'På grunn av overproduksjon av grafikkort', 'På grunn av reduksjon i produksjonskostnader'], answer: 0 },
        { question: 'Hva er spesielt med NVMe M.2 SSD?', options: ['Den sitter direkte på hovedkortet uten kabler, noe som reduserer forsinkelse', 'Den er større enn en vanlig SSD', 'Den har mekaniske deler', 'Den er mindre holdbar enn en vanlig SSD'], answer: 0 },
        { question: 'Hvordan kan datamaskinkomponentenes samspill sammenlignes med et musikkorkester?', options: ['Hver del har sin spesifikke rolle, men de arbeider sammen for å skape noe større', 'Hver del jobber uavhengig uten å samarbeide', 'Det er ingen sammenligning', 'Komponentene er ikke viktige for datamaskinens funksjon'], answer: 0 },
        { question: 'Hvordan kan å åpne et spill sammenlignes med å gi startsignalet til et racerteam?', options: ['Det setter alle datamaskinkomponentene i aksjon for å gi den beste spillopplevelsen', 'Det har ingen effekt på datamaskinens ytelse', 'Det får datamaskinen til å krasje', 'Det reduserer datamaskinens levetid'], answer: 0 },
        { question: 'Hva bidrar kjølesystemet til under datamaskinens bruk?', options: ['Det holder temperaturen nede for å forhindre overoppheting', 'Det øker temperaturen for bedre ytelse', 'Det har ingen funksjon', 'Det forårsaker overoppheting'], answer: 0 },
        { question: 'Hvordan kan bussene i en datamaskin sammenlignes med veier?', options: ['De fungerer som motorveier som tillater fri flyt av informasjon mellom komponentene', 'De begrenser informasjonsflyten', 'De har ingen sammenligning med veier', 'De er bare for dekorasjon'], answer: 0 }
    ];       

    let currentQuestionIndex = 0;
    let score = 0;

    function showQuestion(questionIndex) {
        const question = questions[questionIndex];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('quiz-option');
            button.addEventListener('click', () => selectOption(index, question.answer, button));
            optionsElement.appendChild(button);
        });
    }

    function selectOption(selectedIndex, correctIndex, button) {
        if (selectedIndex === correctIndex) {
            button.classList.add('correct');
            score++;
        } else {
            button.classList.add('incorrect');
        }

        Array.from(optionsElement.children).forEach(btn => {
            btn.disabled = true;
            if (questions[currentQuestionIndex].options.indexOf(btn.textContent) === correctIndex) {
                btn.classList.add('correct');
            }
        });

        nextBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showScore();
        }
        nextBtn.style.display = 'none';
    });

    showQuestion(currentQuestionIndex);

    function toggleFullscreenImage(imageId) {
        const image = document.getElementById(imageId);
        if (image.classList.contains('show')) {
            image.classList.remove('show');
        } else {
            image.classList.add('show');
        }
    }

    const ramImages = document.querySelectorAll('.fullscreen-image img');
    ramImages.forEach(img => {
        img.addEventListener('click', function() {
            toggleFullscreenImage(this.parentElement.id);
        });
    });

    document.addEventListener('keydown', function(event) {
        if(event.key === 'Escape') {
            toggleFullscreenImage('ramImageContainer');
        }
    });

//quiz next knapp av og på
function selectOption(selectedIndex, correctIndex, button) {
    if (selectedIndex === correctIndex) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
    }

    Array.from(optionsElement.children).forEach(btn => {
        btn.disabled = true;
        if (questions[currentQuestionIndex].options.indexOf(btn.textContent) === correctIndex) {
            btn.classList.add('correct');
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
            nextBtn.style.display = 'none';
        } else {
            quizSection.innerHTML = `<h2>Du fikk ${score} av ${questions.length} riktig!</h2>`;
            optionsElement.innerHTML = '';
            nextBtn.style.display = 'none';
            scoreElement.classList.remove('hidden');
            scoreValueElement.textContent = score;
        }
    }, 1500);
}

//progressjonsbar
window.onscroll = function() { myFunction() };

function myFunction() {
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("minBar").style.width = scrolled + "%";
}
});