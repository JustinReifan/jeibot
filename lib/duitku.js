// lib/duitku.js
const axios = require("axios");
const crypto = require("crypto");

const CONFIG = require("../config.json"); // pastikan ada DUITKU_MERCHANT_CODE & DUITKU_API_KEY & DUITKU_PRODUCTION

const HOST = CONFIG.DUITKU_PRODUCTION
  ? "https://passport.duitku.com/webapi/api/merchant/v2"
  : "https://sandbox.duitku.com/webapi/api/merchant/v2";

// signature v2: sha256(merchantCode + merchantOrderId + paymentAmount + apiKey)
function buildSignature(merchantCode, merchantOrderId, amount, apiKey) {
  const raw = `${merchantCode}${merchantOrderId}${amount}${apiKey}`;
  return crypto.createHash("md5").update(raw).digest("hex");
}

async function createTransaction({
  merchantOrderId,
  amount,
  productDetails,
  customerEmail = "",
  callbackUrl,
  returnUrl,
  paymentMethod,
  customerVaName,
}) {
  const body = {
    merchantCode: CONFIG.DUITKU_MERCHANT_CODE,
    paymentAmount: String(amount),
    merchantOrderId: merchantOrderId,
    productDetails,
    email: customerEmail || "noemail@dummy.com",
    paymentMethod,
    customerVaName,
    callbackUrl,
    returnUrl,
    signature: buildSignature(
      CONFIG.DUITKU_MERCHANT_CODE,
      merchantOrderId,
      amount,
      CONFIG.DUITKU_API_KEY
    ),
  };

  const resp = await axios.post(`${HOST}/inquiry`, body, {
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
  });
  return resp.data;
}

/**
 * Callback validation
 * Duitku v2 akan kirim POST ke callbackUrl.
 * Field penting: merchantOrderId, paymentAmount, resultCode, reference, signature
 * signature v2 = sha256(merchantCode + merchantOrderId + paymentAmount + apiKey)
 */
function verifyCallback(body) {
  const { merchantCode, merchantOrderId, paymentAmount, signature } = body;
  const expected = buildSignature(
    merchantCode,
    merchantOrderId,
    paymentAmount,
    CONFIG.DUITKU_API_KEY
  );
  console.log(`expected: ${expected}`);
  return expected === signature;
}

module.exports = { createTransaction, verifyCallback };
