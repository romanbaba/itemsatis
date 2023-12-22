const { CommandHandler, EventHandler } = require('djs-bot-base');
const { Client } = require('discord.js');

const commands = new CommandHandler({ slashCommandsDir: './example/commands' });
const events = new EventHandler({ eventsDir: './example/events' });

const client = new Client({
  intents: [],
  partials: [],
});

const token = '';

(async () => {
  await commands.setSlashCommands();

  await events.setEvents(client);
  commands.setDefaultSlashHandler(client);
  
  await client.login(token);
  await commands.registerSlashCommands(client);
})();