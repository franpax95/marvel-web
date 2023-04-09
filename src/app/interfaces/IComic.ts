import { IEventList } from './IEventList';
import { IStoryList } from './IStoryList';
import { IComicSummary } from "./IComicSummary";
import { IImage } from "./IImage";
import { ISerieSummary } from "./ISerieSummary";
import { IUrl } from "./IUrl";

export interface IComic {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    modified: Date;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    // textObjects: Array<ITextObject>;
    resourceURI: string;
    urls: Array<IUrl>;
    series: Array<ISerieSummary>;
    variants: Array<IComicSummary>;
    collections: Array<IComicSummary>;
    collectedIssues: Array<IComicSummary>;
    // dates: Array<IComicDate>;
    // prices: Array<IComicPrice>;
    thumbnail: IImage;
    images: Array<IImage>;
    // creatos: ICreatorList;
    // characters: ICharacterList;
    stories: IStoryList;
    events: IEventList;
}
