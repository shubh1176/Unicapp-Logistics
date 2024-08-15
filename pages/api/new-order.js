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

    // Convert amount from INR to paisa (smallest currency unit)
    const amountInPaisa = Math.round(amount * 100); // convert to paisa

    // Validate the conversion to ensure it's correct
    if (amountInPaisa <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than zero' });
    }

    const options = {
      amount: amountInPaisa, // use the correctly calculated amount
      currency: 'INR',
      receipt: `receipt_${Math.random().toString(36).substring(2, 15)}`,
    };

    try {
      console.log('Creating order with options:', options);
      const order = await razorpay.orders.create(options);
      console.log('Order created:', order);
      res.status(200).json(order);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
