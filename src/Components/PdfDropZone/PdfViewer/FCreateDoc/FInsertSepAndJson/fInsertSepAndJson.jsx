// eslint-disable-next-line
const sectionsKeywords = [
    {
        section1: "personaInfo",
        keywords: []

    },
    {
        section2: "esperienzeLavorative",
        keywords: [
            "Attività lavorativa", "Work activity",
            "Attività lavorative", "Work activities",
            "Background lavorativo", "Work background",
            "Carriera", "Career",
            "Esperienza lavorativa", "Work experience",
            "Esperienze lavorative", "Work experiences",
            "Esperienza professionale", "Professional experience",
            "Esperienze professionali", "Professional experiences",
            "Incarichi lavorativi", "Work assignments",
            "Occupazione", "Occupation",
            "Occupazioni", "Occupations",
            "Percorso professionale", "Professional career path",
            "Posizione lavorativa", "Job position",
            "Posizioni Lavorative", "Job positions",
            "Storia lavorativa", "Work history",
            "Storia professionale", "Professional history"
        ]
    },
    {
        section3: "istruzioneEFormazione",
        keywords: ["Education"]
    },
    {
        section4: "ulterioriInformazioni",
        keywords: []
    },
    {
        section5: "competenzeOrganizzativeEGestionali",
        keywords: []
    },
    {
        section6: "capacitaECompetenzeRelazionali",
        keywords: ["rapporto"]
    },
    {
        section7: "capacitaECompetenzeTecniche",
        keywords: []
        //"C++"
    },
    {
        section8: "altreCapacita",
        keywords: ["determinato"]
    },
    {
        section9: "patenti",
        keywords: [
            "patente", "driver's license",
            "patenti", "driver's licenses",
            "licenza di guida", "driver s license",
            "licenze di guida", "driver s licenses",
            "carta di guida", "driver's card",
            "carte di guida", "driver's cards",
            "permesso di guida", "driving permit",
            "permessi di guida", "driving permits",
            "Tessera di guida", "driving card",
            "tessere di guida", "driving cards"
        ]
    },
    {
        section10: "autorizzazioneDatiPersonali",
        keywords: [
            "Autorizzazione", "Authorization",
            "Autorizzazioni", "Authorizations",
            "Dichiarazione", "Declaration",
            "Dichiarazioni", "Declarations",
            "Permesso", "Permit",
            "Permessi", "Permits",
            "Consenso", "Consent",
            "Consensi", "Consents",
            "Concessione", "Concession",
            "Concessioni", "Concessions",
            "Assenso", "Assent",
            "Assensi", "Assents"
        ]
    }
];

export const insertSeparatorsAndJson = (originalText) => {
    const createCaseInsensitiveRegex = (word) => new RegExp(`\\b${word}\\b`, 'gi');
    let textWithMarkers = originalText;

    // Assicurati che sectionsKeywords sia definito e sia un array
    if (!Array.isArray(sectionsKeywords)) {
        throw new Error('sectionsKeywords must be an array');
    }

    // Sostituisci le parole chiave con i marcatori di sezione
    sectionsKeywords.forEach((section) => {
        const sectionNumber = Object.keys(section).find(key => key.startsWith('section')).replace(/[^\d]/g, '');
        const keywords = section.keywords;
        keywords.forEach(keyword => {
            const regex = createCaseInsensitiveRegex(keyword);
            textWithMarkers = textWithMarkers.replace(regex, (match) => `###${sectionNumber}###${match}`);
        });
    });

    // Divide il testo marcato in sezioni basate sui separatori inseriti
    const splitSections = textWithMarkers.split(/(###\d+###)/);
    let sectionsArray = [];
    let currentSectionContent = [];
    let currentSectionNumber = '';

    splitSections.forEach((element) => {
        if (element.startsWith('###')) {
            // Se c'è contenuto nella sezione corrente, salva la sezione
            if (currentSectionContent.length > 0) {
                sectionsArray.push({ sectionNumber: currentSectionNumber, content: currentSectionContent });
                currentSectionContent = [];
            }
            // Inizia una nuova sezione
            currentSectionNumber = element.match(/###(\d+)###/)[1];
        } else {
            // Aggiungi il testo alla sezione corrente
            currentSectionContent.push(element.trim());
        }
    });

    // Aggiungi l'ultima sezione se necessario
    if (currentSectionContent.length > 0) {
        sectionsArray.push({ sectionNumber: currentSectionNumber, content: currentSectionContent });
    }

    return sectionsArray; // array di sezioni
};

