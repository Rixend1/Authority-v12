
const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(Tuomainen => message.member.roles.cache.has(Tuomainen)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **İsim değiştirmek için bir kişi etiketlemelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

const isim = args[1];
const yaş = args[2];
if(!isim) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **İsim değiştirmek için bir isim belirtmelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))
if(!yaş) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **İsim değiştirmek için için bir yaş belirtmelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))
if(isNaN(yaş)) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Belirttiğin yaş rakamlardan oluşmalı!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

etiketlenenKişi.setNickname(`${ayarlar.tag} ${isim} ${ayarlar.sembol} ${yaş}`)

message.react(client.emojis.cache.get(ayarlar.yes))

const Tuomainen = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Kullanıcının ismi \`${ayarlar.tag} ${isim} ${ayarlar.sembol} ${yaş}\` olarak değiştirildi!`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

message.channel.send(Tuomainen)

db.push(`isimler.${etiketlenenKişi.id}`, {
İsim: isim,
Yaş: yaş,
Yetkili: message.author.id
})

}
exports.config = {
    name: "isim",
    guildOnly: true,
    aliases: ["i", "nick"]
}