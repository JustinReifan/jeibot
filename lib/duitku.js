// lib/duitku.js
const axios = require("axios");
const crypto = require("crypto");

const CONFIG = require("../config.json"); // pastikan ada DUITKU_MERCHANT_CODE & DUITKU_API_KEY & DUITKU_PRODUCTION

const HOST = CONFIG.DUITKU_PRODUCTION
  ? "https://passport.duitku.com/webapi/api/merchant/v2"
  : "https://sandbox.duitku.com/webapi/api/merchant/v2";

// Utility buat hash MD5
function md5(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

// Signature utk create transaction
// Formula: MD5(merchantCode + merchantOrderId + amount + apiKey)
function buildTransactionSignature(
  merchantCode,
  merchantOrderId,
  amount,
  apiKey
) {
  return md5(`${merchantCode}${merchantOrderId}${amount}${apiKey}`);
}

// Signature utk callback validation
// Formula: MD5(merchantCode + amount + merchantOrderId + apiKey)
function buildCallbackSignature(merchantCode, amount, merchantOrderId, apiKey) {
  return md5(`${merchantCode}${amount}${merchantOrderId}${apiKey}`);
}

async function createTransaction({
  merchantOrderId,
  amount,
  productDetails,
  customerEmail = "",
  callbackUrl,
  returnUrl,
  paymentMethod = "SQ",
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
    signature: buildTransactionSignature(
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
  const { merchantCode, merchantOrderId, amount, signature } = body;
  const expected = buildCallbackSignature(
    merchantCode,
    amount,
    merchantOrderId,
    CONFIG.DUITKU_API_KEY
  );
  console.log(`expected: ${expected}, received: ${signature}`);
  return expected === signature;
}

module.exports = { createTransaction, verifyCallback };
