import { useState } from 'react'

type Product = {
  id: string
  name: string
  category: 'protein' | 'supplements' | 'equipment' | 'clothing' | 'accessories'
  price: number
  originalPrice?: number
  discount?: number
  image: string
  description: string
  rating: number
  reviews: number
  inStock: boolean
  brand: string
}

// Helper function to get appropriate image based on category
const getProductImage = (category: string, productName: string): string => {
  const proteinImages = [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop'
  ]
  
  const dumbbellImages = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
  ]
  
  const supplementImages = [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
  ]
  
  const clothingImages = [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
  ]
  
  const accessoryImages = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
  ]
  
  // Use product name to determine if it's protein-related
  const isProteinProduct = productName.toLowerCase().includes('protein') || 
                          productName.toLowerCase().includes('whey') || 
                          productName.toLowerCase().includes('casein') ||
                          productName.toLowerCase().includes('mass') ||
                          productName.toLowerCase().includes('gainer')
  
  // Use product name to determine if it's dumbbell/weight related
  const isDumbbellProduct = productName.toLowerCase().includes('dumbbell') || 
                           productName.toLowerCase().includes('barbell') || 
                           productName.toLowerCase().includes('weight') ||
                           productName.toLowerCase().includes('rack') ||
                           productName.toLowerCase().includes('curl bar')
  
  switch (category) {
    case 'protein':
      return proteinImages[Math.floor(Math.random() * proteinImages.length)]
    case 'equipment':
      if (isDumbbellProduct) {
        return dumbbellImages[Math.floor(Math.random() * dumbbellImages.length)]
      }
      return dumbbellImages[Math.floor(Math.random() * dumbbellImages.length)]
    case 'supplements':
      return supplementImages[Math.floor(Math.random() * supplementImages.length)]
    case 'clothing':
      return clothingImages[Math.floor(Math.random() * clothingImages.length)]
    case 'accessories':
      return accessoryImages[Math.floor(Math.random() * accessoryImages.length)]
    default:
      return proteinImages[0]
  }
}

