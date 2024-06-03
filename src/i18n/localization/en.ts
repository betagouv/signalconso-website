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
        description: 'About our Cookies Policy',
      },
      appMobile: {
        // TODO
        title: '',
        description: '',
      },
      commentCaMarche: {
        title: 'How does it work? - SignalConso',
        description:
          'To report an issue with a company or business, simply complete the online form. We will notify the company that you have reported an issue. The company may opt to rectify the issue and not face further action. Your report will be logged with Fraud Control (DGCCRF).',
      },
      accessibilite: {
        title: 'Accessibility - SignalConso',
        description: 'SignalConso Accessibility Report',
      },
      contact: {
        title: 'Contact - SignalConso',
        description: 'Contact SignalConso',
      },
      litige: {
        title: 'Resolving an individual dispute – SignalConso',
        description: 'SignalConso tips for resolving an individual issue or dispute with a company or business',
      },
      refundTelecom: {
        title: 'Resolving an individual dispute – SignalConso',
        description: 'SignalConso tips for resolving an individual issue or dispute with a company or business',
      },
      quiSommesNous: {
        title: 'Who are we? - SignalConso',
        description:
          'SignalConso is a "government start-up" service provided by the Directorate General for Competition Policy, Consumer Affairs and Fraud Control (DGCCRF). Our online service informs consumers of their rights and how to exercise them.',
      },
      aide: {
        title: 'Help - SignalConso',
        description: 'View SignalConso help and FAQs',
      },
      suiviEtViePrivee: {
        title: 'Visitor analytics and privacy – SignalConso',
        description: 'Learn more about how SignalConso measures visitor engagement and protects user privacy.',
      },
      planDuSite: {
        title: 'Site Map - SignalConso',
        description: 'Site map',
      },
      delaiRetractation: {
        title: 'Cooling-off period – SignalConso',
        description: `Changed your mind about a new purchase or contract? Find out how long you have by law to cancel.`,
      },
      conditionsGeneralesUtilisation: {
        title: 'Terms of Use – SignalConso',
        description: 'View our Terms of Use',
      },
      stats: {
        title: 'Statistics - SignalConso',
        description: 'View the statistics of SignalConso',
      },
      index: {
        title: 'SignalConso, a public service for consumers',
        description:
          'Report an issue to a company (e.g. retailers, local stores, cafés and restaurants) and Fraud Control if you have concerns about hygiene, food and drink quality, product descriptions, pricing or payment policies, advertising or other retail services.',
      },
      arborescence: {
        title: 'Reporting sequence – SignalConso',
        description: '',
      },
      actualites: {
        title: 'News - SignalConso',
        description: 'News and updates from the SignalConso website and Fraud Control',
      },
      avis: {
        title: 'Share your review - SignalConso',
        description: '',
      },
      avisEngagement: {
        title: 'Share your review on commitment - SignalConso',
        description: '',
      },
      playground: {
        title: 'Playground',
        description: '',
      },
      obligationFibre: {
        title: '',
        description: '',
      },
      signalInfluenceur: {
        title: '',
        description: '',
      },
      obsolescencePage: {
        title: '',
        description: '',
      },
    },
    faireUnSignalement: {
      etape: 'Step',
      sur: 'of',
    },
    introApple: 'App Store',
    introBetween: 'or ',
    introGoogle: 'Play Store',
    articleAppMobile: {
      capturesEcran: 'Application screenshots',
      intro1:
        'Get the new SignalConso mobile app and simplify the process of reporting the issues that affect you, the consumer. Download for free on',
      intro2: 'and access all the same features available on our website.',
      fonctionnalites:
        'Use the app to report consumer-related issues (e.g. delivery, pricing, quality, contract, etc.) and find out about your rights with just a few taps.',
      statistiques:
        "Since its launch in 2020 by France's Minister for the Economy, Finance and Industrial and Digital Sovereignty, Bruno Le Maire, SignalConso has handled more than half a million complaints from over 320,000 users. In the last year, we have received 195,000 reports, 75,000 of which covered online purchases, 23,000 in-store purchases, 18,000 renovation works and 14,000 travel and leisure activities. Websites accounted for more than 43% of all reports and covered issues such as product quality, delivery times, warranty terms, cooling-off periods and refund policies, or the absence of terms and conditions.",
      accessibilite:
        "SignalConso is a user-friendly app and a much-needed system for resolving consumer disputes. While not all complaints get resolved, 8 out of 10 consumers recommend SignalConso on Services Publics +, France's online platform for improving public services.",
      cta: 'Access SignalConso whenever you need it and exercise your rights as a consumer quickly and easily.',
      banner: 'SignalConso banner',
    },
    cookies: {
      gestionTitre: 'Cookie management',
      banniereTitre: "Why doesn't this website have a cookie consent banner?",
      banniereContenu:
        'That’s right, you didn’t have to click on a bar that covers half the page to say that you agree to use cookies – if you even know what they are!',
      respectLoiContenu:
        'This applies to all websites and gouv.fr is no different. We act within the law, which in this case exempts certain analytics tools with the appropriate privacy settings from requiring user consent.',
      cookiesTechniquesTitre: 'Technical cookies allow us to:',
      cookiesTechniquesContenu:
        'Collect anonymised data on visitors to our online service (software and applications, including websites, sections of websites and mobile apps) in order to gauge the relevance of content and pinpoint any issues with the browsing experience.',
      definitionTitre: 'Cookies',
      definition:
        'Cookies are small text files stored by the browser of your computer, tablet or smartphone. When you visit SignalConso, the cookie stored on your computer is used to save the items of user data described below to improve the browsing experience and enable certain features.',
      natureTitre: 'Types of cookies installed on SignalConso:',
      natureContenu:
        'To make it easier to browse the site, we only use technical cookies. Some cookies are essential and cannot be deleted without seriously impairing access to the online service and your browsing experience, while others can impair your use of the site.',
      listeTitre: 'List of cookies that we install',
      listeDescription: 'Analytics cookies (Eulerian/Matomo):',
      nomCookie: 'Cookie name',
      finalite: 'Purpose',
      dureeConservation: 'Retention period',
      finaliteEulerian: 'Eulerian cookie',
      dureeConservationEulerian: '13 months',
      finaliteMatomo: 'Matomo',
      finaliteSC: 'Selected language',
      dureeConservationLang: 'infinite',
      dureeConservationMatomo1: '13 months',
      dureeConservationMatomo2: '6 months',
      dureeConservationMatomo3: '30 minutes',
      mieuxServirContenu:
        'In order to improve the SignalConso user experience, we use cookies to measure and track our visitors.',
      donneesCollecteesContenu:
        'The data we collect only provides anonymised visitor statistics (e.g. number of pages viewed, number of visits, frequency of visits, etc.).',
      outilEulerian:
        'We use Eulieran to measure visitor numbers. The French Data Protection Authority (CNIL) granted an exemption for the Eulieran Web Analytics cookie, so user consent is not required',
      outilEulerianLink: 'learn more',
      anonymisation:
        'SignalConso does not make use of any personal data that it collects. For example, your IP address is made anonymous before being recorded. This means that your identity cannot be linked with any visits you make to SignalConso.',
      cookiesEulerian:
        'Eulerian uses cookies named etuix. These are stored for 13 months, are not transferred to third parties, or used for other purposes.',
      outilMatomo:
        'Matomo, a similar analytics tool, is also used to store historical anonymised visitor data that has been collected since SignalConso was first launched.',
      cookiesMatomo:
        'For Matomo, the names of the cookies used are _pk_session, _pk_id, _pk_ref. They are stored for periods ranging from 30 minutes to 13 months, are not transferred to third parties, or used for other purposes.',
      renseignementsSuiviAudience: 'For more details on how SignalConso protects your privacy, visit the ',
      renseignementsSuiviAudienceLink: 'visitor analytics and privacy section',
      accepterRefuserTitre: 'How to accept or refuse cookies:',
      parametrerNavigateurContenu1:
        'You can configure their browser to delete cookies already installed on their device, be prompted to accept or reject the installation of individual types of cookies, or automatically accept or reject all cookies for some or all online services. However, refusing to install cookies may prevent some features from working properly.',
      parametrerNavigateurContenu2:
        'How cookies are configured varies depending on the browser you are using. Instructions on how to configure cookies on the most commonly used browsers are available via the links below:',
      internetExplorer: 'Internet Explorer',
      internetExplorerInstructions:
        'In Internet Explorer, select Tools, then Internet Options. Under the General tab, below Browsing History, select Settings. Click on Display Files. Click on the Name column header to arrange all files into alphabetical order. Next, scroll through the list until you see files beginning with the "Cookie" prefix (all cookies have this prefix and usually include the name of the online interface that created the cookie). Select the cookie(s) that include(s) the name "incomplete" ("à compléter") and delete them. Close the window containing the list of files, then double-click OK to return to Internet Explorer.',
      edge: 'Microsoft Edge',
      chrome: 'Google Chrome',
      chromeInstructions:
        'Open Google Chrome. In the browser toolbar, select More. Position your cursor over More Tools, then click on Clear Browsing Data. In the "Clear Browsing Data" window, check "Cookies and other site data" and "Cached images and files". Use the top menu to select the data file(s) you wish to delete. Select "All Time" to delete all files. Click on Clear Browsing Data.',
      firefox: 'Mozilla Firefox',
      firefoxInstructions:
        'Go to "Tools" and select the "Options" menu. In the window that appears, select "Privacy" and click on "Delete Selected Cookies". Locate the files containing the name "à compléter". Select and delete the files.',
      safari: 'Safari',
      safariInstructions:
        'In your browser, select Edit > Preferences. Click on Security. Click on Display Cookies. Select cookies containing "à compléter" in their name and click on Clear or Clear All. After deleting cookies, click on Finished.',
      plusRenseignementsCNIL: 'For more information about cookies and how to configure your browser, visit ',
      plusRenseignementsCNILLink: 'the French Data Protection Authority (CNIL) website.',
    },
    appMobile: {
      pageTitle: 'SignalConso, now available as an app!',
      introText1:
        "Get the new SignalConso mobile app and simplify the process of reporting the issues that affect you, the consumer. Download for free on'",
      introText2: 'and access all the same features available on our website.',
      featureText:
        'Use the app to report consumer-related issues (e.g. delivery, pricing, quality, contract, etc.) and find out about your rights with just a few taps.',
      statisticsText:
        "Since its launch in 2020 by France's Minister for the Economy, Finance and Industrial and Digital Sovereignty, Bruno Le Maire, SignalConso has handled more than half a million complaints from over 320,000 users. In the last year, we have received 195,000 reports, 75,000 of which covered online purchases, 23,000 in-store purchases, 18,000 renovation works and 14,000 travel and leisure activities. Websites accounted for more than 43% of all reports and covered issues such as product quality, delivery times, warranty terms, cooling-off periods and refund policies, or the absence of terms and conditions.",
      accessibilityText:
        "SignalConso is a user-friendly app and a much-needed system for resolving consumer disputes. While not all complaints get resolved, 8 out of 10 consumers recommend SignalConso on Services Publics +, France's online platform for improving public services.",
      conclusionText: 'Access SignalConso whenever you need it and exercise your rights as a consumer quickly and easily.',
      screenshotsAlt: 'Application screenshots',
    },
    commentCaMarche: {
      title: 'How does it work?',
      step1: {
        title: '1. Have you run into a problem with a French business?',
        description1: `Have you run into an issue with a company or business, in-store or online, that is either French or operates in France? As a consumer, you can make a report on the SignalConso platform.`,
        description2:
          "Not sure if your issue should be reported? SignalConso can advise you on whether or not to submit a report. If we advise you not to, we'll explain why!",
      },
      step2: {
        title: `2. Report the company on SignalConso or submit a question to France's Fraud Control.`,
        description1: `Report the problem (anonymously if you prefer) or submit a question directly to a member of staff of Fraud Control:`,
        description2: 'Either way, SignalConso will provide guidance and advice.',
      },
      step3: {
        title: '3. Both the owner of the business and Fraud Control are notified.',
        description1:
          'If you do make a report, SignalConso will contact the owner of the company to inform them. They may decide to respond to you and/or address the issue. SignalConso will notify you by email as to what actions they have taken. If you give your contact details, the company will be able to contact you directly.',
        description2:
          'If you submit a query about your rights to Fraud Control, you will receive a personalised email from a member of the Fraud Control staff.',
      },
      step4: {
        title: '4. Fraud Control gets involved if necessary.',
        description1: 'Your report will be added to the Fraud Control database.',
        description2:
          'Is one company receiving a high number of reports? Do investigators believe the matter is serious? Fraud Control may decide to investigate or audit a business after receiving your report.',
      },
      callout: {
        title: 'Try it yourself!',
        desc: `If you encountered an issue with a French company, or a company operating in France, you can make your first report:`,
      },
    },
    accessibilite: {
      pageTitle: 'Accessibility',
      paragraph1: 'This page is not a help page.',
      paragraph2:
        'Its purpose is to present our commitments to digital accessibility and to define the level of compliance of this website with the regulations and standards in force.',
      digitalAccessibilityTitle: 'What is digital accessibility?',
      digitalAccessibilityTexte1:
        'Digital accessibility consists of rules and best practices that cover functional, graphical, technical, and editorial aspects.',
      digitalAccessibilityTexte2:
        'Following these rules and best practices ensures that digital media (websites, mobile applications, PDF documents, etc.) are accessible to people with disabilities.',
      digitalAccessibilityTexte3: 'An accessible website, for example, allows users to:',
      digitalAccessibilityLi1:
        'Customize its display through the operating system and/or the browser (enlarging or reducing text, changing typography, modifying colors, turning off animations, etc.).',
      digitalAccessibilityLi2: 'Navigate using assistive technologies such as screen readers or braille displays.',
      digitalAccessibilityLi3: 'Navigate without using a mouse, using the keyboard only, switches, or a touch screen.',
      digitalAccessibilityLi4: 'Access videos and audio content with subtitles and/or transcriptions.',
      digitalAccessibilityLi5: 'Etc.',
      digitalAccessibilityCommitmentsTitle: 'Digital Accessibility Commitments',
      digitalAccessibilityCommitmentsTexte1:
        'The Ministry of the Economy, Finance and Recovery is committed to making its service accessible in accordance with ',
      digitalAccessibilityCommitmentsLink: 'article 47 of Law No. 2005-102 of February 11, 2005.',
      partialRgaaComplianceDeclarationTitle: 'Partial RGAA Compliance Declaration',
      partialRgaaComplianceDeclarationTexte: 'This declaration applies to the site:',
      partialRgaaComplianceDeclarationLink: '« SignalConso ».',
      conformityStatusTitle: 'Compliance Status',
      conformityStatusText:
        'This website is partially compliant with the RGAA (General Repository for Improving Accessibility) - version 4.1.2 due to the non-conformities listed below.',
      testResultsTitle: 'Test Results',
      testResultsText: 'The compliance audit to RGAA version 4.1.2 conducted in June 2023 reveals that in the sample:',
      testResultsLi1:
        'The overall compliance rate is 98.4%. (Calculated by dividing the number of conforming criteria by the number of applicable criteria.)',
      testResultsLi2: 'The average compliance rate is 99.8%. (Calculated by averaging the compliance rates of each page.)',
      findResultsText: `The accessibility audit report is available <a href="https://rebeca-documentation.finances.gouv.fr/exl-php/resultat/rebeca_portail_recherche_avancee_internet?CTX=NOFACETTE&WHERE_IS_DOC_REF_LIT=DOC00447684" >here</a>.`,
      nonAccessibleContentTitle: 'Non-Accessible Content',
      nonConformityTitle: 'Non-Conformity',
      nonConformityText1:
        "In the 'Company' step of the reporting form, if no company is selected in the 'Select the company' section, clicking the 'Next' button should shift the focus to the first radio button in that section.",
      nonConformityText2: "Also, when the 'Website' field is filled out, it should be focusable, impacting criterion 12.8.",
      nonConformityText3: 'Impacting criterion 12.8.',
      declarationEstablishmentTitle: 'Establishment of this Declaration',
      declarationEstablishmentText: 'This declaration was established on 12/12/2023.',
      usedTechnologiesTitle: 'Technologies Used for the Development of the Website',
      usedTechnologiesText: "SignalConso's accessibility relies on the following technologies:",
      assistiveTechnologiesTitle: 'Test Environment',
      assistiveTechnologiesText: 'Tests were conducted with the following combinations of web browsers and screen readers:',
      assistiveTechnologiesList1: 'Firefox 113.0.1 and NVDA 2023.1 (Windows 11)',
      assistiveTechnologiesList2: 'Firefox 113.0.1 and JAWS 2022 (Windows 11)',
      assistiveTechnologiesList3: 'Safari and VoiceOver (macOS 13.3.1)',
      assistiveTechnologiesList4: 'Safari and VoiceOver (iOS 16.4.1)',
      AccessibilityAssessmentToolsTitle: 'Accessibility Assessment Tools',
      AccessibilityAssessmentToolsList1: 'Colour Contrast Analyser',
      AccessibilityAssessmentToolsList2: 'Firefox Developer Tools',
      AccessibilityAssessmentToolsList3: 'Web Developer (Firefox extension)',
      complianceVerificationPagesTitle: 'Pages of the Website Subject to Compliance Verification',
      home: 'Home',
      quiSommesNous: 'Who Are We?',
      planDuSite: 'Site Map',
      MentionsLegales: 'Legal Notices',
      commentCaMarche: 'How It Works?',
      stats: 'Statistics',
      etape1: 'Step 1 - The Problem',
      etape2: 'Step 2 - The Description',
      etape3: 'Step 3 - The Company',
      etape4: 'Step 4 - The Consumer',
      etape5: 'Step 5 - Confirmation',
      improvementContactTitle: 'Feedback and Contact',
      improvementContactText:
        "If you are unable to access content or a service, you can contact the site manager 'SignalConso' to be directed to an accessible alternative or to obtain the content in another form.",
      supportEmail: 'Email: support@signal.conso.gouv.fr',
      recourseTitle: 'Recourse',
      recourseText:
        'This procedure is to be used in the following case: You have reported to the website manager a accessibility issue that prevents you from accessing content or one of the services, and you have not received a satisfactory response.',
      recourseOptions: 'You can:',
      defenseurDesDroits: 'Send a message to the',
      defenseurDesDroitsLink: 'Defender of Rights',
      defenseurDesDroitsDelegue: 'Contact the ',
      defenseurDesDroitsDelegueLink: 'Delegate of the Defender of Rights in your region',
      postalAddress: 'Send a letter by mail (free of charge, no stamp required):',
    },
    contact: {
      title: 'Contact',
      problemMessage: 'Have you run into a problem with a business and want to report it?',
      problemSolution: 'SignalConso can help! Click on this button to begin, and answer the questions:',
      technicalIssue: 'Does your query relate to a technical issue with SignalConso?',
      exampleText: 'For example:',
      example1: 'You are unable to locate the SIRET number for the company you want to report',
      example2: 'You experience a glitch while visiting the website',
      example3: 'You are unable to find the right category for your issue',
      emailText: 'Send us an email at',
      emailTitle: 'Are you experiencing a technical issue on our site? Contact us (default email client will open).',
      alertDescription: `This email address is not intended for reporting your issue with a company, we wouldn't be able to process it that way. Reports of customer issues must exclusively be submitted by following the "I report an issue" button above.`,
      alertTitle: 'Do not send us a report by email – it will not be read.',
    },
    refundTelecom: {
      demarcheTitle: 'Your steps to get refunded or find a solution to your problem',
      step1Title: 'Step 1: I write a letter to the company to ask to solve my problem',
      step1When: 'When?',
      step1WhenDesc1: 'As soon as possible (recommended).',
      step1WhenDesc2: 'I can also wait to see if the company responds to me with SignalConso.',
      step1ToWhom: 'To whom?',
      step1ToWhomDesc1: 'To the customer service of the company.',
      step1ToWhomDesc2:
        "I can find the address of the company's customer service in my contract, on its website, or in the general terms of sale.",
      step1How: 'How?',
      step1HowDesc: 'By sending a registered letter with acknowledgement of receipt, attaching the following two documents:',
      step1Attachment1: 'a template letter to complete (areas between [])',
      step1Attachment2: 'my report in PDF format',
      step1KeepCopy: 'I keep a copy of the letter and proof of sending.',
      step1Why: 'Why?',
      step1WhyDesc: 'This letter is the proof of my approach. It is mandatory to initiate other steps later.',
      step2Title:
        "Step 2: I contact a consumer mediator, that is a person in charge of solving consumers' problems with companies",
      step2When: 'When?',
      step2WhenDesc:
        'Two months after sending my letter, if I have not received a response or if the response does not satisfy me.',
      step2WhenDescWarn:
        'You have 1 year from the date of your written complaint to the customer service of your operator or supplier to seize the mediator.',
      step2Who: 'Who?',
      step2WhoDesc:
        "The company is obligated to communicate the name of the mediator it has chosen. The contact details of the mediator are normally written on the company's website or on the contract, purchase order...",
      step2WhoDesc2:
        'In the electronic communications sector, there is a specialized mediator to intervene if you have a dispute with your telephony (landline or mobile) operator or your internet service provider.',
      step2WhoDesc3: 'It is the Electronic Communications Mediator.',
      step2MediatorAddress: 'Electronic Communications Mediator, CS 30 342, 94257 GENTILLY Cedex',
      step2How: 'How?',
      step2HowDesc:
        "If the professional is a member of this mediator, I fill out the form on the mediator's website at the address: ",
      step2OrDesc: 'It is also possible to contact them by mail at the following address: ',
      step2Why: 'Why?',
      step2WhyDesc: 'The mediator will help me find an arrangement with the company.',
      step2Cost: 'How much does it cost?',
      step2CostDesc: "It's free!",
      step2NoMediatorFound: "What to do if I can't find the name of the mediator?",
      step2NoMediatorFoundDesc2: "He will help me find a solution with the company. It's free!",
      step2NoMediatorFoundDesc: 'I contact the conciliator closest to my home. I look for it on the website ',
    },
    litige: {
      title: 'Apply for a refund or find a solution to your issue',
      step1: {
        label: 'Step 1: Write to the company or business to demand a resolution',
        when: 'When?',
        whenDescription1: 'As soon as possible (recommended).',
        whenDescription2: 'You can also wait to see if the company or business responds via SignalConso.',
        toWhom: 'To whom?',
        toWhomDescription1: 'The customer services department for the company or business.',
        toWhomDescription2:
          "You can find the company's customer services contact details on your contract, the company's website, or in the company's terms and conditions of business.",
        how: 'How?',
        howDescription:
          'Send a letter by registered post with acknowledgement of receipt, enclosing the following two documents:',
        downloadTitle: 'Letter template (opens in new window)',
        templateText: 'a template letter that can be filled in (spaces between [])',
        signalementText: 'my report in PDF format',
        keepCopy: 'Keep a copy of the letter and proof of postage.',
        why: 'Why?',
        whyDescription: 'Your letter is proof that you have taken action. It is needed to complete later stages of the process.',
      },
      step2: {
        label: 'Step 2: Contact a consumer affairs mediator, who is responsible for handling consumer complaints',
        when: 'When?',
        whenDescription:
          'Two months after you sent your letter, if you have not received a response or the response you received was unsatisfactory.',
        who: 'Who?',
        whoDescription:
          "The company is required to give the name of their chosen mediator. The mediator's contact details are usually given on the company's website, contract and/or purchase order.",
        how: 'How?',
        howDescription: "Complete the form on the mediator's website, or write to the postal address provided.",
        why: 'Why?',
        whyDescription: 'The mediator will help you reach an amicable settlement with the company.',
        cost: 'How much does it cost?',
        costDescription: 'Mediation is free of charge.',
        whatIfNoMediator: "What to do if you can't find a mediator",
        newWindow: 'New window',
        whatIfNoMediatorDescription1: 'Get in touch with your nearest conciliator.',
        whatIfNoMediatorDescription2: 'Carry out a search on the site ',
        whatIfNoMediatorDescription3: 'A conciliator will help you reach a solution with the company.',
        whatIfNoMediatorDescription4: 'The process is free of charge.',
      },
      step3: {
        label: 'Step 3: Take legal action, i.e. apply to refer the matter to court.',
        warning:
          'Important – if your dispute is for less than €5,000, you must have completed step 2 (mediation or conciliation) before a matter can be referred to court.',
        when: 'When?',
        whenDescription: 'In instances where you have not found a solution through mediation or conciliation.',
        how: 'How?',
        howConsultPage: 'Visit the page ',
        newWindow: 'Public service – your rights (opens in new window)',
        why: 'Why?',
        whyDescription: 'To allow a court judge to determine who is at fault and what solutions should be put in place.',
        cost: 'How much does it cost?',
        costDescription:
          'Taking a matter to court is free. However, the costs of legal action can mount as proceedings continue (e.g. legal fees, expert report fees, etc.).',
      },
      callOut: {
        associationCallOutTitle: 'To complete these steps, you can contact a consumer association.',
        associationCallOutDescription1:
          'Consumer associations can assist you with writing claim letters or issuing formal notices, contacting companies directly, and initiating court proceedings.',
        associationCallOutDescription2:
          'To get assistance, you will need to pay a membership fee. For details of membership fees, contact the relevant association. Depending on your circumstances, some associations may offer a reduced membership fee.',
        associationListTitle: 'List of official consumer associations:',
      },
    },
    quiSommesNous: {
      title: 'About us',
      structureTitle: 'Organisation',
      structureDescription:
        'SignalConso is what we like to call a "government start-up". We are a small team engaged in providing a digital public service to address an issue that affects citizens in France. We are not for-profit, but strive to achieve the greatest social impact by meeting the needs of users.',
      structureDGCCRFDescription: 'SignalConso operates as part of the ',
      structureDGCCRFLink: 'Directorate General for Competition Policy, Consumer Affairs and Fraud Control (DGCCRF)',
      structureDGCCRFMissionDescription: `(more commonly known in France as "Fraud Control") - itself a part of the French Ministry of the Economy. Fraud Control's mission is threefold:`,
      structureDGCCRFMarketRegulation: 'to regulate market competition;',
      structureDGCCRFConsumerProtection: 'to protect the economic interests of consumers;',
      structureDGCCRFConsumerSafety: 'to uphold consumer safety',
      workingMethodTitle: 'How we work',
      workingMethodDescription:
        "Our vision is simple: to keep our finger on the pulse when it comes to the needs of consumers. That's why the work we do is experience-based. If we have an idea, we'll test it!",
      workingMethodProductEvolution:
        'Our platform is not static – we are always making improvements. We regularly meet with consumers to get feedback on the responses we give, as well as how easy our website is to read and navigate.',
      workingMethodQuote: '"I have not failed. I have just found 10,000 ways that do not work."',
      workingMethodQuoteAuthor: '- Thomas Edison',
      teamTitle: 'Our team',
      formerMembersTitle: 'Former members',
    },
    centreaide: {
      title: 'SignalConso help center',
      tab1: 'Consumer',
      tab2: 'Professional',
    },
    suiviEtViePrivee: {
      suiviAudienceViePrivee: 'Visitor analytics and privacy',
      donneesPersonnellesTitre: 'Personal data',
      donneesPersonnelles1:
        'Information that is collected from the SignalConso form is stored by SignalConso (DGCCRF) on a computer-readable file to enable correction by staff and allow DGCCRF to follow up on reports for audit purposes. Consumers can also use the SignalConso form to send a complaint to the RéponseConso service.',
      donneesPersonnelles2:
        "The aim of RéponseConso is to analyze consumer requests made electronically via the SignalConso online platform, by telephone or by post, and provide them with a simple, appropriate response in line with the DGCCRF's public service mission of consumer protection.",
      donneesPersonnelles3:
        "The legal basis for processing is DGCCRF's public service remit, which includes checking and applying penalties for breaches of the Consumer Code and the Commercial Code (L511-3 of the Consumer Code and L450-1 of the Commercial Code).",
      donneesPersonnelles4:
        'The information we request when submitting a report is required to process the reports or to forward a complaint to the RéponseConso service.',
      donneesPersonnelles5:
        'In particular, email addresses may be used by SignalConso (specifically, software and applications, including websites, sections of websites and mobile apps) to notify the consumer of any updates regarding a report (notification system).',
      donneesPersonnelles6:
        'When the consumer receives the answer to the question posed to RéponseConso, an e-mail message is automatically sent to them to take their experience into account, redirecting them to an online form hosted by the company Eval&Go. The link used to contribute to the RéponseConso evaluation corresponds to a unique and anonymous link in the questionnaire, which therefore does not allow the person who took part to be identified.',
      donneesPersonnelles7:
        'This processing is necessary for the purposes of the legitimate interests pursued by the DGCCRF to improve its service and does not present a risk for the interests, freedoms and fundamental rights of the data subject.',
      donneesPersonnelles8:
        'Details regarding a report (i.e. the statement and any attachments) are kept by DGCCRF for five years for the purpose of investigation, surveys and any consequences thereof.',
      donneesPersonnelles9:
        "As part of our commitment to transparency and respect for consumer privacy, we would like to inform you that the data collected when reporting dangerous products is transmitted to ANSES (Agence nationale de sécurité sanitaire, de l'alimentation, de l'environnement et du travail) as part of their public service mission. This transmission is carried out in accordance with the laws and regulations in force, and is strictly supervised to guarantee the protection of your rights and privacy.",
      declarationsObjetRetraitement:
        'DGCCRF, as operator of the online service, undertakes not to make use of any personal information shared by the user for commercial purposes. Statements may be reprocessed by the authority for statistical purposes as part of its remit. Information contained on SignalConso does not include personal or nominative data and is provided free of charge without restriction on the online service ',
      aFrequenceReguliere: 'on a regular basis.',
      utilisateurDroitAcces:
        'Users have a right of access, rectification, erasure and objection over their personal data, which can be exercised upon request ',
      parEmail: 'by email.',
      consultezInterfaceCnil1: 'Visit ',
      consultezInterfaceCnil2:
        ' for more information about your data rights. If, after contacting us, you believe that your data protection rights have not been respected, you can submit a complaint to the French Data Protection Authority (CNIL).',
      droitAccesDonnees: 'Right of access to data',
      conformementRGPD:
        'In accordance with Regulation (EU) 2016/679 of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (GDPR) and the French Data Protection Act 78-17 of 6 January 1978, as amended, on data protection, computer records and privacy, persons concerned by this personal data processing action may access, rectify, or request the erasure of, their personal data.',
      utilisateurDroitAccesEmail:
        'Users have a right of access, rectification, erasure and objection over their personal data, which can be exercised upon request by email. Write to us at ',
      exercerDroitsQuestionTraitement:
        'To exercise your rights, or if you have any queries about how your personal data is processed, you can contact the DGCCRF data protection officer:',
      voiePostale: 'By post:',
      referentProtectionDonnees1: 'Le référent protection des données – DGCCRF – Bureau 2D',
      referentProtectionDonnees2: '59 boulevard Vincent Auriol',
      referentProtectionDonnees3: '75703 Paris Cedex 13.',
      voieElectronique: 'By email:',
      droitLimitationTraitement1: 'You also have a right to limit the processing of your data. Consult the online interface ',
      droitLimitationTraitement2: ' for more information on your rights.',
      plusInfosGestionCookies: 'For more information on how to manage cookies on SignalConso, go to',
      gestionCookies: 'Cookie management',
      cookiesDeposesOptOut: 'Cookies deposited and opt-out',
      interfaceEnLigneDeposeCookie:
        'When you visit SignalConso, a small text file (cookie) is installed on your computer. This allows us to measure the number of visits and to establish the most frequently visited pages.',
      droitIntroduireReclamation:
        'You may also lodge a complaint with the relevant supervisory authority. In this case, this is the French Data Protection Authority (CNIL):',
      commissionNationaleInformatiqueLibertes1: "Commission Nationale de l'Informatique et des Libertés",
      commissionNationaleInformatiqueLibertes2: '3 Place de Fontenoy',
      commissionNationaleInformatiqueLibertes3: '75007 PARIS.',
    },
    planDuSite: {
      pageTitle: 'Site map',
      generalPagesSection: 'General pages',
      reportIncident: 'Report an issue',
      audiencePrivacy: 'Visitor analytics and privacy',
      cookieManagement: 'Cookie management',
      generalConditions: 'Terms of Use – SignalConso',
      accessibilityDeclaration: 'Accessibility statement',
      siteMap: 'Site map',
      aboutUs: 'About us',
      howItWorks: 'How it works?',
      statistics: 'Statistics',
      helpCenter: 'Help center',
      contact: 'Contact',
      calcRetractionDelay: 'Figure out your cooling-off period',
      resolutionTips: 'Tips for resolving individual issues (disputes)',
      telecomResolutionTips: 'Tips for resolving telecom individual issues (disputes)',
      obligationFibre: 'Report a forced migration to fiber optic Internet',
      obsolescencePage: 'Report a device with a lifespan that seems too short',
      signalInfluenceur: '',
      reportIncidentSection: 'Submitting a report',
      reportIncidentFor: 'Report a company for',
      seeFullTree: 'See also',
      completeTree: 'the reporting sequence in full',
      incidentSteps: 'Each step in the reporting process',
      step1: 'Step 1 - The problem',
      step2: 'Step 2 - The description',
      step3: 'Step 3 - The company',
      step4: 'Step 4 - The consumer',
      step5: 'Step 5 - Confirmation',
      proSpaceSection: 'Professional account',
      activateBusinessSpace: 'Activating a business account',
      login: 'Sign in',
      incidentTracking: 'Track reports',
      incidentDetails: 'Report details',
      myCompanies: 'My companies',
      accessManagement: 'Access management',
      passwordModification: 'Change password',
      newsSection: 'News',
      allNews: 'All news',
      dgccrfSpaceSection: 'DGCCRF area',
      companyTracking: 'Company tracking',
      subscriptions: 'Subscriptions',
    },

    delaiRetractation: {
      title: 'Cooling-off period',
      description: 'Cooling-off period – Description',
      pageTitle: 'Cooling-off period',
      calculationSectionTitle: 'Figure out your cooling-off period',
      startDateLabel: 'Start date:',
      deadlineMessagePrefix: 'You have until',
      deadlineMessageSuffix: 'to change your mind.',
      startDateExplanationTitle: 'What is the start date I need to bear in mind?',
      contractTypeHeader: 'Contract type',
      dateToConsiderHeader: 'Date to keep in mind',
      serviceContract: 'Service agreement',
      contractConclusionDate: 'Date of the agreement',
      waterGasElectricityContract: 'Water, gas or electricity supply contracts',
      deliveredProducts: 'Delivered goods',
      deliveryDate: 'Delivery date',
      deliveredProductsMultiplePackages: 'Goods in multiple deliveries',
      receptionDateLastItem: 'Date on which the last item, set or part is received',
      changeOfMindTitle: 'You have 14 days to change your mind',
      justificationNotRequired: 'You do not need to give a reason',
      returnFormOrLetter: 'You need to send',
      recommendedLetterWithAcknowledgment: 'by registered letter with acknowledgement of receipt',
      withinFourteenDays: 'a completed return form or letter within 14 days.',
      canAlsoDoItOnline: 'You may also complete the process online if the seller has a website with the possibility to do so',
      websiteRequirement: '(you must not only return the package)',
      reportingOnWebsiteNotSufficient: 'Submitting a report on our site is not enough to withdraw from a contract.',
      keepDocumentation1:
        'You must retain all documentation proving that you have taken the necessary actions within the time frame.',
      keepDocumentation2: 'For this reason, using registered post is recommended.',
      ifSellerDidNotInform:
        'If the seller did not tell you about your right to withdraw, the cooling-off period is extended by 12 months from the end of the initial cooling-off period.',
      extensionOfTwelveMonths:
        'However, if you receive this information at any time during the extended period, the cooling-off period reverts to the standard 14 days. This period begins on the date you receive the information.',
    },

    conditionsgeneralesconso: {
      description:
        "Users must agree to SignalConso's online terms of use, which cover all software and applications, including websites, sections of websites and mobile apps.",
      signalConsoTitle: 'What can the SignalConso online service be used for?',
      signalConsoDescriptionPart1:
        "SignalConso's online service allows consumers to learn more about consumer law and their rights, as well as report an issue with a company.",
      signalConsoDescriptionPart2: 'It is not the type of service to be called on in an emergency requiring first responders. ',
      appelUrgence: 'For that, you should call 112.',
      servicePayantTitle: 'Is SignalConso a paid service?',
      servicePayantDescription: 'Our online service is available free of charge for all users with internet access.',
      signalerTitle: 'What can someone report using SignalConso ?',
      signalerDescription:
        'Users can report breaches of the Consumer Code, as well as contractual disputes they experience with businesses. The service cannot be used to raise disputes with individuals.',
      traiteSignalementsTitle: 'Who handles reports to SignalConso ?',
      traiteSignalementsDescription:
        'Reports are handled by our staff at SignalConso, who check to confirm that the report falls within the scope of our online service and that the information received is not "sensitive".',
      signalementsVisibles: 'Reports are made visible to the following parties:',
      signalementsVisibleEntreprise: 'the company, whose business is subject of the report, ',
      signalementsVisibleDGCCRF: 'DGCCRF staff, who are qualified to conduct investigations',
      anonymatTitle: 'Are reports anonymous ?',
      anonymatDescriptionPart1: 'Users must sign in with SignalConso and DGCCRF, giving their full name and email address.',
      anonymatDescriptionPart2:
        'However, users may choose to keep their identity secret from the companies or businesses they report.',
      suiviDossierTitle: 'Is it possible to track the status of a report ?',
      suiviDossierDescription:
        'It is not possible to track the status of individual reports on SignalConso. Reports are handled collectively.',
      risqueDenonciationTitle: 'What are the potential consequences of making a false statement ?',
      risqueDenonciationDescription1:
        'Under Article 226-10 of the Criminal Code, "false statements, made by any means and directed at a specific individual, concerning an action that could result in judicial, administrative or disciplinary penalties and that are known to be partly or wholly inaccurate, to an officer of the court or an officer of law-enforcement or administrative police, to an authority with the power to pursue further action or to refer the matter to a relevant authority, or to senior managers or the employer of the individual subject of the statement, are punishable by five years\' imprisonment and a fine of €45,000".',
      risqueDenonciationDescription2:
        'Misuse of the online service for the purpose of making false statements shall result in prosecution.',
      traitementSignalementsAbusifsTitle: 'Wrongful or fraudulent reports',
      traitementSignalementsAbusifsDescription:
        'The right to recourse online does not apply to communications made through misuse, by virtue of their volume, their repetitive or systematic nature, or communications that could undermine the security of computer systems or cause harm to an individual or legal entity (e.g. death threats, insults). In view of this, users who make repeated reports with the potential to cause disruption to the service, or that might overload the systems and resources used to deliver the service, could have their user accounts blocked.',
      mentionsLegalesTitle: 'Legal Notices',
      mentionsLegalesDescriptionPart1:
        'The SignalConso website, https://signal.conso.gouv.fr, is published by the Directorate General for Competition Policy, Consumer Affairs and Fraud Control (DGCCRF), 59 boulevard Vincent Auriol, 75013 Paris.',
      mentionsLegalesDescriptionPart2:
        "The SignalConso website, https://signal.conso.gouv.fr, is hosted by Clever Cloud, with registered office at 3 rue de l'Allier, 44000 Nantes.",
      proprieteIntellectuelleTitle: 'Intellectual property',
      proprieteIntellectuelleDescription:
        'All trademarks, logos, emblems and other content on the online service are protected under the French Intellectual Property Code, and in particular by copyright.',
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
        'SignalConso is a free public service that allows consumers to report issues they experience with companies and businesses.  Make a report, resolve an issue you are experiencing, or find out about your rights.',
      text2: 'It is published by the ',
      dgccrfLink: 'Directorate General for Competition Policy, Consumer Affairs and Fraud Control (DGCCRF)',
      homeLinkTitle: 'DGCCRF (Go to the main page)',
      connexionLinkTitle: 'DGCCRF staff access',
      privacyTitle: 'Tracking and privacy',
      cookiesTitle: 'About cookies',
      retractationLinkTitle: 'Info – Cooling-off period',
      litigeLinkTitle: 'Info – Resolving a dispute',
      refundTelecomLinkTitle: 'Info – Resolving a telecom dispute',
      actualitesLinkTitle: 'News',
      servicePublicPlusLinkTitle: 'Services Publics +',
      suivezNous: `Follow us <br /> on social media`,
      facebookTitle: 'Check out our Facebook page (opens in new window)',
      twitterTitle: 'Follow us on Twitter (opens in new window)',
      instagramTitle: 'Follow Fraud Control on Instagram (opens in new window)',
      linkedinTitle: 'Follow Fraud Control on LinkedIn (opens in new window)',
    },
    header: {
      logoLinkLabel: 'SignalConso - République Française (Go to the main page)',
      homeLinkTitle: `SignalConso (Go to the main page)`,
      connexionLinkTitle: `Business owners portal`,
      indexLinkTitle: 'Report an issue',
      commentCaMarcheLinkTitle: 'How does it work?',
      centreAideLinkTitle: 'Help center',
      voirAussiTitle: 'See also',
      quiSommesNousLinkTitle: 'Who are we?',
      statsLinkTitle: 'Statistics',
      contactLinkTitle: 'Contact',
      actualitesLinkTitle: 'News',
      servicePublicPlusLinkTitle: 'Services Publics +',
      selectLang: 'French version of the website (currently EN)',
      currentLangCode: 'EN',
      currentLang: 'English',
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
      OTHER: 'Other network',
    },
    Train: {
      INOUI_INTERCITES: 'TGV Inoui and Intercités',
      OUIGO: 'Ouigo High speed et Ouigo Classic trains',
      TER: 'TER',
      TRANSILIEN: 'Transilien',
      EUROSTAR: 'Eurostar',
      TGV_LYRIA: 'TGV Lyria',
      TGV_ITALIE: 'TGV Italia',
      TRENITALIA: 'Trenitalia France',
      RENFE: 'Renfe',
      ICE: 'Ice',
      TRAIN_DE_NUIT: 'Night train',
    },
    TrainDescription: {
      INOUI_INTERCITES: 'including connections with TER trains',
      OUIGO: '',
      TER: '',
      TRANSILIEN: '',
      EUROSTAR: 'including Thalys',
      TGV_LYRIA: '',
      TGV_ITALIE: 'including TGV INOUI Italie',
      TRENITALIA: '',
      RENFE: '',
      ICE: '',
      TRAIN_DE_NUIT: '',
    },
    Ter: {
      AUVERGNE_RHONE_ALPES: 'TER AUVERGNE-RHÔNE-ALPES',
      BOURGOGNE_FRANCHE_COMTE: 'TER BOURGOGNE-FRANCHE-COMTE',
      BRETAGNE: 'TER BRETAGNE',
      CENTRE_VAL_DE_LOIRE: 'TER CENTRE-VAL DE LOIRE',
      GRAND_EST: 'TER GRAND EST',
      HAUTS_DE_FRANCE: 'TER HAUTS-DE-FRANCE',
      NOUVELLE_AQUITAINE: 'TER NOUVELLE AQUITAINE',
      NORMANDIE: 'TER NORMANDIE',
      OCCITANIE: 'TER OCCITANIE',
      PAYS_DE_LA_LOIRE: 'TER PAYS DE LA LOIRE',
      SUD_PACA: 'TER SUD PROVENCE-ALPES-CÔTE D’AZUR',
    },
    NightTrain: {
      INTERCITE_DE_NUIT: 'Intercité de nuit',
      NIGHTJET: 'Nightjet',
    },
    trainTaken: 'Which train did you take, or did you want to take?',
    terRegion: 'Region concerned by your TER train',
    whichStation: 'Which station is concerned by your report?',
    foreignRailwayCompany: {
      DE: `Unfortunately, this is a German railway company. Please contact the relevant German authorities.`,
      ES: `Unfortunately, this is a Spanish railway company. Please contact <a href='https://www.transportes.gob.es/' target='_blank' rel='noopener noreferrer'>the relevant Spanish authorities.</a>`,
      GB: `Unfortunately, this is a British railway company. Please contact the relevant English authorities.`,
      AT: `Unfortunately, this is an Austrian railway company. Please contact <a href='https://www.apf.gv.at/en/agency-for-passenger-rights.html' target='_blank' rel='noopener noreferrer'>the relevant Austrian authorities.</a>`,
    },
    foreignTrainCompany: (countryName: string) =>
      `Unfortunately, this is a foreign railway company (${countryName}). Please contact customer service.`,
    dontKnowStation: "I don't find my station",
    homepage: {
      signalconsoCatchWord: ` Report an issue to a company,<br/>find out about your rights with France's Fraud Control.  `,
      step1: 'Have you run into a problem with a French business ?',
      step2: 'Report an issue or ask a question to Fraud Control.',
      step3: 'You may notify the company so that they can respond or rectify the issue.',
      step4: 'Fraud Control gets involved if necessary.',
    },
    searchAnomalies: {
      title: 'What problem did you encounter?',
      noResultFound: `No result found.`,
      tryAnotherKeyword: 'Please try with a new keyword or choose from the list of categories',
      showAllCategories: 'Show all categories',
      other: 'Other',
      displayAllAnomalies: `Display all categories`,
    },
    arbo: {
      title: 'Sequence for reporting an issue',
      notAFraudMessage: 'Although we do believe the issue you experienced was genuine, it was not a case of fraud.',
    },
    yes: 'Yes',
    no: 'No',
    search: 'Search',
    edit: 'Edit',
    next: 'Next',
    nextStep: 'Next step:',
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
    statusEdited: 'Status changed.',
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
    created_at: 'Created :',
    validated: 'Validated.',
    notValidated: 'Not validated.',
    configuration: 'Configuration',
    general: 'General',
    name: 'Name',
    others: 'Others',
    description: 'Description',
    charactersTyped: 'characters',
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
    pendingReport: 'You will lose the ongoing report if you change the language. Are you sure?',
    switchLang: 'Switch language',
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
    optional: 'Optional',
    phonePlaceholder: 'ex : 0612345678 ',
    referenceNumberOptional: 'Reference number (optional): ',
    referenceNumberDesc:
      'To make it easier to process your report, please provide a reference number. This could be a ticket number, booking code, invoice number, agreement number, customer number, or other reference.',
    referenceNumberPlaceholder: 'ex : ZYX987654321',
    genderField: 'Gender',
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
    identification: 'Country identifier',
    address: 'Address:',
    contactAgreement: 'Consent for contact',
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
    youReceivedNewLetter: `Did you receive a letter from us?`,
    siretOfYourCompany: `SIRET of your company`,
    siretOfYourCompanyDesc: `This number should correspond to the company name on the letter.`,
    siretOfYourCompanyInvalid: `The SIRET must contain 14 digits.`,
    activationCode: `Activation code`,
    activationCodeDesc: `6-digit code indicated on the mail.`,
    activationCodeInvalid: `The code must contain 6 digits.`,
    emailDesc: `Your chosen email address.`,
    activityCode: `Activity code`,
    days: `days`,
    selectedPeriod: 'Selected period',
    department: 'Department',
    url: 'URL',
    departments: 'Departments',
    reports: 'Reports',
    responseRate: 'response rate (%)',
    report: 'Report',
    you: 'You',
    step: 'Step',
    step_problem: `Your issue`,
    step_description: `Description of the issue`,
    step_company: `The company`,
    step_influencer: `Influencer`,
    step_consumer: `Your contact informations`,
    step_confirm: `Confirmation`,
    timeFromTo: (from: number, to: number) => `From ${from}h to ${to}h`,
    detailsTextAreaWillBeTransmitted: `The informations you write below will be <b>read by the company</b>. It may also be viewed by Fraud Control.`,
    detailsTextAreaMayBeTransmitted: `As you have not been able to identify the reported company, your report can only be forwarded to them if it is identifiable by Signal Conso and located in France. Fraud Control will be able to consult the information below.`,
    detailsTextAreaCannotBeTransmitted: `As the company is located abroad, the information below will not be transmitted to it and will be read <b>only by Fraud Control.</b>.`,
    detailsTextAreaTransmittableAnonymous: ` If you do not want the company to know your identity, <b>do not mention anything personal</b>.`,
    detailsTextAreaNotTransmittable: `The informations you write below will be read <b>by Fraud Control only.</b>`,
    detailsTextAreaDescription: `To facilitate processing, <b>provide detailed information</b> about your request and <b>include all the information</b> you have in your possession.`,
    detailsTextAreaEmployeeConsumer: `No information will be shared with your employer.`,
    detailsAlertProduitDangereux: {
      title: `Emergency numbers`,
      text: `In the event of an emergency, you can call the relevant `,
      linkText: `emergency number for ambulance, fire brigade and rescue services.`,
    },
    fieldsAreRequired: `Fields marked with an asterisk (*) are required.`,
    pageNotFoundTitle: `Page not found`,
    pageNotFoundHeadTitle: `SignalConso : Page not found`,
    pageNotFoundDesc: `You are on SignalConso. However, you have been directed to a page that does not exist or now has a different address.`,
    month_: {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'Décember',
    },
    monthShort_: {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sept',
      10: 'Oct',
      11: 'Nov',
      12: 'Déc',
    },
    inMonth: 'in',
    gender: {
      Male: 'Mr.',
      Female: 'Ms.',
    },
    detailGraphDataAvailable: 'detailed graph data available below',
    seeRawGraphData: 'See raw graph data',
    fold: 'hide',
    unknownGender: `Not specified`,
    bannerCookie: `SignalConso only uses technical cookies, which do not require user consent.`,
    bannerCookieRemark: `Regarding cookies on signalconso.gouv.fr`,
    bannerCookieSeeMore: `More`,
    problemDoYouWorkInCompany: `Do you work at the company you would like to report?`,
    problemDoYouWorkInCompanyNo: `No, I don't work there`,
    problemIsInternetCompany: `Does your issue relate to an online business?`,
    problemIsInternetCompanyNo: `No, not online`,
    whatsYourIntent: `What do you want to do ?`,
    problemContractualDisputeFormYes: `Resolve my personal issue with the company`,
    problemContractualDisputeFormDesc: `Examples: receiving the parcel, getting a refund, receiving a personalized response, ...`,
    problemContractualDisputeFormNo: `Report an issue so that the company can make improvements`,
    problemContractualDisputeFormNoDesc: `Examples: honoring delivery times, displaying prices more clearly, or improving hygiene practices.`,
    problemContractualDisputeFormReponseConso: `I would like Fraud Control to give me information about my rights`,
    problemContractualDisputeFormReponseConsoExample: `Example: What is the validity period of the quotes I was given? Can a store sell expired products? ...`,
    consumerWishFixContractualDispute: `Your report will be forwarded to the company. Fraud Control does not get involved in resolving individual cases, but <strong>reporting the issue may encourage the company to respond to you.</strong>`,
    reminderBeforeReporting: "Before submitting a report, consider contacting the company's customer service.",
    consumerWishCompanyImprovement: `Your report will be forwarded to the company. You may choose to remain anonymous.`,
    consumerWishGetAnswer: `A member of staff will get back to you shortly.`,
    consumerWishInvestigationIsPossible:
      'Fraud Control may decide to open an investigation based on the informations you provide.',
    consumerWishInvestigationIsPossible2:
      'If a business receives an excessively high volume or frequent number of reports, Fraud Control will investigate the companies in question.',
    employeeConsumerInformation: `To ensure your job security, your details will not be transmitted to the company. It will be read <b>only by Fraud Control</b>.`,
    informationRatingSaved: `Your comments have been recorded, thank you.`,
    informationTitle: `Unfortunately, we are unable to take your report any further.`,
    informationReportOutOfScope: `Although we do believe the issue you experienced was genuine, it was not a case of fraud.`,
    informationWasUsefull: `Was this information useful to you?`,
    buttonReportProblem: `Report an issue`,
    logoAltSignalconso: `SignalConso Logo / Return to homepage`,
    logoAltGouv: `Government Logo`,
    emptyFile: `This file appears to be empty`,
    invalidSize: (maxSize: number) => `The file size exceeds ${maxSize} Mb`,
    invalidFileNameSize: (maxSize: number) => `The file name must not exceed ${maxSize} characters`,
    invalidFileExt: (fileExt: string) => `Impossible de charger un fichier avec l'extension ${fileExt}`,
    dropZone: 'Drag and drop files here, or click on this button:',
    limitTo500chars: `500 characters max`,
    continue: `Continue`,
    suggestion: `Did you mean :`,
    continueWithWebsite: (website: string) => `Continue with ${website}`,
    continueWithInfluencer: (influencer: string) => `Continue with "${influencer}"`,
    invalidUrlPattern: `This does not look like a website`,
    noResult: 'No result',
    noAttachment: 'No attachment.',
    addAttachmentFile: 'Add an attachment',
    attachments: `Attachments: `,
    backToHome: `Go back to home page`,
    city: `City`,
    attachmentsDescAnonymous: `If you do not want the company to know your identity, <b style="color: black">remove your name</b> where it appears on your attachments.`,
    attachmentsDescAllowedFormat: (formats: string[]) => `The following formats are accepted : ${formats.join(', ')}`,
    attachmentsDesc2: `Including an attachment (for example: a contract, an invoice, exchanges with customer service...) <strong>GREATLY</strong> increases your chances that corrective action will be taken.<br/> You must not share private or sensitive information (e.g. bank account details or medical records).`,
    maxAttachmentsZero: (max: number) => `You can upload up to ${max} attachments`,
    maxAttachmentsReached: (max: number) => `${max} attachments limit reached`,
    maxAttachementExceeded: (max: number, toRemove: number) =>
      `${max} attachments limit exceeded. You need to remove ${toRemove}.`,
    maxAttachmentsCurrent: (current: number) => `You can still upload up to ${current} attachments`,
    menu_howItWorks: `How it works?`,
    menu_home: `Home`,
    menu_help: `Help`,
    menu_authSpace: `Pro space`,
    website: 'Website',
    modifyWebsite: 'Edit the website',
    clearWebsite: 'Clear the website',
    clearSiret: 'Clear the number',
    clearPhone: 'Clear the phone number',
    canYouIdentifyCompany: `Can you identify the company?`,
    canYouIdentifyCompanyDesc: `SignalConso needs to know this in order to be able to contact them and notify Fraud Control.`,
    websitePlaceholder: 'Example: https://www.site.com',
    identifyBy_barcode: `By the barcode number on the product`,
    identifyBy_barcodeDesc: `We'll tell you how to find it`,
    identifyBy_name: `By its name and post code`,
    identifyBy_nameDesc: `French companies only`,
    identifyBy_identity: `By its SIRET or SIREN or RCS number`,
    identifyBy_identityDesc: `These numbers identify every French company. We'll tell you how to find them`,
    identifyBy_none: `I am unable to identify the company, or the company is outside France`,
    identifyBy_noneDesc: `If you are unable to identify the company, you can continue with your report.
      It will not be forwarded to the company, unless it is based in France and SignalConso can establish its identity.
      Fraud Control will still be notified.`,
    couldYouPrecise: `Can you give us more details?`,
    cantIdentifyCompany: `As you are unable to identify the company, please give your location so that we forward your report to the appropriate department.`,
    cantIdentifyWebsiteCompany: `Please give your current post code of residency in France. We'll use it only to assign your report to the right Fraud Control department.`,
    cantIdentifyTransporterWebsiteCompany: `As you are unable to identify the carrier, please give your location so that we can forward your report to the appropriate department.`,
    cantIdentifyMerchantWebsiteCompany: `As you are unable to identify the seller, please give your location so that we can forward your report to the appropriate department.`,
    cantIdentifyLocationCompany: `As you are unable to identify the company that came to your home, please give your location so that we can try to connect the information you gave to other reports involving the same company that might have been made in your local area.`,
    cantIdentifyPhoneCompany: `As you are unable to identify the company you spoke with on the phone, please give your location so that we can try to connect the information you gave to other reports involving the same company that might have been made in your local area.`,
    companyIdentityLabel: `SIRET or SIREN or RCS number of the company`,
    companyIdentityPlaceholder: `Ex: 83350861700010`,
    barcodeProduct: 'Product',
    barcodeCompany: 'Company',
    barcodeNoDescriptionFound: 'No description for this product.',
    barcodeNoCompanyFound: 'No company associated with this barcode. Perhaps the product comes from abroad?',
    barcodeNoProductFound: 'No products found for this barcode.',
    barcodeWhereToFind: 'GTIN number found under the product barcode',
    barcodeLabel: 'Barcode (GTIN):',
    barcodeHelp: 'Barcode help',
    barcodeHelp2: 'You will find this number under the barcode on the product or its packaging.',
    howToFindIt: `How to find it?`,
    howToFindThem: `How to find them?`,
    postalCode: `Post code`,
    selectPostalCode: `Select the post code`,
    youCanSearchByCity: `You can search by town/city or enter the post code`,
    aboutCompany: `About the company`,
    selectCompany: `Select company`,
    select: `Select`,
    verify: `Check`,
    isHeadOffice: 'Head office',
    closedCompany: 'Company closed',
    closedCompanyText:
      'The company you are looking for has ceased trading. We cannot therefore process your report involving this company.',
    governmentCompany: 'Public-sector or government body',
    siretNumber: 'SIRET number',
    cannotReportGovernmentCompany: 'It is not possible to report a public-sector organisation.',
    selectCompanyDesc: `If the company you are looking for does not appear, you can amend your search.`,
    isAFrenchCompany: `Is the company based in France?`,
    noItsForeign: `No, it is based outside France`,
    companyHowToFindCountry: `How do I find the country where a company is based?`,
    iDontKnown: `I don't know`,
    CannotTransmitToForeignCompany: `
          As the company is located abroad, your report cannot be forwarded to them.
          <b>We strongly advise you to submit your report anyway</b> to help DGCCRF agents in their investigations.
    `,
    phoneNumberHavingCalled: `Phone number used to call you`,
    phoneNumberHavingCalledPlaceholder: `Ex: 06 00 00 00 00`,
    noMatchingCompany: `Your search did not return any results.`,
    youCanOnlyReportFrenchCompanies: `You can only report private businesses based in France.`,
    yourStreet: `Your street`,
    yourStreetDesc: `House number not required`,
    yourStreetPlaceholder: `Ex: avenue de Ségur`,
    yourPostalCode: `Your post code`,
    yourPostalCodePlaceholder: `Ex: 41110`,
    yourCity: `Your city`,
    noOptionsText: `No result`,
    loading: `Loading...`,
    yourCityPlaceholder: `Ex: Lyon`,
    continueReport: `You have a report in progress`,
    reportedCompanyName: `Company name or trading name of the reported business`,
    reportedCompanyNamePlaceholder: `Ex: Boulangerie Petit Jean`,
    companyIdentifiedTitle: `Company identified`,
    influencerIdentifiedTitle: `Influencer identified`,
    influencerUnknownTitle: 'Warning',
    influencerUnknownDesc:
      'Make sure that the name or pseudonym exists and is spelled correctly. Accurate information will facilitate the work of our services.',
    companyIdentityHelperTitle: 'Help to find SIRET/SIREN',
    companyIdentityHelperWhere: `Where to find these identifiers?`,
    companyIdentityHelperWebsite: `On a website`,
    companyIdentityHelperInvoice: `On an invoice`,
    companyIdentityHelperReceipt: `On a receipt`,
    companyIdentityHelperCreditCardReceipt: `On a credit card receipt`,
    companyIdentityHelper: `What do these identifiers refer to?`,
    companyIdentityHelperWhereDesc: `
      You can find this number on quotes, invoices and cashier receipts issued by the company, as well as in the legal notice on the company website.
    `,
    companyIdentityHelperWhereDesc0: `
       On the company's website, go to the bottom of the home page.
    `,
    companyIdentityHelperWhereDesc2: `
      Click on "Legal notice" ("Mentions légales"). A new page should open, where you will be able to find this number easily:
    `,
    companyIdentityHelperImages: {
      footer: `Example of a website footer in French containing the links C.G.V, C.G.U, Mention légales, Données personnelles, Gestions des Cookies, Avis, Contact, FAQ et Aide.`,
      mentionsLegales: `In this example, the SIRET number is found in the paragraph under the title "Mentions légales": "Le site abcdef.fr est [...] under number 123456789".`,
      bill: `Example of a typical invoice in French. In the top left, we see the company's name and address, followed by "SIRET: 12345679 00001". At the very bottom of the invoice, the company name appears again, along with other legal details, and again "SIRET: 12345679 00001".`,
      ticket: `Example of a French receipt from a purchase in a store. At the very bottom of the receipt, after the total purchase price and the VAT amount, there's a line reading "SIRET: 12345679 00001".`,
      card: `Example of a bank card receipt. Around the middle of the receipt, there's a line with "Company Name", another with "Transaction Location", and then another line that starts with zeros "00 00000" and continues with a SIRET number "123456789 001".`,
    },

    clientReferenceHelperTitle: 'Client Reference Help',
    clientReferenceHelper: 'What does my client reference correspond to?',
    clientReferenceHelperWhere: 'Where can I find my client reference?',
    clientReferenceHelperWhereDesc: 'You can find it on an invoice, a quote issued by the company, and also on your client area.',
    clientReferenceHelperDesc: `A client reference corresponds to a series of characters that uniquely identifies you.<br/> Depending on the company, it can have different names:<br/> <ul> <li>Client code</li> <li>Client number</li> <li>Subscriber number</li> </ul> If you cannot find a client reference, provide your phone number or email address used by the company to contact you.<br/>`,
    clientReferenceHelperWhereDesc0:
      'Log in to your client area, look for your client number on the homepage or on your profile page:',
    clientReferenceHelperImages: {
      website: 'Example of a website containing a client reference.',
      invoice:
        "Example of a typical invoice. It can include client information, among which the client's reference and their contact details.",
      reservation: 'Example of a hotel booking confirmation, where a reservation number is found.',
    },
    clientReferenceHelperInvoice: 'On an invoice',
    clientReferenceHelperReservation: 'On a reservation',

    consumerTitle: `Your contact details allow us to authenticate your report`,
    consumerAskCodeTitle: `Enter the validation code.`,
    consumerAskCodeDesc: (email: string) => `An email has been sent to <b>${email}</b>`,
    consumerCodePlaceholder: `______`,
    consumerEmailMayTakesTime: `The email may take a few minutes to reach you`,
    consumerValidationCode: 'Validation code (6 digits)',
    consumerInvalidCode: `Incorrect code`,
    consumerResentEmail: `Resend`,
    consumerDummyEmailNotAccepted: `Disposable email addresses are not accepted.`,
    consumerAliasEmailNotAccepted: `You already have used an alias of this email today.`,
    consumerCannotReportSignalConso: `Please enter the URL of the site you want to report. 'Signal conso' is not a correct value.`,
    consumerValidationCodeExpired: `Incorrect code, please try again.`,
    consumerValidationCodeInvalid: `Incorrect code, please try again.`,
    consumerIsEmployee: `
      <strong>You state that you work at the company you would like to report.</strong>
      <p>
        Your report will be read by <b>Fraud Control staff only</b>.
        <br/>
        Your contact details will be used by our investigations team only.
        Our investigations team may get in touch with you to confirm your identity and your report.
      </p>
      Your employer will not be made aware of your report.
      <br/>
      If our team are required to disclose your identity to a court authority or your employer as part of our investigation, they will ask for your permission first. 
      <b>You can decline this request.</b>
    `,
    consumerAnonymousInformation: `You will remain anonymous, but the company will not be able to resolve your specific issue. This means that resolutions such as refunds or personalised responses will not be possible.`,
    confirmationTitle: `Summary of your issue`,
    confirmationAlertTransmittable: `Check every detail of your report before sending it to the company and to Fraud Control.`,
    confirmationAlert: `Check every detail of your report before sending it to Fraud Control.`,
    contactAgreementLabel: `Do you want to share your contact details with the company ?`,
    contactAgreementTrueTitle: `I am sharing`,
    contactAgreementTrueDesc: `my contact details and reference number with the company or business so that they can contact me regarding my report (<b>and nothing else</b>). I understand that Fraud Control will not have access to these communications and will not therefore be able to monitor them.`,
    contactAgreementFalseTitle: `I don't want to share`,
    contactAgreementFalseDesc: `my contact details or reference number with the company. Only Fraud Control will be able to access these details.`,
    companySelectCountryTitle: `Select the country where the company is based`,
    companyWebsiteVendorAlert: `The business you have selected is a marketplace, i.e. a business that offers products available from third-party sellers.`,
    companyWebsiteVendorTitle: `Can you identify the seller?`,
    companyWebsiteVendorLabel: `Name of the third-party seller`,
    companyWebsiteVendorDesc: (companyName: string) => `Only if the seller is not ${companyName}`,
    companyIdentityHelperDesc: `
    SIRET, SIREN and RCS numbers are all identifiers for French companies.<br/>
    SIRET is a 14-digit code; SIREN is a 9-digit code.<br/>
    The RCS number is made up of:<br/>
      <ul>
        <li>the reference ""RCS""</li>
        <li>the name of the town/city of registration</li>
        <li>one letter (A or B)</li>
        <li>the SIREN number</li>
      </ul>
    `,
    noMatchingCompanyDesc: `Please amend your search or include the company identifiers in your search.`,
    howToFindCompanyCountry: ``,
    howToFindCompanyCountryDesc: `
      On the company's website, go to one of the following links:
      <ul>
        <li>legal notice</li>
        <li>terms and conditions (Ts&Cs)</li>
        <li>terms of use</li>
      </ul>
      In most cases, these links will be found at the bottom of the website home page. The company's address should be given in one of these sections.<br/>
      Note that it is possible for two different companies to be mentioned on these pages. One of these is the website host. The host's address is not relevant to your search.
    `,
    confirmationBtnReponseConso: `Send query`,
    confirmationBtn: `Send report`,

    acceptedReportStat: `companies have promised to take action since SignalConso began`,
    acceptedReportStatName: `Number of commitments made`,

    reportsCountStat: ` reports have been submitted since SignalConso began`,
    reportsCountStatName: ` Number of reports submitted`,

    transmittedRateStat: `of reports were forwarded to the company or business in question`,
    transmittedRateDescription: `Why not 100%? In some cases (e.g. online purchases), consumers were unable to identify the company or business in question.`,
    transmittedRateStatName: `% of reports forwarded to the company or business`,

    readRateStat: `of reports submitted were read by the company or business`,
    readRateDescription: `Why not 100%? SignalConso is a voluntary service. Businesses are not required to set up an account and read the report.`,
    readRateStatName: `Reports read by the company or business`,
    respondedRateStat: `of all viewed reports received a response from the company or business`,
    respondedRateDescription: `When a business receives a report, they have the option, but not the obligation, to respond to the consumer.`,
    respondedRateStatName: `% of reports that get a response from the company or business`,

    websiteReportsRateStat: `of reports submitted since SignalConso began are related to an online business`,
    browserCompatMessage: `Your web browser is obsolete. If you are not using the most recent version of your browser, you may encounter some issues when using SignalConso.`,

    minimalErrorTitle: 'Technical problem',
    minimalErrorText: 'There was a problem displaying content on SignalConso. Try to go back and resume what you were doing.',

    landing: {
      bigReportButton: 'Report an issue',
      whatsSignalConso: 'What is SignalConso ?',
      heroCardTitle1: 'Because it’s easy!',
      heroCardText1:
        'During the process, you will be asked questions to help you identify your issue and word your report properly.',
      heroCardTitle2: 'Because it’s fast!',
      heroCardText2: 'Just 5 minutes and your report is sent.',
      heroCardTitle3: 'Because it’s effective',
      heroCardText3: '65% of companies and businesses respond to reports.',
      signalConsoWillHandle1:
        'SignalConso takes care of the rest. Your report is sent to the company or business and can be viewed at any time by our team at DGCCRF... tout de suite! If you asked about your rights, a member of our team will get in touch with you to respond to your query and offer guidance on what to do next.',
      signalConsoWillHandle2:
        'If necessary, you can opt to remain anonymous. Otherwise, we will share your details with the company or business, so that they can contact you directly.',
      signalConsoWillHandle3:
        'Your report will also be logged on the DGCCRF database. This ensures our staff have the best possible information to support their checks and investigations.',
      moreThanOneCat: 'To report a company or business, select the appropriate category',
      discoverButton: 'Learn more',
      whatIsText1:
        "Every day in France, some 60 million consumers buy goods and services from almost 10 million businesses. Some of these purchases take place online. How are consumer rights monitored? By our staff of 3,000 officers at DGCCRF. That's why ",
      whatIsText2: ' was launched.',
      whatIsText3:
        "Despite the best efforts of our investigators, we can't uncover everything, especially the most minor and frequent offences. That's why you, the consumer, are the one best placed to spot them and to exercise your rights.",
      whatIsText4:
        'This site provides assistance before, during and after a purchase. In just a few clicks, you can report any issues you run into when dealing with companies or businesses. SignalConso is also on hand to respond to your queries, provide guidance about your rights as a consumer, and help you navigate the stages of the process, referring you to the appropriate person where necessary.  ',
      whatIsText5:
        'Companies and businesses that are reported can view reports that you make and may opt to rectify an issue of their own accord. If a business receives an excessively high volume or frequent number of reports, the DGCCRF investigation team may take further action.',
      samples: 'Issues that have been reported to us',
    },
    shareYourReview: `Share your review`,
    thanksForSharingYourReview: `Your feedback has been heard, thank you.`,
    youCanRateSignalConso: `I recommend SignalConso:`,
    youCanAddCommentForDGCCRF: `You can, if you want, provide further details <b>for Fraud Control</b>. It will <b>not be sent to the company</b>.`,
    didTheCompanyAnsweredWell: `Are you satisfied with the response you received from the company?`,
    reviewIsDefinitive: `Careful, after submitting your review, you won't be able to change it.`,
    iAmHappy: `I am satisfied by the company's response`,
    iAmNeutral: 'I stay neutral',
    iAmUnhappy: 'I am unhappy with their response',
    send: `Send`,
    whichWebsiteTransporterTitle: "As you chose the carrier yourself, please provide the carrier's website address here",
    whichWebsiteMerchantTitle: "Please provide the merchant's website address",
    whichWebsiteTransporterText: 'Since you have chosen your carrier yourself, you must indicate its website here',
    whichWebsiteMerchantText: 'Give the name of the merchant',

    thereAreSimilarReports: 'One or more similar reports have already been made',
    websiteDoesNotExist1: 'The website you have indicated does not seem to be available.',
    websiteDoesNotExist2: 'Perhaps you made a typo?',
    websiteDoesNotExist3: 'It may have been deleted by its owner or host',
    websiteDoesNotExist4:
      'If you are sure of the spelling, you can still report it, and we will be able to cross-check it with other reports.',
    acknoledgment: {
      sentReport: `Your report has been sent.`,
      notSentReport: `Your report will not be sent to this business.`,
      whatWillHappenToCompany: `What will happen to the company?`,
      questionTransmittedToDGCCRF: `Your question is forwarded to the Directorate General for Competition, Consumer Affairs, and Fraud Control (<abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>) - also known as "Fraud Control".`,
      yourDetailsForInvestigators: `Your details are <b>for Fraud Control's investigators use only</b>.`,
      fraudsResponseTime: `Fraud Control will respond to you as soon as possible.`,
      youIndicatedEmployment: `You indicated that you are an employee of the reported company.`,
      jobSecurityGuarantee: `To ensure the security of your job, your report will not be sent to the company. However, it has been recorded in Fraud Control's database (<abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>).`,
      foreignCompanyReport: (countryName: string) => `You indicated that the company is a foreign business (${countryName}).`,
      reportToEuropeanConsumers: `We invite you to report directly to the European Consumer Centre for assistance in resolving your issue.`,
      reportToAndorraCommerce: `We invite you to report directly to the Andorra Commerce and Consumer Service.`,
      investigatorsTransferToAuthorities: `However, Fraud Control's investigators will transfer it to the competent authorities of that country.`,
      reportToEConsumer: `We encourage you to report to econsumer.gov to assist international authorities in combating fraud.`,
      whatWillHappenNow: `What will happen now?`,
      reportTransmittedToDGCCRF: `<p>Your report is transmitted to the Directorate General for Competition, Consumer Affairs, and Fraud Control (<abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>) - also known as "Fraud Control".</p><p>However, it will not be forwarded to the reported company unless the company is French and identifiable by the SignalConso team. In that case, you will receive a notification.</p>`,
      fraudsNotHandlingIndividualIssues: `Fraud Control does not directly handle individual issues (disputes) between a consumer and a company.`,
      companyHasThreeMonths: `The company has three months to review the report.`,
      fraudsCanInvestigate: `Fraud Control may initiate an investigation with the establishment if many consumers are affected or if the practice is particularly severe.`,
      emailWithNextSteps: `You will receive an email outlining the steps that SignalConso encourages you to take in parallel.`,
      companyReceivesReport: `<p>The company will receive your report. It will have the opportunity to directly address the issue using your information. Your name and contact details will be provided to the company if they wish to respond to you.</p><p>Your report is also transmitted to the Directorate General for Competition, Consumer Affairs, and Fraud Control (<abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>) - also known as "Fraud Control". If your issue concerns other consumers, Fraud Control will conduct an inspection of the establishment.</p>`,
      companyReceivesReportWithoutIdentity: `<p>The company will receive your report without knowing your identity. It will have the opportunity to directly address the issue using your information.</p><p>Your report is also transmitted to the Directorate General for Competition, Consumer Affairs, and Fraud Control (<abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>) - also known as "Fraud Control". If your issue concerns other consumers, Fraud Control will conduct an inspection of the establishment.</p>`,
      paidWithCreditCard: `Did you pay with your credit card?`,
      chargeBack: `Through the charge-back procedure, you may be eligible for a refund following an online purchase:`,
      emailForErrorInReport: `In case of an error in your report, send an email to `,
    },
    externalLink: 'External link',
  },
}
