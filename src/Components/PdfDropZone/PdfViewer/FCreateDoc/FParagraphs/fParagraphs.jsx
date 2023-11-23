// import { getNome } from './1PersonaInf/GetNome/getNome';
// import { getTel } from './1PersonaInf/GetTelefono/getTelefono';
// ----------------------------------------------------RICHESTE
import { getPro } from './1PersonaInf/1GetProfilo/getProfilo';
import { getDob } from './1PersonaInf/2GetDob/getDob';
import { getNaz } from './1PersonaInf/3GetNazionalita/getNazionalita';
import { getLoc } from './1PersonaInf/4GetLocalita/getLocalita';
import { getEspLav } from './2EsperienzeLavorativ/esperienzeLavorative'
import { getIstEFor } from './3IstruzioneEFormazion/istruzioneEFormazione';
import { getUltInf } from './4UlterioriInformazion/ulterioriInformazioni';
import { getComOrgEGes } from './5CompetenzeOrganizzativeEGestional/competenzeOrgEGes';
import { getCapEComRel } from './6CapacitaECompetenzeRelazional/capacitaECompetenzeRelazionali';
import { getCapEComTec } from './7CapacitaECompetenzeTecnich/capacitaECompetenzeTecniche';
import { getAltCap } from './8AltreCapacit/altreCapacita';
import { getPat } from "./9Patent/patente";
import { getAutDatPer } from "./10AutorizzazioneDatiPers/autorizzazioneDatiPers";

// ---------------------------------------------------------------------MAIN
export const personaInf = async (origText) => {
    return [
        // await getNome(origText),
        // await getTel(origText),
        // -----------RICHIESTE
        await getPro(origText),
        await getDob(origText),
        await getNaz(origText),
        await getLoc(origText)
    ];
}

export const esperienzeLavorativ = async (origText) => {
    return [
        await getEspLav(origText),
    ]
}
//Da… a ….
//Da… a ….
//Da… a ….
// await espLav(),

export const istruzioneEFormazion = async (origText) => {
    return [
        await getIstEFor(origText),
    ]
}
// Da… a ….
// Da… a ….
// await getIstFor(origText);

export const ulterioriInformazion = async (origText) => {
    return [
        await getUltInf(origText),
    ]
}
//Lingua Madre: 
// Altre Lingue: (tabella)
// Comprensione Parlato Scritto Ascolto Lettura Interazione Orale Produzione orale
// A1 A1 A1 A1 A1 A1 A1
// METRO DI MISURA: 
// Suffiente A1 A2, 
// discreto B1, 
// intermedio buono B2, 
// ottimo C1, 
// eccellente c2 
// await ulterInfo(),

export const competenzeOrganizzativeEGestional = async (origText) => {
    return [
        await getComOrgEGes(origText),
    ]
}

export const capacitaECompetenzeRelazional = async (origText) => {
    return [
        await getCapEComRel(origText),
    ]
}

export const capacitaECompetenzeTecnich = async (origText) => {
    return [
        await getCapEComTec(origText),
    ]
}

export const altreCapacit = async (origText) => {
    return [
        await getAltCap(origText),
    ]
}

export const patent = async (origText) => {
    return [
        await getPat(origText),
    ]
}

export const autorizzazioneDatiPersonal = async (origText) => {
    return [
        await getAutDatPer(origText),
    ]
}


