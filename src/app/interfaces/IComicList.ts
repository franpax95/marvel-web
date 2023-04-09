import { IComicSummary } from "./IComicSummary";

export interface IComicList {
    available: number;
    returned: number;
    collectionURI: string;
    items: Array<IComicSummary>;
}
