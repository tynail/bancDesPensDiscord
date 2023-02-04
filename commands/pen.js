const { SlashCommandBuilder, VoiceChannel } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pen")
    .setDescription("2 min pour joke de marde! ")
    .addUserOption((option) =>
      option.setName("target").setDescription("The member to give a 2 min to")
    )
    .addChannelOption((option) =>
      option
        .setName("ban-des-pens")
        .setDescription("The channel to move the member to")
    )
    // add time option
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The time to give the member in secondes")
    ),

  async execute(interaction) {
    const member = interaction.options.getMember("target");

    console.log("🦧", member.voice.channel);
    // const toVoiceChannel = interaction.options.getChannel("ban-des-pens");

    const channel = interaction.guild.channels.cache.get("1071141606926856403");

    // FInd a way to hardcode the channel id
    const timeOfpen = (interaction.options.getInteger("time") ?? 30) * 1000;

    // Move the member to the toVoiceChannel
    await member.voice.setChannel(channel);

    // wait x secondes and move the member back to their original channel
    setTimeout(async () => {
      await member.voice.setChannel(member.voice.channel);
    }, timeOfpen);

    return interaction.reply({
      content: `You have given ${timeOfpen / 1000} min to: ${
        member.user.username
      }`,
      ephemeral: true,
    });
  },
};
