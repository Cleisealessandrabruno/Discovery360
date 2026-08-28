/**
 * Fonte: planilha "check list de Qualificação.xlsx" (5 abas).
 * Os itens são literais; o progresso é calculado pela aplicação.
 */
window.QUALIFICATION_CHECKLISTS = [
  {
    id: 'lead', titulo: 'Qualificação de Lead', icone: '🧾', subtitulo: 'Usar na etapa de preenchimento e qualificação inicial da Lead.', secoes: [
      { nome: 'Aba Summary', itens: ['Preencher nome do cliente', 'Preencher e-mail do cliente', 'Preencher telefone do cliente', 'Preencher Primary Product', 'Budget Available (Yes)', 'Definir ECD para 60 dias à frente (CSP)', 'Preencher campo Need (B: A: N: T: P: TPID:)', 'Subscription Id (Colocar o TPID Localizado)'] },
      { nome: 'Customer Details', itens: ['Job Title (Cargo)', 'Endereço', 'Preferred Method of Contact'] },
      { nome: '🗣️ Timeline', itens: ['Salvar Pre Account Planner em notas', 'Salvar o Phone Call com contextualização da conversa', 'Salvar o e-mail que servirá como POE (prova de engajamento)'] },
      { nome: 'Company Details', itens: ['Linkar Account ID', 'Verificar Duplicidade de Oportunidade'] },
      { nome: '🧩 Aba "Details"', itens: ['Tenant Id:', 'Product SKU:', 'Ajustar o Registration Date para a data da reunião com o cliente'] },
      { nome: 'MICROSOFT TO CUSTOMER', itens: ['Business Phone', 'e-mail'] },
      { nome: 'Additional Information', itens: ['Additional Information', 'Primary Competitor', 'Partner Account', 'Compete Threat Level - Competidor'] },
      { nome: '🧩 Aba "ONF"', itens: ['Visão geral do negócio', 'Necessidade', 'Processo de Compra', 'Próximos Passos', 'Informações Adicionais / Perguntas do Cliente'] }
    ]
  },
  {
    id: 'opp_b64', titulo: 'Qualificação de Oportunidade Block 64', icone: '🧩', subtitulo: 'Usar ao registrar e qualificar uma oportunidade de Block 64.', secoes: [
      { nome: 'Aba Summary', itens: ['Adicionar no Topic #EVAL', 'Confirmar o Need (B: A: N: T: P: TPID:)', 'Indicar o Principal Competidor', 'Est. Billed Close Date: para 60 dias à frente'] },
      { nome: 'Billed Forecast Recommendation', itens: ['Uncommitted', 'Nome do DAS', 'Nome do Parceiro - E informar se esta no QRP', 'Nome do cliente', 'E-mail do cliente', 'Telefone do cliente', 'Nome do SAS', 'Motion da reunião: Azure - MW - Copilot Segurança ETC...', 'Data e hora da reunião com o cliente', 'Produto(s) de interesse', 'Quantidade dos produtos', 'Contextualizar o SPIN da reunião', 'Mencionar que foi feito o 360 com o cliente'] },
      { nome: 'Quick Actions', itens: ['Solution Area', 'Solution Play'] },
      { nome: 'Sales Programs', itens: ['SMB vendor Tele Evaluations | Block64'] },
      { nome: 'Opportunity Details', itens: ['Claim TPID - Numero do tpid', 'Em Registration Date, colocar a data da reunião com o SAS', 'Product SKU: Tier A, B ou C', 'Em Enrollment Number, colocar o nome do SAS ou DAS'] },
      { nome: '🕐 ABA: Timeline', itens: ['Incluir um Key Events - B64', 'Incluir a resposta do cliente ao e-mail POEE (prova de engajamento)'] },
      { nome: '💼 ABA: Produtos', itens: ['Licensing Program: CSP | Annual New Monthly Billing', 'Incluir todos os produtos mencionados com o cliente', 'Preencher o valor de cada produto (não deixar 0 e nem valor $1)'] },
      { nome: '👥 ABA: Deal Teams', itens: ['Adicionar Manager', 'Cleise Andre', 'Closer', 'DAS', 'Borovac', 'Gerardo Suarez Barrueta', 'SAS'] },
      { nome: '🤝 ABA: Partner', itens: ['Deixar associado para que o SAS engaje depois da reunião'] }
    ]
  },
  {
    id: 'consumo', titulo: 'Qualificação de Oportunidade - Reunião ETC', icone: '📈', subtitulo: 'Usar ao registrar e qualificar uma oportunidade de Consumo (ETC).', secoes: [
      { nome: 'Aba Summary', itens: ['Confirmar o Need (B: A: N: T: P: TPID:)', 'Indicar o Principal Competidor', 'Est. Billed Close Date: para 60 dias à frente'] },
      { nome: 'Billed Forecast Recommendation', itens: ['Uncommitted', 'Nome do DAS', 'Nome do Parceiro - E informar se esta no QRP', 'Nome do cliente', 'E-mail do cliente', 'Telefone do cliente', 'Nome do SAS', 'Data e hora da reunião com o cliente', 'Produto(s) de interesse', 'Quantidade dos produtos', 'Contextualizar o SPIN da reunião', 'Mencionar que foi feito o 360 com o cliente'] },
      { nome: 'Quick Actions', itens: ['Solution Area', 'Solution Play'] },
      { nome: 'Opportunity Details', itens: ['Claim TPID - Numero do tpid', 'Em Registration Date, colocar a data da reunião com o SAS', 'Product SKU: Tier A, B ou C', 'Em Enrollment Number, colocar o nome do SAS ou DAS'] },
      { nome: '🕐 ABA: Timeline', itens: ['Incluir a resposta do cliente ao e-mail POEE (prova de engajamento)'] },
      { nome: '💼 ABA: Milestone', itens: ['Licensing Program: CSP | Annual New Monthly Billing'] },
      { nome: '👥 ABA: Deal Teams', itens: ['Adicionar Manager', 'Cleise Andre', 'Closer', 'DAS', 'Borovac', 'Gerardo Suarez Barrueta', 'SAS'] },
      { nome: '🤝 ABA: Partner', itens: ['Deixar associado para que o SAS engaje depois da reunião'] }
    ]
  },
  {
    id: 'billed_sas', titulo: 'Qualificação de Oportunidade - Reunião SAS Billed', icone: '💼', subtitulo: 'Usar ao registrar e qualificar uma oportunidade Billed com o SAS.', secoes: [
      { nome: 'Aba Summary', itens: ['Confirmar o Need (B: A: N: T: P: TPID:)', 'Indicar o Principal Competidor', 'Est. Billed Close Date: para 90 dias à frente'] },
      { nome: 'Billed Forecast Recommendation', itens: ['Uncommitted', 'Nome do PCM', 'Nome do Parceiro - E informar se esta no QRP', 'Nome do cliente', 'E-mail do cliente', 'Telefone do cliente', 'Nome do SAS', 'Motion da reunião: Azure - MW - Copilot Segurança ETC...', 'Data e hora da reunião com o cliente', 'Produto(s) de interesse', 'Quantidade dos produtos', 'Contextualizar o SPIN da reunião', 'Mencionar que foi feito o 360 com o cliente'] },
      { nome: 'Quick Actions', itens: ['Solution Area', 'Solution Play'] },
      { nome: 'Opportunity Details', itens: ['Claim TPID - Numero do tpid', 'Em Registration Date, colocar a data da reunião com o SAS', 'Product SKU: Tier A, B ou C', 'Em Enrollment Number, colocar o nome do SAS ou DAS'] },
      { nome: '🕐 ABA: Timeline', itens: ['conferir se o Account planner esta anexado', 'Incluir a resposta do cliente ao e-mail POEE (prova de engajamento)'] },
      { nome: '💼 ABA: Produtos', itens: ['Licensing Program: CSP | Annual New Monthly Billing', 'Incluir todos os produtos mencionados com o cliente', 'Preencher o valor de cada produto (não deixar 0 e nem valor $1)'] },
      { nome: '👥 ABA: Deal Teams', itens: ['Adicionar Manager', 'Cleise Andre', 'Closer', 'PCM', 'Borovac', 'Gerardo Suarez Barrueta', 'ETC'] },
      { nome: '🤝 ABA: Partner', itens: ['Deixar associado para que o SAS engaje depois da reunião'] }
    ]
  },
  {
    id: 'direto_das', titulo: 'Qualificação de Oportunidade direto ao DAS', icone: '🎯', subtitulo: 'Usar ao registrar e qualificar uma oportunidade encaminhada direto ao DAS.', secoes: [
      { nome: 'Aba Summary', itens: ['Confirmar o Need (B: A: N: T: P: TPID:)', 'Indicar o Principal Competidor', 'Est. Billed Close Date: para 60 dias à frente'] },
      { nome: 'Billed Forecast Recommendation', itens: ['Uncommitted', 'Nome do DAS', 'Nome do Parceiro - E informar se esta no QRP - Se há distribuidora', 'Nome do cliente', 'E-mail do cliente', 'Telefone do cliente', 'Produto(s) de interesse', 'Quantidade dos produtos', 'Contextualizar o SPIN da reunião', 'Mencionar que foi feito o 360 com o cliente'] },
      { nome: 'Quick Actions', itens: ['Solution Area', 'Solution Play'] },
      { nome: 'Opportunity Details', itens: ['Claim TPID - Numero do tpid', 'Em Registration Date, colocar a data da reunião com o SAS', 'Product SKU: Tier A, B ou C', 'Em Enrollment Number, colocar o nome do SAS ou DAS'] },
      { nome: 'Aba TimeLine', itens: ['conferir se o Account planner esta anexado', 'Incluir a resposta do cliente ao e-mail POEE (prova de engajamento)'] },
      { nome: '💼 ABA: Produtos', itens: ['Licensing Program: CSP | Annual New Monthly Billing', 'Incluir todos os produtos mencionados com o cliente', 'Preencher o valor de cada produto (não deixar 0 e nem valor $1)'] },
      { nome: '👥 ABA: Deal Teams', itens: ['Adicionar Manager', 'Cleise Andre', 'Closer', 'PCM', 'Borovac', 'Gerardo Suarez Barrueta', 'ETC'] },
      { nome: '🤝 ABA: Partner', itens: ['Engajar o parceiro via QRP'] }
    ]
  }
];
