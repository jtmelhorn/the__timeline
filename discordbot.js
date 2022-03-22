import DiscordJS, { Intents } from 'discord.js';
import { Configuration, OpenAIApi } from 'openai';
import 'dotenv/config'

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


const configuration = new Configuration({
    apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);


client.on('message', async(message) => {
    var completion = await openai.createCompletion("text-davinci-001", {
        prompt: "Generate a weird task."
    })


    if (message.content.includes('fulfill the timeline')) {
        message.reply({
            content: `${completion.data.choices[0].text}`
        })


    }

})


client.login(DISCORD_TOKEN)