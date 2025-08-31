"use client"
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Clock, MapPin, User, MessageCircle, AlertTriangle } from 'lucide-react';

// Type Definitions
interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  healthScore: number;
  calories: number;
}

interface CartItem extends MenuItem {
  id: number; // Unique cart item ID
}

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  category: string;
}

interface UserProfile {
  name: string;
  healthKarma: number;
  recentOrders: string[];
  interventionStatus: string;
}

interface SwappedOrder {
  name: string;
  price: number;
  image: string;
  calories: number;
  originalName?: string;
}

interface MenuItems {
  [key: number]: MenuItem[];
}

// Header Component
interface HeaderProps {
  cartItems: number;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ cartItems }) => {
  return (
    <header className="bg-red-600  text-white p-4 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">foodhut.</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">South Gate</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="bg-white text-red-600 px-2 py-1 rounded-full text-sm font-bold">
              {cartItems}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

// Welcome Bar Component
interface WelcomeBarProps {
  userName: string;
}

const WelcomeBar: React.FC<WelcomeBarProps> = ({ userName }) => {
  return (
    <div className="bg-red-500 text-white p-2">
      <div className="max-w-4xl mx-auto text-sm">
        <span>Welcome back, {userName}! 🍕</span>
      </div>
    </div>
  );
};

// Restaurant Card Component
interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(restaurant)}
      className="bg-white text-black rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer p-4"
    >
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{restaurant.image}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{restaurant.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              {restaurant.rating}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {restaurant.deliveryTime}
            </span>
            <span>${restaurant.deliveryFee} delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Restaurant List Component
interface RestaurantListProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onSelectRestaurant }) => {
  return (
    <div>
      <h2 className="text-2xl text-black font-bold mb-6">Choose a restaurant</h2>
      <div className="grid gap-4">
        {restaurants.map(restaurant => (
          <RestaurantCard 
            key={restaurant.id} 
            restaurant={restaurant} 
            onSelect={onSelectRestaurant}
          />
        ))}
      </div>
    </div>
  );
};

// Menu Item Component
interface MenuItemProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white text-black rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-3xl">{item.image}</div>
          <div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-gray-600">{item.calories} calories</p>
            <p className="font-bold text-xl text-red-600">${item.price}</p>
          </div>
        </div>
        <button 
          onClick={() => onAddToCart(item)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold"
        >
          Add
        </button>
      </div>
    </div>
  );
};

// Cart Component
interface CartProps {
  cart: CartItem[];
  restaurant: Restaurant;
  onRemoveItem: (itemId: number) => void;
  onPlaceOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, restaurant, onRemoveItem, onPlaceOrder }) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white text-black rounded-lg shadow-sm border p-4 sticky top-24">
      <h3 className="font-bold text-lg mb-4">Your Order</h3>
      
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{item.image}</span>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">${item.price}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery:</span>
              <span>${restaurant.deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${(totalPrice + restaurant.deliveryFee).toFixed(2)}</span>
            </div>
            
            <button 
              onClick={onPlaceOrder}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold mt-4 hover:bg-red-700"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Menu View Component
interface MenuViewProps {
  restaurant: Restaurant;
  menuItems: MenuItems;
  cart: CartItem[];
  onBack: () => void;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: number) => void;
  onPlaceOrder: () => void;
}

