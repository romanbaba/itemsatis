const { SlashCommand } = require('djs-bot-base');
const { getUser } = require('itemsatis');
const { AdvancedEmbed, AdvancedEmbedType } = require('utilscord');
const { EmbedBuilder, Colors, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');

module.exports = new SlashCommand({
    slashCommandData: (builder) => builder
    .setName('kullanıcı')
    .setDescription('İtemsatış üzerinden bir kullanıcı için arama yapabilirsiniz.')
    .addStringOption((input) => input
        .setName('isim')
        .setDescription('İtemsatış üzerinde ki kullanıcı isimi')
        .setRequired(true)
    )
    .addBooleanOption((input) => input
        .setName('mağaza')
        .setDescription('Kullanıcı bir mağaza mı? bu otomatik olarak false olarak işaretlenecek.')
        .setRequired(false)
    ),
    /** @param {import('discord.js').ChatInputCommandInteraction} interaction  */
    async run(interaction) {
      const isAds = interaction.options.getBoolean('mağaza', false) ?? false;
      const username = interaction.options.getString('isim', true);

      const user = await getUser(username, isAds)
      if (!user) {
        const finalEmbed = new AdvancedEmbed()
            .setInteraction(interaction)
            .setStyle(AdvancedEmbedType.Error)
            .setDescription(
                'İstenilen veri bulunamadı, bunun en büyük sebebi kullanıcı mağaza olduğu halde mağaza olduğu belirtilmemesidir.'
            );
        await interaction.reply({ embeds: [finalEmbed] });
        return;
      }

      const finalEmbed = new EmbedBuilder()
        .setAuthor({
            name: user.username,
            iconURL: user.avatarURL
        })
        .setColor(Colors.Blue)
        .setDescription('İsimi girilen İtemsatış kullancısının verileri başarıyla bulundu, detaylı bilgi için aşağıya bakınız.')
        .setFields([
            {
                name: 'Bilgiler:',
                value: [
                    `\`-\` En son görülme: \`${user.lastSeen}\``,
                    `\`-\` Değerlendirme: \`${user.ratingOutOf10}\``,
                    `\`-\` Mağaza Değerlendirme: \`${user.storeRating}\``,
                    `\`-\` Başarılı İşlem: \`${user.successfulTransaction}\``,
                ].join('\n'),
                inline: true,
            },
            {
                name: '** **',
                value: [
                    `\`-\` İlan Sayısı: \`${user.advertisementCount}\``,
                    `\`-\` Takipçiler: \`${user.ratingOutOf10}\``,
                    `\`-\` Oluşturulma Tarih: \`${user.createdAt}\``,
                    `\`-\` Seviye: \`${user.medals ? user.medals[0].name : '0'}\``,
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
                value: user.medals ? user.medals.map((medal) => `\`${medal.name}\``).join(', ') : 'Bulunmuyor.'
            }
        ]);

        await interaction.reply({
            embeds: [finalEmbed],
            fetchReply: true,
        });
    },
  });