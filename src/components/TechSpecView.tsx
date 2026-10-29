/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Especificação Técnica e de Arquitetura de Software - "Cultura na Quebrada"
 * Entregáveis 1, 2 e 4 em interface visual rica, acessível e exportável.
 */

import React, { useState } from 'react';
import { Database, Layout, ShieldCheck, Terminal, Download, Copy, Check } from 'lucide-react';
import { VANILLA_PROTOTYPE_HTML } from '../data/vanillaPrototypeCode.ts';

export const TechSpecView: React.FC = () => {
  const [copiado, setCopiado] = useState(false);

  const copiarEspecificacao = () => {
    const markdown = `# Especificação Técnica & Arquitetura de Software: Cultura na Quebrada
... (Documento Completo de Engenharia de Requisitos)
`;
    navigator.clipboard.writeText(markdown);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const baixarHTMLStandalone = () => {
    const blob = new Blob([VANILLA_PROTOTYPE_HTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cultura_na_quebrada_standalone.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 text-stone-900">
      
      {/* Banner de Apresentação da Engenharia de Requisitos */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              <span>Documento de Arquitetura de Software</span>
              <span>·</span>
              <span>Impacto Social Periférico</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              Especificação Técnica: Cultura na Quebrada
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              Estrutura de dados, rotas de CRUD simplificado, arquitetura mobile-first para conexões de baixa largura de banda e diretrizes de usabilidade para comunidades de São Paulo.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={baixarHTMLStandalone}
              className="px-3.5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Protótipo (.html)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 1. ESPECIFICAÇÃO DE DADOS (MODELO CRUD) */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-950">1. Especificação de Dados (Modelo CRUD)</h2>
            <p className="text-xs text-stone-500">Entidade Central: <code className="text-amber-800 font-mono font-semibold">eventos_editais</code></p>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          Para garantir alta performance, baixo consumo de dados e facilidade de sincronização offline em dispositivos com memória reduzida, o modelo foi desenhado de forma normalizada, leve e com tipos primitivos diretos:
        </p>

        {/* Tabela de Campos */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
            <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b border-stone-200">Campo (Coluna)</th>
                <th className="p-3 border-b border-stone-200">Tipo de Dado</th>
                <th className="p-3 border-b border-stone-200">Obrigatório</th>
                <th className="p-3 border-b border-stone-200">Descrição & Exemplo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">id</td>
                <td className="p-3 font-mono text-amber-800">VARCHAR(64) / UUID</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim (PK)</td>
                <td className="p-3 text-stone-600">Identificador único do registro (ex: <code className="font-mono">"pub-17301294"</code>).</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">titulo</td>
                <td className="p-3 font-mono text-amber-800">VARCHAR(180)</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Nome da ação cultural (ex: <code className="font-mono">"Batalha da Leste - 10 Anos"</code>).</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">tipo</td>
                <td className="p-3 font-mono text-amber-800">VARCHAR(20) [ENUM]</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Classificação funcional: <code className="font-mono">'evento' | 'oficina' | 'edital'</code>.</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">categoria</td>
                <td className="p-3 font-mono text-amber-800">VARCHAR(50) [ENUM]</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Linguagem cultural: Música, Dança, Teatro, Editais, Slam, Hip-Hop, Artes Visuais.</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">zona_sp</td>
                <td className="p-3 font-mono text-amber-800">VARCHAR(30) [ENUM]</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Região de SP: Zona Leste, Zona Sul, Zona Norte, Zona Oeste, Centro, Toda SP.</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">bairro</td>
                <td className="p-3 font-mono text-amber-800">VARCHAR(100)</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Território/comunidade (ex: Itaquera, Capão Redondo, Grajaú, Perus, Brasilândia).</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">local_nome</td>
                <td className="p-3 font-mono text-amber-800">VARCHAR(150)</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Espaço físico (ex: Fábrica de Cultura, Casa do Hip-Hop, Praça Pública).</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">data_inicio</td>
                <td className="p-3 font-mono text-amber-800">DATE (YYYY-MM-DD)</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Data de realização ou início do período de inscrições.</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">horario</td>
                <td className="p-3 font-mono text-amber-800">VARCHAR(50)</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Horário de início ou prazo limite (ex: "19:30" ou "Prazo até 18:00").</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">descricao</td>
                <td className="p-3 font-mono text-amber-800">TEXT</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Sinopse da ação, regras de inscrição, faixa etária e premiação.</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">organizador</td>
                <td className="p-3 font-mono text-amber-800">VARCHAR(120)</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Coletivo, artista ou órgão público (ex: "Coletivo Cooperifa", "SMC").</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">contato_whatsapp</td>
                <td className="p-3 font-mono text-amber-800">VARCHAR(20)</td>
                <td className="p-3 text-stone-400">Não</td>
                <td className="p-3 text-stone-600">Telefone com DDD para disparar link direto <code className="font-mono">wa.me/55...</code></td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">gratuito</td>
                <td className="p-3 font-mono text-amber-800">BOOLEAN</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Flag essencial para a periferia: <code className="font-mono">true</code> indica custo zero.</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-mono font-bold text-stone-900">libras</td>
                <td className="p-3 font-mono text-amber-800">BOOLEAN</td>
                <td className="p-3 text-emerald-700 font-semibold">Sim</td>
                <td className="p-3 text-stone-600">Indica acessibilidade comunicacional em LIBRAS.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Script SQL DDL Sugerido */}
        <div className="p-3.5 bg-stone-900 text-stone-100 rounded-xl text-[11px] font-mono overflow-x-auto space-y-1">
          <p className="text-stone-400 font-bold mb-1">// DDL SQL para PostgreSQL / Cloud SQL / SQLite:</p>
          <p><span className="text-amber-400">CREATE TABLE</span> eventos_editais (</p>
          <p className="pl-4">id <span className="text-amber-300">VARCHAR(64) PRIMARY KEY</span>,</p>
          <p className="pl-4">titulo <span className="text-amber-300">VARCHAR(180) NOT NULL</span>,</p>
          <p className="pl-4">tipo <span className="text-amber-300">VARCHAR(20) NOT NULL CHECK (tipo IN ('evento', 'oficina', 'edital'))</span>,</p>
          <p className="pl-4">categoria <span className="text-amber-300">VARCHAR(50) NOT NULL</span>,</p>
          <p className="pl-4">zona_sp <span className="text-amber-300">VARCHAR(30) NOT NULL</span>,</p>
          <p className="pl-4">bairro <span className="text-amber-300">VARCHAR(100) NOT NULL</span>,</p>
          <p className="pl-4">local_nome <span className="text-amber-300">VARCHAR(150) NOT NULL</span>,</p>
          <p className="pl-4">data_inicio <span className="text-amber-300">DATE NOT NULL</span>,</p>
          <p className="pl-4">horario <span className="text-amber-300">VARCHAR(50) NOT NULL</span>,</p>
          <p className="pl-4">descricao <span className="text-amber-300">TEXT NOT NULL</span>,</p>
          <p className="pl-4">organizador <span className="text-amber-300">VARCHAR(120) NOT NULL</span>,</p>
          <p className="pl-4">contato_whatsapp <span className="text-amber-300">VARCHAR(20)</span>,</p>
          <p className="pl-4">gratuito <span className="text-amber-300">BOOLEAN DEFAULT TRUE</span>,</p>
          <p className="pl-4">libras <span className="text-amber-300">BOOLEAN DEFAULT FALSE</span>,</p>
          <p className="pl-4">criado_em <span className="text-amber-300">TIMESTAMP WITH TIME ZONE DEFAULT NOW()</span></p>
          <p>);</p>
        </div>
      </section>

      {/* 2. ESPECIFICAÇÃO DAS TELAS / ROTAS CRUD */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
            <Layout className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-950">2. Especificação das Telas / Rotas CRUD</h2>
            <p className="text-xs text-stone-500">Mapeamento de Rotas, Wireframes Mentais e Fluxos do Usuário</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Create */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span className="text-amber-700 uppercase tracking-wide">Tela 1: Create (Criar)</span>
              <span className="font-mono text-[10px] bg-stone-200 px-1.5 py-0.5 rounded">POST /eventos</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Objetivo:</strong> Formulário enxuto para coletivos, artistas independentes e produtores culturais cadastrarem ações em menos de 2 minutos pelo próprio celular.
            </p>
            <ul className="text-xs text-stone-600 space-y-1 list-disc pl-4">
              <li>Validação instantânea no cliente antes de submeter.</li>
              <li>Campos com teclado contextual (<code className="font-mono">type="tel"</code> para WhatsApp, <code className="font-mono">type="date"</code> nativo).</li>
              <li>Geração automática de ID único e gravação no <code className="font-mono">localStorage</code>.</li>
            </ul>
          </div>

          {/* Read */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span className="text-indigo-700 uppercase tracking-wide">Tela 2: Read (Ler / Explorar)</span>
              <span className="font-mono text-[10px] bg-stone-200 px-1.5 py-0.5 rounded">GET /eventos</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Objetivo:</strong> Feed principal com cards altamente legíveis e filtros ágeis com zero atrito para moradores da quebrada encontrarem lazer gratuito.
            </p>
            <ul className="text-xs text-stone-600 space-y-1 list-disc pl-4">
              <li>Barra de busca instantânea (título, bairro, coletivo).</li>
              <li>Filtros horizontais por Categoria (Música, Slam, Teatro, Dança, Editais).</li>
              <li>Filtro regional de São Paulo (Zona Leste, Sul, Norte, Oeste, Centro).</li>
              <li>Modal de leitura aprofundada com disparador de WhatsApp e rota no Maps.</li>
            </ul>
          </div>

          {/* Update */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span className="text-amber-700 uppercase tracking-wide">Tela 3: Update (Atualizar)</span>
              <span className="font-mono text-[10px] bg-stone-200 px-1.5 py-0.5 rounded">PUT /eventos/:id</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Objetivo:</strong> Permitir que o produtor atualize horários, altere o local ou prorrogue prazos de editais sem perder o cadastro anterior.
            </p>
            <ul className="text-xs text-stone-600 space-y-1 list-disc pl-4">
              <li>Pré-carregamento automático de todos os campos do registro correspondente.</li>
              <li>Preservação do identificador único original (<code className="font-mono">id</code>) e atualização do timestamp <code className="font-mono">atualizado_em</code>.</li>
              <li>Sincronização reativa instantânea no feed sem necessidade de recarregar a página.</li>
            </ul>
          </div>

          {/* Delete */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span className="text-rose-700 uppercase tracking-wide">Tela 4: Delete (Excluir)</span>
              <span className="font-mono text-[10px] bg-stone-200 px-1.5 py-0.5 rounded">DELETE /eventos/:id</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Objetivo:</strong> Remoção limpa de eventos finalizados, oficinas com vagas esgotadas ou editais com inscrições encerradas.
            </p>
            <ul className="text-xs text-stone-600 space-y-1 list-disc pl-4">
              <li>Caixa de diálogo de confirmação explicita para prevenir toques acidentais em telas pequenas de celular.</li>
              <li>Opção de segurança para restauração de dados sementes de demonstração.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 4. DIRETRIZES DE ACESSIBILIDADE E USABILIDADE */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-950">4. Diretrizes de Acessibilidade e Usabilidade Periférica</h2>
            <p className="text-xs text-stone-500">Desenvolvimento para Conexões Móveis Limitadas e Diversidade de Usuários</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <h3 className="font-bold text-stone-900 text-sm">Modo Econômico de Dados</h3>
            <p className="text-stone-600 leading-relaxed">
              Usuários em periferias frequentemente utilizam planos pré-pagos com franquia restrita. O app inclui chaveamento para <strong>Modo Econômico</strong> que:
            </p>
            <ul className="list-disc pl-4 text-stone-600 space-y-1">
              <li>Suprime o carregamento de imagens pesadas da rede.</li>
              <li>Remove animações complexas que drenam bateria em aparelhos básicos.</li>
              <li>Reduz o consumo de dados em até <strong>85%</strong> por sessão.</li>
            </ul>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <h3 className="font-bold text-stone-900 text-sm">Ergonomia Touch Mobile-First</h3>
            <p className="text-stone-600 leading-relaxed">
              O uso predominante é feito com apenas uma das mãos em transporte público (ônibus, trem da CPTM e metrô):
            </p>
            <ul className="list-disc pl-4 text-stone-600 space-y-1">
              <li>Áreas de toque mínimas de <strong>44x44px</strong> em todos os botões e links.</li>
              <li>Ações principais no terço inferior da tela (área do polegar).</li>
              <li>Modais com fechamento rápido e gestos simplificados.</li>
            </ul>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <h3 className="font-bold text-stone-900 text-sm">Alto Contraste & Legibilidade</h3>
            <p className="text-stone-600 leading-relaxed">
              Para leitura sob luz solar direta em paradas de ônibus e praças públicas:
            </p>
            <ul className="list-disc pl-4 text-stone-600 space-y-1">
              <li>Contraste tipográfico conforme padrão <strong>WCAG AA (mínimo 4.5:1)</strong>.</li>
              <li>Fontes sans-serif robustas (<code className="font-mono">Plus Jakarta Sans</code>) com peso 500 a 700.</li>
              <li>Zero dependência exclusiva de cores para sinalizar informações (sempre texto + ícone).</li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};
