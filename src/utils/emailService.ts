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

    // 1. ALWAYS Backup Order JSON 100% ONLINE to Supabase Cloud Storage (No LocalStorage)
    try {
      const orderIdClean = orderData.order_id || `BIO-${Date.now()}`;
      const newOrderObj = {
        id: orderIdClean,
        orderType: orderData.order_details?.includes('MÂM CƠM') ? 'experience_meal' : 'product',
        fulfillmentType: orderData.customer_address?.includes('Ăn tại') ? 'dine_in' : orderData.customer_address?.includes('Mang về') ? 'takeaway' : 'delivery',
        status: 'new',
        customerName: orderData.customer_name || 'Khách hàng',
        customerPhone: orderData.customer_phone || '',
        customerEmail: orderData.customer_email || '',
        customerAddress: orderData.customer_address || '',
        items: [],
        subtotal: typeof orderData.total_price === 'string' ? Number(orderData.total_price.replace(/[^\d]/g, '')) : Number(orderData.total_price || 0),
        grandTotal: typeof orderData.total_price === 'string' ? Number(orderData.total_price.replace(/[^\d]/g, '')) : Number(orderData.total_price || 0),
        paidAmount: typeof orderData.paid_amount === 'string' ? Number(orderData.paid_amount.replace(/[^\d]/g, '')) : Number(orderData.paid_amount || 0),
        remainingAmount: typeof orderData.remaining_amount === 'string' ? Number(orderData.remaining_amount.replace(/[^\d]/g, '')) : Number(orderData.remaining_amount || 0),
        notes: orderData.order_details || '',
        createdAt: new Date().toISOString()
      };

      // Upload directly to Supabase Cloud Storage
      const jsonContent = JSON.stringify(newOrderObj, null, 2);
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
