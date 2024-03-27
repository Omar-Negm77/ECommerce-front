import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/product";

const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handle(req, res) {
  await mongooseConnect();
  if (req.method !== "POST") {
    res.json("Must be a post request");
    return;
  }
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfo = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfo.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;

    if (quantity > 0 && productsInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          unit_amount: quantity * productInfo.price * 100,
          product_data: {
            name: productInfo.title,
          },
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",

    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?cancel=1",
    metadata: { orderId: orderDoc._id.toString() },
  });

  res.json({
    url: session.url,
  });
}
