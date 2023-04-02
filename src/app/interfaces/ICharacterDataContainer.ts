import { ICharacter } from "./ICharacter";

export interface ICharacterDataContainer {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<ICharacter>;
}
