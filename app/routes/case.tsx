import NavigationLink from "~/components/case-navigation-link";
import Markdown from "react-markdown";
import type { Route } from "./+types/case";


export async function loader({ params, context }: Route.LoaderArgs) {
    const { id } = params;

    const query = await context.cloudflare.env.DB.prepare("SELECT * FROM cases WHERE id = ?").bind(id).all();
    const navigationQuery = await context.cloudflare.env.DB.prepare("SELECT id FROM cases ORDER BY id ASC").all();

    if (query.results.length === 0) {
        throw new Response("Not Found", { status: 404 });
    }

    const { results } = query;

    const [result] = results;

    const currentCaseIndex = navigationQuery.results.findIndex((r) => r.id === Number(id));

    const navigation = navigationQuery.results.map((r, i: number) => {
        if (i === navigationQuery.results.length - 1) {
            return {
                previous: r.id - 1,
                next: null
            }
        }
        if (i + 1 === navigationQuery.results.length) {
            return {
                previous: null,
                next: r.id + 1
            }
        }
        return {
            previous: r.id - 1,
            next: r.id + 1
        }
    });

    return { result, navigation: navigation[currentCaseIndex] };
}

export default function Case({ loaderData }: Route.ComponentProps) {
    const { result: { id, question, answer, subject, comments }, navigation } = loaderData;

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex justify-between">
                <NavigationLink to={`/case/${navigation.previous}`} label="Previous" icon="left" disabled={!navigation.previous} />
                <NavigationLink to={`/case/${navigation.next}`} label="Next" icon="right" disabled={!navigation.next} />
            </div>
            <div className="prose prose-lg prose-neutral prose-invert">
                <h1>Case {id} – {subject}</h1>
                <p className="text-3xl font-bold uppercase text-stone-700">Question</p>
                <Markdown>{question}</Markdown>
                <hr />
                <div>
                    <p className="text-3xl font-bold uppercase text-stone-700">Answer</p>
                    <Markdown>{answer}</Markdown>
                </div>
                {comments && (
                    <div>
                        <p className="text-3xl font-bold uppercase text-stone-700">Comments</p>
                        <Markdown>{comments}</Markdown>
                    </div>
                )}
            </div>
        </div>
    )
}