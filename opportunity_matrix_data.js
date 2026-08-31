const OPPORTUNITY_MATRIX = [
  { sinal: 'M365 + muitos usuários + pouco ou nenhum Copilot', abordagem: 'Expansão do Copilot', tipo: 'UPSELL / EXPANSION', en: ['M365 + many users + little or no Copilot', 'Copilot expansion'], es: ['M365 + muchos usuarios + poco o ningún Copilot', 'Expansión de Copilot'] },
  { sinal: 'Business Basic/Standard + necessidades de segurança/dispositivos', abordagem: 'Business Premium', tipo: 'UPSELL', en: ['Business Basic/Standard + security/device needs', 'Business Premium'], es: ['Business Basic/Standard + necesidades de seguridad/dispositivos', 'Business Premium'] },
  { sinal: 'M365 + lacunas de endpoint/segurança', abordagem: 'Defender / Intune / Entra', tipo: 'CROSS-SELL', en: ['M365 + endpoint/security gaps', 'Defender / Intune / Entra'], es: ['M365 + brechas de endpoint/seguridad', 'Defender / Intune / Entra'] },
  { sinal: 'Dados confidenciais + necessidades de governança/conformidade', abordagem: 'Purview', tipo: 'CROSS-SELL', en: ['Sensitive data + governance/compliance needs', 'Purview'], es: ['Datos confidenciales + necesidades de gobierno/cumplimiento', 'Purview'] },
  { sinal: 'Muitos fluxos de trabalho manuais', abordagem: 'Power Automate', tipo: 'CROSS-SELL', en: ['Many manual workflows', 'Power Automate'], es: ['Muchos flujos de trabajo manuales', 'Power Automate'] },
  { sinal: 'Excel/relatórios manuais', abordagem: 'Power BI', tipo: 'CROSS-SELL', en: ['Excel/manual reporting', 'Power BI'], es: ['Excel/informes manuales', 'Power BI'] },
  { sinal: 'Power BI + ambiente de dados complexo', abordagem: 'Fabric / Azure', tipo: 'CROSS-SELL / MODERNIZATION', en: ['Power BI + complex data environment', 'Fabric / Azure'], es: ['Power BI + entorno de datos complejo', 'Fabric / Azure'] },
  { sinal: 'Amplo ambiente local + pressão por escalabilidade', abordagem: 'Azure', tipo: 'MODERNIZATION', en: ['Large on-premises environment + scalability pressure', 'Azure'], es: ['Amplio entorno local + presión de escalabilidad', 'Azure'] },
  { sinal: 'AWS + cargas de trabalho Microsoft / complexidade multicloud', abordagem: 'Azure', tipo: 'MODERNIZATION', en: ['AWS + Microsoft workloads / multicloud complexity', 'Azure'], es: ['AWS + cargas de trabajo Microsoft / complejidad multicloud', 'Azure'] },
  { sinal: 'Iniciativa de IA + necessidade de agentes personalizados', abordagem: 'Copilot Studio / Agents / Azure', tipo: 'CROSS-SELL', en: ['AI initiative + need for custom agents', 'Copilot Studio / Agents / Azure'], es: ['Iniciativa de IA + necesidad de agentes personalizados', 'Copilot Studio / Agents / Azure'] },
  { sinal: 'Copilot adotado por um pequeno grupo', abordagem: 'Expansão do Copilot', tipo: 'EXPANSION', en: ['Copilot adopted by a small group', 'Copilot expansion'], es: ['Copilot adoptado por un grupo pequeño', 'Expansión de Copilot'] },
  { sinal: 'Muitos desenvolvedores / backlog / código legado', abordagem: 'GitHub Copilot', tipo: 'CROSS-SELL', en: ['Many developers / backlog / legacy code', 'GitHub Copilot'], es: ['Muchos desarrolladores / backlog / código heredado', 'GitHub Copilot'] },
  { sinal: 'CRM fragmentado / pipeline no Excel', abordagem: 'Dynamics 365 Sales', tipo: 'MODERNIZATION', en: ['Fragmented CRM / pipeline in Excel', 'Dynamics 365 Sales'], es: ['CRM fragmentado / pipeline en Excel', 'Dynamics 365 Sales'] },
  { sinal: 'Atendimento ao cliente de alto volume', abordagem: 'Dynamics 365 Customer Service', tipo: 'MODERNIZATION', en: ['High-volume customer service', 'Dynamics 365 Customer Service'], es: ['Atención al cliente de alto volumen', 'Dynamics 365 Customer Service'] },
  { sinal: 'Servidores de arquivos / documentos dispersos', abordagem: 'SharePoint / OneDrive', tipo: 'MODERNIZATION', en: ['File servers / scattered documents', 'SharePoint / OneDrive'], es: ['Servidores de archivos / documentos dispersos', 'SharePoint / OneDrive'] },
  { sinal: 'Muitos dispositivos / força de trabalho híbrida', abordagem: 'Intune', tipo: 'CROSS-SELL', en: ['Many devices / hybrid workforce', 'Intune'], es: ['Muchos dispositivos / fuerza laboral híbrida', 'Intune'] },
  { sinal: 'Complexidade de identidade/acesso', abordagem: 'Entra', tipo: 'CROSS-SELL', en: ['Identity/access complexity', 'Entra'], es: ['Complejidad de identidad/acceso', 'Entra'] },
  { sinal: 'Vários consoles de segurança', abordagem: 'Defender', tipo: 'CONSOLIDATION', en: ['Multiple security consoles', 'Defender'], es: ['Varias consolas de seguridad', 'Defender'] },
  { sinal: 'Aplicativos legados', abordagem: 'GitHub Copilot + Azure', tipo: 'MODERNIZATION', en: ['Legacy applications', 'GitHub Copilot + Azure'], es: ['Aplicaciones heredadas', 'GitHub Copilot + Azure'] },
  { sinal: 'Teams usado principalmente para reuniões', abordagem: 'Teams + Copilot', tipo: 'ADOPTION / EXPANSION', en: ['Teams used mainly for meetings', 'Teams + Copilot'], es: ['Teams usado principalmente para reuniones', 'Teams + Copilot'] }
];

function getOpportunityMatrix(language = 'pt') {
  return OPPORTUNITY_MATRIX.map((row) => language === 'pt' ? row : ({ ...row, sinal: row[language]?.[0] || row.sinal, abordagem: row[language]?.[1] || row.abordagem }));
}
window.getOpportunityMatrix = getOpportunityMatrix;
