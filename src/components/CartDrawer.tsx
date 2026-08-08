import React, { useState } from 'react';
import { CartItem, OrderRecipient } from '../types';
import { useSite } from '../context/SiteContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Check,
  Truck,
  QrCode,
  Copy,
  CheckCircle2,
  Mail,
  User,
  Phone,
  MapPin,
  FileText,
  Printer,
  ChevronLeft,
  CreditCard,
  Building2,
  Sparkles,
} from 'lucide-react';

import { sendOrderEmail } from '../utils/emailService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const { siteData } = useSite();
  const paymentConfig = siteData.paymentConfig;

  // Flow step state: 'cart' | 'info' | 'payment' | 'completed'
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'info' | 'payment' | 'completed'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if cart contains any Experience Meal / Food Order items
  const hasFoodOrder = cartItems.some(
    (item) => item.product.category === 'Bữa Ăn Trải Nghiệm' || item.product.id.includes('exp-')
  );

  // Recipient Information Form
  const [recipient, setRecipient] = useState<OrderRecipient>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'TP. Hồ Chí Minh',
    shippingType: 'inner',
    orderType: 'delivery',
    notes: '',
  });

  // Promo code & Discounts
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');

  // UI helpers
  const [copyNotification, setCopyNotification] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [savedOrderSnapshot, setSavedOrderSnapshot] = useState<{
    cartItems: CartItem[];
    subtotal: number;
    discountAmount: number;
    shippingFee: number;
    vatAmount: number;
    grandTotal: number;
    amountToPay: number;
    remainingAmount: number;
    recipient: OrderRecipient;
    createdAt: string;
  } | null>(null);

  if (!isOpen) return null;

  // Price calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const subtotalAfterDiscount = subtotal - discountAmount;

  // Shipping Fee calculation (Zero for food orders or free threshold)
  const isFreeShipping = recipient.shippingType === 'inner' && subtotal >= (paymentConfig.freeShippingThreshold || 300000);
  const shippingFee = (subtotal === 0 || hasFoodOrder || recipient.orderType !== 'delivery')
    ? 0 
    : isFreeShipping 
      ? 0 
      : recipient.shippingType === 'inner'
        ? (paymentConfig.innerCityShippingFee ?? 20000)
        : (paymentConfig.outerCityShippingFee ?? 35000);

  // VAT Calculation
  const vatRate = paymentConfig.vatRatePercent ?? 8;
  const vatAmount = Math.round(subtotalAfterDiscount * (vatRate / 100));

  // Grand Total including items, discount, shipping, and VAT
  const grandTotal = subtotalAfterDiscount + shippingFee + vatAmount;

  // Amount to pay based on order type
  const isDepositRequired = recipient.orderType === 'takeaway' || recipient.orderType === 'dine-in';
  const amountToPay = isDepositRequired ? Math.round(grandTotal / 2) : grandTotal;
  const remainingAmount = grandTotal - amountToPay;

  const applyPromoCode = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'BIOSTATION' || code === 'BACHMOC') {
      setDiscountPercent(10);
      setPromoError('');
    } else {
      setPromoError('Mã khuyến mãi không hợp lệ. Thử "BIOSTATION" hoặc "BACHMOC".');
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyNotification(`Đã sao chép ${label}!`);
    setTimeout(() => setCopyNotification(null), 2500);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasFoodOrder) {
      if (!recipient.fullName || !recipient.phone) {
        alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại.');
        return;
      }
    } else {
      if (!recipient.fullName || !recipient.phone || !recipient.address) {
        alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng.');
        return;
      }
    }
    const generatedId = `BIO-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2,'0')}${new Date().getDate().toString().padStart(2,'0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);
    setCheckoutStep('payment');
  };

  const handleConfirmPaymentSuccess = async () => {
    setIsSubmitting(true);
    const currentOrder = {
      cartItems: [...cartItems],
      subtotal,
      discountAmount,
      shippingFee,
      vatAmount,
      grandTotal,
      amountToPay,
      remainingAmount,
      recipient: { ...recipient },
      createdAt: new Date().toLocaleString('vi-VN'),
    };

    const orderDetailsText = cartItems.map((item, index) => `
      <tr>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2d5c3; text-align: center; color: #5c4d43;">${index + 1}</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2d5c3; color: #274e23; font-weight: bold;">${item.product.name}</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2d5c3; text-align: center; color: #2d241e; font-weight: bold;">${item.quantity}</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2d5c3; text-align: right; color: #5c4d43;">${new Intl.NumberFormat('vi-VN').format(item.product.price)}đ</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2d5c3; text-align: right; color: #b14811; font-weight: bold;">${new Intl.NumberFormat('vi-VN').format(item.product.price * item.quantity)}đ</td>
      </tr>
    `).join('');
    
    const brandTargetEmail = siteData.brandConfig?.email || siteData.paymentConfig?.emailSender || 'contact@biostation.vn';

    await sendOrderEmail({
      customer_name: recipient.fullName,
      customer_phone: recipient.phone,
      customer_email: recipient.email ? recipient.email.trim() : '',
      customer_address: recipient.address || (recipient.city ? `${recipient.district || ''}, ${recipient.city}` : 'Địa chỉ theo đơn hàng'),
      order_details: orderDetailsText,
      total_price: `${new Intl.NumberFormat('vi-VN').format(grandTotal)} đ`,
      paid_amount: `${new Intl.NumberFormat('vi-VN').format(amountToPay)} đ`,
      remaining_amount: `${new Intl.NumberFormat('vi-VN').format(remainingAmount)} đ`,
      brand_email: brandTargetEmail,
      order_id: orderId || `BIO-${Date.now()}`
    });

    setSavedOrderSnapshot(currentOrder);
    setCheckoutStep('completed');
    onClearCart();
    setIsSubmitting(false);
  };

  const transferSyntax = `${paymentConfig.transferNotePrefix || 'BIO'} ${orderId || recipient.phone.replace(/\s+/g, '')}`;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-50 bg-[#2d241e]/60 backdrop-blur-sm flex justify-end cursor-pointer">
        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg bg-[#fcfaf7] h-full shadow-2xl flex flex-col justify-between border-l border-[#e2d5c3] text-[#2d241e] animate-slide-left cursor-default">
          
          {/* Top Header Bar */}
          <div className="p-4 pt-12 md:pt-4 sm:p-5 border-b border-[#e2d5c3] flex items-center justify-between bg-[#f8f5f0] shrink-0">
            <div className="flex items-center gap-2">
              {checkoutStep !== 'cart' && checkoutStep !== 'completed' && (
                <button
                  onClick={() => setCheckoutStep(checkoutStep === 'payment' ? 'info' : 'cart')}
                  className="p-1.5 rounded-lg hover:bg-[#e2d5c3] text-[#5c4d43] mr-1 cursor-pointer"
                  title="Quay lại"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <ShoppingBag className="w-5 h-5 text-[#274e23]" />
              <div>
                <h2 className="font-bold font-serif text-base sm:text-lg text-[#274e23]">
                  {checkoutStep === 'cart' && `Giỏ Hàng BiO (${cartItems.reduce((acc, i) => acc + i.quantity, 0)})`}
                  {checkoutStep === 'info' && (hasFoodOrder ? 'Thông Tin Khách Hàng Đặt Món' : 'Thông Tin Nhận Hàng & VAT')}
                  {checkoutStep === 'payment' && 'Thanh Toán QR Code / Chuyển Khoản'}
                  {checkoutStep === 'completed' && 'Đơn Hàng Đã Được Xác Nhận'}
                </h2>
                <p className="text-[11px] text-[#7a6858]">
                  {checkoutStep === 'cart' && 'Thực phẩm sạch Bách Mộc chọn lọc'}
                  {checkoutStep === 'info' && (hasFoodOrder ? 'Bước 2/3: Điền Họ tên & Số điện thoại' : 'Bước 2/3: Điền địa chỉ & chọn cước vận chuyển')}
                  {checkoutStep === 'payment' && 'Bước 3/3: Quét mã QR thanh toán ngân hàng'}
                  {checkoutStep === 'completed' && 'Thông báo xác nhận email đã gửi'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#e2d5c3]/50 text-[#5c4d43] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Copy Toast Alert */}
          {copyNotification && (
            <div className="bg-[#274e23] text-white text-xs px-4 py-2 font-bold flex items-center gap-2 shadow-md shrink-0">
              <Check className="w-4 h-4 text-amber-300" />
              <span>{copyNotification}</span>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">

            {/* STEP 1: CART ITEMS LIST */}
            {checkoutStep === 'cart' && (
              <>
                {/* Shipping Threshold Progress */}
                <div className="px-4 py-3 bg-[#f2e9dc] rounded-2xl border border-[#e2d5c3] text-xs">
                  {isFreeShipping ? (
                    <div className="flex items-center gap-1.5 text-[#274e23] font-bold">
                      <Truck className="w-4 h-4 text-amber-600" />
                      <span>Chúc mừng! Bạn được MIỄN PHÍ VẬN CHUYỂN Nội Thành!</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[#5c4d43]">
                        <span>
                          Mua thêm {((paymentConfig.freeShippingThreshold || 300000) - subtotal).toLocaleString('vi-VN')}đ để miễn phí ship nội thành
                        </span>
                        <span className="font-bold">
                          {Math.round((subtotal / (paymentConfig.freeShippingThreshold || 300000)) * 100)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#e2d5c3] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#274e23] transition-all duration-300"
                          style={{
                            width: `${Math.min(100, (subtotal / (paymentConfig.freeShippingThreshold || 300000)) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-16 h-16 text-[#c4b3a1] mx-auto" />
                    <p className="text-sm text-[#7a6858] font-medium">Giỏ hàng của bạn đang trống.</p>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-[#274e23] text-white font-bold text-xs cursor-pointer"
                    >
                      Khám Phá Nông Sản BMQ
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#e2d5c3] shadow-sm"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl bg-[#f0e6d8] shrink-0"
                        />

                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-xs font-bold text-[#274e23] truncate font-serif">
                            {item.product.name}
                          </h4>
                          <p className="text-xs font-black text-[#a66e2c]">
                            {item.product.price.toLocaleString('vi-VN')}đ
                          </p>

                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-md bg-[#f0e6d8] text-[#2d241e] flex items-center justify-center font-bold cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-md bg-[#f0e6d8] text-[#2d241e] flex items-center justify-center font-bold cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-2 text-[#9e8b7b] hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: RECIPIENT INFORMATION & SHIPPING OPTIONS */}
            {checkoutStep === 'info' && (
              <form id="recipient-form" onSubmit={handleProceedToPayment} className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-[#e2d5c3] space-y-3 shadow-sm">
                  <h3 className="text-xs font-bold text-[#274e23] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0e6d8] pb-2">
                    <User className="w-4 h-4 text-amber-600" />
                    {hasFoodOrder ? '1. Thông Tin Khách Hàng Đặt Món' : '1. Thông Tin Người Nhận Hàng'}
                  </h3>

                  {/* Selection for Dine-in / Takeaway / Delivery */}
                  <div>
                    <label className="text-[11px] font-bold text-[#274e23] block mb-1.5 uppercase tracking-wider">
                      Hình Thức Nhận Hàng & Thưởng Thức:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setRecipient({ ...recipient, orderType: 'dine-in' })}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          recipient.orderType === 'dine-in'
                            ? 'bg-[#274e23] text-white border-[#274e23] shadow-sm'
                            : 'bg-[#fbf8f3] text-[#5c4d43] border-[#dcd0bf] hover:bg-[#f0e6d8]'
                        }`}
                      >
                        <span>🍽️ Ăn Tại Trạm</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecipient({ ...recipient, orderType: 'takeaway' })}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          recipient.orderType === 'takeaway'
                            ? 'bg-[#274e23] text-white border-[#274e23] shadow-sm'
                            : 'bg-[#fbf8f3] text-[#5c4d43] border-[#dcd0bf] hover:bg-[#f0e6d8]'
                        }`}
                      >
                        <span>🛍️ Mang Về</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecipient({ ...recipient, orderType: 'delivery' })}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          recipient.orderType === 'delivery'
                            ? 'bg-[#274e23] text-white border-[#274e23] shadow-sm'
                            : 'bg-[#fbf8f3] text-[#5c4d43] border-[#dcd0bf] hover:bg-[#f0e6d8]'
                        }`}
                      >
                        <span>🚚 Giao Tận Nhà</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                        Họ và Tên *
                      </label>
                      <input
                        type="text"
                        required
                        value={recipient.fullName}
                        onChange={(e) => setRecipient({ ...recipient, fullName: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] focus:ring-2 focus:ring-[#274e23] outline-none"
                        placeholder="Nguyễn Văn An"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                        Số Điện Thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        value={recipient.phone}
                        onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] focus:ring-2 focus:ring-[#274e23] outline-none"
                        placeholder="0912 345 678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                      Email Nhận Xác Nhận Đơn Hàng & Hóa Đơn (Không bắt buộc)
                    </label>
                    <input
                      type="email"
                      value={recipient.email}
                      onChange={(e) => setRecipient({ ...recipient, email: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] focus:ring-2 focus:ring-[#274e23] outline-none"
                      placeholder="nguyenvanan@gmail.com"
                    />
                  </div>

                  {!hasFoodOrder && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                          Địa Chỉ Nhận Hàng Chi Tiết *
                        </label>
                        <input
                          type="text"
                          required
                          value={recipient.address}
                          onChange={(e) => setRecipient({ ...recipient, address: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] focus:ring-2 focus:ring-[#274e23] outline-none"
                          placeholder="Số nhà, Tên đường, Phường/Xã..."
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#5c4d43] block mb-1">
                          Tỉnh / Thành *
                        </label>
                        <input
                          type="text"
                          required
                          value={recipient.city}
                          onChange={(e) => setRecipient({ ...recipient, city: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-[#fbf8f3] focus:ring-2 focus:ring-[#274e23] outline-none"
                          placeholder="TP.HCM"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Type Choice */}
                <div className="bg-white p-4 rounded-2xl border border-[#e2d5c3] space-y-3 shadow-sm">
                  <h3 className="text-xs font-bold text-[#274e23] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0e6d8] pb-2">
                    <ShoppingBag className="w-4 h-4 text-amber-600" />
                    2. Hình Thức Nhận Hàng
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label
                      onClick={() => setRecipient({ ...recipient, orderType: 'delivery' })}
                      className={`p-2.5 rounded-xl border cursor-pointer text-center transition-all ${
                        recipient.orderType === 'delivery'
                          ? 'border-[#274e23] bg-[#274e23]/5 font-bold text-[#274e23]'
                          : 'border-[#dcd0bf] bg-white text-[#7a6858]'
                      }`}
                    >
                      <div className="text-xs">🚚 Giao hàng tận nơi</div>
                      <div className="text-[10px] mt-0.5 opacity-80">(Thanh toán 100%)</div>
                    </label>
                    <label
                      onClick={() => setRecipient({ ...recipient, orderType: 'takeaway' })}
                      className={`p-2.5 rounded-xl border cursor-pointer text-center transition-all ${
                        recipient.orderType === 'takeaway'
                          ? 'border-[#274e23] bg-[#274e23]/5 font-bold text-[#274e23]'
                          : 'border-[#dcd0bf] bg-white text-[#7a6858]'
                      }`}
                    >
                      <div className="text-xs">🛍️ Mua đem về</div>
                      <div className="text-[10px] mt-0.5 opacity-80">(Cọc trước 50%)</div>
                    </label>
                    <label
                      onClick={() => setRecipient({ ...recipient, orderType: 'dine-in' })}
                      className={`p-2.5 rounded-xl border cursor-pointer text-center transition-all ${
                        recipient.orderType === 'dine-in'
                          ? 'border-[#274e23] bg-[#274e23]/5 font-bold text-[#274e23]'
                          : 'border-[#dcd0bf] bg-white text-[#7a6858]'
                      }`}
                    >
                      <div className="text-xs">🍽️ Đặt bàn tại quán</div>
                      <div className="text-[10px] mt-0.5 opacity-80">(Cọc trước 50%)</div>
                    </label>
                  </div>
                </div>

                {/* Shipping Type Choice - only for physical product delivery and delivery type */}
                {!hasFoodOrder && recipient.orderType === 'delivery' && (
                  <div className="bg-white p-4 rounded-2xl border border-[#e2d5c3] space-y-3 shadow-sm">
                    <h3 className="text-xs font-bold text-[#274e23] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0e6d8] pb-2">
                      <Truck className="w-4 h-4 text-amber-600" />
                      3. Phương Thức Vận Chuyển
                    </h3>

                    <div className="space-y-2">
                      <label
                        onClick={() => setRecipient({ ...recipient, shippingType: 'inner' })}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          recipient.shippingType === 'inner'
                            ? 'border-[#274e23] bg-[#274e23]/5 font-bold'
                            : 'border-[#dcd0bf] bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shippingType"
                            checked={recipient.shippingType === 'inner'}
                            onChange={() => setRecipient({ ...recipient, shippingType: 'inner' })}
                            className="accent-[#274e23]"
                          />
                          <div>
                            <div className="text-xs text-[#274e23] font-bold">
                              🚚 Nội Thành (TP.HCM / Hà Nội)
                            </div>
                            <div className="text-[11px] text-[#7a6858] font-normal">
                              Giao nhanh trong 2h - 24h. Miễn phí cho đơn từ {(paymentConfig.freeShippingThreshold || 300000).toLocaleString('vi-VN')}đ.
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-black text-amber-700">
                          {isFreeShipping
                            ? 'MIỄN PHÍ'
                            : `${(paymentConfig.innerCityShippingFee ?? 20000).toLocaleString('vi-VN')}đ`}
                        </span>
                      </label>

                      <label
                        onClick={() => setRecipient({ ...recipient, shippingType: 'outer' })}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          recipient.shippingType === 'outer'
                            ? 'border-[#274e23] bg-[#274e23]/5 font-bold'
                            : 'border-[#dcd0bf] bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shippingType"
                            checked={recipient.shippingType === 'outer'}
                            onChange={() => setRecipient({ ...recipient, shippingType: 'outer' })}
                            className="accent-[#274e23]"
                          />
                          <div>
                            <div className="text-xs text-[#274e23] font-bold">
                              ✈️ Ngoại Tỉnh / Các Tỉnh Thành Khác
                            </div>
                            <div className="text-[11px] text-[#7a6858] font-normal">
                              Giao tận nhà theo cước phí niêm yết vận chuyển đối tác hiện hành.
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-black text-amber-700">
                          {(paymentConfig.outerCityShippingFee ?? 35000).toLocaleString('vi-VN')}đ
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Transparent Detailed Price Breakdown Table */}
                <div className="bg-[#f0e6d8] p-4 rounded-2xl border border-[#dcd0bf] space-y-2 text-xs">
                  <h4 className="font-bold font-serif text-[#274e23] border-b border-[#dcd0bf] pb-1.5">
                    Bảng Chi Tiết Giá Đơn Hàng & Thuế VAT ({vatRate}%)
                  </h4>
                  <div className="flex justify-between text-[#5c4d43]">
                    <span>Tạm tính món ăn ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} món):</span>
                    <span className="font-bold">{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-semibold">
                      <span>Mã giảm giá ({discountPercent}%):</span>
                      <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  {!hasFoodOrder && (
                    <div className="flex justify-between text-[#5c4d43]">
                      <span>Phí vận chuyển ({recipient.shippingType === 'inner' ? 'Nội thành' : 'Ngoại tỉnh'}):</span>
                      <span className="font-bold">
                        {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}đ`}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5c4d43]">
                    <span>Thuế Giá Trị Gia Tăng (VAT {vatRate}%):</span>
                    <span className="font-bold">+{vatAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-black text-[#274e23] pt-2 border-t border-[#dcd0bf]">
                    <span>Tổng Thanh Toán (Đã VAT):</span>
                    <span className="text-base text-amber-700">{grandTotal.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                </div>
              </form>
            )}

            {/* STEP 3: QR CODE & BANK TRANSFER PAYMENT */}
            {checkoutStep === 'payment' && (
              <div className="space-y-4">
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-900 font-bold">Mã Đơn Hàng: #{orderId}</strong>
                    <span>Vui lòng mở ứng dụng Ngân hàng hoặc Ví điện tử (Momo/ZaloPay/VNPay) để quét mã QR bên dưới.</span>
                  </div>
                </div>

                {/* QR Code Graphic Display */}
                <div className="bg-white p-5 rounded-3xl border border-[#e2d5c3] shadow-md text-center space-y-3">
                  <div className="inline-block p-3 bg-gradient-to-b from-[#fbf8f3] to-[#f0e6d8] rounded-2xl border-2 border-[#274e23]/30 shadow-inner">
                    <img
                      src={paymentConfig.qrCodeUrl || 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=500&q=80'}
                      alt="Mã QR Thanh Toán BiO Station"
                      className="w-56 h-56 object-cover mx-auto rounded-xl shadow"
                    />
                  </div>
                  <div className="text-[11px] text-[#7a6858] font-semibold flex items-center justify-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-[#274e23]" />
                    <span>Quét Mã Chuyển Khoản Nhanh VietQR</span>
                  </div>
                </div>

                {/* Bank Account Details Card */}
                <div className="bg-white p-4 rounded-2xl border border-[#e2d5c3] space-y-2.5 text-xs shadow-sm">
                  <h3 className="font-bold text-[#274e23] uppercase tracking-wider flex items-center justify-between border-b border-[#f0e6d8] pb-2">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-amber-600" />
                      Thông Tin Tài Khoản Ngân Hàng
                    </span>
                    <span className="px-2 py-0.5 bg-[#274e23] text-white font-bold text-[10px] rounded">
                      Chính Thức
                    </span>
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1 border-b border-[#f0e6d8]">
                      <span className="text-[#7a6858]">Ngân Hàng:</span>
                      <span className="font-bold text-[#274e23]">{paymentConfig.bankName || 'MBBank'}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-[#f0e6d8]">
                      <span className="text-[#7a6858]">Số Tài Khoản:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-amber-800 text-sm">
                          {paymentConfig.accountNumber || '908123456789'}
                        </span>
                        <button
                          onClick={() => handleCopyText(paymentConfig.accountNumber, 'Số tài khoản')}
                          className="p-1 text-[#274e23] hover:bg-[#f0e6d8] rounded cursor-pointer"
                          title="Sao chép số tài khoản"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-[#f0e6d8]">
                      <span className="text-[#7a6858]">Chủ Tài Khoản:</span>
                      <span className="font-bold text-[#274e23] uppercase">
                        {paymentConfig.accountName || 'HE SINH THAI BIO STATION BACH MOC'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-[#f0e6d8]">
                      <span className="text-[#7a6858]">Chi Nhánh:</span>
                      <span className="font-medium text-[#5c4d43]">{paymentConfig.bankBranch || 'Phú Mỹ Hưng, TP.HCM'}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 bg-[#fbf8f3] p-2 rounded-xl border border-[#e2d5c3]">
                      <span className="text-[#7a6858]">Nội dung chuyển khoản:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#274e23] bg-amber-200/60 px-2 py-0.5 rounded">
                          {transferSyntax}
                        </span>
                        <button
                          onClick={() => handleCopyText(transferSyntax, 'Nội dung chuyển khoản')}
                          className="p-1 text-[#274e23] hover:bg-[#e2d5c3] rounded cursor-pointer"
                          title="Sao chép nội dung"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 text-sm font-black text-[#274e23]">
                      <span>Số tiền chuyển khoản {isDepositRequired ? '(Cọc 50%)' : '(100%)'}:</span>
                      <span className="text-base text-amber-700">{amountToPay.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER COMPLETED & EMAIL CONFIRMATION NOTIFICATION */}
            {checkoutStep === 'completed' && savedOrderSnapshot && (
              <div className="text-center py-6 space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-[#274e23] text-amber-300 rounded-full mx-auto flex items-center justify-center font-bold text-3xl shadow-xl border-4 border-amber-400">
                  ✓
                </div>

                <div className="space-y-1">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
                    🟢 Đã Đặt Hàng & Xác Nhận Thanh Toán
                  </span>
                  <h3 className="text-2xl font-black font-serif text-[#274e23]">
                    Cảm Ơn Bạn Đã Thanh Toán!
                  </h3>
                  <p className="text-xs text-[#7a6858]">
                    Mã Đơn Hàng Của Bạn: <strong className="text-[#274e23]">#{orderId}</strong>
                  </p>
                </div>

                {/* Notification Email Box */}
                <div className="bg-[#f0e6d8] p-4 rounded-2xl border border-[#dcd0bf] text-left space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#274e23] font-bold">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <span>Email Xác Nhận Đơn Hàng Đã Được Gửi!</span>
                  </div>
                  <p className="text-[#5c4d43] leading-relaxed">
                    Hệ thống tự động BiO Station vừa gửi email xác nhận chi tiết đơn hàng, cước phí vận chuyển và hóa đơn VAT tới địa chỉ email:
                  </p>
                  <div className="font-mono font-bold text-[#274e23] bg-white p-2 rounded-xl border border-[#dcd0bf] text-center">
                    {savedOrderSnapshot.recipient.email}
                  </div>
                </div>

                {/* Recipient Details Summary Card */}
                <div className="bg-white p-4 rounded-2xl border border-[#e2d5c3] text-left text-xs space-y-2">
                  <h4 className="font-bold font-serif text-[#274e23] border-b border-[#f0e6d8] pb-1.5 flex items-center justify-between">
                    <span>Thông Tin Nhận Hàng</span>
                    <span className="text-[11px] font-normal text-[#7a6858]">{savedOrderSnapshot.createdAt}</span>
                  </h4>
                  <div><strong>Người nhận:</strong> {savedOrderSnapshot.recipient.fullName} - {savedOrderSnapshot.recipient.phone}</div>
                  <div><strong>Địa chỉ:</strong> {savedOrderSnapshot.recipient.address}, {savedOrderSnapshot.recipient.city}</div>
                  <div><strong>Hình thức:</strong> {
                    savedOrderSnapshot.recipient.orderType === 'delivery' ? 'Giao hàng tận nơi' : 
                    savedOrderSnapshot.recipient.orderType === 'takeaway' ? 'Mua đem về' : 'Đặt bàn tại quán'
                  }</div>
                  {savedOrderSnapshot.recipient.orderType === 'delivery' && !hasFoodOrder && (
                    <div><strong>Giao vận:</strong> {savedOrderSnapshot.recipient.shippingType === 'inner' ? 'Nội thành' : 'Ngoại tỉnh'}</div>
                  )}
                  <div className="pt-2 border-t border-[#f0e6d8] flex justify-between font-bold text-[#274e23]">
                    <span>Tổng đơn (Đã VAT):</span>
                    <span>{savedOrderSnapshot.grandTotal.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#274e23]">
                    <span>Đã thanh toán {savedOrderSnapshot.recipient.orderType !== 'delivery' ? '(Cọc 50%)' : ''}:</span>
                    <span className="text-amber-700">{savedOrderSnapshot.amountToPay.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  {savedOrderSnapshot.remainingAmount > 0 && (
                    <div className="flex justify-between font-bold text-red-600">
                      <span>Còn lại cần thanh toán:</span>
                      <span>{savedOrderSnapshot.remainingAmount.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                  )}
                </div>

                {/* Email Preview & Print Button */}
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="w-full py-3 bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-amber-300" /> Xem & In Bản Sao Email Xác Nhận Đơn Hàng
                </button>
              </div>
            )}

          </div>

          {/* Bottom Action Footer Bar */}
          <div className="p-4 sm:p-5 border-t border-[#e2d5c3] bg-[#f8f5f0] shrink-0 space-y-3">
            
            {checkoutStep === 'cart' && cartItems.length > 0 && (
              <>
                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Mã giảm giá (BIOSTATION)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 text-xs p-2.5 rounded-xl border border-[#dcd0bf] bg-white focus:outline-none focus:border-[#274e23]"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-3.5 py-2 bg-[#274e23] text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Áp Dụng
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-red-600">{promoError}</p>}
                {discountPercent > 0 && (
                  <p className="text-[11px] text-[#274e23] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-amber-600" /> Đã áp dụng giảm giá {discountPercent}%!
                  </p>
                )}

                <div className="space-y-1 text-xs text-[#5c4d43] pt-2 border-t border-[#e2d5c3]">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-bold">{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Giảm giá:</span>
                      <span className="font-bold">-{discountAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Dự kiến VAT ({vatRate}%):</span>
                    <span className="font-bold">+{vatAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-[#274e23] pt-1.5 border-t border-[#e2d5c3]">
                    <span>Tổng đơn hàng:</span>
                    <span className="text-amber-800">{grandTotal.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep('info')}
                  className="w-full py-3.5 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Tiến Hành Đặt Hàng & Thanh Toán</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {checkoutStep === 'info' && (
              <button
                type="submit"
                form="recipient-form"
                className="w-full py-3.5 rounded-xl bg-[#274e23] hover:bg-[#1e3e1a] text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Xác Nhận Đơn & Mở Mã QR Thanh Toán</span>
                <QrCode className="w-4 h-4 text-amber-300" />
              </button>
            )}

            {checkoutStep === 'payment' && (
              <button
                onClick={handleConfirmPaymentSuccess}
                className="w-full py-3.5 rounded-xl bg-[#274e23] hover:bg-[#1f381c] text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-amber-400 hover:scale-[1.01]"
              >
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <span>Tôi Đã Thanh Toán / Xác Nhận Chuyển Khoản</span>
              </button>
            )}

            {checkoutStep === 'completed' && (
              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  setSavedOrderSnapshot(null);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-[#274e23] text-white font-bold text-xs tracking-wider uppercase cursor-pointer"
              >
                Hoàn Tất & Tiếp Tục Mua Sắm
              </button>
            )}

          </div>
        </div>
      </div>

      {/* FORMAL EMAIL INVOICE MODAL POPUP */}
      {showEmailModal && savedOrderSnapshot && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-300 overflow-hidden my-8 animate-scale-up text-stone-800">
            {/* Modal Top Header Bar */}
            <div className="bg-[#1f381c] text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-sm sm:text-base font-serif">
                    Mẫu Email Xác Nhận Đơn Hàng BiO Station #{orderId}
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    Đã gửi tới: {savedOrderSnapshot.recipient.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> In Email
                </button>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Simulated Email Envelope Header */}
            <div className="bg-[#f8f5f0] p-4 border-b border-[#e2d5c3] text-xs space-y-1">
              <div><strong>From:</strong> BiO Station Order System &lt;{paymentConfig.emailSender || 'donhang@biostation.vn'}&gt;</div>
              <div><strong>To:</strong> {savedOrderSnapshot.recipient.fullName} &lt;{savedOrderSnapshot.recipient.email}&gt;</div>
              <div><strong>Subject:</strong> [BiO Station] Xác nhận đơn hàng #{orderId} - Thanh toán thành công qua QR Code</div>
              <div><strong>Date:</strong> {savedOrderSnapshot.createdAt}</div>
            </div>

            {/* Email Body Content */}
            <div className="p-6 space-y-6 text-xs leading-relaxed max-h-[70vh] overflow-y-auto font-sans">
              
              {/* Brand Banner */}
              <div className="text-center pb-4 border-b border-stone-200 space-y-1">
                <div className="text-2xl font-black font-serif text-[#274e23] tracking-wide">
                  BiO Station - Bách Mộc
                </div>
                <p className="text-[11px] text-stone-500 italic">
                  Chạm Để Trở Về – Hệ Sinh Thái Nông Sản Hữu Cơ & Tiêu Dùng Tử Tế
                </p>
              </div>

              {/* Greeting */}
              <div className="space-y-2">
                <p>Kính gửi <strong>{savedOrderSnapshot.recipient.fullName}</strong>,</p>
                <p>
                  Cảm ơn Quý khách đã lựa chọn mua sắm nông sản hữu cơ tại <strong>BiO Station</strong>. Chúng tôi xác nhận đã nhận được khoản thanh toán và đơn hàng của Quý khách với thông tin chi tiết dưới đây:
                </p>
              </div>

              {/* Recipient Details Table */}
              <div className="bg-[#fbf8f3] p-4 rounded-2xl border border-[#e2d5c3] space-y-2">
                <h4 className="font-bold text-[#274e23] uppercase tracking-wider text-[11px] border-b border-[#e2d5c3] pb-1">
                  1. THÔNG TIN NGƯỜI NHẬN HÀNG
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div><strong>Họ và tên:</strong> {savedOrderSnapshot.recipient.fullName}</div>
                  <div><strong>Số điện thoại:</strong> {savedOrderSnapshot.recipient.phone}</div>
                  <div><strong>Email nhận tin:</strong> {savedOrderSnapshot.recipient.email}</div>
                  <div><strong>Tỉnh / Thành:</strong> {savedOrderSnapshot.recipient.city}</div>
                  <div className="sm:col-span-2"><strong>Địa chỉ giao hàng:</strong> {savedOrderSnapshot.recipient.address}</div>
                  <div className="sm:col-span-2"><strong>Hình thức vận chuyển:</strong> {savedOrderSnapshot.recipient.shippingType === 'inner' ? 'Giao hàng nội thành' : 'Giao hàng ngoại tỉnh / Liên tỉnh'}</div>
                  {savedOrderSnapshot.recipient.notes && (
                    <div className="sm:col-span-2 italic text-stone-600"><strong>Ghi chú:</strong> {savedOrderSnapshot.recipient.notes}</div>
                  )}
                </div>
              </div>

              {/* Itemized Order Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#274e23] uppercase tracking-wider text-[11px]">
                  2. CHI TIẾT SẢN PHẨM ĐẶT HÀNG
                </h4>
                <div className="border border-stone-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#1f381c] text-white">
                        <th className="p-2.5 font-semibold">STT</th>
                        <th className="p-2.5 font-semibold">Sản Phẩm</th>
                        <th className="p-2.5 font-semibold text-center">SL</th>
                        <th className="p-2.5 font-semibold text-right">Đơn Giá</th>
                        <th className="p-2.5 font-semibold text-right">Thành Tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {savedOrderSnapshot.cartItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-stone-50">
                          <td className="p-2.5 text-center font-medium">{idx + 1}</td>
                          <td className="p-2.5 font-bold text-[#274e23]">{item.product.name}</td>
                          <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                          <td className="p-2.5 text-right">{item.product.price.toLocaleString('vi-VN')}đ</td>
                          <td className="p-2.5 text-right font-bold text-amber-800">
                            {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cost Summary Breakdown */}
              <div className="bg-[#f0e6d8] p-4 rounded-2xl border border-[#dcd0bf] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span>Tạm tính nông sản:</span>
                  <span className="font-bold">{savedOrderSnapshot.subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                {savedOrderSnapshot.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Mã giảm giá:</span>
                    <span className="font-bold">-{savedOrderSnapshot.discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="font-bold">
                    {savedOrderSnapshot.shippingFee === 0 ? 'Miễn phí' : `${savedOrderSnapshot.shippingFee.toLocaleString('vi-VN')}đ`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Thuế Giá Trị Gia Tăng (VAT {vatRate}%):</span>
                  <span className="font-bold">+{savedOrderSnapshot.vatAmount.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between items-center text-sm font-black text-[#274e23] pt-2 border-t border-[#dcd0bf]">
                  <span>TỔNG CỘNG ĐÃ THANH TOÁN:</span>
                  <span className="text-base text-amber-800">{savedOrderSnapshot.grandTotal.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              </div>

              {/* Payment Confirmation Badge */}
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-300 text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>Trạng Thái Thanh Toán: Đã Xác Nhận Qua QR Code Ngân Hàng</span>
                </div>
                <span className="text-[11px] bg-emerald-700 text-white px-2.5 py-0.5 rounded-full font-bold">
                  ĐÃ XÁC NHẬN
                </span>
              </div>

              {/* Footer Notice */}
              <div className="text-[11px] text-stone-500 pt-4 border-t border-stone-200 text-center space-y-1">
                <p>Nếu Quý khách có bất kỳ thắc mắc nào, vui lòng liên hệ Hotline: <strong>{paymentConfig.supportPhone || '0908 123 456'}</strong> hoặc Email: <strong>{paymentConfig.emailSender || 'donhang@biostation.vn'}</strong></p>
                <p>© 2026 BiO Station – Hệ Sinh Thái Nông Sản Hữu Cơ Bách Mộc.</p>
              </div>

            </div>

            <div className="p-4 bg-stone-100 border-t border-stone-200 text-right">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-6 py-2.5 bg-[#274e23] text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
