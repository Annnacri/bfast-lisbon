import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Lazy Stripe initialization
let stripeClient: Stripe | null = null;
function getStripe() {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.warn("STRIPE_SECRET_KEY is not set. Payments will fail.");
      return null;
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

app.use(express.json());

// API: Create Checkout Session
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(500).json({ 
        error: "Stripe is not configured in this environment. Please add STRIPE_SECRET_KEY to your Secrets." 
      });
    }

    const { items, customerDetails, deliveryData } = req.body;

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.APP_URL}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}`,
      customer_email: customerDetails.email,
      metadata: {
        customerName: customerDetails.name,
        phone: customerDetails.phone,
        address: customerDetails.address,
        deliveryDate: deliveryData.date,
        deliveryTime: deliveryData.time,
      },
    });

    res.json({ id: session.id });
  } catch (error: any) {
    console.error("Error creating stripe session:", error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint
app.post("/api/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const stripe = getStripe();
  if (!stripe) return res.status(500).send("Stripe not configured");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // In production, we'd use stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    // For this environment, we'll parse it directly if we don't have the secret yet.
    event = req.body;
    
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Payment successful for session:", session.id);
      // Here you would trigger order confirmation in DB or email
    }

    res.json({ received: true });
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
