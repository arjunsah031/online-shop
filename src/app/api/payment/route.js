import axios from 'axios';
import crypto from 'node:crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    const { amount, currency, order_id } = data;

    const paymentUrl = "https://api.cryptomus.com/v1/payment";

    // Verify that the MerchantId is correct and properly loaded
    const MerchantId = process.env.CRYPTOMUS_MERCHANT_ID || 'hardcoded-merchant-id-for-testing'; // Use this for testing
    const CRYPTOMUS_API_KEY = process.env.CRYPTOMUS_API_KEY;

    if (!MerchantId) {
      throw new Error('MerchantId is missing or incorrect.');
    }

    const paymentData = {
        amount,
        currency,
        order_id
    };

    console.log(paymentData)

    const stringData = Buffer.from(JSON.stringify(paymentData)).toString('base64') + CRYPTOMUS_API_KEY;
    const sign = crypto.createHash('md5').update(stringData).digest('hex');

    const response = await axios.post(paymentUrl, paymentData, {
      headers: {
        "merchant": MerchantId,
        "sign": sign,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ message: response.data });

  } catch (error) {
    console.error('Error in Cryptomus Payment API:', error.response ? error.response.data : error.message);
    return NextResponse.json({ error: error.response ? error.response.data : 'Payment processing failed.' }, { status: 500 });
  }
}
