export interface Production {
    _id: string;
    name: string,
    rating: number,
    genre: string[],
    director: string,
    writer: string,
    cast: string[],
    release: string,
    runtime: number,
    best_movie: boolean,
    best_serie: boolean,
    premier_movie: boolean,
    new_serie: boolean,
    type_prod: number,
    poster: string,
    banner: string,
    classification: string
  }