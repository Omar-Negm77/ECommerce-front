import Button from "@/components/Button";
import { useState } from "react";
import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import axios from "axios";
import { useRouter } from "next/router";

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-top: 4 0px;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { name, email, phone, message };

    await axios.post("/api/contact", data);

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setDone(true);
  }

  if (done) {
    return (
      <>
        <Header />
        <ColumnsWrapper>
          <Center>
            <Box>
              <>
                <h2>Thank you for contacting us!</h2>
                <p>Your message has been sent</p>
              </>
            </Box>
          </Center>
        </ColumnsWrapper>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <h2>Contact Us!</h2>
        <Box>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Name"
              value={name}
              type="text"
              name="name"
              autoComplete="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
              type="email"
              name="email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Phone Number"
              value={phone}
              type="text"
              name="phone"
              autoComplete="number"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <Textarea
              type="text-area"
              value={message}
              placeholder="Your inquiry"
              rows="6"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button type="Submit" $black $block>
              Send Message
            </Button>
          </form>
        </Box>
      </Center>
    </>
  );
}
