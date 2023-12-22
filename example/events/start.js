const { Event } = require('djs-bot-base');

module.exports = new Event({
    categoryName: 'ready',
    runOrder: 1, 
    async run(client) {
        console.log(`${client.user.username} logged in Discord.`)
    },
  });