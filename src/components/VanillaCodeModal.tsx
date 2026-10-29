/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, Download, ExternalLink, Code } from 'lucide-react';
import { VANILLA_PROTOTYPE_HTML } from '../data/vanillaPrototypeCode.ts';

export const VanillaCodeModal: React.FC = () => {
  const [copiado, setCopiado] = useState(false);

  const copiarCodigo = () => {
    navigator.clipboard.writeText(VANILLA_PROTOTYPE_HTML);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const baixarArquivo = () => {
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
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 text-stone-900">
      
      {/* Cabeçalho */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <Code className="w-4 h-4" />
            <span>Entregável 3: Protótipo de Código Funcional</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-950 tracking-tight">
            Arquivo Único: HTML5 + Vanilla JS + Tailwind CSS CDN
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Código 100% autossuficiente e limpo. Pode ser salvo como <code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">index.html</code> e aberto diretamente em qualquer navegador, computador ou celular, sem requisições de servidor ou instalações prévias.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={copiarCodigo}
            className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            {copiado ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiado ? 'Copiado para Área de Transferência!' : 'Copiar Código'}</span>
          </button>

          <button
            onClick={baixarArquivo}
            className="px-3.5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Baixar index.html</span>
          </button>

          <a
            href="/cultura_na_quebrada_standalone.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Testar em Nova Aba</span>
          </a>
        </div>
      </div>

      {/* Destaques Técnicos do Protótipo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-xl border border-stone-200">
          <span className="font-bold text-stone-900 block mb-0.5">Persistência LocalStorage</span>
          <p className="text-stone-600 leading-relaxed">Salva, lê, atualiza e remove publicações na chave <code className="font-mono text-[11px] text-amber-700">cultura_quebrada_vanilla_v1</code> de forma persistente.</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-stone-200">
          <span className="font-bold text-stone-900 block mb-0.5">Zero Dependências de Build</span>
          <p className="text-stone-600 leading-relaxed">Tailwind importado via script CDN, JavaScript nativo ES6 sem Vite/Webpack necessário.</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-stone-200">
          <span className="font-bold text-stone-900 block mb-0.5">Integração WhatsApp Direta</span>
          <p className="text-stone-600 leading-relaxed">Links diretos para conversar com os produtores culturais periféricos via protocolo <code className="font-mono text-[11px] text-emerald-700">wa.me/55...</code></p>
        </div>
      </div>

      {/* Bloco de Código com Sintaxe Limpa */}
      <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-lg">
        <div className="px-4 py-2.5 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
          <span>index.html (HTML5 + JS + Tailwind CSS)</span>
          <span>{VANILLA_PROTOTYPE_HTML.length} caracteres · 100% Autônomo</span>
        </div>
        <div className="max-h-[600px] overflow-y-auto p-4 text-xs font-mono text-stone-200 leading-relaxed">
          <pre>{VANILLA_PROTOTYPE_HTML}</pre>
        </div>
      </div>

    </div>
  );
};
