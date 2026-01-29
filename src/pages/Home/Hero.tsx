import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

interface HeroProps {
  search: string;
  setSearch: (value: string) => void;
  onSearch: () => void;
}

export const Hero = ({ search, setSearch, onSearch }: HeroProps) => (
  <section className="text-center space-y-4 pt-4">
    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
      Descubra o melhor do seu <span className="text-primary">bairro</span>
    </h1>
    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
      Encontre comércios locais, serviços e ofertas exclusivas perto de você.
    </p>
    
    <div className="flex max-w-2xl mx-auto items-center gap-2 mt-8 bg-white p-2 rounded-2xl shadow-lg border border-slate-100">
      <div className="flex-1 flex items-center px-4 gap-2">
        <Search className="w-5 h-5 text-slate-400" />
        <Input 
          placeholder="O que você está procurando?" 
          className="border-none shadow-none focus-visible:ring-0 text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
      </div>
      <Button onClick={onSearch} className="rounded-xl px-8 h-12 font-bold shadow-md">
        Buscar
      </Button>
    </div>

    <div className="pt-6">
      <p className="text-slate-500 text-sm font-medium">
        Tem um comércio?{' '}
        <Link to="/register" className="text-primary font-bold hover:underline">
          Cadastre seu negócio gratuitamente
        </Link>
      </p>
    </div>
  </section>
);
