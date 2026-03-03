import { ArrowRight, Clock, MapPin, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 text-white p-1.5 rounded-lg">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              Entrega Hub
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
            >
              Entrar
            </Link>
            <Link
              to="/signup-merchant"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all active:scale-95"
            >
              Começar Agora
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pb-40">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#f97316] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="mx-auto max-w-4xl font-extrabold tracking-tight text-slate-900 text-5xl sm:text-6xl lg:text-7xl">
              O fim do <span className="text-orange-600">caos</span> nas entregas da sua lanchonete.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Publique suas entregas em segundos, deixe nossa rede de parceiros aceitá-las e acompanhe o status de cada pedido em tempo real. Descomplique seu delivery agora.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/signup-courier"
                className="group flex items-center justify-center gap-2 rounded-full bg-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all active:scale-95"
              >
                Começar Grátis Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="mt-3 text-sm text-slate-500 font-medium">
                100% Grátis no primeiro mês • Sem cartão de crédito
              </p>
            </div>
            
          </div>
        </section>

        {/* PAIN POINTS SECTION */}
        <section className="bg-slate-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-orange-600">Nós entendemos a sua realidade</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Seu foco deve ser fazer lanches incríveis, não caçar motoboy.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-2">
                
                {/* Pain Point 1 */}
                <div className="flex flex-col bg-white p-8 border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                      <Clock className="w-6 h-6" />
                    </div>
                    Motoboy faltou no sábado?
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">
                      Não perca vendas. Nossa rede de entregadores parceiros está sempre disponível quando você mais precisa. Um clique e o motoboy mais próximo aceita sua entrega.
                    </p>
                  </dd>
                </div>

                {/* Pain Point 2 */}
                <div className="flex flex-col bg-white p-8 border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    Controle de Status Perdido?
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">
                      Não perca mais tempo tentando lembrar quem levou qual pedido. O painel mostra claramente se a entrega está "Disponível", "A Caminho" ou "Entregue".
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        
        {/* PRICING SECTION */}
        <section className="bg-slate-50 py-24 sm:py-32" id="precos">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-orange-600">Planos simples e transparentes</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                O preço justo para o tamanho do seu negócio.
              </p>
              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                   🚀 Oferta Especial de Lançamento
                </span>
                <p className="text-slate-600 text-sm max-w-md">
                  Mês 1 é por nossa conta. Mês 2 e 3 por apenas R$ 9,90. 
                  Comece a profissionalizar suas entregas hoje!
                </p>
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:max-w-7xl lg:grid-cols-3">
              {/* Plano Essencial */}
              <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-slate-200 xl:p-10 hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-slate-900">Essencial</h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 uppercase tracking-wider">Towner/Pequenos</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">Ideal para quem está começando e precisa de entregadores de confiança.</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-slate-900">R$ 24,90</span>
                    <span className="text-sm font-semibold leading-6 text-slate-600">/mês</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-600">
                    <li className="flex gap-x-3">
                      <ShieldCheck className="h-6 w-5 flex-none text-orange-600" />
                      Acesso à rede de entregadores
                    </li>
                    <li className="flex gap-x-3">
                      <ShieldCheck className="h-6 w-5 flex-none text-orange-600" />
                      Postagem manual de entregas
                    </li>
                    <li className="flex gap-x-3 text-slate-400">
                      <ShieldCheck className="h-6 w-5 flex-none text-slate-300" />
                      Suporte via bot ou e-mail (48h)
                    </li>
                  </ul>
                </div>
                <Link
                  to="/signup-merchant"
                  className="mt-8 block rounded-full px-3 py-2 text-center text-sm font-semibold leading-6 bg-slate-50 text-orange-600 ring-1 ring-inset ring-orange-200 hover:ring-orange-600 transition-all active:scale-95"
                >
                  Começar Mês Grátis
                </Link>
              </div>

              {/* Plano Business */}
              <div className="flex flex-col justify-between rounded-3xl bg-slate-900 p-8 ring-1 ring-slate-900 xl:p-10 shadow-2xl scale-105 relative z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-600 px-4 py-1 text-xs font-bold text-white uppercase tracking-widest shadow-md">
                   Mais Popular
                </div>
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-white">Business</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">Para restaurantes em crescimento que buscam agilidade total.</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-white">R$ 59,90</span>
                    <span className="text-sm font-semibold leading-6 text-slate-300">a R$ 89,90*</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-300">
                    <li className="flex gap-x-3">
                      <Zap className="h-6 w-5 flex-none text-orange-500" />
                      Agilidade na rede de entregadores
                    </li>
                    <li className="flex gap-x-3">
                      <Zap className="h-6 w-5 flex-none text-orange-500" />
                      Suporte prioritário via WhatsApp
                    </li>
                    <li className="flex gap-x-3">
                      <Zap className="h-6 w-5 flex-none text-orange-500" />
                      Relatórios de fechamento mensal
                    </li>
                    <li className="flex gap-x-3">
                      <Zap className="h-6 w-5 flex-none text-orange-500" />
                      Múltiplos usuários (balcão + gerente)
                    </li>
                  </ul>
                </div>
                <Link
                  to="/signup-merchant"
                  className="mt-8 block rounded-full bg-orange-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 transition-all active:scale-95"
                >
                  Turbinar Meu Delivery
                </Link>
              </div>

              {/* Plano Enterprise */}
              <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-slate-200 xl:p-10 hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-slate-900">Enterprise</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">Gestão completa e ferramentas avançadas para grandes operações.</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-slate-900">R$ 149,90+</span>
                    <span className="text-sm font-semibold leading-6 text-slate-600">ou variável</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-600">
                    <li className="flex gap-x-3">
                      <TrendingUp className="h-6 w-5 flex-none text-orange-600" />
                      Gerente de conta dedicado
                    </li>
                    <li className="flex gap-x-3">
                      <TrendingUp className="h-6 w-5 flex-none text-orange-600" />
                      Dashboards de performance
                    </li>
                    <li className="flex gap-x-3">
                      <TrendingUp className="h-6 w-5 flex-none text-orange-600" />
                      Prioridade na fila de notificações
                    </li>
                    <li className="flex gap-x-3 text-slate-400">
                      <TrendingUp className="h-6 w-5 flex-none text-slate-300" />
                      Integrações personalizadas
                    </li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/seu-numero"
                  target="_blank"
                  className="mt-8 block rounded-full px-3 py-2 text-center text-sm font-semibold leading-6 bg-white text-slate-900 ring-1 ring-inset ring-slate-200 hover:ring-orange-600 transition-all active:scale-95"
                >
                  Falar Consultor
                </a>
              </div>
            </div>
            
            <p className="mt-10 text-center text-sm text-slate-500">
              *Valores podem variar baseados no volume de entregas.
            </p>
          </div>
        </section>

        {/* WHY USE SECTION */}
        <section className="bg-slate-900 py-24 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#f97316] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Por que usar o Entrega Hub?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
                  Mais do que organizar, queremos ajudar você a economizar e focar na qualidade do seu produto.
                </p>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-4xl lg:grid-cols-2">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 backdrop-blur-sm text-left">
                        <ShieldCheck className="w-10 h-10 text-orange-500 mb-6" />
                        <h3 className="text-xl font-semibold text-white">Pronto para Celular (PWA)</h3>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Não precisa baixar nada na loja. Acesse pelo navegador do celular, instale na tela inicial e gerencie seu delivery direto do balcão, sem complicação.
                        </p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 backdrop-blur-sm text-left">
                        <TrendingUp className="w-10 h-10 text-orange-500 mb-6" />
                        <h3 className="text-xl font-semibold text-white">Econômico e Flexível</h3>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            Crie suas entregas e deixe a nossa rede de entregadores parceiros cuidar do resto. O sistema te dá a visibilidade de tudo sem cobrar mensalidades abusivas.
                        </p>
                    </div>
                </div>

                <div className="mt-16 sm:mt-24">
                    <Link
                        to="/signup-merchant"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all hover:scale-105 active:scale-95"
                    >
                        Criar Minha Conta Grátis
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="bg-orange-600 text-white p-1 rounded-md">
                        <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 tracking-tight">Entrega Hub</span>
                </div>
                
                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500">
                    <Link to="/login" className="hover:text-orange-600 transition-colors">Login Comerciante</Link>
                    <Link to="/login" className="hover:text-orange-600 transition-colors">Login Entregador</Link>
                    <a href="#" className="hover:text-orange-600 transition-colors">Termos de Uso</a>
                    <Link to="/privacy" className="hover:text-orange-600 transition-colors">Privacidade</Link>
                </nav>
                
                <p className="text-sm text-slate-400">
                    &copy; {new Date().getFullYear()} Entrega Hub. Todos os direitos reservados.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}
