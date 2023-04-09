import { IComic } from "./IComic";

export interface IComicDataContainer {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<IComic>;
}
