const express = require("express");
const app = express();
const PORT = 5000;
const suntikController = require("../controllers/suntikController");
const { createServer } = require("http");
const CONFIG = require("../config.json");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // untuk x-www-form-urlencoded

app.use((req, res, next) => {
  if (req.path === "/duitku/callback") {
    console.log("Headers:", req.headers["content-type"]);
    console.log("Body:", req.body);
  }
  next();
});

// Simpan referensi ke instance WhatsApp yang bisa di-share
let globalJuna = null;

function setJunaInstance(junaInstance) {
  globalJuna = junaInstance;
}

// Duitku callback route
app.post("/duitku/callback", async (req, res) => {
  try {
    if (!globalJuna || typeof globalJuna.sendMessage !== "function") {
      console.error("Socket WA belum siap");
      return res.status(503).json({ ok: false, message: "WA not ready" });
    }

    const result = await suntikController.paymentCallback(
      req.headers,
      req.body
    );

    // Kirim notifikasi WA ke pembeli
    if (result.order && result.order.buyerPhone) {
      let status = result.order.status;
      let orderId = result.order.orderId;
      let layanan = result.order.serviceName;
      let target = result.order.target;
      let qty = result.order.qty;
      let total = result.order.total;

      let msg =
        `⚡ *PEMBAYARAN BERHASIL!* \n` +
        `━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🆔 *Order ID*   : ${orderId}\n` +
        `📌 *Layanan*    : ${layanan}\n` +
        `🎯 *Target*     : ${target}\n` +
        `🔢 *Jumlah*     : ${qty}\n` +
        `💰 *Total Bayar*: Rp${Number(total).toLocaleString("id-ID")}\n\n`;

      if (status === "ordered") {
        msg +=
          `✅ *STATUS: PEMBAYARAN SUKSES*\n` +
          `Pesanan Anda sedang *diproses otomatis* 🚀\n\n`;
      } else {
        msg +=
          `❌ *STATUS: ${status.toUpperCase()}*\n` +
          `Hubungi admin untuk bantuan lebih lanjut ⚠️\n\n`;
      }

      msg +=
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📝 Untuk cek progres pesanan:\n` +
        `Ketik: *.ceksuntik ${orderId}*`;

      await globalJuna.sendMessage(result.order.groupId, { text: msg });
    }

    res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("duitku callback err", err);
    res.status(400).json({ ok: false, error: err.message });
  }
});

const server = createServer(app);

function startCallbackServer() {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Callback server jalan di port ${PORT}`);
  });
}

module.exports = {
  startCallbackServer,
  setJunaInstance,
};
