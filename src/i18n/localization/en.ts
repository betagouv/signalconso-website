import {formatDistance, formatDuration as formatDurationFns} from 'date-fns'
import {AppLang, AppLangs} from './AppLangs'

const invalidDate = '-'

const isDateValid = (d?: Date): boolean => {
  return !!d && d instanceof Date && !isNaN(d.getTime())
}

const formatDate = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return d!.toLocaleDateString()
}

const formatTime = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return d!.toLocaleTimeString()
}

const formatDateTime = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return formatDate(d) + ' ' + formatTime(d)
}

const dateFromNow = (d?: Date): string | undefined => {
  return d ? formatDistance(d, new Date(), {addSuffix: true}) : undefined
}

const formatLargeNumber = (n?: number): string => {
  return n !== undefined && n !== null ? n.toLocaleString('fr-FR') : '-'
}

const formatDuration = formatDurationFns

const currentLang: AppLang = AppLangs.en

export const en = {
  formatDate,
  formatTime,
  formatDateTime,
  dateFromNow,
  formatDuration,
  formatLargeNumber,
  messages: {
    titleAndDescriptions: {
      cookies: {
        title: 'Cookie Policy',
        description: 'Description of the cookie policy',
      },
      appMobile: {
        // TODO
        title: '',
        description: '',
      },
      commentCaMarche: {
        title: 'How does it work? - SignalConso',
        description:
          'You report your problem by filling out the online form. Our team contacts the company to inform them of your report. The company may make necessary corrections spontaneously, without any penalties. Your report is recorded by the Directorate General for Competition, Consumer Affairs and Fraud Control (DGCCRF).',
      },
      accessibilite: {
        title: 'Accessibility - SignalConso',
        description: 'SignalConso Accessibility Report',
      },
      contact: {
        title: 'Contact - SignalConso',
        description: 'Contact SignalConso',
      },
      contractualDispute: {
        title: 'Resolution of an individual problem (dispute) - SignalConso',
        description: 'Steps recommended by SignalConso to resolve an individual problem (dispute) with a company',
      },
      quiSommesNous: {
        title: 'Who are we? - SignalConso',
        description:
          'SignalConso is a service provided by the Directorate General for Competition, Consumer Affairs and Fraud Control (DGCCRF) through a State Startup. It allows consumers to understand their rights and get assistance in enforcing them.',
      },
      aide: {
        title: 'Help - SignalConso',
        description: 'Check the help and frequently asked questions about SignalConso',
      },
      suiviEtViePrivee: {
        title: 'Audience tracking and privacy - SignalConso',
        description: 'Find information about audience tracking and privacy protection on SignalConso',
      },
      planDuSite: {
        title: 'Site Map - SignalConso',
        description: 'Site map',
      },
      delaiRetractation: {
        title: 'Withdrawal Period - SignalConso',
        description: `Calculate your legal withdrawal period following a purchase or the signing of a contract`,
      },
      conditionsGeneralesUtilisation: {
        title: 'General Terms of Use - SignalConso',
        description: 'Check the general terms of use',
      },
      stats: {
        title: 'Statistics - SignalConso',
        description: 'View the statistics of SignalConso',
      },
      homepage: {
        title: 'SignalConso, a public service for consumers',
        description:
          'Report a problem to the merchant (stores, local businesses, cafes and restaurants...) and to the fraud control authority: hygiene practices, food/drinks, equipment/items, pricing/payment, advertising, services related to the purchase.',
      },
      anomaly: {
        title: 'Hierarchy - SignalConso',
        description: 'Hierarchy of a report submission',
      },
      actualites: {
        title: 'News - SignalConso',
        description: 'News and updates from the SignalConso website and the fraud control authority',
      },
    },
    introApple: 'App Store',
    introBetween: 'or ',
    introGoogle: 'Play Store',
    articleAppMobile: {
      capturesEcran: 'Application screenshots',
      intro1:
        "Discover the new SignalConso mobile application, which makes your consumer reports even easier and simplifies your procedures. Download the application for free on the'",
      intro2: 'and enjoy the same features as those offered by our website.',
      fonctionnalites:
        'With this application, you can quickly report any problem related to your consumption (delivery, price, quality, contract, etc.) and obtain information about your rights in just a few clicks.',
      statistiques:
        'With more than 320,000 users and more than 500,000 reports since its launch in 2020 by Bruno Le Maire, Minister of Economy, Finance and Industrial and Digital Sovereignty, SignalConso has met consumer expectations. In the last 12 months alone, no less than 195,000 reports have been filed, including 75,000 for online purchases, 23,000 for in-store purchases, 18,000 for renovation work and 14,000 related to travel and leisure. Websites account for more than 43% of reports, covering issues such as product quality, delivery times, warranty conditions, withdrawal or refund conditions, as well as legal notice defects.',
      accessibilite:
        'SignalConso is an easily accessible application that meets a real need for daily consumer dispute resolution. Even if not all consumers see their problems resolved, 8 out of 10 recommend SignalConso on Services Publics + , the platform dedicated to improving public services.',
      cta: "Don't wait any longer , put SignalConso in your pocket and assert your rights as a consumer with ease!",
      banner: 'SignalConso presentation banner',
    },
    cookies: {
      gestionTitre: 'Cookie management',
      banniereTitre: 'This online interface does not display a cookie consent banner, why?',
      banniereContenu:
        'It is true, you did not have to click on a block that covers half of the page to say that you agree to the deposit of cookies - even if you do not know what it means!',
      respectLoiContenu:
        'Nothing exceptional, no special treatment related to a .gouv.fr. We simply respect the law, which says that certain audience tracking tools, properly configured to respect privacy, are exempt from prior authorization.',
      cookiesTechniquesTitre: 'The technical cookies we set allow us to:',
      cookiesTechniquesContenu:
        'Obtain anonymous statistics on the use of the online interface (any software or application, including a website, a section of a website or a mobile application) in order to analyze content and detect any navigation problems;',
      definitionTitre: 'Cookies',
      definition:
        "Definition: A cookie is a small text file saved by your computer's browser, tablet or smartphone. The cookie, saved on your computer when you consult the SignalConso online interface, allows you to store user data described below in order to facilitate navigation and enable certain features.",
      natureTitre: 'Nature of cookies deposited on the SignalConso online interface:',
      natureContenu:
        'We only use technical cookies that allow and facilitate your navigation. Some are essential and cannot be deleted without seriously affecting access to the online interface and navigation, while others would result in degraded navigation.',
      listeTitre: 'List of cookies deposited',
      listeDescription: 'Audience measurement analysis cookies (Eulerian / Matomo):',
      nomCookie: 'Cookie name',
      finalite: 'Purpose',
      dureeConservation: 'Duration of conservation',
      finaliteEulerian: 'Eulerian cookie',
      dureeConservationEulerian: '13 months',
      finaliteMatomo: 'Matomo',
      finaliteSC: 'Website selected language',
      dureeConservationLang: 'unlimited',
      dureeConservationMatomo1: '13 months',
      dureeConservationMatomo2: '6 months',
      dureeConservationMatomo3: '30 minutes',
      mieuxServirContenu:
        'In order to better serve you and improve the user experience on our online interface, we measure its audience using a solution that uses cookie technology.',
      donneesCollecteesContenu:
        'The data collected makes it possible to provide only anonymous statistical data on attendance (the number of pages viewed, the number of visits, their frequency of return, etc.).',
      outilEulerian:
        "We use the Eulerian audience measurement tool. This tool is exempt from collecting the user's consent regarding the deposit of Analytics cookies, the French data protection authority (CNIL) having granted an exemption to Eulerian's Web Analytics cookie ",
      outilEulerianLink: 'learn more',
      anonymisation:
        'None of the personal data is exploited by the SignalConso online interface. This means that your IP address, for example, is anonymized before being recorded. It is therefore impossible to associate your visits to this online interface with your person.',
      cookiesEulerian:
        'The names of the cookies used are for Eulerian Etuix. Their duration of conservation is 13 months. They are not transferred to third parties or used for other purposes.',
      outilMatomo:
        "The same is true for Matomo's audience measurement tool, which allows you to keep a history of anonymous statistical data on attendance collected since the launch of SignalConso",
      cookiesMatomo:
        'The names of the cookies used are for Matomo _pk_session, _pk_id, _pk_ref. Their duration ranges from 30 minutes to 13 months. They are not transferred to third parties or used for other purposes.',
      renseignementsSuiviAudience:
        'For more information on privacy management on Signal Conso, you can also consult the section ',
      renseignementsSuiviAudienceLink: 'audience tracking and privacy',
      accepterRefuserTitre: 'How to accept or refuse cookies:',
      parametrerNavigateurContenu1:
        'You have the option of configuring your browser to delete cookies already installed on your device, to be prompted to accept or refuse the installation of cookies on a case-by-case basis, or to automatically accept or refuse all cookies for certain online interfaces or for all online interfaces. However, refusing to use cookies may prevent certain features of the online interface from working.',
      parametrerNavigateurContenu2:
        'Cookie management settings vary depending on the browser. Instructions on this subject for the most common browsers are available by clicking on the links below:',
      internetExplorer: 'Internet Explorer',
      internetExplorerInstructions:
        'In Internet Explorer, click the Tools button, then click Internet Options. On the General tab, under Browsing history, click Settings. Click the View files button. Click the Name column header to sort all files in alphabetical order, and then browse through the list until you see files that begin with the prefix "Cookie". (all cookies have this prefix and usually contain the name of the web online interface that created the cookie). Select the cookie(s) containing the name "to be completed" and delete them. Close the window that contains the list of files, and then click OK twice to return to Internet Explorer.',
      edge: 'Microsoft Edge',
      chrome: 'Google Chrome',
      chromeInstructions:
        'Open Google Chrome. In the browser toolbar, click More. Point to More tools, and then click Clear browsing data. In the "Clear browsing data" window, select the Cookies and other site data and Cached images and files checkboxes. Use the menu at the top to select the amount of data you want to delete. Select Beginning of time to delete everything. Click Clear browsing data.',
      firefox: 'Mozilla Firefox',
      firefoxInstructions:
        'Go to the "Tools" tab of the browser and select the "Options" menu In the window that appears, choose "Privacy" and click "delete specific cookies" Locate the files that contain the name "to be completed". Select them and delete them.',
      safari: 'Safari',
      safariInstructions:
        'In your browser, choose Edit > Preferences. Click Security. Click Show Cookies. Select the cookies that contain the name "to be completed" and click Delete or Delete All. After deleting cookies, click Done.',
      plusRenseignementsCNIL: 'For more information on cookies and how to configure your browser, you can also consult ',
      plusRenseignementsCNILLink: 'the CNIL online interface',
    },
    appMobile: {
      pageTitle: 'SignalConso, now available on mobile application!',
      introText1:
        "Discover the new SignalConso mobile application, which makes your consumer reports even easier and simplifies your procedures. Download the application for free on the'",
      introText2: 'and enjoy the same features as those offered by our website.',
      featureText:
        'With this application, you can quickly report any problem related to your consumption (delivery, price, quality, contract, etc.) and get information about your rights in just a few clicks.',
      statisticsText:
        'With more than 320,000 users and more than 500,000 reports since its launch in 2020 by Bruno Le Maire, Minister of Economy, Finance and Industrial and Digital Sovereignty, SignalConso has met consumer expectations. In the last 12 months alone, no less than 195,000 reports have been filed, including 75,000 for online purchases, 23,000 for in-store purchases, 18,000 for renovation work and 14,000 related to travel and leisure. Websites account for more than 43% of reports, covering issues such as product quality, delivery times, warranty conditions, retraction or refund conditions, as well as legal notice defects, etc.',
      accessibilityText:
        'SignalConso is an easily accessible application that meets a real need for resolving daily consumer disputes. Even if not all consumers see their problems resolved, 8 out of 10 recommend SignalConso on Services Publics +, the platform dedicated to improving public services.',
      conclusionText:
        "Don't wait any longer, put SignalConso in your pocket and assert your rights as a consumer with confidence!",
      screenshotsAlt: 'Application screenshots',
    },
    commentCaMarche: {
      title: 'How does it work?',
      step1: {
        title: '1. Have you encountered a problem with a company?',
        description1:
          'Have you encountered a problem with a professional, a shop, in-store or online? As a consumer, you can report it on the SignalConso platform.',
        description2:
          "Not sure if it's a problem? SignalConso guides you to know if you can file a report. If not, we'll explain why!",
      },
      step2: {
        title: '2. Submit a report on SignalConso or ask a question to the fraud repression.',
        description1:
          'Report the problem (anonymously or not) or ask your question directly to an agent of the DGCCRF (the fraud repression).',
        description2: 'In any case, SignalConso guides and advises you.',
      },
      step3: {
        title: '3. The company and the fraud repression are informed.',
        description1:
          "If you've filed a report, SignalConso contacts the company to inform them. The company can then respond to you and/or improve, and you will be informed of their action by an email from SignalConso. If you have chosen to provide your contact details to the company, they can contact you directly.",
        description2:
          'If you choose to inquire about your rights with the DGCCRF, an individualized response will be sent to you by email by an agent of the DGCCRF.',
      },
      step4: {
        title: '4. The repression of fraud intervenes if necessary.',
        description1: 'Your report is recorded in the DGCCRF database.',
        description2:
          'Are reports becoming too numerous for the same company? Is the problem considered serious by investigators? The repression of fraud can decide to monitor or control a company thanks to your report.',
      },
    },
    accessibilite: {
      pageTitle: 'Accessibility statement',
      paragraph1:
        'The Ministry of the Economy, Finance and Recovery is committed to making its service accessible, in accordance with Article 47 of Law No. 2005-102 of February 11, 2005.',
      paragraph2: 'This accessibility statement applies to SignalConso.',
      conformityStatusTitle: 'Conformity status',
      conformityStatusText: `SignalConso is <b>partially compliant with RGAA 4.0</b>. Partially compliant means that some sections of the content are not fully compliant with accessibility standards.`,
      testResultsTitle: 'Test results',
      testResultsText: 'The compliance audit carried out by external evaluation reveals that 78% of RGAA criteria are respected.',
      nonAccessibleContentTitle: 'Non-accessible content',
      nonAccessibleContentText: 'The contents listed below are not accessible for the following reasons.',
      nonConformityTitle: 'Non-compliance',
      nonConformityText:
        'Despite our efforts, some content is inaccessible. Below is a list of known limitations and potential solutions:',
      monthStats: 'Monthly statistics',
      disproportionateBurdenTitle: 'Derogations for disproportionate burden',
      disproportionateBurdenText1:
        'HTML validity cannot be guaranteed on all pages, but to our knowledge this does not cause any malfunction of assistive technologies. The resumption and verification of all pages of the site would represent a workload disproportionate to the expected gain.',
      disproportionateBurdenText2:
        'Videos do not have audio description, subtitles or textual transcription. The unit responsible for uploading these animations is currently unable to provide these elements for all of these videos.',
      accessibilityReportTitle: 'Access to the accessibility report',
      accessibilityReportText: 'You have access to the accessibility report',
      rebecaPlatform: 'on the Rebeca platform',
      evaluationGridText:
        ', by searching for "Accessibility audit report signal.conso.gouv.fr". You can also find the evaluation grid in the associated documents.',
      declarationEstablishmentTitle: 'Establishment of this accessibility statement',
      declarationEstablishmentText: 'This statement was established on September 4, 2020.',
      usedTechnologiesTitle: 'Technologies used',
      usedTechnologiesText: "SignalConso's accessibility is based on the following technologies:",
      assistiveTechnologiesTitle: 'User agents, assistive technologies and tools used to verify accessibility',
      assistiveTechnologiesText:
        'Web page tests were performed with the following combinations of web browsers and screen readers:',
      assistiveTechnologiesList1: 'Internet Explorer 11 and JAWS 2018',
      assistiveTechnologiesList2: 'Safari and VoiceOver on iPhone',
      complianceVerificationPagesTitle: 'Site pages that have been verified for compliance',
      home: 'Make a report',
      quiSommesNous: 'Who are we?',
      commentCaMarche: 'How does it work?',
      stats: 'Statistics',
      aide: 'Help',
      etape1: 'Step 1 - The problem',
      etape2: 'Step 2 - The description',
      etape3: 'Step 3 - The merchant',
      etape4: 'Step 4 - The consumer',
      etape5: 'Step 5 - Confirmation',
      connexionEspacePro: 'Professional space login',
      espaceProSuivi: 'Pro space - Follow-up of reports',
      espaceProDetail: 'Pro space - Detail of the report',
      espaceProEntreprises: 'Pro space - My companies',
      espaceProGestionAcces: 'Pro space - Access management',
      improvementContactTitle: 'Improvement and contact',
      improvementContactText:
        "If you can't access content or a service, you can contact the SignalConso manager to be directed to an accessible alternative or get the content in another form.",
      supportEmail: 'E-mail : support@signal.conso.gouv.fr',
      recourseTitle: 'Recourse',
      recourseText:
        "This procedure is to be used in the following case: you have reported to the website manager a defect in accessibility that prevents you from accessing content or one of the portal's services and you have not received a satisfactory response.",
      recourseOptions: 'You can:',
      defenseurDesDroits: 'Write a message to the ',
      defenseurDesDroitsLink: 'Defender of Rights',
      defenseurDesDroitsDelegue: 'Contact ',
      defenseurDesDroitsDelegueLink: 'the Defender of Rights delegate in your region',
      postalAddress: 'Send a letter by post (free of charge, do not put a stamp):',
    },
    contact: {
      title: 'Contact',
      problemMessage: 'Have you encountered a problem with a company and want to report it?',
      problemSolution: 'SignalConso is here for that! Browse our site and simply answer the questions.',
      technicalIssue: 'Does your question concern a technical problem encountered on SignalConso?',
      exampleText: 'For example:',
      example1: "You can't find the SIRET number of the company you want to report",
      example2: 'You encounter a bug while navigating the site',
      example3: "You can't find the right category for your problem",
      emailText: 'In this case, write to us by email at',
      emailTitle: 'Are you experiencing a technical problem with our site? Contact us (default messaging opening).',
      alertDescription:
        "This email address is not intended for submitting your report, which will not be processed. Any report must be submitted exclusively by following the procedure on the site's homepage.",
      alertTitle: "Don't send us your report by email... it won't be read.",
    },
    litige: {
      title: 'Your steps to be reimbursed or find a solution to your problem',
      step1: {
        label: 'Step 1: I write a letter to the company asking to resolve my problem',
        when: 'When?',
        whenDescription1: 'As soon as possible (recommended).',
        whenDescription2: 'I can also wait to see if the company responds to me with SignalConso.',
        toWhom: 'To whom?',
        toWhomDescription1: "To the company's customer service.",
        toWhomDescription2:
          "I can find the address of the company's customer service in my contract, on its website or in the general terms and conditions of sale.",
        how: 'How?',
        howDescription: 'By sending a registered letter with acknowledgment of receipt, attaching the two attached documents:',
        downloadTitle: 'Opening of the template letter (new window)',
        templateText: 'a template letter to complete (areas between [])',
        signalementText: 'my report in PDF format',
        keepCopy: 'I keep a copy of the letter and proof of sending it.',
        why: 'Why?',
        whyDescription: 'This letter is proof of my approach. It is mandatory to start other procedures later.',
      },
      step2: {
        label:
          'Step 2: I contact a consumer mediator, that is to say a person responsible for resolving consumer problems with companies',
        when: 'When?',
        whenDescription:
          "Two months after sending my letter, if I haven't received a response or if the response is unsatisfactory.",
        who: 'Who?',
        whoDescription:
          "The company is obliged to communicate the name of the mediator it has chosen. The mediator's contact details are normally written on the company's website or on the contract, order form...",
        how: 'How?',
        howDescription: "I fill out the form on the mediator's website or contact him by post.",
        why: 'Why?',
        whyDescription: 'The mediator will help me find an arrangement with the company.',
        cost: 'How much does it cost?',
        costDescription: "It's free!",
        whatIfNoMediator: 'What if I cannot find the name of the mediator?',
        newWindow: 'New window',
        whatIfNoMediatorDescription1: 'I contact the conciliator closest to me.',
        whatIfNoMediatorDescription2: 'I look for it on the site',
        whatIfNoMediatorDescription3: 'He will help me find a solution with the company.',
        whatIfNoMediatorDescription4: "It's free!",
      },
      step3: {
        label: 'Step 3: I go to court, that is to say I ask for a trial in court.',
        warning:
          'Attention, it is mandatory to have taken step 2 (mediator or conciliator) before going to court for a dispute of less than 5,000 euros',
        when: 'When?',
        whenDescription: 'When I have not found a solution with the mediator or conciliator.',
        how: 'How?',
        howConsultPage: 'By consulting the page ',
        newWindow: 'Service public - vos droits (new window)',
        why: 'Why?',
        whyDescription: 'So that the judge of the court decides who is at fault and what solutions should be put in place.',
        cost: 'How much does it cost?',
        costDescription: "Going to court is free but fees may be added during the procedure (lawyer's fees, expertise fees...).",
      },
      callOut: {
        associationCallOutTitle: 'To carry out these steps, you can contact a consumer association',
        associationCallOutDescription1:
          'A consumer association can help you write complaint or formal notice letters, contact the company directly, help you take legal action.',
        associationCallOutDescription2:
          "To benefit from their help, you must pay a sum called 'membership'. To find out the price of this membership, you can contact them directly. Depending on your situation, some associations may reduce the price of membership.",
        associationListTitle: 'List of official consumer associations:',
      },
    },
    quiSommesNous: {
      title: 'Who are we?',
      structureTitle: 'Our structure',
      structureDescription:
        "We are what is called a 'Startup d'État'. This is a small team that creates a digital public service to address a problem that affects citizens. Its objective is not to make a profit, but to maximize its social impact by meeting the needs of users.",
      structureDGCCRFDescription: 'Our Startup d’État is attached to the ',
      structureDGCCRFLink: 'General Directorate for Competition Policy, Consumer Affairs and Fraud Control',
      structureDGCCRFMissionDescription:
        "(the DGCCRF, better known to the general public as 'fraud control') whose mission revolves around three axes:",
      structureDGCCRFMarketRegulation: 'competitive market regulation;',
      structureDGCCRFConsumerProtection: 'economic protection of consumers;',
      structureDGCCRFConsumerSafety: 'consumer safety.',
      workingMethodTitle: 'Our way of working',
      workingMethodDescription:
        "One motto: be as close as possible to users' needs! To do this, we base our work on experimentation. An idea? We test it!",
      workingMethodProductEvolution:
        "That's why our product is not fixed but constantly evolving. We regularly meet with consumers to test ergonomics, vocabulary used or responses provided.",
      workingMethodQuote: '"I have not failed. I have just found 10,000 ways that do not work."',
      workingMethodQuoteAuthor: '- Thomas Edison',
      teamTitle: 'Our team',
      formerMembersTitle: 'Former members',
    },
    centreaide: {
      title: 'Help using SignalConso',
      tab1: 'Consumer',
      tab2: 'Professional',
    },

    centreaideconso: {
      generalTitle: 'General information',
      howSignalConsoWorks: 'How does SignalConso work?',
      howSignalConsoWorksContent: 'Check out our page ',
      howSignalConsoWorksLink: 'How it works',
      reportIssueTitle: 'I want to report an issue',
      wrongCategory: "I can't find the right category",
      wrongCategoryContent1: 'The main sectors of activity are present in SignalConso.',
      wrongCategoryContent2: 'In case of doubt or to request the creation of a new category, you can contact support.',
      difficultyCompletingForm: 'I\'m having trouble completing the form at step 3 "The company"',
      difficultyCompletingFormContent1:
        'The companies proposed in the form come from a state database. The data from this database then allows us to contact the company.',
      difficultyCompletingFormContent2: 'There are several reasons why you may not find the company:',
      difficultyCompletingFormContent3: 'The company is located abroad',
      difficultyCompletingFormContent4:
        'If the company you want to report is not located in France, we will ask you for the name and country of the company.',
      difficultyCompletingFormContent5:
        'This information will allow us to redirect you if necessary to the competent authorities.',
      difficultyCompletingFormContent6: "I don't know either the identifiers or the address of the company",
      difficultyCompletingFormContent7:
        'This is for example the case where you only have a phone number or an email address, without any legal mention.',
      difficultyCompletingFormContent8:
        'To report a company whose name, website url and identifiers are unknown, you must contact directly the DGCCRF of your department:',
      difficultyCompletingFormContent9: "I know the name and address of the company but I can't find it",
      difficultyCompletingFormContent10:
        'It happens that the name of the company (its commercial name) is not identical to its legal name (its official name). It also happens that the address of its headquarters is not the same as that of the company.',
      difficultyCompletingFormContent11:
        'The form offers you help elements to succeed in finding its SIRET. If despite the help, you cannot find the company, you can contact support.',
      errorOnSendOrNext: 'I have an error message when I click on "send" or "next"',
      errorOnSendOrNextContent1:
        'Check your internet connection and try again to send the form. This error message often appears when the internet connection has been momentarily cut off.',
      errorOnSendOrNextContent2:
        'You may have tried to make the same report twice. It is not possible to make the same report twice (same category, same company) in a row.',
      errorOnSendOrNextContent3: 'If you still cannot send the form, you can contact support.',
      reportedIssueTitle: 'I made a report',
      noUpdateSinceReport: "I haven't heard anything since I made my report",
      noUpdateSinceReportContent1: `After sending your report, you should have received a <b>registration receipt</b> by email. If this is not the case, contact support. It is possible that you did not validate the last step or that the email address you provided contains an error.`,
      noUpdateSinceReportContent2: 'Then, you will receive the following information:',
      noUpdateSinceReportContent3: ' an email when the company has read your report (if applicable)',
      noUpdateSinceReportContent4: ' an email when the company will provide you with an answer (if applicable)',
      noUpdateSinceReportContent5:
        'or an email to tell you that the company did not want to read or respond to your report (if applicable)',
      noUpdateSinceReportContent6: 'Companies have about 8 weeks to consult and respond to your report.',
      noUpdateSinceReportContent7:
        'The reading and response time may vary from one company to another. If a company already has an account on SignalConso, the time will be faster.',
      noUpdateSinceReportContent8:
        'If the fraud repression decides to conduct an investigation, you will not receive an email to tell you.',
      howToGetRefund: 'How to get a refund or resolve my issue?',
      howToGetRefundContent1:
        'As indicated on SignalConso, fraud repression will use your report to target companies for inspection.',
      howToGetRefundContent2:
        'During these inspections, it will look at whether bad practices are actually being carried out and if so, sanction them.',
      howToGetRefundContent3: 'On the other hand, fraud repression does not deal with obtaining your refund or compensation.',
      howToGetRefundContent4:
        'It is up to you to start the process. These steps were presented to you at the end of your report and in your registration receipt email.',
      howToGetRefundContent5: 'You can also find them on this page:',
      howToGetRefundContent6: 'Your steps to be reimbursed or find a solution to your problem',
      modifyOrDeleteReport: 'I want to modify or delete my report',
      modifyOrDeleteReportContent1: ' To modify or delete your report, you can ',
      modifyOrDeleteReportContent2: 'contact support',
      askQuestionToFraudRepression: 'I want to ask a question to fraud repression',
      cantFindWhereToAsk: "I can't find where to do it",
      cantFindWhereToAskContent1: 'Depending on the category chosen during your reporting journey, this button may appear:',
      cantFindWhereToAskContent2: 'It is not offered in all categories.',
      whereToEnterQuestion: 'Where should I enter my question?',
      whereToEnterQuestionContent: 'You will be able to describe your situation and ask your question in step 2:',
      errorOnSendOrNextQuestion: 'I have an error message when I click on "send" or "next"',
      errorOnSendOrNextQuestionContent1:
        'Check your internet connection and try again to send the form. This error message often appears when the internet connection has been momentarily cut off.',
      errorOnSendOrNextQuestionContent2:
        'You may have tried to make the same report twice. It is not possible to make the same report twice (same category, same company) in a row.',
      errorOnSendOrNextQuestionContent3: 'If you still cannot send the form, you can contact support.',
      askedQuestionToFraudRepression: 'I asked a question to fraud repression',
      noResponseReceived: 'I have not received any response',
      noResponseReceivedContent:
        'If you have chosen the option "Inform me about my rights with fraud repression" and your request is explicit, you will receive a response very soon, usually within a maximum of 8 days, depending on the complexity of the situation. It is not necessary to make another one, on the contrary, it can create confusion.',
      urgentRequest: 'My request is urgent',
      urgentRequestContent:
        'Requests are analyzed as quickly as possible. When deadlines are at stake in a claim, the response will remind you of the rights you have to help you apply them immediately, if contractual deadlines still allow it.',
      foundAnswerAndWantToCancel: 'I found the answer, I want to cancel',
      foundAnswerAndWantToCancelContent:
        'It is very kind of you to want to inform us about it, for this you can redo the previous journey by mentioning your first and last name and the resolution of your problem; a link will be made between your first request and this latest information. Otherwise, you can wait for the response that will be provided to you.',
    },
    centreaidepro: {
      generalitesTitle: 'Generalities',
      gratuitLabel: 'Is this service free?',
      gratuitText1: 'SignalConso is a free public service, whether for consumers or businesses.',
      gratuitText2:
        'If you receive a letter asking you for money on the grounds of using SignalConso, do not respond to the request and inform the DGCCRF of the attempted scam.',
      accesLabel: 'Who has access to the reports filed on SignalConso?',
      accesText1: 'Only the reported company can consult the report that concerns it. They are not made public to consumers.',
      accesText2: 'All reports are consultable and can be exploited by the DGCCRF.',
      entrepriseSignaleeLabel: 'My company already appears on SignalConso, has it already been reported?',
      entrepriseSignaleeText1:
        'In order to facilitate the filing of the report by the consumer, the database of all French companies has been integrated into our tool.',
      entrepriseSignaleeText2:
        'This is why your company appears on our platform but in no way does it mean that it has been reported.',
      espaceProfessionnelLabel: "Can I open a Professional Space if I haven't been reported yet?",
      espaceProfessionnelText:
        "If your company hasn't been reported yet, and you haven't received a letter from our services, you won't be able to open a Professional Space on SignalConso.",
      consulterRepondreLabel: 'Is it mandatory to consult SignalConso reports and/or respond to them?',
      consulterRepondreText1: 'SignalConso is a voluntary enforcement service.',
      consulterRepondreText2:
        'You can, if you wish, not consult the reports filed on SignalConso. In this case, the DGCCRF and the consumer will be notified that the report has not been consulted.',
      entrepriseSignaleeTitle: 'My company has been reported',
      queFaireLabel: 'I received a letter from SignalConso because my company has been reported. What should I do?',
      courrierSignalConsoText1: 'To find out about this report, go to ',
      courrierSignalConsoText2:
        ' and click on the "Professional Space" button in the menu at the top of your screen. Or go directly to this address: ',
      courrierSignalConsoText3: 'On your first connection, you must identify yourself with:',
      courrierSignalConsoText4: 'the SIRET number of your company (14 digits)',
      courrierSignalConsoText5:
        'your activation code: this is the 6-digit number written in the letter you received from SignalConso',
      courrierSignalConsoText6: 'the email address you want to link to your account',
      courrierSignalConsoText7:
        'You will then receive an email inviting you to validate your account. Then enter your first and last name, and choose your password to activate your professional space.',
      courrierSignalConsoText8: 'Your "Professional Space" is now activated!',
      courrierSignalConsoText9: 'You can access it with your password by clicking on the button ',
      courrierSignalConsoText10: 'Log in',
      consulterSignalementsText: 'You can consult the reports concerning your company and if necessary:',
      prendreMesuresText: 'Take corrective or preventive measures following the report',
      contacterConsommateurText: 'Contact the consumer if he or she has wished to leave you his or her contact details',
      motDePasseOublieLabel: 'I forgot my password',
      motDePasseOublieText1: 'You can ',
      motDePasseOublieText2: 'request a new password',
      motDePasseOublieText3: ' or, in case of difficulties, contact the service by email ',
      controleSuiteSignalementLabel: 'Will my company be inspected following a report?',
      controleSuiteSignalementText1:
        'Depending on the severity and frequency of the reports, DGCCRF investigators may trigger an inspection.',
      controleSuiteSignalementText2: 'The report is recorded in the DGCCRF database.',
      communicationConsommateurLabel: 'Can I communicate directly with the consumer who made the report?',
      communicationConsommateurText1:
        'SignalConso gives the consumer the choice to transmit his or her contact details to the reported company or not.',
      communicationConsommateurText2:
        'In any case, we communicate with the consumer regarding the follow-up of his or her report.',
      detailsActionsCorrectivesLabel: 'Should I provide details of corrective actions taken to rectify the problem?',
      detailsActionsCorrectivesText:
        'Feedback from companies is important to improve the service; it is also valuable for consumers and DGCCRF.',
      informationsSignalementLabel: 'What information makes up a report?',
      informationsSignalementText1: 'A report contains different information:',
      typeSignalementLabel: 'Type of report',
      typeSignalementText:
        'In order to identify the problem that the consumer encountered and the professional sector concerned, the consumer must answer a series of predefined questions. The answers to all these questions are provided in the "Type of report" category. These are identification elements on the type of anomaly reported.',
      detailsLabel: ' Details ',
      detailsText:
        'The "Details" section allows the consumer to describe the context in which he or she encountered the problem, add details and give the date of the observation. This is also where you will find any attachments sent by the consumer.',
      consommateurLabel: ' Consumer ',
      consommateurText:
        "The Consumer section tells you whether the consumer has chosen to leave his or her contact details so that he or she can be contacted directly. If this is not the case, you can still indicate a response through SignalConso. If he or she has chosen to leave his or her contact details, you can contact him or her directly (as part of the report), but don't forget to specify this response on SignalConso to inform DGCCRF.",
      statutsSignalement: 'What do the different report statuses correspond to?',
      statutsSignalementDescription:
        'Once connected to your Professional Space, you have access to a list of all reports filed against your company. This list gives you some information about each report without having to open them: the date of filing of the report, the name of the consumer if available, as well as the status of the report. There are three statuses for the report:',
      nonConsulte: 'Not consulted ',
      nonConsulteDescription:
        'you have not yet consulted this report - it appears in bold. As soon as you click on it, the report will move on to the next status.',
      aRepondre: 'To be answered ',
      aRepondreDescription: 'you have consulted the report but have not yet answered it.',
      cloture: 'Closed ',
      clotureDescription:
        'the report is closed - you have already provided an answer or the processing time has been exceeded. (cf reminders).',
      filtrerListe:
        'When you have a lot of reports, you can filter the list by period or status. You can also extract your reports to Excel by clicking on the "Excel extraction" button.',
      reponsePossible: 'What response can I provide?',
      reponsePossibleDescription:
        'To respond to the report, simply click on the Provide a response button. You have three choices:',
      prendreEnCompte: 'I take this report into account',
      estimeInfonde: 'I consider this report unfounded',
      estimeNonConcerne: 'I consider this report does not concern my company',
      explicationReponse1:
        'Whatever choice you make, we invite you to explain it to the consumer. This response will be visible to DGCCRF.',
      explicationReponse2:
        'We also offer you the possibility to add a comment and attachments intended only for DGCCRF in the specific input field. Currently, the site does not allow attachments to be transmitted to the consumer.',
      explicationReponse3:
        'Once your response is validated, you will receive an acknowledgement of receipt. This response will also be visible in the "Response provided" section.',
      courrierPendantConges: 'What if SignalConso mail arrives during my vacation?',
      courrierPendantCongesDescription:
        'You received the SignalConso mail but your company was closed for annual leave? You consulted the report but did not immediately provide a response because you were waiting for confirmation from a colleague? Don’t panic! After collecting feedback from many companies, we have designed a reminder system that offers flexibility in processing reports:',
      relanceCourrier: 'Mail reminder ',
      relanceCourrierDescription1:
        ' we sent you a letter informing you that a report had been filed against your company but you have not yet activated your Professional Space.',
      relanceCourrierDescription2:
        'After 21 days, we will send you another letter inviting you to activate it. A new period of 21 days is launched, at the end of which we close the report. You can still activate your Professional Space, but you will no longer be able to respond to the report.',
      relanceMail: 'Mail reminder ',
      relanceMailDescription:
        'whether it is a new report that you have not yet consulted or a report that has been consulted but has not received a response, we will send you an email every 7 days for 3 weeks to invite you to take action. At the end of these reminders, you will no longer be able to respond to the report.',
      signalementCloture: "I didn't react in time and the report is closed, what can I do?",
      signalementClotureDescription1: 'You can still consult the report, but you will no longer be able to respond to it.',
      signalementClotureDescription2:
        'In order to limit the number of reports that could escape your attention, we regularly send reminders to your email address. Remember to keep it up to date on your account!',
      plusieursAcces: 'Can I open multiple accesses for employees of my company?',
      plusieursAccesDescription1:
        'Yes, you can invite your employees via their email address (functionality accessible in the "Manage my companies" section of the menu at the top left).',
      plusieursAccesDescription2:
        'You can invite them as simple collaborators or as administrators (in this case, they will also be able to manage accesses).',
      suiviSignalements:
        'I am in charge of monitoring reports from different establishments. How can I centralize these reports on a single account?',
      suiviSignalementsDescription:
        'If you need to monitor reports from different establishments (= different SIRETs), you can make your job easier by centralizing all the establishments monitored on the same account (functionality accessible from the "Manage my companies" section of the menu at the top left).',
      nouvelleFonctionnaliteTitle: 'NEW FEATURE',
      nouvelleFonctionnalite:
        'From your SignalConso account at your headquarters, you now have automatic access to all reports from your different establishments that have the same SIREN. Thus from your SignalConso account at your headquarters, you have access to all reports from your secondary establishments that have been reported without having to log in to different accounts. You still have the possibility to add companies manually that do not have the same SIREN as your headquarters with the "add a company" functionality and by entering the relevant Siret code and activation code received by mail (see video above)',
      gererNotifications:
        'I am in charge of monitoring reports from different establishments. How can I manage notifications for all establishments to which I have access?',
      gererNotificationsDescription1:
        'If you need to monitor reports from different establishments (= different SIRETs), you can manage report notifications for each establishment to which you have access in order to receive or not receive an email when a new report is filed.',
      gererNotificationsDescription2:
        'To manage your notifications, go to "Settings" and click on "EDIT" in "Notifications". Here by clicking on the selector, you can choose to activate or deactivate notifications for each establishment.',
      gererNotificationsDescription3:
        'Attention, if you disable notifications, you will no longer receive new reports by email. You will have to log in regularly to your space to consult new reports.',
    },

    suiviEtViePrivee: {
      suiviAudienceViePrivee: 'Audience monitoring and privacy',
      donneesPersonnelles: 'Personal data',
      infoRecueillies:
        'The information collected in the SignalConso form is recorded in a computer file by the SignalConso team (DGCCRF) to allow professionals to correct themselves and allow the DGCCRF to monitor reports for control purposes. The legal basis for the processing is the public service mission of the DGCCRF, authorized to control and sanction breaches of the consumer code (L511-3 Code Conso and L450-1 Code Commerce)',
      infoDemandees:
        'The information requested when filing a report is necessary to process the report. In particular, the email address may be used by the online interface (any software or application, including a website, a section of a website or a mobile application) to inform the consumer of the follow-up to his report (notification system).',
      infoSignalement:
        'Information relating to reports (i.e. declarations and attachments) is kept for 5 years by the DGCCRF for investigation purposes and any subsequent action.',
      declarationsObjetRetraitement:
        'The DGCCRF, as operator of the online interface, undertakes not to market any personal information transmitted by the user. Declarations may be subject to statistical processing by the administration as part of its missions. The information on the public online interface does not contain any personal data and is made available freely and free of charge on the online interface ',
      aFrequenceReguliere: 'at regular intervals.',
      utilisateurDroitAcces:
        'The user has the right to access, rectify, delete and object to his personal data upon simple request ',
      parEmail: 'by email.',
      consultezInterfaceCnil:
        "Consult the online interface cnil.fr for more information on your rights. If you believe, after contacting us, that your 'Information and Freedoms' rights are not being respected, you can file a complaint with the CNIL.",
      droitAccesDonnees: 'Right of access to data',
      conformementRGPD:
        'In accordance with Regulation 2016/679 of 27 April 2016 on the protection of individuals with regard to the processing of personal data and on the free movement of such data (GDPR) and Law No. 78-17 of 6 January 1978 on information technology, files and freedoms as amended, those concerned by this processing of personal data may access their data, have it rectified or request its deletion.',
      utilisateurDroitAccesEmail:
        'The user has the right to access, rectify, delete and object to his personal data upon simple request by email. Write to us at ',
      exercerDroitsQuestionTraitement:
        'To exercise your rights or for any questions about the processing of your data, you can contact the DGCCRF data protection officer:',
      voiePostale: 'By post:',
      referentProtectionDonnees1: 'The Data Protection Officer - DGCCRF - Bureau 2D',
      referentProtectionDonnees2: '59 boulevard Vincent Auriol',
      referentProtectionDonnees3: '75703 Paris Cedex 13.',
      voieElectronique: 'Electronically:',
      droitLimitationTraitement1: 'You also have a right to limit the processing of your data. Consult the online interface ',
      droitLimitationTraitement2: ' for more information on your rights.',
      plusInfosGestionCookies: 'For more information on managing cookies in Signal Conso, see the section',
      gestionCookies: 'Cookie management',
      cookiesDeposesOptOut: 'Cookies deposited and opt-out',
      interfaceEnLigneDeposeCookie:
        'This online interface deposits a small text file (a "cookie") on your computer when you consult it. This allows us to measure the number of visits and understand which pages are consulted the most.',
      droitIntroduireReclamation:
        'Finally, you also have the right to lodge a complaint with the supervisory authority. This right is exercised with the CNIL:',
      commissionNationaleInformatiqueLibertes1: 'National Commission for Information Technology and Civil Liberties',
      commissionNationaleInformatiqueLibertes2: '3 Place de Fontenoy',
      commissionNationaleInformatiqueLibertes3: '75007 PARIS.',
    },
    planDuSite: {
      pageTitle: 'Site map',
      generalPagesSection: 'General pages',
      reportIncident: 'Report an incident',
      audiencePrivacy: 'Audience tracking and privacy',
      cookieManagement: 'Cookie management',
      generalConditions: 'General terms of use of the SignalConso website',
      accessibilityDeclaration: 'Accessibility declaration',
      siteMap: 'Site map',
      aboutUs: 'About us',
      howItWorks: 'How it works?',
      statistics: 'Statistics',
      helpCenter: 'Help center',
      contact: 'Contact',
      calcRetractionDelay: 'Calculate your withdrawal period',
      resolutionTips: 'Tips for resolving an individual problem (dispute)',
      reportIncidentSection: 'Reporting an incident',
      reportIncidentFor: 'Report an incident for',
      seeFullTree: 'See also',
      completeTree: 'the complete tree of reporting an incident',
      incidentSteps: 'Details of the steps of an incident',
      step1: 'Step 1 - The problem',
      step2: 'Step 2 - The description',
      step3: 'Step 3 - The merchant',
      step4: 'Step 4 - The consumer',
      step5: 'Step 5 - Confirmation',
      proSpaceSection: 'Pro space',
      activateBusinessSpace: 'Activate business space',
      login: 'Login',
      incidentTracking: 'Incident tracking',
      incidentDetails: 'Incident details',
      myCompanies: 'My companies',
      accessManagement: 'Access management',
      passwordModification: 'Password modification',
      newsSection: 'News',
      allNews: 'All news',
      dgccrfSpaceSection: 'DGCCRF space',
      companyTracking: 'Company tracking',
      subscriptions: 'Subscriptions',
    },

    delaiRetractation: {
      title: 'Withdrawal period',
      description: 'Description of the withdrawal period',
      pageTitle: 'Withdrawal period',
      calculationSectionTitle: 'Calculate your withdrawal deadline',
      startDateLabel: 'Start date:',
      deadlineMessagePrefix: 'You have until',
      deadlineMessageSuffix: 'to change your mind.',
      startDateExplanationTitle: 'What is the start date to be taken into account?',
      contractTypeHeader: 'Contract type',
      dateToConsiderHeader: 'Date to be taken into account',
      serviceContract: 'Service contract',
      contractConclusionDate: 'Contract conclusion date',
      waterGasElectricityContract: 'Contracts for the supply of water, gas or electricity',
      deliveredProducts: 'Delivered products',
      deliveryDate: 'Delivery date',
      deliveredProductsMultiplePackages: 'Products delivered in several packages',
      receptionDateLastItem: 'Date of receipt of the last item, lot or piece received',
      changeOfMindTitle: 'You have 14 days to change your mind',
      justificationNotRequired: 'You do not have to justify yourself to the company',
      returnFormOrLetter: 'You must return',
      recommendedLetterWithAcknowledgment:
        'by registered letter with acknowledgment of receipt within 14 days the withdrawal form or a letter written within 14 days',
      withinFourteenDays:
        'by registered letter with acknowledgment of receipt within 14 days the withdrawal form or a letter written within 14 days',
      canAlsoDoItOnline: 'You can also do it online when the seller has a website and has provided for this possibility',
      websiteRequirement: '(you must not only return the package)',
      reportingOnWebsiteNotSufficient: 'A report on our site is not sufficient to request withdrawal.',
      keepDocumentation1: 'You must keep all documents justifying that you have taken the steps within the deadlines.',
      keepDocumentation2: "That's why it's important to prefer a registered letter.",
      ifSellerDidNotInform:
        'If the seller did not inform you of your right of withdrawal, the deadline is extended by 12 months from the end of the initial withdrawal period.',
      extensionOfTwelveMonths:
        'But if this information is provided to you during this extension, the deadline is again 14 days. It starts on the date you receive the information.',
    },

    conditionsgeneralesconso: {
      description:
        "Les conditions générales d'utilisation doivent être acceptées par l’utilisateur de l'interface en ligne (tout logiciel ou application, y compris un site internet, une section de site internet ou une application mobile).",
      signalConsoTitle: 'What is SignalConso ?',
      signalConsoDescriptionPart1:
        "L'interface en ligne permet aux consommateurs de connaître la réglementation et de déposer un signalement.",
      signalConsoDescriptionPart2:
        "Il ne doit en aucun cas s'agir d'une urgence nécessitant l'intervention des services de secours. ",
      appelUrgence: 'Dans ce cas, il faut appeler le « 112 ».',
      servicePayantTitle: 'Ce service est-il payant ?',
      servicePayantDescription: "L'interface en ligne est accessible gratuitement à tout utilisateur ayant un accès à internet.",
      signalerTitle: 'Que peut-on signaler ?',
      signalerDescription:
        'L’utilisateur peut signaler des manquements relatifs au Code de la Consommation (principalement) et des litiges contractuels constatés chez une entreprise. Il n’est pas possible de signaler un litige avec un particulier.',
      traiteSignalementsTitle: 'Qui traite les signalements ?',
      traiteSignalementsDescription:
        "Les signalements sont traités par l’équipe SignalConso qui vérifie que le signalement rentre bien dans le périmètre de l'interface en ligne et que les données reçues ne sont pas “sensibles”.",
      signalementsVisibles: 'Les signalements sont ensuite visibles :',
      signalementsVisibleEntreprise: 'par le professionnel, dont l’entreprise a été mise en cause,',
      signalementsVisibleDGCCRF: 'par les agents de la DGCCRF, qui sont habilités à faire des enquêtes.',
      anonymatTitle: 'Les signalements sont-ils anonymes ?',
      anonymatDescriptionPart1:
        'L’utilisateur doit s’identifier auprès de l’administration (SignalConso et DGCCRF) en donnant son nom, son prénom et son adresse email.',
      anonymatDescriptionPart2: "Par contre, l'utilisateur a la possibilité de rester anonyme vis-à-vis de l'entreprise.",
      suiviDossierTitle: 'Existe-t-il un suivi de dossier ?',
      suiviDossierDescription:
        'SignalConso ne propose pas de suivi personnalisé des dossiers. Les signalements sont traités de manière collective.',
      risqueDenonciationTitle: 'Quel est le risque en cas de dénonciation mensongère ?',
      risqueDenonciationDescription1:
        "L’article 226-10 du Code Pénal dispose que \"la dénonciation, effectuée par tout moyen et dirigée contre une personne déterminée, d'un fait qui est de nature à entraîner des sanctions judiciaires, administratives ou disciplinaires et que l'on sait totalement ou partiellement inexact, lorsqu'elle est adressée soit à un officier de justice ou de police administrative ou judiciaire, soit à une autorité ayant le pouvoir d'y donner suite ou de saisir l'autorité compétente, soit aux supérieurs hiérarchiques ou à l'employeur de la personne dénoncée, est punie de cinq ans d'emprisonnement et de 45 000 € d'amende.\"",
      risqueDenonciationDescription2:
        "Le détournement de l'interface en ligne de signalement pour effectuer des dénonciations mensongères fera l'objet de poursuites judiciaires.",
      traitementSignalementsAbusifsTitle: 'Traitement des signalements abusifs ou frauduleux',
      traitementSignalementsAbusifsDescription:
        'Les droit de saisine par voie électronique ne s’applique pas aux envois abusifs, notamment par leur nombre, leur caractère répétitif ou systématique, ou les envois susceptibles de porter atteinte à la sécurité des systèmes d’information ou pouvant porter atteinte au personne physique ou morale (menace de mort, insulte, ...). Dans ces conditions les signalements répétés susceptibles de perturber le bon fonctionnement du service ou qui auraient pour effet de faire peser sur lui une charge disproportionnée au regard des moyens dont il dispose pourrait voir leurs adresses bloquées.',
      mentionsLegalesTitle: 'Mentions légales',
      mentionsLegalesDescriptionPart1:
        "L'édition de l'interface en ligne https://signal.conso.gouv.fr est assurée par la Direction générale de la Concurrence, de la Consommation et de la Répression des fraudes (DGCCRF), située au 59 Boulevard Vincent Auriol 75013 Paris.",
      mentionsLegalesDescriptionPart2:
        "L'hébergeur de l'interface en ligne https://signal.conso.gouv.fr est la société Clever Cloud dont le siège social est situé 3 rue de l’Allier 44000 Nantes.",
      proprieteIntellectuelleTitle: 'Propriété intellectuelle',
      proprieteIntellectuelleDescription:
        "Les marques, logos, signes et tout autre contenu de l'interface en ligne font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.",
    },

    conditionsGeneralesUtilisationPro: {
      intro:
        'The general terms and conditions must be accepted by the professional in order to use the SignalConso online interface.',
      gratuiteTitle: 'Free of charge SignalConso platform',
      gratuiteContent: 'The online interface is accessible free of charge to professionals.',
      reclamationsContent1:
        'If you receive a solicitation asking for money in the context of SignalConso, refuse the proposal and quickly alert the DIRECCTE or DDPP in your area.',
      reclamationsContent2: 'Contact details available here:',
      coordonneesTitle: 'DDPP and DDCSPP contact details (new window)',
      coordonneesLink: 'https://www.economie.gouv.fr/dgccrf/coordonnees-des-DDPP-et-DDCSPP',
      objectionsTitle: 'Objections regarding the complaint filed',
      objectionsContent1:
        'If you contest the complaint that has been filed, you can notify it directly in your professional space.',
      objectionsContent2:
        'Your response will be transmitted to the consumer and to the DGCCRF. A second response space allows you to provide information to the DGCCRF only. You can attach attachments to it.',
      objectionsReminder: 'As a reminder, it is the findings made by investigators during an inspection that are binding.',
      contactTitle: 'Contacting the consumer',
      contactContent:
        'If the consumer has wished to transfer his or her contact details to you, you can contact him or her. This contact must be courteous and made only within the framework of the complaint. Its purpose is notably to recover missing information and if necessary to deal with the dispute.',
      contactProhibitions1: "It is forbidden to use the consumer's contact details for commercial prospecting purposes.",
      contactProhibitions2:
        'It is forbidden to intimidate or harass the consumer in order to have him or her withdraw his or her complaint.',
      contactAbuse: 'Any abuse may result in legal proceedings.',
      denonciationTitle: 'False denunciation',
      denonciationContent:
        'Article 226-10 of the Penal Code provides that "the denunciation, made by any means and directed against a specific person, of a fact which is likely to result in judicial, administrative or disciplinary sanctions and which is known to be totally or partially inaccurate, when it is addressed either to an officer of the judicial or administrative police or to an authority having the power to follow it up or to refer it to the competent authority, or to the hierarchical superiors or employer of the person denounced, shall be punished by five years\' imprisonment and a fine of €45,000."',
      denonciationPunishment:
        'The misuse of the online reporting interface for false denunciations will result in legal proceedings.',
      mentionsLegalesTitle: 'Legal notices',
      mentionsLegalesContent:
        'The publication of the online interface https://signal.conso.gouv.fr is ensured by the General Directorate for Competition, Consumer Affairs and Fraud Control (DGCCRF), located at 59 Boulevard Vincent Auriol 75013 Paris.',
      mentionsLegalesHebergeur:
        'The host of the online interface https://signal.conso.gouv.fr is Clever Cloud whose registered office is located at 3 rue de l’Allier 44000 Nantes.',
      proprieteIntellectuelleTitle: 'Intellectual property',
      proprieteIntellectuelleContent:
        'The trademarks, logos, signs and any other content of the online interface are protected by the Intellectual Property Code and more particularly by copyright.',
    },
    footer: {
      text1:
        'SignalConso is a free public service that allows consumers to report problems encountered with companies. Make a report, solve your problem, or get information about your rights.',
      text2: 'It is published by the ',
      dgccrfLink: 'General Directorate for Competition, Consumer Affairs and Fraud Control',
      homeLinkTitle: 'Make a report - SignalConso',
      connexionLinkTitle: 'DGCCRF space',
      retractationLinkTitle: 'Withdrawal period information',
      litigeLinkTitle: 'Dispute resolution information',
      actualitesLinkTitle: 'News',
      servicePublicPlusLinkTitle: 'Public Services +',
      suivezNous: `Follow us <br /> on social networks`,
      facebookTitle: 'Find us on Facebook - new window',
      twitterTitle: 'Find us on Twitter - new window',
      instagramTitle: 'Find fraud control on Instagram - new window',
      linkedinTitle: 'Find fraud control on LinkedIn - new window',
    },
    header: {
      homeLinkTitle: 'Make a report - SignalConso',
      connexionLinkTitle: 'Professional space',
      indexLinkTitle: 'Make a report',
      commentCaMarcheLinkTitle: 'How does it work?',
      centreAideLinkTitle: 'Help center',
      voirAussiTitle: 'See also',
      quiSommesNousLinkTitle: 'Who are we?',
      statsLinkTitle: 'Statistics',
      contactLinkTitle: 'Contact us',
      actualitesLinkTitle: 'News',
      servicePublicPlusLinkTitle: 'Public Services +',
      selectLang: 'Select language',
    },
    SocialNetwork: {
      YOUTUBE: 'Youtube',
      FACEBOOK: 'Facebook',
      INSTAGRAM: 'Instagram',
      TIKTOK: 'TikTok',
      TWITTER: 'Twitter',
      LINKEDIN: 'LinkedIn',
      SNAPCHAT: 'Snapchat',
      TWITCH: 'Twitch',
    },
    homepage: {
      signalconsoCatchWord: ` Report a problem to the company,<br/>find out about your rights with fraud control! `,
      step1: 'Have you encountered a problem with a company?',
      step2: 'Make a report or ask a question to fraud control.',
      step3: 'You can inform the company so that it can respond or correct itself.',
      step4: 'Fraud control intervenes if necessary.',
    },
    searchAnomalies: {
      title: 'What problem did you encounter?',
      searchCategoryPlaceholder: `Search for a category by keyword (BETA)`,
      noResultFound: `No result found.`,
      tryAnotherKeyword: 'Please try with a new keyword or choose from the list of categories',
      showAllCategories: 'Show all categories',
      other: 'Other',
      displayAllAnomalies: `Display all categories`,
    },
    arbo: {
      title: 'Report deposit tree',
      expandAll: 'Expand all',
      notAFraudMessage: "We don't doubt that you've really encountered a problem but... it's not fraud.",
    },
    yes: 'Yes',
    no: 'No',
    search: 'Search',
    edit: 'Edit',
    next: 'Next',
    nextStep: 'Next step',
    close: 'Close',
    confirm: 'Confirm',
    create: 'Create',
    end: 'End',
    see: 'See',
    test: 'Test',
    date: 'Date',
    add: 'Add',
    previous: 'Previous',
    back: 'Back',
    count: 'Count',
    delete: 'Delete',
    deleted: 'Deleted',
    try: 'Try',
    settings: 'Settings',
    status: 'Status',
    notification: 'Notification',
    notifications: 'Notifications',
    statusEdited: 'Status edited.',
    save: 'Save',
    saved: 'Saved',
    duplicate: 'Duplicate',
    all: 'All',
    anErrorOccurred: 'An error occurred.',
    minimize: 'Minimize',
    required: 'Required',
    invalidDate: 'Invalid date.',
    cancel: 'Cancel',
    help: 'Help',
    created_at: 'Created at:',
    validated: 'Validated.',
    notValidated: 'Not validated.',
    configuration: 'Configuration',
    general: 'General',
    name: 'Name',
    others: 'Others',
    description: 'Description',
    deploy: 'Deploy',
    unknown: 'Unknown',
    new: 'New',
    start: 'Start',
    startUp: 'Start up',
    inProgress: 'In progress...',
    cancelAll: `Cancel all`,
    clear: 'Clear',
    specify: `Specify...`,
    removeAsk: 'Remove?',
    thisWillBeRemoved: (_: string) => `The attachment <b>${_}</b> will be permanently removed.`,
    exportInXLS: 'Export to XLS',
    removeAllFilters: 'Remove all filters.',
    removeReportDesc: (siret: string) => `The report ${siret} will be deleted. This action is irreversible.`,
    download: 'Download.',
    remainingTime: 'Remaining time:',
    speed: 'Speed:',
    key: 'Key:',
    phone: 'Phone:',
    phoneOptional: 'Phone (optional): ',
    phonePlaceholder: 'ex : 0612345678 ',
    referenceNumberOptional: 'Reference number (optional): ',
    referenceNumberDesc:
      'To facilitate the processing of your report, please specify the reference of your file. Ex: ticket number, reservation number, invoice number, contract number, customer number, ...',
    referenceNumberPlaceholder: 'ex : ZYX987654321',
    genderOptional: 'Gender (optional)',
    value: 'Value',
    invite: 'Invite',
    activate_all: 'Activate all',
    block_all: 'Block all',
    parameters: 'Parameters',
    startedAt: 'Started at:',
    startedBy: 'Started by:',
    receivedAt: 'Received at:',
    endedAt: 'Ended at:',
    anonymous: 'Anonymous',
    active: 'Active',
    inactive: 'Inactive',
    seeMore: 'See more',
    apiToken: 'Api token',
    login: 'Login',
    error: 'Error',
    email: 'Email',
    signin: 'Sign in',
    signup: 'Sign up',
    password: 'Password',
    logout: 'Logout',
    consumer: 'Consumer',
    company: 'Company',
    country: 'Country',
    countryPlaceholder: 'Ex : Italy',
    identification: "Country's identification",
    address: 'Address:',
    contactAgreement: 'Agreement for contact:',
    activateMyAccount: 'Activate my account.',
    createMyAccount: 'Create my account.',
    invalidEmail: 'Please use a valid email address without accents.',
    invalidName: `Please enter a value without special characters.`,
    invalidPhone: 'Invalid phone number.',
    atMost100Chars: '100 characters maximum.',
    firstName: 'First name:',
    lastName: 'Last name:',
    addCompany: `Save the company`,
    addACompany: `Save a company`,
    youReceivedNewLetter: `You received a postal mail?`,
    siretOfYourCompany: `SIRET of your company`,
    siretOfYourCompanyDesc: `It must correspond to the company name indicated on the mail.`,
    siretOfYourCompanyInvalid: `The SIRET must contain 14 digits.`,
    activationCode: `Activation code`,
    activationCodeDesc: `6-digit code indicated on the mail.`,
    activationCodeInvalid: `The code must contain 6 digits.`,
    emailDesc: `Email address of your choice.`,
    activityCode: `Activity code`,
    days: `days`,
    selectedPeriod: 'Selected period',
    department: 'Department',
    url: 'URL',
    departments: 'Departments',
    reports: 'Reports',
    responseRate: '% response',
    report: 'Report',
    you: 'You',
    step: 'Step',
    step_problem: `Problem`,
    step_description: `Description`,
    step_company: `Company`,
    step_influencer: `Influencer`,
    step_consumer: `Consumer`,
    step_confirm: `Confirmation`,
    step_pageTitle_problem: `Step : The problem`,
    step_pageTitle_description: `Description`,
    step_pageTitle_company: `Company`,
    step_pageTitle_consumer: `Consumer`,
    step_pageTitle_confirm: `Confirmation`,
    timeFromTo: (from: number, to: number) => `From ${from}h to ${to}h`,
    detailsTextAreaTransmittable: `The information below will be <b>read by the company</b>. The repression of fraud may also consult them.`,
    detailsTextAreaTransmittableAnonymous: ` If you do not want the company to know your identity, <b>do not mention anything personal</b>.`,
    detailsTextAreaNotTransmittable: `The information below will be read <b>only by the repression of fraud.</b>`,
    detailsTextAreaEmployeeConsumer: `Nothing will be communicated to your employer.`,
    detailsAlertProduitDangereux: {
      title: `Emergency numbers`,
      text: `In case of a vital or important emergency, you can call one of the `,
      linkText: `emergency numbers : Samu, firefighters, ...`,
    },
    pageNotFoundTitle: `Page not found`,
    pageNotFoundHeadTitle: `SignalConso : Page not found`,
    pageNotFoundDesc: `You are on SignalConso. But you followed a link to a page that does not exist or has changed address.`,
    month_: {
      1: 'Janvier',
      2: 'Février',
      3: 'Mars',
      4: 'Avril',
      5: 'Mai',
      6: 'Juin',
      7: 'Juillet',
      8: 'Août',
      9: 'Septembre',
      10: 'Octobre',
      11: 'Novembre',
      12: 'Décembre',
    },
    monthShort_: {
      1: 'Jan',
      2: 'Fév',
      3: 'Mars',
      4: 'Avr',
      5: 'Mai',
      6: 'Juin',
      7: 'Juil',
      8: 'Août',
      9: 'Sept',
      10: 'Oct',
      11: 'Nov',
      12: 'Déc',
    },
    gender: {
      Male: 'M.',
      Female: 'Mme.',
    },
    unknownGender: `Non précisé`,
    bannerCookie: `The SignalConso site only uses technical cookies exempt from consent.`,
    bannerCookieSeeMore: `Learn more`,
    problemDoYouWorkInCompany: `Do you work for the company you want to report?`,
    problemDoYouWorkInCompanyNo: `No, I don't work there`,
    problemIsInternetCompany: `Does your problem concern an online company?`,
    problemIsInternetCompanyNo: `No, not online`,
    problemContractualDisputeFormYes: `Resolve my personal problem with the company`,
    problemContractualDisputeFormDesc: `Example : receive my package, get a refund, get a personalized response, ...`,
    problemContractualDisputeFormNo: `Report a problem so that the company can improve`,
    problemContractualDisputeFormNoDesc: `Example : respect of deadlines, better display of prices, impeccable hygiene, ...`,
    problemContractualDisputeFormReponseConso: `Inform me about my rights with the repression of fraud`,
    consumerWishFixContractualDispute: `Your report will be transmitted to the company. The repression of fraud does not deal with resolving individual problems,
     but <strong>making the report can encourage the company to respond to you.</strong>`,
    consumerWishCompanyImprovement: `Your report will be transmitted to the company. You will have the possibility to remain anonymous.`,
    consumerWishGetAnswer: `An agent will respond to you as soon as possible.`,
    consumerWishInvestigationIsPossible:
      'The fraud repression office may decide to investigate the company based on your information.',
    consumerWishInvestigationIsPossible2:
      'If reports are too numerous or frequent for an establishment, fraud investigators will intervene with professionals.',
    informationRatingSaved: `Your opinion has been recorded, thank you.`,
    informationTitle: `Emmh, we cannot process your report.`,
    informationReportOutOfScope: `We do not doubt that you have actually encountered a problem but... it is not a fraud.`,
    informationWasUsefull: `Was this information useful to you?`,
    buttonReportProblem: `Report a problem`,
    logoAltSignalconso: `SignalConso Logo / Return to homepage`,
    logoAltGouv: `Government Logo`,
    emptyFile: `This file seems empty`,
    invalidSize: (maxSize: number) => `The file size exceeds ${maxSize} Mb`,
    invalidFileNameSize: (maxSize: number) => `The file name must not exceed ${maxSize} characters`,
    limitTo500chars: `500 characters maximum`,
    continue: `Continue`,
    suggestion: `Did you mean :`,
    continueWithWebsite: (website: string) => `Continue with ${website}`,
    invalidUrlPattern: `This does not look like a website`,
    noAttachment: 'No attachment.',
    addAttachmentFile: 'Add an attachment',
    attachments: `Attachments`,
    backToHome: `Back to homepage`,
    city: `City`,
    attachmentsDescAnonymous: `If you do not want the company to know your identity, <b style="color:black">hide your name</b> on your attachments.`,
    attachmentsDescAllowedFormat: (formats: string[]) => `The following formats are accepted : ${formats.join(', ')}`,
    attachmentsDesc2: `Adding an attachment greatly increases your chances of triggering a corrective measure! <br/> You must not communicate sensitive data (bank or medical data).`,
    menu_howItWorks: `How it works?`,
    menu_home: `Home`,
    menu_help: `Help`,
    menu_authSpace: `Pro space`,
    website: 'Website',
    canYouIdentifyCompany: `Can you identify the company?`,
    canYouIdentifyCompanyDesc: `SignalConso needs it to contact it and inform the fraud repression office.`,
    websitePlaceholder: 'Example: https://www.site.com',
    identifyBy_name: `By its name and postal code`,
    identifyBy_nameDesc: `French company only`,
    identifyBy_identity: `By its SIRET or SIREN or RCS number`,
    identifyBy_none: `I cannot identify the company or the company is abroad`,
    identifyBy_noneDesc: `If you cannot identify the company, you can continue your report.
      It will not be transmitted to the company, unless it is French and identifiable by the SignalConso team.
      In any case, the fraud investigators will be informed.`,
    couldYouPrecise: `Could you be more specific?`,
    cantIdentifyCompany: `As you cannot identify the company, please specify your location so that we can redirect your report to the right service.`,
    cantIdentifyWebsiteCompany: `As you cannot identify the company linked to the website, please specify your location so that we can redirect your report to the right service.`,
    cantIdentifyTransporterWebsiteCompany: `As you cannot identify the carrier, please specify your location so that we can redirect your report to the right service.`,
    cantIdentifyMerchantWebsiteCompany: `As you cannot identify the seller, please specify your location so that we can redirect your report to the right service.`,
    cantIdentifyLocationCompany: `As you cannot identify the company that came to your home, please specify your location so that our services can try to match this information with those that your neighbors may have deposited, having been in contact with the same company as you.`,
    cantIdentifyPhoneCompany: `As you cannot identify the company you had on the phone, please specify your location so that our services can try to match this information with those that your neighbors may have deposited, having been in contact with the same company as you.`,
    companyIdentityLabel: `SIRET or SIREN or RCS number of the company`,
    companyIdentityPlaceholder: `Ex: 83350861700010`,
    postalCode: `Postal code`,
    youCanSearchByCity: `You can search by city or enter the postal code`,
    aboutCompany: `Information about the company`,
    selectCompany: `Select the company`,
    verify: `Verify`,
    isHeadOffice: 'Head office',
    closedCompany: 'Closed company',
    closedCompanyText:
      'The company you searched for is no longer in business. We are therefore unfortunately unable to take your report concerning this company.',
    governmentCompany: 'Public administration',
    cannotReportGovernmentCompany: 'Impossible to report a public administration.',
    selectCompanyDesc: `If the company is not the one searched for, you can modify your search.`,
    isAFrenchCompany: `Is the company in France?`,
    noItsForeign: `No, it's abroad`,
    companyHowToFindCountry: `How to find a company's country?`,
    iDontKnown: `I don't know`,
    phoneNumberHavingCalled: `Phone number that contacted you`,
    phoneNumberHavingCalledPlaceholder: `Ex: 06 00 00 00 00`,
    noMatchingCompany: `No establishment matches the search.`,
    youCanOnlyReportFrenchCompanies: `You can only identify private companies established in France.`,
    yourStreet: `Your street`,
    yourStreetDesc: `The street number is not necessary`,
    yourStreetPlaceholder: `Ex: avenue de Ségur`,
    yourPostalCode: `Your postal code`,
    yourPostalCodePlaceholder: `Ex: 41110`,
    yourCity: `Your city`,
    noOptionsText: `No result`,
    loading: `Loading...`,
    yourCityPlaceholder: `Ex: Lyon`,
    continueReport: `You have a report in progress`,
    reportedCompanyName: `Name or brand of the reported company`,
    reportedCompanyNamePlaceholder: `Ex: Boulangerie Petit Jean`,
    companyIdentifiedTitle: `Company identified`,
    influencerIdentifiedTitle: `Influencer identified`,
    companyIdentityHelperWhere: `Where to find these identifiers?`,
    companyIdentityHelper: `What do these identifiers correspond to?`,
    companyIdentityHelperWhereDesc: `
      You can find this number on a quote, an invoice or a receipt issued by the company and also in the legal notices of its website.<br/>
      <b>How to do ?</b><br/>
      Scroll down to the bottom of the homepage of the website in question:
    `,
    companyIdentityHelperWhereDesc2: `
      Click on the text "Legal notices", a new page will open on which you will easily find this number:
    `,
    consumerTitle: `Your contact details allow us to authenticate your report.`,
    consumerAskCodeTitle: `Enter the validation code.`,
    consumerAskCodeDesc: (email: string) => `An email has been sent to <b>${email}</b>`,
    consumerCodePlaceholder: `______`,
    consumerEmailMayTakesTime: `Sending the email may take a few minutes`,
    consumerInvalidCode: `Incorrect code`,
    consumerResentEmail: `Resend`,
    consumerDummyEmailNotAccepted: `Temporary addresses are not accepted.`,
    consumerCannotReportSignalConso: `Please enter the URL of the site you want to report. 'Signal conso' is not a correct value.`,
    consumerValidationCodeExpired: `Incorrect code, please try again.`,
    consumerValidationCodeInvalid: `Incorrect code, please try again.`,
    consumerIsEmployee: `
      <strong>You declare that you work for the company you are going to report.</strong>
      <p>
        Your report will be read <b>only by the repression of frauds</b>.
        <br/>
        Your contact details are for investigators only.
        They may need to contact you to verify your identity and your report.
      </p>
      Your employer will not be informed of your report.
      <br/>
      During the investigation, if the investigators need to reveal your identity to justice or your employer, they will ask for your permission before.
      <b>You can refuse.</b>
    `,
    consumerAnonymousInformation: `You remain anonymous, but the company will not be able to solve your problem in particular. No
    refund, personalized response, ...`,
    confirmationTitle: `Summary of your problem`,
    confirmationAlertTransmittable: `Check your report before sending it to the company and the repression of frauds.`,
    confirmationAlert: `Check your report before sending it to the repression of frauds.`,
    contactAgreementTrueTitle: `I share`,
    contactAgreementTrueDesc: `my contact details, and my reference number, with the company so that it can contact me as part of my report (<b>only</b>). I am aware that the repression of frauds will not have access to these possible exchanges and will therefore not be able to control them.`,
    contactAgreementFalseTitle: `I do not share`,
    contactAgreementFalseDesc: `my contact details, nor my reference number, with the company. Only the repression of frauds will be able to take note of them.`,
    companySelectCountryTitle: `Select the country of the company`,
    companyWebsiteVendorAlert: `The selected company is a marketplace, which means that it offers products sold by third parties.`,
    companyWebsiteVendorTitle: `Can you identify the seller?`,
    companyWebsiteVendorLabel: `Name of the third-party seller`,
    companyWebsiteVendorDesc: (companyName: string) => `Only if the seller is not ${companyName}`,
    companyIdentityHelperDesc: `
    SIRET, SIREN and RCS are identifiers of the company.<br/>
    The SIRET is composed of 14 digits, the SIREN is composed of 9 digits.<br/>
    The RCS is composed of:<br/>
      <ul>
        <li>the mention "RCS"</li>
        <li>the name of the registration city</li>
        <li>a letter (A or B)</li>
        <li>the SIREN number</li>
      </ul>
    `,
    noMatchingCompanyDesc: `Please modify your search or search with the identifiers of the company.`,
    howToFindCompanyCountry: ``,
    howToFindCompanyCountryDesc: `
      Go to the company's website, in one of the following sections:
      <ul>
        <li>legal notices</li>
        <li>General Terms and Conditions of Sale (GTC)</li>
        <li>terms of use</li>
      </ul>
      In most cases, you will find access to these sections at the very bottom of the homepage of the site. The address of the company should be indicated in one of these sections.<br/>
      Be careful, it is possible that two different companies are mentioned on these pages. One of them corresponds to the host of the site. This is not the address of this host that we are looking for.
    `,
    confirmationBtnReponseConso: `Send my question`,
    confirmationBtn: `Send report`,

    statsTitle: 'Statistics',
    statsText: 'These statistics are updated in real time. Additional statistics are also available on the site ',

    acceptedReportStat: `action promises have been made by companies since the beginning of SignalConso`,
    acceptedReportStatName: `Number of action promises`,

    reportsCountStat: ` reports have been filed since the beginning of SignalConso`,
    reportsCountStatName: ` Number of reports filed`,

    transmittedRateStat: `of reports have been transmitted to the reported company`,
    transmittedRateDescription: `Why not 100%? Because in some cases (online purchase...) companies could not be identified by consumers`,
    transmittedRateStatName: `% of reports transmitted to companies`,

    readRateStat: `of transmitted reports have been read by companies`,
    readRateDescription: `Why not 100%? Because SignalConso is optional. The company is free to create an account and read the report.`,
    readRateStatName: `Reports read by companies`,
    respondedRateStat: `have received a response from the company, out of all the reports read`,
    respondedRateDescription: `When a company receives a report, it can decide whether or not to respond to the consumer.`,
    respondedRateStatName: `% of reports that receive a response from a company`,

    websiteReportsRateStat: `of reports filed since the beginning of SignalConso concern an online company`,
    browserCompatMessage: `Your web browser is outdated. If you are not using the latest version of your browser, you may encounter some problems when using SignalConso.`,

    minimalErrorTitle: 'Technical problem',
    minimalErrorText: 'There was a display problem in SignalConso. Try going back and redoing what you were doing.',

    landing: {
      bigReportButton: 'I report a problem',
      heroCardTitle1: 'Because it’s simple!',
      heroCardText1: 'Questions guide you throughout the process to help you formulate your problem.',
      heroCardTitle2: 'Because it’s fast!',
      heroCardText2: 'Just 5 minutes and your report is sent.',
      heroCardTitle3: 'Because it’s effective',
      heroCardText3: '65% of companies respond to the report.',
      signalConsoWillHandle1:
        'SignalConso takes care of the rest. Your report is sent to the company and is instantly visible to DGCCRF agents. If you have asked a question about your rights, an agent will contact you quickly to answer your question and guide you through the process.',
      signalConsoWillHandle2:
        'If necessary, you can decide to remain anonymous. Otherwise, we will forward your contact information to the company so that it can respond directly to you.',
      signalConsoWillHandle3:
        'Your report will also be recorded in the DGCCRF database. This tool allows them to better target their inspections and prepare investigations.',
      moreThanOneCat: 'To report your problem, choose the corresponding category',
      discoverButton: 'Discover',
      whatIsText1:
        "More than 60 million consumers visit nearly 10 million establishments every day and make purchases online. And to control consumer rights? Less than 3,000 DGCCRF agents: that's why the site ",
      whatIsText2: ' was launched.',
      whatIsText3:
        "Despite the investigators' efforts, not all anomalies can be detected, especially minor and recurring ones: as a consumer, you are best placed to spot them and assert your rights.",
      whatIsText4:
        'The site accompanies you before, during and after your purchases, and allows you to report in a few clicks the problems you encounter in your everyday life with a professional. SignalConso is also there to answer your questions, inform you about your rights and guide you through the process by directing you, if necessary, to the appropriate contact person for your situation. ',
      whatIsText5:
        'The professionals concerned will be able to become aware of the reports and correct the anomalies spontaneously. If the reports are too numerous or frequent for an establishment, DGCCRF investigators may decide to intervene.',
      samples: 'Some problems that have been reported to us',
    },
    shareYourReview: `Share your review`,
    thanksForSharingYourReview: `Your review has been taken into account, we thank you for it.`,
    youCanRateSignalConso: `I recommend SignalConso:`,
    youCanAddCommentForDGCCRF: `You can, if you wish, provide a clarification <b>for the attention of the DGCCRF</b> which will not be transmitted to the company`,
    didTheCompanyAnsweredWell: `Is the company's response satisfactory to you? <b>(Please note that once the review has been submitted, it will no longer be possible to modify it.)</b>`,
    send: `Send`,
    whichWebsiteTransporterTitle: 'Indicate the carrier website',
    whichWebsiteMerchantTitle: 'Indicate the merchant website',
    whichWebsiteTransporterText: 'Since you have chosen your carrier yourself, you must indicate its website here',
    whichWebsiteMerchantText: 'Indicate here the merchant site on which you made your purchase',

    thereAreSimilarReports: 'There is one or more similar reports',
  },
}
