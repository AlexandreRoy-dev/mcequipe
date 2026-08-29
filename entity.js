/**
 * MC Équipe knowledge graph for search and answer engines.
 * Facts only. Injected on every page that loads i18n.js.
 */
(function () {
  if (document.querySelector('script[data-mc-entity-static]')) return;

  var ORIGIN = 'https://mcequipe.ca';
  var ORG_ID = ORIGIN + '/#organization';
  var WEBSITE_ID = ORIGIN + '/#website';
  var MATHIEU_ID = ORIGIN + '/#mathieu-michaud';
  var CATHERINE_ID = ORIGIN + '/#catherine-aube';
  var LISTINGS = 'https://mathieumichaud.expquebec.com/fr/proprietes';

  function fileName() {
    var path = (location.pathname || '/').replace(/\\/g, '/');
    var parts = path.split('/');
    return parts[parts.length - 1] || 'index.html';
  }

  function isHome() {
    var file = fileName();
    return file === '' || file === 'index.html' || location.pathname === '/';
  }

  function pageUrl() {
    var file = fileName();
    if (isHome()) return ORIGIN + '/';
    if (location.pathname.indexOf('/articles/') !== -1) {
      return ORIGIN + '/articles/' + file;
    }
    return ORIGIN + '/' + file;
  }

  function q(name, text) {
    return {
      '@type': 'Question',
      name: name,
      acceptedAnswer: { '@type': 'Answer', text: text }
    };
  }

  var address = {
    '@type': 'PostalAddress',
    streetAddress: '1111 Blvd. Dr. Frederik-Philips #601',
    addressLocality: 'Saint-Laurent',
    addressRegion: 'QC',
    postalCode: 'H4M 2X6',
    addressCountry: 'CA'
  };

  var quebec = { '@type': 'AdministrativeArea', name: 'Québec', sameAs: 'https://www.wikidata.org/wiki/Q176' };
  var capitale = { '@type': 'AdministrativeArea', name: 'Capitale-Nationale' };
  var quebecCity = { '@type': 'City', name: 'Québec' };
  var valcartier = { '@type': 'Place', name: 'Base Valcartier' };

  var mathieu = {
    '@type': 'Person',
    '@id': MATHIEU_ID,
    name: 'Mathieu Michaud',
    url: ORIGIN + '/mathieu.html',
    image: ORIGIN + '/images/mathieu.webp',
    jobTitle: 'Courtier immobilier résidentiel',
    email: 'mathieu@mcequipe.com',
    telephone: '+1-418-655-8090',
    worksFor: { '@id': ORG_ID },
    knowsLanguage: ['fr', 'en', 'es'],
    description:
      'Courtier immobilier eXp Realty au Québec. Achat, vente, évaluation, transfert militaire (ancien militaire du régulier, courtier accrédité FAC) et recrutement eXp. Créateur de la méthode The Buddy Broker.'
  };

  var catherine = {
    '@type': 'Person',
    '@id': CATHERINE_ID,
    name: 'Catherine Aubé',
    url: ORIGIN + '/catherine.html',
    image: ORIGIN + '/images/catherine.webp',
    jobTitle: 'Courtière immobilière',
    email: 'catherine@mcequipe.com',
    telephone: '+1-418-952-0925',
    worksFor: { '@id': ORG_ID },
    knowsLanguage: ['fr', 'en', 'es'],
    description:
      'Courtière immobilière eXp Realty au Québec. Accompagnement résidentiel et acquisitions internationales (résidence, retraite ou locatif), en français, anglais ou espagnol.'
  };

  var org = {
    '@type': ['RealEstateAgent', 'Organization'],
    '@id': ORG_ID,
    name: 'MC Équipe',
    alternateName: ['MC Equipe', 'MC Équipe Immobilier', 'MC Equipe Immobilier'],
    legalName: 'MC Équipe',
    url: ORIGIN + '/',
    logo: ORIGIN + '/images/equipe-bureau.webp',
    image: ORIGIN + '/images/equipe-bureau.webp',
    description:
      'MC Équipe est une équipe de courtiers immobiliers eXp Realty au Québec, dirigée par Mathieu Michaud et Catherine Aubé. Achat et vente résidentiels, évaluation gratuite, transfert militaire, acquisitions internationales et recrutement eXp. Service en français, anglais et espagnol.',
    email: 'info@mcequipe.com',
    telephone: ['+1-418-655-8090', '+1-418-952-0925'],
    address: address,
    areaServed: [quebec, capitale, quebecCity, valcartier],
    knowsLanguage: ['fr', 'en', 'es'],
    founder: [{ '@id': MATHIEU_ID }, { '@id': CATHERINE_ID }],
    employee: [{ '@id': MATHIEU_ID }, { '@id': CATHERINE_ID }],
    parentOrganization: {
      '@type': 'Organization',
      name: 'eXp Realty',
      alternateName: 'eXp Agence Immobilière',
      url: 'https://expquebec.com/'
    },
    sameAs: [LISTINGS],
    knowsAbout: [
      'Courtage immobilier résidentiel au Québec',
      'Achat et vente de propriétés à Québec',
      'Évaluation immobilière',
      'Acquisitions immobilières internationales',
      'Transfert militaire Forces armées canadiennes',
      'Recrutement eXp Realty Québec',
      'Revenue Share eXp'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services MC Équipe',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Achat et vente résidentiels au Québec', url: ORIGIN + '/residentiel.html', areaServed: quebec } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Évaluation immobilière gratuite', url: ORIGIN + '/evaluation.html', areaServed: quebec } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Acquisitions internationales', url: ORIGIN + '/international.html', areaServed: { '@type': 'Place', name: 'International' } } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transfert militaire', url: ORIGIN + '/transfert-militaire.html', areaServed: valcartier } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Recrutement eXp Realty Québec', url: ORIGIN + '/devenir-courtier-exp-quebec.html', areaServed: quebec } }
      ]
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+1-418-655-8090',
        email: 'info@mcequipe.com',
        availableLanguage: ['French', 'English', 'Spanish'],
        areaServed: 'CA-QC'
      }
    ]
  };

  var website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: ORIGIN + '/',
    name: 'MC Équipe',
    inLanguage: ['fr-CA', 'en-CA'],
    publisher: { '@id': ORG_ID }
  };

  var webpage = {
    '@type': 'WebPage',
    '@id': pageUrl() + '#webpage',
    url: pageUrl(),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'fr-CA',
    publisher: { '@id': ORG_ID }
  };

  var graph = [org, website, mathieu, catherine, webpage];

  if (isHome()) {
    webpage.name = 'MC Équipe | Courtiers immobiliers eXp au Québec';
    webpage.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#mc-identity', '#mc-identity p']
    };
    graph.push({
      '@type': 'FAQPage',
      '@id': ORIGIN + '/#faq',
      url: ORIGIN + '/#faq',
      mainEntity: [
        q(
          "Comment fonctionne le processus d'achat à l'étranger ?",
          "Nous vous offrons un accompagnement clé en main. Via eXp Global, nous travaillons avec des courtiers, avocats et notaires locaux dans le marché retenu. Nous vous accompagnons des visites (virtuelles ou sur place) jusqu'à la signature, en français, anglais ou espagnol, avec un dossier juridique cadré avant toute offre."
        ),
        q(
          "En quoi consiste l'évaluation gratuite de ma propriété ?",
          "Notre évaluation est basée sur une analyse comparative du marché (ACM) rigoureuse. Nous analysons les propriétés récemment vendues similaires à la vôtre dans votre secteur, les tendances actuelles du marché et les caractéristiques uniques de votre bien pour déterminer sa juste valeur marchande, sans aucune obligation de votre part."
        ),
        q(
          'Qu\'est-ce que la méthode "The Buddy Broker" ?',
          "C'est notre outil exclusif d'organisation et de suivi. Créé par Mathieu Michaud, ce système garantit qu'aucun détail de votre dossier ne soit laissé au hasard. Cela nous permet d'être proactifs, de vous tenir informé en temps réel et de vous offrir une tranquillité d'esprit totale tout au long du processus."
        ),
        q(
          "Quels sont les avantages d'être avec eXp Agence Immobilière ?",
          "eXp est l'une des agences immobilières à la croissance la plus rapide au monde. Cela nous donne accès à des technologies de pointe pour la mise en marché de votre propriété et, surtout, à un réseau mondial de milliers de courtiers. Votre propriété n'est pas seulement visible au Québec, elle l'est à l'international."
        )
      ]
    });
  }

  if (fileName() === 'international.html') {
    webpage.name = "Achat et investissement à l'étranger | MC Équipe";
    graph.push({
      '@type': 'FAQPage',
      '@id': ORIGIN + '/international.html#faq',
      url: ORIGIN + '/international.html',
      mainEntity: [
        q(
          "Un Canadien peut-il acheter à l'étranger?",
          "Dans la plupart des marchés, oui. La structure change selon le pays: titre direct, société ou fiducie. On ne part jamais d'un modèle unique. Le titre se valide avec un professionnel local avant toute offre."
        ),
        q(
          'Dois-je me déplacer pour la signature?',
          "Souvent non. Procuration notariale et signatures à distance permettent de clôturer depuis le Québec. Une visite sur place reste utile pour le mode de vie. Elle n'est pas toujours obligatoire pour signer."
        ),
        q(
          'Comment choisissez-vous le marché?',
          "Usage, budget, langue, vols, fiscalité, liquidité à la revente. Si vous avez déjà un pays en tête, on le teste contre ces critères. Sinon, on propose deux ou trois marchés ouvrables, pas une carte du monde."
        ),
        q(
          'Comment fonctionne la gestion locative?',
          "Une compagnie locale s'occupe de l'entretien, de la mise en marché et de l'accueil. On compare commission, vacance et contrat avant l'achat. Un rendement brut sans gestion n'est pas un rendement."
        ),
        q(
          "Qu'en est-il des impôts au Canada?",
          "Revenus locatifs, résidence fiscale et déclarations se valident avec un fiscaliste transfrontalier. Nous coordonnons le dossier. Nous ne remplaçons pas ce conseil."
        )
      ]
    });
  }

  if (fileName() === 'mathieu.html') {
    webpage['@type'] = ['WebPage', 'ProfilePage'];
    webpage.mainEntity = { '@id': MATHIEU_ID };
  }

  if (fileName() === 'catherine.html') {
    webpage['@type'] = ['WebPage', 'ProfilePage'];
    webpage.mainEntity = { '@id': CATHERINE_ID };
  }

  if (fileName() === 'a-propos.html') {
    webpage.name = 'À propos de MC Équipe';
    webpage.about = { '@id': ORG_ID };
    webpage.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#mc-about-lead', '#mc-about-lead p']
    };
  }

  var el = document.createElement('script');
  el.type = 'application/ld+json';
  el.setAttribute('data-mc-entity', '1');
  el.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph
  });
  document.head.appendChild(el);
})();
