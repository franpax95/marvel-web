import { IEvent } from "./IEvent";

export interface IEventList {
    available: number;
    returned: number;
    collectionURI: string;
    items: Array<IEvent>;
}
