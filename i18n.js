/**
 * MC Équipe — FR (default in HTML) / EN
 * Detects browser language, persists choice in localStorage.
 */
(function (global) {
  const STORAGE_KEY = 'mc-lang';
  const LISTINGS_FR = 'https://mathieumichaud.expquebec.com/fr/proprietes';
  const LISTINGS_EN = 'https://mathieumichaud.expquebec.com/en/proprietes';

  const EN = {
    'meta.title.index': 'MC Équipe | Real estate reimagined',
    'meta.title.residentiel': 'Buy & Sell | MC Équipe',
    'meta.title.evaluation': 'Free Home Evaluation | MC Équipe',
    'meta.title.international': 'International Acquisition | MC Équipe',
    'meta.title.mathieu': 'Mathieu Michaud | MC Équipe',
    'meta.title.catherine': 'Catherine Aubé | MC Équipe',
    'meta.title.privacy': 'Privacy Policy | MC Équipe',
    'meta.desc.international':
      'Invest in Mexico or Panama with confidence through MC Équipe. Turnkey service for Quebec buyers.',

    'nav.services': 'Services',
    'nav.team': 'The Team',
    'nav.international': 'International',
    'nav.listings': 'Listings',
    'nav.contact': 'Contact',
    'nav.lang': 'Language',

    'footer.copyright': '© 2026 MC Équipe - eXp Realty.',
    'footer.credit': 'Website by Roy Marketing',
    'footer.privacy': 'Privacy policy',

    'cookies.message':
      'This site uses essential cookies and third-party services required for it to function.',
    'cookies.learnMore': 'Learn more',
    'cookies.accept': 'Got it',

    'privacy.hero.tag': 'Privacy',
    'privacy.hero.title': 'Privacy <span class="italic font-light">Policy</span>',
    'privacy.updated': 'Last updated: June 1, 2026',
    'privacy.intro':
      'This policy describes how MC Équipe (Mathieu Michaud, real estate broker — eXp Realty) collects, uses, discloses, and protects your personal information in accordance with Quebec\'s Act respecting the protection of personal information in the private sector (CQLR, c. P-39.1), as amended by Law 25, and, where applicable, the federal Personal Information Protection and Electronic Documents Act (PIPEDA).',

    'privacy.s1.title': '1. Person responsible for the protection of personal information',
    'privacy.s1.body':
      'The person responsible for the protection of personal information is Mathieu Michaud. You may contact them regarding any request relating to your personal information:<br><br>Mathieu Michaud — MC Équipe<br>1111 Blvd. Dr. Frederik-Philips, Suite 601<br>Saint-Laurent, QC H4M 2X6<br>Email: <a href="mailto:info@mcequipe.com" class="text-mc-ocean hover:underline">info@mcequipe.com</a><br>Phone: (418) 655-8090',

    'privacy.s2.title': '2. Personal information we collect',
    'privacy.s2.body':
      'Depending on your interactions with us, we may collect:<ul class="list-disc pl-6 mt-4 space-y-2"><li>Identity and contact information (name, email, phone, mailing address);</li><li>Information related to your real estate project (budget, desired location, property type, timeline);</li><li>Property information when you request an evaluation or listing (address, characteristics, photos);</li><li>Technical data when you browse our site (IP address, browser type, pages visited — where applicable);</li><li>Any other information you voluntarily provide through our forms or communications.</li></ul>',

    'privacy.s3.title': '3. Purposes of collection',
    'privacy.s3.body':
      'We use your personal information to:<ul class="list-disc pl-6 mt-4 space-y-2"><li>Respond to your requests and provide brokerage services (purchase, sale, evaluation, international acquisitions);</li><li>Contact you regarding properties or opportunities matching your criteria;</li><li>Prepare comparative market analyses and listing strategies;</li><li>Comply with legal and regulatory obligations applicable to real estate brokerage in Quebec;</li><li>Improve our website and the security of our online services;</li><li>Send you communications you have consented to receive.</li></ul>',

    'privacy.s4.title': '4. Consent',
    'privacy.s4.body':
      'We collect, use, and disclose your personal information only with your consent, except where the law authorizes or requires us to do so without consent. By submitting a form on our site or communicating with us, you consent to the processing of your information for the purposes described in this policy. You may withdraw your consent at any time, subject to legal or contractual restrictions, by contacting the person responsible listed above.',

    'privacy.s5.title': '5. Disclosure to third parties',
    'privacy.s5.body':
      'We may share your information with:<ul class="list-disc pl-6 mt-4 space-y-2"><li><strong>eXp Realty</strong> and its network, as required for your transaction;</li><li><strong>Formspree</strong>, our online form processing provider (submissions are transmitted to our team);</li><li>Professional partners (notaries, inspectors, lawyers) involved in your transaction, with your knowledge;</li><li>Technology providers (hosting, fonts, essential site tools) whose servers may be located outside Quebec;</li><li>Public authorities when required by law.</li></ul>We do not sell your personal information.',

    'privacy.s6.title': '6. Transfers outside Quebec',
    'privacy.s6.body':
      'Some of our service providers (for example, form hosting or content delivery networks) may process data in the United States or elsewhere. Before transferring personal information outside Quebec, we assess the risks and implement appropriate contractual or organizational safeguards in accordance with applicable requirements.',

    'privacy.s7.title': '7. Retention period',
    'privacy.s7.body':
      'We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with our legal and professional obligations (including records required by the Organisme d\'autoréglementation du courtage immobilier du Québec), and resolve any disputes. Thereafter, information is destroyed or anonymized securely.',

    'privacy.s8.title': '8. Security measures',
    'privacy.s8.body':
      'We implement reasonable physical, administrative, and technical safeguards to protect your personal information against loss, theft, unauthorized access, disclosure, copying, use, or modification. No method of transmission over the Internet is completely secure; we invite you to exercise caution when sharing sensitive information online.',

    'privacy.s9.title': '9. Your rights',
    'privacy.s9.body':
      'Under Quebec law, you have the right to:<ul class="list-disc pl-6 mt-4 space-y-2"><li>Access the personal information we hold about you;</li><li>Request correction of inaccurate, incomplete, or outdated information;</li><li>Request deletion or cessation of dissemination of your information, subject to legal exceptions;</li><li>Withdraw your consent to certain uses;</li><li>Request portability of computerized personal information we hold, in accordance with applicable rules;</li><li>Be informed of a privacy incident involving your information, when required by law.</li></ul>To exercise your rights, contact the person responsible listed in section 1. We will respond within the timeframes prescribed by law.',

    'privacy.s10.title': '10. Cookies and similar technologies',
    'privacy.s10.body':
      'Our site uses essential cookies to remember your language preferences and cookie consent. We may use third-party services (such as Google Fonts or content delivery networks) that place technical cookies. You may manage cookies through your browser settings. For more details, see the notice displayed when you first visit our site.',

    'privacy.s11.title': '11. Minors',
    'privacy.s11.body':
      'Our services are intended for adults. We do not knowingly collect personal information from children under 14 without the consent of a parent or guardian. If you believe we have collected such information, please contact us so we can delete it.',

    'privacy.s12.title': '12. Changes to this policy',
    'privacy.s12.body':
      'We may update this policy to reflect changes in our practices or the law. The date of the last update will appear at the top of this page. We encourage you to review this policy periodically.',

    'privacy.s13.title': '13. Complaints',
    'privacy.s13.body':
      'If you believe your personal information is not being handled in accordance with this policy, we invite you to contact us first so we can address your concerns. You also have the right to file a complaint with the Commission d\'accès à l\'information du Québec (CAI): <a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener noreferrer" class="text-mc-ocean hover:underline">www.cai.gouv.qc.ca</a>.',

    'common.learnMore': 'Learn more',
    'common.readBio': 'Read biography',
    'common.goServices': 'Go to our services',

    'index.hero.tag': 'Beyond expectations',
    'index.hero.title': 'Your partners <br><span class="italic font-light">in real estate.</span>',
    'index.hero.subtitle':
      'Buying, selling & appraisals in Quebec.<br>Exclusive acquisitions in Mexico and Panama.',
    'index.hero.cta': 'Discover our services',

    'index.services.label': 'Our expertise',
    'index.services.title': 'Buy, Sell & International',
    'index.s1.tag': 'Residential QC',
    'index.s1.title': 'Buy & Sell',
    'index.s1.desc':
      'Orchestrate your transaction with absolute discretion and unmatched strategic rigour.',
    'index.s2.tag': 'Fair market value',
    'index.s2.title': 'Free Evaluation',
    'index.s2.desc':
      'Get an accurate read on the market through our rigorous, confidential analysis.',
    'index.s3.tag': 'Southern investment',
    'index.s3.title': 'International Buying',
    'index.s3.desc':
      'Mexico & Panama. A turnkey, legally secure acquisition tailored to Quebec investors.',

    'index.team.label': 'Faces of excellence',
    'index.team.title': 'Our partner brokers',
    'index.mathieu.role': 'Residential real estate broker',
    'index.mathieu.p1':
      'Known for his analytical mindset and deep understanding of Quebec market dynamics, Mathieu orchestrates every transaction with surgical precision. His pragmatic, forward-looking approach protects clients’ interests while maximizing the value of their real estate assets.',
    'index.mathieu.p2':
      'He architects the team’s listing strategies and created “The Buddy Broker” method—a system that guarantees follow-ups of absolute rigour.',
    'index.catherine.role': 'Residential real estate broker',
    'index.catherine.p1':
      'Driven by a passion for architecture, spatial design and people, Catherine has a rare gift for revealing a property’s full potential. Her natural empathy and formidable negotiation skills build unshakeable trust.',
    'index.catherine.p2':
      'A specialist in personalized guidance, she is the relational heart of the firm. Whether it’s a first purchase in Quebec or a retirement project in Mexico, Catherine ensures a smooth, transparent and deeply human experience.',

    'index.consult.label': 'Your bespoke project',
    'index.consult.title': 'Start your <span class="italic text-mc-sand">acquisition.</span>',
    'index.consult.desc':
      'Share your criteria for excellence. Whether in Quebec or abroad, Mathieu and Catherine will reach out with off-market selections.',
    'index.consult.dest': '1. Destination',
    'index.consult.dest.qc': 'Quebec',
    'index.consult.dest.qcSub': 'Residential',
    'index.consult.dest.south': 'South',
    'index.consult.dest.southSub': 'Mexico & Panama',
    'index.consult.budget': '2. Budget range',
    'index.consult.coords': '3. Your contact details',
    'index.consult.submit': 'Request a consultation',
    'index.consult.privacy': 'Your information remains strictly confidential.',

    'index.form.name': 'Full name',
    'index.form.email': 'Email address',
    'index.form.phone': 'Phone number',

    'index.testimonials.label': 'Our clients’ trust',
    'index.testimonials.title': 'Testimonials',
    'index.t1.quote':
      '"The MC team completely redefined our view of brokerage. Their marketing strategy for our Eastern Townships estate was worthy of an architecture magazine. The sale closed above our expectations, with absolute discretion."',
    'index.t1.name': 'Tremblay family',
    'index.t1.role': 'Residential sale — Magog',
    'index.t2.quote':
      '"Buying in Mexico seemed complex, but Catherine simplified every legal and notarial step. Truly turnkey service."',
    'index.t2.name': 'Marc-André P.',
    'index.t2.role': 'Acquisition — Tulum',
    'index.t3.quote':
      '"The Buddy Broker playbook isn’t a myth. Mathieu’s follow-up is incredibly precise. Always one step ahead."',
    'index.t3.name': 'Sophie L.',
    'index.t3.role': 'Investor',
    'index.t4.quote':
      '"The synergy between Mathieu and Catherine is remarkable. One analyses data coolly, the other intimately understands our lifestyle needs. The perfect duo for any major transaction."',
    'index.t4.name': 'Dr. Vincent R.',
    'index.t4.role': 'Residential purchase — Québec City',

    'index.faq.label': 'Clearing your doubts',
    'index.faq.title': 'Frequently asked questions',
    'index.faq.q1': 'How does buying abroad work?',
    'index.faq.a1':
      'We offer a turnkey service. We work with trusted local lawyers and notaries in Mexico and Panama to secure the transaction. We support you from viewings (virtual or in person) through to closing, removing language barriers and legal uncertainty.',
    'index.faq.q2': 'What does the free property evaluation include?',
    'index.faq.a2':
      'Our evaluation is based on a rigorous comparative market analysis (CMA). We review recently sold comparable properties in your area, current market trends and your home’s unique features to determine fair market value—with no obligation.',
    'index.faq.q3': 'What is “The Buddy Broker” method?',
    'index.faq.a3':
      'It’s our exclusive organization and follow-up tool. Created by Mathieu Michaud, this system ensures no detail is left to chance. We stay proactive, keep you informed in real time and give you complete peace of mind throughout the process.',
    'index.faq.q4': 'What are the benefits of eXp Realty?',
    'index.faq.a4':
      'eXp is one of the fastest-growing real estate brokerages in the world. That gives us cutting-edge marketing technology and, above all, a global network of thousands of agents. Your property isn’t only visible in Quebec—it’s visible internationally.',

    'index.contact.label': 'Let’s discuss your vision',
    'index.contact.title': 'Get in <br><span class="italic text-mc-sand">touch.</span>',
    'index.contact.desc':
      'Whether you need a confidential valuation in Quebec or an acquisition in the tropics, our team is here to deliver bespoke service.',
    'index.contact.phone': 'Phone',
    'index.contact.email': 'Email',
    'index.contact.office': 'Office',
    'index.contact.ph1': 'Mathieu: (418) 655-8090',
    'index.contact.ph2': 'Catherine: (418) 952-0925',
    'index.contact.form.name': 'Hello, my name is...',
    'index.contact.form.email': 'My email is...',
    'index.contact.form.phone': 'My phone is...',
    'index.contact.form.message': 'I’m reaching out about...',
    'index.contact.form.submit': 'Send message',
    'index.contact.form.nameLabel': 'Full name',
    'index.contact.form.emailLabel': 'Email address',
    'index.contact.form.phoneLabel': 'Phone number',
    'index.contact.form.messageLabel': 'Your message',

    'residentiel.hero.tag': 'Residential real estate',
    'residentiel.hero.title': 'Buy & <span class="italic font-light">Sell</span>',
    'residentiel.hero.sub': 'A strategic, refined approach to your projects in Quebec.',
    'residentiel.buy.tag': 'Acquisition',
    'residentiel.buy.title': 'Find the exceptional.',
    'residentiel.buy.p1':
      'Buying a home is more than a transaction—it’s the start of a new chapter. We take time to understand your lifestyle, aspirations and standards of excellence.',
    'residentiel.buy.p2':
      'Through our network and access to off-market properties (pocket listings), we present unique opportunities often invisible to the public. From the first showing to handing over the keys, we defend your interests with formidable negotiation strength.',
    'residentiel.buy.li1': 'Targeted, personalized search',
    'residentiel.buy.li2': 'Access to exclusive listings',
    'residentiel.buy.li3': 'Rigorous negotiation strategy',
    'residentiel.sell.tag': 'Go to market',
    'residentiel.sell.title': 'Sell with distinction.',
    'residentiel.sell.p1':
      'Your property is unique—its marketing should be too. We deploy a bespoke strategy worthy of top architecture magazines: professional photography, cinematic video and strategic placement on local and international platforms.',
    'residentiel.sell.p2':
      'Backed by the global eXp Realty network and The Buddy Broker method, we maximize visibility and follow-up for a smooth, secure transaction at the best possible price.',
    'residentiel.sell.cta': 'Evaluate my property',

    'evaluation.hero.tag': 'Fair market value',
    'evaluation.hero.title': 'Free <span class="italic font-light">Evaluation</span>',
    'evaluation.hero.sub': 'Get an accurate read on the market with precision and confidentiality.',
    'evaluation.intro.title': 'Expertise beyond the algorithm',
    'evaluation.intro.desc':
      'Online automated estimates miss the nuances of your property. Our brokers analyze recent comparable sales, your home’s condition, upgrades and neighbourhood dynamics to deliver a surgical comparative market analysis (CMA)—with no obligation.',
    'evaluation.form.prop': '1. Your property',
    'evaluation.form.coords': '2. Your contact details',
    'evaluation.form.submit': 'Receive my evaluation',
    'evaluation.form.privacy': 'All information remains strictly confidential.',
    'evaluation.form.address': 'Full property address',
    'evaluation.form.name': 'Full name',
    'evaluation.form.phone': 'Phone number',
    'evaluation.form.email': 'Email address',
    'evaluation.form.type': 'Property type',
    'evaluation.form.typePlaceholder': 'Property type',
    'evaluation.form.type.house': 'Single-family home',
    'evaluation.form.type.condo': 'Condominium',
    'evaluation.form.type.plex': 'Plex / income property',
    'evaluation.form.type.chalet': 'Cottage / vacation home',
    'evaluation.form.type.land': 'Land',
    'evaluation.form.timeline': 'Estimated sale timeline',
    'evaluation.form.timelinePlaceholder': 'Estimated sale timeline',
    'evaluation.form.timeline.now': 'Immediately',
    'evaluation.form.timeline.3_6': 'Within 3 to 6 months',
    'evaluation.form.timeline.year': 'Within the year',
    'evaluation.form.timeline.curiosity': 'Market curiosity only',

    'international.hero.tag': 'Overseas acquisition',
    'international.hero.title':
      'Your foothold <br><span class="block mt-2 pl-12 lg:pl-24"><span class="italic text-white font-light">in the tropics.</span></span>',
    'international.hero.desc':
      'Mexico & Panama. A turnkey, legally secure acquisition designed exclusively for Quebec investors.',
    'international.hero.b1': 'Friction-free legal process',
    'international.hero.b2': 'French-language service',
    'international.form.title': 'Access the portfolio',
    'international.form.sub': 'Exclusive selection',
    'international.form.name': 'Full name',
    'international.form.email': 'Email address',
    'international.form.phone': 'Phone number',
    'international.form.dest': 'Destination of interest',
    'international.form.submit': 'Receive the selection',

    'international.adv.label': 'The MC Équipe advantage',
    'international.adv.title': 'Simplify the exotic,<br>secure excellence.',
    'international.adv.s1.title': 'Legal security',
    'international.adv.s1.desc':
      'Network of partner law firms. We validate every title (fideicomiso) before any transaction.',
    'international.adv.s2.title': 'French-language support',
    'international.adv.s2.desc':
      'From contract review to closing, we remove language barriers. You understand every clause.',
    'international.adv.s3.title': 'Privileged access',
    'international.adv.s3.desc':
      'Through the eXp Global network, we access exclusive pre-sales and the market’s strongest developer projects.',

    'international.mx.desc':
      'A dynamic world-class market, ideal for short-term rental returns and an idyllic lifestyle.',
    'international.pa.desc':
      'A stable economic hub using the US dollar, with major tax incentives for foreign retirees.',

    'international.team.label': 'People first',
    'international.team.title': 'The duo behind<br>your project.',
    'international.team.p1':
      'Mathieu Michaud and Catherine Aubé join forces to secure your investments. One analyses data coolly; the other intimately understands your lifestyle needs.',
    'international.team.p2':
      'Catherine is your dedicated specialist for Mexico and Panama transactions, ensuring smooth communication with our local partners.',
    'international.team.cta': 'Meet Catherine',

    'international.faq.label': 'Clearing your doubts',
    'international.faq.title': 'Frequently asked questions',
    'international.faq.q1': 'Can I buy in Mexico as a Canadian?',
    'international.faq.a1':
      'Absolutely. If the property is in the "restricted zone" (near coasts or borders), we set up a <em>Fideicomiso</em>, a secure, renewable bank trust that gives you full ownership rights.',
    'international.faq.q2': 'Do I need to travel for the signing?',
    'international.faq.a2':
      'No, it’s not required. With notarial powers of attorney and e-signatures, we can close remotely from the comfort of your home in Quebec.',
    'international.faq.q3': 'How does rental management work?',
    'international.faq.a3':
      'We work with reputable property management companies on site. They handle maintenance, Airbnb/Vrbo marketing, guest welcome and key handoffs.',

    'international.contact.label': 'Let’s discuss your vision',
    'international.contact.title': 'Get in <br><span class="italic text-mc-sand">touch.</span>',
    'international.contact.desc':
      'Book a strategy call with our team. We’ll answer your questions on taxes, the buying process and current opportunities in the South.',
    'international.contact.phones': 'Phones',
    'international.contact.emails': 'Emails',
    'international.contact.form.name': 'Hello, my name is...',
    'international.contact.form.email': 'My email is...',
    'international.contact.form.phone': 'My phone is...',
    'international.contact.form.message': 'I’m interested in the market in...',
    'international.contact.form.submit': 'Send message',
    'international.contact.form.nameLabel': 'Full name',
    'international.contact.form.emailLabel': 'Email address',
    'international.contact.form.phoneLabel': 'Phone number',
    'international.contact.form.messageLabel': 'Your message',

    'mathieu.role': 'Real estate broker',
    'mathieu.p1':
      'Known for his analytical mindset and deep reading of real estate market dynamics, Mathieu approaches every transaction with the rigour of a strategist. Whether selling a prestige estate or acquiring a key asset, his pragmatic, visionary approach protects clients’ interests while maximizing portfolio value.',
    'mathieu.p2':
      'Forward-thinking, he integrates cutting-edge technology from the global eXp network for unmatched visibility on the properties he represents. His extended network and negotiation mastery make him a formidable ally in a competitive market.',
    'mathieu.p3':
      'More than an intermediary, Mathieu is a long-term trusted advisor, building relationships on total transparency and flawless communication.',
    'mathieu.cta': 'Email Mathieu',
    'mathieu.buddy.title': 'The Buddy <br><span class="italic text-mc-sand">Broker.</span>',
    'mathieu.buddy.tag': 'The exclusive method',
    'mathieu.buddy.desc':
      'Knowing that transaction success lies in the details, Mathieu developed “The Buddy Broker”. Far more than a notebook, it’s a complete organizational system for modern brokerage. This tool guarantees follow-ups of absolute rigour: no call forgotten, no deadline missed—true peace of mind and impeccable service for every client.',

    'catherine.role': 'Real estate broker',
    'catherine.p1':
      'Driven by a passion for architecture, spatial design and people, Catherine has a rare gift for revealing a property’s full potential. Her empathy and negotiation strength build unshakeable trust, turning complex transactions into smooth, reassuring experiences.',
    'catherine.p2':
      'A specialist in personalized guidance, she is the relational heart of the firm. She excels at understanding clients’ lifestyle needs to guide them toward the right investment. Her staging expertise ensures optimal aesthetic positioning on the market.',
    'catherine.p3':
      'Beyond Quebec, Catherine leads our overseas acquisition service. Whether a retirement project in Mexico or an investment in Panama, she demystifies cross-border legal processes and offers secure support from the first virtual visit to key handoff.',
    'catherine.cta': 'Email Catherine',
    'catherine.horizon.title': 'Horizons <br><span class="italic text-mc-ocean">without borders.</span>',
    'catherine.horizon.title': 'Horizons <br><span class="italic text-mc-ocean">without borders.</span>',
    'catherine.horizon.tag': 'Mexico & Panama acquisitions',
    'catherine.horizon.desc':
      'Buying abroad should never be stressful. Catherine has built a network of trusted local partners (lawyers, notaries, inspectors) in Mexico and Panama. She orchestrates every step with the same rigour as in Quebec, removing language and legal barriers for a smooth transition to the tropics.',
  };

  function getStoredLang() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('lang');
    if (fromUrl === 'fr' || fromUrl === 'en') return fromUrl;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'fr' || stored === 'en') return stored;
    const nav = (navigator.language || navigator.userLanguage || 'fr').toLowerCase();
    return nav.startsWith('en') ? 'en' : 'fr';
  }

  function captureDefaults() {
    document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach((el) => {
      if (el.dataset.i18nDefault !== undefined) return;
      if (el.hasAttribute('data-i18n-html')) {
        el.dataset.i18nDefault = el.innerHTML;
      } else {
        el.dataset.i18nDefault = el.textContent;
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      if (el.dataset.i18nPlaceholderDefault === undefined) {
        el.dataset.i18nPlaceholderDefault = el.getAttribute('placeholder') || '';
      }
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      if (el.dataset.i18nTitleDefault === undefined) {
        el.dataset.i18nTitleDefault = el.getAttribute('title') || '';
      }
    });
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl && titleEl.dataset.i18nTitleDefault === undefined) {
      titleEl.dataset.i18nTitleDefault = titleEl.textContent;
    }
  }

  function setText(el, text) {
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  }

  function i18nKey(el) {
    return el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
  }

  function applyLanguage(lang) {
    const isEn = lang === 'en';
    document.documentElement.lang = isEn ? 'en-CA' : 'fr-CA';
    document.documentElement.dataset.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach((el) => {
      const key = i18nKey(el);
      if (!key) return;
      if (isEn && EN[key]) {
        setText(el, EN[key]);
      } else if (el.dataset.i18nDefault !== undefined) {
        setText(el, el.dataset.i18nDefault);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (isEn && EN[key]) {
        el.setAttribute('placeholder', EN[key]);
      } else if (el.dataset.i18nPlaceholderDefault !== undefined) {
        el.setAttribute('placeholder', el.dataset.i18nPlaceholderDefault);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (isEn && EN[key]) {
        el.setAttribute('title', EN[key]);
      } else if (el.dataset.i18nTitleDefault !== undefined) {
        el.setAttribute('title', el.dataset.i18nTitleDefault);
      }
    });

    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n');
      if (isEn && EN[key]) {
        titleEl.textContent = EN[key];
      } else if (titleEl.dataset.i18nTitleDefault) {
        titleEl.textContent = titleEl.dataset.i18nTitleDefault;
      }
    }

    const metaDesc = document.querySelector('meta[name="description"][data-i18n]');
    if (metaDesc) {
      const key = metaDesc.getAttribute('data-i18n');
      if (isEn && EN[key]) {
        metaDesc.setAttribute('content', EN[key]);
      } else if (metaDesc.dataset.i18nDefault) {
        metaDesc.setAttribute('content', metaDesc.dataset.i18nDefault);
      }
    }

    document.querySelectorAll('[data-i18n-href="listings"]').forEach((a) => {
      a.href = isEn ? LISTINGS_EN : LISTINGS_FR;
    });

    document.querySelectorAll('[data-lang-set]').forEach((btn) => {
      const active = btn.getAttribute('data-lang-set') === lang;
      btn.classList.toggle('lang-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function initEarly() {
    const lang = getStoredLang();
    document.documentElement.lang = lang === 'en' ? 'en-CA' : 'fr-CA';
    document.documentElement.dataset.lang = lang;
  }

  function init() {
    captureDefaults();
    const metaDesc = document.querySelector('meta[name="description"][data-i18n]');
    if (metaDesc && !metaDesc.dataset.i18nDefault) {
      metaDesc.dataset.i18nDefault = metaDesc.getAttribute('content') || '';
    }
    const lang = getStoredLang();
    applyLanguage(lang);

    document.querySelectorAll('[data-lang-set]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.getAttribute('data-lang-set');
        if (next === 'fr' || next === 'en') applyLanguage(next);
      });
    });
  }

  function injectStyles() {
    if (document.getElementById('i18n-styles')) return;
    const s = document.createElement('style');
    s.id = 'i18n-styles';
    s.textContent =
      '.lang-btn.lang-active{opacity:1!important;font-weight:500}' +
      '.lang-btn:not(.lang-active){opacity:.4}' +
      '.nav-scrolled .lang-btn.lang-active{color:#3d312c}' +
      '.nav-scrolled .lang-btn:not(.lang-active){color:#3d312c}';
    document.head.appendChild(s);
  }

  function refresh() {
    captureDefaults();
    applyLanguage(getStoredLang());
  }

  global.I18n = { initEarly, init, applyLanguage, getLang: getStoredLang, refresh };
  initEarly();

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        init();
      });
    } else {
      injectStyles();
      init();
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
