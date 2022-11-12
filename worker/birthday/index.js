const { Client, MessageEmbed } = require("discord.js");
const { schedule, ScheduledTask } = require('node-cron');
const path = require("path");
const Logger = require("../../structures/Logger");

const dataUsers = require("./data.json")
const logger = new Logger(path.join(__dirname, "..", "Logs.log"));

/**
 * 
 * @param {Client} client 
 */
async function main(client) {
    dataUsers.users.forEach((currentUser) => {
        createCron(currentUser, client)
    })
}

/**
 * 
 * @param {{
 * id: string
 * cronString: string
 * specialMessage: string
 * image: string
 * }} currentUser
 * @param { Client } client
 * @returns { ScheduledTask }
 */
function createCron(currentUser, client) {
    return schedule(currentUser.cronString, async () => {

        logger.log(`Worker, ${currentUser.id} birthday event`)

        let { defaultMessage = [], defaultImages = [] } = dataUsers;
        let [indexMessage = 0, indexImage = 0] = [randomIndex(defaultMessage), randomIndex(defaultImages)]

        let defaultValues = {
            defaultMessage: defaultMessage[indexMessage],
            defaultImage: defaultImages[indexImage]
        }

        const { ServerID, ChannelID } = client.botconfig.Birthday;

        let server = await client.guilds.fetch(ServerID);
        let channel = await client.channels.cache.get(ChannelID);
        let userData = await server.members.fetch(currentUser.id)

        let embed = new MessageEmbed();

        embed.setTitle(`🎉  Feliz Cum ${userData?.nickname || userData.user.username}  🎉`)
        embed.setDescription(currentUser?.specialMessage || defaultValues.defaultMessage)
        embed.setImage(currentUser?.image || defaultValues.defaultImage)
        embed.setColor(0xf9f900)

        channel
            .send({ embed })
            .catch(() => logger.log(`Error on Worker ${currentUser.id}`))

    }, { timezone: 'America/Buenos_Aires' })
}

function randomIndex(list) {
    return Math.floor(Math.random() * list.length)
}

module.exports = main;