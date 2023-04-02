import { ISerie } from "./ISerie";

export interface ISerieList {
    available: number;
    returned: number;
    collectionURI: string;
    items: Array<ISerie>;
}
