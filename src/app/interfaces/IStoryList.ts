import { IStory } from "./IStory";

export interface IStoryList {
    available: number;
    returned: number;
    collectionURI: string;
    items: Array<IStory>;
}
