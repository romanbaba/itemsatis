const { CommandHandler, EventHandler } = require('djs-bot-base');
const { Client } = require('discord.js');

const commands = new CommandHandler({ slashCommandsDir: './commands' });
const events = new EventHandler({ eventsDir: './events' });

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
