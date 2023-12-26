import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', // 1:M relationship, 1 user create multiple prompts
    },
    prompt: {
        type: String, 
        required: [true, 'Prompt is required!'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required!'],
    },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema); // Retrieving a prompt / creating it if it does not exist

export default Prompt;
