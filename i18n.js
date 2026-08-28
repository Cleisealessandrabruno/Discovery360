(function () {
  const languages = {
    pt: { label: 'Português', locale: 'pt-BR' },
    en: { label: 'English', locale: 'en-US' },
    es: { label: 'Español', locale: 'es-ES' }
  };

  const translations = {
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
    'Buscar na Biblioteca 360...': ['Search the 360 Library...', 'Buscar en la Biblioteca 360...']
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
    if (!trimmed || !translations[trimmed]) return;
    node.nodeValue = original.replace(trimmed, translated(trimmed, currentLanguage));
  }

  function translateElement(element) {
    if (!(element instanceof Element) || element.closest('[data-no-translate], textarea, script, style')) return;
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

  window.DiscoveryI18n = { setLanguage: applyLanguage, getLanguage: () => currentLanguage, getLocale: () => languages[currentLanguage].locale, t: (text) => translated(text, currentLanguage) };
}());
