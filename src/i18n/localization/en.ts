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
      contractualDispute: {
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
      homepage: {
        title: 'SignalConso, a public service for consumers',
        description:
          'Report an issue to a company (e.g. retailers, local stores, cafés and restaurants) and Fraud Control if you have concerns about hygiene, food and drink quality, product descriptions, pricing or payment policies, advertising or other retail services.',
      },
      anomaly: {
        title: 'Reporting sequence – SignalConso',
        description: 'Sequence for reporting an issue',
      },
      actualites: {
        title: 'News - SignalConso',
        description: 'News and updates from the SignalConso website and Fraud Control',
      },
      faireUnSignalement: {
        etape: 'Step',
        sur: 'of',
      },
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
        description1: `Report the problem (anonymously if you prefer) or submit a question directly to a member of staff of Fraud Control.`,
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
    },
    accessibilite: {
      pageTitle: 'Accessibility statement',
      paragraph1:
        'The Minister for the Economy, Finance and the Recovery shall make the service accessible in accordance with Article 47 of Act 2005-102 of 11 February 2005.',
      paragraph2: 'This accessibility statement applies to SignalConso.',
      conformityStatusTitle: 'Compliance statement',
      conformityStatusText: `SignalConso is <b>partially compliant with RGAA 4.0</b>. Partial compliance means that some sections of content are not fully compliant with accessibility standards.`,
      testResultsTitle: 'Test results',
      testResultsText: 'An external compliance audit reported that 78% of RGAA criteria had been met.',
      nonAccessibleContentTitle: 'Inaccessible content',
      nonAccessibleContentText: 'The items of content listed below are not accessible for the following reasons.',
      nonConformityTitle: 'Non-compliance',
      nonConformityText:
        'Despite our best efforts, some content remains inaccessible. Below is a list of known limitations and some potential solutions:',
      monthStats: 'Monthly statistics',
      disproportionateBurdenTitle: 'Disproportionate burden exemption',
      disproportionateBurdenText1:
        'HTML validity cannot be guaranteed for all pages. However, to our knowledge, this does not cause technical aids to malfunction. The workload involved in reworking and confirming the validity of all website pages would be disproportionate to the expected benefit.',
      disproportionateBurdenText2:
        'Videos have no audio description, subtitles or text transcription. The unit responsible for publishing these presentations is currently unable to provide this material for all videos.',
      accessibilityReportTitle: 'Viewing the accessibility report',
      accessibilityReportText: 'Read the accessibility report',
      rebecaPlatform: 'on Rebeca.',
      evaluationGridText:
        ', simply type in "Accessibility audit report signal.conso.gouv.fr". You will also be able to view the evaluation grid in the attached documents.',
      declarationEstablishmentTitle: 'About the accessibility statement',
      declarationEstablishmentText: 'This statement was produced on 4 September 2020.',
      usedTechnologiesTitle: 'Technologies used',
      usedTechnologiesText: 'The following technology applications are used to enable accessibility to SignalConso:',
      assistiveTechnologiesTitle: 'User agents, assistive technologies and systems used to verify accessibility',
      assistiveTechnologiesText: 'Webpage tests were carried out using the following web browser and screen reader combinations:',
      assistiveTechnologiesList1: 'Internet Explorer 11 and JAWS 2018',
      assistiveTechnologiesList2: 'Safari and VoiceOver on iPhone',
      complianceVerificationPagesTitle: 'Site pages used in compliance checks',
      home: 'Report an issue',
      quiSommesNous: 'About us',
      commentCaMarche: 'How the process works',
      stats: 'Statistics',
      aide: 'Help',
      etape1: 'Step 1 - The problem',
      etape2: 'Step 2 - The description',
      etape3: 'Step 3 – The company',
      etape4: 'Step 4 - The consumer',
      etape5: 'Step 5 - Confirmation',
      connexionEspacePro: 'Sign in to your professional account',
      espaceProSuivi: 'Professional account – Track reports',
      espaceProDetail: 'Professional account – Report details',
      espaceProEntreprises: 'Pro space - My companies',
      espaceProGestionAcces: 'Pro space - Access management',
      improvementContactTitle: 'Improvement and contact',
      improvementContactText:
        'If you are having trouble accessing content or a particular service, you can contact the SignalConso administrator, who can direct you to an available alternative or obtain the content in a different format.',
      supportEmail: 'E-mail : support@signal.conso.gouv.fr',
      recourseTitle: 'Recourse',
      recourseText:
        'This procedure should be followed in instances where you have reported a problem with accessibility that prevents you from accessing portal content or services and did not receive a satisfactory response.',
      recourseOptions: 'You can:',
      defenseurDesDroits: 'Write to the ',
      defenseurDesDroitsLink: 'Ombudsman (<i>Défenseur des droits</i>)',
      defenseurDesDroitsDelegue: 'Contact ',
      defenseurDesDroitsDelegueLink: 'the Deputy Ombudsman (<i>délégué du Défenseur des droits</i>) for your region',
      postalAddress: 'Send a letter by post (free of charge, no stamp required):',
    },
    contact: {
      title: 'Contact',
      problemMessage: 'Have you run into a problem with a business and want to report it?',
      problemSolution: 'SignalConso can help! Go to our main page, pick a category and answer a few simple questions.',
      technicalIssue: 'Does your query relate to a technical issue with SignalConso?',
      exampleText: 'For example:',
      example1: 'You are unable to locate the SIRET number for the company you want to report',
      example2: 'You experience a glitch while visiting the website',
      example3: 'You are unable to find the right category for your issue',
      emailText: 'Send us an email at',
      emailTitle: 'Are you experiencing a technical issue on our site? Contact us (default email client will open).',
      alertDescription: `This email address is not meant to submit your report, we wouldn't be able to process it. Reports must be submitted by following the steps shown on the home page.`,
      alertTitle: 'Do not send us a report by email – it will not be read.',
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

    centreaideconso: {
      generalTitle: 'General',
      howSignalConsoWorks: 'How does SignalConso work?',
      howSignalConsoWorksContent: 'Check out our page ',
      howSignalConsoWorksLink: 'How it works',
      reportIssueTitle: 'I want to report an issue',
      wrongCategory: "I can't find the right category",
      wrongCategoryContent1:
        "In this English version of SignalConso, we cover the main business sectors typically used by a foreigner in France. If you're comfortable with French, you can instead switch to the French version, which covers all business sectors.",
      wrongCategoryContent2:
        'If you are unsure which category to choose or want us to create a new one, you can contact the support team.',
      difficultyCompletingForm: 'I\'m having trouble completing step 3 of the form ("the company")',
      difficultyCompletingFormContent1:
        'The list of companies on the form is taken from a government database. We use the information from the database entry to contact the company in question.',
      difficultyCompletingFormContent2: "The company you're looking for might not appear for a number of reasons:",
      difficultyCompletingFormContent3: 'The company is based outside France',
      difficultyCompletingFormContent4:
        'If the company you want to report is not based in France, we will ask you for their name and country.',
      difficultyCompletingFormContent5:
        'With this information, we will be able to redirect you to the relevant authorities if necessary.',
      difficultyCompletingFormContent6: "I don't have the company's name or address",
      difficultyCompletingFormContent7:
        "This might happen if you only have a telephone number or email address and can't access the company's terms and conditions.",
      difficultyCompletingFormContent8:
        "If you want to report a company but don't have their name, website address or contact details, you will need to contact the DGCCRF branch for your département directly.",
      difficultyCompletingFormContent9: "I have the company's name and address, but I don't see it listed",
      difficultyCompletingFormContent10:
        "The name of a business (i.e. its displayed name) might not be the same as its official or corporate name. The address for the company's head office may also be different from the business address.",
      difficultyCompletingFormContent11:
        "The form can help you find a company's SIRET number. The SIRET is a unique number assigned to every French company. If you still cannot find the business listing, you can contact the support team.",
      errorOnSendOrNext: 'I have an error message when I click on "send" or "next"',
      errorOnSendOrNextContent1:
        'Check your internet connection and try to send the form again. An error message often appears when an internet connection drops momentarily.',
      errorOnSendOrNextContent2:
        'You might have tried to send the same report twice. It is not possible to send the same report (i.e. same category, same company) twice.',
      errorOnSendOrNextContent3: 'If you are still unable to send the form, you can contact the support team.',
      reportedIssueTitle: 'I have made a report',
      noUpdateSinceReport: 'Since I made my report, I have not received any updates',
      noUpdateSinceReportContent1: `After sending your report, you should have received an email containing an <b>acknowledgement of the report</b>. If you did not receive one, please contact the support team. It is possible that you did not confirm the final step or that the email address you provided contains an error.`,
      noUpdateSinceReportContent2: 'You will then receive the following email updates:',
      noUpdateSinceReportContent3: ' when the company has read your report',
      noUpdateSinceReportContent4: ' when the company has responded to your report, or',
      noUpdateSinceReportContent5: 'to notify you that the company did not want to read and/or respond to your report',
      noUpdateSinceReportContent6: 'Companies have up to eight weeks to view and respond to your report.',
      noUpdateSinceReportContent7:
        'The time taken to read and respond to a report will vary from business to business. If the company already has a SignalConso account, turnaround times will be quicker.',
      noUpdateSinceReportContent8:
        'If Fraud Control decide to launch an investigation, you will not be notified of this by email.',
      howToGetRefund: 'How do I get a refund or resolve my issue?',
      howToGetRefundContent1:
        'As indicated on SignalConso, Fraud Control will use your report to identify which companies should be audited.',
      howToGetRefundContent2:
        'These checks will aim to establish if the businesses are engaging in bad practices and, where this is the case, apply appropriate penalties.',
      howToGetRefundContent3:
        'However, Fraud Control does not get involved in the process of obtaining a refund or compensation for you.',
      howToGetRefundContent4:
        'Those actions remain your responsibility and are highlighted as potential options when you complete your report and in your confirmation email.',
      howToGetRefundContent5: 'You can also find out how to complete these actions on this page: ',
      howToGetRefundContent6: 'Apply for a refund or find a solution to your issue',
      modifyOrDeleteReport: 'I want to withdraw or make changes to my report',
      modifyOrDeleteReportContent1: ' To withdraw or make changes to your report, you can ',
      modifyOrDeleteReportContent2: 'contact the support team',
      askQuestionToFraudRepression: 'I want to ask a question to Fraud Control',
      cantFindWhereToAsk: "I can't find where to do it",
      cantFindWhereToAskContent1: 'Depending on the category you selected when making your report, this button will appear:',
      cantFindWhereToAskContent2:
        'It is not available in all categories. Currently, in the English version of SignalConso, it is not available at all.',
      whereToEnterQuestion: 'Where do I submit my question?',
      whereToEnterQuestionContent: 'You will be able to give details about your situation and write your question in step 2:',
      errorOnSendOrNextQuestion: 'I get an error message when I click "send" or "next"',
      errorOnSendOrNextQuestionContent1:
        'Check your internet connection and try to send the form again. An error message often appears when an internet connection drops momentarily.',
      errorOnSendOrNextQuestionContent2:
        'You might have tried to send the same report twice. It is not possible to send the same report (i.e. same category, same company) twice.',
      errorOnSendOrNextQuestionContent3: 'If you are still unable to send the form, you can contact the support team.',
      askedQuestionToFraudRepression: 'I asked a question to Fraud Control',
      noResponseReceived: 'I have not received any response',
      noResponseReceivedContent:
        'If you selected "I would like Fraud Control to give me information about my rights" and your request is explicit, you will receive a response shortly, typically within eight days, depending on the complexity of your query. You should avoid submitting another query, as this could cause confusion.',
      urgentRequest: 'My request is urgent',
      urgentRequestContent:
        'Requests are reviewed as quickly as possible. If deadlines or expiry dates are a factor in your complaint, you will be notified of your rights and how to enforce these immediately, subject to the relevant contractual terms.',
      foundAnswerAndWantToCancel: 'I got a response and would like to cancel',
      foundAnswerAndWantToCancelContent:
        'We really appreciate that you took the time to let us know, you can repeat the request process, giving your full name and confirming that your issue has been resolved; this updated information will be linked to your initial request. Otherwise, you can wait for the forthcoming response to your initial request.',
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
      suiviAudienceViePrivee: 'Visitor analytics and privacy',
      donneesPersonnelles: 'Personal data',
      infoRecueillies:
        "Information that is collected from the SignalConso form is stored by SignalConso (DGCCRF) on a computer-readable file to enable correction by staff and allow DGCCRF to follow up on reports for audit purposes. The legal basis for processing is DGCCRF's public service remit, which includes checking and applying penalties for breaches of the Consumer Code (L511-3 of the Consumer Code and L450-1 of the Commercial Code).",
      infoDemandees:
        'Information that we ask for when submitting a report is required in order for reports to be processed. In particular, email addresses may be used by SignalConso (specifically, software and applications, including websites, sections of websites and mobile apps) to notify the consumer of any updates regarding a report (notification system).',
      infoSignalement:
        'Details regarding a report (i.e. the statement and any attachments) are kept by DGCCRF for five years for the purpose of investigation, surveys and any consequences thereof.',
      declarationsObjetRetraitement:
        'DGCCRF, as operator of the online service, undertakes not to make use of any personal information shared by the user for commercial purposes. Statements may be reprocessed by the authority for statistical purposes as part of its remit. Information contained on SignalConso does not include personal or nominative data and is provided free of charge without restriction on the online service ',
      aFrequenceReguliere: 'on a regular basis.',
      utilisateurDroitAcces:
        'Users have a right of access, rectification, erasure and objection over their personal data, which can be exercised upon request ',
      parEmail: 'by email.',
      consultezInterfaceCnil:
        'Visit cnil.fr for more information about your data rights. If, after contacting us, you believe that your data protection rights have not been respected, you can submit a complaint to the French Data Protection Authority (CNIL).',
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
      actualitesLinkTitle: 'News',
      servicePublicPlusLinkTitle: 'Services Publics +',
      suivezNous: `Follow us <br /> on social media`,
      facebookTitle: 'Check out our Facebook page (opens in new window)',
      twitterTitle: 'Follow us on Twitter (opens in new window)',
      instagramTitle: 'Follow Fraud Control on Instagram (opens in new window)',
      linkedinTitle: 'Follow Fraud Control on LinkedIn (opens in new window)',
    },
    header: {
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
      signalconsoCatchWord: ` Report an issue to a company,<br/>find out about your rights with France's Fraud Control.  `,
      step1: 'Have you run into a problem with a French business ?',
      step2: 'Report an issue or ask a question to Fraud Control.',
      step3: 'You may notify the company so that they can respond or rectify the issue.',
      step4: 'Fraud Control gets involved if necessary.',
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
      title: 'Sequence for reporting an issue',
      expandAll: 'Expand all',
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
    detailsTextAreaTransmittable: `The informations you write below will be <b>read by the company</b>. It may also be viewed by Fraud Control.`,
    detailsTextAreaTransmittableAnonymous: ` If you do not want the company to know your identity, <b>do not mention anything personal</b>.`,
    detailsTextAreaNotTransmittable: `The informations you write below will be read <b>by Fraud Control only.</b>`,
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
    consumerWishCompanyImprovement: `Your report will be forwarded to the company. You may choose to remain anonymous.`,
    consumerWishGetAnswer: `A member of staff will get back to you shortly.`,
    consumerWishInvestigationIsPossible:
      'Fraud Control may decide to open an investigation based on the informations you provide.',
    consumerWishInvestigationIsPossible2:
      'If a business receives an excessively high volume or frequent number of reports, Fraud Control will investigate the companies in question.',
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
    dropZone: 'Click on the button or drop file(s) here',
    limitTo500chars: `500 characters max`,
    continue: `Continue`,
    suggestion: `Did you mean :`,
    continueWithWebsite: (website: string) => `Continue with ${website}`,
    invalidUrlPattern: `This does not look like a website`,
    noResult: 'No result',
    noAttachment: 'No attachment.',
    addAttachmentFile: 'Add an attachment',
    attachments: `Attachments: `,
    backToHome: `Go back to home page`,
    city: `City`,
    attachmentsDescAnonymous: `If you do not want the company to know your identity, <b style="color: black">remove your name</b> where it appears on your attachments.`,
    attachmentsDescAllowedFormat: (formats: string[]) => `The following formats are accepted : ${formats.join(', ')}`,
    attachmentsDesc2: `Including an attachment <strong>GREATLY</strong> increases your chances that corrective action will be taken.<br/> You must not share private or sensitive information (e.g. bank account details or medical records).`,
    maxAttachmentsZero: (max: number) => `You can upload up to ${max} attachments`,
    maxAttachmentsReached: (max: number) => `${max} attachments limit reached`,
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
    howToFindThem: `How to find them ?`,
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
    consumerTitle: `Your contact details allow us to authenticate your report`,
    consumerAskCodeTitle: `Enter the validation code.`,
    consumerAskCodeDesc: (email: string) => `An email has been sent to <b>${email}</b>`,
    consumerCodePlaceholder: `______`,
    consumerEmailMayTakesTime: `The email may take a few minutes to reach you`,
    consumerValidationCode: 'Validation code (6 digits)',
    consumerInvalidCode: `Incorrect code`,
    consumerResentEmail: `Resend`,
    consumerDummyEmailNotAccepted: `Disposable email addresses are not accepted.`,
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

    statsTitle: 'Statistics',
    statsText: 'These statistics are updated in real time. Additional statistics are also available on ',

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
      whatsSignalConso: 'What is Signal Conso ?',
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
      reportReadByDGCCRF: `Your report will be read <b>only</b> by the Directorate General for Competition, Consumer Affairs, and Fraud Control (<abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>) - also known as "Fraud Control".`,
      investigatorContactPossible: `Investigators may contact you to check your identity or request additional information regarding your report.`,
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
  },
}
