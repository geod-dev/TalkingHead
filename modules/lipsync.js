import {LipsyncEn} from "./lipsync-en.mjs";
import {LipsyncFi} from "./lipsync-fi.mjs";
import {LipsyncLt} from "./lipsync-lt.mjs";
import {LipsyncFr} from "./lipsync-fr.mjs";

export function lipsyncGetProcessor(lang) {
    switch (lang) {
        case "en":
            return LipsyncEn();
        case "fi":
            return LipsyncFi();
        case "lt":
            return LipsyncLt();
        case "fr":
            return LipsyncFr();
        default:
            return LipsyncEn();
    }
}
