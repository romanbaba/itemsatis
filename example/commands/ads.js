const { SlashCommand } = require('djs-bot-base');
const { getAdvertisement } = require('itemsatis');
const { AdvancedEmbed, AdvancedEmbedType } = require('utilscord');
const { EmbedBuilder, Colors, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');

module.exports = new SlashCommand({
    slashCommandData: (builder) => builder
    .setName('ilan')
    .setDescription('İtemsatış üzerinden bir ilan için arama yapabilirsiniz.')
    .addStringOption((input) => input
        .setName('url')
        .setDescription('İlan linki giriniz.')
        .setRequired(true)
    ),
    /** @param {import('discord.js').ChatInputCommandInteraction} interaction  */
    async run(interaction) {
      const url = interaction.options.getString('url', true);

      const ads = await getAdvertisement(url);
      if (!ads) {
        const finalEmbed = new AdvancedEmbed()
            .setInteraction(interaction)
            .setStyle(AdvancedEmbedType.Error)
            .setDescription(
                'İstenilen veri bulunamadı.'
            );
        await interaction.reply({ embeds: [finalEmbed] });
        return;
      }

      const finalEmbed = new EmbedBuilder()
        .setAuthor({
            name: ads.author,
            iconURL: ads.avatarURL,
        })
        .setColor(Colors.Blue)
        .setTitle(ads.title)
        .setDescription(ads.longDescription)
        .setFields([
            {
                name: 'Bilgiler:',
                value: [
                    `\`-\` Ücret: \`${ads.price}\``,
                    `\`-\` Başarılı İşlem: \`${ads.successfulTransaction}\``,
                ].join('\n'),
                inline: true,
            },
            {
                name: '** **',
                value: [
                    `\`-\` Stok: \`${ads.stockCount}\``,
                    `\`-\` Güncelleme: \`${ads.lastUpdate}\``,
                ].join('\n'),
                inline: true,
            },
            {
                name: '\u200B',
                value: '\u200B',
                inline: true,
            },
            {
                name: 'Madalyalar:',
                value: ads.badges ? ads.badges.map((medal) => `\`${medal}\``).join(', ') : 'Bulunmuyor.'
            }
        ]);

        await interaction.reply({
            embeds: [finalEmbed],
            fetchReply: true,
        });
    },
  });