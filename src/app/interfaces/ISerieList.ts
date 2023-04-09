import { ISerieSummary } from "./ISerieSummary";

export interface ISerieList {
    available: number;
    returned: number;
    collectionURI: string;
    items: Array<ISerieSummary>;
}
