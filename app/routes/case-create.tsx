import { redirect, useNavigation } from "react-router";
import { Form } from "react-router";
import { z } from "zod/v4";
import type { Route } from "./+types/case-create";

const schema = z.object({
    subject: z.string().min(1),
    question: z.string().min(1),
    answer: z.string().min(1),
    comments: z.string().optional(),
});

export async function action({ request, context }: Route.ActionArgs) {

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const result = schema.safeParse(data);


    if (result.success) {

        const { subject, question, answer, comments } = result.data;

        const query = await context.cloudflare.env.DB.prepare("INSERT INTO cases (subject, question, answer, comments) VALUES (?, ?, ?, ?) RETURNING id").bind(subject, question, answer, comments).run();

        const { results } = query;
        const [lastInsertId] = results;

        if (lastInsertId) {
            return redirect(`/case/${lastInsertId.id}`);
        }

    }

}


export default function CaseCreate() {

    const navigation = useNavigation();

    return (<div className="flex flex-col gap-6 w-full">
        <h1 className="text-2xl font-bold">Create Case</h1>
        <Form method="post" className="flex flex-col gap-6 w-full">
            <input className="border border-gray-300 rounded-md p-4" type="text" name="subject" placeholder="Subject" />
            <input className="border border-gray-300 rounded-md p-4" type="text" name="question" placeholder="Question" />
            <textarea className="border border-gray-300 rounded-md p-4" name="answer" placeholder="Answer" />
            <textarea className="border border-gray-300 rounded-md p-4" name="comments" placeholder="Comments" />
            <button type="submit" className="bg-blue-500 text-white p-4 rounded-md cursor-pointer hover:bg-blue-600" disabled={navigation.state === "submitting"}>
                {navigation.state === "submitting" ? "Creating..." : "Create"}
            </button>
        </Form>
    </div>);
}