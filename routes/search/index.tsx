import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Data } from "../../types.ts";

const Page = (props: PageProps)=>{
    
    return(  
        <div>
        <a href="/">Back</a>
        <h1> Star Wars Character Search</h1>
        <form method="get" action="/people">
            <input type="text" name="name" />
            <button> Search </button>
        </form>
        </div>
    );
};

export default Page;


