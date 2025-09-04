// utils/resolveJid.js
async function resolveJid(juna, jid, chatId = null, store = null) {
  if (!jid) return jid;

  // already a proper phone JID (most common)
  if (
    jid.endsWith("@s.whatsapp.net") ||
    jid.endsWith("@g.us") ||
    jid.endsWith("@broadcast")
  )
    return jid;

  // if it's a lid (anonymous handle)
  if (jid.endsWith("@lid")) {
    // 1) Try group metadata if chatId (group) diberikan
    try {
      if (chatId && chatId.endsWith("@g.us")) {
        const meta = await juna.groupMetadata(chatId);
        if (meta && Array.isArray(meta.participants)) {
          const p = meta.participants.find(
            (x) => x.id === jid || x.lid === jid
          );
          if (p && p.jid) return p.jid; // ideal: participant has real jid
        }
      }
    } catch (e) {
      // ignore — group metadata might fail if no permissions
    }

    // 2) Try store contacts mapping (if available)
    try {
      const s = store || (juna && juna.store);
      if (s && s.contacts) {
        for (const key of Object.keys(s.contacts)) {
          const c = s.contacts[key];
          // contact may have .lid, .id, or .jid fields
          if (c && (c.lid === jid || c.id === jid || key === jid)) {
            return c.jid || key; // return found phone-jid or the key
          }
        }
      }
    } catch (e) {}

    // 3) fallback: can't resolve -> return original jid (still usable in some APIs)
    return jid;
  }

  // unknown format -> return as-is
  return jid;
}

function jidToPhoneNumber(jid) {
  if (!jid) return jid;
  return jid.split("@")[0];
}

module.exports = { resolveJid, jidToPhoneNumber };
