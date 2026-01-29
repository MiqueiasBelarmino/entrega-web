import { Tag } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface Category {
  id: string;
  name: string;
}

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

export const CategoryFilters = ({ categories, selectedCategory, onSelectCategory }: CategoryFiltersProps) => (
  <section className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
        <Tag className="w-6 h-6 text-primary" /> Categorias
      </h2>
    </div>
    <div className="flex flex-wrap gap-3">
      <Button 
        variant={selectedCategory === null ? 'default' : 'outline'}
        onClick={() => onSelectCategory(null)}
        className="rounded-full px-6"
      >
        Todos
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selectedCategory === cat.id ? 'default' : 'outline'}
          onClick={() => onSelectCategory(cat.id === selectedCategory ? null : cat.id)}
          className="rounded-full px-6"
        >
          {cat.name}
        </Button>
      ))}
    </div>
  </section>
);
