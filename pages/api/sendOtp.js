import { Twilio } from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber } = req.body;

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      console.log('Sending OTP to:', phoneNumber);

      const message = await client.messages.create({
        body: `Your verification code is ${otpCode}`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      });

      console.log('OTP sent, message SID:', message.sid);

      res.status(200).json({ otpCode, sid: message.sid });
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
