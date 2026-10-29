/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Código Fonte Completo do Protótipo em Arquivo Único
 * HTML5 + JavaScript Vanilla + Tailwind CSS (via CDN) + LocalStorage
 */

export const VANILLA_PROTOTYPE_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Cultura na Quebrada - Protótipo CRUD Vanilla</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }
  </style>
</head>
<body class="bg-stone-50 text-stone-900 min-h-screen flex flex-col antialiased">

  <!-- TOPO: Barra de Navegação Mobile-First -->
  <header class="sticky top-0 z-30 bg-stone-900 text-stone-50 border-b border-stone-800 shadow-md">
    <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm">
          CQ
        </div>
        <div>
          <h1 class="text-base font-bold tracking-tight leading-none">Cultura na Quebrada</h1>
          <p class="text-[11px] text-stone-400 font-medium mt-0.5">Editais, Oficinas & Eventos Periféricos</p>
        </div>
      </div>
      <button id="btnNovo" onclick="abrirModalCadastro()" class="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm active:scale-95">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
        <span>Publicar</span>
      </button>
    </div>
  </header>

  <!-- CONTEÚDO PRINCIPAL -->
  <main class="flex-1 max-w-4xl w-full mx-auto px-4 py-5 space-y-4">
    
    <!-- BARRA DE PESQUISA & FILTROS RÁPIDOS -->
    <section class="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs space-y-3">
      <div class="relative">
        <input 
          id="campoBusca" 
          type="text" 
          placeholder="Buscar por título, bairro (ex: Itaquera, Capão), coletivo..." 
          class="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
          oninput="filtrarPublicacoes()"
        />
        <svg class="w-4 h-4 text-stone-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      </div>

      <!-- Filtros por Categoria -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs whitespace-nowrap scrollbar-none" id="containerCategorias">
        <button onclick="selecionarCategoria('')" class="categoria-btn px-3 py-1.5 font-medium rounded-lg transition bg-stone-900 text-white" data-cat="">Todas</button>
        <button onclick="selecionarCategoria('Música')" class="categoria-btn px-3 py-1.5 font-medium rounded-lg transition bg-stone-100 text-stone-700 hover:bg-stone-200" data-cat="Música">Música</button>
        <button onclick="selecionarCategoria('Dança')" class="categoria-btn px-3 py-1.5 font-medium rounded-lg transition bg-stone-100 text-stone-700 hover:bg-stone-200" data-cat="Dança">Dança</button>
        <button onclick="selecionarCategoria('Teatro')" class="categoria-btn px-3 py-1.5 font-medium rounded-lg transition bg-stone-100 text-stone-700 hover:bg-stone-200" data-cat="Teatro">Teatro</button>
        <button onclick="selecionarCategoria('Editais')" class="categoria-btn px-3 py-1.5 font-medium rounded-lg transition bg-stone-100 text-stone-700 hover:bg-stone-200" data-cat="Editais">Editais</button>
        <button onclick="selecionarCategoria('Hip-Hop')" class="categoria-btn px-3 py-1.5 font-medium rounded-lg transition bg-stone-100 text-stone-700 hover:bg-stone-200" data-cat="Hip-Hop">Hip-Hop</button>
        <button onclick="selecionarCategoria('Slam & Literatura')" class="categoria-btn px-3 py-1.5 font-medium rounded-lg transition bg-stone-100 text-stone-700 hover:bg-stone-200" data-cat="Slam & Literatura">Slam</button>
      </div>

      <!-- Filtro por Zona de SP -->
      <div class="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100">
        <span class="font-medium text-stone-600">Região de SP:</span>
        <select id="filtroZona" onchange="filtrarPublicacoes()" class="bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer">
          <option value="">Todas as Zonas</option>
          <option value="Zona Leste">Zona Leste</option>
          <option value="Zona Sul">Zona Sul</option>
          <option value="Zona Norte">Zona Norte</option>
          <option value="Zona Oeste">Zona Oeste</option>
          <option value="Centro">Centro</option>
        </select>
      </div>
    </section>

    <!-- LISTAGEM (READ) -->
    <section>
      <div class="flex items-center justify-between mb-2 px-1">
        <span id="contadorResultados" class="text-xs font-semibold text-stone-600">Carregando...</span>
        <button onclick="restaurarDadosIniciais()" class="text-xs text-amber-700 hover:underline">Restaurar Exemplos</button>
      </div>
      <div id="listaPublicacoes" class="space-y-3">
        <!-- Renderizado dinamicamente via JS -->
      </div>
    </section>
  </main>

  <!-- MODAL DE CADASTRO E EDIÇÃO (CREATE / UPDATE) -->
  <div id="modalForm" class="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
      <div class="flex items-center justify-between border-b border-stone-200 pb-3">
        <h2 id="modalTitulo" class="text-base font-bold text-stone-900">Cadastrar Publicação</h2>
        <button onclick="fecharModalForm()" class="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <form id="formPublicacao" onsubmit="salvarPublicacao(event)" class="space-y-3.5 text-xs">
        <input type="hidden" id="pubId" value="">

        <div>
          <label class="block font-semibold text-stone-700 mb-1">Título da Ação Cultural *</label>
          <input type="text" id="pubTitulo" required placeholder="Ex: Batalha de Rima da Quebrada" class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none">
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold text-stone-700 mb-1">Tipo de Ação *</label>
            <select id="pubTipo" required class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none">
              <option value="evento">Evento Cultural</option>
              <option value="oficina">Oficina / Formação</option>
              <option value="edital">Edital / Fomento</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold text-stone-700 mb-1">Categoria *</label>
            <select id="pubCategoria" required class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none">
              <option value="Música">Música</option>
              <option value="Dança">Dança</option>
              <option value="Teatro">Teatro</option>
              <option value="Editais">Editais</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Slam & Literatura">Slam & Literatura</option>
              <option value="Artes Visuais">Artes Visuais</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold text-stone-700 mb-1">Zona de SP *</label>
            <select id="pubZona" required class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none">
              <option value="Zona Leste">Zona Leste</option>
              <option value="Zona Sul">Zona Sul</option>
              <option value="Zona Norte">Zona Norte</option>
              <option value="Zona Oeste">Zona Oeste</option>
              <option value="Centro">Centro</option>
              <option value="Toda São Paulo">Toda São Paulo</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold text-stone-700 mb-1">Bairro / Quebrada *</label>
            <input type="text" id="pubBairro" required placeholder="Ex: Itaquera, Capão, Grajaú" class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold text-stone-700 mb-1">Data *</label>
            <input type="date" id="pubData" required class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none">
          </div>
          <div>
            <label class="block font-semibold text-stone-700 mb-1">Horário / Prazo *</label>
            <input type="text" id="pubHorario" required placeholder="Ex: 19:00 ou Até 18h" class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none">
          </div>
        </div>

        <div>
          <label class="block font-semibold text-stone-700 mb-1">Local / Espaço *</label>
          <input type="text" id="pubLocal" required placeholder="Ex: Fábrica de Cultura ou Praça Central" class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none">
        </div>

        <div>
          <label class="block font-semibold text-stone-700 mb-1">Organizador / Coletivo *</label>
          <input type="text" id="pubOrganizador" required placeholder="Ex: Coletivo Periferia Ativa" class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none">
        </div>

        <div>
          <label class="block font-semibold text-stone-700 mb-1">Descrição / Regras *</label>
          <textarea id="pubDescricao" required rows="3" placeholder="Conte os detalhes do evento, oficina ou como participar..." class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold text-stone-700 mb-1">WhatsApp para Contato</label>
            <input type="tel" id="pubWhats" placeholder="Ex: 11999998888" class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none">
          </div>
          <div>
            <label class="block font-semibold text-stone-700 mb-1">Valor / Bolsa</label>
            <input type="text" id="pubValor" placeholder="Ex: Gratuito ou Bolsa R$ 1.500" class="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none">
          </div>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <input type="checkbox" id="pubLibras" class="rounded text-amber-500 focus:ring-amber-500">
          <label for="pubLibras" class="text-xs text-stone-700 cursor-pointer">Possui acessibilidade em LIBRAS</label>
        </div>

        <div class="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
          <button type="button" onclick="fecharModalForm()" class="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg font-semibold hover:bg-stone-100 transition">Cancelar</button>
          <button type="submit" class="px-5 py-2 bg-amber-500 text-stone-950 rounded-lg font-bold hover:bg-amber-400 transition shadow-sm">Salvar</button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL DE VISUALIZAÇÃO DETALHADA -->
  <div id="modalDetalhes" class="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
      <div class="flex items-start justify-between border-b border-stone-200 pb-3">
        <div>
          <span id="detalheTipo" class="text-[11px] font-bold text-amber-600 uppercase tracking-wider"></span>
          <h2 id="detalheTitulo" class="text-lg font-bold text-stone-900 leading-tight"></h2>
        </div>
        <button onclick="fecharModalDetalhes()" class="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="text-xs space-y-2.5 text-stone-600">
        <div class="flex items-center gap-2">
          <span class="font-bold text-stone-800">Região:</span>
          <span id="detalheRegiao"></span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-stone-800">Quando:</span>
          <span id="detalheQuando"></span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-stone-800">Local:</span>
          <span id="detalheLocal"></span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-stone-800">Organizador:</span>
          <span id="detalheOrganizador"></span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-stone-800">Investimento / Bolsa:</span>
          <span id="detalheValor"></span>
        </div>
        
        <div class="pt-2 border-t border-stone-100">
          <p class="font-bold text-stone-800 mb-1">Sobre esta publicação:</p>
          <p id="detalheDescricao" class="text-stone-700 leading-relaxed whitespace-pre-line bg-stone-50 p-3 rounded-lg border border-stone-200"></p>
        </div>
      </div>

      <div id="detalheAcoes" class="pt-3 border-t border-stone-200 flex flex-wrap gap-2">
        <!-- Injetado dinamicamente: Link WhatsApp, etc. -->
      </div>
    </div>
  </div>

  <!-- JAVASCRIPT VANILLA COM PERSISTÊNCIA VIA LOCALSTORAGE -->
  <script>
    const STORAGE_KEY = 'cultura_quebrada_vanilla_v1';
    
    // Dados semente para primeiro carregamento
    const DADOS_INICIAIS = [
      {
        id: '1',
        titulo: 'Batalha da Leste - 10 Anos de Rima & Cypher',
        tipo: 'evento',
        categoria: 'Hip-Hop',
        zona_sp: 'Zona Leste',
        bairro: 'Itaquera',
        local_nome: 'Praça da Estação Itaquera',
        data_inicio: '2026-11-06',
        horario: '19:30',
        descricao: 'Edição comemorativa com 16 MCs convidados, microfone aberto para novos talentos da quebrada e live painting com grafiteiros locais.',
        organizador: 'Coletivo Batalha da Leste',
        contato_whatsapp: '11991234567',
        valor_detalhe: 'Entrada Gratuita',
        libras: false
      },
      {
        id: '2',
        titulo: 'Edital VAI 2026 - Apoio Cultural Juvenil Periférico',
        tipo: 'edital',
        categoria: 'Editais',
        zona_sp: 'Toda São Paulo',
        bairro: 'Todas as Quebradas',
        local_nome: 'Secretaria Municipal de Cultura',
        data_inicio: '2026-11-01',
        horario: 'Prazo até 18:00',
        descricao: 'Apoio financeiro oficial a coletivos culturais jovens das periferias. Verbas de até R$ 45.000 (M1) e R$ 90.000 (M2).',
        organizador: 'Prefeitura de São Paulo',
        contato_whatsapp: '11987654321',
        valor_detalhe: 'Apoio de até R$ 90.000',
        libras: true
      },
      {
        id: '3',
        titulo: 'Sarau da Cooperifa - Vozes Periféricas',
        tipo: 'evento',
        categoria: 'Slam & Literatura',
        zona_sp: 'Zona Sul',
        bairro: 'Capão Redondo',
        local_nome: 'Bar do Zé Batidão',
        data_inicio: '2026-11-04',
        horario: '20:00',
        descricao: 'Tradicional sarau comunitário com poesia periférica recitada, lançamento independente de livros e confraternização.',
        organizador: 'Coletivo Cooperifa',
        contato_whatsapp: '11977778888',
        valor_detalhe: 'Gratuito',
        libras: true
      },
      {
        id: '4',
        titulo: 'Oficina de Breakdance & Danças Urbanas',
        tipo: 'oficina',
        categoria: 'Dança',
        zona_sp: 'Zona Norte',
        bairro: 'Brasilândia',
        local_nome: 'Fábrica de Cultura Brasilândia',
        data_inicio: '2026-11-10',
        horario: 'Terças e Quintas, 15h',
        descricao: 'Passos básicos de Breaking, preparação física e a história da cultura Hip-Hop para jovens da comunidade.',
        organizador: 'Núcleo Dança de Rua ZN',
        contato_whatsapp: '11966554433',
        valor_detalhe: 'Gratuito',
        libras: false
      }
    ];

    let categoriaFiltroAtiva = '';

    // Inicialização do LocalStorage
    function obterPublicacoes() {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DADOS_INICIAIS));
        return DADOS_INICIAIS;
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return DADOS_INICIAIS;
      }
    }

    function salvarTodas(publicacoes) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(publicacoes));
      filtrarPublicacoes();
    }

    function restaurarDadosIniciais() {
      if (confirm('Deseja restaurar as publicações de exemplo originais?')) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DADOS_INICIAIS));
        filtrarPublicacoes();
      }
    }

    // LEITURA & FILTRAGEM (READ)
    function filtrarPublicacoes() {
      const termo = document.getElementById('campoBusca').value.toLowerCase().trim();
      const zona = document.getElementById('filtroZona').value;
      const todas = obterPublicacoes();

      const filtradas = todas.filter(item => {
        const matchesTermo = !termo || 
          item.titulo.toLowerCase().includes(termo) ||
          item.bairro.toLowerCase().includes(termo) ||
          item.organizador.toLowerCase().includes(termo) ||
          item.descricao.toLowerCase().includes(termo);

        const matchesCat = !categoriaFiltroAtiva || item.categoria === categoriaFiltroAtiva;
        const matchesZona = !zona || item.zona_sp === zona;

        return matchesTermo && matchesCat && matchesZona;
      });

      renderizarLista(filtradas);
    }

    function selecionarCategoria(cat) {
      categoriaFiltroAtiva = cat;
      document.querySelectorAll('.categoria-btn').forEach(btn => {
        if (btn.getAttribute('data-cat') === cat) {
          btn.className = 'categoria-btn px-3 py-1.5 font-medium rounded-lg transition bg-stone-900 text-white';
        } else {
          btn.className = 'categoria-btn px-3 py-1.5 font-medium rounded-lg transition bg-stone-100 text-stone-700 hover:bg-stone-200';
        }
      });
      filtrarPublicacoes();
    }

    function renderizarLista(items) {
      const container = document.getElementById('listaPublicacoes');
      const contador = document.getElementById('contadorResultados');
      contador.innerText = \`\${items.length} publicação(ões) encontrada(s)\`;

      if (items.length === 0) {
        container.innerHTML = \`
          <div class="bg-white p-8 text-center rounded-xl border border-stone-200 text-stone-500">
            <p class="font-medium text-sm text-stone-700">Nenhuma publicação encontrada.</p>
            <p class="text-xs mt-1">Tente ajustar seus filtros de busca ou cadastre uma nova ação cultural!</p>
          </div>
        \`;
        return;
      }

      container.innerHTML = items.map(item => {
        const tipoBadgeClass = item.tipo === 'edital' 
          ? 'text-amber-700 bg-amber-50' 
          : item.tipo === 'oficina' 
            ? 'text-emerald-700 bg-emerald-50' 
            : 'text-indigo-700 bg-indigo-50';

        const tipoNome = item.tipo === 'edital' ? 'Edital / Fomento' : item.tipo === 'oficina' ? 'Oficina' : 'Evento';

        return \`
          <article class="bg-white p-4 rounded-xl border border-stone-200 hover:border-stone-300 transition shadow-xs flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                <div class="flex items-center gap-1.5 font-medium">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase \${tipoBadgeClass}">\${tipoNome}</span>
                  <span>·</span>
                  <span>\${item.categoria}</span>
                </div>
                <span class="text-stone-700 font-semibold">\${item.data_inicio}</span>
              </div>

              <h3 class="text-base font-bold text-stone-900 leading-snug cursor-pointer hover:text-amber-600 transition" onclick="visualizarDetalhes('\${item.id}')">
                \${item.titulo}
              </h3>

              <div class="text-xs text-stone-600 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>📍 \${item.bairro} (\${item.zona_sp})</span>
                <span>·</span>
                <span>\${item.local_nome}</span>
                <span>·</span>
                <span class="font-semibold text-stone-900">\${item.valor_detalhe || 'Gratuito'}</span>
              </div>

              <p class="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                \${item.descricao}
              </p>
            </div>

            <div class="flex items-center justify-between pt-2.5 border-t border-stone-100 text-xs">
              <span class="text-stone-500 truncate max-w-[180px]">Por: \${item.organizador}</span>
              <div class="flex items-center gap-2">
                <button onclick="visualizarDetalhes('\${item.id}')" class="px-2.5 py-1 text-stone-700 hover:bg-stone-100 font-medium rounded-md transition">Ver Mais</button>
                <button onclick="carregarParaEditar('\${item.id}')" class="px-2.5 py-1 text-amber-700 hover:bg-amber-50 font-medium rounded-md transition">Editar</button>
                <button onclick="deletarPublicacao('\${item.id}')" class="px-2.5 py-1 text-rose-600 hover:bg-rose-50 font-medium rounded-md transition">Excluir</button>
              </div>
            </div>
          </article>
        \`;
      }).join('');
    }

    // MODAL DE CADASTRO / EDIÇÃO
    function abrirModalCadastro() {
      document.getElementById('formPublicacao').reset();
      document.getElementById('pubId').value = '';
      document.getElementById('modalTitulo').innerText = 'Cadastrar Nova Publicação';
      document.getElementById('modalForm').classList.remove('hidden');
    }

    function fecharModalForm() {
      document.getElementById('modalForm').classList.add('hidden');
    }

    // CRIAÇÃO E ATUALIZAÇÃO (CREATE & UPDATE)
    function salvarPublicacao(e) {
      e.preventDefault();
      const id = document.getElementById('pubId').value;
      const todas = obterPublicacoes();

      const dados = {
        id: id || 'pub-' + Date.now(),
        titulo: document.getElementById('pubTitulo').value.trim(),
        tipo: document.getElementById('pubTipo').value,
        categoria: document.getElementById('pubCategoria').value,
        zona_sp: document.getElementById('pubZona').value,
        bairro: document.getElementById('pubBairro').value.trim(),
        local_nome: document.getElementById('pubLocal').value.trim(),
        data_inicio: document.getElementById('pubData').value,
        horario: document.getElementById('pubHorario').value.trim(),
        descricao: document.getElementById('pubDescricao').value.trim(),
        organizador: document.getElementById('pubOrganizador').value.trim(),
        contato_whatsapp: document.getElementById('pubWhats').value.trim(),
        valor_detalhe: document.getElementById('pubValor').value.trim() || 'Gratuito',
        libras: document.getElementById('pubLibras').checked
      };

      if (id) {
        // UPDATE
        const index = todas.findIndex(p => p.id === id);
        if (index !== -1) {
          todas[index] = dados;
        }
      } else {
        // CREATE
        todas.unshift(dados);
      }

      salvarTodas(todas);
      fecharModalForm();
    }

    function carregarParaEditar(id) {
      const item = obterPublicacoes().find(p => p.id === id);
      if (!item) return;

      document.getElementById('pubId').value = item.id;
      document.getElementById('pubTitulo').value = item.titulo;
      document.getElementById('pubTipo').value = item.tipo;
      document.getElementById('pubCategoria').value = item.categoria;
      document.getElementById('pubZona').value = item.zona_sp;
      document.getElementById('pubBairro').value = item.bairro;
      document.getElementById('pubLocal').value = item.local_nome;
      document.getElementById('pubData').value = item.data_inicio;
      document.getElementById('pubHorario').value = item.horario;
      document.getElementById('pubDescricao').value = item.descricao;
      document.getElementById('pubOrganizador').value = item.organizador;
      document.getElementById('pubWhats').value = item.contato_whatsapp || '';
      document.getElementById('pubValor').value = item.valor_detalhe || '';
      document.getElementById('pubLibras').checked = !!item.libras;

      document.getElementById('modalTitulo').innerText = 'Editar Publicação';
      document.getElementById('modalForm').classList.remove('hidden');
    }

    // EXCLUSÃO (DELETE)
    function deletarPublicacao(id) {
      const item = obterPublicacoes().find(p => p.id === id);
      if (!item) return;

      if (confirm(\`Tem certeza que deseja excluir "\${item.titulo}"?\`)) {
        const atualizadas = obterPublicacoes().filter(p => p.id !== id);
        salvarTodas(atualizadas);
      }
    }

    // DETALHES
    function visualizarDetalhes(id) {
      const item = obterPublicacoes().find(p => p.id === id);
      if (!item) return;

      document.getElementById('detalheTipo').innerText = \`\${item.tipo} · \${item.categoria}\`;
      document.getElementById('detalheTitulo').innerText = item.titulo;
      document.getElementById('detalheRegiao').innerText = \`\${item.bairro} (\${item.zona_sp})\`;
      document.getElementById('detalheQuando').innerText = \`\${item.data_inicio} - \${item.horario}\`;
      document.getElementById('detalheLocal').innerText = item.local_nome;
      document.getElementById('detalheOrganizador').innerText = item.organizador;
      document.getElementById('detalheValor').innerText = item.valor_detalhe || 'Gratuito';
      document.getElementById('detalheDescricao').innerText = item.descricao;

      const acoesContainer = document.getElementById('detalheAcoes');
      let btns = '';

      if (item.contato_whatsapp) {
        const cleanWhats = item.contato_whatsapp.replace(/\\D/g, '');
        btns += \`
          <a href="https://wa.me/55\${cleanWhats}" target="_blank" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1.5 transition">
            <span>Conversar no WhatsApp</span>
          </a>
        \`;
      }

      btns += \`
        <button onclick="carregarParaEditar('\${item.id}'); fecharModalDetalhes();" class="px-3.5 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-lg font-semibold transition">
          Editar Informações
        </button>
      \`;

      acoesContainer.innerHTML = btns;
      document.getElementById('modalDetalhes').classList.remove('hidden');
    }

    function fecharModalDetalhes() {
      document.getElementById('modalDetalhes').classList.add('hidden');
    }

    // Inicialização ao carregar a página
    window.addEventListener('DOMContentLoaded', () => {
      filtrarPublicacoes();
    });
  </script>
</body>
</html>
`;
