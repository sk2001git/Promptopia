import {connectToDB} from '@utils/database';
import Prompt from '@models/prompt';


// Dynamic routing since we are using specific session id to fetch prompts
// represented by [id] as a file navigation, the params will contain information about user
export const GET = async (request, { params } ) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({creator: params.id}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}