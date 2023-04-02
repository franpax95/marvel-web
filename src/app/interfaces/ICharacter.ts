import { IEventList } from './IEventList';
import { IStoryList } from './IStoryList';
import { IComicList } from './IComicList';
import { IImage } from './IImage';
import { IUrl } from "./IUrl";
import { ISerieList } from './ISerieList';

export interface ICharacter {
    id: number;
    name: string;
    description: string;
    modified: Date;
    resourceURI: string;
    urls: Array<IUrl>;
    thumbnail: IImage;
    comics: IComicList; 
    stories: IStoryList; 
    events: IEventList; 
    series: ISerieList; 
    loading?: boolean;
}
