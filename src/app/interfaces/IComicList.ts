import { IComic } from "./IComic";

export interface IComicList {
    available: number;
    returned: number;
    collectionURI: string;
    items: Array<IComic>;
}
