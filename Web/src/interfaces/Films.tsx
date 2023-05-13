  export interface ResultsFilmsEntity {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters?: (string)[] | null;
    planets?: (string)[] | null;
    starships?: (string)[] | null;
    vehicles?: (string)[] | null;
    species?: (string)[] | null;
    created: string;
    edited: string;
    url: string;
  }