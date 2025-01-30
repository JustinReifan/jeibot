const fs = require("fs");
const petik = "```";
let setting = JSON.parse(fs.readFileSync("./config.json"));

function toCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

exports.allMenu = (
  pushname,
  ownerName,
  botName,
  botVersion,
  runtime,
  isCreator,
  isPremium,
  prefix
) => {
  return `👋 Hai ${pushname !== undefined ? pushname : "Kak"}
🔗 𝗦𝘁𝗮𝘁𝘂𝘀: ${isCreator ? "Owner" : isPremium ? "Premium" : "Free"}
🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${botName}
📔 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : ${ownerName}
⚙️ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : ${runtime(process.uptime())}

「 *STORE MENU* 」
${petik}
• ${prefix}list
• ${prefix}addlist
• ${prefix}dellist
• ${prefix}update
• ${prefix}jeda
• ${prefix}tambah
• ${prefix}kurang
• ${prefix}kali
• ${prefix}bagi
• ${prefix}delsetdone
• ${prefix}changedone
• ${prefix}setdone
• ${prefix}delsetproses
• ${prefix}changeproses
• ${prefix}setproses
• proses < reply chat >
• done < reply chat >
${petik}
「 *GROUP MENU* 」
${petik}
• ${prefix}autoaigc
• ${prefix}afk
• ${prefix}welcome
• ${prefix}left
• ${prefix}pppanjanggc
• ${prefix}opentime
• ${prefix}closetime
• ${prefix}setopen
• ${prefix}changesetopen
• ${prefix}delsetopen
• ${prefix}setclose
• ${prefix}changesetclose
• ${prefix}delsetclose
• ${prefix}setwelcome
• ${prefix}changewelcome
• ${prefix}delsetwelcome
• ${prefix}setleft
• ${prefix}changeleft
• ${prefix}delsetleft
• ${prefix}linkgc
• ${prefix}setppgc
• ${prefix}setppgc2
• ${prefix}setnamegc
• ${prefix}setdesc
• ${prefix}autodlgc
• ${prefix}antilink
• ${prefix}antilinktt
• ${prefix}kickme
• ${prefix}mute
• ${prefix}open
• ${prefix}close
• ${prefix}add
• ${prefix}kick
• ${prefix}promote
• ${prefix}demote
• ${prefix}revoke
• ${prefix}hidetag
• ${prefix}checksewa
${petik}
「 *CONVERTED MENU* 」
${petik}
• ${prefix}remini
• ${prefix}hdr
• ${prefix}sticker
• ${prefix}stickerwm
• ${prefix}smeme
• ${prefix}toimg
• ${prefix}tourl
• ${prefix}tovideo
• ${prefix}tomp3
• ${prefix}toaudio
• ${prefix}tovn
• ${prefix}toptv
• ${prefix}readvo
• ${prefix}ttp
• ${prefix}attp
• ${prefix}qc
• ${prefix}emojimix
• ${prefix}nuliskiri
• ${prefix}nuliskanan
• ${prefix}foliokiri
• ${prefix}foliokanan
${petik}
「 *DOWNLOAD MENU* 」
${petik}
• ${prefix}tiktok
• ${prefix}play
• ${prefix}ytmp3
• ${prefix}ytmp4
• ${prefix}ytv
• ${prefix}ytv2
${petik}
「 *OWNER MENU* 」
${petik}
• ${prefix}self
• ${prefix}public
• ${prefix}setppbot
• ${prefix}setppbot2
• ${prefix}joingc
• ${prefix}creategc
• ${prefix}leavegc
• ${prefix}broadcast
• ${prefix}bcimg
• ${prefix}bcstik
• ${prefix}bcvn
• ${prefix}bcvideo
• ${prefix}bcsewa
• ${prefix}addpremium
• ${prefix}delpremium
• ${prefix}addsewa
• ${prefix}delsewa
• ${prefix}blok
• ${prefix}unblok
• ${prefix}listblok
• ${prefix}autoaipc
• ${prefix}autoread
• ${prefix}autobio
• ${prefix}antidelete
• ${prefix}antiviewonce
• ${prefix}autorespond
• ${prefix}anticall
• ${prefix}autoblok212
• ${prefix}resetlimit

${botVersion}${petik}`;
};

