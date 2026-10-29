/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plus, Wifi, WifiOff, FileCode2, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  currentTab: 'app' | 'specs' | 'vanilla';
  setCurrentTab: (tab: 'app' | 'specs' | 'vanilla') => void;
  onOpenCreate: () => void;
  dataSaver: boolean;
  toggleDataSaver: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenCreate,
  dataSaver,
  toggleDataSaver,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* ZONA 1: Marca do Projeto (Single-line wordmark) */}
        <div 
          onClick={() => setCurrentTab('app')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm shadow-sm ring-2 ring-amber-400/30">
            CQ
          </div>
          <div className="leading-tight">
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              Cultura na Quebrada
            </span>
            <p className="text-[10px] text-stone-400 font-medium hidden sm:block">
              Periferias de São Paulo em Movimento
            </p>
          </div>
        </div>

        {/* ZONA 2: Links de Navegação */}
        <nav className="flex items-center gap-1 sm:gap-4 text-xs font-medium">
          <button
            onClick={() => setCurrentTab('app')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'app'
                ? 'bg-stone-800 text-amber-400 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mural CRUD</span>
          </button>

          <button
            onClick={() => setCurrentTab('specs')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'specs'
                ? 'bg-stone-800 text-amber-400 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Especificação Técnica</span>
          </button>

          <button
            onClick={() => setCurrentTab('vanilla')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'vanilla'
                ? 'bg-stone-800 text-amber-400 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Protótipo Vanilla (HTML)</span>
          </button>
        </nav>

        {/* ZONA 3: Ação Principal & Modo Econômico */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Toggle Modo Econômico para Conexões 3G/4G Periféricas */}
          <button
            onClick={toggleDataSaver}
            title={dataSaver ? "Modo Econômico Ativo (Imagens ocultas, alta velocidade)" : "Ativar Modo Econômico (Economiza franquia de dados)"}
            className={`px-2.5 py-1.5 text-xs rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
              dataSaver
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : 'bg-stone-800/90 border-stone-700 text-stone-400 hover:text-stone-200'
            }`}
          >
            {dataSaver ? <WifiOff className="w-3.5 h-3.5 text-emerald-400" /> : <Wifi className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{dataSaver ? 'Econômico ON' : 'Modo Econômico'}</span>
          </button>

          <button
            onClick={onOpenCreate}
            className="px-3.5 py-2 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-lg transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Nova Publicação</span>
            <span className="sm:hidden">Publicar</span>
          </button>
        </div>

      </div>
    </header>
  );
};
