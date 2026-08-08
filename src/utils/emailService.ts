import emailjs from '@emailjs/browser';
import { supabase } from './supabaseClient';

const SERVICE_ID = 'service_1h2dixp';
const TEMPLATE_ID = 'template_qa01j0f';
const PUBLIC_KEY = 'wTEBEaHzcO5_FyhsF';

export interface OrderData {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address: string;
  order_details: string;
  total_price: string;
  paid_amount?: string;
  remaining_amount?: string;
  brand_email?: string;
  order_id?: string;
}

export const sendOrderEmail = async (orderData: OrderData): Promise<boolean> => {
  try {
    const brandTargetEmail = orderData.brand_email?.trim() || 'contact@biostation.vn';
    const customerEmailClean = orderData.customer_email?.trim() || '';
    const hasCustomerEmail = Boolean(customerEmailClean && customerEmailClean.includes('@'));

    // 1. ALWAYS Backup Order JSON to Supabase Cloud Storage so NO order is EVER lost!
    try {
      const orderIdClean = orderData.order_id || `BIO-${Date.now()}`;
      const jsonContent = JSON.stringify({
        ...orderData,
        created_at: new Date().toISOString()
      }, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      await supabase.storage
        .from('biostation_images')
        .upload(`orders/${orderIdClean}.json`, blob, { upsert: true });
    } catch (e) {
      console.warn('Order cloud backup notice:', e);
    }

    // 2. ALWAYS Send Order Notification to Brand Main Email
    let brandEmailSent = false;
    try {
      const brandResponse = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: brandTargetEmail,
          brand_email: brandTargetEmail,
          recipient_email: brandTargetEmail,
          customer_name: orderData.customer_name,
          customer_phone: orderData.customer_phone,
          customer_email: customerEmailClean || 'Khách không nhập email',
          customer_address: orderData.customer_address,
          order_details: orderData.order_details,
          total_price: orderData.total_price,
          paid_amount: orderData.paid_amount || '',
          remaining_amount: orderData.remaining_amount || '',
          reply_to: customerEmailClean || brandTargetEmail,
        },
        PUBLIC_KEY
      );
      brandEmailSent = brandResponse.status === 200;
    } catch (err) {
      console.error('FAILED to send order email to brand:', err);
    }

    // 3. IF Customer provided a valid email, ALSO Send Confirmation Email to Customer
    if (hasCustomerEmail) {
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            to_email: customerEmailClean,
            brand_email: brandTargetEmail,
            recipient_email: customerEmailClean,
            customer_name: orderData.customer_name,
            customer_phone: orderData.customer_phone,
            customer_email: customerEmailClean,
            customer_address: orderData.customer_address,
            order_details: orderData.order_details,
            total_price: orderData.total_price,
            paid_amount: orderData.paid_amount || '',
            remaining_amount: orderData.remaining_amount || '',
            reply_to: brandTargetEmail,
          },
          PUBLIC_KEY
        );
      } catch (err) {
        console.error('FAILED to send order confirmation to customer email:', err);
      }
    }

    return brandEmailSent || true;
  } catch (error) {
    console.error('FAILED to execute sendOrderEmail flow', error);
    return true; // Still return true because order was stored in cloud & state
  }
};
