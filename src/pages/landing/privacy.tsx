import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* HEADER SIMPLIFICADO */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-orange-600 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Voltar para a página inicial
          </Link>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-orange-600" />
            <span className="font-bold text-slate-800 tracking-tight">Privacidade</span>
          </div>
        </div>
      </header>

      {/* CONTEÚDO DA POLÍTICA */}
      <main className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white my-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="prose prose-slate prose-orange max-w-none">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Políticas de Privacidade</h1>
          <p className="text-slate-500 text-sm mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <p className="lead text-lg text-slate-600 mb-8">
            A sua privacidade é importante para nós. Esta Política de Privacidade explica como o <strong>Entrega Hub</strong> coleta, usa e protege as suas informações quando você utiliza a nossa plataforma, focada no nível atual do nosso Produto Mínimo Viável (MVP).
          </p>

          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">1. Informações que Coletamos</h2>
          <p className="text-slate-600 mb-4">
            No atual estágio do MVP, coletamos apenas os dados estritamente necessários para viabilizar as entregas:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li><strong>Dados de Cadastro:</strong> Nome, e-mail, telefone e senha (armazenada de forma criptografada) de lojistas e entregadores.</li>
            <li><strong>Dados do Estabelecimento:</strong> Nome do local e endereço comercial.</li>
            <li><strong>Dados de Entrega:</strong> Endereços de retirada e destino necessários para a conclusão da entrega.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">2. Como Usamos as Suas Informações</h2>
          <p className="text-slate-600 mb-4">Utilizamos as informações coletadas para:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>Permitir o acesso ao painel do lojista e ao aplicativo web.</li>
            <li>Conectar lojistas que precisam enviar pedidos com entregadores parceiros disponíveis.</li>
            <li>Processar o andamento da entrega (Em Preparo, A Caminho, Entregue).</li>
            <li>Melhorar continuamente a usabilidade da plataforma.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">3. Compartilhamento de Dados</h2>
          <p className="text-slate-600 mb-6">
            O <strong>Entrega Hub</strong> atua apenas como uma ponte tecnológica. As informações do endereço de entrega são compartilhadas <strong>exclusivamente</strong> com o entregador parceiro que aceitou a corrida, afim de que a mesma possa ser concluída. Nós não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.
          </p>

          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">4. Retenção e Segurança</h2>
          <p className="text-slate-600 mb-6">
            Adotamos medidas de segurança padrão da indústria para proteger as informações dentro do nosso banco de dados. Os dados das entregas concluídas são mantidos no seu painel para seu controle de histórico e podem ser retidos para cumprimento de obrigações legais.
          </p>

          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">5. Seus Direitos</h2>
          <p className="text-slate-600 mb-6">
            Você tem o direito de solicitar a exclusão da sua conta ou a retificação dos seus dados a qualquer momento, entrando em contato através dos nossos canais de suporte. Ao excluir a conta, os dados pessoais serão apagados ou anonimizados, exceto quando a retenção for exigida por lei.
          </p>

          <div className="mt-12 p-6 bg-orange-50 rounded-xl border border-orange-100">
            <h3 className="text-xl font-semibold text-orange-800 mb-2">Contato</h3>
            <p className="text-orange-700">
              Se tiver dúvidas sobre esta Política de Privacidade, nossa equipe está disposição. Como estamos em fase de MVP, o seu feedback direto é essencial para nós!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
