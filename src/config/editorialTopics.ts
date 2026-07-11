// ═════════════════════════════════════════════════════════════════════════════
// Registro central de tópicos editoriais
//
// Este arquivo é a fonte de verdade para os tópicos controlados do Radar Digital.
// Está conectado ao schema da collection artigos e validado em runtime.
//
// TIPAGEM DERIVADA:
//   EditorialTopicId e EditorialTopic são derivados do registro (editorialTopics).
//   Nunca edite a union manualmente — altere apenas os objetos no array.
//
// REGRAS:
//   - Tópicos não duplicam hubs editoriais.
//   - guideType permanece separado dos tópicos.
//   - Não definir slugs ou rotas nesta etapa.
// ═════════════════════════════════════════════════════════════════════════════

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type EditorialTopicStatus = 'active' | 'planned';

// ─── Tipo de definição ────────────────────────────────────────────────────────

type EditorialTopicDefinition = {
  id: string;
  labelPt: string;
  labelEs: string;
  status: EditorialTopicStatus;
};

// ─── Registro (fonte de verdade única) ─────────────────────────────────────

export const editorialTopics = [
  {
    id: 'prompts',
    labelPt: 'Prompts',
    labelEs: 'Prompts',
    status: 'active',
  },
  {
    id: 'email-marketing',
    labelPt: 'Email Marketing',
    labelEs: 'Email Marketing',
    status: 'active',
  },
  {
    id: 'social-media',
    labelPt: 'Redes Sociais',
    labelEs: 'Redes Sociales',
    status: 'active',
  },
  {
    id: 'account-security',
    labelPt: 'Segurança de Contas',
    labelEs: 'Seguridad de Cuentas',
    status: 'active',
  },
  {
    id: 'analytics-tracking',
    labelPt: 'Analytics e Tracking',
    labelEs: 'Analytics y Tracking',
    status: 'active',
  },
  {
    id: 'antidetect',
    labelPt: 'Antidetect Browsers',
    labelEs: 'Antidetect Browsers',
    status: 'active',
  },
] as const satisfies readonly EditorialTopicDefinition[];

// ─── Tipos derivados do registro ──────────────────────────────────────────

export type EditorialTopic = (typeof editorialTopics)[number];
export type EditorialTopicId = EditorialTopic['id'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Retorna um tópico pelo seu ID interno.
 * Apenas IDs existentes no registro são aceitos.
 */
export function getEditorialTopic(id: EditorialTopicId): EditorialTopic | undefined {
  return editorialTopics.find((t) => t.id === id);
}
