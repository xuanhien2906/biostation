import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_1h2dixp';
const TEMPLATE_ID = 'template_qa01j0f';
const PUBLIC_KEY = 'wTEBEaHzcO5_FyhsF';

export interface OrderData {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  order_details: string;
  total_price: string;
}

export const sendOrderEmail = async (orderData: OrderData): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        customer_address: orderData.customer_address,
        order_details: orderData.order_details,
        total_price: orderData.total_price,
      },
      PUBLIC_KEY
    );
    return response.status === 200;
  } catch (error) {
    console.error('FAILED to send email', error);
    return false;
  }
};
