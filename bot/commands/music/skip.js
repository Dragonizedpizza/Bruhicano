const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
  name: "skip",
  aliases: ["sk"],
  cooldown: 20,
  async run(message, args) {
    if (!message.member.voice.channel)
      if (!message.member.voice.channel)
        return message.channel.sendError(
          message,
          "Not in A Voice Channel.",
          "Please join a voice channel to play music."
        );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.sendError(
        message,
        "Different Voice Channel.",
        "Please join the same voice channel as me."
      );

    if (!client.player.getQueue(message))
      return message.channel.sendError(
        message,
        "No Music is Playing.",
        "Please join a voice channel to play music."
      );

    const success = message.client.player.skip(message);

    if (success)
      await message.channel.sendSuccess(
        message,
        "Skipped.",
        "I have successfully skipped that song."
      );
  },
});
