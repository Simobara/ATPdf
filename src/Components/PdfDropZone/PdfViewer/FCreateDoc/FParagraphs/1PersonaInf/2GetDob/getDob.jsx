import { Paragraph, TextRun } from 'docx';

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const extractDob = (text) => {
    const sectionKeywords = ["informazioni personali", "dati personali", "personal information", "personal details"];
    const keywords = ["data di nascita", "nato il", "nata il", "nascita", "compleanno", "età", "eta'", "age"];
    let dob = null;
    const normalizedText = removeAccents(text.toLowerCase());
    const findPersonalSection = () => {
        for (const keyword of sectionKeywords) {
            if (normalizedText.includes(removeAccents(keyword.toLowerCase()))) {
                return true;
            }
        }
        return false;
    }
    if (findPersonalSection()) {
        for (const keyword of keywords) {
            const normalizedKeyword = removeAccents(keyword.toLowerCase());
            if (normalizedText.includes(normalizedKeyword)) {
                const line = normalizedText.split('\n').find(line => line.includes(normalizedKeyword));
                const dateMatch = line.match(/\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b/);
                if (dateMatch) {
                    dob = dateMatch[1];
                    break;
                } else {
                    const ageMatch = line.match(/\b(?:eta|eta'|age)\s*[:\s]\s*(\d{1,2})\b/);
                    if (ageMatch && parseInt(ageMatch[1], 10) >= 16 && parseInt(ageMatch[1], 10) <= 60) {
                        dob = keyword === "age" ? `(Age: ${ageMatch[1]})` : `(Età: ${ageMatch[1]})`;
                        break;
                    }
                }
            }
        }
    }
    return dob;
}



export const getDob = async (origText) => {
    const dob = await extractDob(origText);
    return new Paragraph({
        alignment: "left",
        children: [
            new TextRun(`Data di Nascita: ${dob ? dob : " / "}`)
        ]
    });
};
