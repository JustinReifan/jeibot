//Sc JunaBot-Md By Junaa Selebew
//jgn lupa enc klo mau di publik/run pake panel, nanti kena curi kang panel😱
//Credit Haruka-Md By Zeeoneofc Recode By Juna
//Base Ori Zeeoneofc

require("./panel");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  areJidsSameUser,
  getContentType,
  delay,
} = require("@adiwajshing/baileys");

const fs = require("fs");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const util = require("util");
const chalk = require("chalk");
const { exec, spawn, execSync } = require("child_process");
const path = require("path");
const crypto = require("crypto");
const ms = require("parse-ms");
const yts = require("yt-search");
const FormData = require("form-data");
const moment = require("moment-timezone");
const speed = require("performance-now");
const { sizeFormatter } = require("human-readable");
const { ttdl } = require("ruhend-scraper");

let format = sizeFormatter({
  std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});
var dbs = [];
global.dbc = dbs;

const _prem = require("./lib/premium");
const _sewa = require("./lib/sewa");
const {
  isSetWelcome,
  addSetWelcome,
  changeSetWelcome,
  removeSetWelcome,
} = require("./lib/setwelcome");
const {
  isSetLeft,
  addSetLeft,
  removeSetLeft,
  changeSetLeft,
} = require("./lib/setleft");
const {
  addResponList,
  delResponList,
  isAlreadyResponList,
  isAlreadyResponListGroup,
  sendResponList,
  updateResponList,
  getDataResponList,
} = require("./lib/respon-list");
const { addRespons, checkRespons, deleteRespons } = require("./lib/respon");
const {
  isSetProses,
  addSetProses,
  removeSetProses,
  changeSetProses,
  getTextSetProses,
} = require("./lib/setproses");
const {
  isSetDone,
  addSetDone,
  removeSetDone,
  changeSetDone,
  getTextSetDone,
} = require("./lib/setdone");
const {
  isSetOpen,
  addSetOpen,
  removeSetOpen,
  changeSetOpen,
  getTextSetOpen,
} = require("./lib/setopen");
const {
  isSetClose,
  addSetClose,
  removeSetClose,
  changeSetClose,
  getTextSetClose,
} = require("./lib/setclose");
const {
  generateProfilePicture,
  removeEmojis,
  smsg,
  tanggal,
  formatp,
  formatDate,
  getTime,
  isUrl,
  sleep,
  clockString,
  runtime,
  fetchJson,
  getBuffer,
  jsonformat,
  parseMention,
  getRandom,
  getGroupAdmins,
} = require("./lib/myfunc");

const { TelegraPh } = require("./lib/uploader");
const { quote } = require("./lib/quote");
const { pinterest } = require("./lib/scraper");
const { remini } = require("./lib/remini");
const { getTextSetWelcome } = require("./lib/setwelcome");
const { getTextSetLeft } = require("./lib/setleft");
const afk = require("./lib/afk");
const { sticker5 } = require("./lib/stickerr");

// Database
let setiker = JSON.parse(fs.readFileSync("./database/stik.json"));
let audionye = JSON.parse(fs.readFileSync("./database/vn.json"));
let imagenye = JSON.parse(fs.readFileSync("./database/image.json"));
let videonye = JSON.parse(fs.readFileSync("./database/video.json"));
let set_welcome_db = JSON.parse(fs.readFileSync("./database/set_welcome.json"));
let set_left_db = JSON.parse(fs.readFileSync("./database/set_left.json"));
let set_proses = JSON.parse(fs.readFileSync("./database/set_proses.json"));
let set_done = JSON.parse(fs.readFileSync("./database/set_done.json"));
let set_open = JSON.parse(fs.readFileSync("./database/set_open.json"));
let set_close = JSON.parse(fs.readFileSync("./database/set_close.json"));
let _afk = JSON.parse(fs.readFileSync("./database/afk.json"));
let db_respon_list = JSON.parse(
  fs.readFileSync("./database/list-message.json")
);
let sewa = JSON.parse(fs.readFileSync("./database/sewa.json"));
let opengc = JSON.parse(fs.readFileSync("./database/opengc.json"));
let closegc = JSON.parse(fs.readFileSync("./database/closegc.json"));
let _nsfw = JSON.parse(fs.readFileSync("./database/nsfw.json"));
let pendaftar = JSON.parse(fs.readFileSync("./database/user.json"));
let mess = JSON.parse(fs.readFileSync("./mess.json"));
let premium = JSON.parse(fs.readFileSync("./database/premium.json"));
let kickme = JSON.parse(fs.readFileSync("./database/kickme.json"));
let mute = JSON.parse(fs.readFileSync("./database/mute.json"));
let antilink = JSON.parse(fs.readFileSync("./database/antilink.json"));
let antiwame = JSON.parse(fs.readFileSync("./database/antiwame.json"));
let antilink2 = JSON.parse(fs.readFileSync("./database/antilink2.json"));
let antiwame2 = JSON.parse(fs.readFileSync("./database/antiwame2.json"));
let autodlgc = JSON.parse(fs.readFileSync("./database/autodlgc.json"));
let listCmd = JSON.parse(fs.readFileSync("./database/listcmd.json"));
let _cmd = JSON.parse(fs.readFileSync("./database/command.json"));
let _cmdUser = JSON.parse(fs.readFileSync("./database/commandUser.json"));
let modsNumber = JSON.parse(fs.readFileSync("./database/modsNumber.json"));
let responDB = JSON.parse(fs.readFileSync("./database/respon.json"));
let listStore = JSON.parse(fs.readFileSync("./database/list-message.json"));
let openaipc = JSON.parse(fs.readFileSync("./database/openaipc.json"));
let openaigc = JSON.parse(fs.readFileSync("./database/openaigc.json"));
const user_ban = JSON.parse(fs.readFileSync("./database/banned.json"));

