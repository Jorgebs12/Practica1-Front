import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { People } from "../../types.ts";

export const handler: Handlers = { //Se llama asi simepre el handler
   
    GET: async(_req: Request, ctx: FreshContext<unknown, People>) => {

    try {

      //RECUPERA LOS DATOS DEL FORMULARIO, EL NAME TIENE QUE SER EL MISMO QUE LO QUE COGES DEL FORMULARIO DEL SEARCH.TSX
      const url = new URL(_req.url);
      const name = url.searchParams.get("name") || "";

      //SE PONE /?search=${name} para que se busque el nombre que se le pase, el search es por la documentacion de la api
      const people = await Axios.get<Results>(`https://swapi.dev/api/people/?search=${name}`);

      return ctx.render({

        name: people.data.results[0].name,
        height: people.data.results[0].height,
        mass: people.data.results[0].mass,
        gender:people.data.results[0].gender,
        birth_year: people.data.results[0].birth_year,

      });

    } catch (e) {

      console.error(e);
      throw new Error("Ha habido un error, personaje no encontrado");
    }
  },
};

//Se encarga de renderizar la pagina
export default function Page(props: PageProps<People>) {
    try {
  
      const people = props.data;

      return (
        <div class="px-4 py-8 mx-auto bg-[#86efac] flex flex-col items-center justify-center text-4xl ">
            <a href="/search">Back</a>
            
            <p>Name: {people.name}</p>
            <p>Height: {people.height}</p>
            <p>Mass: {people.mass}</p>
            <p>Gender: {people.gender}</p>
            <p>Birth Year: {people.birth_year}</p>

        </div>
      );
    } catch (e) {
  
      return <div>Ha habido un error</div>;
    }
  }
  
