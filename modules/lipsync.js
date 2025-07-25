import {LipsyncEn} from "./lipsync-en.mjs";
import {LipsyncFi} from "./lipsync-fi.mjs";
import {LipsyncLt} from "./lipsync-lt.mjs";
import {LipsyncFr} from "./lipsync-fr.mjs";

export function lipsyncGetProcessor(lang) {
    switch (lang) {
        case "en":
            return new LipsyncEn();
        case "fi":
            return new LipsyncFi();
        case "lt":
            return new LipsyncLt();
        case "fr":
            return new LipsyncFr();
        default:
            return new LipsyncEn();
    }
}
