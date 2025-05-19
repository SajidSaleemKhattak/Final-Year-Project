const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY || "sk_test_your_test_key_here"
);
const Booking = require("../models/Booking");

// Create a payment intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res
        .status(500)
        .json({ message: "Stripe configuration is missing" });
    }

    const { bookingId, amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        bookingId,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Error creating payment intent" });
  }
});

// Handle external payment
router.post("/external-payment", async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Update booking status
    await Booking.findByIdAndUpdate(bookingId, {
      status: "confirmed",
      paymentStatus: "completed",
      paymentMethod: "external",
    });

    res.json({ success: true, message: "Payment processed successfully" });
  } catch (error) {
    console.error("Error processing external payment:", error);
    res.status(500).json({ message: "Error processing payment" });
  }
});

// Handle Stripe webhook
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      return res
        .status(500)
        .json({ message: "Stripe webhook configuration is missing" });
    }

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook Error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const bookingId = paymentIntent.metadata.bookingId;

      try {
        await Booking.findByIdAndUpdate(bookingId, {
          status: "confirmed",
          paymentStatus: "completed",
          paymentMethod: "stripe",
        });
      } catch (error) {
        console.error("Error updating booking after payment:", error);
      }
    }

    res.json({ received: true });
  }
);

module.exports = router;
