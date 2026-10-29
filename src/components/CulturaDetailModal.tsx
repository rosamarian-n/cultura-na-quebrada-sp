/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Calendar, Clock, MapPin, Share2, MessageCircle, ExternalLink, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { EventoEdital } from '../types/cultura.ts';

interface CulturaDetailModalProps {
  item: EventoEdital | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (item: EventoEdital) => void;
  onDelete: (id: string, titulo: string) => void;
}

export const CulturaDetailModal: React.FC<CulturaDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [copiado, setCopiado] = React.useState(false);

  if (!isOpen || !item) return null;

  const cleanWhats = item.contato_whatsapp ? item.contato_whatsapp.replace(/\D/g, '') : '';
  const encodedMsg = encodeURIComponent(`Salve! Vi a publicação "${item.titulo}" no aplicativo Cultura na Quebrada e gostaria de mais informações.`);

  const handleShare = async () => {
    const shareText = `*${item.titulo}*\n📍 ${item.bairro} (${item.zona_sp}) - ${item.local_nome}\n📅 ${item.data_inicio} às ${item.horario}\n🎟️ ${item.valor_detalhe || 'Gratuito'}\n\nConheça mais no Cultura na Quebrada!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.titulo,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(shareText);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const mapsQuery = encodeURIComponent(`${item.local_nome}, ${item.bairro}, São Paulo, SP`);

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[92vh] flex flex-col border border-stone-200">
        
        {/* Topo do Modal */}
        <div className="flex items-start justify-between pb-3 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-1">
              <span className="text-amber-700 font-bold uppercase tracking-wider text-[11px]">
                {item.tipo === 'edital' ? 'Edital de Fomento' : item.tipo === 'oficina' ? 'Oficina Cultural' : 'Evento'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{item.categoria}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
              {item.titulo}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo com Detalhes */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs text-stone-700">
          
          {/* Grade de Logística */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-stone-500 block">Quando</span>
              <div className="flex items-center gap-1.5 font-bold text-stone-900">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{item.data_inicio}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{item.horario}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-stone-500 block">Território</span>
              <div className="flex items-center gap-1.5 font-bold text-stone-900">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{item.bairro} ({item.zona_sp})</span>
              </div>
              <p className="text-stone-600 truncate">{item.local_nome}</p>
            </div>
          </div>

          {/* Endereço e Acesso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Organização:</span>
              <span className="font-bold text-stone-900">{item.organizador}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Investimento / Ingresso:</span>
              <span className="font-bold text-stone-900">{item.valor_detalhe || 'Gratuito'}</span>
            </div>

            {item.endereco && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Endereço:</span>
                <span className="text-stone-800 text-right">{item.endereco}</span>
              </div>
            )}

            {item.libras && (
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Evento com intérprete e acessibilidade em LIBRAS</span>
              </div>
            )}
          </div>

          {/* Descrição Completa */}
          <div className="pt-2">
            <h4 className="font-bold text-stone-900 text-xs mb-1.5">Sobre esta ação cultural</h4>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 leading-relaxed whitespace-pre-line text-xs">
              {item.descricao}
            </div>
          </div>

          {/* Botões Diretos de Ação Externa (WhatsApp, Maps, Inscrição) */}
          <div className="pt-2 flex flex-wrap gap-2">
            {cleanWhats && (
              <a
                href={`https://wa.me/55${cleanWhats}?text=${encodedMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar no WhatsApp</span>
              </a>
            )}

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Ver no Mapa</span>
            </a>

            {item.link_inscricao && (
              <a
                href={item.link_inscricao}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Acessar Link</span>
              </a>
            )}

            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiado ? 'Copiado!' : 'Compartilhar'}</span>
            </button>
          </div>

        </div>

        {/* Rodapé: Ações de Gestão (Editar / Excluir) */}
        <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(item);
              }}
              className="px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Editar Informações</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onDelete(item.id, item.titulo);
              }}
              className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Excluir</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
