const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageUpdate",
  run: async (oldMessage, newMessage, client) => {
    if (newMessage.webhookID) return;
    let cacheCheck = oldMessage.channel.messages.cache.get(oldMessage.id);
    if (newMessage.member && cacheCheck) {
      client.emit("message", newMessage);
    }
    const guildSchema = client.db.guilds.cache.get(newMessage.guild.id);
    if (guildSchema.messageLogs) {
      const guildChannel = await client.channels
        .fetch(guildSchema.messageLogs)
        .catch(() => {});
      if (!guildChannel) return;
      let embed = new MessageEmbed()
        .setAuthor(
          `Message Edited By ${oldMessage.author.tag}! | (ID: ${oldMessage.author.id})`,
          oldMessage.author.displayAvatarURL()
        )
        .setDescription(
          `${
            newMessage.content.length > 2034
              ? "Message content is larger than 2034 characters!"
              : "**Content:**\n" + newMessage.toString()
          }`
        )
        .addField("Channel:", `<#${newMessage.channel.id}>`)
        .setFooter(
          `Deleted by ${newMessage.author.tag} | ${newMessage.author.id}`
        )
        .setColor("#6082b6");
      newMessage.attachments.first() !== oldMessage.attachments.first()
        ? (() => {
            embed.setImage(newMessage.attachments.first().proxyURL);
            embed.addField("Images:", "New image attached/edited.");
          })()
        : embed.addField("Images:", "No new images attached/edited.");

      guildChannel.send(embed);
    }
  },
};
