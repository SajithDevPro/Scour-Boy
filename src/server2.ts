import { updateUserSubscription } from "../services/subscriptionService";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config({ path: ".env.backend" });

const app = express();

app.use(cors());
app.use(express.json());

// ----------------------------
// ENV
// ----------------------------
const PORT = process.env.PORT || 3000;

const MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID!;
const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET!;
const FRONTEND_URL = process.env.FRONTEND_URL!;
const BACKEND_URL = process.env.BACKEND_URL!;

// ----------------------------
// 1. CREATE PAYMENT SESSION
// ----------------------------
app.post("/api/payhere/create-payment", async (req, res) => {
  try {
    const { plan, email, amount } = req.body;

    const orderId = "ORDER_" + Date.now();
    const currency = "USD";

    // PayHere HASH
    const merchantSecretHash = crypto
      .createHash("md5")
      .update(MERCHANT_SECRET)
      .digest("hex")
      .toUpperCase();

    const hash = crypto
      .createHash("md5")
      .update(
        MERCHANT_ID +
          orderId +
          amount +
          currency +
          merchantSecretHash
      )
      .digest("hex")
      .toUpperCase();

    const paymentData = {
      sandbox: true,
      merchant_id: MERCHANT_ID,

      return_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/pricing`,
      notify_url: `${BACKEND_URL}/api/payhere/webhook`,

      order_id: orderId,
      items: `${plan.toUpperCase()} PLAN`,
      amount,
      currency,

      hash,

      custom_1: email, // IMPORTANT (better than relying on PayHere email)
    };

    res.json({ paymentData });
  } catch (error: any) {
    console.error("Create payment error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------
// 2. WEBHOOK (PAYHERE)
// ----------------------------
app.post("/api/payhere/webhook", async (req, res) => {
  try {
    const data = req.body;

    console.log("📩 PayHere Webhook Received:", data);

    const statusCode = data.status_code;

    if (statusCode === "2") {
      const email = data.custom_1; // we stored it safely
      const items = data.items || "";

      const plan = items.includes("PRO") ? "pro" : "elite";

      await updateUserSubscription(email, plan);

      console.log("🎉 PAYMENT SUCCESS:", email, plan);
    }

    res.status(200).send("OK");
  } catch (error: any) {
    console.error("Webhook error:", error);
    res.status(500).send("Webhook failed");
  }
});

// ----------------------------
// TEST ROUTE
// ----------------------------
app.get("/", (req, res) => {
  res.send("🚀 PayHere Backend Running (server2.ts)");
});

// ----------------------------
// START SERVER
// ----------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});