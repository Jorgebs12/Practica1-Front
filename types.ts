export type People = {

    name: string,
    height: string,
    mass: string,
    gender: string,
    birth_year: string

};

export type Data = {

    name: string

};

export type Results = {
    
    results: People[]
};

export type Starships = {

    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
};


export type StarshipsPage = {
    
    page:string;
    results: Starships[];
  };