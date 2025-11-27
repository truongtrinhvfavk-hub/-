import { GoogleGenAI } from "@google/genai";
import { CartItem } from "../types";

// Initialize AI only if key exists to prevent immediate crash
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// A robust local template generator (Plan B)
const generateLocalNote = (cartItems: CartItem[], totalAmount: number): string => {
  const date = new Date().toLocaleDateString();
  
  let note = `【大旺食品订货单】\n`;
  note += `日期: ${date}\n`;
  note += `------------------\n`;
  
  cartItems.forEach(item => {
    note += `${item.name}\n`;
    // Format: 数量 + 单位
    note += `数量: ${item.quantity}${item.unit}`;
    
    // Add sub-unit info if calculating pieces
    if (item.subUnit && item.unit === '件') {
       // Try to parse subUnit (e.g., "4袋" -> 4) to calculate total packs if needed, 
       // but simpler to just show the spec
       note += ` (${item.spec})`; 
    }
    note += `\n`;
    note += `单价: ¥${item.price}/${item.unit}\n`;
    note += `小计: ¥${item.price * item.quantity}\n`;
    note += `------------------\n`;
  });
  
  note += `\n💰 总金额: ¥${totalAmount.toFixed(2)}\n`;
  note += `📦 总件数: ${cartItems.reduce((sum, i) => sum + i.quantity, 0)} 件\n`;
  note += `\n请确认订单无误，谢谢惠顾！`;
  
  return note;
};

export const generateOrderNote = async (cartItems: CartItem[], totalAmount: number): Promise<string> => {
  if (cartItems.length === 0) return "订单为空。";

  // If no API Key is provided, skip straight to local generation
  if (!ai) {
    console.log("No API Key found, using local template.");
    return generateLocalNote(cartItems, totalAmount);
  }

  // If API Key exists, try to use AI, but fallback if it fails (e.g. network issue)
  try {
    const itemsList = cartItems.map(item => `- ${item.name}: ${item.quantity}${item.unit} (单价: ¥${item.price})`).join('\n');
    
    const prompt = `
      你是一个专业的销售助理。请根据以下的购物清单生成一段发给客户或供应商的专业订单确认文本。
      
      清单内容:
      ${itemsList}
      
      总金额: ¥${totalAmount.toFixed(2)}
      
      要求:
      1. 语气礼貌、专业。
      2. 清晰列出商品名称、数量和总价。
      3. 不需要Markdown格式，只需纯文本，方便复制到微信。
      4. 包含"请确认订单"的字样。
      5. 保持简洁。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || generateLocalNote(cartItems, totalAmount);
  } catch (error) {
    console.error("AI Generation failed, switching to local template:", error);
    // Silent failover to local template so the user never sees an error
    return generateLocalNote(cartItems, totalAmount);
  }
};