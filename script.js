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
            quizSection.innerHTML = '<h2>Quiz fullført!</h2><p>Din endelige poengsum er: ' + score + ' av 14 poeng</p>';
        }
    });

    // Start quiz ved lasting av siden
    displayQuestion();

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
        nextBtn.style.display = 'block'; // Viser knappen etter svar
    }
    
    nextBtn.style.display = 'none'; // Skjuler knappen initialt
    
});
