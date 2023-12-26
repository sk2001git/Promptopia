// GET (read) - Reading 1 specific prompt from the current user
import {connectToDB} from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    // Once the Promise is resolved, the code extracts the values of prompt and tag from the resolved JSON object. This syntax is called object destructuring, where it creates variables prompt and tag based on the properties with the same names in the resolved JSON object.
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
}

// DELETE (delete)

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500})
    }
}

