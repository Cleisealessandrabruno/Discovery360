(function () {
  const languages = {
    pt: { label: 'Português', locale: 'pt-BR' },
    en: { label: 'English', locale: 'en-US' },
    es: { label: 'Español', locale: 'es-ES' }
  };

  const keyedCatalog = {
    'dashboard.section': { pt: 'Sua operação comercial', en: 'Your sales operation', es: 'Su operación comercial' },
    'dashboard.greeting': { pt: 'Olá,', en: 'Hello,', es: 'Hola,' },
    'dashboard.subtitle': { pt: 'Aqui está sua visão comercial de hoje.', en: "Here is today's sales overview.", es: 'Aquí está su panorama comercial de hoy.' },
    'dashboard.newMeeting': { pt: '+ Nova reunião', en: '+ New meeting', es: '+ Nueva reunión' },
    'dashboard.inProgress': { pt: 'EM ANDAMENTO', en: 'IN PROGRESS', es: 'EN CURSO' },
    'dashboard.activeConversations': { pt: 'conversas ativas', en: 'active conversations', es: 'conversaciones activas' },
    'dashboard.meetings': { pt: 'REUNIÕES', en: 'MEETINGS', es: 'REUNIONES' },
    'dashboard.history': { pt: 'no seu histórico', en: 'in your history', es: 'en su historial' },
    'dashboard.opportunities': { pt: 'OPORTUNIDADES', en: 'OPPORTUNITIES', es: 'OPORTUNIDADES' },
    'dashboard.identified': { pt: 'identificadas', en: 'identified', es: 'identificadas' },
    'dashboard.nextSteps': { pt: 'PRÓXIMOS PASSOS', en: 'NEXT STEPS', es: 'PRÓXIMOS PASOS' },
    'common.pending': { pt: 'pendentes', en: 'pending', es: 'pendientes' },
    'dashboard.followConversations': { pt: 'Acompanhe suas conversas', en: 'Track your conversations', es: 'Acompañe sus conversaciones' },
    'dashboard.recentMeetings': { pt: 'Reuniões recentes', en: 'Recent meetings', es: 'Reuniones recientes' },
    'dashboard.empty': { pt: 'Nenhuma reunião cadastrada ainda.', en: 'No meetings registered yet.', es: 'Aún no hay reuniones registradas.' },
    'dashboard.guide': { pt: '📖 Guia de Descoberta do CLM', en: '📖 CLM Discovery Guide', es: '📖 Guía de Descubrimiento del CLM' },
    'dashboard.meetingCount.one': { pt: '1 reunião', en: '1 meeting', es: '1 reunión' },
    'dashboard.meetingCount.many': { pt: '{count} reuniões', en: '{count} meetings', es: '{count} reuniones' }
  };

  const translations = {
    'EM ANDAMENTO': ['IN PROGRESS', 'EN CURSO'], 'Conversas ativas': ['Active conversations', 'Conversaciones activas'],
    'conversas ativas': ['active conversations', 'conversaciones activas'], 'REUNIÕES': ['MEETINGS', 'REUNIONES'],
    'no seu histórico': ['in your history', 'en su historial'], 'OPORTUNIDADES': ['OPPORTUNITIES', 'OPORTUNIDADES'],
    'identificadas': ['identified', 'identificadas'], 'PRÓXIMOS PASSOS': ['NEXT STEPS', 'PRÓXIMOS PASOS'],
    'Nenhuma reunião cadastrada ainda.': ['No meetings registered yet.', 'Aún no hay reuniones registradas.'],
    'Guia de Descoberta do CLM': ['CLM Discovery Guide', 'Guía de Descubrimiento del CLM'],
    '📖 Guia de Descoberta do CLM': ['📖 CLM Discovery Guide', '📖 Guía de Descubrimiento del CLM'],
    'Descobertas mais': ['Clearer', 'Descubrimientos más'], 'claras.': ['discoveries.', 'claros.'],
    'Conversas melhores.': ['Better conversations.', 'Mejores conversaciones.'],
    'Conduza conversas, registre descobertas e organize oportunidades.': ['Lead conversations, capture discoveries and organize opportunities.', 'Conduzca conversaciones, registre descubrimientos y organice oportunidades.'],
    'Roteiros de descoberta': ['Discovery scripts', 'Guiones de descubrimiento'], 'Registro estruturado': ['Structured records', 'Registro estructurado'],
    'Histórico de perguntas e respostas': ['Question and answer history', 'Historial de preguntas y respuestas'], 'Relatórios para análise': ['Analysis reports', 'Informes para análisis'],
    'Acesso restrito a usuários autorizados · Discovery 360': ['Access restricted to authorized users · Discovery 360', 'Acceso restringido a usuarios autorizados · Discovery 360'],
    'Prepare o contexto antes da conversa. Campos com * são obrigatórios.': ['Prepare the context before the conversation. Fields marked * are required.', 'Prepare el contexto antes de la conversación. Los campos con * son obligatorios.'],
    'Cliente *': ['Customer *', 'Cliente *'], 'Assunto *': ['Subject *', 'Asunto *'], 'Data *': ['Date *', 'Fecha *'],
    'Número da Lead *': ['Lead number *', 'Número del Lead *'], 'Lead ou Oportunidade da reunião *': ['Meeting Lead or Opportunity *', 'Lead u Oportunidad de la reunión *'],
    'Desligado: Lead · Ligado: Oportunidade': ['Off: Lead · On: Opportunity', 'Desactivado: Lead · Activado: Oportunidad'],
    'Segmento': ['Segment', 'Segmento'], 'Solução Microsoft em discussão': ['Microsoft solution being discussed', 'Solución Microsoft en discusión'],
    'Contexto da conversa': ['Conversation context', 'Contexto de la conversación'], 'Contexto prévio da reunião': ['Previous meeting context', 'Contexto previo de la reunión'],
    '+ Adicionar mais contexto': ['+ Add more context', '+ Agregar más contexto'], 'Observações de preparação': ['Preparation notes', 'Observaciones de preparación'],
    'Registro da conversa': ['Conversation record', 'Registro de la conversación'], 'REUNIÃO ATIVA': ['ACTIVE MEETING', 'REUNIÓN ACTIVA'],
    'Gerou oportunidade': ['Generated opportunity', 'Generó oportunidad'], 'Registrar próximo passo': ['Record next step', 'Registrar próximo paso'],
    'Selecione uma pergunta para começar.': ['Select a question to begin.', 'Seleccione una pregunta para comenzar.'],
    'Registre aqui exatamente o que o cliente respondeu.': ['Record exactly what the customer answered.', 'Registre exactamente lo que respondió el cliente.'],
    'Relatório de descoberta': ['Discovery report', 'Informe de descubrimiento'], 'Análise inteligente': ['Intelligent analysis', 'Análisis inteligente'],
    'Catálogo de referência': ['Reference catalog', 'Catálogo de referencia'], 'Consulta independente. Abrir conteúdos aqui não altera nenhuma reunião.': ['Independent consultation. Opening content here does not change any meeting.', 'Consulta independiente. Abrir contenido aquí no modifica ninguna reunión.'],
    'Explore os Sales Plays por sinal, categoria e solução potencial.': ['Explore Sales Plays by signal, category and potential solution.', 'Explore los Sales Plays por señal, categoría y solución potencial.'],
    'Nenhum play encontrado. Tente outro termo ou remova o filtro.': ['No play found. Try another term or remove the filter.', 'No se encontró ningún play. Pruebe otro término o quite el filtro.'],
    'Matriz rápida de oportunidades': ['Quick opportunity matrix', 'Matriz rápida de oportunidades'], 'Sinal do cliente': ['Customer signal', 'Señal del cliente'],
    'Abordagem principal': ['Primary approach', 'Enfoque principal'], 'Tipo': ['Type', 'Tipo'],
    'Use cada checklist para manter o registro comercial completo.': ['Use each checklist to keep the sales record complete.', 'Use cada lista para mantener completo el registro comercial.'],
    '+ Nova instância': ['+ New instance', '+ Nueva instancia'], 'Instância ativa': ['Active instance', 'Instancia activa'],
    'Avalie a aderência da conversa ao processo Microsoft e gere um feedback estruturado.': ['Assess how well the conversation follows the Microsoft process and generate structured feedback.', 'Evalúe la adherencia de la conversación al proceso Microsoft y genere comentarios estructurados.'],
    'O número deve pertencer a uma reunião já cadastrada.': ['The number must belong to an existing meeting.', 'El número debe pertenecer a una reunión registrada.'],
    'Qualidade comercial': ['Sales quality', 'Calidad comercial'], 'Higiene operacional': ['Operational hygiene', 'Higiene operativa'],
    'Reuniões por pessoa': ['Meetings by person', 'Reuniones por persona'], 'Pessoa': ['Person', 'Persona'], 'Última reunião': ['Last meeting', 'Última reunión'],
    'Log de auditoria consolidado': ['Consolidated audit log', 'Registro consolidado de auditoría'], 'Evento': ['Event', 'Evento'],
    'Checklist de oportunidade com alto potencial de pipeline': ['High-potential pipeline opportunity checklist', 'Lista de oportunidad con alto potencial de pipeline'],
    'Confirme cada indicador antes de finalizar a reunião.': ['Confirm each indicator before finishing the meeting.', 'Confirme cada indicador antes de finalizar la reunión.'],
    'Voltar e buscar mais informações': ['Go back and gather more information', 'Volver y buscar más información'],
    'Etapa obrigatória': ['Required step', 'Paso obligatorio'], 'SOLUÇÃO POTENCIAL': ['POTENTIAL SOLUTION', 'SOLUCIÓN POTENCIAL'],
    'SINAIS DE ALTO POTENCIAL': ['HIGH-POTENTIAL SIGNALS', 'SEÑALES DE ALTO POTENCIAL'], 'Usar este Play em uma reunião': ['Use this Play in a meeting', 'Usar este Play en una reunión'],
    'Estrutura de decisão do CLM — Do sinal à oportunidade': ['CLM decision framework — From signal to opportunity', 'Marco de decisión del CLM — De la señal a la oportunidad'],
    'Use dados da conta, licenciamento, atividades, setor e contexto do cliente.': ['Use account data, licensing, activities, industry and customer context.', 'Use datos de la cuenta, licencias, actividades, sector y contexto del cliente.'],
    'Selecione o problema de negócio mais plausível. Trate-o como hipótese, não como fato.': ['Select the most plausible business problem. Treat it as a hypothesis, not a fact.', 'Seleccione el problema de negocio más plausible. Trátelo como hipótesis, no como hecho.'],
    'Faça de duas a quatro perguntas de alto valor sobre Situação e Problema.': ['Ask two to four high-value questions about Situation and Problem.', 'Haga de dos a cuatro preguntas de alto valor sobre Situación y Problema.'],
    'Explore impacto em tempo, custo, risco, produtividade, receita, conformidade ou crescimento.': ['Explore impact on time, cost, risk, productivity, revenue, compliance or growth.', 'Explore el impacto en tiempo, costo, riesgo, productividad, ingresos, cumplimiento o crecimiento.'],
    'Use perguntas de Necessidade–Solução para que o cliente expresse o valor.': ['Use Need–Payoff questions so the customer expresses the value.', 'Use preguntas de Necesidad–Solución para que el cliente exprese el valor.'],
    'Relacione a necessidade validada à carga de trabalho Microsoft pertinente.': ['Connect the validated need to the relevant Microsoft workload.', 'Relacione la necesidad validada con la carga de trabajo Microsoft pertinente.'],
    'Confirme adequação, partes interessadas, prazo, orçamento e próxima etapa.': ['Confirm fit, stakeholders, timeline, budget and next step.', 'Confirme adecuación, partes interesadas, plazo, presupuesto y próximo paso.'],
    'Avalie o potencial e determine se deve se tornar uma oportunidade.': ['Assess the potential and determine whether it should become an opportunity.', 'Evalúe el potencial y determine si debe convertirse en una oportunidad.'],
    'Entrar': ['Sign in', 'Iniciar sesión'], 'Use suas credenciais corporativas.': ['Use your corporate credentials.', 'Use sus credenciales corporativas.'],
    'E-mail corporativo': ['Corporate email', 'Correo corporativo'], 'Senha': ['Password', 'Contraseña'], 'Mostrar': ['Show', 'Mostrar'], 'Ocultar': ['Hide', 'Ocultar'],
    'Manter conectado': ['Keep me signed in', 'Mantener la sesión iniciada'], 'Esqueci minha senha': ['Forgot my password', 'Olvidé mi contraseña'],
    'Ainda não tem acesso?': ["Don't have access yet?", '¿Aún no tiene acceso?'], 'Solicitar acesso': ['Request access', 'Solicitar acceso'],
    'Dashboard': ['Dashboard', 'Panel'], 'Nova reunião': ['New meeting', 'Nueva reunión'], 'Biblioteca 360': ['360 Library', 'Biblioteca 360'],
    'Checklists': ['Checklists', 'Listas de verificación'], 'Auditoria de ligação': ['Call audit', 'Auditoría de llamada'],
    'Validação de acessos': ['Access validation', 'Validación de accesos'], 'Sair': ['Sign out', 'Salir'],
    'Olá,': ['Hello,', 'Hola,'], 'Aqui está sua visão comercial de hoje.': ["Here is today's sales overview.", 'Aquí está su panorama comercial de hoy.'],
    'Sua operação comercial': ['Your sales operation', 'Su operación comercial'], 'Acompanhe suas conversas': ['Track your conversations', 'Acompañe sus conversaciones'],
    'Reuniões recentes': ['Recent meetings', 'Reuniones recientes'], '+ Nova reunião': ['+ New meeting', '+ Nueva reunión'],
    'Cliente': ['Customer', 'Cliente'], 'Empresa': ['Company', 'Empresa'], 'Assunto': ['Subject', 'Asunto'], 'Data': ['Date', 'Fecha'],
    'Status': ['Status', 'Estado'], 'Ação': ['Action', 'Acción'], 'Ações': ['Actions', 'Acciones'], 'Total': ['Total', 'Total'],
    'Rascunhos': ['Drafts', 'Borradores'], 'Concluídas': ['Completed', 'Completadas'], 'Próximo passo': ['Next step', 'Próximo paso'],
    'Salvar rascunho': ['Save draft', 'Guardar borrador'], 'Iniciar reunião': ['Start meeting', 'Iniciar reunión'], 'Finalizar reunião': ['Finish meeting', 'Finalizar reunión'],
    'Perguntas': ['Questions', 'Preguntas'], 'Perguntas e respostas': ['Questions and answers', 'Preguntas y respuestas'], 'Parceiro': ['Partner', 'Socio'],
    'Resumo final': ['Final summary', 'Resumen final'], 'Tema': ['Topic', 'Tema'], 'Categoria': ['Category', 'Categoría'],
    '+ Adicionar pergunta personalizada': ['+ Add custom question', '+ Agregar pregunta personalizada'], 'Pergunta e resposta': ['Question and answer', 'Pregunta y respuesta'],
    'Resposta do cliente': ['Customer response', 'Respuesta del cliente'], 'Salvar resposta': ['Save response', 'Guardar respuesta'], 'Cancelar': ['Cancel', 'Cancelar'],
    'Marcar sem resposta': ['Mark unanswered', 'Marcar sin respuesta'], 'Cliente não soube': ["Customer didn't know", 'El cliente no supo'],
    'Não se aplica': ['Not applicable', 'No aplica'], 'Responder depois': ['Answer later', 'Responder después'],
    'Todos': ['All', 'Todos'], 'Pendentes': ['Pending', 'Pendientes'], 'Aprovados': ['Approved', 'Aprobados'], 'Rejeitados': ['Rejected', 'Rechazados'],
    'Solicitações de acesso': ['Access requests', 'Solicitudes de acceso'], 'E-mails simulados': ['Simulated emails', 'Correos simulados'],
    'Visão operacional': ['Operational overview', 'Visión operativa'], 'Nome': ['Name', 'Nombre'], 'E-mail': ['Email', 'Correo'], 'Cargo': ['Role', 'Cargo'],
    'Administração': ['Administration', 'Administración'], 'Visão consolidada da operação e auditoria.': ['Consolidated operation and audit overview.', 'Visión consolidada de la operación y auditoría.'],
    'Nome completo *': ['Full name *', 'Nombre completo *'], 'E-mail corporativo *': ['Corporate email *', 'Correo corporativo *'], 'Empresa *': ['Company *', 'Empresa *'],
    'Cargo *': ['Role *', 'Cargo *'], 'Gestor direto': ['Direct manager', 'Gerente directo'], 'País/Região': ['Country/Region', 'País/Región'],
    'Como pretende utilizar a plataforma? *': ['How do you intend to use the platform? *', '¿Cómo pretende utilizar la plataforma? *'],
    'Enviar solicitação': ['Send request', 'Enviar solicitud'], 'Preencha seus dados para análise do administrador.': ['Enter your information for administrator review.', 'Complete sus datos para la revisión del administrador.'],
    'Nova auditoria': ['New audit', 'Nueva auditoría'], 'Análise da Ligação': ['Call Analysis', 'Análisis de la llamada'],
    'Gerar análise da ligação': ['Generate call analysis', 'Generar análisis de la llamada'], 'Exportar para Word': ['Export to Word', 'Exportar a Word'],
    'Overall Call Score': ['Overall Call Score', 'Puntuación general de la llamada'], 'Sim': ['Yes', 'Sí'], 'Não': ['No', 'No'],
    'Biblioteca de conversas': ['Conversation library', 'Biblioteca de conversaciones'], 'Todos os plays': ['All plays', 'Todos los plays'],
    'Encontre a': ['Find the', 'Encuentre la'], 'próxima': ['next', 'próxima'], 'conversa.': ['conversation.', 'conversación.'],
    'Copiar como texto': ['Copy as text', 'Copiar como texto'], 'Baixar como Word': ['Download as Word', 'Descargar como Word'],
    'Editar materiais': ['Edit materials', 'Editar materiales'], 'Rejeitar acesso': ['Reject access', 'Rechazar acceso'],
    'Motivo da rejeição': ['Rejection reason', 'Motivo del rechazo'], 'Como usar': ['How to use', 'Cómo usar'],
    'Informe seu e-mail corporativo antes de solicitar a troca de senha.': ['Enter your corporate email before requesting a password reset.', 'Ingrese su correo corporativo antes de solicitar el cambio de contraseña.'],
    'Informe um e-mail válido.': ['Enter a valid email address.', 'Ingrese un correo válido.'],
    'Não foi possível enviar o e-mail agora. Tente novamente.': ['The email could not be sent now. Please try again.', 'No fue posible enviar el correo ahora. Inténtelo nuevamente.'],
    'Introdução e preparação': ['Introduction and setup', 'Introducción y preparación'], 'Descoberta e engajamento': ['Discovery and engagement', 'Descubrimiento e interacción'],
    'Entrega de valor': ['Value delivery', 'Entrega de valor'], 'Tratamento de preocupações': ['Handling concerns', 'Gestión de inquietudes'],
    'Fechamento e próximos passos': ['Closing and next steps', 'Cierre y próximos pasos'],
    'O representante informou seu nome?': ['Did the representative state their name?', '¿El representante indicó su nombre?'],
    'O representante informou sua função?': ['Did the representative state their role?', '¿El representante indicó su función?'],
    'O representante mencionou sua ligação com a Microsoft?': ['Did the representative mention their Microsoft affiliation?', '¿El representante mencionó su vínculo con Microsoft?'],
    'O representante confirmou se o cliente tinha tempo disponível para a ligação?': ['Did the representative confirm the customer had time for the call?', '¿El representante confirmó que el cliente tenía tiempo para la llamada?'],
    'O representante explicou o objetivo da ligação e o valor que a Microsoft pode oferecer?': ['Did the representative explain the purpose of the call and the value Microsoft can provide?', '¿El representante explicó el objetivo de la llamada y el valor que Microsoft puede ofrecer?'],
    'O representante fez perguntas abertas para compreender as necessidades do cliente, seguindo uma abordagem consultiva Microsoft?': ['Did the representative ask open-ended questions to understand customer needs using a Microsoft consultative approach?', '¿El representante hizo preguntas abiertas para comprender las necesidades del cliente con un enfoque consultivo de Microsoft?'],
    'O representante ouviu ativamente e adaptou a conversa com base nas respostas do cliente?': ['Did the representative actively listen and adapt based on customer responses?', '¿El representante escuchó activamente y adaptó la conversación según las respuestas del cliente?'],
    'O representante construiu confiança e conexão, demonstrando uma atitude centrada no cliente?': ['Did the representative build trust and rapport with a customer-first attitude?', '¿El representante generó confianza y conexión con una actitud centrada en el cliente?'],
    'O representante manteve o controle da conversa enquanto promovia a colaboração?': ['Did the representative maintain control while promoting collaboration?', '¿El representante mantuvo el control de la conversación mientras promovía la colaboración?'],
    'As soluções Microsoft, como Azure, Microsoft 365 ou Dynamics 365, foram apresentadas naturalmente durante a conversa?': ['Were Microsoft solutions such as Azure, Microsoft 365 or Dynamics 365 introduced naturally?', '¿Las soluciones Microsoft, como Azure, Microsoft 365 o Dynamics 365, se presentaron de forma natural?'],
    'O representante demonstrou de forma eficaz como as soluções Microsoft atendem às necessidades específicas do negócio do cliente?': ["Did the representative effectively show how Microsoft solutions address the customer's business needs?", '¿El representante demostró eficazmente cómo las soluciones Microsoft responden a las necesidades del cliente?'],
    'A conversa foi alinhada às principais propostas de valor da Microsoft: segurança, escalabilidade e inovação?': ["Was the conversation aligned with Microsoft's core value propositions: security, scalability and innovation?", '¿La conversación se alineó con las propuestas de valor de Microsoft: seguridad, escalabilidad e innovación?'],
    'As informações técnicas foram comunicadas de maneira fácil de compreender?': ['Was technical information communicated clearly?', '¿La información técnica se comunicó de manera fácil de comprender?'],
    'O representante reconheceu e validou as objeções utilizando uma abordagem baseada em empatia?': ['Did the representative acknowledge and validate objections using an empathy-led approach?', '¿El representante reconoció y validó las objeciones con un enfoque basado en la empatía?'],
    'As objeções foram tratadas utilizando soluções Microsoft e histórias de sucesso relevantes?': ['Were objections addressed using Microsoft solutions and relevant success stories?', '¿Las objeciones se abordaron usando soluciones Microsoft y casos de éxito relevantes?'],
    'O representante resumiu os pontos principais e confirmou o entendimento mútuo?': ['Did the representative summarize key points and confirm mutual understanding?', '¿El representante resumió los puntos principales y confirmó el entendimiento mutuo?'],
    'Um próximo passo claro foi proposto e acordado?': ['Was a clear next step proposed and agreed upon?', '¿Se propuso y acordó un próximo paso claro?'],
    'O representante agradeceu o tempo do cliente e encerrou a conversa de maneira profissional?': ["Did the representative thank the customer and close professionally?", '¿El representante agradeció el tiempo del cliente y cerró profesionalmente?']
  };

  const placeholders = {
    'nome.sobrenome@empresa.com': ['name.surname@company.com', 'nombre.apellido@empresa.com'],
    'Digite a resposta...': ['Type the answer...', 'Escriba la respuesta...'],
    'Buscar na Biblioteca 360...': ['Search the 360 Library...', 'Buscar en la Biblioteca 360...'],
    'Buscar na matriz...': ['Search the matrix...', 'Buscar en la matriz...'], 'Nome do contato': ['Contact name', 'Nombre del contacto'],
    'Empresa do cliente': ["Customer's company", 'Empresa del cliente'], 'Informe o número da Lead': ['Enter the Lead number', 'Ingrese el número del Lead'],
    'Opcional': ['Optional', 'Opcional'], 'Ex.: Varejo, Finanças...': ['E.g.: Retail, Finance...', 'Ej.: Retail, Finanzas...'],
    'O foco desta conversa': ['The focus of this conversation', 'El foco de esta conversación'],
    'Digite ou selecione uma solução': ['Type or select a solution', 'Escriba o seleccione una solución']
  };

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let currentLanguage = localStorage.getItem('discovery_language') || 'pt';

  function translated(source, language) {
    if (language === 'pt' || !translations[source]) return source;
    return translations[source][language === 'en' ? 0 : 1] || source;
  }

  function translateTextNode(node) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const original = originalText.get(node);
    const trimmed = original.trim();
    const meetingCount = trimmed.match(/^(\d+) reuniões?$/i);
    if (meetingCount) {
      const count = Number(meetingCount[1]);
      node.nodeValue = original.replace(trimmed, t(count === 1 ? 'dashboard.meetingCount.one' : 'dashboard.meetingCount.many', { count: String(count) }));
      return;
    }
    if (!trimmed || !translations[trimmed]) return;
    node.nodeValue = original.replace(trimmed, translated(trimmed, currentLanguage));
  }

  function translateElement(element) {
    if (!(element instanceof Element) || element.closest('[data-no-translate], textarea, script, style')) return;
    const key = element.getAttribute('data-i18n');
    if (key && keyedCatalog[key]) {
      const value = keyedCatalog[key][currentLanguage] || keyedCatalog[key].pt;
      if (element.textContent !== value) element.textContent = value;
    }
    element.childNodes.forEach((node) => { if (node.nodeType === Node.TEXT_NODE) translateTextNode(node); });
    ['placeholder', 'title', 'aria-label'].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      let saved = originalAttributes.get(element) || {};
      if (!saved[attribute]) saved[attribute] = element.getAttribute(attribute);
      originalAttributes.set(element, saved);
      const source = saved[attribute];
      const table = attribute === 'placeholder' ? placeholders : translations;
      const entry = table[source];
      element.setAttribute(attribute, currentLanguage === 'pt' || !entry ? source : entry[currentLanguage === 'en' ? 0 : 1]);
    });
  }

  function applyLanguage(language) {
    currentLanguage = languages[language] ? language : 'pt';
    localStorage.setItem('discovery_language', currentLanguage);
    document.documentElement.lang = languages[currentLanguage].locale;
    document.querySelectorAll('.language-selector').forEach((select) => { select.value = currentLanguage; });
    translateElement(document.body);
    document.body.querySelectorAll('*').forEach(translateElement);
    window.dispatchEvent(new CustomEvent('discovery:language-changed', { detail: { language: currentLanguage, locale: languages[currentLanguage].locale } }));
  }

  function createSelector(className) {
    const wrapper = document.createElement('label');
    wrapper.className = `language-control ${className}`;
    wrapper.innerHTML = `<span aria-hidden="true">🌐</span><span class="sr-only">Idioma</span><select class="language-selector" aria-label="Idioma"><option value="pt">Português</option><option value="en">English</option><option value="es">Español</option></select>`;
    wrapper.querySelector('select').addEventListener('change', (event) => applyLanguage(event.target.value));
    return wrapper;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const meta = document.querySelector('.topbar-meta');
    if (meta) meta.prepend(createSelector('header-language-control'));
    const loginForm = document.querySelector('.login-form');
    if (loginForm) loginForm.prepend(createSelector('login-language-control'));
    applyLanguage(currentLanguage);
    new MutationObserver((mutations) => mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) { translateElement(node); node.querySelectorAll('*').forEach(translateElement); }
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
    }))).observe(document.body, { childList: true, subtree: true });
  });

  function t(key, variables = {}) {
    const item = keyedCatalog[key];
    const template = item ? (item[currentLanguage] || item.pt) : translated(key, currentLanguage);
    return Object.entries(variables).reduce((value, [name, replacement]) => value.replaceAll(`{${name}}`, replacement), template);
  }
  window.DiscoveryI18n = { setLanguage: applyLanguage, getLanguage: () => currentLanguage, getLocale: () => languages[currentLanguage].locale, t };
  window.t = t;
}());
