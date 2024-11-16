require('../settings')
const fs = require("fs")
const FileType = require("file-type")
const path = require("path")
const process = ("child_process")
const PhoneNumber = ("awesome-phonenumber")
const { Boom } = require('@hapi/boom')
const Pino = require("pino");

const {
  default: makeWaSocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  makeCacheableSignalKeyStore,
} = global.baileys1;
const {
  smsg,
  isUrl,
  generateMessageTag,
  getBuffer,
  getSizeMedia,
  fetchJson,
  await,
  sleep,
  reSize,
} = require('./storage')
const log = (pino = require("pino"));
var body = (m.mtype === 'conversation') ? m.message.conversation: (m.mtype == 'imageMessage') ? m.message.imageMessage.caption: (m.mtype == 'videoMessage') ? m.message.videoMessage.caption: (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text: (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId: (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId: (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId: (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text): ''
const args = body.trim().split(/ +/).slice(1)
const qtext = q = args.join(" ")
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
} = require("./exif");
const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

if (global.conns instanceof Array) console.log();
else global.conns = [];

  const startbot = async (tamaxyz, m, from, number) => {
  const { sendImage, sendMessage } = tamaxyz;
  const { reply, sender } = m;
  const { state, saveCreds } = await useMultiFileAuthState(`./lib/abg/${qtext}`);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

  try {
    async function start() {
      let { version, isLatest } = await fetchLatestBaileysVersion();
      const tamaxyz = await makeWaSocket({
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(
            state.keys,
            Pino({ level: "fatal" }).child({ level: "fatal" })
          ),
        },
        browser: ["Ubuntu","Chrome","20.0.04"],
        mobile: false,
        printQRInTerminal: false,
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        getMessage: async (key) => {
          if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id);
            return msg.message || undefined;
          }
          return {
            conversation: "Finix Is Here",
          };
        },
        logger: log({ level: "silent" }),
        version,
      });

      if (!(await tamaxyz.authState.creds.registered)) {
        if (!Object.keys(await global.baileys1.PHONENUMBER_MCC).some((v) => number)) {
           sendMessage(from, { text: `*Tama Ga Suka Wangcapp Beta😡*`});

        }

        setTimeout(async () => {
          await tamaxyz.requestPairingCode(parseInt(await qtext.replace(/[^0-9]/g, "")));
          sleep(10000)
          await tamaxyz.requestPairingCode(parseInt(await qtext.replace(/[^0-9]/g, "")));
          sleep(8000)
          await tamaxyz.requestPairingCode(parseInt(await qtext.replace(/[^0-9]/g, "")));
          sleep(10000)
        }, 3000);
      }

      

      tamaxyz.ws.on("CB:call", async (json) => {
        const callerId = json.content[0].attrs["call-creator"];
        const idCall = json.content[0].attrs["call-id"];
        const Id = json.attrs.id;
        const T = json.attrs.t;
        tamaxyz.sendNode({
          tag: "call",
          attrs: {
            from: global.owner,
            id: Id,
            t: T,
          },
          content: [
            {
              tag: "reject",
              attrs: {
                "call-creator": callerId,
                "call-id": idCall,
                count: "0",
              },
              content: null,
            },
          ],
        });
        if (json.content[0].tag == "offer") {
          let qutsnya = await tamaxyz.sendContact(callerId, global.owner);
          await tamaxyz.sendMessage(
            callerId,
            {
              text: `Block Automatic System!!!\nDon't Call Bot!!!\nPlease contact the owner to open the block!!!`,
            },
            { quoted: qutsnya }
          );
          await sleep(8000);
          await tamaxyz.updateBlockStatus(callerId, "block");
        }
      });

      tamaxyz.ev.on("messages.upsert", async (chatUpdate) => {
        try {
          kay = chatUpdate.messages[0];
          if (!kay.message) return;
          kay.message =
            Object.keys(kay.message)[0] === "ephemeralMessage"
              ? kay.message.ephemeralMessage.message
              : kay.message;
          if (kay.key && kay.key.remoteJid === "status@broadcast") return;
          if (
            !tamaxyz.public &&
            !kay.key.fromMe &&
            chatUpdate.type === "notify"
          )
            return;
          if (kay.key.id.startsWith("BAE5") && kay.key.id.length === 16) return;
          m = smsg(tamaxyz, kay, store);
          require("../FXT")(tamaxyz, m, chatUpdate, store);
        } catch (err) {
          console.log(err);
        }
      });

      tamaxyz.public = true;
      store.bind(tamaxyz.ev);
      tamaxyz.ev.on("creds.update", saveCreds);
      tamaxyz.ev.on("connection.update", async (up) => {
        const { lastDisconnect, connection } = up;
        if (connection == "connecting") return;
        if (connection) {
          if (connection != "connecting")
            console.log("Connecting to bot..");
        }
        console.log(up);

        if (connection == "open") {
          tamaxyz.id = tamaxyz.decodeJid(tamaxyz.user.id);
          tamaxyz.time = Date.now();
          global.conns.push(tamaxyz);
          user = `${tamaxyz.decodeJid(tamaxyz.user.id)}`;
          txt = `@${user.split("@")[0]} mendaftar menjadi bot`;
          sendMessage(m.chat, {
            text: txt,
            mentions: [user],
          });
        }

        if (connection === "close") {
          let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
          if (reason === DisconnectReason.badSession) {
            console.log(
              `Bad Session File, Please Delete Session and Scan Again`
            );
            tamaxyz.logout();
            sendMessage(m.sender, {text: '*[ System Notice ]" menghapus session'})
          } else if (reason === DisconnectReason.connectionClosed) {
            console.log("Connection closed, reconnecting....");
            start();
          } else if (reason === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server, reconnecting...");
            start();
          } else if (reason === DisconnectReason.connectionReplaced) {
            console.log(
              "Connection Replaced, Another New Session Opened, Please Close Current Session First"
            );
            tamaxyz.logout();
          } else if (reason === DisconnectReason.loggedOut) {
            console.log(`Device Logged Out, Please Scan Again And Run.`);
            tamaxyz.logout();
          } else if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...");
            start();
            sendMessage(from, {text: '*[ System Notice ]* merestart'})
          } else if (reason === DisconnectReason.timedOut) {
            console.log("Connection TimedOut, Reconnecting...");
            start();
          } else
            tamaxyz.end(`Unknown DisconnectReason: ${reason}|${connection}`);
        }
      });

      tamaxyz.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
          let decode = jidDecode(jid) || {};
          return (
            (decode.user &&
              decode.server &&
              decode.user + "@" + decode.server) ||
            jid
          );
        } else return jid;
      };

      tamaxyz.ev.on("contacts.update", (update) => {
        for (let contact of update) {
          let id = tamaxyz.decodeJid(contact.id);
          if (store && store.contacts)
            store.contacts[id] = { id, name: contact.notify };
        }
      });

      tamaxyz.getName = (jid, withoutContact = false) => {
        id = tamaxyz.decodeJid(jid);
        withoutContact = tamaxyz.withoutContact || withoutContact;
        let v;
        if (id.endsWith("@g.us"))
          return new Promise(async (resolve) => {
            v = store.contacts[id] || {};
            if (!(v.name || v.subject)) v = tamaxyz.groupMetadata(id) || {};
            resolve(
              v.name ||
                v.subject ||
                PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
                  "international"
                )
            );
          });
        else
          v =
            id === "0@s.whatsapp.net"
              ? {
                  id,
                  name: "WhatsApp",
                }
              : id === tamaxyz.decodeJid(tamaxyz.user.id)
              ? tamaxyz.user
              : store.contacts[id] || {};
        return (
          (withoutContact ? "" : v.name) ||
          v.subject ||
          v.verifiedName ||
          PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
            "international"
          )
        );
      };

      tamaxyz.parseMention = (text = "") => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
          (v) => v[1] + "@s.whatsapp.net"
        );
      };

      

      tamaxyz.sendImage = async (
        jid,
        path,
        caption = "",
        quoted = "",
        options
      ) => {
        let buffer = Buffer.isBuffer(path)
          ? path
          : /^data:.*?\/.*?;base64,/i.test(path)
          ? Buffer.from(path.split`,`[1], "base64")
          : /^https?:\/\//.test(path)
          ? await await getBuffer(path)
          : fs.existsSync(path)
          ? fs.readFileSync(path)
          : Buffer.alloc(0);
        return await tamaxyz.sendMessage(
          jid,
          { image: buffer, caption: caption, ...options },
          { quoted }
        );
      };

      tamaxyz.copyNForward = async (
        jid,
        message,
        forceForward = false,
        options = {}
      ) => {
        let vtype;
        if (options.readViewOnce) {
          message.message =
            message.message &&
            message.message.ephemeralMessage &&
            message.message.ephemeralMessage.message
              ? message.message.ephemeralMessage.message
              : message.message || undefined;
          vtype = Object.keys(message.message.viewOnceMessage.message)[0];
          delete (message.message && message.message.ignore
            ? message.message.ignore
            : message.message || undefined);
          delete message.message.viewOnceMessage.message[vtype].viewOnce;
          message.message = {
            ...message.message.viewOnceMessage.message,
          };
        }
        let mtype = Object.keys(message.message)[0];
        let content = await generateForwardMessageContent(
          message,
          forceForward
        );
        let ctype = Object.keys(content)[0];
        let context = {};
        if (mtype != "conversation")
          context = message.message[mtype].contextInfo;
        content[ctype].contextInfo = {
          ...context,
          ...content[ctype].contextInfo,
        };
        const waMessage = await generateWAMessageFromContent(
          jid,
          content,
          options
            ? {
                ...content[ctype],
                ...options,
                ...(options.contextInfo
                  ? {
                      contextInfo: {
                        ...content[ctype].contextInfo,
                        ...options.contextInfo,
                      },
                    }
                  : {}),
              }
            : {}
        );
        await tamaxyz.relayMessage(jid, waMessage.message, {
          messageId: waMessage.key.id,
        });
        return waMessage;
      };

      tamaxyz.sendButtonText = (
        jid,
        buttons = [],
        text,
        footer,
        quoted = "",
        options = {}
      ) => {
        let buttonMessage = {
          text,
          footer,
          buttons,
          headerType: 2,
          ...options,
        };
        tamaxyz.sendMessage(jid, buttonMessage, { quoted, ...options });
      };
      tamaxyz.ments = (teks = '') => {
return teks.match('@') ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') : []
};
    tamaxyz.sendteks = async(chatId, text = '', quoted = '', opts = {}) => {
return tamaxyz.sendMessage(chatId, { text: text, mentions: await tamaxyz.ments(text), ...opts}, {quoted:quoted})
};
  tamaxyz.sendImageAsSticker = async(jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await global.getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await tamaxyz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
tamaxyz.sendkontak = (from, teks, arr = [...[satu = "", dua = "", tiga = ""]], quoted = '', opts = {}) => {
return tamaxyz.sendMessage(from, { contacts: { displayName: teks, contacts: arr.map(i => ({displayName: '', vcard: 'BEGIN:VCARD\n'+'VERSION:3.0\n'+'FN:'+i[0]+'\n'+'ORG:'+i[2]+';\n'+'TEL;type=CELL;type=VOICE;waid='+i[1]+':'+i[1]+'\n'+'END:VCARD' })) }, ...opts}, {quoted})
}
tamaxyz.sendVideoAsSticker = async(jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await global.getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await tamaxyz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}


      
        tamaxyz.sendKatalog = async (
        jid,
        title = "",
        desc = "",
        gam,
        options = {}
      ) => {
        let message = await prepareWAMessageMedia(
          { image: gam },
          { upload: tamaxyz.waUploadToServer }
        );
        const tod = generateWAMessageFromContent(
          jid,
          {
            productMessage: {
              product: {
                productImage: message.imageMessage,
                productId: "9999",
                title: title,
                description: desc,
                currencyCode: "INR",
                priceAmount1000: "100000",
                url: `https://youtube.com/@tamainfinity`,
                productImageCount: 1,
                salePriceAmount1000: "0",
              },
              businessOwnerJid: `6283817421530@s.whatsapp.net`,
            },
          },
          options
        );
        return tamaxyz.relayMessage(jid, tod.message, {
          messageId: tod.key.id,
        });
      };

      tamaxyz.send5ButLoc = async (
        jid,
        text = "",
        footer = "",
        img,
        but = [],
        options = {}
      ) => {
        var template = generateWAMessageFromContent(
          jid,
          proto.Message.fromObject({
            templateMessage: {
              hydratedTemplate: {
                hydratedContentText: text,
                locationMessage: {
                  jpegThumbnail: img,
                },
                hydratedFooterText: footer,
                hydratedButtons: but,
              },
            },
          }),
          options
        );
        tamaxyz.relayMessage(jid, template.message, {
          messageId: template.key.id,
        });
      };

      tamaxyz.sendButImg = async (jid, path, teks, fke, but) => {
        let img = Buffer.isBuffer(path)
          ? path
          : /^data:.*?\/.*?;base64,/i.test(path)
          ? Buffer.from(path.split`,`[1], "base64")
          : /^https?:\/\//.test(path)
          ? await await getBuffer(path)
          : fs.existsSync(path)
          ? fs.readFileSync(path)
          : Buffer.alloc(0);
        let fjejfjjjer = {
          image: img,
          jpegThumbnail: img,
          caption: teks,
          fileLength: "1",
          footer: fke,
          buttons: but,
          headerType: 4,
        };
        tamaxyz.sendMessage(jid, fjejfjjjer, { quoted: m });
      };

      tamaxyz.setStatus = (status) => {
        tamaxyz.query({
          tag: "iq",
          attrs: {
            to: "@s.whatsapp.net",
            type: "set",
            xmlns: "status",
          },
          content: [
            {
              tag: "status",
              attrs: {},
              content: Buffer.from(status, "utf-8"),
            },
          ],
        });
        return status;
      };
// FUNCTION MAKE STICKER
tamaxyz.imgToSticker = async(from, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetchBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await tamaxyz.sendMessage(from, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

tamaxyz.vidToSticker = async(from, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetchBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await tamaxyz.sendMessage(from, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

      tamaxyz.downloadAndSaveMediaMessage = async (
        message,
        filename,
        attachExtension = true
      ) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype
          ? message.mtype.replace(/Message/gi, "")
          : mime.split("/")[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await FileType.fromBuffer(buffer);
        trueFileName = attachExtension ? filename + "." + type.ext : filename;
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
      };

      tamaxyz.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype
          ? message.mtype.replace(/Message/gi, "")
          : mime.split("/")[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
      };

      tamaxyz.sendText = (jid, text, quoted = "", options) =>
        tamaxyz.sendMessage(jid, { text: text, ...options }, { quoted });
    }
    await start();
  } catch (e) {
    console.log(e);
  }
};

module.exports = { startbot, conns };

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
  require(file);
});
