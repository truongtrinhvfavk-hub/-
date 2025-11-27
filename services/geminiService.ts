import { GoogleGenAI } from "@google/genai";
import { CartItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateOrderNote = async (cartItems: CartItem[], totalAmount: number): Promise<string> => {
  if (cartItems.length === 0) return "订单为空。";

  // Construct a clear prompt for the model
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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "无法生成订单备注，请稍后再试。";
  } catch (error) {
    console.error("Error generating order note:", error);
    return "生成失败，请检查网络设置。";
  }
};