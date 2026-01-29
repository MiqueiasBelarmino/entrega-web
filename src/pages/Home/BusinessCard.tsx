import { Link } from 'react-router-dom';
import { Store, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface Business {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  category: { name: string };
}

export const BusinessCard = ({ biz }: { biz: any }) => (
  <Link to={`/business/${biz.slug}`}>
    <Card className="group hover:shadow-xl transition-all duration-300 border-slate-100 overflow-hidden rounded-2xl h-full">
      <CardContent className="p-0">
        <div className="h-32 bg-slate-50 flex items-center justify-center border-b border-slate-50 group-hover:bg-primary/5 transition-colors">
          <Store className="w-12 h-12 text-slate-300 group-hover:text-primary/40 transition-colors" />
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <Badge variant="secondary" className="mb-2 bg-blue-50 text-blue-700 border-none font-bold">
              {biz.category.name}
            </Badge>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
              {biz.name}
            </h3>
          </div>
          
          <div className="space-y-2 text-sm text-slate-600">
            {biz.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="line-clamp-1">{biz.address}</span>
              </div>
            )}
            {biz.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{biz.phone}</span>
              </div>
            )}
          </div>
          
          <div className="pt-2 flex items-center text-primary font-bold text-sm gap-1 group-hover:gap-2 transition-all">
            Ver Detalhes <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);