const products: Product[] = [
  // Protein Powders
  {
    id: '1',
    name: 'Optimum Nutrition Gold Standard Whey Protein',
    category: 'protein',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    image: getProductImage('protein', 'Optimum Nutrition Gold Standard Whey Protein'),
    description: '24g protein per serving, 5.5g BCAAs, 4g glutamine & glutamic acid',
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    brand: 'Optimum Nutrition'
  },
  {
    id: '2',
    name: 'MyProtein Impact Whey Isolate',
    category: 'protein',
    price: 2799,
    originalPrice: 3599,
    discount: 22,
    image: getProductImage('protein', 'MyProtein Impact Whey Isolate'),
    description: '90% protein content, low in carbs and fat, perfect for lean muscle',
    rating: 4.6,
    reviews: 892,
    inStock: true,
    brand: 'MyProtein'
  },
  {
    id: '3',
    name: 'MuscleBlaze Biozyme Performance Whey',
    category: 'protein',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    image: getProductImage('protein', 'MuscleBlaze Biozyme Performance Whey'),
    description: '24g protein, digestive enzymes, 5.5g BCAAs, great taste',
    rating: 4.4,
    reviews: 567,
    inStock: true,
    brand: 'MuscleBlaze'
  },
  {
    id: '4',
    name: 'BSN Syntha-6 Protein Powder',
    category: 'protein',
    price: 4299,
    originalPrice: 5299,
    discount: 19,
    image: getProductImage('protein', 'BSN Syntha-6 Protein Powder'),
    description: '22g protein, 6-layer protein matrix, ultra-premium blend',
    rating: 4.7,
    reviews: 734,
    inStock: true,
    brand: 'BSN'
  },
  {
    id: '5',
    name: 'Dymatize ISO100 Hydrolyzed Protein',
    category: 'protein',
    price: 3899,
    originalPrice: 4799,
    discount: 19,
    image: getProductImage('protein', 'Dymatize ISO100 Hydrolyzed Protein'),
    description: '25g hydrolyzed protein, 5.5g BCAAs, zero lactose',
    rating: 4.9,
    reviews: 1023,
    inStock: true,
    brand: 'Dymatize'
  },

  // Supplements
  {
    id: '6',
    name: 'Optimum Nutrition Creatine Monohydrate',
    category: 'supplements',
    price: 899,
    originalPrice: 1199,
    discount: 25,
    image: getProductImage('supplements', 'Optimum Nutrition Creatine Monohydrate'),
    description: '5g creatine per serving, increases strength and power',
    rating: 4.8,
    reviews: 2156,
    inStock: true,
    brand: 'Optimum Nutrition'
  },
  {
    id: '7',
    name: 'MyProtein BCAA 2:1:1 Powder',
    category: 'supplements',
    price: 1299,
    originalPrice: 1699,
    discount: 24,
    image: getProductImage('supplements', 'MyProtein BCAA 2:1:1 Powder'),
    description: 'Essential amino acids for muscle recovery and growth',
    rating: 4.5,
    reviews: 892,
    inStock: true,
    brand: 'MyProtein'
  },
  {
    id: '8',
    name: 'MuscleTech NitroTech Pre-Workout',
    category: 'supplements',
    price: 2499,
    originalPrice: 3199,
    discount: 22,
    image: getProductImage('supplements', 'MuscleTech NitroTech Pre-Workout'),
    description: 'Advanced pre-workout with creatine, BCAAs, and caffeine',
    rating: 4.6,
    reviews: 445,
    inStock: true,
    brand: 'MuscleTech'
  },
  {
    id: '9',
    name: 'BSN N.O.-XPLODE Pre-Workout',
    category: 'supplements',
    price: 2199,
    originalPrice: 2799,
    discount: 21,
    image: getProductImage('supplements', 'BSN N.O.-XPLODE Pre-Workout'),
    description: 'Nitric oxide booster with energy blend and focus matrix',
    rating: 4.4,
    reviews: 678,
    inStock: true,
    brand: 'BSN'
  },
  {
    id: '10',
    name: 'Dymatize Super Mass Gainer',
    category: 'supplements',
    price: 3299,
    originalPrice: 4199,
    discount: 21,
    image: getProductImage('supplements', 'Dymatize Super Mass Gainer'),
    description: '52g protein, 252g carbs, perfect for weight gain',
    rating: 4.7,
    reviews: 567,
    inStock: true,
    brand: 'Dymatize'
  },

  // Equipment
  {
    id: '11',
    name: 'Bowflex SelectTech 552 Adjustable Dumbbells',
    category: 'equipment',
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    image: getProductImage('equipment', 'Bowflex SelectTech 552 Adjustable Dumbbells'),
    description: 'Adjustable from 5-52.5 lbs, space-saving design',
    rating: 4.9,
    reviews: 1234,
    inStock: true,
    brand: 'Bowflex'
  },
  {
    id: '12',
    name: 'CAP Barbell Olympic Weight Set',
    category: 'equipment',
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    image: getProductImage('equipment', 'CAP Barbell Olympic Weight Set'),
    description: '300 lbs total weight, includes bar, plates, and collars',
    rating: 4.6,
    reviews: 789,
    inStock: true,
    brand: 'CAP Barbell'
  },
  {
    id: '13',
    name: 'Concept2 Model D Indoor Rowing Machine',
    category: 'equipment',
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    image: getProductImage('equipment', 'Concept2 Model D Indoor Rowing Machine'),
    description: 'Professional rowing machine with performance monitor',
    rating: 4.9,
    reviews: 456,
    inStock: true,
    brand: 'Concept2'
  },
  {
    id: '14',
    name: 'TRX Suspension Trainer Pro',
    category: 'equipment',
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    image: getProductImage('equipment', 'TRX Suspension Trainer Pro'),
    description: 'Full-body suspension training system, portable',
    rating: 4.7,
    reviews: 892,
    inStock: true,
    brand: 'TRX'
  },
  {
    id: '15',
    name: 'Lululemon Yoga Mat Premium',
    category: 'equipment',
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    image: getProductImage('equipment', 'Lululemon Yoga Mat Premium'),
    description: '5mm thick, non-slip surface, perfect for yoga and pilates',
    rating: 4.8,
    reviews: 1234,
    inStock: true,
    brand: 'Lululemon'
  },

  // Clothing
  {
    id: '16',
    name: 'Nike Dri-FIT Training T-Shirt',
    category: 'clothing',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    image: getProductImage('clothing', 'Nike Dri-FIT Training T-Shirt'),
    description: 'Moisture-wicking fabric, breathable, comfortable fit',
    rating: 4.6,
    reviews: 567,
    inStock: true,
    brand: 'Nike'
  },
  {
    id: '17',
    name: 'Adidas Performance Training Shorts',
    category: 'clothing',
    price: 1299,
    originalPrice: 1699,
    discount: 24,
    image: getProductImage('clothing', 'Adidas Performance Training Shorts'),
    description: 'Lightweight, quick-dry, built-in liner',
    rating: 4.5,
    reviews: 445,
    inStock: true,
    brand: 'Adidas'
  },
  {
    id: '18',
    name: 'Under Armour HeatGear Leggings',
    category: 'clothing',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    image: getProductImage('clothing', 'Under Armour HeatGear Leggings'),
    description: 'Compression fit, moisture-wicking, 4-way stretch',
    rating: 4.7,
    reviews: 678,
    inStock: true,
    brand: 'Under Armour'
  },
  {
    id: '19',
    name: 'Lululemon Align High-Rise Pants',
    category: 'clothing',
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    image: getProductImage('clothing', 'Lululemon Align High-Rise Pants'),
    description: 'Buttery-soft fabric, high-rise, perfect for yoga',
    rating: 4.9,
    reviews: 1234,
    inStock: true,
    brand: 'Lululemon'
  },
  {
    id: '20',
    name: 'Gymshark Flex Leggings',
    category: 'clothing',
    price: 2499,
    originalPrice: 3199,
    discount: 22,
    image: getProductImage('clothing', 'Gymshark Flex Leggings'),
    description: 'Seamless design, squat-proof, comfortable waistband',
    rating: 4.6,
    reviews: 892,
    inStock: true,
    brand: 'Gymshark'
  },

  // Accessories
  {
    id: '21',
    name: 'Fitbit Charge 5 Fitness Tracker',
    category: 'accessories',
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    image: getProductImage('accessories', 'Fitbit Charge 5 Fitness Tracker'),
    description: 'Heart rate monitor, GPS, sleep tracking, 7-day battery',
    rating: 4.7,
    reviews: 1456,
    inStock: true,
    brand: 'Fitbit'
  },
  {
    id: '22',
    name: 'Apple Watch Series 8',
    category: 'accessories',
    price: 39999,
    originalPrice: 44999,
    discount: 11,
    image: getProductImage('accessories', 'Apple Watch Series 8'),
    description: 'Advanced health monitoring, GPS, cellular option',
    rating: 4.9,
    reviews: 2345,
    inStock: true,
    brand: 'Apple'
  },
  {
    id: '23',
    name: 'Shaker Bottle with Mixing Ball',
    category: 'accessories',
    price: 399,
    originalPrice: 599,
    discount: 33,
    image: getProductImage('accessories', 'Shaker Bottle with Mixing Ball'),
    description: '32oz capacity, leak-proof, easy to clean',
    rating: 4.5,
    reviews: 1234,
    inStock: true,
    brand: 'Generic'
  },
  {
    id: '24',
    name: 'Lifting Straps Premium Leather',
    category: 'accessories',
    price: 799,
    originalPrice: 999,
    discount: 20,
    image: getProductImage('accessories', 'Lifting Straps Premium Leather'),
    description: 'Heavy-duty leather, wrist support, adjustable',
    rating: 4.6,
    reviews: 567,
    inStock: true,
    brand: 'Generic'
  },
  {
    id: '25',
    name: 'Foam Roller High Density',
    category: 'accessories',
    price: 599,
    originalPrice: 799,
    discount: 25,
    image: getProductImage('accessories', 'Foam Roller High Density'),
    description: '36-inch length, muscle recovery, myofascial release',
    rating: 4.4,
    reviews: 789,
    inStock: true,
    brand: 'Generic'
  },

  // More Protein Products
  {
    id: '26',
    name: 'MuscleTech NitroTech Whey Gold',
    category: 'protein',
    price: 2899,
    originalPrice: 3699,
    discount: 22,
    image: getProductImage('protein', 'MuscleTech NitroTech Whey Gold'),
    description: '30g protein, 6.8g BCAAs, creatine monohydrate',
    rating: 4.6,
    reviews: 445,
    inStock: true,
    brand: 'MuscleTech'
  },
  {
    id: '27',
    name: 'BSN True-Mass Weight Gainer',
    category: 'protein',
    price: 2799,
    originalPrice: 3599,
    discount: 22,
    image: getProductImage('protein', 'BSN True-Mass Weight Gainer'),
    description: '700 calories, 46g protein, 85g carbs per serving',
    rating: 4.5,
    reviews: 678,
    inStock: true,
    brand: 'BSN'
  },
  {
    id: '28',
    name: 'Dymatize Elite Casein Protein',
    category: 'protein',
    price: 2499,
    originalPrice: 3199,
    discount: 22,
    image: getProductImage('protein', 'Dymatize Elite Casein Protein'),
    description: 'Slow-release protein, perfect for overnight recovery',
    rating: 4.7,
    reviews: 567,
    inStock: true,
    brand: 'Dymatize'
  },

  // More Supplements
  {
    id: '29',
    name: 'Optimum Nutrition Fish Oil Omega-3',
    category: 'supplements',
    price: 699,
    originalPrice: 899,
    discount: 22,
    image: getProductImage('supplements', 'Optimum Nutrition Fish Oil Omega-3'),
    description: '1000mg fish oil, 300mg EPA, 200mg DHA',
    rating: 4.6,
    reviews: 892,
    inStock: true,
    brand: 'Optimum Nutrition'
  },
  {
    id: '30',
    name: 'MyProtein Vitamin D3 4000IU',
    category: 'supplements',
    price: 399,
    originalPrice: 599,
    discount: 33,
    image: getProductImage('supplements', 'MyProtein Vitamin D3 4000IU'),
    description: 'High-strength vitamin D, bone health, immunity',
    rating: 4.5,
    reviews: 1234,
    inStock: true,
    brand: 'MyProtein'
  },

  // More Equipment
  {
    id: '31',
    name: 'Bowflex Max Trainer M6',
    category: 'equipment',
    price: 79999,
    originalPrice: 99999,
    discount: 20,
    image: getProductImage('equipment', 'Bowflex Max Trainer M6'),
    description: 'Hybrid cardio machine, low-impact, high-intensity',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    brand: 'Bowflex'
  },
  {
    id: '32',
    name: 'CAP Barbell Power Rack',
    category: 'equipment',
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    image: getProductImage('equipment', 'CAP Barbell Power Rack'),
    description: 'Full power rack with pull-up bar, safety pins',
    rating: 4.7,
    reviews: 345,
    inStock: true,
    brand: 'CAP Barbell'
  },

  // More Clothing
  {
    id: '33',
    name: 'Nike Metcon 7 Training Shoes',
    category: 'clothing',
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    image: getProductImage('clothing', 'Nike Metcon 7 Training Shoes'),
    description: 'CrossFit shoes, stable for lifting, flexible for cardio',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    brand: 'Nike'
  },
  {
    id: '34',
    name: 'Adidas Ultraboost 22 Running Shoes',
    category: 'clothing',
    price: 12999,
    originalPrice: 15999,
    discount: 19,
    image: getProductImage('clothing', 'Adidas Ultraboost 22 Running Shoes'),
    description: 'Energy-returning boost midsole, responsive cushioning',
    rating: 4.9,
    reviews: 1234,
    inStock: true,
    brand: 'Adidas'
  },

  // More Accessories
  {
    id: '35',
    name: 'Garmin Fenix 7 GPS Watch',
    category: 'accessories',
    price: 59999,
    originalPrice: 69999,
    discount: 14,
    image: getProductImage('accessories', 'Garmin Fenix 7 GPS Watch'),
    description: 'Multisport GPS watch, advanced training metrics',
    rating: 4.9,
    reviews: 456,
    inStock: true,
    brand: 'Garmin'
  },
  {
    id: '36',
    name: 'Resistance Bands Set (5 bands)',
    category: 'accessories',
    price: 799,
    originalPrice: 1199,
    discount: 33,
    image: getProductImage('accessories', 'Resistance Bands Set (5 bands)'),
    description: '5-50 lbs resistance, portable, versatile training',
    rating: 4.5,
    reviews: 892,
    inStock: true,
    brand: 'Generic'
  },

  // Additional Products to reach 40+
  {
    id: '37',
    name: 'MuscleBlaze Creatine Monohydrate',
    category: 'supplements',
    price: 599,
    originalPrice: 799,
    discount: 25,
    image: getProductImage('supplements', 'MuscleBlaze Creatine Monohydrate'),
    description: 'Pure creatine monohydrate, 5g per serving',
    rating: 4.4,
    reviews: 567,
    inStock: true,
    brand: 'MuscleBlaze'
  },
  {
    id: '38',
    name: 'Lululemon Energy Bra',
    category: 'clothing',
    price: 2499,
    originalPrice: 3199,
    discount: 22,
    image: getProductImage('clothing', 'Lululemon Energy Bra'),
    description: 'High-support sports bra, moisture-wicking fabric',
    rating: 4.7,
    reviews: 789,
    inStock: true,
    brand: 'Lululemon'
  },
  {
    id: '39',
    name: 'Bowflex SelectTech 1090 Adjustable Dumbbells',
    category: 'equipment',
    price: 29999,
    originalPrice: 39999,
    discount: 25,
    image: getProductImage('equipment', 'Bowflex SelectTech 1090 Adjustable Dumbbells'),
    description: 'Adjustable from 10-90 lbs, premium build quality',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    brand: 'Bowflex'
  },
  {
    id: '40',
    name: 'Samsung Galaxy Watch 5',
    category: 'accessories',
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    image: getProductImage('accessories', 'Samsung Galaxy Watch 5'),
    description: 'Advanced health monitoring, GPS, long battery life',
    rating: 4.7,
    reviews: 678,
    inStock: true,
    brand: 'Samsung'
  },
  {
    id: '41',
    name: 'Optimum Nutrition Amino Energy',
    category: 'supplements',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    image: getProductImage('supplements', 'Optimum Nutrition Amino Energy'),
    description: 'BCAAs with energy blend, 160mg caffeine',
    rating: 4.6,
    reviews: 445,
    inStock: true,
    brand: 'Optimum Nutrition'
  },
  {
    id: '42',
    name: 'Gymshark Vital Seamless 2.0',
    category: 'clothing',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    image: getProductImage('clothing', 'Gymshark Vital Seamless 2.0'),
    description: 'Seamless design, squat-proof, comfortable fit',
    rating: 4.5,
    reviews: 567,
    inStock: true,
    brand: 'Gymshark'
  },
  {
    id: '43',
    name: 'CAP Barbell EZ Curl Bar',
    category: 'equipment',
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    image: getProductImage('equipment', 'CAP Barbell EZ Curl Bar'),
    description: 'Olympic curl bar, comfortable grip, 45 lbs weight',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    brand: 'CAP Barbell'
  },
  {
    id: '44',
    name: 'Lacrosse Ball Set (2 balls)',
    category: 'accessories',
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: getProductImage('accessories', 'Lacrosse Ball Set (2 balls)'),
    description: 'Trigger point therapy, myofascial release',
    rating: 4.4,
    reviews: 345,
    inStock: true,
    brand: 'Generic'
  },
  {
    id: '45',
    name: 'MyProtein Impact Whey Protein (5kg)',
    category: 'protein',
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    image: getProductImage('protein', 'MyProtein Impact Whey Protein (5kg)'),
    description: 'Bulk size, 21g protein per serving, great value',
    rating: 4.7,
    reviews: 892,
    inStock: true,
    brand: 'MyProtein'
  }
]

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'protein', name: 'Protein & Nutrition' },
    { id: 'supplements', name: 'Supplements' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'clothing', name: 'Clothing & Shoes' },
    { id: 'accessories', name: 'Accessories' }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'discount':
        return (b.discount || 0) - (a.discount || 0)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FitGym Store
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Premium fitness products, supplements, and equipment to fuel your fitness journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-apple w-full pl-10"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-apple w-full md:w-48"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <div key={product.id} className="card-apple hover-lift group">
              {/* Product Image */}
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {product.discount}% OFF
                    </span>
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <span className="text-white font-bold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">{product.brand}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-red-500 transition-colors duration-300">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!product.inStock}
                  className="btn-apple w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-8 text-center text-gray-600">
          Showing {sortedProducts.length} of {products.length} products
        </div>
      </div>
    </div>
  )
}
