/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Especificação Técnica de Dados - Aplicativo "Cultura na Quebrada"
 * Entidade Central: eventos_editais
 */

export type ZonaSP = 'Zona Leste' | 'Zona Sul' | 'Zona Norte' | 'Zona Oeste' | 'Centro' | 'Toda São Paulo';

export type CategoriaCultural = 
  | 'Música'
  | 'Dança'
  | 'Teatro'
  | 'Editais'
  | 'Slam & Literatura'
  | 'Artes Visuais'
  | 'Hip-Hop'
  | 'Cinema & Audiovisual'
  | 'Outros';

export type TipoPublicacao = 'evento' | 'oficina' | 'edital';

export interface EventoEdital {
  id: string;                     // Identificador único (UUID ou slug temporal)
  titulo: string;                 // Nome do evento, oficina ou edital
  tipo: TipoPublicacao;           // 'evento' | 'oficina' | 'edital'
  categoria: CategoriaCultural;   // Categoria artística principal
  zona_sp: ZonaSP;                // Macrorregião de São Paulo
  bairro: string;                 // Bairro / Comunidade (ex: Itaquera, Capão Redondo, Grajaú)
  local_nome: string;             // Espaço físico (ex: Fábrica de Cultura, Casa do Hip-Hop, Praça)
  endereco?: string;              // Logradouro opcional para geolocalização
  data_inicio: string;            // Data de realização ou início (YYYY-MM-DD)
  data_fim?: string;              // Data de encerramento ou prazo final de inscrição
  horario: string;                // Horário de início ou prazo (ex: "19:00" ou "Até 23h59")
  descricao: string;              // Detalhamento, sinopse, pré-requisitos e regras
  organizador: string;            // Coletivo, artista, ONG ou órgão público responsável
  contato_whatsapp?: string;      // Telefone/WhatsApp para tirar dúvidas ou inscrições
  link_inscricao?: string;        // Link externo para edital em PDF ou formulário
  gratuito: boolean;              // Indicador de gratuidade (true = 100% gratuito)
  valor_detalhe?: string;         // Ex: "Gratuito", "R$ 10 colaborativo", "Bolsa de R$ 15.000"
  libras: boolean;                // Possui acessibilidade em LIBRAS
  imagem_url?: string;            // Imagem representativa ou banner
  criado_em: string;              // Timestamp ISO 8601 de criação
  atualizado_em: string;          // Timestamp ISO 8601 da última alteração
}

export type FiltrosState = {
  termoBusca: string;
  categoria: string;
  zona: string;
  tipo: string;
  apenasGratuitos: boolean;
};
