import { useState, useEffect } from 'react';
import api from '../../lib/api';
import AppLayout from '../../components/AppLayout';
import { Hero } from './Hero';
import { CategoryFilters } from './CategoryFilters';
import { BusinessCard } from './BusinessCard';
import { Store } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Business {
  id: string;
  name: string;
  description?: string;
  phone?: string;
  address?: string;
  category: Category;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, bisRes] = await Promise.all([
        api.get('/categories'),
        api.get('/businesses')
      ]);
      setCategories(catRes.data);
      setBusinesses(bisRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedCategory) params.append('categoryId', selectedCategory);
      
      const res = await api.get(`/businesses?${params.toString()}`);
      setBusinesses(res.data);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory]);

  return (
    <AppLayout>
      <div className="space-y-12 pb-16">
        <Hero 
          search={search} 
          setSearch={setSearch} 
          onSearch={handleSearch} 
        />

        <CategoryFilters 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Resultados</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : businesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((biz) => (
                <BusinessCard key={biz.id} biz={biz} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
               <Store className="w-16 h-16 text-slate-300 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-slate-900">Nenhum negócio encontrado</h3>
               <p className="text-slate-500">Tente ajustar sua busca ou categoria.</p>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}
