const { Structures, APIMessage, MessageEmbed } = require("discord.js");

module.exports = Structures.extend(
  "Message",
  (Message) =>
    class HurricanoMessage extends Message {
      constructor(...args) {
        super(...args);
      }
      async reply(content, options) {
        const reference = {
          message_id:
            (!!content && !options
              ? typeof content === "object" && content.messageID
              : options && options.messageID) || this.id,
          message_channel: this.channel.id,
        };

        const { data: parsed, files } = await APIMessage.create(
          this,
          content,
          options
        )
          .resolveData()
          .resolveFiles();

        this.client.api.channels[this.channel.id].messages.post({
          data: { ...parsed, 
            message_reference: reference, 
            allowed_mentions: {
              replied_user: options && options.mentionUser ? options.mentionUser : this.client.allowedMentions?.repliedUser ?? false
          }}});
      }
      async sendErrorReply(Header, Msg, Footer, Fields) {
        const embed = new MessageEmbed()
          .setAuthor(
            Header,
            "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Error.png"
          )
          .setColor("RED");
        if (Msg) {
          embed.setDescription(Msg);
        }
        if (Footer) {
          embed.setFooter(Footer, this.author.displayAvatarURL());
        } else {
          embed.setFooter(this.author.username, this.author.displayAvatarURL());
        }
        if (Fields) embed.addFields(Fields);
        const msg = this.reply(embed);
        return msg;
      }
      async sendSuccessReply(Header, Msg, Footer, Fields) {
        const embed = new MessageEmbed()
          .setAuthor(
            Header,
            "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
          )
          .setColor("GREEN");
        if (Msg) {
          embed.setDescription(Msg);
        }
        if (Footer) {
          embed.setFooter(Footer, this.author.displayAvatarURL());
        } else {
          embed.setFooter(this.author.username, this.author.displayAvatarURL());
        }
        if (Footer) {
          embed.setFooter(Footer, this.author.displayAvatarURL());
        } else {
          embed.setFooter(this.author.username, this.author.displayAvatarURL());
        }
        if (Fields) embed.addFields(Fields);
        const msg = this.reply(embed);
        return msg;
      }
    }
);