exports.simpleMenu = (
  pushname,
  ownerName,
  botName,
  botVersion,
  runtime,
  isCreator,
  isPremium,
  prefix
) => {
  return `👋 Hai ${pushname !== undefined ? pushname : "Kak"}
🔗 𝗦𝘁𝗮𝘁𝘂𝘀: ${isCreator ? "Owner" : isPremium ? "Premium" : "Free"}
🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${botName}
📔 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : ${ownerName}
⚙️ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : ${runtime(process.uptime())}

「 *LIST MENU* 」
${petik}
• ${prefix}allmenu
• ${prefix}storemenu
• ${prefix}groupmenu
• ${prefix}convertmenu
• ${prefix}downloadmenu
• ${prefix}ownermenu

${botVersion}${petik}`;
};

exports.storeMenu = (
  pushname,
  ownerName,
  botName,
  botVersion,
  runtime,
  isCreator,
  isPremium,
  prefix
) => {
  return `👋 Hai ${pushname !== undefined ? pushname : "Kak"}
🔗 𝗦𝘁𝗮𝘁𝘂𝘀: ${isCreator ? "Owner" : isPremium ? "Premium" : "Free"}
🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${botName}
📔 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : ${ownerName}
⚙️ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : ${runtime(process.uptime())}

「 *STORE MENU* 」
${petik}
• ${prefix}list
• ${prefix}addlist
• ${prefix}dellist
• ${prefix}update
• ${prefix}jeda
• ${prefix}tambah
• ${prefix}kurang
• ${prefix}kali
• ${prefix}bagi
• ${prefix}delsetdone
• ${prefix}changedone
• ${prefix}setdone
• ${prefix}delsetproses
• ${prefix}changeproses
• ${prefix}setproses
• proses < reply chat >
• done < reply chat >

${botVersion}${petik}`;
};

exports.groupMenu = (
  pushname,
  ownerName,
  botName,
  botVersion,
  runtime,
  isCreator,
  isPremium,
  prefix
) => {
  return `👋 Hai ${pushname !== undefined ? pushname : "Kak"}
🔗 𝗦𝘁𝗮𝘁𝘂𝘀: ${isCreator ? "Owner" : isPremium ? "Premium" : "Free"}
🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${botName}
📔 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : ${ownerName}
⚙️ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : ${runtime(process.uptime())}

「 *GROUP MENU* 」
${petik}
• ${prefix}autoaigc
• ${prefix}afk
• ${prefix}welcome
• ${prefix}left
• ${prefix}pppanjanggc
• ${prefix}opentime
• ${prefix}closetime
• ${prefix}setopen
• ${prefix}changesetopen
• ${prefix}delsetopen
• ${prefix}setclose
• ${prefix}changesetclose
• ${prefix}delsetclose
• ${prefix}setwelcome
• ${prefix}changewelcome
• ${prefix}delsetwelcome
• ${prefix}setleft
• ${prefix}changeleft
• ${prefix}delsetleft
• ${prefix}linkgc
• ${prefix}setppgc
• ${prefix}setppgc2
• ${prefix}setnamegc
• ${prefix}setdesc
• ${prefix}autodlgc
• ${prefix}antilink
• ${prefix}antilinktt
• ${prefix}kickme
• ${prefix}mute
• ${prefix}open
• ${prefix}close
• ${prefix}add
• ${prefix}kick
• ${prefix}promote
• ${prefix}demote
• ${prefix}revoke
• ${prefix}hidetag
• ${prefix}checksewa

${botVersion}${petik}`;
};

