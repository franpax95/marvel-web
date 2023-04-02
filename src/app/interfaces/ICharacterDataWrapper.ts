import { ICharacterDataContainer } from "./ICharacterDataContainer";

export interface ICharacterDataWrapper {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: ICharacterDataContainer;
    etag: string;
}
