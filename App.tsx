import React, { useState, useMemo } from 'react';
import { CATEGORIES, INITIAL_PRODUCTS } from './constants';
import { Product, CartItem, TabView } from './types';
import { ProductCard } from './components/ProductCard';
import { OrderSummary } from './components/OrderSummary';
import { AdminProductForm } from './components/AdminProductForm';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabView>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [cart, setCart] = useState<Map<string, number>>(new Map());
  
  // App State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Derived state
  const cartItems: CartItem[] = useMemo(() => {
    const items: CartItem[] = [];
    cart.forEach((quantity, productId) => {
      const product = products.find(p => p.id === productId);
      if (product && quantity > 0) {
        items.push({ ...product, quantity });
      }
    });
    return items;
  }, [cart, products]);

  const totalQuantity = useMemo(() => {
    let sum = 0;
    cart.forEach(q => sum += q);
    return sum;
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum: number, item) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category Filter
    if (selectedCategory !== '全部') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Search Filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.flavor?.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, products]);

  // Handlers
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      const newCart = new Map<string, number>(prev);
      const currentQty = newCart.get(productId) || 0;
      const newQty = Math.max(0, currentQty + delta);
      
      if (newQty === 0) {
        newCart.delete(productId);
      } else {
        newCart.set(productId, newQty);
      }
      return newCart;
    });
  };

  const handleClearCart = () => {
    if (window.confirm("确定要清空购物车吗？")) {
      setCart(new Map());
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setShowAddModal(false);
    // Optionally jump to that category or show all
    if (selectedCategory !== '全部' && newProduct.category !== selectedCategory) {
      setSelectedCategory('全部');
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    // Also remove from cart if present
    setCart(prev => {
      const newCart = new Map(prev);
      newCart.delete(id);
      return newCart;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 shadow-sm px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            EasyOrder
          </h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`p-1.5 rounded-full transition-colors ${isAdminMode ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:bg-gray-100'}`}
              title="管理员模式"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="text-xs text-orange-600 font-bold bg-orange-50 border border-orange-100 px-2 py-1 rounded-md">
              大旺食品报货助手
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="搜索商品名称、口味..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-sm rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-red-200 transition-all"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar relative">
        {activeTab === 'catalog' && (
          <div className="pb-32">
            {/* Category Filter */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 px-4 py-3 border-b border-gray-100 overflow-x-auto whitespace-nowrap hide-scrollbar shadow-sm">
              <div className="flex space-x-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                      selectedCategory === cat 
                        ? 'bg-red-600 text-white shadow-md ring-2 ring-red-100' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="p-4 grid grid-cols-2 gap-3">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  quantity={cart.get(product.id) || 0}
                  onUpdateQuantity={handleUpdateQuantity}
                  isAdmin={isAdminMode}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
            
            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p>未找到相关商品</p>
                {isAdminMode && (
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 text-red-600 font-bold text-sm hover:underline"
                  >
                    + 添加新商品
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <OrderSummary 
            cart={cartItems} 
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
          />
        )}
        
        {/* Admin Floating Action Button for Add Product */}
        {isAdminMode && activeTab === 'catalog' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-24 right-4 z-20 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-all"
            title="添加商品"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </main>

      {/* Floating Summary Bar (Sticky Footer) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
        <div className="flex flex-col">
          {/* Quick Stats Bar */}
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">合计 (共 {totalQuantity} 件)</span>
              <span className="text-2xl font-bold text-red-600 leading-none mt-1">¥ {totalPrice.toFixed(0)}<span className="text-sm">.00</span></span>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setActiveTab('catalog')}
                className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-colors ${
                  activeTab === 'catalog' 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="text-[10px] font-bold mt-0.5">产品目录</span>
              </button>

              <button 
                onClick={() => setActiveTab('cart')}
                className={`relative flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-colors ${
                  activeTab === 'cart' 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm ring-1 ring-white">
                      {totalQuantity > 99 ? '99+' : totalQuantity}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold mt-0.5">核算表单</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Bottom Safe Area Spacer */}
          <div className="h-safe-bottom w-full bg-white"></div>
        </div>
      </div>

      {/* Admin Add Product Modal */}
      {showAddModal && (
        <AdminProductForm 
          onAddProduct={handleAddProduct} 
          onCancel={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}