exports.ownerMenu = (
  pushname,
  ownerName,
  botName,
  botVersion,
  runtime,
  isCreator,
  isPremium,
  prefix
) => {
  return `👋 Hai ${pushname !== undefined ? pushname : "Kak"}
🔗 𝗦𝘁𝗮𝘁𝘂𝘀: ${isCreator ? "Owner" : isPremium ? "Premium" : "Free"}
🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${botName}
📔 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : ${ownerName}
⚙️ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : ${runtime(process.uptime())}

「 *OWNER MENU* 」
${petik}
• ${prefix}self
• ${prefix}public
• ${prefix}setppbot
• ${prefix}setppbot2
• ${prefix}joingc
• ${prefix}creategc
• ${prefix}leavegc
• ${prefix}broadcast
• ${prefix}bcimg
• ${prefix}bcstik
• ${prefix}bcvn
• ${prefix}bcvideo
• ${prefix}bcsewa
• ${prefix}addpremium
• ${prefix}delpremium
• ${prefix}addsewa
• ${prefix}delsewa
• ${prefix}blok
• ${prefix}unblok
• ${prefix}listblok
• ${prefix}autoaipc
• ${prefix}autoread
• ${prefix}autobio
• ${prefix}antidelete
• ${prefix}antiviewonce
• ${prefix}autorespond
• ${prefix}anticall
• ${prefix}autoblok212
• ${prefix}resetlimit

${botVersion}${petik}`;
};

exports.convertMenu = (
  pushname,
  ownerName,
  botName,
  botVersion,
  runtime,
  isCreator,
  isPremium,
  prefix
) => {
  return `👋 Hai ${pushname !== undefined ? pushname : "Kak"}
🔗 𝗦𝘁𝗮𝘁𝘂𝘀: ${isCreator ? "Owner" : isPremium ? "Premium" : "Free"}
🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${botName}
📔 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : ${ownerName}
⚙️ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : ${runtime(process.uptime())}

「 *CONVERTED MENU* 」
${petik}
• ${prefix}remini
• ${prefix}hdr
• ${prefix}sticker
• ${prefix}stickerwm
• ${prefix}smeme
• ${prefix}toimg
• ${prefix}tourl
• ${prefix}tovideo
• ${prefix}tomp3
• ${prefix}toaudio
• ${prefix}tovn
• ${prefix}toptv
• ${prefix}readvo
• ${prefix}ttp
• ${prefix}attp
• ${prefix}qc
• ${prefix}emojimix
• ${prefix}nuliskiri
• ${prefix}nuliskanan
• ${prefix}foliokiri
• ${prefix}foliokanan

${botVersion}${petik}`;
};

exports.downloadMenu = (
  pushname,
  ownerName,
  botName,
  botVersion,
  runtime,
  isCreator,
  isPremium,
  prefix
) => {
  return `👋 Hai ${pushname !== undefined ? pushname : "Kak"}
🔗 𝗦𝘁𝗮𝘁𝘂𝘀: ${isCreator ? "Owner" : isPremium ? "Premium" : "Free"}
🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${botName}
📔 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : ${ownerName}
⚙️ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : ${runtime(process.uptime())}

「 *DOWNLOAD MENU* 」
${petik}
• ${prefix}tiktok
• ${prefix}play
• ${prefix}ytmp3
• ${prefix}ytmp4
• ${prefix}ytv
• ${prefix}ytv2

${botVersion}${petik}`;
};

exports.sewanya = `_*Promo Premium 30 Hari Rp 5.000.*_\n_*Promo Sewa Gc 30 Hari Rp 7.000*_\n_*Paket Sewa Bot & Premium Rp 9.000*_\n𝙄𝙣𝙛𝙤 𝙎𝙚𝙡𝙚𝙣𝙜𝙠𝙖𝙥𝙣𝙮𝙖 𝘾𝙝𝙖𝙩 𝙊𝙬𝙣𝙚𝙧.`;
