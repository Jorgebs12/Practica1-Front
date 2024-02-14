import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Starships, StarshipsResults, StarshipsPage } from "../../types.ts";

export const handler: Handlers = {
  
  GET: async (_req: Request, ctx: FreshContext<unknown, StarshipsPage>) => {
  
    try {
  
      const url = new URL(_req.url);
      const page = url.searchParams.get("page") || "1";

      const response = await Axios.get<StarshipsResults>(`https://swapi.dev/api/starships/?page=${page}`);

      const starships = response.data.results;

      return ctx.render({results: starships, page});

    } catch (e) {
      console.error(e);
      throw new Error("Ha habido un error");
    }
  },
};

export default function Page(props: PageProps<StarshipsResults>) {
  
  try {

    const { page, results } = props.data;

    return (
      <div>
        <h1>Starships Star Wars</h1>
        <h2 >Page {page}</h2>

        <a href="/"> Back </a>

        {results.map((starship) => (

          <div class="centered">
            
            <h1>{starship.name}</h1>
            <p>Model: {starship.model}</p>
            <p>Manufacturer: {starship.manufacturer}</p>
            <p>Cost: {starship.cost_in_credits}</p>

          </div>
        ))}

        <div>

          <a href = {`/startships?page=${parseInt(page) - 1}`} > Prev  ||  </a>
          <a href = {`/startships?page=${parseInt(page) + 1}`} > Next </a>
          
          <form method="get" action={`/startships?page=${parseInt(page)}`}>
            <input type="text" name="page" />
            <button> Buscar </button>
          </form>

        </div>
      </div>
    );

  } catch (e) {

    return <div> Ha habido un error </div>;
  }
};
