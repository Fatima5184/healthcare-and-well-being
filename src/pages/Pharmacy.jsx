import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Plus, Minus, X, Package, ShieldCheck, Zap, MapPin, CreditCard, Banknote, Edit3, CheckCircle } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { medicines } from '../data/medicines';
import { translations } from '../data/translations';

const Pharmacy = () => {
  const { state, dispatch } = useHealth();
  const t = translations[state.language || 'en'];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const [address, setAddress] = useState('John Doe, 123 Healthcare Heights, New Delhi, India - 110001');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);
  const [orderStatus, setOrderStatus] = useState('idle'); // idle | success

  const categoryMap = {
    'All': t.catAll,
    'Pain & Fever': t.catPainFever,
    'Gastro': t.catGastro,
    'Diabetes': t.catDiabetes,
    'Cardiac': t.catCardiac,
    'Wellness': t.catWellness,
    'Antibiotics': t.catAntibiotics,
    'Allergy': t.catAllergy,
    'Cough': t.catCough,
    'First Aid': t.catFirstAid,
    'Baby Care': t.catBabyCare
  };

  const handleAddToCart = (med) => {
    dispatch({ type: 'ADD_TO_CART', payload: med });
    setAddedItems(prev => ({ ...prev, [med.id]: true }));
    setIsCartOpen(true); // Automatically open cart
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [med.id]: false }));
    }, 1500);
  };

  const categories = ['All', ...new Set(medicines.map(m => m.category))];

  const filteredMedicines = medicines.filter(m => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(searchLower) || 
                         m.description.toLowerCase().includes(searchLower) ||
                         m.category.toLowerCase().includes(searchLower);
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="pharmacy-page pt-24 min-height-screen">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t.pharmacyTitle.split(' ')[0]} <span className="gradient-text">{t.pharmacyTitle.split(' ')[1]}</span></h1>
            <p className="text-muted">{t.pharmacySubtitle}</p>
          </div>
          <button 
            className="btn btn-outline relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {t.cart}
            {state.cart.length > 0 && (
              <span className="cart-badge">{state.cart.length}</span>
            )}
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {categoryMap[cat] || cat}
            </button>
          ))}
        </div>

        {/* Search & Features */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="search-bar flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder={t.searchMedicines}
              className="pharmacy-input pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="feature-pill glass">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>{t.deliveryTime}</span>
            </div>
            <div className="feature-pill glass">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{t.genuineProducts}</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-3">
          {filteredMedicines.map((med) => (
            <motion.div 
              key={med.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="medicine-card glass"
            >
              <div className="med-image">
                <img src={med.image} alt={med.name} />
                <div className="med-badges">
                  <span className="med-category">{categoryMap[med.category] || med.category}</span>
                  {med.requiresPrescription && (
                    <span className="med-badge-rx">{t.rxRequired}</span>
                  )}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{med.name}</h3>
                <p className="text-muted text-sm mb-6 line-clamp-2">{med.description}</p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-2xl font-bold text-primary">₹{med.price}</span>
                  <button 
                    className={`btn btn-sm px-6 ${addedItems[med.id] ? 'btn-success' : 'btn-primary'}`}
                    onClick={() => handleAddToCart(med)}
                  >
                    {addedItems[med.id] ? (
                      <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> {t.added}</span>
                    ) : (
                      <span className="flex items-center gap-1"><Plus className="w-4 h-4" /> {t.add}</span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cart-overlay"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="cart-drawer glass"
            >
              <div className="p-6 flex justify-between items-center border-b border-border">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)}><X /></button>
              </div>
              
              <div className="cart-items p-6 flex-grow overflow-y-auto">
                {state.cart.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-muted mx-auto mb-4" />
                    <p className="text-muted">{t.cartEmpty}</p>
                  </div>
                ) : (
                  state.cart.map(item => (
                    <div key={item.id} className="cart-item mb-6">
                      <img src={item.image} alt={item.name} />
                      <div className="flex-grow">
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-primary font-bold">₹{item.price}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="p-1 hover:text-primary"><Minus className="w-4 h-4" /></button>
                          <span>{item.quantity}</span>
                          <button 
                            className="p-1 hover:text-primary"
                            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
                          ><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <button 
                        className="text-muted hover:text-red-500"
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 border-t border-border bg-glass">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted">{t.total}</span>
                  <span className="text-3xl font-bold text-primary">₹{cartTotal}</span>
                </div>
                <button 
                  className="btn btn-primary w-full justify-center text-lg py-4"
                  onClick={() => {
                    setIsCartOpen(false);
                    setShowCheckout(true);
                  }}
                >
                  {t.proceedToBuy}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="checkout-overlay"
              onClick={() => setShowCheckout(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="checkout-modal glass"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">Secure <span className="gradient-text">Checkout</span></h2>
                  <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
                </div>
                  {orderStatus === 'success' ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                      </div>
                      <h2 className="text-3xl font-bold mb-2">{t.orderConfirmed}</h2>
                      <p className="text-muted mb-8">{t.orderSuccess}</p>
                      
                      <div className="bg-white/5 rounded-3xl p-6 mb-8 text-left border border-white/10">
                        <div className="mb-4">
                          <p className="text-xs text-muted uppercase tracking-widest mb-1">{t.deliveryTo}</p>
                          <p className="text-sm font-medium">{address}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted uppercase tracking-widest mb-1">{t.paidVia}</p>
                          <p className="text-sm font-medium">
                            {paymentMethod === 'upi' ? t.upiPay : paymentMethod === 'card' ? t.cardPay : t.cod}
                          </p>
                        </div>
                      </div>

                      <button 
                        className="btn btn-primary w-full justify-center py-4"
                        onClick={() => {
                          setShowCheckout(false);
                          setOrderStatus('idle');
                        }}
                      >
                        {t.trackOrder}
                      </button>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      {/* Delivery Address */}
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3 text-primary font-bold">
                            <MapPin className="w-5 h-5" /> {t.deliveryAddress}
                          </div>
                          {!isEditingAddress && (
                            <button 
                              onClick={() => setIsEditingAddress(true)}
                              className="text-xs text-primary flex items-center gap-1 hover:underline"
                            >
                              <Edit3 className="w-3 h-3" /> {t.editAddress}
                            </button>
                          )}
                        </div>
                        
                        {isEditingAddress ? (
                          <div className="space-y-3">
                            <textarea 
                              className="pharmacy-input h-24 p-3 text-sm"
                              value={tempAddress}
                              onChange={(e) => setTempAddress(e.target.value)}
                            />
                            <div className="flex gap-2">
                              <button 
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  setAddress(tempAddress);
                                  setIsEditingAddress(false);
                                }}
                              >
                                {t.saveAddress}
                              </button>
                              <button 
                                className="btn btn-outline btn-sm"
                                onClick={() => {
                                  setTempAddress(address);
                                  setIsEditingAddress(false);
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm">{address}</p>
                        )}
                      </div>

                      {/* Order Summary */}
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h4 className="font-bold mb-4">{t.orderSummary}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted">{t.subtotal}</span>
                            <span>₹{cartTotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted">{t.deliveryCharge}</span>
                            <span className="text-green-500">{t.free}</span>
                          </div>
                          <div className="pt-4 border-t border-white/10 flex justify-between font-bold text-lg">
                            <span>{t.grandTotal}</span>
                            <span className="text-primary">₹{cartTotal}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h4 className="font-bold mb-4">{t.paymentMethod}</h4>
                        <div className="space-y-3">
                          <div 
                            className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${paymentMethod === 'upi' ? 'bg-primary/10 border-primary/40' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            onClick={() => setPaymentMethod('upi')}
                          >
                            <Zap className={`w-6 h-6 ${paymentMethod === 'upi' ? 'text-primary' : 'text-muted'}`} />
                            <div>
                              <p className="font-bold">{t.upiPay}</p>
                              <p className="text-xs text-muted">{t.upiApps}</p>
                            </div>
                          </div>

                          <div 
                            className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${paymentMethod === 'card' ? 'bg-primary/10 border-primary/40' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            onClick={() => setPaymentMethod('card')}
                          >
                            <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-primary' : 'text-muted'}`} />
                            <div>
                              <p className="font-bold">{t.cardPay}</p>
                              <p className="text-xs text-muted">{t.cardDesc}</p>
                            </div>
                          </div>

                          <div 
                            className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${paymentMethod === 'cod' ? 'bg-primary/10 border-primary/40' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            onClick={() => setPaymentMethod('cod')}
                          >
                            <Banknote className={`w-6 h-6 ${paymentMethod === 'cod' ? 'text-primary' : 'text-muted'}`} />
                            <div>
                              <p className="font-bold">{t.cod}</p>
                              <p className="text-xs text-muted">{t.codDesc}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        className="btn btn-primary w-full justify-center py-4 text-lg font-bold shadow-xl shadow-primary/20"
                        onClick={() => {
                          setOrderStatus('success');
                          dispatch({ type: 'CLEAR_CART' });
                        }}
                      >
                        {t.placeOrder}
                      </button>
                    </div>
                  )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .pharmacy-page { background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.05), transparent); }
        .pharmacy-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 1.5rem;
          color: var(--text);
          font-family: inherit;
          outline: none;
        }
        .category-tab {
          padding: 0.6rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 999px;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          color: var(--text-muted);
        }
        .category-tab.active {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .feature-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .medicine-card {
          border-radius: 1.5rem;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .medicine-card:hover { 
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -20px var(--primary);
        }
        .med-image { height: 200px; position: relative; }
        .med-image img { width: 100%; height: 100%; object-fit: cover; }
        .med-badges {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-end;
        }
        .med-category {
          padding: 0.25rem 0.75rem;
          background: var(--primary);
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .med-badge-rx {
          padding: 0.25rem 0.75rem;
          background: #ef4444;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
        }
        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          font-size: 0.75rem;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 100;
        }
        .checkout-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          z-index: 200;
        }
        .checkout-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 95%;
          max-width: 550px;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--bg);
          z-index: 201;
          border-radius: 2.5rem;
          border: 1px solid var(--border);
        }
        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 450px;
          background: var(--bg);
          z-index: 101;
          display: flex;
          flex-direction: column;
        }
        .cart-item {
          display: flex;
          gap: 1.5rem;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1.25rem;
          border: 1px solid var(--border);
          align-items: center;
          transition: all 0.3s ease;
        }
        .cart-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--primary);
        }
        .cart-item img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 1rem;
          flex-shrink: 0;
        }
        .btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
        .btn-success {
          background: #22c55e;
          color: white;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Pharmacy;
