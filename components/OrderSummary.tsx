import React, { useState } from 'react';
import { CartItem } from '../types';
import { QuantityControl } from './QuantityControl';
import { generateOrderNote } from '../services/geminiService';

interface OrderSummaryProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, onUpdateQuantity, onClearCart }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<string | null>(null);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleGenerateNote = async () => {
    setIsGenerating(true);
    setGeneratedNote(null);
    const note = await generateOrderNote(cart, totalAmount);
    setGeneratedNote(note);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    if (generatedNote) {
      navigator.clipboard.writeText(generatedNote);
      alert('已复制到剪贴板！');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-lg font-medium">购物车是空的</p>
        <p className="text-sm mt-2">请前往商品目录添加货品</p>
      </div>
    );
  }

  return (
    <div className="pb-32 px-4 pt-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4 flex justify-between items-center text-white shadow-md">
          <h2 className="text-lg font-bold">订货清单</h2>
          <span className="text-sm opacity-90 font-mono">{new Date().toLocaleDateString()}</span>
        </div>
        
        <div className="divide-y divide-gray-100">
          {cart.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-orange-50 transition-colors">
              <div className="flex items-center space-x-3 flex-1">
                 <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                 <div className="flex-1 min-w-0 pr-2">
                   <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                   <div className="flex flex-col text-xs text-gray-500">
                     <span>{item.spec} {item.flavor && `| ${item.flavor}`}</span>
                     <span className="text-red-500 font-medium">¥{item.price}/{item.unit}</span>
                   </div>
                 </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className="text-sm font-bold text-gray-900">¥{(item.price * item.quantity).toFixed(2)}</span>
                <QuantityControl 
                  quantity={item.quantity}
                  onDecrease={() => onUpdateQuantity(item.id, -1)}
                  onIncrease={() => onUpdateQuantity(item.id, 1)}
                  min={0}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 p-4 border-t border-orange-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">总件数</span>
            <span className="font-bold text-gray-900 text-lg">{totalCount} <span className="text-xs font-normal text-gray-500">件</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">预估总金额</span>
            <span className="text-2xl font-extrabold text-red-600">¥{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button 
          onClick={onClearCart}
          className="py-3 bg-white border border-red-200 text-red-500 rounded-xl font-medium shadow-sm hover:bg-red-50 transition-colors"
        >
          清空列表
        </button>
        <button 
          onClick={handleGenerateNote}
          disabled={isGenerating}
          className={`py-3 flex items-center justify-center space-x-2 rounded-xl font-medium shadow-sm text-white transition-colors ${
            isGenerating ? 'bg-orange-400 cursor-wait' : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>AI生成中...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>生成报货单</span>
            </>
          )}
        </button>
      </div>

      {/* AI Generated Note Area */}
      {generatedNote && (
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 animate-fade-in mb-6 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-orange-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              订单文本 (可复制)
            </h3>
            <button 
              onClick={copyToClipboard}
              className="text-xs bg-white text-orange-600 px-3 py-1.5 rounded-lg border border-orange-200 hover:bg-orange-50 font-medium"
            >
              复制文本
            </button>
          </div>
          <textarea 
            readOnly
            value={generatedNote}
            className="w-full h-48 p-3 text-sm bg-white rounded-lg border border-orange-100 text-gray-700 focus:ring-2 focus:ring-orange-200 resize-none font-mono leading-relaxed"
          />
          <p className="text-xs text-orange-400 mt-2 text-center">生成内容由AI提供，发送前请核对数量</p>
        </div>
      )}
    </div>
  );
};