const MenuView: React.FC<MenuViewProps> = ({ 
  restaurant, 
  menuItems, 
  cart, 
  onBack, 
  onAddToCart, 
  onRemoveFromCart, 
  onPlaceOrder 
}) => {
  return (
    <div className="grid text-black grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="text-red-600 mr-4 hover:underline"
          >
            ← Back
          </button>
          <div>
            <h2 className="text-2xl font-bold">{restaurant.name}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                {restaurant.rating}
              </span>
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {menuItems[restaurant.id]?.map(item => (
            <MenuItemComponent 
              key={item.id} 
              item={item} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <Cart 
          cart={cart}
          restaurant={restaurant}
          onRemoveItem={onRemoveFromCart}
          onPlaceOrder={onPlaceOrder}
        />
      </div>
    </div>
  );
};

// Delivery Tracking Component
const DeliveryTracking: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="animate-pulse">
        <div className="w-24 text-black h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Preparing your order...</h2>
        <p className="text-gray-600">Estimated delivery: 25-35 minutes</p>
        <p className="text-sm text-gray-500 mt-2">Our chefs are working hard on your order!</p>
      </div>
    </div>
  );
};

// Swap Partner Card Component
interface SwapPartnerCardProps {
  partner: UserProfile;
  showDetails: boolean;
  onToggleDetails: () => void;
}

const SwapPartnerCard: React.FC<SwapPartnerCardProps> = ({ partner, showDetails, onToggleDetails }) => {
  return (
    <div className="bg-gray-50 text-black rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Your Swap Partner:</h4>
        <button 
          onClick={onToggleDetails}
          className="text-red-600 text-sm hover:underline"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-green-700" />
        </div>
        <div>
          <p className="font-medium">{partner.name}</p>
          <p className="text-sm text-gray-600">Status: {partner.interventionStatus}</p>
        </div>
        <button className="ml-auto bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
          <MessageCircle className="w-4 h-4 inline mr-1" />
          Message
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">{partner.name}&apos;s recent orders:</p>
          <div className="flex flex-wrap gap-1">
            {partner.recentOrders.map((order, idx) => (
              <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                {order}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            &quot;{partner.interventionStatus === 'NEEDS TO LIVE A LITTLE' ? 
              'This guy was one salad away from becoming a plant. We saved him.' :
              'This person clearly needed our help.'}&quot;
          </p>
        </div>
      )}
    </div>
  );
};

// The Big Reveal Component
interface SwapRevealProps {
  actualOrder: SwappedOrder[];
  originalCart: CartItem[];
  userProfile: UserProfile;
  swapPartner: UserProfile;
  onReset: () => void;
}

const SwapReveal: React.FC<SwapRevealProps> = ({ 
  actualOrder, 
  originalCart, 
  userProfile, 
  swapPartner, 
  onReset 
}) => {
  const [showSwapDetails, setShowSwapDetails] = useState<boolean>(false);
  const [showMessaging, setShowMessaging] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [battleMode, setBattleMode] = useState<boolean>(false);
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const [acceptFateMode, setAcceptFateMode] = useState<boolean>(false);
  const [pushupCount, setPushupCount] = useState<number>(0);

  return (
    <div>
      {/* SHOCK FACTOR - Health Intervention Alert */}
      <div className="bg-yellow-50  border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
          <div>
            <h3 className="font-bold text-yellow-800">HEALTH INTERVENTION ACTIVATED</h3>
            <p className="text-yellow-700 text-sm">Your order has been modified for your wellbeing</p>
          </div>
        </div>
      </div>

      {/* What they actually received */}
      <div className="bg-white text-black border rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">What You Actually Received:</h3>
        {actualOrder?.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-3 mb-3 last:border-b-0">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{item.image}</span>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.calories} cal</p>
              </div>
            </div>
            <span className="font-bold">${item.price}</span>
          </div>
        ))}
      </div>

      {/* The Passive-Aggressive Note */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <h4 className="font-bold text-red-800 mb-3">📝 Intervention Note:</h4>
        <p className="text-red-700 leading-relaxed">
          &quot;Hi {userProfile.name}, this is your <strong>5th unhealthy order this week</strong>. 
          Your health karma score is <span className="font-bold">{userProfile.healthKarma}</span> (yikes!). 
          <br/><br/>
          We&apos;ve given you {swapPartner.name}&apos;s order instead. {swapPartner.name} has been eating nothing 
          but salads and crying into his quinoa bowls. He has your {originalCart[0]?.name} now and is probably 
          experiencing pure joy for the first time in months.
          <br/><br/>
          You&apos;re welcome. 💚&quot;
        </p>
      </div>

      {/* Swap Partner Info */}
      <SwapPartnerCard 
        partner={swapPartner}
        showDetails={showSwapDetails}
        onToggleDetails={() => setShowSwapDetails(!showSwapDetails)}
      />

      {/* Message Partner Modal */}
      {showMessaging && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="font-bold text-lg mb-4">Message {swapPartner.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              Send a message to the person who has your {originalCart[0]?.name}. 
              Keep it civil... or don&apos;t. 🤷‍♀️
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="PLEASE I'M ON A FIRST DATE, I CAN'T SHOW UP WITH YOUR PROTEIN BOWL"
              className="w-full border rounded p-3 h-24 text-sm"
              maxLength={200}
            />
            <div className="text-xs text-gray-500 mb-4">{message.length}/200 characters</div>
            <div className="flex space-x-3">
              <button 
                onClick={() => {
                  alert(`Message sent to ${swapPartner.name}: "${message}"\n\nThey replied: "lol no"`);
                  setShowMessaging(false);
                  setMessage("");
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Send Message
              </button>
              <button 
                onClick={() => {
                  setShowMessaging(false);
                  setMessage("");
                }}
                className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accept Fate Mode */}
      {acceptFateMode && (
        <div className="bg-yellow-50 text-black border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-yellow-800 mb-3">🏃‍♀️ Accepting Your Fate</h4>
          <p className="text-sm text-yellow-700 mb-4">
            Do 20 pushups to prove you&apos;re committed to this healthy lifestyle change. 
            Click the button for each pushup!
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-yellow-800">Pushups: {pushupCount}/20</span>
            <button
              onClick={() => setPushupCount(Math.min(20, pushupCount + 1))}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              disabled={pushupCount >= 20}
            >
              {pushupCount >= 20 ? "Complete! 💪" : "Push! 💪"}
            </button>
          </div>
          {pushupCount >= 20 && (
            <div className="bg-green-100 border border-green-200 rounded p-3">
              <p className="text-green-800 font-semibold">
                Congratulations! You&apos;ve accepted your fate. Your health karma has improved by +5 points. 
                Maybe next time you&apos;ll think twice before ordering that 5th pizza this week! 🌱
              </p>
            </div>
          )}
        </div>
      )}

      {/* Food Custody Battle */}
      {battleMode && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-red-800 mb-3">⚔️ FOOD CUSTODY BATTLE</h4>
          <p className="text-sm text-red-700 mb-4">
            You and {swapPartner.name} will compete in a series of challenges to determine who gets the original order!
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => {
                const userScore = Math.random();
                const partnerScore = Math.random();
                const won = userScore > partnerScore;
                alert(won ? 
                  `🎉 Victory! You scored ${(userScore * 100).toFixed(0)} vs ${swapPartner.name}'s ${(partnerScore * 100).toFixed(0)}. Your original order is being re-prepared! (Just kidding, you still get the salad)` :
                  `💀 Defeat! You scored ${(userScore * 100).toFixed(0)} vs ${swapPartner.name}'s ${(partnerScore * 100).toFixed(0)}. ${swapPartner.name} keeps your pizza AND gets a second helping of healthy food!`
                );
              }}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              🎯 Challenge 1: Speed Eating Contest
            </button>
            <button 
              onClick={() => {
                alert(`🎲 Rock Paper Scissors Result: You threw Rock, ${swapPartner.name} threw Gun. That's... not how this game works. ${swapPartner.name} wins by default.`);
              }}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              ✂️ Challenge 2: Rock Paper Scissors
            </button>
            <button 
              onClick={() => {
                alert(`🧠 Trivia Question: "What vegetable is actually good for you?" You answered "Pizza sauce counts, right?" ${swapPartner.name} answered "Literally any vegetable." They win.`);
              }}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              🧠 Challenge 3: Nutrition Trivia
            </button>
          </div>
        </div>
      )}

      {/* Angry Review Mode */}
      {reviewMode && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-800 mb-3">😤 Leave Your Angry Review</h4>
          <div className="bg-white border rounded p-4 mb-4">
            <div className="flex items-center mb-2">
              <div className="text-yellow-400">★☆☆☆☆</div>
              <span className="ml-2 text-sm text-gray-600">1/5 stars</span>
            </div>
            <p className="text-sm italic text-gray-700">
              &quot;WORST FOOD DELIVERY APP EVER!!! Ordered pizza, got rabbit food instead! 
              Some guy named Mark has my pizza and is probably living his best life while I&apos;m here 
              staring at KALE. This app is run by food nazis who think they know better than me. 
              I DEMAND MY PIZZA BACK! Also why can I see Mark&apos;s order history?? This is weird. 
              1 star because I can&apos;t give 0 stars. Will never use again (until I get hungry in 2 hours).&quot;
            </p>
            <div className="mt-3 text-xs text-gray-500">
              Review Status: ✅ Posted • 👀 Viewed by 12 people • 😂 12 people found this hilarious
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-blue-700">
              <span className='font-bold'>Crave Response:</span> Thanks for your feedback! We&apos;ve forwarded your review to our 
              Wellness Department. They&apos;ve decided to increase your intervention level. Enjoy your vegetables! 💚
            </p>
          </div>
        </div>
      )}

      {/* Humiliating Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={() => {
            setAcceptFateMode(!acceptFateMode);
            setBattleMode(false);
            setReviewMode(false);
          }}
          className={`w-full py-3 rounded-lg font-semibold ${
            acceptFateMode 
              ? 'bg-yellow-600 text-white' 
              : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          🏃‍♀️ Accept Fate & Do 20 Pushups
        </button>
        
        <button 
          onClick={() => {
            setBattleMode(!battleMode);
            setAcceptFateMode(false);
            setReviewMode(false);
          }}
          className={`w-full py-3 rounded-lg font-semibold ${
            battleMode 
              ? 'bg-red-700 text-white' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          ⚔️ Challenge to Food Custody Battle
        </button>
        
        <button 
          onClick={() => {
            setReviewMode(!reviewMode);
            setAcceptFateMode(false);
            setBattleMode(false);
          }}
          className={`w-full py-3 rounded-lg ${
            reviewMode 
              ? 'bg-gray-400 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          😤 Leave Angry Review (Will Be Ignored)
        </button>
        
        <button 
          onClick={onReset}
          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
        >
          Order Again (Good Luck)
        </button>
      </div>
    </div>
  );
};

// Order Status Component
interface OrderStatusProps {
  actualOrder: SwappedOrder[];
  originalCart: CartItem[];
  userProfile: UserProfile;
  swapPartner: UserProfile;
  onReset: () => void;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ 
  actualOrder, 
  originalCart, 
  userProfile, 
  swapPartner, 
  onReset 
}) => {
  const [phase, setPhase] = useState<'tracking' | 'revealed'>('tracking');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('revealed');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Header cartItems={0} userName={userProfile.name} />
      <div className="max-w-2xl mx-auto p-4">
        {phase === 'tracking' ? (
          <DeliveryTracking />
        ) : (
          <SwapReveal 
            actualOrder={actualOrder}
            originalCart={originalCart}
            userProfile={userProfile}
            swapPartner={swapPartner}
            onReset={onReset}
          />
        )}
      </div>
    </div>
  );
};

// Main App Component
const CraveApp: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [actualOrder, setActualOrder] = useState<SwappedOrder[] | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // User profile (HIDDEN from UI)
  const userProfile: UserProfile = {
    name: "Dara Williams",
    healthKarma: -47, // SECRET - Very negative = needs intervention
    recentOrders: ["Pizza", "Burger", "Wings", "Pizza", "Nachos"],
    interventionStatus: "NEEDS INTERVENTION"
  };

  // Mock swap partner (also hidden)
  const swapPartner: UserProfile = {
    name: "Josh Daniels",
    healthKarma: 82, // SECRET
    recentOrders: ["Kale Salad", "Quinoa Bowl", "Green Smoothie", "Veggie Wrap", "Acai Bowl"],
    interventionStatus: "NEEDS TO LIVE A LITTLE"
  };

  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Tony's Pizza Palace",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      image: "🍕",
      category: "Italian"
    },
    {
      id: 2,
      name: "Burger Barn",
      rating: 4.5,
      deliveryTime: "20-30 min",
      deliveryFee: 1.99,
      image: "🍔",
      category: "American"
    },
    {
      id: 3,
      name: "Healthy Harvest",
      rating: 4.2,
      deliveryTime: "15-25 min",
      deliveryFee: 3.49,
      image: "🥗",
      category: "Healthy"
    }
  ];

  const menuItems: MenuItems = {
    1: [ // Tony's Pizza
      { id: 11, name: "Meat Lovers Supreme", price: 24.99, image: "🍕", healthScore: 1, calories: 520 },
      { id: 12, name: "Cheesy Garlic Breadsticks", price: 8.99, image: "🧄", healthScore: 2, calories: 340 },
      { id: 13, name: "Buffalo Wings (12pc)", price: 16.99, image: "🍗", healthScore: 1, calories: 680 }
    ],
    2: [ // Burger Barn  
      { id: 21, name: "Triple Bacon Cheeseburger", price: 18.99, image: "🍔", healthScore: 1, calories: 890 },
      { id: 22, name: "Loaded Chili Fries", price: 12.99, image: "🍟", healthScore: 1, calories: 620 },
      { id: 23, name: "Chocolate Milkshake", price: 6.99, image: "🥤", healthScore: 2, calories: 450 }
    ],
    3: [ // Healthy Harvest
      { id: 31, name: "Superfood Kale Salad", price: 14.99, image: "🥗", healthScore: 10, calories: 180 },
      { id: 32, name: "Quinoa Power Bowl", price: 16.99, image: "🍚", healthScore: 9, calories: 220 },
      { id: 33, name: "Green Goddess Smoothie", price: 8.99, image: "🥤", healthScore: 10, calories: 140 }
    ]
  };

  // THE SECRET SWAP ALGORITHM (hidden from user)
  const performSwap = (userOrder: CartItem[], userKarma: number): SwappedOrder[] => {
    if (userKarma < -20) { // Needs intervention
      const healthySwaps: SwappedOrder[] = [
        { name: "Sad Desk Salad", price: 12.99, image: "🥗", calories: 180, originalName: "Quinoa Power Bowl from Healthy Harvest" },
        { name: "Kale Smoothie of Shame", price: 8.99, image: "🥤", calories: 140, originalName: "Green Goddess Smoothie from Healthy Harvest" },
        { name: "Punishment Veggie Bowl", price: 14.99, image: "🥦", calories: 200, originalName: "Superfood Bowl from Healthy Harvest" }
      ];
      return healthySwaps.slice(0, userOrder.length);
    } else if (userKarma > 50) { // Needs to live a little
      const indulgentSwaps: SwappedOrder[] = [
        { name: "Surprise Pizza", price: 22.99, image: "🍕", calories: 520, originalName: "Meat Lovers from Tony's Pizza" },
        { name: "Mystery Burger", price: 16.99, image: "🍔", calories: 680, originalName: "Triple Bacon from Burger Barn" }
      ];
      return indulgentSwaps.slice(0, userOrder.length);
    }
    // No swap needed - convert CartItem to SwappedOrder
    return userOrder.map(item => ({
      name: item.name,
      price: item.price,
      image: item.image,
      calories: item.calories
    }));
  };

  const addToCart = (item: MenuItem): void => {
    setCart([...cart, { ...item, id: Date.now() + Math.random() }]);
  };

  const removeFromCart = (itemId: number): void => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const placeOrder = (): void => {
    const swappedOrder = performSwap(cart, userProfile.healthKarma);
    setActualOrder(swappedOrder);
    setOrderPlaced(true);
  };

  const resetApp = (): void => {
    setOrderPlaced(false);
    setCart([]);
    setActualOrder(null);
    setSelectedRestaurant(null);
  };

  // Show order status after placing order
  if (orderPlaced && actualOrder) {
    return (
      <OrderStatus 
        actualOrder={actualOrder}
        originalCart={cart}
        userProfile={userProfile}
        swapPartner={swapPartner}
        onReset={resetApp}
      />
    );
  }

  // Main app interface (COMPLETELY INNOCENT)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItems={cart.length} userName={userProfile.name} />
      <WelcomeBar userName={userProfile.name} />

      <div className="max-w-4xl mx-auto p-4">
        {!selectedRestaurant ? (
          <RestaurantList 
            restaurants={restaurants}
            onSelectRestaurant={setSelectedRestaurant}
          />
        ) : (
          <MenuView 
            restaurant={selectedRestaurant}
            menuItems={menuItems}
            cart={cart}
            onBack={() => setSelectedRestaurant(null)}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            onPlaceOrder={placeOrder}
          />
        )}
      </div>
    </div>
  );
};

export default CraveApp;