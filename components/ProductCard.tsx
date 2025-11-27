import React from 'react';
import { Product } from '../types';
import { QuantityControl } from './QuantityControl';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  quantity, 
  onUpdateQuantity,
  isAdmin = false,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-red-50 p-3 flex flex-col justify-between h-full hover:shadow-md transition-shadow relative group">
      {isAdmin && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(`确定要删除 "${product.name}" 吗?`)) {
              onDelete(product.id);
            }
          }}
          className="absolute -top-2 -right-2 z-10 bg-red-100 text-red-600 rounded-full p-1.5 shadow-sm hover:bg-red-200 transition-colors"
          title="删除商品"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}

      <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-3 bg-red-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Fallback if image fails
            (e.target as HTMLImageElement).src = `https://placehold.co/400x400/ea580c/white?text=${encodeURIComponent(product.name.slice(0,4))}`;
          }}
        />
        {quantity > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            x{quantity}
          </div>
        )}
        {product.flavor && (
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded">
            {product.flavor}
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
        
        <div className="flex flex-wrap gap-1 mb-2">
           {product.spec && (
             <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600 border border-gray-200">
               {product.spec}
             </span>
           )}
           {product.subUnit && (
             <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-orange-50 text-orange-700 border border-orange-100">
               {product.subUnit}
             </span>
           )}
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-red-600 font-bold text-lg">¥{product.price}<span className="text-xs text-gray-400 font-normal">/{product.unit}</span></span>
          
          {quantity === 0 ? (
            <button 
              onClick={() => onUpdateQuantity(product.id, 1)}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
            >
              选购
            </button>
          ) : (
            <QuantityControl 
              quantity={quantity}
              onIncrease={() => onUpdateQuantity(product.id, 1)}
              onDecrease={() => onUpdateQuantity(product.id, -1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};