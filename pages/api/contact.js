import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { name, email, phone, message } = req.body;
    const contactDoc = await Contact.create({ name, email, phone, message });
    res.json(contactDoc);
  }
}
