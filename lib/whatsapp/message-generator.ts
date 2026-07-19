// HUSNA TRAVEL & MARKETING - WHATSAPP LINK GENERATOR

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923001234567';

export const generateWhatsAppLink = (message: string) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const formatCurrency = (amount: number) => {
  return `Rs. ${amount.toLocaleString()}`;
};

export const generateUmrahInquiryMessage = (data: {
  packageName: string;
  makkahHotel: string;
  madinahHotel: string;
  roomType: string;
  pricePerPerson: number;
  travelers: number;
  totalAmount: number;
  travelDate: string;
  customerName: string;
  phone: string;
  email?: string;
  notes?: string;
}) => {
  return `Assalam-o-Alaikum,

I am interested in booking an Umrah Package from 
Husna Travel & Marketing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕋 UMRAH PACKAGE INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Package Name:
${data.packageName}

🏨 Hotel Information:
Makkah: ${data.makkahHotel}
Madinah: ${data.madinahHotel}

🏠 Room Type:
${data.roomType}

💰 Price Per Person:
${formatCurrency(data.pricePerPerson)}

👥 Number of Travelers:
${data.travelers}

💵 Estimated Total Amount:
${formatCurrency(data.totalAmount)}

📅 Preferred Travel Date:
${data.travelDate}

👤 Customer Name:
${data.customerName}

📱 Phone Number:
${data.phone}

${data.email ? `📧 Email:\n${data.email}\n` : ''}
${data.notes ? `📝 Additional Notes:\n${data.notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please provide complete package details and 
confirm availability for the selected date.

JazakAllah Khair.

Husna Travel & Marketing
Your Sacred Journey Begins Here`;
};

export const generateProductOrderMessage = (data: {
  customerName: string;
  phone: string;
  address: string;
  items: Array<{
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  totalAmount: number;
  notes?: string;
}) => {
  const itemsText = data.items
    .map(
      (item) => `📦 Product Name:
${item.productName}
🔢 Quantity: ${item.quantity}
💰 Unit Price: ${formatCurrency(item.unitPrice)}
💵 Subtotal: ${formatCurrency(item.totalPrice)}`
    )
    .join('\n\n');

  return `Assalam-o-Alaikum,

I would like to place an order through 
Husna Travel & Marketing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛍️ PRODUCT ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Customer Name:
${data.customerName}

📱 Phone Number:
${data.phone}

📍 Delivery Address:
${data.address}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
ITEMS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
${itemsText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 Total Amount: ${formatCurrency(data.totalAmount)}

${data.notes ? `📝 Additional Notes:\n${data.notes}\n` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please confirm my order and provide 
delivery timeline.

JazakAllah Khair.

Husna Travel & Marketing
Your Sacred Journey Begins Here`;
};
