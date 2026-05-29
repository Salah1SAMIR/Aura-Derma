import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Eye, Star, SlidersHorizontal } from 'lucide-react';
import { useAuraDerma } from '../context/AuraDermaContext';
import productsData from '../data/products.json';

export default function ProductCatalog() {
  const { addToCart, setSelectedProduct } = useAuraDerma();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Serums', 'Creams', 'Cleansers'];

  useEffect(() => {
    // Simulate loading for premium feel
    const timer = setTimeout(() => {
      setProducts(productsData);
      setFilteredProducts(productsData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter & Search Logic
  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.keyIngredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort Logic
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, sortBy, products]);

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-outfit text-xs font-bold tracking-widest uppercase text-brand-gold-500">
            Apothecary Collection
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl text-brand-dark-900 font-light">
            Medical Grade <span className="italic font-bold text-brand-gold-500">Active Formulations</span>
          </h2>
          <p className="font-outfit text-sm text-brand-cream-500 max-w-lg mx-auto">
            Clinically formulated with pure active molecules, botanical extracts, and essential lipids. Free of parabens, sulfates, and fragrance.
          </p>
        </div>

        {/* Filter Controls Panel */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 mb-10 pb-6 border-b border-brand-cream-200">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-outfit text-[12.5px] uppercase tracking-wider font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-brand-dark-900 text-white shadow-md'
                    : 'bg-brand-cream-100/50 hover:bg-brand-cream-200/60 text-brand-dark-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Panel */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search formulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-brand-cream-300 bg-brand-cream-50/50 font-outfit text-xs text-brand-dark-900 focus:outline-none focus:border-brand-gold-500 transition-colors"
              />
              <Search size={14} className="absolute left-3.5 top-3.5 text-brand-cream-500" />
            </div>

            {/* Sort Select */}
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-sm border border-brand-cream-300 bg-brand-cream-50/50 font-outfit text-xs text-brand-dark-900 focus:outline-none focus:border-brand-gold-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="absolute right-3.5 top-3.5 pointer-events-none text-brand-cream-500">
                <SlidersHorizontal size={13} />
              </div>
            </div>

          </div>

        </div>

        {/* Product Grid */}
        {loading ? (
          // Loading Skeletons
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-[4/5] bg-brand-cream-100 rounded-lg"></div>
                <div className="h-4 bg-brand-cream-100 w-1/3 rounded"></div>
                <div className="h-5 bg-brand-cream-100 w-2/3 rounded"></div>
                <div className="h-4 bg-brand-cream-100 w-full rounded"></div>
                <div className="h-8 bg-brand-cream-100 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-brand-cream-100/30 border border-dashed border-brand-cream-300 rounded-2xl">
            <p className="font-outfit text-sm text-brand-cream-500">No formulation matches your search query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 font-outfit text-xs tracking-widest uppercase font-bold text-brand-gold-500 hover:text-brand-dark-950 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          // Product Cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between bg-brand-cream-50/20 border border-brand-cream-200/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-cream-300 transition-all duration-500"
              >
                
                {/* Product Image Frame */}
                <div className="aspect-[4/5] bg-brand-cream-100 overflow-hidden relative group">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-brand-cream-300/40 text-brand-dark-900 font-outfit text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-sm">
                    {product.category}
                  </span>

                  {/* Rating Stars Overlay */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm flex items-center space-x-1 border border-brand-cream-300/40">
                    <Star size={11} className="text-brand-gold-500 fill-brand-gold-500" />
                    <span className="font-outfit font-bold text-[10px] text-brand-dark-900">{product.rating}</span>
                  </div>

                  {/* Hover Quick Actions Frame */}
                  <div className="absolute inset-0 bg-brand-dark-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-3 bg-white text-brand-dark-900 rounded-full shadow-lg hover:bg-brand-gold-500 hover:text-white transition-all duration-300 translate-y-3 group-hover:translate-y-0"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-3 bg-white text-brand-dark-900 rounded-full shadow-lg hover:bg-brand-gold-500 hover:text-white transition-all duration-300 translate-y-3 group-hover:translate-y-0 delay-75"
                      title="Add to Cart"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Active ingredients */}
                    <div className="flex flex-wrap gap-1.5">
                      {product.keyIngredients.slice(0, 2).map((ing, idx) => (
                        <span key={idx} className="font-outfit text-[9.5px] uppercase tracking-wider text-brand-gold-600 bg-brand-gold-50/50 px-2 py-0.5 rounded-sm border border-brand-gold-100/30">
                          {ing}
                        </span>
                      ))}
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-playfair text-xl text-brand-dark-900 font-medium line-clamp-1 hover:text-brand-gold-500 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    
                    {/* Tagline */}
                    <p className="font-outfit text-xs text-brand-cream-500 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Actions & Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-brand-cream-200/50">
                    <span className="font-outfit text-xl font-bold text-brand-dark-900">${product.price}</span>
                    
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="flex items-center space-x-1.5 px-4 py-2 bg-brand-dark-900 text-white font-outfit text-[11px] tracking-widest uppercase font-semibold rounded-sm hover:bg-brand-gold-500 hover:shadow-md transition-all duration-300"
                    >
                      <ShoppingBag size={13} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
