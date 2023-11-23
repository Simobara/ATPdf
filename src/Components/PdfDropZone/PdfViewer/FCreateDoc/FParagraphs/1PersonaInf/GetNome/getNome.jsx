import { Paragraph, TextRun } from 'docx';
import { nomiMaschili } from './NomiMaschili/nomiMaschili';
import { nomiFemminili } from './NomiFemminili/nomiFemminili';
import nlp from 'compromise';

const allNamesSet = new Set([...nomiMaschili, ...nomiFemminili]);

const nameKeywords = [
    "nome", "name", "cognome", "surname", "sobrenome", "apellido"
];

const analyzeTextWithNER = (origText) => {
    const doc = nlp(origText);
    return doc.people().out('array').filter(name => {
        const nameParts = name.split(' ').map(part => part.trim());
        return nameParts.some(part => allNamesSet.has(part));
    });
};

const isKnownName = (name) => allNamesSet.has(name);

const extractNomeFromKeywords = (origText) => {
    for (let keyword of nameKeywords) {
        const regex = new RegExp(`\\b${keyword}\\b\\s+(\\w+(?:\\s+\\w+)?)`, "i");
        const match = origText.match(regex);
        if (match && match[1]) {
            const possibleNameParts = match[1].split(' ').map(part => part.trim());
            if (possibleNameParts.some(part => allNamesSet.has(part))) {
                return match[1];
            }
        }
    }
    return "";
};

const extractNome = (origText) => {
    let nomeCognome = extractNomeFromKeywords(origText);
    if (nomeCognome) {
        return nomeCognome;
    }

    const validNames = analyzeTextWithNER(origText);
    let nome = "";
    let cognome = "";
    for (const name of validNames) {
        const parts = name.split(' ');
        if (parts.length >= 2) {
            if (isKnownName(parts[0])) {
                nome = parts[0];
                cognome = parts[1];
            } else if (isKnownName(parts[1])) {
                nome = parts[1];
                cognome = parts[0];
            }
        }
        if (nome && cognome) break;
    }
    return (`${nome || "Non trovato"} ${cognome || "Non trovato"}`);
};

export const getNome = async (origText) => {
    const nome = extractNome(origText);
    return new Paragraph({
        alignment: "left",
        children: [
            new TextRun(`Nome: ${nome ? nome : " / "}`)
        ]
    });
};
