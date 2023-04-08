import { ICharacterDataWrapper } from './../interfaces/ICharacterDataWrapper';
import { ICharacter } from './../interfaces/ICharacter';
import { SettingsService } from 'src/app/services/settings.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError, BehaviorSubject, Subscription, skip, lastValueFrom } from 'rxjs';
import keys from '../../../marvel.json';
import md5 from 'md5';
import { IImage } from '../interfaces/IImage';

@Injectable({
    providedIn: 'root'
})
export class MarvelService {
    /** Marvel endpoint */
    private readonly BASE_URL: string = 'https://gateway.marvel.com';

    /** Elements per 'page' */
    private limit: number = 5;
    /** Current characters offset */
    private page: number = 1;

    /** Collection of characters */
    private characters: Array<ICharacter> = [];
    /** Subject to update observable */
    private charactersSub: BehaviorSubject<Array<ICharacter>> = new BehaviorSubject(this.characters);
    /** Observable to subscribe to watch changes */
    public charactersObs: Observable<Array<ICharacter>> = this.charactersSub.asObservable();

    /** Collection of characters */
    private search: string = '';
    /** Subject to update observable */
    private searchSub: BehaviorSubject<string> = new BehaviorSubject(this.search);
    /** Observable to subscribe to watch changes */
    public searchObs: Observable<string> = this.searchSub.asObservable();
    /** Subscription to the observable */
    private searchSubscription!: Subscription;

    /** To handle search changes (leave some delay to fetch data to give user time to write) */
    private searchInterval: ReturnType<typeof setTimeout> | null = null;

    constructor(private http: HttpClient, private settings: SettingsService) {
        this.searchSubscription = this.searchObs.pipe(skip(1)).subscribe((search: string) => {
            if (this.searchInterval !== null) {
                clearTimeout(this.searchInterval);
            }

            this.setCharacters(this.characters.map(() => null));

            this.searchInterval = setTimeout(() => {
                this.searchInterval = null;

                // Limit can't be greater than 100
                if (this.page * this.limit > 100) {
                    this.page = Math.floor(100 / this.limit);
                }

                this.fetchCharacters({ limit: this.page * this.limit, nameStartsWith: search, offset: 0 })
                    .subscribe(() => {
                        // this.searchInterval = null;
                    });
            }, 250);
        });
    }

    /**
     * Add a character page
     */
    public addCharactersPage(): void {
        if (this.searchInterval === null && this.characters.length >= (this.page - 1) * this.limit) {
            const placeholders: Array<null> = new Array(this.limit).fill(null);
            this.setCharacters([...this.characters, ...placeholders]);

            this.fetchCharacters({ limit: this.limit, nameStartsWith: this.search, offset: this.page * this.limit }).subscribe();
            this.page++;
        }
    }

    /**
     * Fetch characters based on the options
     */
    public fetchCharacters(options: { limit: number, nameStartsWith: string, offset: number }): Observable<ICharacterDataWrapper> {
        const { limit, nameStartsWith, offset } = options;

        const auth = this.auth(1);
        const query = this.query({ limit, nameStartsWith, offset });

        return this.http
            .get<ICharacterDataWrapper>(`${this.BASE_URL}/v1/public/characters?${auth}&${query}`)
            .pipe(
                tap(({ data }) => {
                    const { results } = data;

                    this.setCharacters([
                        ...this.characters.filter(character => character !== null).slice(0, offset), 
                        ...results
                    ]);
                }),
                catchError(this.handleError)
            );
    }

    /**
     * Obtain a character already loaded in the application.
     * If it can't find it, it asks marvel for it.
     */
    public async getCharacter(id: number): Promise<ICharacter | null> {
        const index: number = this.characters.findIndex((character: ICharacter) => (character.id === id));

        if (index !== -1) {
            return this.characters[index];
        } else {
            try {
                const auth: string = this.auth(1);
                const query: string = this.query({ limit: 1, nameStartsWith: '', offset: 0 });
                const obs: Observable<ICharacterDataWrapper> = this.http 
                    .get<ICharacterDataWrapper>(`${this.BASE_URL}/v1/public/characters/${id}?${auth}&${query}`)
                    .pipe(catchError(this.handleError));

                const dataWrapper: ICharacterDataWrapper = await lastValueFrom(obs);
                const { data: { results }} = dataWrapper;

                if (results.length > 0) {
                    return results[0];
                }
            } catch(error) {
                /** Error handling stuff */
            }
        }

        return null;
    }

    /**
     * Shortcut to get image src easily
     */
    public getSrc(image: IImage): string {
        return `${image.path}.${image.extension}`;
    }


    /********************************************************************************************************************/

    /**
     * Return the Marvel API authorization hash 
     */
    private auth(ts: number): string {
        return `ts=${ts}&apikey=${keys.public}&hash=${this.hash(ts)}`
    }

    /**
     * Handle subscription errors
     */
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage);
    }

    /**
     * Generate the hash necessary for marvel APi
     */
    private hash(ts: number): string {
        return md5(`${ts}${keys.private}${keys.public}`);
    }

    /**
     * Generate the query
     */
    private query(params: { limit?: number, nameStartsWith?: string, offset?: number } = {}) {
        const { limit, nameStartsWith, offset } = params;

        let sanitized: { limit?: number, nameStartsWith?: string, offset?: number } = { 
            offset,
            limit: limit > 0 ? limit : this.limit
        };

        if (nameStartsWith !== '') {
            sanitized.nameStartsWith = nameStartsWith;
        }

        return Object.entries(sanitized) 
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
    }

    /**
     * Set the characters passed as argument
     */
    public setCharacters(characters: Array<ICharacter>): void {
        this.characters = characters;
        this.charactersSub.next(this.characters);
    }

    /**
     * Set the serach string passed as argument
     */
    public setSearch(search: string): void {
        this.search = search;
        this.searchSub.next(this.search);
    }
}
