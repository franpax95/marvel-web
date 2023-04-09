import { IComicDataContainer } from './IComicDataContainer';

export interface IComicDataWrapper {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: IComicDataContainer;
    etag: string;
}
