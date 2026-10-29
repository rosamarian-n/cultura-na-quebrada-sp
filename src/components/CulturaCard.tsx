/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Calendar, Clock, Edit2, Trash2, ArrowUpRight, MessageCircle } from 'lucide-react';
import { EventoEdital } from '../types/cultura.ts';

interface CulturaCardProps {
  item: EventoEdital;
  dataSaver: boolean;
  onViewDetails: (item: EventoEdital) => void;
  onEdit: (item: EventoEdital) => void;
  onDelete: (id: string, titulo: string) => void;
}

export const CulturaCard: React.FC<CulturaCardProps> = ({
  item,
  dataSaver,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const tipoLabel = 
    item.tipo === 'edital' ? 'Edital de Fomento' : 
    item.tipo === 'oficina' ? 'Oficina Cultural' : 'Evento Comunitário';

  const cleanWhats = item.contato_whatsapp ? item.contato_whatsapp.replace(/\D/g, '') : '';

  return (
    <article className="group bg-white rounded-2xl border border-stone-200/90 hover:border-stone-400/80 transition-all duration-200 shadow-xs flex flex-col justify-between overflow-hidden">
      
      {/* Imagem opcional (somente se Modo Econômico estiver desativado e houver imagem cadastrada) */}
      {!dataSaver && item.imagem_url && (
        <div className="w-full h-44 sm:h-48 overflow-hidden bg-stone-100 relative">
          <img 
            src={item.imagem_url} 
            alt={item.titulo}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white/90 font-medium">
            <span>{item.bairro} · {item.zona_sp}</span>
            <span className="text-amber-300 font-semibold">{item.valor_detalhe || 'Gratuito'}</span>
          </div>
        </div>
      )}

      {/* Conteúdo Central */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata limpa sem pills (Zero-Pill discipline) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mb-2 font-medium">
            <span className="text-amber-700 font-bold tracking-tight">{tipoLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{item.categoria}</span>
            <span aria-hidden="true">·</span>
            <span>{item.zona_sp}</span>
            {item.libras && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">Acessível em LIBRAS</span>
              </>
            )}
          </div>

          {/* Título Principal */}
          <h3 
            onClick={() => onViewDetails(item)}
            className="text-base sm:text-lg font-bold text-stone-900 leading-snug tracking-tight hover:text-amber-600 cursor-pointer transition-colors"
          >
            {item.titulo}
          </h3>

          {/* Dados de Logística: Data, Local, Valor */}
          <div className="mt-2.5 space-y-1.5 text-xs text-stone-600">
            <div className="flex items-center gap-1.5 font-medium text-stone-800">
              <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{item.data_inicio}</span>
              {item.horario && (
                <>
                  <span className="text-stone-300">|</span>
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{item.horario}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="truncate">{item.local_nome} — {item.bairro}</span>
            </div>

            <div className="pt-0.5 text-xs">
              <span className="text-stone-500">Acesso: </span>
              <span className="font-semibold text-stone-900">{item.valor_detalhe || (item.gratuito ? 'Gratuito' : 'Sob consulta')}</span>
            </div>
          </div>

          {/* Descrição resumida */}
          <p className="mt-3 text-xs text-stone-600 leading-relaxed line-clamp-3">
            {item.descricao}
          </p>
        </div>

        {/* Rodapé do Card: Proponente + Ações Rápidas */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="text-[11px] text-stone-500 truncate max-w-[140px] sm:max-w-[200px]" title={item.organizador}>
            <span>Por: </span>
            <span className="font-semibold text-stone-700">{item.organizador}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {cleanWhats && (
              <a
                href={`https://wa.me/55${cleanWhats}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Conversar no WhatsApp"
                className="min-h-[36px] min-w-[36px] flex items-center justify-center text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => onViewDetails(item)}
              title="Ver detalhes completos"
              className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Detalhes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onEdit(item)}
              title="Editar publicação"
              className="min-h-[36px] min-w-[36px] flex items-center justify-center text-amber-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onDelete(item.id, item.titulo)}
              title="Excluir publicação"
              className="min-h-[36px] min-w-[36px] flex items-center justify-center text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
