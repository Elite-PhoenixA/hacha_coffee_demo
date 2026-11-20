export type CategoryType = 'all' | 'signature' | 'coffee' | 'tea' | 'cold-brew' | 'pastry';

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  subname: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'signature' | 'coffee' | 'tea' | 'cold-brew' | 'pastry';
  image: string;
  badge?: 'Bestseller' | 'Mới' | 'Signature' | 'Mùa Lễ Hội' | 'Thuần Khiết';
  tags: string[];
  rating: number;
  reviewsCount: number;
  temperatureOptions: ('hot' | 'iced')[];
  sugarOptions: string[];
  iceOptions: string[];
  sizeOptions: { size: 'M' | 'L'; extraPrice: number }[];
  toppings: Topping[];
  inStock: boolean;
  calories?: number;
}

export interface CartItem {
  cartId: string;
  menuItemId: string;
  item: MenuItem;
  quantity: number;
  selectedTemp: 'hot' | 'iced';
  selectedSugar: string;
  selectedIce: string;
  selectedSize: 'M' | 'L';
  selectedToppings: Topping[];
  specialNote: string;
  itemTotalPrice: number;
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accentColor: string;
  badge: string;
  flavorNotes: string[];
  featuredProductIds: string[];
}

export interface CoffeeEvent {
  id: string;
  title: string;
  dateText: string;
  timeText: string;
  status: 'ongoing' | 'upcoming' | 'weekend';
  statusLabel: string;
  location: string;
  host: string;
  description: string;
  feeText: string;
  spotsLeft: number;
  totalSpots: number;
  image: string;
  highlights: string[];
}

export interface ReservationFormData {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guestCount: number;
  seatingArea: 'indoor' | 'terrace' | 'quiet-work' | 'window';
  notes?: string;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  tableNumber?: string;
  deliveryAddress?: string;
  paymentMethod: 'cash' | 'transfer' | 'momo';
  notes?: string;
  couponCode?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  favoriteItem: string;
  date: string;
}
