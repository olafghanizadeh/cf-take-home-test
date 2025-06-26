import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const query = await context.cloudflare.env.DB.prepare("SELECT subject, id FROM cases ORDER BY id ASC").all();

  const { results } = query;

  return { results };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { results } = loaderData;
  return (
    <div>
      {results.length > 0 ? results.map((result) => (
        <Link to={`/case/${result.id}`} key={result.id} className="grid grid-cols-[50px_1fr_25px] items-center gap-6 hover:bg-stone-100 hover:text-stone-500 rounded-md transition-colors p-4">
          <span className="text-stone-900 text-6xl font-bold">{result.id}</span>
          <h2 className="text-2xl font-bold">{result.subject}</h2>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>

        </Link>
      )) : <p className="text-2xl font-bold">No cases found</p>}
    </div>
  );
}
