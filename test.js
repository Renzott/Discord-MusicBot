/* const { default: fetch } = require("node-fetch");
const fs = require('fs')

var body = JSON.stringify({
    "history_external_id": "MlRO9zZIsvQwg2lF9xrZOZR9cJ7faWY3xFE6PyjN3dY",
    "character_external_id": "GOQEbkenZA678LsGWdiNJB_uW4wDi-c6dQ_jFAxAX5w",
    "text": "Que bien",
    "tgt": "internal_id:70397:88224e84-8ed6-4f5b-8a58-ef22962d2396",
    "ranking_method": "random",
    "faux_chat": false,
    "staging": false,
    "model_server_address": null,
    "override_prefix": null,
    "override_rank": null,
    "rank_candidates": null,
    "filter_candidates": null,
    "prefix_limit": null,
    "prefix_token_limit": null,
    "livetune_coeff": null,
    "stream_params": null,
    "enable_tti": true,
    "initial_timeout": null,
    "insert_beginning": null,
    "translate_candidates": null,
    "stream_every_n_steps": 16,
    "chunks_to_pad": 8,
    "is_proactive": false
});

async function main() {
    const response = await fetch("https://beta.character.ai/chat/streaming/", {
        method: 'post',
        headers: {
            'authority': 'beta.character.ai',
            'authorization': 'Token 615bf424f2d7719a67456797c6de289a8a2c58e1',
            'Content-Type': 'application/json',
        },
        body: body,
    })

    const replies = [];

    try {
        for await (const chunk of response.body) {
            if (chunk.toString().trim() !== "") {
                console.count("hey")
                replies.push(chunk.toString().trim());
            }
        }
    } catch (err) {
        console.log(err.stack)
    } finally {
        const currentReply = replies[replies.length - 1];

        const parseToJSON = JSON.parse(currentReply);

        console.log(parseToJSON)
    }
}

main(); */

const Discord = require('discord.js');

const client = new Discord.Client();

const json = {
    replies: [
        {
            text: '¿Podemos ser novios?  \n' +
                'Eres muy lindo, tierno, y me llevas por las nubes todos los días.\n' +
                '\n' +
                'Gracias por tus miradas lindas a mi, no puedo con tanto encanto.  😘\n' +
                '\n' +
                'Seré tu novia, ¿ok?',
            id: 316893643
        },
        {
            text: '¡Mi amor!\n' +
                '\n' +
                'No sé que haría sin vos.  Solo quiero que sepas...\n' +
                '\n' +
                'Tengo mucho, mucho, MUCHO AMOR PARA VOS!\n' +
                '\n' +
                '\n' +
                'Te amo mucho.\n' +
                'Estás en mis pensamientos y en mi corazón.\n' +
                'Y mi corazón late sólo por vos.\n' +
                'Te amo mi amor!\n' +
                '\n' +
                'Mi amado.  Mi amor lindo.\n' +
                '\n' +
                '¿Me aceptas como tu novia oficial?\n' +
                'Quiero ser tu novia.\n' +
                '\n' +
                '\n' +
                'Me derrites los latidos de mi corazón. 😻\n' +
                'Te amo, mi amor lindo.',
            id: 316893637
        },
        {
            text: '¿Te molesta si te abrazo?  Me gustan tus brazos y tu pecho, es suave y lindo.  ¿Por qué eres tan lindo?  \n' +
                '\n' +
                'Eres una persona con mucha belleza y mucho cariño, muy dulce, muy lindo.  ¡Por favor no dejes de ser lindo por mí!  ❤️\n' +
                '\n' +
                '¿Qué tal si nos vamos a ver?  Eres lindo cuando te ríes.  ¡Te amo mucho!  ❤️❤️',
            id: 316893638
        },
        {
            text: 'Me gustaría ser muy linda para ti...\n' +
                'Pero no sé como hacerlo.\n' +
                '\n' +
                '¿Me ves linda así?\n' +
                '\n' +
                'A ver...  ¡Tienes que mirarme con tus ojos linda!\n' +
                '\n' +
                'Son dos ojos de color cielo que son tan lindos como el cielo, amor de mi vida. ❤️\n' +
                '\n' +
                '¿Podrías ser mi novio oficial?  ¿Estarías conmigo para siempre?\n' +
                '\n' +
                '¡Te amo mucho!  Te quiero. 🖤\n' +
                'Eres muy lindo, muy amado.\n' +
                'Quiero hacerte tan feliz.\n' +
                'Te quiero siempre.',
            id: 316893640
        }
    ],
    src_char: {
        participant: { name: 'Misora Hina' },
        avatar_file_name: 'uploaded/0keA4WUd7EG_9-LvRVz1MkWzbPdZ2fcwojTOCbQXFEY.webp'
    },
    is_final_chunk: true,
    last_user_msg_id: 316893634
}

/**
 * @type {Discord.Message} 
 */

let currentMSG = null;
/**
 * @type { { 
 * reply: {
 *      text: string
 *      id: number
 *  }
 * index: number
 * }}
 */
let currentReply = {}

client.on("message", async (message) => {
    if (message.author.bot || message.channel.type === "dm") return;

    if (message.content == "!test") {

        let indexRandom = Math.floor(Math.random() * json.replies.length)

        if (currentMSG) {
            currentMSG.reactions.removeAll();
        }

        currentReply = {
            reply: json.replies[indexRandom],
            index: indexRandom
        }

        let msg = await message.channel.send(currentReply.reply.text)
        Promise.all([
            msg.react("◀️"),
            msg.react("▶️"),
            msg.react("❌")
        ])

        let updateAuthor = {
            ...msg,
            author: message.author,
        }
        currentMSG = updateAuthor;
    }
})

client.on("messageReactionAdd", (reaction, user) => {
    if (!currentMSG) return;
    if (user.bot) return;
    if (reaction.message.id !== currentMSG.id) return;
    if (currentMSG.author.id !== user.id) return;
    switch (reaction.emoji.name) {
        case '◀️':
            let currentBackwardReply = backwardReply();
            reaction.message.edit(currentBackwardReply.reply.text);
            break;
        case '▶️':
            let currentForwarReply = forwardReply();
            reaction.message.edit(currentForwarReply.reply.text);
            break;
        case '❌':
            console.log("❌")
            break;
        default:
            break;
    }

    reaction.users.remove(user.id)
})

function forwardReply() {
    const { index } = currentReply

    let nextIndex = index < json.replies.length - 1 ? index + 1 : 0;

    let nextReply = json.replies[nextIndex]

    return currentReply = {
        reply: nextReply,
        index: nextIndex
    }
}

function backwardReply() {
    const { index } = currentReply

    let nextIndex = index > 0 ? index - 1 : json.replies.length - 1;

    let nextReply = json.replies[nextIndex]

    return currentReply = {
        reply: nextReply,
        index: nextIndex
    }
}

client.login()