// Bandwidth
async function checkBandwidth() {
  let ind = 0;
  let out = 0;
  for (let i of await require("node-os-utils").netstat.stats()) {
    ind += parseInt(i.inputBytes);
    out += parseInt(i.outputBytes);
  }
  return {
    download: format(ind),
    upload: format(out),
  };
}

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = juna = async (
  juna,
  m,
  chatUpdate,
  mek,
  store,
  setting,
  isSetWelcome,
  getTextSetWelcome,
  set_welcome_db,
  set_left_db,
  isSetLeft,
  getTextSetLeft,
  _welcome,
  _left,
  antidelete,
  antionce
) => {
  try {
    const {
      ownerNumber,
      instagram,
      gcwa,
      ownerName,
      botName,
      botVersion,
      footer,
      pathimg,
      gamewaktu,
    } = setting;
    if (m.mtype === "interactiveResponseMessage" && m.quoted.fromMe)
      appenTextMessage(
        JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id,
        chatUpdate
      );
    if (m.mtype === "templateButtonReplyMessage" && m.quoted.fromMe)
      appenTextMessage(m.msg.selectedId, chatUpdate);
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype == "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    const content = JSON.stringify(mek.message);
    const type = Object.keys(mek.message)[0];
    if (m && type == "protocolMessage")
      juna.ev.emit("message.delete", m.message.protocolMessage.key);
    const botNumber = await juna.decodeJid(juna.user.id);
    const isCreator = [botNumber, ...ownerNumber]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body)
      ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi)
      : ".";
    const isCmd = body.startsWith(prefix);
    const command = isCmd
      ? body.slice(1).trim().split(" ").shift().toLowerCase()
      : "";
    // const command = isCreator
    //   ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
    //   : isCommand;
    //const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const itsMe = m.sender == botNumber ? true : false;
    const text = (q = args.join(" "));
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const isMedia = /image|video|sticker|audio/.test(mime);
    const {
      allMenu,

      convertMenu,
      storeMenu,
      groupMenu,
      downloadMenu,
      ownerMenu,
      simpleMenu,
    } = require("./menu");
    let footxt = `${footer}`;
    const time = moment(Date.now())
      .tz("Asia/Jakarta")
      .locale("id")
      .format("HH:mm:ss z");
    const jam = moment().format("HH:mm:ss z");
    let dt = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");
    var fildt =
      dt == "pagi"
        ? dt + "🌝"
        : dt == "siang"
        ? dt + "🌞"
        : dt == "sore"
        ? dt + "🌝"
        : dt + "🌚";
    const ucapanWaktu = fildt.charAt(0).toUpperCase() + fildt.slice(1);

    // Group
    const groupMetadata = m.isGroup
      ? await juna.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const groupMembers = m.isGroup ? groupMetadata.participants : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isUser = pendaftar.includes(m.sender);
    const isBan = user_ban.includes(m.sender);
    const isPremium = isCreator
      ? true
      : _prem.checkPremiumUser(m.sender, premium);
    const isSewa = _sewa.checkSewaGroup(m.chat, sewa);
    const isKickMe = kickme.includes(m.chat) ? true : false;
    const isMute = mute.includes(m.chat) ? true : false;
    const isAntiLink = antilink.includes(m.chat) ? true : false;
    const isAntiLink2 = antilink2.includes(m.chat) ? true : false;
    const isAutoDlGc = autodlgc.includes(m.chat) ? true : false;
    const isAutoAiGc = openaigc.includes(m.chat) ? true : false;
    const isAutoAiPc = openaipc.includes(botNumber) ? true : false;
    const isWelcome = _welcome.includes(m.chat) ? true : false;
    const isLeft = _left.includes(m.chat) ? true : false;
    const isAfkOn = afk.checkAfkUser(m.sender, _afk);

    const isAntiWame = antiwame.includes(m.chat) ? true : false;
    const isAntiWame2 = antiwame2.includes(m.chat) ? true : false;
    const gcounti = setting.gcount;
    let timestamp = speed();
    let latensi = speed() - timestamp;
    const fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: `6285600793871-1614953337@g.us` } : {}),
      },
      message: {
        contactMessage: {
          displayName: `${pushname}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${
            m.sender.split("@")[0]
          }:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          jpegThumbnail: pathimg,
          thumbnail: pathimg,
          sendEphemeral: true,
        },
      },
    };

    dbs.push({ id: m.key.id, m });

    const ments = (text) => {
      return text.match("@")
        ? [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
          )
        : [];
    };

    const reply = (teks) => {
      return juna.sendMessage(
        m.chat,
        { text: teks, mentions: ments(teks) },
        { quoted: m }
      );
    };
    //Function Polling
    juna.ments = (teks = "") => {
      return teks.match("@")
        ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
          )
        : [];
    };
    juna.sendteks = async (chatId, text = "", quoted = "", opts = {}) => {
      return juna.sendMessage(
        chatId,
        { text: text, mentions: await juna.ments(text), ...opts },
        { quoted: quoted }
      );
    };
    juna.sendPoll = (
      jid,
      name = "",
      values = [],
      selectableCount = global.select
    ) => {
      return juna.sendMessage(jid, { poll: { name, values, selectableCount } });
    };
    // RESPON CMD POLL MESSAGE THE JO BOT
    async function getMessage(key) {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg?.message;
      }
      return { conversation: "𝙅ei Bot - MD" };
    }

    juna.ev.on("messages.update", async (chatUpdate) => {
      for (const { key, update } of chatUpdate) {
        if (update.pollUpdates && key.fromMe) {
          const pollCreation = await getMessage(key);
          if (pollCreation) {
            const pollUpdate = await getAggregateVotesInPollMessage({
              message: pollCreation,
              pollUpdates: update.pollUpdates,
            });
            const command = pollUpdate.filter((v) => v.voters.length !== 0)[0]
              ?.name;
            if (command == undefined) return;
            const comand = global.prefix + command;
            // console.log(comand);
            juna.appenTextMessage(comand, chatUpdate);
          }
        }
      }
    });

    function hitungmundur(tanggal, bulan, tahun) {
      let from = new Date(`${bulan} ${tanggal}, ${tahun} 00:00:00`).getTime();
      let now = Date.now();
      let distance = from - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      return (
        days +
        " Hari " +
        hours +
        " Jam " +
        minutes +
        " Menit " +
        seconds +
        " Detik"
      );
    }

    juna.sendList = async (jid, title, footer, btn, options = {}) => {
      let msg = generateWAMessageFromContent(
        jid,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                ...options,
                body: proto.Message.InteractiveMessage.Body.create({
                  text: title,
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: footer || `${setting.footer}`,
                }),
                contextInfo: {
                  forwardingScore: 999,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                    newsletterName: "𝙅𝙪𝙣𝙖𝘽𝙤𝙩-𝙈𝙙 | ©𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐉𝐮𝐧𝐚",
                    newsletterJid: "120363200504585358@newsletter",
                  },
                },
                nativeFlowMessage:
                  proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [
                      {
                        name: "single_select",
                        buttonParamsJson: JSON.stringify(btn),
                      },
                    ],
                  }),
              }),
            },
          },
        },
        { quoted: m }
      );
      return await juna.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id,
      });
    };
    async function appenTextMessage(text, chatUpdate) {
      let messages = await generateWAMessage(
        m.chat,
        { text: text, mentions: m.mentionedJid },
        {
          userJid: juna.user.id,
          quoted: m.quoted && m.quoted.fakeObj,
        }
      );
      messages.key.fromMe = areJidsSameUser(m.sender, juna.user.id);
      messages.key.id = m.key.id;
      messages.pushName = m.pushName;
      if (m.isGroup) messages.participant = m.sender;
      let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: "append",
      };
      juna.ev.emit("messages.upsert", msg);
    }

    async function getGcName(groupID) {
      try {
        let data_name = await juna.groupMetadata(groupID);
        return data_name.subject;
      } catch (err) {
        return "-";
      }
    }

    try {
      let chats = db.data.chats[m.chat];
      if (typeof chats !== "object") db.data.chats[m.chat] = {};
      if (chats) {
        if (!("goodbye" in chats)) chats.goodbye = setting.auto_leaveMsg;
        if (!("welcome" in chats)) chats.welcome = setting.auto_welcomeMsg;
      } else
        db.data.chats[m.chat] = {
          goodbye: setting.auto_leaveMsg,
          welcome: setting.auto_welcomeMsg,
        };
    } catch (e) {
      console.log(e);
    }
    // User Ban
    const banUser = await juna.fetchBlocklist();
    // Public & Self
    if (!juna.public) {
      if (!m.key.fromMe) return;
    }

    let role = "basic";

    // Push Message To Console
    if (m.message) {
      console.log(
        "\x1b[1;31m~\x1b[1;37m>",
        "[\x1b[1;32m Jei Bot-Md \x1b[1;37m]",
        time,
        chalk.green(budy.slice(0, 100) || m.mtype),
        "from",
        chalk.green(pushname),
        "in",
        chalk.green(groupName ? groupName : "Private Chat"),
        "args :",
        chalk.green(text.length)
      );
    }

    _sewa.expiredCheck(juna, sewa);
    _prem.expiredCheck(juna, premium);

    setInterval(() => {
      for (let i of Object.values(opengc)) {
        if (Date.now() >= i.time) {
          juna
            .groupSettingUpdate(i.id, "not_announcement")
            .then((res) =>
              juna.sendMessage(i.id, { text: `Sukses, group telah dibuka` })
            )
            .catch((err) => juna.sendMessage(i.id, { text: "Error" }));
          delete opengc[i.id];
          fs.writeFileSync("./database/opengc.json", JSON.stringify(opengc));
        }
      }
    }, 1000);
    // auto set bio
    if (setting.autobio) {
      if (setting.autobio === false) return;
      let settingstatus = 0;
      if (new Date() * 1 - settingstatus > 1000) {
        await juna.setStatus(
          `I'm ${juna.user.name} 🤖 | ${runtime(
            process.uptime()
          )} ⏰ | Status : ${juna.mode ? "Public Mode" : "Self Mode"} | ${
            pendaftar.length
          } Users`
        );
        settingstatus = new Date() * 1;
      }
    }
    if (!isCreator && setting.grupOnly && !m.isGroup) {
      return;
    }
    if (!isCreator && setting.japriOnly && m.isGroup) {
      return;
    }

    /////
    var bodynyaui =
      m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    for (let zeeone of setiker) {
      if (!bodynyaui && budy === zeeone) {
        result = fs.readFileSync(`./database/${zeeone}.webp`);
        await juna.sendStickerFromUrl(m.chat, result, m, {
          packname: `Created By ${setting.botName}\n${tanggal(new Date())}`,
          author: `Owner ${setting.ownerName}\nTime ${time}`,
        });
      }
    }
    for (let zeeonee of audionye) {
      if (!bodynyaui && budy === zeeonee) {
        result = fs.readFileSync(`./database/${zeeonee}.mp3`);
        juna.sendAudio(m.chat, result, m, true);
      }
    }
    for (let zeeoneee of imagenye) {
      if (!bodynyaui && budy === zeeoneee) {
        result = fs.readFileSync(`./database/${zeeoneee}.jpg`);
        juna.sendImage(m.chat, result, "", m);
      }
    }
    for (let zeeonew of videonye) {
      if (!bodynyaui && budy === zeeonew) {
        result = fs.readFileSync(`./database/${zeeonew}.mp4`);
        juna.sendVideo(m.chat, result, false, "", m);
      }
    }
    async function addCountCmdUser(nama, sender, u) {
      var posi = null;
      var pos = null;
      Object.keys(u).forEach((i) => {
        if (u[i].jid === sender) {
          posi = i;
        }
      });
      if (posi === null) {
        u.push({ jid: m.sender, db: [{ nama: nama, count: 0 }] });
        fs.writeFileSync(
          "./database/commandUser.json",
          JSON.stringify(u, null, 2)
        );
        Object.keys(u).forEach((i) => {
          if (u[i].jid === m.sender) {
            posi = i;
          }
        });
      }
      if (posi !== null) {
        Object.keys(u[posi].db).forEach((i) => {
          if (u[posi].db[i].nama === nama) {
            pos = i;
          }
        });
        if (pos === null) {
          u[posi].db.push({ nama: nama, count: 1 });
          fs.writeFileSync(
            "./database/commandUser.json",
            JSON.stringify(u, null, 2)
          );
        } else {
          u[posi].db[pos].count += 1;
          fs.writeFileSync(
            "./database/commandUser.json",
            JSON.stringify(u, null, 2)
          );
        }
      }
    }

    async function addCountCmd(nama, sender, _db) {
      addCountCmdUser(nama, m.sender, _cmdUser);
      var posi = null;
      Object.keys(_db).forEach((i) => {
        if (_db[i].nama === nama) {
          posi = i;
        }
      });
      if (posi === null) {
        _db.push({ nama: nama, count: 1 });
        fs.writeFileSync(
          "./database/command.json",
          JSON.stringify(_db, null, 2)
        );
      } else {
        _db[posi].count += 1;
        fs.writeFileSync(
          "./database/command.json",
          JSON.stringify(_db, null, 2)
        );
      }
    }

    // Store
    if (
      m.isGroup &&
      isAlreadyResponList(m.chat, body.toLowerCase(), db_respon_list)
    ) {
      var get_data_respon = getDataResponList(
        m.chat,
        body.toLowerCase(),
        db_respon_list
      );
      if (get_data_respon.isImage === false) {
        juna.sendMessage(
          m.chat,
          { text: sendResponList(m.chat, body.toLowerCase(), db_respon_list) },
          {
            quoted: m,
          }
        );
      } else {
        juna.sendMessage(
          m.chat,
          {
            image: await getBuffer(get_data_respon.image_url),
            caption: get_data_respon.response,
          },
          {
            quoted: m,
          }
        );
      }
    }

    // Auto Read & Presence Online
    if (!m.key.fromMe && setting.autoread) {
      const readkey = {
        remoteJid: m.chat,
        id: m.key.id,
        participant: m.isGroup ? m.key.participant : undefined,
      };
      await juna.readMessages([readkey]);
    }

    juna.sendPresenceUpdate("available", m.chat);

    // Auto Registrasi
    if (isCmd && !isUser) {
      pendaftar.push(m.sender);
      fs.writeFileSync(
        "./database/user.json",
        JSON.stringify(pendaftar, null, 2)
      );
    }

    // Auto Block +212
    if (m.sender.startsWith("212") && setting.autoblok212 === true) {
      return juna.updateBlockStatus(m.sender, "block");
    }

    if (!m.isGroup && !m.key.fromMe && setting.autorespond && !isCmd) {
      simi = await fetchJson(
        `https://api.simsimi.net/v2/?lc=id&cf=false&text=${command}`
      );
      newReply("_" + simi.success + "_");
    }
    if (
      !m.isGroup &&
      !m.key.fromMe &&
      (isAutoAiPc || setting.auto_ai_japri) &&
      !isCmd
    ) {
      try {
        let ini = await fetchJson(
          `https://api.junn4.my.id/ai/chatGPT?text=${budy}`
        );
        let hasil = `${ini.result}`;
        newReply(hasil);
      } catch (err) {
        //console.log(err);
        newReply("Upss error silahkan hubungi owner agar di fix");
        //newReply(JSON.stringify(err));
      }
    }
    if (
      m.isGroup &&
      !m.key.fromMe &&
      (isAutoAiGc || setting.auto_ai_grup) &&
      !isCmd
    ) {
      try {
        let ini = await fetchJson(
          `https://api.junn4.my.id/ai/chatGPT?text=${budy}`
        );
        let hasil = `${ini.result}`;
        newReply(hasil);
      } catch (err) {
        //console.log(err);
        newReply("Upss error silahkan hubungi owner agar di fix");
        //newReply(JSON.stringify(err));
      }
    }
    // Anti Link
    if (isAntiLink) {
      if (budy.match(`chat.whatsapp.com`)) {
        newReply(
          `*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`
        );
        if (!isBotAdmins) return newReply(`Anjir lupa gw bukan admin`);
        let gclink =
          `https://chat.whatsapp.com/` + (await juna.groupInviteCode(m.chat));
        await juna.sendMessage(m.chat, { delete: m.key });
        let isLinkThisGc = new RegExp(gclink, "i");
        let isgclink = isLinkThisGc.test(m.text);
        if (isgclink)
          return newReply(`Gajadi, Karena kamu ngirim link group ini`);
        if (isAdmins) return newReply(`Gajadi, Kamu admin`);
        if (isCreator) return newReply(`Gajadi, Kamu ownerku`);
        await juna.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });
        juna.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }
    if (isAntiLink2) {
      if (budy.match(`tiktok.com`)) {
        newReply(
          `*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link tiktok, maaf kamu akan di kick`
        );
        if (!isBotAdmins) return newReply(`Anjir lupa gw bukan admin`);
        if (isAdmins) return newReply(`Gajadi, kamu admin`);
        if (isCreator) return newReply(`Gajadi, kamu owner ku`);
        await juna.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });
        juna.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }

    // Kick Me
    if (isKickMe) {
      if (budy.match(`in kel`)) {
        await newReply(`Siap Laksanakan`);
        if (!isBotAdmins) return newReply(`Anjir lupa gw bukan admin`);
        if (isAdmins) return newReply(`Kenapa Mau Out Sayang🥺`);
        if (isCreator) return newReply(`Kenapa Mau Out Sayang🥺`);
        newReply(`Done Awokwok`);
        juna.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }
    // Mute
    if (m.isGroup && isMute) {
      if (!isAdmins && !isCreator) return;
    }
    // Anti Wame
    if (isAntiWame) {
      if (budy.match(`wa.me` && `Wa.me`)) {
        newReply(
          `*「 WA ME DETECTOR 」*\n\nSepertinya kamu mengirimkan link Whatsapp, maaf kamu akan di kick`
        );
        if (!isBotAdmins) return newReply(`Anjir lupa gw bukan admin`);
        await juna.sendMessage(m.chat, { delete: m.key });
        if (isAdmins) return newReply(`Gajadi, Kamu admin`);
        if (isCreator) return newReply(`Gajadi, Kamu ownerku`);
        await juna.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });
        juna.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }
    if (m.isGroup && isAntiWame2 && !isCreator && !isAdmins && isBotAdmins) {
      if (budy.match(`wa.me`)) {
        if (!isBotAdmins) return; //newReply(`Untung bot bukan admin`)
        await juna.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });
      }
    }

    // Respon Cmd with media
    if (
      isMedia &&
      m.msg.fileSha256 &&
      m.msg.fileSha256.toString("base64") in db.data.sticker
    ) {
      let hash = db.data.sticker[m.msg.fileSha256.toString("base64")];
      let { text, mentionedJid } = hash;
      let messages = await generateWAMessage(
        m.chat,
        { text: text, mentions: mentionedJid },
        {
          userJid: juna.user.id,
          quoted: m.quoted && m.quoted.fakeObj,
        }
      );
      messages.key.fromMe = areJidsSameUser(m.sender, juna.user.id);
      messages.key.id = m.key.id;
      messages.pushName = m.pushName;
      if (m.isGroup) messages.participant = m.sender;
      let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: "append",
      };
      juna.ev.emit("messages.upsert", msg);
    }
    async function generateRandomString(length) {
      const chars = "abcdefghijklmnopqrstuvwxyz";
      let result = "";
      const randomBytes = crypto.randomBytes(length);
      for (let i = 0; i < length; i++) {
        const byte = randomBytes[i] % chars.length;
        result += chars.charAt(byte);
      }
      return result.toLowerCase();
    }
    const randomString = generateRandomString(5);

    async function generateRandomTrxid(length) {
      const chars = "202314568902147626342367212345578910";
      let result = "";
      const randomBytes = crypto.randomBytes(length);
      for (let i = 0; i < length; i++) {
        const byte = randomBytes[i] % chars.length;
        result += chars.charAt(byte);
      }
      return result.toLowerCase();
    }
    async function newReply(teks) {
      const nedd = {
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            showAdAttribution: true,
            title: ucapanWaktu,
            body: `${pushname}`,
            previewType: "PHOTO",
            thumbnailUrl: pathimg,
            sourceUrl: instagram,
          },
        },
        text: teks,
      };
      return juna.sendMessage(m.chat, nedd, {
        quoted: m,
      });
    }
    const junaa = {
      key: {
        fromMe: [],
        participant: "0@s.whatsapp.net",
        ...(m.chat ? { remoteJid: "" } : {}),
      },

      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc",
          fileSha256: "YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=",
          fileEncSha256: "9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8=",
          mediaKey: "nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=",
          mimetype: "image/webp",
          height: 40,
          width: 40,
          directPath:
            "/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781",
          fileLength: "99999999",
          mediaKeyTimestamp: "16572901099967",
          isAnimated: [],
        },
      },
    };

    switch (command) {
      case "allmenu":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          addCountCmd("#allmenu", m.sender, _cmd);
          await juna.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
          await juna.sendMessage(
            m.chat,
            {
              text: allMenu(
                pushname,
                ownerName,
                botName,
                botVersion,
                runtime,
                isCreator,
                isPremium,
                prefix
              ),
            },
            { quoted: m }
          );

          await juna.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        }
        break;
      case "menu":
      case "simplemenu":
      case "help":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          addCountCmd("#menu", m.sender, _cmd);
          let mundur = hitungmundur(31, 8, 2024);
          let lebaran = hitungmundur(10, 4, 2024);
          let ultah = hitungmundur(10, 10, 2024);
          await juna.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
          await juna.sendMessage(
            m.chat,
            {
              text: simpleMenu(
                pushname,
                ownerName,
                botName,
                botVersion,
                runtime,
                isCreator,
                isPremium,
                prefix
              ),
              contextInfo: {
                externalAdReply: {
                  title: `Halo ${pushname} Selamat ${ucapanWaktu}`,
                  body: "𝙅𝙖𝙣𝙜𝙖𝙣 𝙨𝙥𝙖𝙢 𝙗𝙤𝙩 𝙮𝙖𝙝𝙝",
                  thumbnailUrl: pathimg,
                  sourceUrl: gcwa,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            },
            { quoted: m }
          );
          await juna.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        }
        break;

      case "convertmenu":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          addCountCmd("#convertmenu", m.sender, _cmd);
          let mundur = hitungmundur(1, 1, 2025);
          let lebaran = hitungmundur(17, 8, 2024);
          await juna.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
          await juna.sendMessage(
            m.chat,
            {
              text: convertMenu(
                pushname,
                ownerName,
                botName,
                botVersion,
                runtime,
                isCreator,
                isPremium,
                prefix
              ),
              contextInfo: {
                externalAdReply: {
                  title: `Halo ${pushname} Selamat ${ucapanWaktu}`,
                  body: "𝙅𝙖𝙣𝙜𝙖𝙣 𝙨𝙥𝙖𝙢 𝙗𝙤𝙩 𝙮𝙖𝙝𝙝",
                  thumbnailUrl: pathimg,
                  sourceUrl: gcwa,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            },
            { quoted: m }
          );

          await juna.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        }
        break;
      case "storemenu":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          addCountCmd("#storemenu", m.sender, _cmd);
          let mundur = hitungmundur(1, 1, 2025);
          let lebaran = hitungmundur(17, 8, 2024);
          await juna.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
          await juna.sendMessage(
            m.chat,
            {
              text: storeMenu(
                pushname,
                ownerName,
                botName,
                botVersion,
                runtime,
                isCreator,
                isPremium,
                prefix
              ),
              contextInfo: {
                externalAdReply: {
                  title: `Halo ${pushname} Selamat ${ucapanWaktu}`,
                  body: "𝙅𝙖𝙣𝙜𝙖𝙣 𝙨𝙥𝙖𝙢 𝙗𝙤𝙩 𝙮𝙖𝙝𝙝",
                  thumbnailUrl: pathimg,
                  sourceUrl: gcwa,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            },
            { quoted: m }
          );

          await juna.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        }
        break;
      case "groupmenu":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          addCountCmd("#groupmenu", m.sender, _cmd);
          let mundur = hitungmundur(1, 1, 2025);
          let lebaran = hitungmundur(17, 8, 2024);
          await juna.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
          await juna.sendMessage(
            m.chat,
            {
              text: groupMenu(
                pushname,
                ownerName,
                botName,
                botVersion,
                runtime,
                isCreator,
                isPremium,
                prefix
              ),
              contextInfo: {
                externalAdReply: {
                  title: `Halo ${pushname} Selamat ${ucapanWaktu}`,
                  body: "𝙅𝙖𝙣𝙜𝙖𝙣 𝙨𝙥𝙖𝙢 𝙗𝙤𝙩 𝙮𝙖𝙝𝙝",
                  thumbnailUrl: pathimg,
                  sourceUrl: gcwa,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            },
            { quoted: m }
          );

          await juna.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        }
        break;
      case "downloadmenu":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          addCountCmd("#downloadmenu", m.sender, _cmd);
          let mundur = hitungmundur(1, 1, 2025);
          let lebaran = hitungmundur(17, 8, 2024);
          await juna.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
          await juna.sendMessage(
            m.chat,
            {
              text: downloadMenu(
                pushname,
                ownerName,
                botName,
                botVersion,
                runtime,
                isCreator,
                isPremium,
                prefix
              ),
              contextInfo: {
                externalAdReply: {
                  title: `Halo ${pushname} Selamat ${ucapanWaktu}`,
                  body: "𝙅𝙖𝙣𝙜𝙖𝙣 𝙨𝙥𝙖𝙢 𝙗𝙤𝙩 𝙮𝙖𝙝𝙝",
                  thumbnailUrl: pathimg,
                  sourceUrl: gcwa,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            },
            { quoted: m }
          );

          await juna.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        }
        break;

      case "ownermenu":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          addCountCmd("#ownermenu", m.sender, _cmd);
          let mundur = hitungmundur(1, 1, 2025);
          let lebaran = hitungmundur(17, 8, 2024);
          await juna.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
          await juna.sendMessage(
            m.chat,
            {
              text: ownerMenu(
                pushname,
                ownerName,
                botName,
                botVersion,
                runtime,
                isCreator,
                isPremium,
                prefix
              ),
              contextInfo: {
                externalAdReply: {
                  title: `Halo ${pushname} Selamat ${ucapanWaktu}`,
                  body: "𝙅𝙖𝙣𝙜𝙖𝙣 𝙨𝙥𝙖𝙢 𝙗𝙤𝙩 𝙮𝙖𝙝𝙝",
                  thumbnailUrl: pathimg,
                  sourceUrl: gcwa,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            },
            { quoted: m }
          );

          await juna.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
        }
        break;
      case "owner":
      case "creator":
        {
          await juna.sendContact(
            m.chat,
            ownerNumber.map((i) => i.split("@")[0]),
            m
          );
        }
        break;
      case "cekbandwidth":
      case "bandwidth":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        newReply(mess.wait);
        addCountCmd("#cekbandwidth", m.sender, _cmd);
        var { download, upload } = await checkBandwidth();
        newReply(
          `*Bandwidth Server*\n\n*>* Upload : ${upload}\n*>* Download : ${download}`
        );
        break;
      case "cekprem":
      case "cekpremium":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!isPremium)
          return newReply(
            `Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`
          );
        addCountCmd("#cekpremium", m.sender, _cmd);
        if (isCreator) return newReply(`Khusus user aja bkn untuk owner`);
        if (_prem.getPremiumExpired(m.sender, premium) == "PERMANENT")
          return newReply(`PERMANENT`);
        let cekvip = ms(
          _prem.getPremiumExpired(m.sender, premium) - Date.now()
        );
        let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`;
        newReply(premiumnya);
        break;
      case "listpremium":
      case "listprem":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        addCountCmd("#listpremium", m.sender, _cmd);
        let txt = `*List Premium User*\nJumlah : ${premium.length}\n\n`;
        let men = [];
        for (let i of premium) {
          men.push(i.id);
          txt += `*ID :* @${i.id.split("@")[0]}\n`;
          if (i.expired === "PERMANENT") {
            let cekvip = "PERMANENT";
            txt += `*Expire :* PERMANENT\n\n`;
          } else {
            let cekvip = ms(i.expired - Date.now());
            txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`;
          }
        }
        juna.sendTextWithMentions(m.chat, txt, m);
        break;
      case "listsewa":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        let list_sewa_list = `*LIST-SEWA-GROUP*\n\n*Total:* ${sewa.length}\n\n`;
        let data_array = [];
        for (let x of sewa) {
          addCountCmd("#listsewa", m.sender, _cmd);
          list_sewa_list += `*Name:* ${await getGcName(x.id)}\n*ID :* ${
            x.id
          }\n`;
          if (x.expired === "PERMANENT") {
            let ceksewa = "PERMANENT";
            list_sewa_list += `*Expire :* PERMANENT\n\n`;
          } else {
            let ceksewa = ms(x.expired - Date.now());
            list_sewa_list += `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s) ${ceksewa.seconds} second(s)\n\n`;
          }
        }
        juna.sendMessage(m.chat, { text: list_sewa_list }, { quoted: m });
        break;
      case "tes":
      case "test":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        addCountCmd("#tes", m.sender, _cmd);
        juna.sendMessage(
          m.chat,
          {
            text: `${setting.botName} 𝙊𝙣 𝘽𝙤𝙨𝙠𝙪\n𝙒𝙖𝙠𝙩𝙪 𝙊𝙣𝙡𝙞𝙣𝙚 : ${runtime(
              process.uptime()
            )}`,
          },
          { quoted: fkontak }
        );
        break;
      case "remini":
      case "hd":
      case "hdr":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!quoted) return newReply(`Fotonya Mana?`);
          if (!/image/.test(mime))
            return newReply(
              `Send/Reply Foto Dengan Caption ${prefix + command}`
            );
          newReply(mess.wait);
          let media = await quoted.download();
          let proses = await remini(media, "enhance");
          juna.sendMessage(
            m.chat,
            {
              image: proses,
              caption: "_Maaf Kak, Kalau Hasilnya Nggak Bagus_ T_T",
            },
            { quoted: m }
          );
        }

        break;

      case "qc":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!text) return newReply("Masukkan Teks");
          let ppnyauser = await await juna
            .profilePictureUrl(m.sender, "image")
            .catch((_) => "https://telegra.ph/file/6880771a42bad09dd6087.jpg");
          const rest = await quote(text, pushname, ppnyauser);
          let stiker = await sticker5(
            rest.result,
            false,
            `Created By ${setting.botName}\n${tanggal(new Date())}`,
            `Owner ${setting.ownerName}\nTime ${time}`
          );
          if (stiker)
            return juna.sendFile(m.chat, stiker, "Quotly.webp", "", m);
        }

        break;
      case "stiker":
      case "sticker":
      case "s":
      case "stickergif":
      case "sgif":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          addCountCmd("#sticker", m.sender, _cmd);
          if (!quoted)
            return newReply(
              `Balas Video/Image Dengan Caption ${prefix + command}`
            );
          if (/image/.test(mime)) {
            let media = await juna.downloadAndSaveMediaMessage(
              quoted,
              +new Date() * 1
            );
            await juna.imgToSticker(m.chat, media, m, {
              packname: `Created By ${setting.botName}\n${tanggal(new Date())}`,
              author: `Owner ${setting.ownerName}\nTime ${time}`,
            });
            await fs.unlinkSync(media);
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return newReply("Maksimal 10 detik!");
            let media = await juna.downloadAndSaveMediaMessage(
              quoted,
              +new Date() * 1
            );
            await juna.vidToSticker(m.chat, media, m, {
              packname: `Created By ${setting.botName}\n${tanggal(new Date())}`,
              author: `Owner ${setting.ownerName}\nTime ${time}`,
            });
            await fs.unlinkSync(media);
          } else if (/sticker/.test(mime)) {
            let media = await juna.downloadAndSaveMediaMessage(
              quoted,
              +new Date() * 1
            );
            await juna.sendStickerFromUrl(from, media, m, {
              packname: `Created By ${setting.botName}\n${tanggal(new Date())}`,
              author: `Owner ${setting.ownerName}\nTime ${time}`,
            });
            await fs.unlinkSync(media);
          } else
            newReply(`Balas Video/Image Dengan Caption ${prefix + command}`);
        }

        break;
      case "stickerwm":
      case "swm":
      case "stickergifwm":
      case "sgifwm":
      case "wm":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!quoted)
            return newReply(
              `Balas Video/Image Dengan Caption ${prefix + command} teks1|teks2`
            );
          addCountCmd("#stickerwm", m.sender, _cmd);
          teks1 = text.split("|")[0] ? text.split("|")[0] : "";
          teks2 = text.split("|")[1] ? text.split("|")[1] : "";
          newReply(mess.wait);
          if (/image/.test(mime)) {
            let media = await quoted.download();
            let stiker = await sticker5(media, false, `${teks1}`, `${teks2}`);
            if (stiker)
              return juna.sendFile(m.chat, stiker, "Quotly.webp", "", m);
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return newReply("Maksimal 10 detik!");
            let media = await quoted.download();
            let stiker = await sticker5(media, false, `${teks1}`, `${teks2}`);
            if (stiker)
              return juna.sendFile(m.chat, stiker, "Quotly.webp", "", m);
          } else {
            newReply(
              `Balas Video/Image Dengan Caption ${prefix + command} teks1|teks2`
            );
          }
        }

        break;
      case "smeme":
      case "stickmeme":
      case "stikmeme":
      case "stickermeme":
      case "stikermeme":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          addCountCmd("#smeme", m.sender, _cmd);
          if (!/webp/.test(mime) && /image/.test(mime)) {
            newReply(mess.wait);
            atas = text.split("|")[0] ? text.split("|")[0] : "-";
            bawah = text.split("|")[1] ? text.split("|")[1] : "-";
            mee = await juna.downloadAndSaveMediaMessage(quoted);
            mem = await TelegraPh(mee);
            let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(
              atas
            )}/${encodeURIComponent(bawah)}.png?background=${mem}`;
            let stiker = await sticker5(
              smeme,
              false,
              `Created By ${setting.botName}\n${tanggal(new Date())}`,
              `Owner ${setting.ownerName}\nTime ${time}`
            );
            if (stiker)
              return juna.sendFile(m.chat, stiker, "Quotly.webp", "", m);
          } else {
            newReply(
              `Kirim/reply image dengan caption ${prefix + command} text1|text2`
            );
          }
        }

        break;
      case "tourl":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!quoted) return newReply("Reply Image");
          newReply("Proses");
          let media = await juna.downloadAndSaveMediaMessage(quoted);
          if (/image/.test(mime)) {
            let anu = await TelegraPh(media);
            newReply(util.format(anu));
          } else if (!/image/.test(mime)) {
            let anu = await UploadFileUgu(media);
            newReply(util.format(anu));
          }
          await fs.unlinkSync(media);
        }
        break;
      case "toimage":
      case "toimg":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          addCountCmd("#toimage", m.sender, _cmd);
          if (!quoted) return newReply("Reply Image");
          if (!/webp/.test(mime))
            return newReply(
              `Balas sticker dengan caption *${prefix + command}*`
            );
          newReply(mess.wait);
          let media = await juna.downloadAndSaveMediaMessage(quoted);
          let ran = await getRandom(".png");
          exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media);
            if (err) throw err;
            let buffer = fs.readFileSync(ran);
            juna.sendMessage(m.chat, { image: buffer }, { quoted: m });
            fs.unlinkSync(ran);
          });
        }

        break;
      case "readvo":
      case "readviewonce":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.quoted) throw "Reply gambar/video yang ingin Anda lihat";
          if (m.quoted.mtype !== "viewOnceMessageV2")
            throw "Ini bukan pesan view-once.";
          let msg = m.quoted.message;
          let type = Object.keys(msg)[0];
          let media = await downloadContentFromMessage(
            msg[type],
            type == "imageMessage" ? "image" : "video"
          );
          let buffer = Buffer.from([]);
          for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]);
          }
          if (/video/.test(type)) {
            return juna.sendFile(
              m.chat,
              buffer,
              "media.mp4",
              msg[type].caption || "",
              m
            );
          } else if (/image/.test(type)) {
            return juna.sendFile(
              m.chat,
              buffer,
              "media.jpg",
              msg[type].caption || "",
              m
            );
          }
        }
        break;
      case "toptv":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          const { toPTT } = require("./lib/converter");
          const { MessageType } = require("@adiwajshing/baileys");
          let q = m.quoted ? m.quoted : m;
          if (!/video|audio/.test(mime))
            throw `Balas video atau voice note yang ingin diubah ke mp3 dengan caption *${
              prefix + command
            }*`;
          let media = await q.download();
          let dataVideo = {
            ptvMessage:
              m.message.extendedTextMessage.contextInfo.quotedMessage
                .videoMessage,
          };
          juna.relayMessage(m.chat, dataVideo, {});
        }

        break;
      case "tovn":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          addCountCmd("#tovn", m.sender, _cmd);
          if (!/video/.test(mime) && !/audio/.test(mime))
            return newReply(
              `Reply Video/Vn Yang Ingin Dijadikan MP3 Dengan Caption ${
                prefix + command
              }`
            );
          if (!quoted)
            return newReply(
              `Reply Video/Vn Yang Ingin Dijadikan MP3 Dengan Caption ${
                prefix + command
              }`
            );
          newReply(mess.wait);
          let media = await quoted.download();
          let { toAudio } = require("./lib/converter");
          let audio = await toAudio(media, "mp4");
          juna.sendMessage(
            m.chat,
            { audio, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }

        break;
      case "toaudio":
      case "tomp3":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          addCountCmd("#tomp3", m.sender, _cmd);
          if (!/video/.test(mime) && !/audio/.test(mime))
            return newReply(
              `Reply Video/Vn Yang Ingin Dijadikan MP3 Dengan Caption ${
                prefix + command
              }`
            );
          if (!quoted)
            return newReply(
              `Reply Video/Vn Yang Ingin Dijadikan MP3 Dengan Caption ${
                prefix + command
              }`
            );
          newReply(mess.wait);
          let media = await quoted.download();
          let { toAudio } = require("./lib/converter");
          let audio = await toAudio(media, "mp4");
          juna.sendMessage(
            m.chat,
            { audio, mimetype: "audio/mpeg" },
            { quoted: m }
          );
        }

        break;
      case "ttp":
      case "attp":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          addCountCmd("#attp", m.sender, _cmd);
          if (!text) return newReply(`Example : ${prefix + command} halo`);
          if (text.length > 20) return newReply("Maksimal 20 karakter");
          newReply(mess.wait);
          await juna.sendStickerFromUrl(
            m.chat,
            `https://api.zeeoneofc.my.id/api/canvas/${command}?text=${q}&apikey=${setting.BotKey}`,
            m,
            {
              packname: `Created By ${setting.botName}\n${tanggal(new Date())}`,
              author: `Owner ${setting.ownerName}\nTime ${time}`,
            }
          );
        }

        break;
      case "emojimix":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          addCountCmd("#emojimix", m.sender, _cmd);
          let [emoji1, emoji2] = text.split`+`;
          if (!emoji1) return newReply(`Example : ${prefix + command} 😅+💩`);
          if (!emoji2) return newReply(`Example : ${prefix + command} 😅+💩`);
          let anu = await fetchJson(
            `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
              emoji1
            )}_${encodeURIComponent(emoji2)}`
          );
          for (let res of anu.results) {
            let encmedia = await juna.sendStickerFromUrl(m.chat, res.url, m, {
              packname: `Created By ${setting.botName}\n${tanggal(new Date())}`,
              author: `Owner ${setting.ownerName}\nTime ${time}`,
              categories: res.tags,
            });
          }
        }

        break;
      case "nulis":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        addCountCmd("#nulis", m.sender, _cmd);
        newReply(`*Pilihan Fitur Nulis*
1. ${prefix}nuliskiri
2. ${prefix}nuliskanan
3. ${prefix}foliokiri
4. ${prefix}foliokanan

Contoh:
${prefix}nuliskiri Juna Selebew`);
        break;
      case "nuliskiri":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!text)
            return newReply(
              `Gunakan dengan cara ${prefix + command} text\n\nContoh : ${
                prefix + command
              } juna`
            );
          newReply(mess.wait);
          const tulisan = body.slice(11);
          addCountCmd("#nuliskiri", m.sender, _cmd);
          juna
            .sendMessage(
              m.chat,
              {
                image: {
                  url: `https:\/\/api.zeeoneofc.my.id/api/canvas/${command}?text=${q}&apikey=${setting.BotKey}`,
                },
                caption: "Nih kak",
              },
              { quoted: m }
            )
            .catch(async (_) => await newReply("apikey sedang eror"));
        }

        break;
      case "nuliskanan":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!text)
            return newReply(
              `Gunakan dengan cara ${prefix + command} text\n\nContoh : ${
                prefix + command
              } juna`
            );
          newReply(mess.wait);
          const tulisan = body.slice(12);
          addCountCmd("#nuliskanan", m.sender, _cmd);
          juna
            .sendMessage(
              m.chat,
              {
                image: {
                  url: `https:\/\/api.zeeoneofc.my.id/api/canvas/${command}?text=${q}&apikey=${setting.BotKey}`,
                },
                caption: "Nih kak",
              },
              { quoted: m }
            )
            .catch(async (_) => await newReply("apikey sedang eror"));
        }

        break;
      case "foliokiri":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!text)
            return newReply(
              `Gunakan dengan cara ${prefix + command} text\n\nContoh : ${
                prefix + command
              } juna`
            );
          newReply(mess.wait);
          const tulisan = body.slice(11);
          addCountCmd("#foliokiri", m.sender, _cmd);
          juna
            .sendMessage(
              m.chat,
              {
                image: {
                  url: `https:\/\/api.zeeoneofc.my.id/api/canvas/${command}?text=${q}&apikey=${setting.BotKey}`,
                },
                caption: "Nih kak",
              },
              { quoted: m }
            )
            .catch(async (_) => await newReply("apikey sedang eror"));
        }

        break;
      case "foliokanan":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!text)
            return newReply(
              `Gunakan dengan cara ${prefix + command} text\n\nContoh : ${
                prefix + command
              } juna`
            );
          newReply(mess.wait);
          const tulisan = body.slice(12);
          addCountCmd("#foliokanan", m.sender, _cmd);
          juna
            .sendMessage(
              m.chat,
              {
                image: {
                  url: `https:\/\/api.zeeoneofc.my.id/api/canvas/${command}?text=${q}&apikey=${setting.BotKey}`,
                },
                caption: "Nih kak",
              },
              { quoted: m }
            )
            .catch(async (_) => await newReply("apikey sedang eror"));
        }

        break;
      case "list":
      case "store":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (db_respon_list.length === 0)
            return newReply(`Belum ada list message di database`);
          if (!isAlreadyResponListGroup(m.chat, db_respon_list))
            return newReply(
              `Belum ada list message yang terdaftar di group ini`
            );
          let teks = `Halo @${
            m.sender.split("@")[0]
          } berikut beberapa list yang tersedia saat ini.\n\n`;
          for (let i of db_respon_list) {
            if (i.id === m.chat) {
              teks += `- ${i.key.toUpperCase()}\n`;
            }
          }
          teks += `\n\nUntuk melihat detail produk, silahkan kirim nama produk yang ada pada list di atas. Misalnya kamu ingin melihat detail produk dari ${db_respon_list[0].key.toUpperCase()}, maka kirim pesan ${db_respon_list[0].key.toUpperCase()} kepada bot`;
          juna.sendMessage(
            m.chat,
            { text: teks, mentions: [m.sender] },
            { quoted: m }
          );
        }
        break;
      case "dellist":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        if (db_respon_list.length === 0)
          return newReply(`Belum ada list message di database`);
        if (!text)
          return newReply(
            `Gunakan dengan cara ${prefix + command} *key*\n\n_Contoh_\n\n${
              prefix + command
            } hello`
          );
        if (!isAlreadyResponList(m.chat, q.toLowerCase(), db_respon_list))
          return newReply(
            `List respon dengan key *${q}* tidak ada di database!`
          );
        delResponList(m.chat, q.toLowerCase(), db_respon_list);
        newReply(`Sukses delete list message dengan key *${q}*`);
        break;
      case "addlist":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        var args1 = q.split("|")[0].toLowerCase();
        var args2 = q.split("|")[1];
        if (!q.includes("|"))
          return newReply(
            `Gunakan dengan cara ${
              prefix + command
            } *key|response*\n\n_Contoh_\n\n${prefix + command} tes|apa`
          );
        if (isAlreadyResponList(m.chat, args1, db_respon_list))
          return newReply(
            `List respon dengan key : *${args1}* sudah ada di group ini.`
          );
        if (/image/.test(mime)) {
          let media = await juna.downloadAndSaveMediaMessage(quoted);
          const fd = new FormData();
          fd.append("file", fs.readFileSync(media), ".tmp", ".jpg");
          fetch("https://telegra.ph/upload", {
            method: "POST",
            body: fd,
          })
            .then((res) => res.json())
            .then((json) => {
              addResponList(
                m.chat,
                args1,
                args2,
                true,
                `https://telegra.ph${json[0].src}`,
                db_respon_list
              );
              newReply(`Sukses set list message dengan key : *${args1}*`);
              if (fs.existsSync(media)) fs.unlinkSync(media);
            });
        } else {
          addResponList(m.chat, args1, args2, false, "-", db_respon_list);
          newReply(`Sukses set list message dengan key : *${args1}*`);
        }
        break;
      case "updatelist":
      case "update":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        var args1 = q.split("|")[0].toLowerCase();
        var args2 = q.split("|")[1];
        if (!q.includes("|"))
          return newReply(
            `Gunakan dengan cara ${
              prefix + command
            } *key|response*\n\n_Contoh_\n\n${prefix + command} tes|apa`
          );
        if (!isAlreadyResponListGroup(m.chat, db_respon_list))
          return newReply(
            `Maaf, untuk key *${args1}* belum terdaftar di group ini`
          );
        if (/image/.test(mime)) {
          let media = await juna.downloadAndSaveMediaMessage(quoted);
          const fd = new FormData();
          fd.append("file", fs.readFileSync(media), ".tmp", ".jpg");
          fetch("https://telegra.ph/upload", {
            method: "POST",
            body: fd,
          })
            .then((res) => res.json())
            .then((json) => {
              updateResponList(
                m.chat,
                args1,
                args2,
                true,
                `https://telegra.ph${json[0].src}`,
                db_respon_list
              );
              newReply(`Sukses update respon list dengan key *${args1}*`);
              if (fs.existsSync(media)) fs.unlinkSync(media);
            });
        } else {
          updateResponList(m.chat, args1, args2, false, "-", db_respon_list);
          newReply(`Sukses update respon list dengan key *${args1}*`);
        }
        break;
      case "setproses":
      case "setp":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        if (!text)
          return newReply(
            `Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${
              prefix + command
            } Pesanan sedang di proses ya @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `
          );
        if (isSetProses(m.chat, set_proses))
          return newReply(`Set proses already active`);
        addSetProses(text, m.chat, set_proses);
        newReply(`✅ Done set proses!`);
        break;
      case "changeproses":
      case "changep":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        if (!text)
          return newReply(
            `Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${
              prefix + command
            } Pesanan sedang di proses ya @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `
          );
        if (isSetProses(m.chat, set_proses)) {
          changeSetProses(text, m.chat, set_proses);
          newReply(`Sukses ubah set proses!`);
        } else {
          addSetProses(text, m.chat, set_proses);
          newReply(`Sukses ubah set proses!`);
        }
        break;
      case "delsetproses":
      case "delsetp":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        if (!isSetProses(m.chat, set_proses))
          return newReply(`Belum ada set proses di gc ini`);
        removeSetProses(m.chat, set_proses);
        newReply(`Sukses delete set proses`);
        break;
      case "setdone": {
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        if (!text)
          return newReply(
            `Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${
              prefix + command
            } Done @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `
          );
        if (isSetDone(m.chat, set_done))
          return newReply(`Udh set done sebelumnya`);
        addSetDone(text, m.chat, set_done);
        newReply(`Sukses set done!`);
        break;
      }
      case "changedone":
      case "changed":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        if (!text)
          return newReply(
            `Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${
              prefix + command
            } Done @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `
          );
        if (isSetDone(m.chat, set_done)) {
          changeSetDone(text, m.chat, set_done);
          newReply(`Sukses ubah set done!`);
        } else {
          addSetDone(text, m.chat, set_done);
          newReply(`Sukses ubah set done!`);
        }
        break;
      case "delsetdone":
      case "delsetd":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        if (!isSetDone(m.chat, set_done))
          return newReply(`Belum ada set done di gc ini`);
        removeSetDone(m.chat, set_done);
        newReply(`Sukses delete set done`);
        break;

      // Downloads Menu
      case "tiktok":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!text)
            return newReply(
              `Gunakan dengan cara ${prefix + command} (url video)
Contoh : ${prefix + command} https://vt.tiktok.com/xxxx`
            );
          let data = await ttdl(text);
          juna.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
          newReply("Processing video please wait..");

          juna.sendMessage(
            m.chat,
            {
              video: {
                url: data.video_hd,
              },
              caption: `*Success Get HD Tiktok Video!*
Video Username : ${data.username}
Total Views : ${data.views}
Total Like : ${data.like}
Total Comment : ${data.comment}
Total Save : ${data.bookmark}

Published at ${data.published}`,
            },
            { quoted: m }
          );
        }
        break;
      case "play":
      case "ytplay":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!text) return newReply(`Example : ${prefix + command} Lagu sad`);
          let search = await yts(`${text}`);
          let caption = `*YOUTUBE PLAY*

あ ID : ${search.all[0].videoId}
あ Title : ${search.all[0].title}
あ Views : ${search.all[0].views}
あ Duration : ${search.all[0].timestamp}
あ Channel : ${search.all[0].author.name}
あ Upload : ${search.all[0].ago}
あ URL Video : ${search.videos[0].url}
あ Description : ${search.videos[0].description}

_Please wait, the audio file is being sent..._`;
          let todd = await getBuffer(search.all[0].image);
          juna.sendMessage(
            m.chat,
            { image: todd, caption: caption },
            { quoted: m }
          );
          let ply = search.videos[0].url;
          const ytdl = require("ytdl-core");
          let mp3file = `./${m.chat}.mp3`;
          let nana = ytdl(ply, { filter: "audioonly" })
            .pipe(fs.createWriteStream(mp3file))
            .on("finish", async () => {
              juna.sendMessage(
                m.chat,
                { audio: fs.readFileSync(mp3file), mimetype: "audio/mpeg" },
                { quoted: m }
              );
            });
        }

        break;
      case "ytmp3":
      case "ytaudio":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!text)
            return newReply(
              `Gunakan dengan cara ${prefix + command} *url*\n\n_Contoh_\n\n${
                prefix + command
              } https://youtu.be/dhYOPzcsbGM`
            );
          if (!text.includes("youtu.be") && !text.includes("youtube.com"))
            return newReply(
              `Gunakan dengan cara ${prefix + command} *url*\n\n_Contoh_\n\n${
                prefix + command
              } https://youtu.be/dhYOPzcsbGM`
            );
          await newReply(mess.wait);
          let search = await yts(`${text}`);
          let caption = `*YOUTUBE PLAY*

あ ID : ${search.all[0].videoId}
あ Title : ${search.all[0].title}
あ Views : ${search.all[0].views}
あ Duration : ${search.all[0].timestamp}
あ Channel : ${search.all[0].author.name}
あ Upload : ${search.all[0].ago}
あ URL Video : ${search.videos[0].url}
あ Description : ${search.videos[0].description}

_Please wait, the audio file is being sent..._`;
          let todd = await getBuffer(search.all[0].image);
          juna.sendMessage(
            m.chat,
            { image: todd, caption: caption },
            { quoted: m }
          );
          let ply = search.videos[0].url;
          const ytdl = require("ytdl-core");
          let mp3file = `./${m.chat}.mp3`;
          let nana = ytdl(ply, { filter: "audioonly" })
            .pipe(fs.createWriteStream(mp3file))
            .on("finish", async () => {
              juna.sendMessage(
                m.chat,
                { audio: fs.readFileSync(mp3file), mimetype: "audio/mpeg" },
                { quoted: m }
              );
            });
        }

        break;
      case "ytv":
      case "ytmp4":
      case "ytvideo":
        {
          if (!text)
            return newReply(`Gunakan dengan cara ${prefix + command} *url*`);
          juna.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
          try {
            let anu = await fetchJson(
              `https://api.junn4.my.id/download/ytmp4?url=${text}`
            );
            const cpt = anu.result.channel;
            const nick = anu.result.title;
            juna.sendMessage(
              m.chat,
              {
                video: { url: anu.result.result },
                caption: `💬Judul : ${nick}\n👤Channel : ${cpt}`,
              },
              { quoted: m }
            );
          } catch (error) {
            newReply("Error");
          }
        }
        break;
      case "ytv2":
      case "ytvideo2":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!text)
            return newReply(`Gunakan dengan cara ${prefix + command} *url*`);
          newReply(mess.wait);
          try {
            let anu = await fetchJson(
              `https://vihangayt.me/download/ytmp4?url=${text}`
            );
            const cpt = anu.data.duration;
            const nick = anu.data.title;
            juna.sendMessage(
              m.chat,
              {
                video: { url: anu.data.vid_360p },
                caption: `💬Judul : ${nick}\n⏱️ Durasi : ${cpt}`,
              },
              { quoted: m }
            );
          } catch (error) {
            newReply(
              `Sorry this video can't be download\n\n*Please Report Owner!*`
            );
          }
        }
        break;

      // Group Menu
      case "afk":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply(mess.OnlyGrup);
        if (isAfkOn) return newReply("Afk sudah diaktifkan sebelumnya");
        addCountCmd("#afk", m.sender, _cmd);
        let reason = text ? text : "Nothing.";
        afk.addAfkUser(m.sender, Date.now(), reason, _afk);
        juna.sendTextWithMentions(
          m.chat,
          `@${m.sender.split("@")[0]} sedang afk\nAlasan : ${reason}`,
          m
        );
        break;
      case "welcome":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins && !isCreator) return newReply("Fitur Khusus admin!");
        if (args[0] === "on") {
          addCountCmd("#welcome", m.sender, _cmd);
          if (isWelcome) return newReply(`Udah on`);
          _welcome.push(m.chat);
          fs.writeFileSync(
            "./database/welcome.json",
            JSON.stringify(_welcome, null, 2)
          );
          newReply("Sukses mengaktifkan welcome di grup ini");
        } else if (args[0] === "off") {
          addCountCmd("#welcome", m.sender, _cmd);
          if (!isWelcome) return newReply(`Udah off`);
          let anu = _welcome.indexOf(m.chat);
          _welcome.splice(anu, 1);
          fs.writeFileSync(
            "./database/welcome.json",
            JSON.stringify(_welcome, null, 2)
          );
          newReply("Sukses menonaktifkan welcome di grup ini");
        } else {
          newReply(
            `${prefix + command} on -- _mengaktifkan_\n${
              prefix + command
            } off -- _Menonaktifkan_`
          );
        }
        break;
      case "left":
      case "goodbye":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins && !isCreator) return newReply("Fitur Khusus admin!");
        if (args[0] === "on") {
          addCountCmd("#left", m.sender, _cmd);
          if (isLeft) return newReply(`Udah on`);
          _left.push(m.chat);
          fs.writeFileSync(
            "./database/left.json",
            JSON.stringify(_left, null, 2)
          );
          newReply("Sukses mengaktifkan goodbye di grup ini");
        } else if (args[0] === "off") {
          addCountCmd("#left", m.sender, _cmd);
          if (!isLeft) return newReply(`Udah off`);
          let anu = _left.indexOf(m.chat);
          _left.splice(anu, 1);
          fs.writeFileSync(
            "./database/welcome.json",
            JSON.stringify(_left, null, 2)
          );
          newReply("Sukses menonaktifkan goodbye di grup ini");
        } else {
          newReply(
            `${prefix + command} on -- _mengaktifkan_\n${
              prefix + command
            } off -- _Menonaktifkan_`
          );
        }
        break;
      case "setwelcome":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isCreator && !isAdmins) return newReply("Fitur Khusus owner!");
        if (!text)
          return newReply(
            `Gunakan dengan cara ${
              prefix + command
            } *teks_welcome*\n\n_Contoh_\n\n${
              prefix + command
            } Halo @user, Selamat datang di @group`
          );
        if (isSetWelcome(m.chat, set_welcome_db))
          return newReply(`Set welcome already active`);
        addSetWelcome(text, m.chat, set_welcome_db);
        addCountCmd("#setwelcome", m.sender, _cmd);
        newReply(`Successfully set welcome!`);
        break;
      case "changewelcome":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isCreator && !isAdmins) return newReply("Fitur Khusus owner!");
        if (!text)
          return newReply(
            `Gunakan dengan cara ${
              prefix + command
            } *teks_welcome*\n\n_Contoh_\n\n${
              prefix + command
            } Halo @user, Selamat datang di @group`
          );
        if (isSetWelcome(m.chat, set_welcome_db)) {
          addCountCmd("#changewelcome", m.sender, _cmd);
          changeSetWelcome(q, m.chat, set_welcome_db);
          newReply(`Sukses change set welcome teks!`);
        } else {
          addCountCmd("#changewelcome", m.sender, _cmd);
          addSetWelcome(q, m.chat, set_welcome_db);
          newReply(`Sukses change set welcome teks!`);
        }
        break;
      case "delsetwelcome":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isCreator && !isAdmins) return newReply("Fitur Khusus owner!");
        if (!isSetWelcome(m.chat, set_welcome_db))
          return newReply(`Belum ada set welcome di sini..`);
        removeSetWelcome(m.chat, set_welcome_db);
        addCountCmd("#delsetwelcome", m.sender, _cmd);
        newReply(`Sukses delete set welcome`);
        break;
      case "setleft":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isCreator && !isAdmins) return newReply("Fitur Khusus owner!");
        if (!text)
          return newReply(
            `Gunakan dengan cara ${
              prefix + command
            } *teks_left*\n\n_Contoh_\n\n${
              prefix + command
            } Halo @user, Selamat tinggal dari @group`
          );
        if (isSetLeft(m.chat, set_left_db))
          return newReply(`Set left already active`);
        addCountCmd("#setleft", m.sender, _cmd);
        addSetLeft(q, m.chat, set_left_db);
        newReply(`Successfully set left!`);
        break;
      case "changeleft":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isCreator && !isAdmins) return newReply("Fitur Khusus owner!");
        if (!text)
          return newReply(
            `Gunakan dengan cara ${
              prefix + command
            } *teks_left*\n\n_Contoh_\n\n${
              prefix + command
            } Halo @user, Selamat tinggal dari @group`
          );
        if (isSetLeft(m.chat, set_left_db)) {
          addCountCmd("#changeleft", m.sender, _cmd);
          changeSetLeft(q, m.chat, set_left_db);
          newReply(`Sukses change set left teks!`);
        } else {
          addCountCmd("#changeleft", m.sender, _cmd);
          addSetLeft(q, m.chat, set_left_db);
          newReply(`Sukses change set left teks!`);
        }
        break;
      case "delsetleft":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isCreator && !isAdmins) return newReply("Fitur Khusus owner!");
        if (!isSetLeft(m.chat, set_left_db))
          return newReply(`Belum ada set left di sini..`);
        addCountCmd("#delsetleft", m.sender, _cmd);
        removeSetLeft(m.chat, set_left_db);
        newReply(`Sukses delete set left`);
        break;
      case "linkgrup":
      case "linkgroup":
      case "linkgc":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          let response = await juna.groupInviteCode(m.chat);
          juna.sendText(
            m.chat,
            `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`,
            m,
            { detectLink: true }
          );
        }
        break;
      case "pppanjang":
      case "setppbot2":
        {
          if (!isCreator) return newReply("Fitur Khusus owner!");
          if (!quoted)
            return newReply(`Reply foto dgn caption ${prefix + command}`);
          if (!/image/.test(mime))
            return newReply(`Reply foto dgn caption ${prefix + command}`);
          if (/webp/.test(mime))
            return newReply(`Reply foto dgn caption ${prefix + command}`);
          let media = await juna.downloadAndSaveMediaMessage(quoted);
          var { img } = await generateProfilePicture(media);
          await juna.query({
            tag: "iq",
            attrs: {
              to: botNumber,
              type: "set",
              xmlns: "w:profile:picture",
            },
            content: [
              {
                tag: "picture",
                attrs: { type: "image" },
                content: img,
              },
            ],
          });
          newReply("Done!!!");
        }
        break;
      case "pppanjanggc":
      case "ppgcfull":
      case "setppgc2":
        {
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (!quoted)
            return newReply(`Reply foto dgn caption ${prefix + command}`);
          if (!/image/.test(mime))
            return newReply(`Reply foto dgn caption ${prefix + command}`);
          if (/webp/.test(mime))
            return newReply(`Reply foto dgn caption ${prefix + command}`);
          let media = await juna.downloadAndSaveMediaMessage(quoted);
          var { img } = await generateProfilePicture(media);
          await juna.query({
            tag: "iq",
            attrs: {
              to: m.chat,
              type: "set",
              xmlns: "w:profile:picture",
            },
            content: [
              {
                tag: "picture",
                attrs: { type: "image" },
                content: img,
              },
            ],
          });
          newReply("Done!!!");
        }
        break;
      case "setppgroup":
      case "setppgrup":
      case "setppgc":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (!quoted)
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          if (!/image/.test(mime))
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          if (/webp/.test(mime))
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          let media = await juna.downloadAndSaveMediaMessage(quoted);
          await juna
            .updateProfilePicture(m.chat, { url: media })
            .catch((err) => fs.unlinkSync(media));
          newReply("Berhasil mengganti pp group");
        }
        break;
      case "setname":
      case "setsubject":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (!text)
            return newReply(`Example ${prefix + command} WhatsApp Bot`);
          await juna
            .groupUpdateSubject(m.chat, text)
            .then((res) => newReply("Done"))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "sc":
      case "source":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          sc = fs.readFileSync("./media/sound/sc.mp3");
          juna.sendMessage(
            m.chat,
            { audio: sc, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;
      case "setdesc":
      case "setdesk":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (!text)
            return newReply(`Example ${prefix + command} WhatsApp Bot`);
          await juna
            .groupUpdateDescription(m.chat, text)
            .then((res) => newReply("Done"))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "autoaigrup":
      case "aigrup":
      case "autoaigc":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins && !isCreator) return newReply("Fitur Khusus admin!");
          if (args[0] === "on") {
            addCountCmd("#autoaigrup", m.sender, _cmd);
            if (isAutoAiGc) return newReply(`Udah aktif`);
            openaigc.push(m.chat);
            fs.writeFileSync(
              "./database/openaigc.json",
              JSON.stringify(openaigc, null, 2)
            );
            newReply("Successfully Activate Auto AI");
          } else if (args[0] === "off") {
            addCountCmd("#autoaigrup", m.sender, _cmd);
            if (!isAutoAiGc) return newReply(`Udah nonaktif`);
            let anu = openaigc.indexOf(m.chat);
            openaigc.splice(anu, 1);
            fs.writeFileSync(
              "./database/openaigc.json",
              JSON.stringify(openaigc, null, 2)
            );
            newReply("Successfully Disabling Auto AI");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "autodlgc":
        {
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins && !isCreator) return newReply("Fitur Khusus admin!");
          if (args[0] === "on") {
            addCountCmd("#autodlgc", m.sender, _cmd);
            if (isAutoDlGc) return newReply(`Udah aktif`);
            autodlgc.push(m.chat);
            fs.writeFileSync(
              "./database/autodlgc.json",
              JSON.stringify(autodlgc, null, 2)
            );
            newReply("Successfully Activate Auto Downloader");
          } else if (args[0] === "off") {
            addCountCmd("#autodlgc", m.sender, _cmd);
            if (!isAutoDlGc) return newReply(`Udah nonaktif`);
            let anu = autodlgc.indexOf(m.chat);
            autodlgc.splice(anu, 1);
            fs.writeFileSync(
              "./database/autodlgc.json",
              JSON.stringify(autodlgc, null, 2)
            );
            newReply("Successfully Disabling Auto Downloader");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;

      case "antilink":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins && !isCreator) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (args[0] === "on") {
            addCountCmd("#antilink", m.sender, _cmd);
            if (isAntiLink) return newReply(`Udah aktif`);
            antilink.push(m.chat);
            fs.writeFileSync(
              "./database/antilink.json",
              JSON.stringify(antilink, null, 2)
            );
            newReply("Successfully Activate Antilink In This Group");
          } else if (args[0] === "off") {
            addCountCmd("#antilink", m.sender, _cmd);
            if (!isAntiLink) return newReply(`Udah nonaktif`);
            let anu = antilink.indexOf(m.chat);
            antilink.splice(anu, 1);
            fs.writeFileSync(
              "./database/antilink.json",
              JSON.stringify(antilink, null, 2)
            );
            newReply("Successfully Disabling Antilink In This Group");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "antilinktt":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins && !isCreator) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (args[0] === "on") {
            addCountCmd("#antilink2", m.sender, _cmd);
            if (isAntiLink2) return newReply(`Udah aktif`);
            antilink2.push(m.chat);
            fs.writeFileSync(
              "./database/antilink2.json",
              JSON.stringify(antilink2, null, 2)
            );
            newReply("Successfully Activate antilink2 In This Group");
          } else if (args[0] === "off") {
            addCountCmd("#antilink2", m.sender, _cmd);
            if (!isAntiLink2) return newReply(`Udah nonaktif`);
            let anu = antilink2.indexOf(m.chat);
            antilink2.splice(anu, 1);
            fs.writeFileSync(
              "./database/antilink2.json",
              JSON.stringify(antilink2, null, 2)
            );
            newReply("Successfully Disabling antilink2 In This Group");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "kickme":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (args[0] === "on") {
            addCountCmd("#kickme", m.sender, _cmd);
            if (isKickMe) return newReply(`Udah aktif`);
            kickme.push(m.chat);
            fs.writeFileSync(
              "./database/kickme.json",
              JSON.stringify(kickme, null, 2)
            );
            newReply("Successfully Activate Kickme In This Group");
          } else if (args[0] === "off") {
            addCountCmd("#kickme", m.sender, _cmd);
            if (!isKickMe) return newReply(`Udah nonaktif`);
            let anu = kickme.indexOf(m.chat);
            kickme.splice(anu, 1);
            fs.writeFileSync(
              "./database/kickme.json",
              JSON.stringify(kickme, null, 2)
            );
            newReply("Successfully Disabling Kickme In This Group");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "mute":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins && !isCreator) return newReply("Fitur Khusus admin!");
          if (args[0] === "on") {
            addCountCmd("#mute", m.sender, _cmd);
            if (isMute) return newReply(`Udah Mute`);
            mute.push(m.chat);
            fs.writeFileSync(
              "./database/mute.json",
              JSON.stringify(mute, null, 2)
            );
            newReply("Successfully Mute In This Group");
          } else if (args[0] === "off") {
            addCountCmd("#mute", m.sender, _cmd);
            if (!isMute) return newReply(`Udah Unmute`);
            let anu = mute.indexOf(m.chat);
            mute.splice(anu, 1);
            fs.writeFileSync(
              "./database/mute.json",
              JSON.stringify(mute, null, 2)
            );
            newReply("Successfully Unmute In This Group");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "antidelete":
        {
          // if (!m.isGroup) return newReply('Fitur Khusus Group!')
          if (!isCreator) return newReply("Fitur Khusus owner!");
          //if (!isBotAdmins) return newReply(mess.BotAdmin)
          if (args[0] === "on") {
            addCountCmd("#antidelete", m.sender, _cmd);
            if (setting.antiDelete) return newReply(`Udah aktif`);
            setting.antiDelete = true;
            newReply("Successfully Activate antidelete In This bot");
          } else if (args[0] === "off") {
            addCountCmd("#antidelete", m.sender, _cmd);
            if (!setting.antiViewOnce) return newReply(`Udah nonaktif`);
            setting.antiDelete = false;
            newReply("Successfully Disabling antidelete In This bot");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "antionce":
      case "antivo":
      case "antiviewonce":
        {
          // if (!m.isGroup) return newReply('Fitur Khusus Group!')
          if (!isCreator) return newReply("Fitur Khusus owner!");
          // if (!isBotAdmins) return newReply(mess.BotAdmin)
          if (args[0] === "on") {
            addCountCmd("#antionce", m.sender, _cmd);
            if (setting.antiViewOnce) return newReply(`Udah aktif`);
            setting.antiViewOnce = true;
            newReply("Successfully Activate Anti view once In This bot");
          } else if (args[0] === "off") {
            addCountCmd("#antionce", m.sender, _cmd);
            if (!setting.antiViewOnce) return newReply(`Udah nonaktif`);
            setting.antiViewOnce = false;
            newReply("Successfully Disabling Anti view once In This bot");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "antiwame":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (args[0] === "on") {
            addCountCmd("#antiwame", m.sender, _cmd);
            if (isAntiWame) return newReply(`Udah aktif`);
            antiwame.push(m.chat);
            fs.writeFileSync(
              "./database/antiwame.json",
              JSON.stringify(antiwame, null, 2)
            );
            newReply("Successfully Activate Antiwame In This Group");
          } else if (args[0] === "off") {
            addCountCmd("#antiwame", m.sender, _cmd);
            if (!isAntiWame) return newReply(`Udah nonaktif`);
            let anu = antiwame.indexOf(m.chat);
            antiwame.splice(anu, 1);
            fs.writeFileSync(
              "./database/antiwame.json",
              JSON.stringify(antiwame, null, 2)
            );
            newReply("Successfully Disabling Antiwame In This Group");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "antiwame2":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (args[0] === "on") {
            addCountCmd("#antiwame2", m.sender, _cmd);
            if (isAntiWame2) return newReply(`Udah aktif`);
            antilink.push(m.chat);
            fs.writeFileSync(
              "./database/antiwame2.json",
              JSON.stringify(antiwame2, null, 2)
            );
            newReply("Successfully Activate antiwame2 In This Group");
          } else if (args[0] === "off") {
            addCountCmd("#antiwame2", m.sender, _cmd);
            if (!isAntiWame2) return newReply(`Udah nonaktif`);
            let anu = antiwame2.indexOf(m.chat);
            antiwame2.splice(anu, 1);
            fs.writeFileSync(
              "./database/antiwame2.json",
              JSON.stringify(antiwame2, null, 2)
            );
            newReply("Successfully Disabling antiwame2 In This Group");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "opentime":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins && !isCreator) return newReply("Lu Siapa Kocak");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (args[1] == "detik") {
            var timer = args[0] * `1000`;
          } else if (args[1] == "menit") {
            var timer = args[0] * `60000`;
          } else if (args[1] == "jam") {
            var timer = args[0] * `3600000`;
          } else if (args[1] == "hari") {
            var timer = args[0] * `86400000`;
          } else {
            return newReply(
              "*Pilih:*\ndetik\nmenit\njam\n\n*Example*\n10 detik"
            );
          }
          newReply(`Grup Akan Dibuka Dalam ${q} Dimulai Dari Sekarang`);
          setTimeout(() => {
            var nomor = m.participant;
            const open = `Grup Telah Di Buka Oleh Admin\nSekarang Semua Member Dapat Mengirim Pesan`;
            juna.groupSettingUpdate(m.chat, "not_announcement");
            newReply(open);
          }, timer);
        }
        break;
      case "open":
      case "buka": {
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        if (!isBotAdmins) return newReply(mess.BotAdmin);
        addCountCmd("#group", m.sender, _cmd);
        juna.groupSettingUpdate(m.chat, "not_announcement");
        const textOpen = await getTextSetOpen(m.chat, set_open);
        newReply(
          textOpen ||
            `Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`
        );
        break;
      }
      case "setopen":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isCreator) return newReply("Fitur Khusus owner!");
          if (!text)
            return newReply(
              `Gunakan dengan cara ${
                prefix + command
              } *teks open*\n\n_Contoh_\n\n${
                prefix + command
              } Halo Semuanya, group sudah buka`
            );
          if (isSetOpen(m.chat, set_open))
            return newReply(`Set open sudah ada sebelumnya`);
          addSetOpen(text, m.chat, set_open);
          addCountCmd("#setopen", m.sender, _cmd);
          newReply(`✅ Done set open!`);
        }
        break;
      case "changeopen":
      case "changesetopen":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isCreator) return newReply("Fitur Khusus owner!");
        if (!text)
          return newReply(
            `Gunakan dengan cara ${
              prefix + command
            } *teks open*\n\n_Contoh_\n\n${
              prefix + command
            } Halo Semuanya, group sudah buka`
          );
        if (isSetOpen(m.chat, set_open)) {
          addCountCmd("#changeopen", m.sender, _cmd);
          changeSetOpen(text, m.chat, set_open);
          newReply(`Sukses ubah set open teks!`);
        } else {
          addCountCmd("#changeopen", m.sender, _cmd);
          addSetOpen(text, m.chat, set_open);
          newReply(`Sukses ubah set open teks!`);
        }
        break;
      case "delsetopen":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isCreator) return newReply("Fitur Khusus owner!");
        if (!isSetOpen(m.chat, set_open))
          return newReply(`Belum ada set open di sini..`);
        removeSetOpen(m.chat, set_open);
        addCountCmd("#delsetopen", m.sender, _cmd);
        newReply(`Sukses delete set open`);
        break;
      case "closetime":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins && !isCreator) return newReply("Lu Siapa Kocak");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          if (args[1] == "detik") {
            var timer = args[0] * `1000`;
          } else if (args[1] == "menit") {
            var timer = args[0] * `60000`;
          } else if (args[1] == "jam") {
            var timer = args[0] * `3600000`;
          } else if (args[1] == "harj") {
            var timer = args[0] * `86400000`;
          } else {
            return newReply(
              "*Pilih:*\ndetik\nmenit\njam\n\n*Example*\n10 detik"
            );
          }
          newReply(`Group Akan Ditutup Dalam ${q} Di Mulai Dari Sekarang`);
          setTimeout(() => {
            var nomor = m.participant;
            const close = `Grup Di Tutup Oleh Admin\nSekarang Hanya Admin Yang Dapat Mengirim Pesan`;
            juna.groupSettingUpdate(m.chat, "announcement");
            newReply(close);
          }, timer);
        }
        break;
      case "close":
      case "tutup":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        if (!isBotAdmins) return newReply(mess.BotAdmin);
        addCountCmd("#close", m.sender, _cmd);
        juna.groupSettingUpdate(m.chat, "announcement");
        const textClose = await getTextSetClose(m.chat, set_close);
        newReply(
          textClose ||
            `Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`
        );
        break;
      case "setclose":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isCreator) return newReply("Fitur Khusus owner!");
          if (!text)
            return newReply(
              `Gunakan dengan cara ${
                prefix + command
              } *teks close*\n\n_Contoh_\n\n${
                prefix + command
              } Halo Semuanya, group close dulu ya`
            );
          if (isSetClose(m.chat, set_close))
            return newReply(`Set close sudah ada sebelumnya`);
          addSetClose(text, m.chat, set_close);
          addCountCmd("#setclose", m.sender, _cmd);
          newReply(`✅ Done set close!`);
        }
        break;
      case "changeclose":
      case "changesetclose":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isCreator) return newReply("Fitur Khusus owner!");
        if (!text)
          return newReply(
            `Gunakan dengan cara ${
              prefix + command
            } *teks close*\n\n_Contoh_\n\n${
              prefix + command
            } Halo Semuanya, group close dulu ya`
          );
        if (isSetClose(m.chat, set_close)) {
          addCountCmd("#changeclose", m.sender, _cmd);
          changeSetClose(text, m.chat, set_close);
          newReply(`Sukses ubah set close teks!`);
        } else {
          addCountCmd("#changeclose", m.sender, _cmd);
          addSetClose(text, m.chat, set_close);
          newReply(`Sukses ubah set close teks!`);
        }
        break;
      case "delsetclose":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isCreator) return newReply("Fitur Khusus owner!");
        if (!isSetClose(m.chat, set_close))
          return newReply(`Belum ada set close di sini..`);
        removeSetClose(m.chat, set_close);
        addCountCmd("#delsetclose", m.sender, _cmd);
        newReply(`Sukses delete set close`);
        break;
      case "kick":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isCreator && !isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await juna
            .groupParticipantsUpdate(m.chat, [users], "remove")
            .then((res) => newReply("Sukses kick target✅"))
            .catch((err) =>
              newReply("Tag/reply pesan target yang ingin di kick!")
            );
        }
        break;
      case "add":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isCreator && !isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          let users = m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await juna
            .groupParticipantsUpdate(m.chat, [users], "add")
            .then((res) => newReply("Sukses add member✅"))
            .catch((err) =>
              newReply("❌ Terjadi kesalahan, mungkin nmr nya privat")
            );
        }
        break;
      case "promote":
      case "pm":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isCreator && !isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await juna
            .groupParticipantsUpdate(m.chat, [users], "promote")
            .then((res) => newReply("Sukses promote member✅"))
            .catch((err) => newReply("❌ Terjadi kesalahan"));
        }
        break;
      case "demote":
      case "dm":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isCreator && !isAdmins) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await juna
            .groupParticipantsUpdate(m.chat, [users], "demote")
            .then((res) => newReply("Sukses demote admin✅"))
            .catch((err) => newReply("❌ Terjadi kesalahan"));
        }
        break;
      case "revoke":
        if (isBan) return newReply("Lu di ban kocak awokwok");
        if (!m.isGroup) return newReply("Fitur Khusus Group!");
        if (!isAdmins) return newReply("Fitur Khusus admin!");
        if (!isBotAdmins) return newReply(mess.BotAdmin);
        addCountCmd("#revoke", m.sender, _cmd);
        await juna
          .groupRevokeInvite(m.chat)
          .then((res) => {
            newReply(`Sukses menyetel tautan undangan grup ini`);
          })
          .catch(() => newReply(mess.error.api));
        break;
      case "tagall":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins && !isCreator) return newReply("Lu Siapa?");
          if (!isBotAdmins) return newReply("Bot Harus Jad Admin!");
          let teks = `*👥 Tag All By Admin*
 
🗞️ *Pesan : ${q ? q : "kosong"}*\n\n`;
          for (let mem of participants) {
            teks += `• @${mem.id.split("@")[0]}\n`;
          }
          juna.sendMessage(
            m.chat,
            {
              text: teks,
              mentions: participants.map((a) => a.id),
            },
            {
              quoted: m,
            }
          );
        }
        break;
      case "hidetag":
      case "h":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins && !isCreator) return newReply("Lu siapa kocak?");
          juna.sendMessage(
            m.chat,
            { text: q ? q : "", mentions: participants.map((a) => a.id) },
            { quoted: fkontak }
          );
        }
        break;
      case "delete":
      case "d":
      case "del":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.quoted) throw false;
          if (!isAdmins && !isCreator) return newReply("Fitur Khusus admin!");
          if (!isBotAdmins) return newReply(mess.BotAdmin);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await juna.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              id: m.quoted.id,
              participant: m.quoted.sender,
            },
          });
        }
        break;
      case "checksewa":
      case "ceksewa":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isSewa) return newReply(`Bot tidak di sewa group ini!`);
          addCountCmd("#checksewa", m.sender, _cmd);
          let ceksewa = ms(_sewa.getSewaExpired(m.chat, sewa) - Date.now());
          let sewanya = `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s)`;
          newReply(sewanya);
        }
        break;
      case "pinterest":
      case "pin":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");

          if (!text)
            return newReply(
              `Gunakan dengan cara ${prefix + command} *text*\n\n_Contoh_\n\n${
                prefix + command
              } Anime`
            );
          newReply(
            `Silahkan ditunggu, jika bot tidak mengirimkan foto silahkan diulang command tersebut`
          );
          let anu = await pinterest(text);
          let result = anu[Math.floor(Math.random() * anu.length)];
          juna.sendMessage(
            m.chat,
            { image: { url: result }, caption: "Done kak" },
            { quoted: m }
          );
        }

        break;
      case "yts":
      case "ytsearch":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          if (!text)
            newReply(
              `Gunakan dengan cara ${prefix + command} *text*\n\n_Contoh_\n\n${
                prefix + command
              } Cara membuat bot WhatsApp`
            );
          let reso = await yts(`${text}`);
          let aramat = reso.all;
          var tbuff = await getBuffer(aramat[0].image);
          let teks = aramat
            .map((v) => {
              switch (v.type) {
                case "video":
                  return `
📛 Title : *${v.title}* 
⏰ Durasi: ${v.timestamp}
🚀 Diupload ${v.ago}
😎 Views : ${v.views}
🌀 Url : ${v.url}
`.trim();
                case "channel":
                  return `
📛 Channel : *${v.name}*
🌀 Url : ${v.url}
👻 Subscriber : ${v.subCountLabel} (${v.subCount})
🎦 Total Video : ${v.videoCount}
`.trim();
              }
            })
            .filter((v) => v)
            .join("\n----------------------------------------\n");

          juna
            .sendMessage(m.chat, { image: tbuff, caption: teks }, { quoted: m })

            .catch((err) => {
              newReply("Not found");
            });
        }
        break;

      case "transfer":

      case "setcmd":
      case "addcmd":
        {
          if (!m.quoted) return newReply("Reply Pesan!");
          if (!m.quoted.fileSha256) return newReply("SHA256 Hash Missing");
          if (!text) return newReply(`Contoh ${prefix + command} .menu`);
          let hash = m.quoted.fileSha256.toString("base64");
          if (db.data.sticker[hash] && db.data.sticker[hash].locked)
            return newReply(
              "You have no permission to change this sticker command"
            );
          db.data.sticker[hash] = {
            text,
            mentionedJid: m.mentionedJid,
            creator: m.sender,
            at: +new Date(),
            locked: false,
          };
          newReply(`Done!`);
        }
        break;
      case "delcmd":
        {
          let hash = m.quoted.fileSha256.toString("base64");
          if (!hash) return newReply("SHA256 Hash Missing");
          if (db.data.sticker[hash] && db.data.sticker[hash].locked)
            return newReply(
              "You have no permission to change this sticker command"
            );
          delete db.data.sticker[hash];
          newReply(`Done!`);
        }
        break;
      // Owners Menu
      case "listgc":
        {
          if (!isCreator) return newReply("Lu Siapa Kocak?");
          let anulistg = await store.chats
            .all()
            .filter((v) => v.id.endsWith("@g.us"))
            .map((v) => v.id);
          let teks = `*Group Chat*
Total: ${anulistg.length} Group\n\n`;
          for (let i of anulistg) {
            let metadata = await juna.groupMetadata(i);
            teks += `*Name :* ${metadata.subject}
*Owner :* ${
              metadata.owner !== undefined
                ? "@" + metadata.owner.split`@`[0]
                : "Unknown"
            }
*ID :* ${metadata.id}
*Made :* ${moment(metadata.creation * 1000)
              .tz("Asia/Kolkata")
              .format("DD/MM/YYYY HH:mm:ss")}
*Member :* ${metadata.participants.length}\n\n──────────────\n\n`;
          }
          juna.sendTextWithMentions(m.chat, teks, m);
        }
        break;
      case "creategc":
        {
          if (!isCreator) return newReply("Lu Siapa Kocak?");
          if (!args.join(" ")) return newReply(`Masukkan nama grup`);
          let cret = await juna.groupCreate(args.join(" "), []);
          let response = await juna.groupInviteCode(cret.id);
          teks = `「 Group Create Fitur 」

༫ Subject Group : ${cret.subject}
༫ Owner Group : @${cret.owner.split("@")[0]}
༫ Creation Group : ${moment(cret.creation * 1000)
            .tz("Asia/Jakarta")
            .format("DD/MM/YYYY HH:mm:ss")} WIB

⌞ ʟɪɴᴋ ɢʀᴏᴜᴘ ⌝
https://chat.whatsapp.com/${response}
`;
          juna.sendMessage(
            m.chat,
            { text: teks, mentions: parseMention(teks) },
            { quoted: m }
          );
          await sleep(500);
          juna.sendMessage(`${groupMetadata.id}`, {
            text: "Welcome to the new group members hehe",
          });
        }
        break;
      case "joingc":
      case "join":
        {
          if (!isCreator)
            return newReply(
              `Mau sewa bot buat jaga gc? silahkan hubungi owner`
            );
          if (!text)
            return newReply(`Kirim perintah ${prefix + command} _linkgrup_`);
          if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
            return newReply(mess.error.Iv);
          newReply(mess.wait);
          let result = args[0].split("https://chat.whatsapp.com/")[1];
          await juna
            .groupAcceptInvite(result)
            .then((res) => newReply(jsonformat(res)))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "leavegc":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          await juna
            .groupLeave(m.chat)
            .then((res) => newReply(jsonformat(res)))
            .catch((err) => newReply(jsonformat(err)));
        }
        break;
      case "public":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          juna.public = true;
          newReply("Sukses Change To Public Mode");
        }
        break;
      case "self":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          juna.public = false;
          newReply("Sukses Change To Self Mode");
        }
        break;
      case "banuser":
      case "banneduser":
        {
          if (!isCreator) return newReply("Khusus Owner");
          let who;
          try {
            if (m.isGroup)
              who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
          } catch (err) {
            if (m.isGroup) who = text + "@s.whatsapp.net";
          }
          if (!who) return newReply("Tag/reply number to banned");
          const isBen = user_ban.includes(who);
          if (isBen) return newReply(`${isBen} Already on the Banned list !!`);

          user_ban.push(who);
          fs.writeFileSync(
            "./database/banned.json",
            JSON.stringify(user_ban, 2, null)
          );
          await sleep(500);
          newReply(
            who + "\nMampus di banned bot kgk bisa akses fitur bot lagi"
          );
        }
        break;
      case "unbanneduser":
      case "unbanuser":
        {
          if (!isCreator) return newReply("Khusus Owner!");
          let whe;
          try {
            if (m.isGroup)
              whe = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
          } catch (err) {
            if (m.isGroup) whe = text + "@s.whatsapp.net";
          }
          if (!whe) return newReply("Tag/reply number to unban");
          user_ban.splice(whe, 1);
          fs.writeFileSync(
            "./database/banned.json",
            JSON.stringify(user_ban, 2, null)
          );
          await sleep(500);
          newReply(
            whe + "\nHuft untung lu di Unbanned jdi bisa akses fitur bot lagi:v"
          );
        }
        break;
      case "listban":
      case "listbanned":
        {
          var textban = `_*List User Yang Terbanned Di Database :*_ *${user_ban.length}*`;
          await juna.sendMessage(
            m.chat,
            {
              text: textban,
              contextInfo: {
                externalAdReply: {
                  title: botName,
                  body: "",
                  thumbnailUrl: pathimg,
                  sourceUrl: gcwa,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            },
            { quoted: fkontak }
          );
        }
        break;
      case "block":
      case "blok":
        if (!isCreator) return newReply(mess.OnlyOwner);
        if (!text) return newReply(`Masukkan nomor target!`);
        let blok = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        juna.updateBlockStatus(blok, "block");
        newReply(`Sukses block @${blok.split("@")[0]}`);
        break;
      case "unblock":
      case "unblok":
        if (!isCreator) return newReply(mess.OnlyOwner);
        if (!text) return newReply(`Masukkan nomor target!`);
        let unblok = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        juna.updateBlockStatus(unblok, "unblock");
        newReply(`Sukses unblock @${unblok.split("@")[0]}`);
        break;
      case "listblock":
      case "listblok":
        let listblok = await juna.fetchBlocklist();
        newReply(
          "*LIST BLOCK*\n" +
            `Total: ${
              listblok == undefined
                ? "*0* Diblokir"
                : "*" + listblok.length + "* Diblokir"
            }\n\n` +
            listblok.map((v) => "» @" + v.replace(/@.+/, "")).join`\n`
        );
        break;
      case "sampah":
        if (!isCreator) return newReply(mess.OnlyOwner);
        let all = await fs.readdirSync("./sampah");
        var teks = `JUMLAH SAMPAH SYSTEM\n\n`;
        teks += `Total : ${
          all
            .filter(
              (v) =>
                v.endsWith("gif") ||
                v.endsWith("png") ||
                v.endsWith("mp3") ||
                v.endsWith("mp4") ||
                v.endsWith("jpg") ||
                v.endsWith("jpeg") ||
                v.endsWith("webp") ||
                v.endsWith("webm")
            )
            .map((v) => v).length
        } Sampah\n\n`;
        teks += all
          .filter(
            (v) =>
              v.endsWith("gif") ||
              v.endsWith("png") ||
              v.endsWith("mp3") ||
              v.endsWith("mp4") ||
              v.endsWith("jpg") ||
              v.endsWith("jpeg") ||
              v.endsWith("webp") ||
              v.endsWith("webm")
          )
          .map((o) => `${o}\n`)
          .join("");
        newReply(teks);
        break;
      case "delsampah":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          let directoryPath = path.join("./sampah"); //&& './media') //path.join();
          fs.readdir(directoryPath, async function (err, files) {
            if (err) {
              return newReply("Tidak dapat memindai direktori: " + err);
            }
            let filteredArray = await files.filter(
              (item) =>
                item.endsWith("gif") ||
                item.endsWith("png") ||
                item.endsWith("mp3") ||
                item.endsWith("mp4") ||
                item.endsWith("jpg") ||
                item.endsWith("jpeg") ||
                item.endsWith("webp") ||
                item.endsWith("webm")
            );
            var teks = `Terdeteksi ${filteredArray.length} file sampah\n\n`;
            if (filteredArray.length == 0) return newReply(teks);
            filteredArray.map(function (e, i) {
              teks += i + 1 + `. ${e}\n`;
            });
            newReply(teks);
            await sleep(2000);
            newReply("Menghapus file sampah...");
            await filteredArray.forEach(function (file) {
              fs.unlinkSync(`./sticker/${file}`); //&& `./media/${file}`)
            });
            await sleep(2000);
            newReply("Berhasil menghapus semua sampah");
          });
        }
        break;
      case "sampah2":
        if (!isCreator) return newReply(mess.OnlyOwner);
        let fl = await fs.readdirSync("./");
        var teks = `JUMLAH SAMPAH SYSTEM\n\n`;
        teks += `Total : ${
          all.filter((v) => v.endsWith("mp3")).map((v) => v).length
        } Sampah\n\n`;
        teks += fl
          .filter((v) => v.endsWith("mp3"))
          .map((o) => `${o}\n`)
          .join("");
        newReply(teks);
        break;
      case "delsampah2":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          let directoryPath = path.join("./"); //&& './media') //path.join();
          fs.readdir(directoryPath, async function (err, files) {
            if (err) {
              return newReply("Tidak dapat memindai direktori: " + err);
            }
            let filteredArray = await files.filter((item) =>
              item.endsWith("mp3")
            );
            var teks = `Terdeteksi ${filteredArray.length} file sampah\n\n`;
            if (filteredArray.length == 0) return newReply(teks);
            filteredArray.map(function (e, i) {
              teks += i + 1 + `. ${e}\n`;
            });
            newReply(teks);
            await sleep(2000);
            newReply("Menghapus file sampah...");
            await filteredArray.forEach(function (file) {
              fs.unlinkSync(`./${file}`); //&& `./media/${file}`)
            });
            await sleep(2000);
            newReply("Berhasil menghapus semua sampah");
          });
        }
        break;
      case "setppbot":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          if (!quoted)
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          if (!/image/.test(mime))
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          if (/webp/.test(mime))
            return newReply(
              `Kirim/Reply Image Dengan Caption ${prefix + command}`
            );
          let media = await juna.downloadAndSaveMediaMessage(quoted);
          await juna
            .updateProfilePicture(botNumber, { url: media })
            .catch((err) => fs.unlinkSync(media));
          newReply("Done");
        }
        break;
      case "autobio":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          if (args[0] === "on") {
            if (setting.autobio === true) return newReply("Udh on");
            setting.autobio = true;
            newReply("Autobio berhasil diaktifkan");
          } else if (args[0] === "off") {
            if (setting.autobio === false) return newReply("Udh off");
            setting.autobio = false;
            newReply("Autobio berhasil dinonaktifkan");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "anticall":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          if (args[0] === "on") {
            if (setting.anticall === true) return newReply("Udh on");
            setting.anticall = true;
            newReply("Anticall berhasil diaktifkan");
          } else if (args[0] === "off") {
            if (setting.anticall === false) return newReply("Udh off");
            setting.anticall = false;
            newReply("Anticall berhasil dinonaktifkan");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "autorespond":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          if (args[0] === "on") {
            if (setting.autorespond === true) return newReply("Udh on");
            setting.autorespond = true;
            newReply("Autorespond berhasil diaktifkan");
          } else if (args[0] === "off") {
            if (setting.autorespond === false) return newReply("Udh off");
            setting.autorespond = false;
            newReply("Autorespond berhasil dinonaktifkan");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "autoblok":
      case "autoblok212":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          if (args[0] === "on") {
            if (setting.autoblok212 === true) return newReply("Udh on");
            setting.autoblok212 = true;
            newReply("Autoblok berhasil diaktifkan");
          } else if (args[0] === "off") {
            if (setting.autoblok212 === false) return newReply("Udh off");
            setting.autoblok212 = false;
            newReply("Autoblok berhasil dinonaktifkan");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "autoread":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          if (args[0] === "on") {
            if (setting.autoread === true) return newReply("Udh on");
            setting.autoread = true;
            newReply("Autoread berhasil diaktifkan");
          } else if (args[0] === "off") {
            if (setting.autoread === false) return newReply("Udh off");
            setting.autoread = false;
            newReply("Autoread berhasil dinonaktifkan");
          } else {
            newReply(
              `${prefix + command} on -- _mengaktifkan_\n${
                prefix + command
              } off -- _Menonaktifkan_`
            );
          }
        }
        break;
      case "delchat":
        if (!isCreator) return newReply(mess.OnlyOwner);
        var teks = q ? q : m.chat;
        await juna.chatModify(
          {
            delete: true,
            lastMessages: [
              { key: m.key, messageTimestamp: m.messageTimestamp },
            ],
          },
          teks
        );
        newReply("Sukses!");
        break;
      case "bcsewa":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          if (!text) return newReply(`Example : ${prefix + command} Tes`);
          addCountCmd("#bcsewa", m.sender, _cmd);
          for (let i of sewa) {
            await juna.sendMessage(i.id, { text: text });
            await sleep(3000);
          }
          newReply(`Sukses bc ke ${sewa.length}`);
        }
        break;
      case "addprem":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          const swn = args.join(" ");
          const pcknm = swn.split("|")[0];
          const atnm = swn.split("|")[1];
          if (!pcknm)
            return newReply(
              `Penggunaan :\n*${prefix}addprem* @tag|waktu\n*${prefix}addprem* nomor|waktu\n\nContoh : ${
                prefix + command
              } @tag|30d`
            );
          if (!atnm) return newReply(`Mau yang berapa hari?`);
          let users = m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          if (users) {
            addCountCmd("#addprem", m.sender, _cmd);
            _prem.addPremiumUser(
              (pcknm.replace("@", "") + "@s.whatsapp.net").replace(" @", "@"),
              atnm,
              premium
            );
            newReply("Sukses");
          } else {
            var cekap = await juna.onWhatsApp(pcknm + "@s.whatsapp.net");
            if (cekap.length == 0)
              return newReply(
                `Masukkan nomer yang valid/terdaftar di WhatsApp`
              );
            addCountCmd("#addprem", m.sender, _cmd);
            _prem.addPremiumUser(
              (pcknm.replace("@", "") + "@s.whatsapp.net").replace(" @", "@"),
              atnm,
              premium
            );
            newReply("Sukses");
          }
        }
        break;
      case "delprem":
        if (!isCreator) return newReply(mess.OnlyOwner);
        if (!args[0])
          return newReply(
            `Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`
          );
        let users = m.quoted
          ? m.quoted.sender
          : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (users) {
          addCountCmd("#delprem", m.sender, _cmd);
          premium.splice(_prem.getPremiumPosition(users, premium), 1);
          fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
          newReply("Sukses!");
        } else {
          var cekpr = await juna.onWhatsApp(args[0] + "@s.whatsapp.net");
          if (cekpr.length == 0)
            return newReply(`Masukkan nomer yang valid/terdaftar di WhatsApp`);
          addCountCmd("#delprem", m.sender, _cmd);
          premium.splice(
            _prem.getPremiumPosition(args[0] + "@s.whatsapp.net", premium),
            1
          );
          fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
          newReply("Sukses!");
        }
        break;
      case "addsewa":
        if (!isCreator) return newReply(mess.OnlyOwner);
        if (text < 2)
          return newReply(
            `Gunakan dengan cara ${
              prefix + command
            } *linkgc waktu*\n\nContoh : ${
              prefix + command
            } https://chat.whatsapp.com/PnwpPqn0b 30d`
          );
        if (!isUrl(args[0])) return newReply(mess.error.Iv);
        var url = args[0];
        addCountCmd("#addsewa", m.sender, _cmd);
        url = url.split("https://chat.whatsapp.com/")[1];
        if (!text) return newReply(`Waktunya?`);
        var data = await juna.groupAcceptInvite(url);
        if (_sewa.checkSewaGroup(data, sewa))
          return newReply(`Bot sudah disewa oleh grup tersebut!`);
        _sewa.addSewaGroup(data, args[1], sewa);
        newReply(`Success Add Sewa Group Berwaktu!`);
        break;
      case "delsewa":
        if (!isCreator) return newReply(mess.OnlyOwner);
        if (!m.isGroup)
          return newReply(
            `Perintah ini hanya bisa dilakukan di Grup yang menyewa bot`
          );
        if (!isSewa) return newReply(`Bot tidak disewa di Grup ini`);
        addCountCmd("#delsewa", m.sender, _cmd);
        sewa.splice(_sewa.getSewaPosition(args[0] ? args[0] : m.chat, sewa), 1);
        fs.writeFileSync("./database/sewa.json", JSON.stringify(sewa, null, 2));
        newReply(`Sukses`);
        break;
      case "addowner":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          if (!text)
            return newReply(`Gunakan dengan cara ${prefix + command} *@tag*`);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          if (users) {
            ownerNumber.push(users);
            fs.writeFileSync("./config.json", JSON.stringify(setting, null, 2));
            newReply(`Sukses`);
          } else {
            newReply(`Gunakan dengan cara ${prefix + command} *@tag*`);
          }
        }
        break;
      case "delowner":
        {
          if (!isCreator) return newReply(mess.OnlyOwner);
          if (!text)
            return newReply(
              `Gunakan dengan cara ${prefix + command} *@tag/jid*`
            );
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          if (users) {
            if (!ownerNumber.includes(users))
              return newReply(`Dia bukan owner`);
            ownerNumber.splice(ownerNumber.indexOf(users, 1));
            newReply(`Sukses`);
          } else {
            newReply(`Gunakan dengan cara ${prefix + command} *@tag*`);
          }
        }
        break;
      case "confess":
      case "menfes":
      case "menfess":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          this.menfes = this.menfes ? this.menfes : {};
          roof = Object.values(this.menfes).find((menpes) =>
            [menpes.a, menpes.b].includes(m.sender)
          );
          if (roof) return newReply("Kamu masih berada dalam sesi menfess");
          if (m.isGroup) return newReply("Fitur Khusus Di private chat!");
          if (!text)
            return newReply(
              `Kirim Perintah ${
                prefix + command
              } nama|nomor|pesan\n\nContoh :\n${
                prefix + command
              } ${pushname}|628xxx|Menfes nih\n`
            );
          if (!text.includes("|"))
            return newReply(
              `Kirim Perintah ${
                prefix + command
              } nama|nomor|pesan\n\nContoh :\n${
                prefix + command
              } ${pushname}|6292818802718|Menfes nih\n`
            );
          let [namaNya, nomorNya, pesanNya] = text.split`|`;
          if (nomorNya.startsWith("0"))
            return newReply(
              `Kirim Perintah ${
                prefix + command
              } nama|nomor|pesan\n\nContoh :\n${
                prefix + command
              } ${pushname}|628xxx|Menfes nih\n`
            );
          if (isNaN(nomorNya))
            return newReply(
              `Kirim Perintah ${
                prefix + command
              } nama|nomor|pesan\n\nContoh :\n${
                prefix + command
              } ${pushname}|628xxx|Menfes nih\n`
            );
          var yoi = `Hi ada menfess nih buat kamu\n\nDari : ${namaNya}\nPesan : ${pesanNya}\n\nSilahkan ketik ${prefix}balasmenfess -- Untuk menerima menfess/confess\nSilahkan ketik ${prefix}tolakmenfess -- Untuk menolak menfess/confess\n\n_Pesan ini di tulis oleh seseorang pengguna bot, bot hanya menyampaikan saja_`;
          let tod = await getBuffer(
            "https://telegra.ph/file/c8fdfc8426f5f60b48cca.jpg"
          );
          let id = m.sender;
          this.menfes[id] = {
            id,
            a: m.sender,
            b: nomorNya + "@s.whatsapp.net",
            state: "WAITING",
          };
          await juna.sendMessage(
            nomorNya + "@s.whatsapp.net",
            { image: tod, caption: yoi },
            {}
          );
          newReply(
            "Pesan berhasil dikirim ke nomor tujuan. Moga aja dibales coy"
          );
        }
        break;
      case "balasmenfess":
      case "balasmenfes":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          roof = Object.values(this.menfes).find((menpes) =>
            [menpes.a, menpes.b].includes(m.sender)
          );
          if (!roof) return newReply("Belum ada sesi menfess");
          find = Object.values(this.menfes).find(
            (menpes) => menpes.state == "WAITING"
          );
          let room = Object.values(this.menfes).find(
            (room) =>
              [room.a, room.b].includes(m.sender) && room.state === "WAITING"
          );
          let other = [room.a, room.b].find((user) => user !== m.sender);
          find.b = m.sender;
          find.state = "CHATTING";
          this.menfes[find.id] = { ...find };
          await juna.sendMessage(other, {
            text: `_@${
              m.sender.split("@")[0]
            } telah menerima menfess kamu, sekarang kamu bisa chat lewat bot ini_\n\n*NOTE :*\nJika ingin berhenti dari menfess, silahkan ketik .stopmenfess`,
            mentions: [m.sender],
          });
          juna.sendMessage(m.chat, {
            text: `_Menfess telah diterima, sekarang kamu bisa chatan lewat bot ini_\n\n*NOTE :*\nJika ingin berhenti dari menfess, silahkan ketik .stopmenfess`,
          });
        }
        break;
      case "tolakmenfess":
      case "tolakmenfes":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          roof = Object.values(this.menfes).find((menpes) =>
            [menpes.a, menpes.b].includes(m.sender)
          );
          if (!roof) return newReply("Belum ada sesi menfess");
          let room = Object.values(this.menfes).find(
            (room) =>
              [room.a, room.b].includes(m.sender) && room.state === "WAITING"
          );
          let other = [room.a, room.b].find((user) => user !== m.sender);
          find = Object.values(this.menfes).find(
            (menpes) => menpes.state == "WAITING"
          );
          juna.sendMessage(other, {
            text: `_Uppsss... @${m.sender.split("@")[0]} Menolak menfess kamu_`,
            mentions: [m.sender],
          });
          // await juna.sendMessage(find.a, {text: `_Uppsss... @${find.b.split("@")[0]} Menolak menfess kamu_`,mentions: [find.b]})
          newReply("Menfess berhasil di tolak 🤚");
          delete this.menfes[roof.id];
        }
        break;
      case "stopconfess":
      case "stopmenfess":
        {
          if (isBan) return newReply("Lu di ban kocak awokwok");
          //find = Object.values(this.menfes).find(menpes => menpes.state == 'WAITING')
          find = Object.values(this.menfes).find((menpes) =>
            [menpes.a, menpes.b].includes(m.sender)
          );
          if (!find) return newReply("Belum ada sesi menfess");
          const to = find.a == m.sender ? find.b : find.a;
          juna.sendMessage(to, {
            text: `_Teman chat telah menghentikan menfess ini_`,
            mentions: [m.sender],
          });
          await newReply("ok");
          delete this.menfes[find.id];
        }
        break;
      default:
        if (budy && ["proses", "Proses"].includes(budy) && !isCmd) {
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins) return newReply("Fitur Khusus admin!");
          if (!m.quoted) return newReply("Reply pesanan yang akan proses");
          let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1];
          let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM : @jam\n✨ STATUS : Pending\`\`\`\n\n📝 Catatan :\n@pesanan\n\nPesanan @user sedang di proses!`;
          const getTextP = getTextSetProses(m.chat, set_proses);
          if (getTextP !== undefined) {
            var anunya = getTextP
              .replace("@pesanan", tek ? tek : "-")
              .replace("@user", "@" + m.quoted.sender.split("@")[0])
              .replace("@jam", time)
              .replace("@tanggal", tanggal(new Date()))
              .replace("@user", "@" + m.quoted.sender.split("@")[0]);
            juna.sendTextWithMentions(m.chat, anunya, m);
          } else {
            juna.sendTextWithMentions(
              m.chat,
              proses
                .replace("@pesanan", tek ? tek : "-")
                .replace("@user", "@" + m.quoted.sender.split("@")[0])
                .replace("@jam", time)
                .replace("@tanggal", tanggal(new Date()))
                .replace("@user", "@" + m.quoted.sender.split("@")[0]),
              m
            );
          }
        }

        if (budy && ["done", "Done"].includes(budy) && !isCmd) {
          if (!m.isGroup) return newReply("Fitur Khusus Group!");
          if (!isAdmins) return newReply("Fitur Khusus admin!");
          if (!m.quoted) return newReply("Reply pesanan yang telah di proses");
          let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1];
          let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM : @jam\n✨ STATUS : Berhasil\`\`\`\n\nTerimakasih @user Next Order ya🙏`;
          const getTextD = getTextSetDone(m.chat, set_done);
          if (getTextD !== undefined) {
            var anunya = getTextD
              .replace("@pesanan", tek ? tek : "-")
              .replace("@user", "@" + m.quoted.sender.split("@")[0])
              .replace("@jam", time)
              .replace("@tanggal", tanggal(new Date()))
              .replace("@user", "@" + m.quoted.sender.split("@")[0]);
            juna.sendTextWithMentions(m.chat, anunya, m);
          } else {
            juna.sendTextWithMentions(
              m.chat,
              sukses
                .replace("@pesanan", tek ? tek : "-")
                .replace("@user", "@" + m.quoted.sender.split("@")[0])
                .replace("@jam", time)
                .replace("@tanggal", tanggal(new Date()))
                .replace("@user", "@" + m.quoted.sender.split("@")[0]),
              m
            );
          }
        }

        if (budy.startsWith("=> ")) {
          if (!isCreator) return newReply(mess.OnlyOwner);
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2);
            bang = util.format(sat);
            if (sat == undefined) {
              bang = util.format(sul);
            }
            return newReply(bang);
          }
          try {
            newReply(
              util.format(eval(`(async () => { return ${budy.slice(3)} })()`))
            );
          } catch (e) {
            newReply(util.format(e));
          }
        }

        if (budy.startsWith("> ")) {
          if (!isCreator) return newReply(mess.OnlyOwner);
          try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
            await newReply(evaled);
          } catch (err) {
            await newReply(util.format(err));
          }
        }

        if (budy.startsWith("$ ")) {
          if (!isCreator) return newReply(mess.OnlyOwner);
          exec(budy.slice(2), (err, stdout) => {
            if (err) return newReply(`${err}`);
            if (stdout) return newReply(stdout);
          });
        }
        if (m.mtype == "viewOnceMessageV2") {
          if (!setting.antiViewOnce) return;
          let msg = m.message.viewOnceMessageV2.message;
          // console.log(msg);
          let type = Object.keys(msg)[0];
          let media = await downloadContentFromMessage(
            msg[type],
            type == "imageMessage" ? "image" : "video"
          );
          let buffer = Buffer.from([]);
          for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]);
          }
          let teks = `「 *ANTI VIEWONCE MESSAGE* 」

📛 *Name* : ${m.pushName}
👤 *User* : @${m.sender.split("@")[0]}
⏰ *Clock* : ${moment.tz("Asia/Jakarta").format("HH:mm:ss")} WIB
✍️ *MessageType* : ${m.mtype}
💬 *Caption* : ${m.msg.caption ? m.msg.caption : "no caption"}`;

          await juna.sendTextWithMentions(m.chat, teks, m);
          await delay(500);
          if (/video/.test(type)) {
            return juna.sendFile(
              m.chat,
              buffer,
              "media.mp4",
              msg[type].caption || "",
              m
            );
          } else if (/image/.test(type)) {
            return juna.sendFile(
              m.chat,
              buffer,
              "media.jpg",
              msg[type].caption || "",
              m
            );
          }
        }

        if (m.chat.endsWith("@s.whatsapp.net") && !isCmd) {
          this.menfes = this.menfes ? this.menfes : {};
          let room = Object.values(this.menfes).find(
            (room) =>
              [room.a, room.b].includes(m.sender) && room.state === "CHATTING"
          );
          if (room) {
            if (/^.*(next|leave|start)/.test(m.text)) return;
            if (
              [
                ".next",
                ".leave",
                ".stop",
                ".start",
                "Cari Partner",
                "Keluar",
                "Lanjut",
                "Stop",
              ].includes(m.text)
            )
              return;
            find = Object.values(this.menfes).find((menpes) =>
              [menpes.a, menpes.b].includes(m.sender)
            );
            let other = find.a == m.sender ? find.b : find.a;
            await m.copyNForward(
              other,
              true,
              m.quoted && m.quoted.fromMe
                ? {
                    contextInfo: {
                      ...m.msg.contextInfo,
                      participant: other,
                    },
                  }
                : {}
            );
          }
        }

        if (m.chat.endsWith("@s.whatsapp.net") && !isCmd) {
          this.anonymous = this.anonymous ? this.anonymous : {};
          let room = Object.values(this.anonymous).find(
            (room) =>
              [room.a, room.b].includes(m.sender) && room.state === "CHATTING"
          );
          if (room) {
            if (/^.*(next|leave|start)/.test(m.text)) return;
            if (
              [
                ".next",
                ".leave",
                ".stop",
                ".start",
                "Cari Partner",
                "Keluar",
                "Lanjut",
                "Stop",
              ].includes(m.text)
            )
              return;
            let other = [room.a, room.b].find((user) => user !== m.sender);
            m.copyNForward(
              other,
              true,
              m.quoted && m.quoted.fromMe
                ? {
                    contextInfo: {
                      ...m.msg.contextInfo,
                      forwardingScore: 0,
                      isForwarded: true,
                      participant: other,
                    },
                  }
                : {}
            );
          }
          return !0;
        }
    }
  } catch (err) {
    //console.log(err)
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
