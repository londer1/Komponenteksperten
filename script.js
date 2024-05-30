document.addEventListener('DOMContentLoaded', function() {
    // skjule seksjoner
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => section.style.display = 'none');
    const initialSection = document.querySelector('section#home');
    if (initialSection) {
        initialSection.style.display = 'block';
    }
    
    // bytte seksjon ved klikk i menyen
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

    // tema popup og knapper
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

    // last inn tema fra localStorage
    const savedTheme = localStorage.getItem('theme') || '';
    document.body.className = savedTheme;

    // quiz kode
    const quizSection = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextBtn = document.getElementById('nextBtn');
    const scoreElement = document.getElementById('score');
    const scoreValueElement = document.getElementById('scoreValue');

    const questions = [
        { question: 'Hva er hovedkort også kjent som?', options: ['CPU', 'GPU', 'RAM', 'MOBO'], answer: 3 },
        { question: 'Hva er en annen betegnelse for prosessor?', options: ['GPU', 'CPU', 'RAM', 'SSD'], answer: 1 },
        { question: 'Hva er RAM en forkortelse for?', options: ['Read Access Memory', 'Random Access Memory', 'Rapid Access Memory', 'Random Algorithm Memory'], answer: 1 },
        { question: 'Hva er den primære forskjellen mellom en harddisk og en SSD?', options: ['De er like raske', 'HD har mekaniske deler, SSD er solid state', 'SSD er billigere', 'HD har bedre holdbarhet'], answer: 1 },
        { question: 'Hva er hovedoppgaven til RAM?', options: ['Permanent lagring', 'Grafikkproduksjon', 'Midlertidig lagring', 'Komplekse beregninger'], answer: 2 },
        { question: 'Hvorfor har grafikkortprisene økt nylig?', options: ['Fallende etterspørsel', 'Økt etterspørsel fra mining og AI', 'Overproduksjon', 'Reduksjon i produksjonskostnader'], answer: 1 },
        { question: 'Hva er spesielt med NVMe M.2 SSD?', options: ['Mekaniske deler', 'Større enn en vanlig SSD', 'Mindre holdbar', 'Direkte på hovedkortet, ingen kabler'], answer: 3 },
        { question: 'Hvordan kan datamaskinkomponentenes samspill sammenlignes med et musikkorkester?', options: ['Jobber uavhengig', 'Ingen sammenligning', 'Har spesifikke roller og jobber sammen', 'Ikke viktige'], answer: 2 },
        { question: 'Hvordan kan å åpne et spill sammenlignes med å gi startsignalet til et racerteam?', options: ['Ingen effekt', 'Setter komponentene i aksjon', 'Krasjer', 'Reduserer levetid'], answer: 1 },
        { question: 'Hva bidrar kjølesystemet til under datamaskinens bruk?', options: ['Øker temperaturen', 'Ingen funksjon', 'Forårsaker overoppheting', 'Forhindrer overoppheting'], answer: 3 },
        { question: 'Hvordan kan bussene i en datamaskin sammenlignes med veier?', options: ['Begrenser informasjonsflyten', 'Fri flyt av informasjon', 'Ingen sammenligning', 'Bare dekorasjon'], answer: 1 }
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

    function showScore() {
        quizSection.innerHTML = `<h2>Du fikk ${score} av ${questions.length} riktig!</h2>`;
        scoreElement.classList.remove('hidden');
        scoreValueElement.textContent = score;
    }

    // quiz
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

    // progressjons bar
    window.onscroll = function() { myFunction() };

    function myFunction() {
        const winScroll = window.scrollY || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("minBar").style.width = scrolled + "%";
    }

    // dritkul slideshow
    let slideIndex = 0;
    visBilder();

    function visBilder() {
        let bilder = document.getElementsByClassName("mineBilder");
        let fremdriftsBar = document.querySelector('.fremdrifts-bar');
        for (let i = 0; i < bilder.length; i++) {
            bilder[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > bilder.length) { slideIndex = 1 }
        bilder[slideIndex - 1].style.display = "block";
        fremdriftsBar.style.width = '0';
        void fremdriftsBar.offsetWidth;
        fremdriftsBar.style.width = '100%';
        setTimeout(visBilder, 3000);
    }
});
