import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid amount provided' });
    }

    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit
      currency: 'INR',
      receipt: `receipt_${Math.random().toString(36).substring(2, 15)}`,
    };

    try {
      console.log('Creating order with options:', options); // Log the options to check them
      const order = await razorpay.orders.create(options);
      console.log('Order created:', order); // Log the created order
      res.status(200).json(order);
    } catch (error) {
      console.error('Error creating Razorpay order:', error); // Log the error
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
