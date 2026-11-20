'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, Topping } from '@/types';
import { apiMock } from '@/services/apiMock';
import { useToast } from './ToastContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    item: MenuItem,
    options?: {
      quantity?: number;
      selectedTemp?: 'hot' | 'iced';
      selectedSugar?: string;
      selectedIce?: string;
      selectedSize?: 'M' | 'L';
      selectedToppings?: Topping[];
      specialNote?: string;
    }
  ) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTableReservationOpen: boolean;
  setIsTableReservationOpen: (open: boolean) => void;
  activeCustomizeItem: MenuItem | null;
  openCustomizeModal: (item: MenuItem) => void;
  closeCustomizeModal: () => void;
  coupon: { code: string; percent: number } | null;
  applyCouponCode: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTableReservationOpen, setIsTableReservationOpen] = useState(false);
  const [activeCustomizeItem, setActiveCustomizeItem] = useState<MenuItem | null>(null);
  const [coupon, setCoupon] = useState<{ code: string; percent: number } | null>(null);

  const { showToast } = useToast();

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hacha_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('hacha_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  const addToCart = (
    item: MenuItem,
    options?: {
      quantity?: number;
      selectedTemp?: 'hot' | 'iced';
      selectedSugar?: string;
      selectedIce?: string;
      selectedSize?: 'M' | 'L';
      selectedToppings?: Topping[];
      specialNote?: string;
    }
  ) => {
    const qty = options?.quantity || 1;
    const temp = options?.selectedTemp || item.temperatureOptions[0] || 'iced';
    const sugar = options?.selectedSugar || item.sugarOptions[0] || '100%';
    const ice = options?.selectedIce || item.iceOptions[0] || 'Đá vừa';
    const size = options?.selectedSize || 'M';
    const toppings = options?.selectedToppings || [];
    const note = options?.specialNote || '';

    // Calculate item total price
    const sizeExtra = item.sizeOptions.find((s) => s.size === size)?.extraPrice || 0;
    const toppingsExtra = toppings.reduce((sum, t) => sum + t.price, 0);
    const unitPrice = item.price + sizeExtra + toppingsExtra;
    const totalPrice = unitPrice * qty;

    // Check if an identical customized item exists
    const existingIndex = cartItems.findIndex((ci) => {
      const sameItem = ci.menuItemId === item.id;
      const sameTemp = ci.selectedTemp === temp;
      const sameSugar = ci.selectedSugar === sugar;
      const sameIce = ci.selectedIce === ice;
      const sameSize = ci.selectedSize === size;
      const sameNote = ci.specialNote === note;
      const sameToppings =
        ci.selectedToppings.length === toppings.length &&
        ci.selectedToppings.every((t) => toppings.some((ot) => ot.id === t.id));

      return sameItem && sameTemp && sameSugar && sameIce && sameSize && sameNote && sameToppings;
    });

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const newQty = updated[existingIndex].quantity + qty;
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: newQty,
        itemTotalPrice: unitPrice * newQty,
      };
      setCartItems(updated);
    } else {
      const newCartItem: CartItem = {
        cartId: 'cart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        menuItemId: item.id,
        item,
        quantity: qty,
        selectedTemp: temp,
        selectedSugar: sugar,
        selectedIce: ice,
        selectedSize: size,
        selectedToppings: toppings,
        specialNote: note,
        itemTotalPrice: totalPrice,
      };
      setCartItems((prev) => [newCartItem, ...prev]);
    }

    showToast(`Đã thêm "${item.name}" vào giỏ hàng`, 'success');
  };

  const removeFromCart = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('Đã xóa món khỏi giỏ hàng', 'info');
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => {
        if (it.cartId !== cartId) return it;
        const sizeExtra = it.item.sizeOptions.find((s) => s.size === it.selectedSize)?.extraPrice || 0;
        const toppingsExtra = it.selectedToppings.reduce((sum, t) => sum + t.price, 0);
        const unitPrice = it.item.price + sizeExtra + toppingsExtra;
        return {
          ...it,
          quantity,
          itemTotalPrice: unitPrice * quantity,
        };
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const openCustomizeModal = (item: MenuItem) => {
    setActiveCustomizeItem(item);
  };

  const closeCustomizeModal = () => {
    setActiveCustomizeItem(null);
  };

  const applyCouponCode = async (code: string): Promise<boolean> => {
    const res = await apiMock.validateCoupon(code);
    if (res.success && res.data) {
      setCoupon({ code: res.data.code, percent: res.data.discountPercent });
      showToast(res.message, 'success');
      return true;
    } else {
      showToast(res.message, 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Đã hủy áp dụng mã ưu đãi', 'info');
  };

  const totalItems = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = cartItems.reduce((acc, it) => acc + it.itemTotalPrice, 0);
  const discountAmount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountAmount,
        finalTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTableReservationOpen,
        setIsTableReservationOpen,
        activeCustomizeItem,
        openCustomizeModal,
        closeCustomizeModal,
        coupon,
        applyCouponCode,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
