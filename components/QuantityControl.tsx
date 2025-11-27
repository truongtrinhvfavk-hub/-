import React from 'react';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({ 
  quantity, 
  onIncrease, 
  onDecrease,
  min = 0
}) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-1.5 py-0.5 border border-gray-200">
      <button 
        onClick={onDecrease}
        className={`w-6 h-6 flex items-center justify-center rounded-full font-bold text-sm ${quantity <= min ? 'text-gray-300 cursor-not-allowed' : 'text-red-600 bg-white shadow-sm active:scale-90 transition-transform'}`}
        disabled={quantity <= min}
      >
        -
      </button>
      <span className="w-6 text-center text-sm font-bold text-gray-800">{quantity}</span>
      <button 
        onClick={onIncrease}
        className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white font-bold text-sm shadow-sm active:scale-90 transition-transform hover:bg-red-700"
      >
        +
      </button>
    </div>
  );
};