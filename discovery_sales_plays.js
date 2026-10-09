window.additionalSalesPlays = [
  {
    id: 26,
    titulo: 'Cloud Dark — Discovery de Infraestrutura',
    gatilho: 'Pouca ou nenhuma informação sobre a infraestrutura do cliente; descubra o ambiente atual e formule uma hipótese de oportunidade.',
    categoria: ['MODERNIZATION', 'DISCOVERY'],
    solucao_potencial: 'Azure e modernização de infraestrutura',
    sinais_alto_potencial: 'Fim de suporte, limitação de capacidade, dificuldade de controlar custos, investimento previsto em hardware, necessidade de disaster recovery ou workloads bloqueados no ambiente atual.',
    orientacao_clm: 'Use este roteiro quando o ambiente ainda for desconhecido. Explore localização, provedor, workloads, escala, dores e gatilhos antes de propor uma solução. O objetivo é sair de Cloud Dark com uma hipótese validada e um próximo passo com o time técnico.',
    situacao: [
      { id: 'cloud-dark-sit-1', text: 'Onde estão hospedadas hoje as principais aplicações e sistemas da empresa: ambiente próprio, datacenter de terceiros, cloud ou uma combinação desses ambientes?', objetivo: 'Localização da infraestrutura' },
      { id: 'cloud-dark-sit-2', text: 'Vocês utilizam atualmente algum provedor de nuvem, como AWS, Google Cloud, Oracle ou outro?', objetivo: 'Concorrente / multicloud' },
      { id: 'cloud-dark-sit-3', text: 'Quais são hoje as principais cargas de trabalho que sustentam a operação da empresa?', objetivo: 'Workloads' },
      { id: 'cloud-dark-sit-4', text: 'A maior parte dos servidores é física, virtualizada ou já está em cloud?', objetivo: 'Arquitetura atual' },
      { id: 'cloud-dark-sit-5', text: 'Vocês conseguem estimar quantos servidores, VMs ou aplicações críticas possuem atualmente?', objetivo: 'Tamanho potencial' },
      { id: 'cloud-dark-sit-6', text: 'Quem é responsável hoje pelas decisões relacionadas à infraestrutura e cloud?', objetivo: 'Stakeholders' }
    ],
    problema: [
      { id: 'cloud-dark-prob-1', text: 'Quais são hoje os maiores desafios na gestão dessa infraestrutura?', objetivo: 'Dor principal' },
      { id: 'cloud-dark-prob-2', text: 'Existem dificuldades relacionadas a capacidade, performance, disponibilidade ou crescimento do ambiente?', objetivo: 'Dor técnica' },
      { id: 'cloud-dark-prob-3', text: 'Há equipamentos, sistemas operacionais ou aplicações chegando ao fim de suporte ou precisando de modernização?', objetivo: 'Gatilho de modernização' },
      { id: 'cloud-dark-prob-4', text: 'Existem aplicações que a empresa gostaria de modernizar, mas que continuam no ambiente atual por alguma limitação?', objetivo: 'Modernização' },
      { id: 'cloud-dark-prob-5', text: 'Hoje vocês têm dificuldade para prever ou controlar os custos de infraestrutura?', objetivo: 'Oportunidade financeira' },
      { id: 'cloud-dark-prob-6', text: 'Backup e Disaster Recovery são hoje uma preocupação para o negócio?', objetivo: 'BCDR' }
    ],
    implicacao: [
      { id: 'cloud-dark-imp-1', text: 'Quando há necessidade de aumentar capacidade, quanto tempo leva para disponibilizar novos recursos?', objetivo: 'Impacto da infraestrutura' },
      { id: 'cloud-dark-imp-2', text: 'Se uma aplicação crítica ficar indisponível, qual é o impacto para a operação ou para os clientes?', objetivo: 'Criticidade / impacto financeiro' },
      { id: 'cloud-dark-imp-3', text: 'O modelo atual de infraestrutura está limitando algum projeto de crescimento, dados, automação ou IA?', objetivo: 'Pipeline adicional' },
      { id: 'cloud-dark-imp-4', text: 'Se o ambiente continuar crescendo da forma atual, vocês esperam aumento significativo de custo ou complexidade nos próximos 12–24 meses?', objetivo: 'Urgência' },
      { id: 'cloud-dark-imp-5', text: 'Existe algum investimento relevante em hardware ou renovação de contratos previsto para os próximos 12 meses?', objetivo: 'Evento de negócio' }
    ],
    need_payoff: [
      { id: 'cloud-dark-pay-1', text: 'Se vocês pudessem reduzir a necessidade de investimento em infraestrutura física e ganhar capacidade sob demanda, isso teria valor para o negócio?', objetivo: 'Fit para cloud' },
      { id: 'cloud-dark-pay-2', text: 'Quais workloads vocês considerariam avaliar primeiro em uma estratégia de cloud ou ambiente híbrido?', objetivo: 'Primeiro workload' },
      { id: 'cloud-dark-pay-3', text: 'Se fizéssemos uma avaliação do ambiente atual para identificar oportunidades de modernização, redução de custos e ganho de escala, faria sentido envolver o time técnico de vocês?', objetivo: 'Próximo passo' }
    ]
  },
  {
    id: 27,
    titulo: 'Rooms of the House',
    gatilho: 'Discovery transversal para entender prioridades do negócio e explorar diferentes ambientes da operação.',
    categoria: ['DISCOVERY'],
    solucao_potencial: 'Sales Plays Microsoft alinhados às necessidades do cliente',
    sinais_alto_potencial: 'M365 sem Copilot; arquivos dispersos; lacunas de segurança, identidade, dados ou conformidade; infraestrutura local sob pressão; relatórios manuais; processos dependentes de planilhas; backlog de desenvolvimento.',
    orientacao_clm: 'Comece pela planta da casa: entenda as prioridades do negócio antes de entrar nos ambientes. Transição sugerida: “Para eu entender o cenário completo, posso passar rapidamente por algumas áreas da operação? Assim a gente vê onde estão os maiores ganhos.” Explore somente os ambientes pertinentes e encerre priorizando uma próxima conversa. Sinais podem direcionar para: M365 → Copilot; Copilot → Expansão; arquivos → SharePoint; Teams → Colaboração/Copilot; Business Premium; Defender / Intune; Entra; Consolidação Defender; Windows; Purview; Azure; AWS → Azure; GitHub Copilot + Azure; Power BI; Fabric; Azure AI; Agentes personalizados; Power Automate; Copilot Studio; Dynamics 365 Sales ou Customer Service.',
    abertura_fala: 'Olá, {cliente}. Eu sou {clm}, do time Microsoft. Obrigado por reservar este tempo. Quero entender as prioridades da {empresa} e o papel da tecnologia nelas. Sugiro começarmos pelo contexto do negócio e, depois, passarmos pelas áreas que fizerem sentido. Ao final, priorizamos um tema e combinamos o próximo passo. Tudo bem?',
    abertura_transicao: 'Para eu entender o cenário completo, posso passar rapidamente por algumas áreas da operação? Assim a gente vê onde estão os maiores ganhos.',
    abertura: [
      { id: 'rooms-open-1', text: 'Quais são as três prioridades da empresa para os próximos 12 meses?', ambiente: 'A planta da casa' },
      { id: 'rooms-open-2', text: 'Existe alguma iniciativa estratégica que esteja ocupando mais a liderança agora: crescimento, expansão, eficiência, aquisição?', ambiente: 'A planta da casa' },
      { id: 'rooms-open-3', text: 'Se a tecnologia pudesse destravar uma dessas prioridades amanhã, qual seria?', ambiente: 'A planta da casa' },
      { id: 'rooms-open-4', text: 'Como as decisões de tecnologia são tomadas aqui? Quem participa?', ambiente: 'A planta da casa' }
    ],
    situacao: [
      { id: 'rooms-mw-sit-1', text: 'Como as equipes colaboram no dia a dia: e-mail, Teams, arquivos compartilhados?', ambiente: 'Ambiente 1 · Produtividade e colaboração' },
      { id: 'rooms-mw-sit-2', text: 'Onde ficam hoje os documentos da empresa: servidor de arquivos, SharePoint, outra ferramenta?', ambiente: 'Ambiente 1 · Produtividade e colaboração' },
      { id: 'rooms-security-sit-1', text: 'Como vocês controlam hoje o acesso de usuários, terceiros e trabalho remoto?', ambiente: 'Ambiente 2 · Segurança e identidade' },
      { id: 'rooms-security-sit-2', text: 'Quantas ferramentas ou consoles de segurança a equipe administra?', ambiente: 'Ambiente 2 · Segurança e identidade' },
      { id: 'rooms-data-sit-1', text: 'A empresa lida com dados sensíveis: clientes, financeiros, saúde, dados pessoais (LGPD)?', ambiente: 'Ambiente 3 · Governança de dados e conformidade' },
      { id: 'rooms-infra-sit-1', text: 'Quais sistemas ainda rodam em data center próprio e por quê?', ambiente: 'Ambiente 4 · Infraestrutura e aplicações (Azure)' },
      { id: 'rooms-infra-sit-2', text: 'Vocês usam alguma nuvem hoje? Qual, e para quê?', ambiente: 'Ambiente 4 · Infraestrutura e aplicações (Azure)' },
      { id: 'rooms-ai-sit-1', text: 'Como os gestores acompanham os indicadores hoje: Excel, relatórios manuais, Power BI?', ambiente: 'Ambiente 5 · Dados, análise e IA' },
      { id: 'rooms-ai-sit-2', text: 'A empresa já usa alguma ferramenta de IA, oficial ou não?', ambiente: 'Ambiente 5 · Dados, análise e IA' },
      { id: 'rooms-apps-sit-1', text: 'Quais processos ainda dependem de planilha, e-mail ou aprovação manual?', ambiente: 'Ambiente 6 · Processos e aplicações de negócio' },
      { id: 'rooms-apps-sit-2', text: 'Como a área comercial gerencia clientes e pipeline? E o atendimento?', ambiente: 'Ambiente 6 · Processos e aplicações de negócio' },
      { id: 'rooms-dev-sit-1', text: 'Vocês têm time de desenvolvimento interno ou terceirizado? De que tamanho?', ambiente: 'Ambiente 7 · Desenvolvimento' }
    ],
    problema: [
      { id: 'rooms-mw-prob-1', text: 'Que tarefas de redação, análise ou preparação de reuniões mais geram retrabalho?', ambiente: 'Ambiente 1 · Produtividade e colaboração' },
      { id: 'rooms-mw-prob-2', text: 'O Teams é usado só para reuniões ou também para trabalho em equipe e processos?', ambiente: 'Ambiente 1 · Produtividade e colaboração' },
      { id: 'rooms-security-prob-1', text: 'Já tiveram incidente ou tentativa de phishing, ransomware ou vazamento de dados?', ambiente: 'Ambiente 2 · Segurança e identidade' },
      { id: 'rooms-security-prob-2', text: 'Como os dispositivos (notebooks, celulares) são gerenciados e protegidos?', ambiente: 'Ambiente 2 · Segurança e identidade' },
      { id: 'rooms-data-prob-1', text: 'Hoje vocês sabem onde estão os dados confidenciais e quem tem acesso a eles?', ambiente: 'Ambiente 3 · Governança de dados e conformidade' },
      { id: 'rooms-infra-prob-1', text: 'Há servidores ou contratos de hardware perto do fim da vida útil?', ambiente: 'Ambiente 4 · Infraestrutura e aplicações (Azure)' },
      { id: 'rooms-infra-prob-2', text: 'Existem aplicações legadas difíceis ou caras de manter?', ambiente: 'Ambiente 4 · Infraestrutura e aplicações (Azure)' },
      { id: 'rooms-ai-prob-1', text: 'Quanto tempo leva para montar um relatório gerencial? Os números batem entre as áreas?', ambiente: 'Ambiente 5 · Dados, análise e IA' },
      { id: 'rooms-ai-prob-2', text: 'A liderança já discute uma estratégia de IA? O que trava a evolução?', ambiente: 'Ambiente 5 · Dados, análise e IA' },
      { id: 'rooms-apps-prob-1', text: 'Onde ficam os gargalos: aprovações, cadastros, retrabalho entre áreas?', ambiente: 'Ambiente 6 · Processos e aplicações de negócio' },
      { id: 'rooms-apps-prob-2', text: 'As informações de cliente estão num único lugar ou espalhadas?', ambiente: 'Ambiente 6 · Processos e aplicações de negócio' },
      { id: 'rooms-dev-prob-1', text: 'Existe backlog acumulado ou código legado que trava novos projetos?', ambiente: 'Ambiente 7 · Desenvolvimento' }
    ],
    implicacao: [
      { id: 'rooms-mw-imp-1', text: 'Quanto tempo as equipes perdem procurando informação ou refazendo trabalho?', ambiente: 'Ambiente 1 · Produtividade e colaboração' },
      { id: 'rooms-security-imp-1', text: 'Qual seria o impacto para o negócio se um acesso indevido parasse a operação por um dia?', ambiente: 'Ambiente 2 · Segurança e identidade' },
      { id: 'rooms-data-imp-1', text: 'O que aconteceria numa auditoria ou num vazamento: multa, perda de cliente, risco de reputação?', ambiente: 'Ambiente 3 · Governança de dados e conformidade' },
      { id: 'rooms-infra-imp-1', text: 'Qual seria o impacto de uma falha prolongada no data center?', ambiente: 'Ambiente 4 · Infraestrutura e aplicações (Azure)' },
      { id: 'rooms-ai-imp-1', text: 'Que decisões são tomadas com atraso ou com informação incompleta?', ambiente: 'Ambiente 5 · Dados, análise e IA' },
      { id: 'rooms-apps-imp-1', text: 'Quanto custa, em tempo ou em oportunidades perdidas, esse processo manual?', ambiente: 'Ambiente 6 · Processos e aplicações de negócio' },
      { id: 'rooms-dev-imp-1', text: 'Quanto esse backlog atrasa iniciativas do negócio?', ambiente: 'Ambiente 7 · Desenvolvimento' }
    ],
    need_payoff: [
      { id: 'rooms-mw-pay-1', text: 'Se as pessoas acelerassem essas atividades nas ferramentas que já usam, onde estaria o maior valor?', ambiente: 'Ambiente 1 · Produtividade e colaboração' },
      { id: 'rooms-security-pay-1', text: 'Se a segurança ficasse mais simples de gerir e mais integrada, o que a equipe faria com o tempo ganho?', ambiente: 'Ambiente 2 · Segurança e identidade' },
      { id: 'rooms-data-pay-1', text: 'Ter visibilidade e controle desses dados ajudaria a liberar o uso de IA com mais segurança?', ambiente: 'Ambiente 3 · Governança de dados e conformidade' },
      { id: 'rooms-infra-pay-1', text: 'Se a infraestrutura acompanhasse a demanda, quais projetos andariam mais rápido?', ambiente: 'Ambiente 4 · Infraestrutura e aplicações (Azure)' },
      { id: 'rooms-ai-pay-1', text: 'Se os dados estivessem confiáveis e disponíveis em tempo real, que decisão mudaria primeiro?', ambiente: 'Ambiente 5 · Dados, análise e IA' },
      { id: 'rooms-apps-pay-1', text: 'Se esse processo fosse automatizado, quem seria mais beneficiado?', ambiente: 'Ambiente 6 · Processos e aplicações de negócio' },
      { id: 'rooms-dev-pay-1', text: 'Se o time entregasse mais rápido, qual projeto sairia primeiro?', ambiente: 'Ambiente 7 · Desenvolvimento' },
      { id: 'rooms-close-1', text: 'De tudo o que conversamos, qual ambiente é o mais urgente para vocês?', ambiente: 'Fechamento · priorizar a casa' },
      { id: 'rooms-close-2', text: 'Esse tema tem prioridade para os próximos meses? Existe previsão de investimento?', ambiente: 'Fechamento · priorizar a casa' },
      { id: 'rooms-close-3', text: 'Quem mais deveria participar da próxima conversa sobre esse tema?', ambiente: 'Fechamento · priorizar a casa' },
      { id: 'rooms-close-4', text: 'Faz sentido montarmos juntos um roadmap de 0 a 3, 3 a 6 e 6 a 12 meses?', ambiente: 'Fechamento · priorizar a casa' }
    ]
  }
];
