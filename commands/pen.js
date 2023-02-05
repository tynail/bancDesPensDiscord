const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pen")
    .setDescription("2 min pour joke de marde! ")
    .addUserOption((option) =>
      option.setName("target").setDescription("The member to give a 2 min to")
    )
    // add time option
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The time to give the member in secondes")
    ),

  async execute(interaction) {
    const member = interaction.options.getMember("target");

    const toVoiceChannel =
      interaction.guild.channels.cache.get("621712907167727617");

    // "1071141606926856403" ban des pens FJJ
    // 621712907167727617 Whale of Anus satanisme

    const timeOfpen = (interaction.options.getInteger("time") ?? 30) * 1000;

    // Move the member to the toVoiceChannel
    await member.voice.setChannel(toVoiceChannel);

    // wait x secondes and move the member back to their original channel
    setTimeout(async () => {
      await member.voice.setChannel(member.voice.channel);
    }, timeOfpen);

    return interaction.reply({
      content: `You have given ${timeOfpen / 1000} secondes to: ${
        member.user.username
      }`,
    });
  },
};
