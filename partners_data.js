/**
 * partners_data.js
 * Fonte: planilha "Lista de parceiro FY27.xlsx" (3 abas / motions):
 *   - AI Business Solutions (com coluna "Type" por parceiro)
 *   - Security
 *   - Consumpt (nome da aba na planilha original — provável erro de digitação de
 *     "Consumption"; NÃO usar esse texto na interface em nenhuma hipótese)
 *
 * ⚠️ PADRONIZAÇÃO OBRIGATÓRIA: o texto exibido ao usuário para este motion deve
 * ser sempre "Consumo" (português), em qualquer lugar da interface — botões,
 * seletor de Opportunity Intent, labels, relatório final, filtros, etc.
 * Nunca usar "Consumption", "Consumpt" ou qualquer variação em inglês na tela.
 * O identificador interno (chave técnica, nunca exibida) é "consumo".
 *
 * Estrutura unificada: uma lista mestre de parceiros (mesmos 47 em todas as abas),
 * cada um com seu "tipo" (classificação, vindo da aba AI Business Solutions,
 * único lugar onde essa coluna existe) e o responsável (DAS/CIA) POR MOTION.
 *
 * IMPORTANTE:
 * - "tipo" é usado para identificar quem é "Distributor" (distribuidora),
 *   independente do motion escolhido.
 * - "responsaveis" tem uma chave por motion: ai_business_solutions, security, consumo.
 *   Na aba Security e na aba Consumpt o responsável é o MESMO para todos os parceiros
 *   (fixo), mas ainda assim modelado por parceiro para manter a estrutura consistente
 *   e à prova de mudanças futuras na planilha.
 */

const OPPORTUNITY_MOTIONS = [
  { id: "ai_business_solutions", label: "AI Business Solutions" },
  { id: "security", label: "Security" },
  { id: "consumo", label: "Consumo" }
];

const PARTNERS_LIST = [
  { nome: "Advanced Informatica Ltda.", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Alfapeople ApS", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Fabio da Silva Cruz", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Buysoft", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Willian Manciopi", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Cloud Target", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "DATAEX SERVICOS E SOLUCOES LTDA", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Dataside Solucoes em Dados LTDA", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Agtor Silva", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Fênix", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Fabio da Silva Cruz", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "GSW", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Fabio da Silva Cruz", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Innovent", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Agtor Silva", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Kinix", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Fabio da Silva Cruz", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Lattine", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "MAPDATA TECNOLOGIA INFORMATICA E COM LT", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Nexer", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Fabio da Silva Cruz", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Pentare Consultoria em Tecnologia Ltda", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Fabio da Silva Cruz", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "SLMIT Innovation Technology", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Agtor Silva", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "SOU Cloud", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "KUMULUS SERVIÇOS EM CLOUD COMPUTING E DATABASE LTDA (faz parte do grupo Logicalis)", tipo: "Direct Partner", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Ingram Micro", tipo: "Distributor", responsaveis: { ai_business_solutions: "Agtor Silva", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Scansource", tipo: "Distributor", responsaveis: { ai_business_solutions: "Willian Manciopi", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "SDN Distribuição", tipo: "Distributor", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "TD Synnex", tipo: "Distributor", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "7IT Tecnologia", tipo: "Indirect Partner", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "C&A TECNOLOGIA DA INFORMACAO DO BRASIL LTDA", tipo: "Indirect Partner", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "IAS TECNOLOGIA LTDA", tipo: "Indirect Partner", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Infobusiness", tipo: "Indirect Partner", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Maximiza", tipo: "Indirect Partner", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Mundo 365", tipo: "Indirect Partner", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Tecnetworking Serviços e Soluções em TI LTDA", tipo: "Indirect Partner", responsaveis: { ai_business_solutions: "Agtor Silva", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Avanade", tipo: "SI", responsaveis: { ai_business_solutions: "Fabio da Silva Cruz", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "FCamara Consultoria e Formação", tipo: "SI", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Brasoftware", tipo: "SSP", responsaveis: { ai_business_solutions: "Alan Mendes", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Dedalus Prime", tipo: "SSP", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Dell", tipo: "SSP", responsaveis: { ai_business_solutions: "Agtor Silva", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "DXC Tecnology", tipo: "SSP", responsaveis: { ai_business_solutions: "Agtor Silva", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Kyndryl", tipo: "SSP", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Lanlink", tipo: "SSP", responsaveis: { ai_business_solutions: "Alan Mendes", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Logicalis", tipo: "SSP", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Noventiq", tipo: "SSP", responsaveis: { ai_business_solutions: "Agtor Silva", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Processor", tipo: "SSP", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "SoftwareOne", tipo: "SSP", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "SoloNetwork", tipo: "SSP", responsaveis: { ai_business_solutions: "Alan Mendes", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Sonda SA", tipo: "SSP", responsaveis: { ai_business_solutions: "Willian Manciopi", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Teltec Solution", tipo: "SSP", responsaveis: { ai_business_solutions: "Agtor Silva", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Tivit", tipo: "SSP", responsaveis: { ai_business_solutions: "Erika Peres", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Algar Multimedia", tipo: "Telco", responsaveis: { ai_business_solutions: "Agtor Silva", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Grupo Triara", tipo: "Telco", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } },
  { nome: "Telefonica", tipo: "Telco", responsaveis: { ai_business_solutions: "Luciano Oliveira", security: "Willian Manciopi", consumo: "Diego Bastos / Gisele Alves" } }
];

/**
 * Distribuidoras = subconjunto de PARTNERS_LIST onde tipo === "Distributor".
 * Usado para popular o campo "Distribuidora" quando o parceiro digitado
 * manualmente não está na lista.
 */
const DISTRIBUTORS_LIST = PARTNERS_LIST.filter(p => p.tipo === "Distributor");
