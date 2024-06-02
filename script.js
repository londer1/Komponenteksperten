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

    // laster inn tema med localstorageeee
    const savedTheme = localStorage.getItem('theme') || '';
    document.body.className = savedTheme;

    // quiz kode
    const quizSection = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const scoreElement = document.getElementById('score');
    const scoreValueElement = document.getElementById('scoreValue');    
    const streakElement = document.createElement('div');
streakElement.id = 'streak';
scoreElement.parentNode.insertBefore(streakElement, scoreElement.nextSibling);
streakElement.style.display = 'none';

    const riktigLyd = document.getElementById('riktigLyd');
    const feilLyd = document.getElementById('feilLyd');

    const questions = [
        { question: 'Hva er hovedkort også kjent som?', options: ['CPU', 'GPU', 'RAM', 'MOBO'], answer: 3 },
        { question: 'Hva er en annen betegnelse for prosessor?', options: ['GPU', 'CPU', 'RAM', 'SSD'], answer: 1 },
        { question: 'Hva er RAM en forkortelse for?', options: ['Read Access Memory', 'Random Access Memory', 'Rapid Access Memory', 'Random Algorithm Memory'], answer: 1 },
        { question: 'Hva er den primære forskjellen mellom en harddisk og en SSD?', options: ['De er like raske', 'HD har mekaniske deler, SSD er solid state', 'SSD er billigere', 'HD har bedre holdbarhet'], answer: 1 },
        { question: 'Hva er hovedoppgaven til RAM?', options: ['Permanent lagring', 'Grafikkproduksjon', 'Midlertidig lagring', 'Komplekse beregninger'], answer: 2 },
        { question: 'Hvorfor har grafikkortprisene økt nylig?', options: ['Fallende etterspørsel', 'Økt etterspørsel fra mining og AI', 'Overproduksjon', 'Reduksjon i produksjonskostnader'], answer: 1 },
        { question: 'Hva er spesielt med NVMe M.2 SSD?', options: ['Mekaniske deler', 'Større enn en vanlig SSD', 'Mindre holdbar', 'Direkte på hovedkortet, ingen kabler'], answer: 3 },
        { question: 'Hvordan kan komponentene sammenlignes litt med et musikkorkester?', options: ['Jobber uavhengig', 'Ingen sammenligning', 'Har spesifikke roller og jobber sammen', 'Ikke viktige'], answer: 2 },
        { question: 'Hva er fungsjonen til BIOS?', options: ['Håndtere og administrere programvareapplikasjoner', 'Sikre at alle komponentene i datamaskinen er klar for bruk før operativsystemet starter', 'Fungere som et operativsystem selv', 'illate brukeren å endre systeminnstillinger for å optimere ytelsen til datamaskinen'], answer: 1 },
        { question: 'Hva bidrar kjølesystemet til under datamaskinens bruk?', options: ['Øker temperaturen', 'Ingen funksjon', 'Forårsaker overoppheting', 'Forhindrer overoppheting'], answer: 3 },
        { question: 'Hvordan kan "bussene" i en datamaskin sammenlignes med veier?', options: ['Begrenser informasjonsflyten', 'Fri flyt av informasjon', 'Ingen sammenligning', 'Bare dekorasjon'], answer: 1 },
        { question: 'Hva er det beste operativsystemet av disse?', options: ['Windows 10/11', 'Ubuntu', 'MacOS', 'Alle er suger på hver sin måte'], answer: 3 }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let streak = 0;
    let shakeIntensity = 5;
    let flameIntensity = 0.1;
    let colorIntensity = 10;
    
    function selectOption(selectedIndex, correctIndex, button) {
        if (selectedIndex === correctIndex) {
            button.classList.add('correct');
            score++;
            streak++;
    
            // streak effekter kode ting
            if (streak >= 2) {
                scoreElement.classList.add('streak');
    
                scoreElement.style.transform = `translateX(${shakeIntensity}px)`;
    
                scoreElement.style.boxShadow = `0 0 10px rgba(255, 0, 0, ${flameIntensity}), 0 0 20px rgba(255, 0, 0, ${flameIntensity})`;
    
                let redValue = Math.min(255, score * colorIntensity);
                scoreElement.style.color = `rgb(${redValue}, 0, 0)`;
            }
    
            riktigLyd.play();
        } else {
            button.classList.add('incorrect');
            streak = 0;
            feilLyd.play();
            scoreElement.classList.remove('streak');
    
            // streak reset ting
            scoreElement.style.transform = 'none';
            scoreElement.style.boxShadow = 'none';
            scoreElement.style.color = '#000';
        }
    }
    function updateStreak() {
        if (streak >= 2) {
            streakElement.textContent = `Streak: ${'🔥 '.repeat(streak - 1).trim()}`;
            streakElement.style.display = 'block';
        } else {
            streakElement.style.display = 'none';
        }
    }
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
            streak++;
            updateStreak();
    
            // streak effekter kode ting
            if (streak >= 3) {
                scoreElement.classList.add('streak');

                shakeIntensity = 5 + streak * 2;
                flameIntensity = 0.1 + streak * 0.1;
                colorIntensity = 10 + streak * 2;
    
                scoreElement.style.transform = `translateX(${shakeIntensity}px)`;
    
                scoreElement.style.boxShadow = `0 0 10px rgba(255, 0, 0, ${flameIntensity}), 0 0 20px rgba(255, 0, 0, ${flameIntensity})`;
    
                let redValue = Math.min(255, score * colorIntensity);
    
                if (document.body.classList.contains('dark-mode')) {
                    scoreElement.style.color = `rgb(255, ${255 - redValue}, ${255 - redValue})`;
                    scoreElement.style.backgroundColor = 'transparent';
                } else {
                    scoreElement.style.color = `rgb(${redValue}, 0, 0)`;
                    scoreElement.style.backgroundColor = '#ffffff';
                }
            }
    
            riktigLyd.play();
        } else {
            button.classList.add('incorrect');
            streak = 0;
            updateStreak();
            feilLyd.play();
            scoreElement.classList.remove('streak');
    
            // streak reset ting
            scoreElement.style.transform = 'none';
            scoreElement.style.boxShadow = 'none';
    
            if (document.body.classList.contains('dark-mode')) {
                scoreElement.style.color = '#fff';
            } else {
                scoreElement.style.color = '#000';
            }
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
            } else {
                showScore();
            }
        }, 3000);
    
        scoreValueElement.textContent = score;
    }

    function showScore() {
        const totalQuestions = questions.length;
        const interval = Math.floor(totalQuestions / 4);
        let message = '';
        let imageSrc = '';
    
        if (score === totalQuestions) {
            message = "Gratulerer! Du klarte alle spørsmålene!";
            imageSrc = "gratulerer.jpg";
            startConfetti(10000, 1000);
        } else {
            const intervalIndex = Math.floor(score / interval);
            switch (intervalIndex) {
                case 0:
                    message = "Du skuffer meg faktisk sykt...";
                    imageSrc = "/bilder/skuffet.png";
                    break;
                case 1:
                    message = "Du kan bedre...";
                    imageSrc = "kan_bedre.jpg";
                    break;
                case 2:
                    message = "Helt greit";
                    imageSrc = "greit.jpg";
                    startConfetti(3000, 300);
                    break;
                case 3:
                    message = "Nesten alt riktig!";
                    imageSrc = "bra_jobba.jpg";
                    startConfetti(4000, 400);
                    break;
            }
        }
    
        quizSection.innerHTML = `
            <h2>Du fikk ${score} av ${totalQuestions} riktig!</h2>
            <p>${message}</p>
            <img src="${imageSrc}" alt="${message}">
        `;
        scoreElement.classList.remove('hidden');
        scoreValueElement.textContent = score;
    }
    
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

// Quiz gjennomført, start confetti-effekt
function startConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    function frame() {
    confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
    });
    confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
    });

    if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
        }
    }

    frame();
}
});