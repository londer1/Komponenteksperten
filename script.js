document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('main section');
    const links = document.querySelectorAll('nav a');
    const themeLink = document.getElementById('themeLink');
    const themePopup = document.getElementById('themePopup');
    const darkThemeBtn = document.getElementById('darkThemeBtn');
    const lightThemeBtn = document.getElementById('lightThemeBtn');
    const highContrastThemeBtn = document.getElementById('highContrastThemeBtn');

    let themePopupOpen = false;
    const savedTheme = localStorage.getItem('theme');

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
            closeThemePopup();
        });
    });

    themeLink.addEventListener('click', function() {
        if (themePopupOpen) {
            closeThemePopup();
        } else {
            openThemePopup();
        }
    });

    function openThemePopup() {
        themePopup.style.display = 'block';
        themePopupOpen = true;
    }

    function closeThemePopup() {
        themePopup.style.display = 'none';
        themePopupOpen = false;
    }

    darkThemeBtn.addEventListener('click', function() {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('high-contrast');
        closeThemePopup();
        localStorage.setItem('theme', 'dark');
    });

    lightThemeBtn.addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
        document.body.classList.remove('high-contrast');
        closeThemePopup();
        localStorage.setItem('theme', 'light');
    });

    highContrastThemeBtn.addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('high-contrast');
        closeThemePopup();
        localStorage.setItem('theme', 'highContrast');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const quizSection = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextBtn = document.getElementById('nextBtn');
    const scoreElement = document.getElementById('score');
    const scoreValueElement = document.getElementById('scoreValue');

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
        },
        {
            question: 'Hva er formålet med en GPU (Graphics Processing Unit) i en datamaskin?',
            options: ['Utføre matematiske beregninger', 'Behandle grafikk og visuelle elementer', 'Kontrollere lagring og dataoverføring', 'Administrere nettverksforbindelser'],
            answer: 1
        },
        {
            question: 'Hvilken type minne brukes vanligvis til midlertidig lagring av data for rask tilgang av CPUen?',
            options: ['ROM (Read-Only Memory)', 'HDD (Hard Disk Drive)', 'SSD (Solid State Drive)', 'RAM (Random Access Memory)'],
            answer: 3
        },
        {
            question: 'Hva er formålet med en BIOS (Basic Input/Output System) i en datamaskin?',
            options: ['Administrere operativsystemet', 'Lagre permanent lagrede data', 'Kontrollere oppstart og grunnleggende maskinvarefunksjoner', 'Behandle nettverkstilkoblinger'],
            answer: 2
        },
        {
            question: 'Hvilken komponent er ansvarlig for å levere strøm til de forskjellige delene av en datamaskin?',
            options: ['PSU (Power Supply Unit)', 'CPU (Central Processing Unit)', 'GPU (Graphics Processing Unit)', 'RAM (Random Access Memory)'],
            answer: 0
        },
        {
            question: 'Hva er formålet med en Northbridge-southbridge-arkitektur på et hovedkort?',
            options: ['Administrere USB-tilkoblinger', 'Kontrollere lydutgang', 'Koordinere kommunikasjonen mellom CPU og systemkomponenter', 'Administrere trådløse nettverksforbindelser'],
            answer: 2
        },
        {
            question: 'Hvilken type port brukes vanligvis til å koble en skjerm til en datamaskin?',
            options: ['USB (Universal Serial Bus)', 'HDMI (High-Definition Multimedia Interface)', 'Ethernet', 'SATA (Serial Advanced Technology Attachment)'],
            answer: 1
        },
        {
            question: 'Hva er funksjonen til en CPU-kjøler i en datamaskin?',
            options: ['Å forhindre overoppheting av CPUen', 'Å forbedre grafikkytelsen', 'Å øke hastigheten på dataoverføring', 'Å forbedre nettverkssikkerheten'],
            answer: 0
        },
        {
            question: 'Hva er formålet med en nettverkskort i en datamaskin?',
            options: ['Å administrere strømforsyningen til systemet', 'Å koble datamaskinen til et nettverk', 'Å administrere lagring av data', 'Å forbedre lydkvaliteten'],
            answer: 1
        },
        {
            question: 'Hvilken type minne er ikke-flyktig og brukes til permanent lagring av data selv når datamaskinen er slått av?',
            options: ['RAM (Random Access Memory)', 'ROM (Read-Only Memory)', 'Cache-minne', 'Virtuelt minne'],
            answer: 1
        },
        {
            question: 'Hva er funksjonen til en SATA-port på et hovedkort?',
            options: ['Å koble datamaskinen til et nettverk', 'Å koble til interne lagringsenheter som harddisker og SSDer', 'Å administrere lydutgang', 'Å administrere USB-tilkoblinger'],
            answer: 1
        },
        {
            question: 'Hva er formålet med en M.2-kontakt på et hovedkort?',
            options: ['Å koble eksterne enheter til datamaskinen', 'Å administrere trådløse nettverksforbindelser', 'Å koble til eksterne skjermer', 'Å koble til raske PCIe-baserte lagringsenheter som SSDer'],
            answer: 3
        },
        {
            question: 'Hva er forskjellen mellom en mekanisk harddisk (HDD) og en Solid State Drive (SSD)?',
            options: ['HDDer er raskere enn SSDer', 'HDDer har bevegelige deler, mens SSDer ikke har det', 'SSDer har mindre lagringskapasitet enn HDDer', 'SSDer er mer sårbare for fysiske skader enn HDDer'],
            answer: 1
        }
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
            button.addEventListener('click', () => handleAnswer(button, index));
            optionsElement.appendChild(button);
        });
        nextBtn.classList.add('hidden');
    }

    function handleAnswer(button, selectedIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedIndex === currentQuestion.answer) {
            button.classList.add('correct');
            score++;
            scoreValueElement.textContent = score;
        } else {
            button.classList.add('incorrect');
            // Vis riktig svar
            optionsElement.children[currentQuestion.answer].classList.add('correct');
        }
        // Deaktiver alle knapper etter valg
        Array.from(optionsElement.children).forEach(btn => {
            btn.disabled = true;
        });
        nextBtn.classList.remove('hidden');
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            questionElement.textContent = 'Quiz ferdig!';
            optionsElement.innerHTML = '';
            nextBtn.classList.add('hidden');
            scoreElement.classList.remove('hidden');
        }
    });

    displayQuestion();
});
