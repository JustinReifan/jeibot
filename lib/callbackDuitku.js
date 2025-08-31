const express = require("express");
const app = express();
const PORT = 5000;
const suntikController = require("../controllers/suntikController");
const { createServer } = require("http");
const CONFIG = require("../config.json");

app.use(express.json());

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

    // if (result.ok && result.type === "ordered") {
    //   await globalJuna.sendMessage(
    //     result.order.buyerPhone + "@s.whatsapp.net",
    //     {
    //       text: `✅ Pembayaran untuk pesanan ${result.order.orderId} berhasil.\nLayanan: ${result.order.serviceName}\nTarget: ${result.order.target}\nJumlah: ${result.order.qty}\nTotal: Rp${result.order.total}\n\nPesanan sedang diproses ✅`,
    //     }
    //   );
    // } else if (result.type === "order_failed") {
    //   await globalJuna.sendMessage(
    //     result.order.buyerPhone + "@s.whatsapp.net",
    //     {
    //       text: `⚠️ Pembayaran berhasil, tapi order ke provider gagal.\nOrderId: ${result.order.orderId}`,
    //     }
    //   );
    // } else if (result.type === "order_error") {
    //   await globalJuna.sendMessage(
    //     result.order.buyerPhone + "@s.whatsapp.net",
    //     {
    //       text: `❌ Terjadi error saat membuat order.\nOrderId: ${result.order.orderId}\nError: ${result.error}`,
    //     }
    //   );
    // } else if (result.type === "payment_failed") {
    //   await globalJuna.sendMessage(
    //     result.payment.buyerPhone + "@s.whatsapp.net",
    //     {
    //       text: `❌ Pembayaran untuk pesanan ${result.payment.merchantOrderId} gagal.\nSilakan coba lagi.`,
    //     }
    //   );
    // }

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
