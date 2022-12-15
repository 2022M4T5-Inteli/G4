const accountSid = "ACcdcc67879eb8acdf8374324893690f4a";
const authToken = "<token>";
const client = require("twilio")(accountSid, authToken);

export async function sendWhatsappAlert(message) {
  const response = await client.messages.create({
    body: message,
    from: "whatsapp:+14155238886",
    to: "whatsapp:+556282145560",
  });
  console.log("[I] Whatsapp message sent!\n");
  return response;
}
