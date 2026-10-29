/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { EventoEdital, CategoriaCultural, TipoPublicacao, ZonaSP } from '../types/cultura.ts';

interface CulturaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: EventoEdital) => void;
  initialData?: EventoEdital | null;
}

const CATEGORIAS: CategoriaCultural[] = [
  'Música',
  'Dança',
  'Teatro',
  'Editais',
  'Slam & Literatura',
  'Artes Visuais',
  'Hip-Hop',
  'Cinema & Audiovisual',
  'Outros',
];

const ZONAS: ZonaSP[] = [
  'Zona Leste',
  'Zona Sul',
  'Zona Norte',
  'Zona Oeste',
  'Centro',
  'Toda São Paulo',
];

export const CulturaFormModal: React.FC<CulturaFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = !!initialData?.id;

  const [formData, setFormData] = useState<Partial<EventoEdital>>({
    titulo: '',
    tipo: 'evento',
    categoria: 'Hip-Hop',
    zona_sp: 'Zona Leste',
    bairro: '',
    local_nome: '',
    endereco: '',
    data_inicio: new Date().toISOString().split('T')[0],
    data_fim: '',
    horario: '19:00',
    descricao: '',
    organizador: '',
    contato_whatsapp: '',
    link_inscricao: '',
    gratuito: true,
    valor_detalhe: 'Gratuito',
    libras: false,
    imagem_url: '',
  });

  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        titulo: '',
        tipo: 'evento',
        categoria: 'Hip-Hop',
        zona_sp: 'Zona Leste',
        bairro: '',
        local_nome: '',
        endereco: '',
        data_inicio: new Date().toISOString().split('T')[0],
        data_fim: '',
        horario: '19:00',
        descricao: '',
        organizador: '',
        contato_whatsapp: '',
        link_inscricao: '',
        gratuito: true,
        valor_detalhe: 'Gratuito',
        libras: false,
        imagem_url: '',
      });
    }
    setErro(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo?.trim()) {
      setErro('Por favor, informe o título da publicação cultural.');
      return;
    }
    if (!formData.bairro?.trim()) {
      setErro('Por favor, informe o bairro ou quebrada de realização.');
      return;
    }
    if (!formData.local_nome?.trim()) {
      setErro('Por favor, indique o espaço ou local físico do evento.');
      return;
    }
    if (!formData.descricao?.trim()) {
      setErro('A descrição é essencial para a comunidade entender a proposta.');
      return;
    }

    const itemFinal: EventoEdital = {
      id: initialData?.id || `pub-${Date.now()}`,
      titulo: formData.titulo.trim(),
      tipo: (formData.tipo as TipoPublicacao) || 'evento',
      categoria: (formData.categoria as CategoriaCultural) || 'Hip-Hop',
      zona_sp: (formData.zona_sp as ZonaSP) || 'Zona Leste',
      bairro: formData.bairro.trim(),
      local_nome: formData.local_nome.trim(),
      endereco: formData.endereco?.trim() || '',
      data_inicio: formData.data_inicio || new Date().toISOString().split('T')[0],
      data_fim: formData.data_fim?.trim() || '',
      horario: formData.horario?.trim() || 'Horário a confirmar',
      descricao: formData.descricao.trim(),
      organizador: formData.organizador?.trim() || 'Coletivo Independente',
      contato_whatsapp: formData.contato_whatsapp?.trim() || '',
      link_inscricao: formData.link_inscricao?.trim() || '',
      gratuito: formData.gratuito ?? true,
      valor_detalhe: formData.valor_detalhe?.trim() || (formData.gratuito ? 'Gratuito' : 'Sob consulta'),
      libras: !!formData.libras,
      imagem_url: formData.imagem_url?.trim() || '',
      criado_em: initialData?.criado_em || new Date().toISOString(),
      atualizado_em: new Date().toISOString(),
    };

    onSave(itemFinal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[92vh] flex flex-col my-auto border border-stone-200">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              {isEditing ? 'Atualizar Publicação Existente' : 'Novo Cadastro no Mural'}
            </span>
            <h2 className="text-lg font-bold text-stone-900 leading-tight">
              {isEditing ? 'Editar Informações Culturais' : 'Cadastrar Ação da Quebrada'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensagem de Erro */}
        {erro && (
          <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{erro}</span>
          </div>
        )}

        {/* Formulário com Scroll Suave */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-3 space-y-3.5 text-xs text-stone-700 pr-1">
          
          <div>
            <label className="block font-semibold text-stone-900 mb-1">
              Título da Ação ou Edital *
            </label>
            <input 
              type="text"
              required
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ex: Batalha de Rima do Capão Redondo"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-900 mb-1">Tipo de Ação *</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value as TipoPublicacao })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
              >
                <option value="evento">Evento Comunitário</option>
                <option value="oficina">Oficina / Formação</option>
                <option value="edital">Edital / Fomento</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-900 mb-1">Linguagem / Categoria *</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value as CategoriaCultural })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
              >
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-900 mb-1">Zona de SP *</label>
              <select
                value={formData.zona_sp}
                onChange={(e) => setFormData({ ...formData, zona_sp: e.target.value as ZonaSP })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
              >
                {ZONAS.map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-900 mb-1">Bairro / Quebrada *</label>
              <input 
                type="text"
                required
                value={formData.bairro}
                onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                placeholder="Ex: Itaquera, Grajaú, Perus"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-900 mb-1">Local / Espaço Físico *</label>
              <input 
                type="text"
                required
                value={formData.local_nome}
                onChange={(e) => setFormData({ ...formData, local_nome: e.target.value })}
                placeholder="Ex: Fábrica de Cultura ou Praça Central"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-900 mb-1">Endereço (opcional)</label>
              <input 
                type="text"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                placeholder="Rua, número ou referência"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-900 mb-1">Data de Realização ou Início *</label>
              <input 
                type="date"
                required
                value={formData.data_inicio}
                onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-900 mb-1">Horário ou Prazo *</label>
              <input 
                type="text"
                required
                value={formData.horario}
                onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                placeholder="Ex: 19:30 ou Até as 18:00"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-900 mb-1">Coletivo / Artista / Organizador *</label>
            <input 
              type="text"
              required
              value={formData.organizador}
              onChange={(e) => setFormData({ ...formData, organizador: e.target.value })}
              placeholder="Ex: Coletivo Periferia Ativa ou Secretaria de Cultura"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-900 mb-1">Descrição & Como Participar *</label>
            <textarea 
              rows={3}
              required
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Explique os objetivos, público-alvo, etapas ou detalhes práticos..."
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-900 mb-1">WhatsApp para Contato</label>
              <input 
                type="tel"
                value={formData.contato_whatsapp}
                onChange={(e) => setFormData({ ...formData, contato_whatsapp: e.target.value })}
                placeholder="Ex: 11988887777 (apenas números)"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-900 mb-1">Valor / Fomento</label>
              <input 
                type="text"
                value={formData.valor_detalhe}
                onChange={(e) => setFormData({ ...formData, valor_detalhe: e.target.value })}
                placeholder="Ex: Gratuito, R$ 10 ou Bolsa R$ 1.500"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-900 mb-1">Link Externo (Formulário ou Edital PDF)</label>
            <input 
              type="url"
              value={formData.link_inscricao}
              onChange={(e) => setFormData({ ...formData, link_inscricao: e.target.value })}
              placeholder="https://..."
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-800">
              <input 
                type="checkbox"
                checked={formData.libras}
                onChange={(e) => setFormData({ ...formData, libras: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
              />
              <span>Possui acessibilidade em LIBRAS</span>
            </label>
          </div>

          {/* Botões de Ação */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Salvar Alterações' : 'Cadastrar Publicação'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
