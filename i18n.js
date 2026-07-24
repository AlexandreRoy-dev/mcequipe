/**
 * MC Équipe: FR (default in HTML) / EN
 * Detects browser language, persists choice in localStorage.
 */
(function (global) {
  const STORAGE_KEY = 'mc-lang';
  const LISTINGS_FR = 'https://mathieumichaud.expquebec.com/fr/proprietes';
  const LISTINGS_EN = 'https://mathieumichaud.expquebec.com/en/proprietes';

  const EN = {
    'meta.title.index': 'MC Équipe | Real estate reimagined',
    'meta.desc.index':
      'MC Équipe Real Estate - residential brokerage in Quebec, international acquisitions and eXp Realty recruitment. Mathieu Michaud and Catherine Aubé.',
    'meta.title.residentiel': 'Buy & Sell | MC Équipe',
    'meta.title.military': 'Military Relocation | MC Équipe',
    'meta.desc.military':
      'Accredited broker and former regular-force member. Mathieu Michaud supports CAF members during relocations to Valcartier, Québec City and the surrounding region.',
    'meta.title.evaluation': 'Free Home Evaluation | MC Équipe',
    'meta.title.international': 'International Acquisition | MC Équipe',
    'meta.title.mathieu': 'Mathieu Michaud | MC Équipe',
    'meta.title.catherine': 'Catherine Aubé | MC Équipe',
    'meta.title.privacy': 'Privacy Policy | MC Équipe',
    'meta.title.merci': 'Thank You | MC Équipe',
    'meta.desc.merci':
      'Your message has been sent. The MC Équipe team will respond shortly.',
    'meta.title.hypotheque': 'Mortgage | MC Équipe',
    'meta.desc.hypotheque':
      'Mortgage services through our apoint partner. Free comparison across 20+ lenders. Purchase, renewal or refinancing.',

    'nav.services': 'Services',
    'nav.team': 'The Team',
    'nav.international': 'International',
    'nav.hypotheque': 'Mortgage',
    'nav.listings': 'Listings',
    'nav.contact': 'Contact',
    'nav.lang': 'Language',
    'nav.blogue': 'Blog',
    'nav.rejoindre': 'Join us',
    'nav.ressources': 'Resources',

    'funnel.step.project': '1. Your project',
    'funnel.step.profile': '1. Your situation',
    'funnel.step.details': '2. Details',
    'funnel.step.contact': 'Your contact details',
    'funnel.step.confirm': 'Confirmation',
    'funnel.field.intent': 'What is your goal?',
    'funnel.field.timeline': 'What is your timeline?',
    'funnel.intent.buy': 'Buy',
    'funnel.intent.sell': 'Sell',
    'funnel.intent.both': 'Buy & sell',
    'funnel.intent.evaluate': 'Evaluation',
    'funnel.intent.invest': 'Invest',
    'funnel.intent.other': 'Other',
    'funnel.timeline.asap': 'As soon as possible',
    'funnel.timeline.3m': 'Within 3 months',
    'funnel.timeline.6m': '3 to 6 months',
    'funnel.timeline.12m': 'Within the year',
    'funnel.timeline.exploring': 'Just exploring',
    'funnel.military.need': 'What do you need?',
    'funnel.military.base': 'Target area',
    'funnel.military.base.valcartier': 'CFB Valcartier',
    'funnel.military.base.quebec': 'Québec City region',
    'funnel.military.base.other': 'Other',
    'funnel.international.budget': 'Investment budget',
    'funnel.budget.under300': 'Under $300k',
    'funnel.budget.300_500': '$300k - $500k',
    'funnel.budget.500_1m': '$500k - $1M',
    'funnel.budget.1m_plus': '$1M +',
    'funnel.consent':
      'I agree that MC Équipe may collect and use my personal information to contact me about my real estate project, in accordance with the <a href="politique-confidentialite.html" target="_blank" rel="noopener noreferrer">privacy policy</a>.',

    'booking.label': 'Next step',
    'booking.title': 'Book a call with the team',
    'booking.desc':
      'Choose a time that works for you. Mathieu or Catherine will confirm your appointment.',
    'booking.or': 'Or book directly',
    'booking.cta': 'Book an appointment',
    'booking.note': 'Online scheduling powered by our CRM.',
    'booking.setup': 'Calendar to configure in site-config.js (GoHighLevel).',
    'booking.form.title': 'Your contact details',
    'booking.form.desc': 'Fill in this short form, then pick a time in the calendar.',
    'booking.form.firstName': 'First name',
    'booking.form.firstNamePh': 'First name',
    'booking.form.lastName': 'Last name',
    'booking.form.lastNamePh': 'Last name',
    'booking.form.email': 'Email',
    'booking.form.emailPh': 'you@email.com',
    'booking.form.phone': 'Phone',
    'booking.form.phonePh': '(418) 555-1234',
    'booking.form.consent':
      'I agree that MC Équipe may collect and use my personal information to schedule my appointment, in accordance with the <a href="politique-confidentialite.html" target="_blank" rel="noopener noreferrer">privacy policy</a>.',
    'booking.form.submit': 'Continue to calendar',
    'booking.form.slotHint': 'Choose a date and time that works for you below.',

    'footer.copyright': '© 2026 MC Équipe - eXp Realty.',
    'footer.credit': 'Website by Roy Marketing',
    'footer.privacy': 'Privacy policy',

    'merci.tag': 'Message received',
    'merci.title': 'Thank you for <br><span class="italic text-mc-sand">your trust.</span>',
    'merci.desc':
      'Your request has been sent to our team. Mathieu or Catherine will respond as soon as possible.',
    'merci.privacy': 'All information remains strictly confidential.',
    'merci.cta.home': 'Back to home',
    'merci.cta.hypotheque': 'Need mortgage help?',
    'merci.booking.title': 'Book a call with the team',
    'merci.booking.desc': 'Choose a time that works for you. Mathieu or Catherine will confirm your appointment.',
    'merci.urgent': 'Need a quick response?',
    'merci.urgent.desc': 'Feel free to call us directly while we process your request.',

    'hypotheque.nav.partner': 'Partner',
    'hypotheque.nav.situations': 'Your situation',
    'hypotheque.hero.tag': 'MC Équipe partner',
    'hypotheque.hero.title': 'A helping hand for <br><span class="italic text-apoint-lime">your mortgage.</span>',
    'hypotheque.hero.desc':
      'MC Équipe partners with apoint Hypothèque for free, impartial, personalized guidance, with access to 20+ financial institutions.',
    'hypotheque.cta': 'Book a free appointment',
    'hypotheque.cta.lead': 'Request a quote',

    'hypotheque.partner.label': 'Why apoint?',
    'hypotheque.partner.title': '100% free service, no obligation',
    'hypotheque.partner.intro':
      'apoint Hypothèque is a mortgage brokerage with access to 20+ financial institutions. No impact on your credit file without your consent.',
    'hypotheque.partner.li1': 'Fast, personalized comparison',
    'hypotheque.partner.li2': 'Human, impartial guidance',
    'hypotheque.partner.li3': 'Purchase, renewal or refinancing',

    'hypotheque.audience.label': 'Based on your situation',
    'hypotheque.audience.title': 'How apoint can help',

    'hypotheque.buy.tag': 'Purchase or refinancing',
    'hypotheque.buy.title': 'Help with your current or future mortgage',
    'hypotheque.buy.p1':
      'Whether you are buying, refinancing or simply want to better understand your current mortgage, our apoint partner brokers are available to answer your questions and help you get the best terms for your plans.',
    'hypotheque.buy.p2': 'Good guidance makes all the difference: simple, fast and no obligation.',

    'hypotheque.second.tag': 'Mortgage shopping',
    'hypotheque.second.title': 'What if your bank isn\'t your best option?',
    'hypotheque.second.p1':
      'Your bank is only one window among many. It offers what it can, not what the whole market can offer. With apoint, access 20+ lenders, impartial guidance, and no credit impact without your authorization.',
    'hypotheque.second.p2': 'It costs nothing to compare, but it can pay off big.',

    'hypotheque.sell.tag': 'Future sellers',
    'hypotheque.sell.title': 'Refinance to sell better',
    'hypotheque.sell.p1':
      'Planning to sell? You may be able to refinance to unlock equity and renovate before listing. Strategic upgrades (kitchen, bathroom or curb appeal) can increase your property\'s value and speed up the sale.',
    'hypotheque.sell.p2': 'Talk to apoint about refinancing to invest in improvements before selling with MC Équipe.',

    'hypotheque.explore.label': 'Real estate with MC Équipe',
    'hypotheque.explore.title': 'Explore our services',
    'hypotheque.team.title': 'Your MC Équipe team',
    'hypotheque.final.title': 'Ready to compare?',
    'hypotheque.final.desc':
      'Book a slot with apoint. It\'s free, no obligation, and no credit impact without your consent.',

    'meta.desc.international':
      'Invest in Mexico or Panama with confidence through MC Équipe. Turnkey service for Quebec buyers.',

    'cookies.message':
      'This site uses essential cookies and third-party services required for it to function.',
    'cookies.learnMore': 'Learn more',
    'cookies.accept': 'Got it',

    'privacy.hero.tag': 'Privacy',
    'privacy.hero.title': 'Privacy <span class="italic font-light">Policy</span>',
    'privacy.updated': 'Last updated: June 1, 2026',
    'privacy.intro':
      'This policy describes how MC Équipe (Mathieu Michaud, real estate broker, eXp Realty) collects, uses, discloses, and protects your personal information in accordance with Quebec\'s Act respecting the protection of personal information in the private sector (CQLR, c. P-39.1), as amended by Law 25, and, where applicable, the federal Personal Information Protection and Electronic Documents Act (PIPEDA).',

    'privacy.s1.title': '1. Person responsible for the protection of personal information',
    'privacy.s1.body':
      'The person responsible for the protection of personal information is Mathieu Michaud. You may contact them regarding any request relating to your personal information:<br><br>Mathieu Michaud, MC Équipe<br>1111 Blvd. Dr. Frederik-Philips, Suite 601<br>Saint-Laurent, QC H4M 2X6<br>Email: <a href="mailto:info@mcequipe.com" class="text-mc-ocean hover:underline">info@mcequipe.com</a><br>Phone: (418) 655-8090',

    'privacy.s2.title': '2. Personal information we collect',
    'privacy.s2.body':
      'Depending on your interactions with us, we may collect:<ul class="list-disc pl-6 mt-4 space-y-2"><li>Identity and contact information (name, email, phone, mailing address);</li><li>Information related to your real estate project (budget, desired location, property type, timeline);</li><li>Property information when you request an evaluation or listing (address, characteristics, photos);</li><li>Technical data when you browse our site (IP address, browser type, pages visited, where applicable);</li><li>Any other information you voluntarily provide through our forms or communications.</li></ul>',

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
      'Buying, selling & appraisals in Quebec.<br>International real estate acquisitions.',
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

    'index.s4.tag': 'Forces armées canadiennes',
    'index.s4.title': 'Transfert Militaire',
    'index.s4.desc':
      'Accredited broker and former regular-force member. Valcartier, Québec and region: buy, sell and coordination as soon as your posting is announced.',

    'index.team.label': 'Faces of excellence',
    'index.team.title': 'Our partner brokers',
    'index.mathieu.role': 'Residential real estate broker',
    'index.mathieu.p1':
      'Known for his analytical mindset and deep understanding of Quebec market dynamics, Mathieu orchestrates every transaction with surgical precision. His pragmatic, forward-looking approach protects clients’ interests while maximizing the value of their real estate assets.',
    'index.mathieu.p2':
      'He architects the team’s listing strategies and created “The Buddy Broker” method, a system that guarantees follow-ups of absolute rigour.',
    'index.mathieu.p3':
      'An accredited broker and former regular-force member, he supports CAF members during relocations. He has lived a posting himself.',
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
    'index.t1.role': 'Residential sale, Magog',
    'index.t2.quote':
      '"Buying in Mexico seemed complex, but Catherine simplified every legal and notarial step. Truly turnkey service."',
    'index.t2.name': 'Marc-André P.',
    'index.t2.role': 'Acquisition, Tulum',
    'index.t3.quote':
      '"The Buddy Broker playbook isn’t a myth. Mathieu’s follow-up is incredibly precise. Always one step ahead."',
    'index.t3.name': 'Sophie L.',
    'index.t3.role': 'Investor',
    'index.t4.quote':
      '"The synergy between Mathieu and Catherine is remarkable. One analyses data coolly, the other intimately understands our lifestyle needs. The perfect duo for any major transaction."',
    'index.t4.name': 'Dr. Vincent R.',
    'index.t4.role': 'Residential purchase, Québec City',

    'index.faq.label': 'Clearing your doubts',
    'index.faq.title': 'Frequently asked questions',
    'index.faq.q1': 'How does buying abroad work?',
    'index.faq.a1':
      'We offer a turnkey service. We work with trusted local lawyers and notaries in Mexico and Panama to secure the transaction. We support you from viewings (virtual or in person) through to closing, removing language barriers and legal uncertainty.',
    'index.faq.q2': 'What does the free property evaluation include?',
    'index.faq.a2':
      'Our evaluation is based on a rigorous comparative market analysis (CMA). We review recently sold comparable properties in your area, current market trends and your home’s unique features to determine fair market value, with no obligation.',
    'index.faq.q3': 'What is “The Buddy Broker” method?',
    'index.faq.a3':
      'It’s our exclusive organization and follow-up tool. Created by Mathieu Michaud, this system ensures no detail is left to chance. We stay proactive, keep you informed in real time and give you complete peace of mind throughout the process.',
    'index.faq.q4': 'What are the benefits of eXp Realty?',
    'index.faq.a4':
      'eXp is one of the fastest-growing real estate brokerages in the world. That gives us cutting-edge marketing technology and, above all, a global network of thousands of agents. Your property isn’t only visible in Quebec. It’s visible internationally.',

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
      'Buying a home is more than a transaction. It’s the start of a new chapter. We take time to understand your lifestyle, aspirations and standards of excellence.',
    'residentiel.buy.p2':
      'Through our network and access to off-market properties (pocket listings), we present unique opportunities often invisible to the public. From the first showing to handing over the keys, we defend your interests with formidable negotiation strength.',
    'residentiel.buy.li1': 'Targeted, personalized search',
    'residentiel.buy.li2': 'Access to exclusive listings',
    'residentiel.buy.li3': 'Rigorous negotiation strategy',
    'residentiel.sell.tag': 'Go to market',
    'residentiel.sell.title': 'Sell with distinction.',
    'residentiel.sell.p1':
      'Your property is unique. Its marketing should be too. We deploy a bespoke strategy worthy of top architecture magazines: professional photography, cinematic video and strategic placement on local and international platforms.',
    'residentiel.sell.p2':
      'Backed by the global eXp Realty network and The Buddy Broker method, we maximize visibility and follow-up for a smooth, secure transaction at the best possible price.',
    'residentiel.sell.cta': 'Evaluate my property',

    'residentiel.contact.label': 'Start your project',
    'residentiel.contact.title': 'Get in <br><span class="italic text-mc-sand">touch.</span>',
    'residentiel.contact.desc':
      'Whether you want to buy or sell in Quebec, our team supports you with rigour and discretion. Describe your project and we will respond promptly.',
    'residentiel.contact.form.message': 'I would like to buy / sell...',
    'residentiel.contact.form.messageLabel': 'Your message',

    'military.hero.badge': 'Accredited broker, military relocation',
    'military.hero.title': 'Your relocation, <br><span class="italic font-light">without compromise.</span>',
    'military.hero.sub':
      'Regular-force Canadian Armed Forces members and families: Mathieu Michaud, a former service member, guides you through buying or selling your home when relocated to Valcartier, Québec City or the surrounding region.',
    'military.intro.tag': 'Recognized expertise',
    'military.intro.title': 'Understanding the urgency of a posting.',
    'military.intro.p1':
      'A posting typically lasts two to three years, alone or with family. You are supported by the federal relocation system, including the home inspection week before you buy. Postings apply to regular-force members (every trade), not the reserve, whose status and work contracts differ. Mathieu Michaud, an accredited broker for CAF relocations, coordinates every step with the rigour your situation demands.',
    'military.intro.p2':
      'As soon as you know your posting, listing (and sometimes selling) your home should begin. Whether you are arriving at CFB Valcartier, leaving the Capitale-Nationale region or coordinating two transactions, our team builds a clear action plan with no surprises.',
    'military.intro.li1': 'Support aligned with the federal relocation program (BGRS)',
    'military.intro.li2': 'Deep knowledge of Valcartier, Québec City and surrounding areas',
    'military.intro.li3': 'Listing as soon as your posting is announced and buy / sell coordination',
    'military.services.label': 'Dedicated services',
    'military.services.title': 'At every stage of your transfer',
    'military.s1.title': 'Arriving in Quebec',
    'military.s1.desc':
      'Targeted search based on your criteria, schools, commute to the base and approved budget. Optimized showings for families travelling or working remotely from another province.',
    'military.s2.title': 'Departure & sale',
    'military.s2.desc':
      'Market evaluation and listing as soon as your posting is confirmed, sometimes months before you leave, to maximize your home\'s value while respecting military timelines.',
    'military.s3.title': 'Simultaneous transactions',
    'military.s3.desc':
      'Managing conditions, financing deadlines and coordination between both markets to reduce stress and double-housing costs.',
    'military.mathieu.tag': 'Former service member, accredited broker',
    'military.mathieu.p1':
      'A former regular-force infantry sergeant, Mathieu has lived a posting and every step that comes with it. His family kept the house; he had to rent in another province. He knows the federal system from the inside. An accredited broker for CAF relocations with MC Équipe, eXp Realty, his "Buddy Broker" method ensures flawless follow-up when every day counts.',
    'military.mathieu.p2':
      'Contact him as soon as you receive posting instructions to start selling or listing your home and build a realistic timeline.',
    'military.mathieu.cta': 'Schedule a call',
    'military.mathieu.bio': 'Read his biography',
    'military.contact.label': 'Schedule a call',
    'military.contact.title': 'Get in <br><span class="italic text-mc-sand">touch.</span>',
    'military.contact.desc':
      'Fill out the form to schedule a call with Mathieu. Include your posting date, whether you need to buy, sell, or both, and your target area. We will respond promptly.',
    'military.contact.form.message': 'My posting date is... I would like to...',
    'military.contact.form.messageLabel': 'Your message',
    'military.contact.form.submit': 'Send request',

    'mathieu.military.link': 'Military relocation, accredited broker',
    'mathieu.recruit.link': 'Mathieu Michaud - eXp Quebec recruitment',

    'evaluation.hero.tag': 'Fair market value',
    'evaluation.hero.title': 'Free <span class="italic font-light">Evaluation</span>',
    'evaluation.hero.sub': 'Get an accurate read on the market with precision and confidentiality.',
    'evaluation.intro.title': 'Expertise beyond the algorithm',
    'evaluation.intro.desc':
      'Online automated estimates miss the nuances of your property. Our brokers analyze recent comparable sales, your home’s condition, upgrades and neighbourhood dynamics to deliver a surgical comparative market analysis (CMA), with no obligation.',
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

    'ressources.toBlogue': 'See the full blog (eXp recruitment + international) →',
    'meta.title.ressources': 'Resources | Mexico & Panama | MC Équipe',
    'meta.desc.ressources':
      'Guides for Quebec buyers considering real estate in Mexico or Panama: market trends, buyer profiles and a secure acquisition method.',
    'ressources.hero.tag': 'Shareable guides',
    'ressources.hero.title':
      'Mexico & Panama: <br><span class="italic text-mc-ocean">resources for Quebec buyers</span>',
    'ressources.hero.desc':
      'Market analysis, buyer profiles and a secure acquisition method. Share these articles with friends or your network considering retirement, investment or a sunny second home.',
    'ressources.card1.tag': 'Market analysis',
    'ressources.card1.title': 'Why Quebec buyers are looking at Mexico and Panama in 2026',
    'ressources.card1.excerpt':
      'Snowbirds, tourism stats and economic signals: what makes the market attractive for Canadian buyers outside the U.S.',
    'ressources.card2.tag': 'Buyer profiles',
    'ressources.card2.title': '5 Quebec buyer profiles in Mexico and Panama',
    'ressources.card2.excerpt':
      'Retirees, snowbirds, investors, families and pre-expats: motivations, conversation angles and real needs.',
    'ressources.card3.tag': 'Method',
    'ressources.card3.title': 'How to buy in the sun without skipping steps',
    'ressources.card3.excerpt':
      'Budget, lifestyle, taxes, financing and legal risk: a secure discovery method before choosing a property.',
    'ressources.read': 'Read article',
    'ressources.cta.title': 'Ready to compare Panama and Mexico for your project?',
    'ressources.cta.desc':
      'Book a strategy call with Mathieu and Catherine. French-language service, secure process and turnkey support.',
    'ressources.cta.btn': 'Get in touch',

    'international.ressources.label': 'Shareable guides',
    'international.ressources.title': 'Resources for <br><span class="italic text-mc-sand">informed buyers.</span>',
    'international.ressources.desc':
      'Market analysis, buyer profiles and our secure acquisition method. Articles you can share with your network.',
    'international.ressources.cta': 'View all resources',

    'article.back': '← All resources',
    'article.share': 'Copy link',
    'article.cta.title': 'Discuss your project with MC Équipe',
    'article.cta.desc':
      'Turnkey acquisitions in Mexico and Panama. French-language service, eXp Global network and structured legal support.',
    'article.cta.contact': 'Get in touch',

    'meta.title.article.marche': 'Mexico & Panama Market 2026 | MC Équipe',
    'meta.desc.article.marche':
      'Canadian snowbirds are diversifying beyond the U.S. Mexico and Panama data, 2026 trends and what it means for Quebec buyers.',
    'article.marche.tag': 'Market analysis · June 2026',
    'article.marche.title': 'Why Quebec buyers are looking at Mexico and Panama in 2026',
    'article.marche.lead':
      'The target market is hot: retirement, investment, second homes and sun migration are drawing more Canadians outside the United States, especially to Mexico and Panama.',
    'article.marche.next': 'Next: buyer profiles',
    'article.marche.body':
      '<h2>A shift among Canadian snowbirds</h2><p>According to Snowbird Advisor\'s 2025 survey, the share of respondents considering non-U.S. destinations rose from 12% the previous winter to 23%, a 92% increase. Mexico, Panama, Costa Rica, Spain and Portugal top the list.</p><p class="source-note">Source: Snowbird Advisor, 2025 survey.</p><p>For Quebec and francophone Canadian buyers, this opens a window: less competition on Florida markets, more opportunity where French-language service and legal validation matter most.</p><h2>Two strong signals to watch</h2><div class="stat-grid"><div class="stat-card"><strong>+6.1%</strong><span>International arrivals in Mexico. Tourism GDP +1.8%, visitor spending +3.5% (WTTC, May 2026).</span></div><div class="stat-card"><strong>3M+</strong><span>International visitors to Panama in 2025 (+8.4%). Tourism revenue ~US$6.6B (+9.7%).</span></div></div><p class="source-note">Sources: World Travel &amp; Tourism Council (Mexico, May 28, 2026); ATP data via Newsroom Panama (March 2026).</p><h2>What this means for a Quebec buyer</h2><ul><li><strong>Liquidity and services</strong>: more flights, infrastructure and professional property management in mature resort areas.</li><li><strong>Diversification</strong>: an asset in local currency or USD (Panama) can complement a Canada-heavy portfolio.</li><li><strong>Buying discipline</strong>: an active market also attracts aggressive sellers. Method matters as much as location.</li></ul><blockquote>Don\'t start with a property. Start with a method: real budget, lifestyle, comparable neighborhoods, taxes to validate, financing and exit plan.</blockquote><h2>Next step</h2><p>Identify your buyer profile (retiree, snowbird, investor, family or pre-expat), then compare Panama and Mexico against your actual criteria, not a brochure.</p>',

    'meta.title.article.profils': 'Buyer Profiles Mexico & Panama | MC Équipe',
    'meta.desc.article.profils':
      'Retirees, snowbirds, investors, families and pre-expats: 5 Quebec buyer profiles in Mexico and Panama and how to support them.',
    'article.profils.tag': 'Buyer profiles · June 2026',
    'article.profils.title': '5 Quebec buyer profiles in Mexico and Panama',
    'article.profils.lead':
      'Not every sun project shares the same priorities. Here are the profiles we see most often in Quebec and Canada, with conversation angles that spark qualified dialogue.',
    'article.profils.next': 'Next: acquisition method',
    'article.profils.body':
      '<div class="profile-card"><span class="tag">Profile A</span><h3>Retirees (55-75)</h3><p><strong>Motivation:</strong> cost of living, climate, perceived safety, healthcare, francophone or expat community.</p><p><strong>Angle:</strong> "Compare Panama and Mexico for your actual retirement, not the brochures."</p><p><strong>Need:</strong> human support, legal and tax validation, administrative simplicity.</p></div><div class="profile-card"><span class="tag">Profile B</span><h3>Snowbirds</h3><p><strong>Motivation:</strong> 2 to 6 months a year in the sun without leaving Canada permanently.</p><p><strong>Angle:</strong> "Buy vs rent: how many weeks per year before ownership makes sense?"</p><p><strong>Need:</strong> easy-to-maintain condo, security, airport access, transparent monthly costs.</p></div><div class="profile-card"><span class="tag">Profile C</span><h3>Investors</h3><p><strong>Motivation:</strong> short or mid-term rental, diversification outside Canada, USD or local-currency asset.</p><p><strong>Angle:</strong> "Gross yield vs net yield: fees, vacancy, management, taxes."</p><p><strong>Need:</strong> realistic numbers, reliable management, resale liquidity.</p></div><div class="profile-card"><span class="tag">Profile D</span><h3>Family second home</h3><p><strong>Motivation:</strong> lifestyle, recurring vacations, legacy for children or grandchildren.</p><p><strong>Angle:</strong> "A sunny base you can use now and resell later."</p><p><strong>Need:</strong> flight accessibility, neighborhood safety, remote maintenance.</p></div><div class="profile-card"><span class="tag">Profile E</span><h3>Pre-expat / international mobility</h3><p><strong>Motivation:</strong> test life outside Canada without selling everything in Quebec right away.</p><p><strong>Angle:</strong> "12-month plan: visit, compare, secure, decide."</p><p><strong>Need:</strong> immigration, healthcare, taxes, residency status (to validate with local professionals).</p></div><h2>How to use this guide</h2><p>Share the article that matches your contact\'s profile. The goal isn\'t to push a property, but to open a structured conversation about what truly matters to them.</p><p>MC Équipe supports Quebec buyers with French-language service, the eXp Global network and legal partners on the ground in Mexico and Panama.</p>',

    'meta.title.article.methode': 'International Buying Method | MC Équipe',
    'meta.desc.article.methode':
      'Budget, lifestyle, taxes, financing and legal risk: the MC Équipe method to buy in Mexico or Panama without skipping steps.',
    'article.methode.tag': 'Method · June 2026',
    'article.methode.title': 'How to buy in the sun without skipping steps',
    'article.methode.lead':
      'The best ROI strategy doesn\'t start with a property. It starts with a secure discovery method: clarify budget, lifestyle, taxes and risks before signing anything.',
    'article.methode.next': 'Back to market analysis',
    'article.methode.body':
      '<h2>The most common mistake</h2><p>Falling for a unit on a visit, then reverse-engineering budget, taxes and financing. Result: surprises on closing costs, HOA fees, rental management or tax status in Canada.</p><p>Our approach reverses the order: a structured conversation first, then a property shortlist aligned with validated criteria.</p><h2>The 8 pillars of the MC Équipe method</h2><ol><li><strong>Real total budget</strong>: purchase price, notary fees, taxes, furnishing, renovations, contingency reserve.</li><li><strong>Target lifestyle</strong>: beach, city, altitude, expat community, medical needs, day-to-day language.</li><li><strong>Comparable neighborhoods</strong>: Puerto Vallarta vs Mérida, Panama City vs Boquete, etc., on the same criteria.</li><li><strong>Taxes to validate</strong>: tax residency, rental income, Canadian reporting (with a cross-border tax specialist).</li><li><strong>Financing</strong>: equity, local loan if available, currency conversion timeline.</li><li><strong>Legal risk</strong>: title, restricted zone (fideicomiso in Mexico), condo bylaws, resale clauses.</li><li><strong>Rental management</strong>: operator, vacancy, commission, remote upkeep when you\'re not on site.</li><li><strong>Exit / resale</strong>: market liquidity, average time to sell, future buyer profile.</li></ol><h2>Mexico or Panama: the right question</h2><p>The question isn\'t "which country is better?" but "which country fits your profile?" A retiree seeking USD stability and pension incentives doesn\'t compare the same criteria as a short-term rental investor on the Riviera Maya.</p><blockquote>Compare Panama and Mexico for your actual retirement, presence calendar or investment model, not a sunset photo.</blockquote><h2>12-month plan (pre-expat or thoughtful project)</h2><ul><li><strong>Months 1-2:</strong> strategy call, profile and budget definition.</li><li><strong>Months 3-6:</strong> targeted visits to 2-3 areas, notary / property manager meetings.</li><li><strong>Months 6-9:</strong> comparative analysis, tax validation, property shortlist.</li><li><strong>Months 9-12:</strong> offer, due diligence, closing (often remotely with notarized power of attorney).</li></ul><h2>What MC Équipe brings</h2><p>100% French-language service, eXp Global network, local legal partners and end-to-end coordination. Catherine Aubé is your dedicated specialist for Mexico and Panama; Mathieu Michaud structures strategy and transaction rigour.</p><p>This article is informational and does not replace personalized legal, tax or financial advice.</p>',

    'meta.title.rejoindreExp': 'Become an eXp Realty broker in Quebec | MC Équipe',
    'meta.desc.rejoindreExp':
      'Join eXp Realty in Quebec: change brokerages, understand the model, Revenue Share and benefits. eXp recruiter - MC Équipe Real Estate.',
    'meta.title.rejoindreEquipe': 'Join MC Équipe Real Estate | Recruitment',
    'meta.desc.rejoindreEquipe':
      'Join a real estate team in Quebec: vision, coaching and benefits of MC Équipe Real Estate at eXp Realty.',
    'meta.title.blogue': 'Blog | eXp recruitment & real estate | MC Équipe',
    'meta.desc.blogue':
      'Articles on joining eXp Realty, the eXp model, Revenue Share, and guides for international buyers. The MC Équipe blog.',

    'index.recruit.label': 'Brokers',
    'index.recruit.title': 'Join eXp <br><span class="italic text-mc-ocean">with MC Équipe.</span>',
    'index.recruit.desc':
      'Considering a brokerage change or joining a real estate team? Discover the eXp model and MC Équipe support.',
    'index.recruit.cta1': 'Become an eXp broker',
    'index.recruit.cta2': 'Read the blog',

    'exp.hero.tag': 'eXp Realty recruitment',
    'exp.hero.title': 'Become an eXp Realty <br><span class="italic text-mc-sand">broker in Quebec.</span>',
    'exp.hero.desc':
      'Exploring eXp, changing brokerages or talking to an eXp recruiter? Here are the essentials - and MC Équipe support.',
    'exp.hero.cta': 'Talk with us',
    'exp.hero.cta2': 'Read the blog',
    'exp.why.label': 'Why eXp',
    'exp.why.title': 'Where pros grow',
    'exp.why.p1':
      'eXp Realty is a global community built to transform the brokerage experience. Agents attend live training, collaborate in real time and access a professional environment designed to help them excel, wherever they are.',
    'exp.why.p2':
      'Compared with traditional offices, eXp\'s virtual campus removes unnecessary commuting and opens international collaboration: coaching, meetings and best-practice sharing with industry experts.',
    'exp.why.p3':
      'At MC Équipe, we live this model in Quebec every day. As eXp recruiters, our role is to help you decide clearly, with no pressure, and to support your onboarding.',
    'exp.model.label': 'The model',
    'exp.model.title': 'What agents value at eXp',
    'exp.model.intro':
      'Four concrete pillars as presented for Quebec. We walk through them in detail on a call.',
    'exp.model.s1.title': 'Work from anywhere',
    'exp.model.s1.desc':
      'eXp\'s virtual professional environment lets you collaborate and learn in real time without depending on a physical office. Training, coaching and team meetings are available from anywhere.',
    'exp.model.s1.desc2':
      'You build your practice while benefiting from a powerful network and collaboration that goes beyond Quebec.',
    'exp.model.s2.title': 'Shareholder opportunity',
    'exp.model.s2.desc':
      'Agents can build their business while having the opportunity to buy shares in eXp World Holdings, the parent company. Milestones (such as a first transaction) may also open equity rewards.',
    'exp.model.s2.desc2':
      'The idea: take part in the company\'s growth, not just wear a brand. We clarify options and conditions in your conversation with us.',
    'exp.model.s3.title': 'Powerful technology',
    'exp.model.s3.desc':
      'Access to advanced brokerage tools (lead attraction, transactions, content marketing, optional advertising) without the extra fees typical of traditional models.',
    'exp.model.s3.desc2':
      'More than 15 hours of live training each week, plus technical, real-estate and financial support so your systems run efficiently wherever you are.',
    'exp.model.s4.title': 'Maximize your earnings',
    'exp.model.s4.desc':
      'The virtual-office model aims to remove traditional add-on costs: no desk fees, franchise fees or royalties. Agents typically keep 80 to 100% of their commissions depending on their path.',
    'exp.model.s4.desc2':
      'Revenue Share (sponsorship-related revenue sharing) and recognition programs such as Icon Agent awards complete the model. These shares do not reduce sponsored agents\' commissions. We explain how it works without jargon.',
    'exp.model.link': 'Go deeper on the eXp model →',
    'exp.model.link2': 'Understand Revenue Share →',
    'exp.model.link3': 'See fees at eXp →',
    'exp.culture.label': 'Culture',
    'exp.culture.title': 'Values that guide the company',
    'exp.culture.desc':
      'At eXp, values support the vision and team culture. If they resonate with you, the model is more likely to be a fit.',
    'exp.culture.v1.title': 'Community',
    'exp.culture.v1.desc': 'Be a good neighbour and leave a lasting legacy.',
    'exp.culture.v2.title': 'Service',
    'exp.culture.v2.desc': 'Create positive change in the company and the local community.',
    'exp.culture.v3.title': 'Collaboration',
    'exp.culture.v3.desc': 'We are all in the same industry: helping each other is part of the model.',
    'exp.culture.v4.title': 'Sustainability',
    'exp.culture.v4.desc': 'Think long-term for the company and family, financially and environmentally.',
    'exp.culture.v5.title': 'Transparency',
    'exp.culture.v5.desc': 'Pull back the curtain on how things work.',
    'exp.culture.v6.title': 'Integrity',
    'exp.culture.v6.desc': 'Do the right thing.',
    'exp.culture.v7.title': 'Innovation',
    'exp.culture.v7.desc': 'The best way to predict the future is to invent it.',
    'exp.culture.v8.title': 'Adaptability',
    'exp.culture.v8.desc': 'Face change and adapt in order to grow.',
    'exp.culture.v9.title': 'Fun',
    'exp.culture.v9.desc': 'Do not take yourself too seriously.',
    'exp.faq.label': 'FAQ',
    'exp.faq.title': 'Before you change brokerages',
    'exp.faq.q1': 'How do I join eXp Realty in Quebec?',
    'exp.faq.a1':
      'A valid OACIQ licence is required in Quebec. Then a call with an eXp recruiter (MC Équipe) clarifies the cloud model, training, tools, Revenue Share and onboarding. We guide you step by step.',
    'exp.faq.q2': 'What are the fees at eXp?',
    'exp.faq.a2':
      'The model aims to avoid traditional desk, franchise and royalty fees. Agents often keep 80 to 100% of commissions depending on their path. We review this transparently on a call, and our fees article goes deeper.',
    'exp.faq.q3': 'Can I join a team at the same time?',
    'exp.faq.a3':
      'Yes. Many agents join eXp and MC Équipe to combine the national model (technology, network, Revenue Share) with local support. Discover what our team offers.',
    'exp.team.label': 'Also',
    'exp.team.title': 'Join MC Équipe Real Estate',
    'exp.team.desc':
      'Beyond the eXp brand, our team offers vision, mentorship and a growth environment for agents who want to go further together.',
    'exp.team.cta': 'Discover the team',
    'exp.contact.label': 'Next step',
    'exp.contact.title': 'Talk to an <br><span class="italic text-mc-sand">eXp recruiter.</span>',
    'exp.contact.desc':
      'Fill out the form or book a call. We will answer your questions about eXp, changing brokerages and onboarding.',
    'exp.form.intent': 'Your situation',
    'exp.form.opt1': 'Join eXp',
    'exp.form.opt2': 'Change brokerages',
    'exp.form.opt3': 'Join the team',
    'exp.form.opt4': 'Information',
    'exp.form.message': 'I am interested in eXp because...',

    'equipe.hero.tag': 'Team recruitment',
    'equipe.hero.title': 'Join <br><span class="italic text-mc-sand">MC Équipe Real Estate.</span>',
    'equipe.hero.desc':
      'Vision, coaching and concrete benefits for agents who want to grow inside a structured team at eXp Realty.',
    'equipe.hero.cta': 'Get in touch',
    'equipe.hero.cta2': 'First: eXp Realty',
    'equipe.vision.label': 'Our vision',
    'equipe.vision.title': 'A team, not just a brand',
    'equipe.vision.p1':
      'MC Équipe Real Estate brings Mathieu Michaud and Catherine Aubé together around a rigorous practice: residential in Quebec, international acquisitions and uncompromising client service.',
    'equipe.vision.p2':
      'We welcome agents who want structure, mentorship and an environment where quality comes before volume.',
    'equipe.benefits.label': 'Benefits',
    'equipe.benefits.title': 'What you gain by joining us',
    'equipe.benefits.s1.title': 'Real coaching',
    'equipe.benefits.s1.desc':
      'Onboarding, file follow-up and regular check-ins to accelerate your growth - without leaving you alone behind a login.',
    'equipe.benefits.s2.title': 'Clear positioning',
    'equipe.benefits.s2.desc':
      'A coherent team brand (MC Équipe), distinctive niches (international, military, mortgage partner) and a site that works for you.',
    'equipe.benefits.s3.title': 'eXp model + team',
    'equipe.benefits.s3.desc':
      'The best of both worlds: eXp flexibility and local team culture. Ideal if you want to join a real estate team without losing autonomy.',
    'equipe.faces.title': 'Who supports you',
    'equipe.mathieu.blurb':
      'Strategy, transaction rigour and mentorship. He structures the approach and helps you perform in the eXp model.',
    'equipe.catherine.blurb':
      'Client relationships, international and human support. She is the relational heart of the team.',
    'equipe.articles.title': 'Read about our coaching',
    'equipe.articles.desc':
      'How we support agents day to day - and what it really means to join a real estate team.',
    'equipe.articles.cta': 'Read the article',
    'equipe.contact.label': 'Next step',
    'equipe.contact.title': 'Let\'s talk about <br><span class="italic text-mc-sand">your place.</span>',
    'equipe.contact.desc':
      'Tell us where you are. We will follow up to explore a possible affiliation with MC Équipe.',
    'equipe.form.intent': 'Your interest',
    'equipe.form.opt1': 'Join the team',
    'equipe.form.opt2': 'eXp + team',
    'equipe.form.opt3': 'Mentorship',
    'equipe.form.opt4': 'Information',
    'equipe.form.message': 'I would like to join MC Équipe because...',

    'blogue.hero.tag': 'News & guides',
    'blogue.hero.title': 'The MC Équipe <br><span class="italic text-mc-ocean">blog</span>',
    'blogue.hero.desc':
      'Content for agents exploring eXp Realty, and for Quebec buyers looking at Mexico and Panama.',
    'blogue.cat.recrutement': 'Recruitment',
    'blogue.cat.recrutementTitle': 'eXp Realty & career',
    'blogue.cat.international': 'International',
    'blogue.cat.internationalTitle': 'Mexico & Panama',
    'blogue.r1.tag': 'eXp Realty',
    'blogue.r1.title': 'Why choose eXp Realty',
    'blogue.r1.excerpt': 'Why Quebec agents join eXp - beyond the marketing.',
    'blogue.r2.tag': 'Model',
    'blogue.r2.title': 'Benefits of the eXp model',
    'blogue.r2.excerpt': 'Technology, training, network and flexibility: what the model changes in practice.',
    'blogue.r3.tag': 'Comparison',
    'blogue.r3.title': 'eXp vs traditional brokerages',
    'blogue.r3.excerpt': 'Changing brokerages: what really differs between eXp and classic models.',
    'blogue.r4.tag': 'Revenue Share',
    'blogue.r4.title': 'How Revenue Share works',
    'blogue.r4.excerpt': 'How revenue sharing works at eXp, in plain language.',
    'blogue.r5.tag': 'Fees',
    'blogue.r5.title': 'Fees at eXp',
    'blogue.r5.excerpt': 'Cost structure, splits and what to clarify before signing.',
    'blogue.r6.tag': 'MC Équipe',
    'blogue.r6.title': 'How we support agents',
    'blogue.r6.excerpt': 'What joining MC Équipe means: mentorship, culture and growth.',
    'blogue.cta.title': 'Agent interested in eXp or our team?',
    'blogue.cta.desc': 'Talk to an eXp recruiter in Quebec. No pressure - just clear answers.',
    'blogue.cta.btn': 'Get in touch',

    'article.back.blogue': '← All blog posts',
    'article.cta.recrutement.title': 'Talk with an eXp recruiter',
    'article.cta.recrutement.desc':
      'MC Équipe supports agents exploring eXp Realty or a team affiliation in Quebec.',

    'meta.title.article.pourquoiExp': 'Why choose eXp Realty | MC Équipe',
    'meta.desc.article.pourquoiExp':
      'Why Quebec real estate agents choose eXp Realty: model, network, autonomy and support.',
    'article.pourquoiExp.tag': 'eXp Realty · July 2026',
    'article.pourquoiExp.title': 'Why choose eXp Realty',
    'article.pourquoiExp.lead':
      'Beyond the slogans: what Quebec agents really evaluate before joining eXp Realty.',

    'meta.title.article.avantagesExp': 'Benefits of the eXp model | MC Équipe',
    'meta.desc.article.avantagesExp':
      'Benefits of the eXp Realty model: tools, training, global network and flexibility for agents.',
    'article.avantagesExp.tag': 'Model · July 2026',
    'article.avantagesExp.title': 'Benefits of the eXp model',
    'article.avantagesExp.lead':
      'Four pillars of the eXp model - and how to evaluate them for your practice in Quebec.',

    'meta.title.article.expVs': 'eXp vs traditional brokerages | MC Équipe',
    'meta.desc.article.expVs':
      'eXp Realty vs traditional brokerages: model, fees, culture and autonomy differences.',
    'article.expVs.tag': 'Comparison · July 2026',
    'article.expVs.title': 'eXp vs traditional brokerages',
    'article.expVs.lead':
      'Changing brokerages is not a paperwork detail. Here are useful comparison axes.',

    'meta.title.article.revenueShare': 'How Revenue Share works | MC Équipe',
    'meta.desc.article.revenueShare':
      'How Revenue Share works at eXp Realty: principles, network logic and questions to ask.',
    'article.revenueShare.tag': 'Revenue Share · July 2026',
    'article.revenueShare.title': 'How Revenue Share works',
    'article.revenueShare.lead':
      'Revenue Share is often the most misunderstood - and most interesting - part of the eXp model.',

    'meta.title.article.fraisExp': 'Fees at eXp | MC Équipe',
    'meta.desc.article.fraisExp':
      'Understanding fees at eXp Realty: splits, platform fees and points to clarify before joining.',
    'article.fraisExp.tag': 'Fees · July 2026',
    'article.fraisExp.title': 'Fees at eXp',
    'article.fraisExp.lead':
      'Before joining eXp Realty, clarify the cost structure. Here is the discussion framework we use with agents.',

    'meta.title.article.accompagnement': 'MC Équipe agent coaching | MC Équipe',
    'meta.desc.article.accompagnement':
      'MC Équipe coaching for agents: mentorship, team vision and benefits of joining a real estate team.',
    'article.accompagnement.tag': 'MC Équipe · July 2026',
    'article.accompagnement.title': 'How we support agents',
    'article.accompagnement.lead':
      'Joining a real estate team means choosing an environment. Here is what MC Équipe puts in place for its agents.',

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
      'Knowing that transaction success lies in the details, Mathieu developed “The Buddy Broker”. Far more than a notebook, it’s a complete organizational system for modern brokerage. This tool guarantees follow-ups of absolute rigour: no call forgotten, no deadline missed. True peace of mind and impeccable service for every client.',

    'catherine.role': 'Real estate broker',
    'catherine.p1':
      'Driven by a passion for architecture, spatial design and people, Catherine has a rare gift for revealing a property’s full potential. Her empathy and negotiation strength build unshakeable trust, turning complex transactions into smooth, reassuring experiences.',
    'catherine.p2':
      'A specialist in personalized guidance, she is the relational heart of the firm. She excels at understanding clients’ lifestyle needs to guide them toward the right investment. Her staging expertise ensures optimal aesthetic positioning on the market.',
    'catherine.p3':
      'Beyond Quebec, Catherine leads our overseas acquisition service. Whether a retirement project in Mexico or an investment in Panama, she demystifies cross-border legal processes and offers secure support from the first virtual visit to key handoff.',
    'catherine.cta': 'Email Catherine',
    'catherine.recruit.link': 'Catherine Aubé - eXp Quebec recruitment',
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

    if (global.FunnelForms && typeof global.FunnelForms.refreshLang === 'function') {
      global.FunnelForms.refreshLang();
    }
    if (global.MCBooking && typeof global.MCBooking.refresh === 'function') {
      global.MCBooking.refresh();
    }
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
