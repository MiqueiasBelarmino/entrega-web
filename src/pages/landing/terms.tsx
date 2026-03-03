import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
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
            <FileText className="w-6 h-6 text-orange-600" />
            <span className="font-bold text-slate-800 tracking-tight">Termos de Uso</span>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white my-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="prose prose-slate prose-orange max-w-none">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Termos e Condições de Uso
          </h1>
          <p className="text-slate-500 text-sm mb-10">
            Versão 1.0 &mdash; Última atualização: {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </p>

          {/* 1. NATUREZA */}
          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">
            1. Natureza dos Serviços
          </h2>
          <p className="text-slate-600 mb-4">
            A <strong>Entrega Hub</strong> é uma plataforma tecnológica que atua exclusivamente como intermediadora de fretes e transportes de pequenas cargas. A plataforma facilita o encontro entre Comerciantes (contratantes) e Entregadores (prestadores de serviço autônomos).
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>A Plataforma <strong>não é</strong> uma empresa de transportes.</li>
            <li>A Plataforma <strong>não presta</strong> serviços de logística ou entrega diretamente.</li>
            <li>A Plataforma <strong>não possui</strong> frota de veículos nem entregadores próprios.</li>
          </ul>

          {/* 2. VÍNCULO */}
          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">
            2. Ausência de Vínculo Empregatício
          </h2>
          <p className="text-slate-600 mb-4">
            O Entregador declara estar ciente de que a aceitação destes termos não estabelece qualquer vínculo empregatício com a Entrega Hub ou com o Comerciante, dada a inexistência de subordinação, habitualidade obrigatória e pessoalidade.
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li><strong>Autonomia:</strong> O Entregador tem total liberdade para aceitar ou recusar qualquer oferta de entrega, sem qualquer penalidade pela inatividade ou recusa.</li>
            <li><strong>Não Exclusividade:</strong> O Entregador é livre para prestar serviços para outras empresas, plataformas ou concorrentes simultaneamente.</li>
            <li><strong>Sem Jornada:</strong> Não há exigência de horários, turnos ou tempo mínimo de conexão à plataforma.</li>
          </ul>

          {/* 3. RESPONSABILIDADE */}
          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">
            3. Responsabilidade pelas Mercadorias e Danos
          </h2>
          <p className="text-slate-600 mb-4">
            O contrato de transporte é firmado diretamente entre o Comerciante e o Entregador. A Plataforma não é parte desse contrato.
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
            <li>
              <strong>Extravios e Danos:</strong> O Entregador é o <strong>único responsável</strong> pela integridade da mercadoria desde a coleta até a entrega final. A Plataforma não se responsabiliza por perdas, danos, roubos ou avarias nos produtos transportados.
            </li>
            <li>
              <strong>Seguro de Cargas:</strong> É <strong>obrigação exclusiva do Entregador</strong> manter seguro de responsabilidade civil e/ou seguro de cargas compatível com as entregas que realize. <strong>Na ausência de seguro, o Entregador responderá integralmente, com seu patrimônio pessoal, por todos os danos, perdas ou extravios ocorridos</strong>, não podendo imputar qualquer responsabilidade à Plataforma em decorrência da ausência de cobertura securitária.
            </li>
            <li>
              <strong>Indenizações:</strong> Caso ocorra dano ao produto, o Entregador deverá responder diretamente perante o Comerciante. A Plataforma poderá fornecer os dados de cadastro do Entregador ao Comerciante para fins de reparação legal.
            </li>
          </ul>

          {/* 4. PAGAMENTOS */}
          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">
            4. Preços e Pagamentos
          </h2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li><strong>Definição de Valores:</strong> O valor do frete é definido pelo Comerciante no momento da postagem da entrega, podendo ser aceito ou não pelo Entregador.</li>
            <li><strong>Intermediação:</strong> A Plataforma apenas registra os valores acordados entre as partes. A forma de pagamento e o momento do repasse são de responsabilidade direta e exclusiva entre Comerciante e Entregador.</li>
          </ul>

          {/* 5. CADASTRO */}
          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">
            5. Cadastro e Documentação
          </h2>
          <p className="text-slate-600 mb-4">
            Para utilizar a plataforma, o Entregador obriga-se a fornecer informações verídicas, incluindo:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
            <li>Nome completo, CPF e RG;</li>
            <li>CNH válida com observação <strong>EAR (Exerce Atividade Remunerada)</strong>;</li>
            <li>Documentação regular do veículo utilizado.</li>
          </ul>
          <p className="text-slate-600 mb-6">
            <strong>Parágrafo Único:</strong> O uso de conta de terceiros é estritamente proibido e resultará em banimento imediato.
          </p>

          {/* 6. CONDUTA */}
          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">
            6. Segurança e Conduta
          </h2>
          <p className="text-slate-600 mb-4">
            O Entregador compromete-se a respeitar as leis de trânsito vigentes e a agir com boa-fé, ética e profissionalismo nas interações com Comerciantes e destinatários.
          </p>
          <p className="text-slate-600 mb-4">
            A Plataforma reserva-se o direito de suspender ou excluir usuários nos seguintes casos, apurados mediante análise caso a caso e comunicação ao usuário:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
            <li>Comprovação de comportamento inadequado ou abusivo relatado por Comerciantes;</li>
            <li>Suspeita fundamentada de fraude, falsificação de documentos ou uso indevido da plataforma;</li>
            <li>Reincidência em descumprimento destes Termos.</li>
          </ul>
          <p className="text-slate-600 mb-6">
            <strong>Parágrafo Único:</strong> O sistema de avaliações disponível na plataforma é uma ferramenta de reputação fornecida para subsidiar a <strong>decisão autônoma dos Comerciantes</strong> ao selecionar um Entregador. Avaliações não constituem critério de controle, subordinação ou exclusão automática por parte da Plataforma.
          </p>

          {/* 7. LGPD */}
          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">
            7. Privacidade e Dados (LGPD)
          </h2>
          <p className="text-slate-600 mb-6">
            Ao aceitar estes termos, o usuário concorda com a coleta de dados necessários para a operação (identificação e geolocalização durante a entrega) e autoriza o compartilhamento de dados de contato entre Comerciante e Entregador para viabilizar a prestação do serviço, nos termos da Lei nº 13.709/2018 (LGPD). Para mais informações, consulte nossa{' '}
            <Link to="/privacy" className="text-orange-600 hover:underline font-medium">
              Política de Privacidade
            </Link>.
          </p>

          {/* 8. RESCISÃO */}
          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">
            8. Rescisão e Encerramento de Conta
          </h2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>
              <strong>Pelo Usuário:</strong> O Entregador ou Comerciante pode solicitar o encerramento de sua conta a qualquer momento, mediante requisição na plataforma. O encerramento será processado em até <strong>5 (cinco) dias úteis</strong>, respeitadas as obrigações pendentes (entregas em andamento ou valores a receber/pagar).
            </li>
            <li>
              <strong>Pela Plataforma:</strong> Em caso de violação destes Termos, a Plataforma poderá suspender ou encerrar a conta <strong>imediatamente</strong>, sem aviso prévio, a seu exclusivo critério, sem que isso gere qualquer direito a indenização. Em caso de encerramento sem justa causa, a Plataforma notificará o usuário com antecedência mínima de <strong>15 (quinze) dias</strong>.
            </li>
            <li>
              <strong>Efeitos:</strong> O encerramento da conta não exime o usuário de responsabilidades decorrentes de atos praticados durante o período de atividade.
            </li>
          </ul>

          {/* 9. ALTERAÇÕES */}
          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">
            9. Alterações dos Termos
          </h2>
          <p className="text-slate-600 mb-6">
            A Plataforma reserva-se o direito de modificar estes Termos a qualquer tempo. Alterações relevantes serão comunicadas com antecedência mínima de <strong>15 (quinze) dias</strong> por meio de notificação no aplicativo e/ou e-mail cadastrado. O uso continuado da plataforma após a data de vigência constituirá aceite tácito dos Termos atualizados. Caso o usuário não concorde, deverá encerrar sua conta antes da data de vigência, nos termos da Cláusula 8.
          </p>

          {/* 10. FORO */}
          <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-100 pb-2">
            10. Foro
          </h2>
          <p className="text-slate-600 mb-6">
            Fica eleito o foro da <strong>Comarca de Presidente Epitácio, Estado de São Paulo</strong>, como único competente para dirimir quaisquer litígios decorrentes destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
          </p>

          {/* CONTATO */}
          <div className="mt-12 p-6 bg-orange-50 rounded-xl border border-orange-100">
            <h3 className="text-xl font-semibold text-orange-800 mb-2">Dúvidas?</h3>
            <p className="text-orange-700">
              Em caso de dúvidas sobre estes Termos, entre em contato com nossa equipe pelos canais de suporte disponíveis na plataforma.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
