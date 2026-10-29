/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Plus, 
  Sparkles, 
  RefreshCw, 
  CheckCircle, 
  ShieldAlert, 
  Radio, 
  Compass,
  Zap,
  Info
} from 'lucide-react';
import { EventoEdital, CategoriaCultural, ZonaSP, TipoPublicacao } from './types/cultura.ts';
import { SEED_EVENTOS_EDITAIS, STORAGE_KEY, DATA_SAVER_KEY } from './data/seedData.ts';
import { Navbar } from './components/Navbar.tsx';
import { CulturaCard } from './components/CulturaCard.tsx';
import { CulturaFormModal } from './components/CulturaFormModal.tsx';
import { CulturaDetailModal } from './components/CulturaDetailModal.tsx';
import { TechSpecView } from './components/TechSpecView.tsx';
import { VanillaCodeModal } from './components/VanillaCodeModal.tsx';

const CATEGORIAS_FILTRO = [
  'Todas',
  'Música',
  'Dança',
  'Teatro',
  'Editais',
  'Hip-Hop',
  'Slam & Literatura',
  'Cinema & Audiovisual',
  'Artes Visuais',
];

const ZONAS_FILTRO = [
  'Todas as Zonas',
  'Zona Leste',
  'Zona Sul',
  'Zona Norte',
  'Zona Oeste',
  'Centro',
  'Toda São Paulo',
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<'app' | 'specs' | 'vanilla'>('app');
  const [publicacoes, setPublicacoes] = useState<EventoEdital[]>([]);
  const [dataSaver, setDataSaver] = useState<boolean>(false);

  // Filtros
  const [busca, setBusca] = useState<string>('');
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('Todas');
  const [zonaAtiva, setZonaAtiva] = useState<string>('Todas as Zonas');
  const [tipoAtivo, setTipoAtivo] = useState<string>('todos');
  const [apenasGratuitos, setApenasGratuitos] = useState<boolean>(false);

  // Modais
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<EventoEdital | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<EventoEdital | null>(null);

  // Alerta de Notificação / Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Carregar dados e modo econômico do LocalStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        setPublicacoes(JSON.parse(savedData));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_EVENTOS_EDITAIS));
        setPublicacoes(SEED_EVENTOS_EDITAIS);
      }

      const savedDataSaver = localStorage.getItem(DATA_SAVER_KEY);
      if (savedDataSaver) {
        setDataSaver(savedDataSaver === 'true');
      }
    } catch {
      setPublicacoes(SEED_EVENTOS_EDITAIS);
    }
  }, []);

  // Salvar no LocalStorage sempre que publicacoes mudarem
  const salvarNoStorage = (novasPubs: EventoEdital[]) => {
    setPublicacoes(novasPubs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novasPubs));
    } catch (e) {
      console.error('Falha ao salvar no localStorage:', e);
    }
  };

  const toggleDataSaver = () => {
    const novoValor = !dataSaver;
    setDataSaver(novoValor);
    localStorage.setItem(DATA_SAVER_KEY, String(novoValor));
    showToast(novoValor ? 'Modo Econômico ativado (menos uso de dados 3G/4G).' : 'Modo Econômico desativado.');
  };

  // Operações CRUD
  // CREATE & UPDATE
  const handleSavePublicacao = (item: EventoEdital) => {
    const existe = publicacoes.some((p) => p.id === item.id);
    let atualizadas: EventoEdital[];

    if (existe) {
      // UPDATE
      atualizadas = publicacoes.map((p) => (p.id === item.id ? item : p));
      showToast('Publicação atualizada com sucesso!');
    } else {
      // CREATE
      atualizadas = [item, ...publicacoes];
      showToast('Nova publicação cadastrada no mural!');
    }

    salvarNoStorage(atualizadas);
  };

  // DELETE
  const handleDeletePublicacao = (id: string, titulo: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a publicação "${titulo}"?`)) {
      const atualizadas = publicacoes.filter((p) => p.id !== id);
      salvarNoStorage(atualizadas);
      showToast('Publicação removida com sucesso.');
    }
  };

  // Restaurar dados originais de exemplo
  const handleRestaurarExemplos = () => {
    if (window.confirm('Deseja restaurar as publicações culturais de exemplo?')) {
      salvarNoStorage(SEED_EVENTOS_EDITAIS);
      showToast('Exemplos de editais e eventos restaurados!');
    }
  };

  // Filtragem
  const publicacoesFiltradas = publicacoes.filter((item) => {
    // Busca textual
    const termo = busca.toLowerCase().trim();
    const matchBusca =
      !termo ||
      item.titulo.toLowerCase().includes(termo) ||
      item.bairro.toLowerCase().includes(termo) ||
      item.organizador.toLowerCase().includes(termo) ||
      item.local_nome.toLowerCase().includes(termo) ||
      item.descricao.toLowerCase().includes(termo);

    // Categoria
    const matchCategoria = categoriaAtiva === 'Todas' || item.categoria === categoriaAtiva;

    // Zona de SP
    const matchZona = zonaAtiva === 'Todas as Zonas' || item.zona_sp === zonaAtiva;

    // Tipo
    const matchTipo = tipoAtivo === 'todos' || item.tipo === tipoAtivo;

    // Gratuidade
    const matchGratuito = !apenasGratuitos || item.gratuito;

    return matchBusca && matchCategoria && matchZona && matchTipo && matchGratuito;
  });

  // Métricas rápidas da Quebrada
  const totalEventos = publicacoes.filter((p) => p.tipo === 'evento').length;
  const totalOficinas = publicacoes.filter((p) => p.tipo === 'oficina').length;
  const totalEditais = publicacoes.filter((p) => p.tipo === 'edital').length;

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950">
      
      {/* Barra de Navegação no Topo */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenCreate={() => {
          setEditingItem(null);
          setIsFormOpen(true);
        }}
        dataSaver={dataSaver}
        toggleDataSaver={toggleDataSaver}
      />

      {/* Notificação Toast Flutuante */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-stone-700 flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL DE ACORDO COM A ABA ATIVA */}
      {currentTab === 'specs' ? (
        <TechSpecView />
      ) : currentTab === 'vanilla' ? (
        <VanillaCodeModal />
      ) : (
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
          
          {/* BANNER HERO: Identidade da Quebrada */}
          <section className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-stone-800">
            {/* Fundo sutil com imagem de cultura periférica se modo de economia desligado */}
            {!dataSaver && (
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity">
                <img 
                  src="/src/assets/images/cultura_quebrada_hero_1793237695666.jpg" 
                  alt="Periferia de São Paulo em celebração cultural"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Impacto Social · Periferias de São Paulo</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                A cultura e o corre da quebrada em um só lugar.
              </h1>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                Conectando artistas independentes, coletivos e moradores das zonas Leste, Sul, Norte e Oeste a editais de fomento, oficinas gratuitas e eventos locais.
              </p>

              {/* Indicadores de Impacto */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">{publicacoes.length}</span>
                  <span className="text-[11px] leading-tight text-stone-400">Publicações<br />Ativas</span>
                </div>
                <div className="h-6 w-px bg-stone-700 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">{totalEditais}</span>
                  <span className="text-[11px] leading-tight text-stone-400">Editais &<br />Bolsas</span>
                </div>
                <div className="h-6 w-px bg-stone-700 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">{totalOficinas}</span>
                  <span className="text-[11px] leading-tight text-stone-400">Oficinas<br />Abertas</span>
                </div>
                <div className="h-6 w-px bg-stone-700 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">{totalEventos}</span>
                  <span className="text-[11px] leading-tight text-stone-400">Saraus &<br />Batalhas</span>
                </div>
              </div>
            </div>

            {/* Aviso quando Modo Econômico estiver ligado */}
            {dataSaver && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Modo Econômico ativo: imagens pesadas ocultas para economizar seu pacote de dados.</span>
              </div>
            )}
          </section>

          {/* PAINEL DE CONTROLE CRUD & FILTROS ÁGEIS */}
          <section className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-4">
            
            {/* Linha 1: Barra de Pesquisa + Seletor de Tipo + Botão Criar */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Pesquisar por título, bairro (Itaquera, Capão, Perus), coletivo..."
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                {busca && (
                  <button 
                    onClick={() => setBusca('')}
                    className="absolute right-3 top-3 text-xs text-stone-400 hover:text-stone-700 font-bold"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Segmented Control por Tipo de Ação */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl shrink-0 overflow-x-auto text-xs font-semibold">
                <button
                  onClick={() => setTipoAtivo('todos')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    tipoAtivo === 'todos'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Todos ({publicacoes.length})
                </button>
                <button
                  onClick={() => setTipoAtivo('evento')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    tipoAtivo === 'evento'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Eventos ({totalEventos})
                </button>
                <button
                  onClick={() => setTipoAtivo('oficina')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    tipoAtivo === 'oficina'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Oficinas ({totalOficinas})
                </button>
                <button
                  onClick={() => setTipoAtivo('edital')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    tipoAtivo === 'edital'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Editais ({totalEditais})
                </button>
              </div>

              {/* Botão de Criação Rápida */}
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsFormOpen(true);
                }}
                className="px-4 py-2.5 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Publicar Ação</span>
              </button>
            </div>

            {/* Linha 2: Filtros de Categoria (Tabs funcionais sem pill-clutter) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs whitespace-nowrap scrollbar-none">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mr-1 shrink-0">
                Linguagem:
              </span>
              {CATEGORIAS_FILTRO.map((cat) => {
                const isActive = categoriaAtiva === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoriaAtiva(cat)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-stone-900 text-stone-50 font-semibold shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-950'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Linha 3: Filtro Regional por Zona de SP & Apenas Gratuitos */}
            <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-semibold text-stone-700">Região de SP:</span>
                <select
                  value={zonaAtiva}
                  onChange={(e) => setZonaAtiva(e.target.value)}
                  className="bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-800 rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
                >
                  {ZONAS_FILTRO.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer font-medium select-none">
                  <input
                    type="checkbox"
                    checked={apenasGratuitos}
                    onChange={(e) => setApenasGratuitos(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-amber-500 focus:ring-amber-500 cursor-pointer"
                  />
                  <span>Apenas Gratuitos</span>
                </label>

                <button
                  onClick={handleRestaurarExemplos}
                  className="text-amber-800 hover:text-amber-950 font-medium hover:underline cursor-pointer"
                >
                  Restaurar Exemplos
                </button>
              </div>
            </div>

          </section>

          {/* LISTAGEM DE PUBLICAÇÕES (READ) */}
          <section className="space-y-4">
            
            <div className="flex items-center justify-between px-1 text-xs">
              <span className="font-semibold text-stone-700">
                Mostrando <strong className="text-stone-950">{publicacoesFiltradas.length}</strong> publicação(ões)
                {categoriaAtiva !== 'Todas' && ` em ${categoriaAtiva}`}
                {zonaAtiva !== 'Todas as Zonas' && ` na ${zonaAtiva}`}
              </span>

              {(busca || categoriaAtiva !== 'Todas' || zonaAtiva !== 'Todas as Zonas' || tipoAtivo !== 'todos' || apenasGratuitos) && (
                <button
                  onClick={() => {
                    setBusca('');
                    setCategoriaAtiva('Todas');
                    setZonaAtiva('Todas as Zonas');
                    setTipoAtivo('todos');
                    setApenasGratuitos(false);
                  }}
                  className="text-stone-500 hover:text-stone-800 underline cursor-pointer"
                >
                  Limpar todos os filtros
                </button>
              )}
            </div>

            {publicacoesFiltradas.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  Nenhuma publicação encontrada
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Não foram encontradas ações para os filtros selecionados. Tente buscar por outros termos ou cadastre uma nova ação cultural para movimentar a quebrada!
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setBusca('');
                      setCategoriaAtiva('Todas');
                      setZonaAtiva('Todas as Zonas');
                      setTipoAtivo('todos');
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition cursor-pointer"
                  >
                    Resetar Filtros
                  </button>
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setIsFormOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl transition cursor-pointer"
                  >
                    Cadastrar Publicação
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {publicacoesFiltradas.map((item) => (
                  <CulturaCard
                    key={item.id}
                    item={item}
                    dataSaver={dataSaver}
                    onViewDetails={(pub) => setSelectedDetail(pub)}
                    onEdit={(pub) => {
                      setEditingItem(pub);
                      setIsFormOpen(true);
                    }}
                    onDelete={(id, titulo) => handleDeletePublicacao(id, titulo)}
                  />
                ))}
              </div>
            )}

          </section>

        </main>
      )}

      {/* MODAL DE CADASTRO / EDIÇÃO (CREATE / UPDATE) */}
      <CulturaFormModal
        isOpen={isFormOpen}
        initialData={editingItem}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSavePublicacao}
      />

      {/* MODAL DE VISUALIZAÇÃO DETALHADA */}
      <CulturaDetailModal
        item={selectedDetail}
        isOpen={!!selectedDetail}
        onClose={() => setSelectedDetail(null)}
        onEdit={(item) => {
          setSelectedDetail(null);
          setEditingItem(item);
          setIsFormOpen(true);
        }}
        onDelete={(id, titulo) => {
          setSelectedDetail(null);
          handleDeletePublicacao(id, titulo);
        }}
      />

      {/* RODAPÉ DO PROJETO */}
      <footer className="mt-12 bg-white border-t border-stone-200 py-6 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800">Cultura na Quebrada</span>
            <span>·</span>
            <span>Plataforma Comunitária e Social de São Paulo</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setCurrentTab('specs')} className="hover:text-stone-900 transition">
              Especificação Técnica
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('vanilla')} className="hover:text-stone-900 transition">
              Código Fonte Vanilla
            </button>
            <span>·</span>
            <button onClick={toggleDataSaver} className="hover:text-stone-900 transition">
              {dataSaver ? 'Desativar Modo Econômico' : 'Ativar Modo Econômico'}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
