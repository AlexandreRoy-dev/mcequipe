#!/usr/bin/env python3
"""Enrich all recruitment pages with eXp Quebec join-page content (paraphrased for MC Équipe)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PAGES = [
    "devenir-courtier-exp-quebec.html",
    "rejoindre-exp-realty-quebec.html",
    "recrutement-exp-quebec.html",
    "recrutement-exp-quebec-mathieu-michaud.html",
    "recrutement-exp-quebec-catherine-aube.html",
]

# Shared body between end of </header> and the FAQ charcoal section
ENRICHED = r'''
    <section class="py-32 bg-mc-linen">
        <div class="max-w-4xl mx-auto px-6 lg:px-8 reveal-up">
            <span class="text-mc-ocean uppercase tracking-widest text-xs font-medium block mb-4" data-i18n="exp.why.label">Pourquoi eXp</span>
            <h2 class="font-heading text-4xl md:text-5xl mb-8 leading-tight" data-i18n="exp.why.title">Là où les pros se développent</h2>
            <p class="font-light text-mc-charcoal/80 leading-relaxed mb-6" data-i18n="exp.why.p1">eXp Immobilier est une communauté mondiale conçue pour transformer l'expérience du courtage. Les courtiers assistent à des formations en direct, collaborent en temps réel et accèdent à un environnement professionnel pensé pour exceller, peu importe où ils se trouvent.</p>
            <p class="font-light text-mc-charcoal/80 leading-relaxed mb-6" data-i18n="exp.why.p2">Comparé aux bureaux traditionnels, le campus virtuel d'eXp élimine les déplacements inutiles et ouvre une collaboration internationale : coaching, rencontres et partage de meilleures pratiques avec des experts de l'industrie.</p>
            <p class="font-light text-mc-charcoal/80 leading-relaxed" data-i18n="exp.why.p3">Chez MC Équipe, nous vivons ce modèle au Québec au quotidien. Notre rôle de recruteurs eXp est de vous aider à décider clairement, sans pression, et de vous accompagner dans l'intégration.</p>
        </div>
    </section>

    <section class="py-32 bg-mc-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-16 reveal-up">
                <span class="text-mc-ocean uppercase tracking-widest text-xs font-medium block mb-4" data-i18n="exp.model.label">Le modèle</span>
                <h2 class="font-heading text-4xl md:text-5xl mb-4" data-i18n="exp.model.title">Ce que les courtiers apprécient chez eXp</h2>
                <p class="font-light text-mc-charcoal/70 max-w-2xl mx-auto" data-i18n="exp.model.intro">Quatre piliers concrets, tels que présentés pour le Québec. Nous les expliquons en détail lors d'un appel.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
                <article class="reveal-up border-t border-mc-charcoal/10 pt-8">
                    <span class="text-mc-sand uppercase tracking-widest text-[10px] font-bold block mb-4">01</span>
                    <h3 class="font-heading text-2xl md:text-3xl mb-4" data-i18n="exp.model.s1.title">Travaillez de partout</h3>
                    <p class="font-light text-sm text-mc-charcoal/75 leading-relaxed mb-4" data-i18n="exp.model.s1.desc">L'environnement professionnel virtuel d'eXp permet de collaborer et d'apprendre en temps réel, sans dépendre d'un bureau physique. Formations, coaching et rencontres d'équipe sont accessibles de n'importe où.</p>
                    <p class="font-light text-sm text-mc-charcoal/75 leading-relaxed" data-i18n="exp.model.s1.desc2">Vous bâtissez votre pratique tout en profitant d'un réseau de contacts puissant et d'une collaboration qui dépasse les frontières du Québec.</p>
                </article>
                <article class="reveal-up border-t border-mc-charcoal/10 pt-8" style="transition-delay:80ms">
                    <span class="text-mc-sand uppercase tracking-widest text-[10px] font-bold block mb-4">02</span>
                    <h3 class="font-heading text-2xl md:text-3xl mb-4" data-i18n="exp.model.s2.title">Possibilité de devenir actionnaire</h3>
                    <p class="font-light text-sm text-mc-charcoal/75 leading-relaxed mb-4" data-i18n="exp.model.s2.desc">Les courtiers peuvent bâtir leur entreprise tout en ayant l'opportunité d'acheter des actions d'eXp World Holdings, la société mère. Des réalisations (comme une première transaction) peuvent aussi ouvrir des récompenses en actions.</p>
                    <p class="font-light text-sm text-mc-charcoal/75 leading-relaxed" data-i18n="exp.model.s2.desc2">L'idée : faire partie de la croissance de l'entreprise, pas seulement d'une bannière. Nous clarifions les options et les conditions lors de votre conversation avec nous.</p>
                </article>
                <article class="reveal-up border-t border-mc-charcoal/10 pt-8" style="transition-delay:160ms">
                    <span class="text-mc-sand uppercase tracking-widest text-[10px] font-bold block mb-4">03</span>
                    <h3 class="font-heading text-2xl md:text-3xl mb-4" data-i18n="exp.model.s3.title">Une technologie puissante</h3>
                    <p class="font-light text-sm text-mc-charcoal/75 leading-relaxed mb-4" data-i18n="exp.model.s3.desc">Accès aux outils avancés du courtage (attraction de clients, transactions, marketing de contenu, publicité optionnelle) sans frais additionnels typiques du modèle traditionnel.</p>
                    <p class="font-light text-sm text-mc-charcoal/75 leading-relaxed" data-i18n="exp.model.s3.desc2">Plus de 15 heures de formation en direct chaque semaine, et un soutien technique, immobilier et financier pour que vos systèmes fonctionnent efficacement, où que vous soyez.</p>
                </article>
                <article class="reveal-up border-t border-mc-charcoal/10 pt-8" style="transition-delay:240ms">
                    <span class="text-mc-sand uppercase tracking-widest text-[10px] font-bold block mb-4">04</span>
                    <h3 class="font-heading text-2xl md:text-3xl mb-4" data-i18n="exp.model.s4.title">Maximisez vos gains</h3>
                    <p class="font-light text-sm text-mc-charcoal/75 leading-relaxed mb-4" data-i18n="exp.model.s4.desc">Le modèle de bureau virtuel vise à éliminer les coûts additionnels du courtage traditionnel : pas de frais de bureau, ni de franchise, ni de redevance. Les courtiers conservent généralement entre 80 et 100 % de leurs commissions, selon leur parcours.</p>
                    <p class="font-light text-sm text-mc-charcoal/75 leading-relaxed" data-i18n="exp.model.s4.desc2">Le Revenue Share (partage de revenus lié au parrainage) et des programmes de reconnaissance comme le prix Agent Icône s'ajoutent au modèle. Ces parts ne réduisent pas les commissions des courtiers parrainés. Nous vous expliquons le fonctionnement sans jargon.</p>
                </article>
            </div>
            <div class="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 reveal-up">
                <a href="articles/avantages-modele-exp.html" class="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-mc-charcoal pb-1 hover:text-mc-ocean hover:border-mc-ocean transition-colors" data-i18n="exp.model.link">Approfondir le modèle eXp →</a>
                <a href="articles/fonctionnement-revenue-share.html" class="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-mc-charcoal pb-1 hover:text-mc-ocean hover:border-mc-ocean transition-colors" data-i18n="exp.model.link2">Comprendre le Revenue Share →</a>
                <a href="articles/frais-chez-exp.html" class="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-mc-charcoal pb-1 hover:text-mc-ocean hover:border-mc-ocean transition-colors" data-i18n="exp.model.link3">Voir les frais chez eXp →</a>
            </div>
        </div>
    </section>

    <section class="py-32 bg-mc-linen">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="max-w-3xl mb-14 reveal-up">
                <span class="text-mc-ocean uppercase tracking-widest text-xs font-medium block mb-4" data-i18n="exp.culture.label">Culture</span>
                <h2 class="font-heading text-4xl md:text-5xl mb-6" data-i18n="exp.culture.title">Des valeurs qui guident l'entreprise</h2>
                <p class="font-light text-mc-charcoal/80 leading-relaxed" data-i18n="exp.culture.desc">Chez eXp, les valeurs soutiennent la vision et la culture d'équipe. Si elles vous parlent, le modèle a de bonnes chances de vous convenir.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="reveal-up">
                    <h3 class="font-heading text-xl mb-2" data-i18n="exp.culture.v1.title">Communauté</h3>
                    <p class="font-light text-sm text-mc-charcoal/70" data-i18n="exp.culture.v1.desc">Être un bon voisin pour laisser un héritage durable.</p>
                </div>
                <div class="reveal-up" style="transition-delay:50ms">
                    <h3 class="font-heading text-xl mb-2" data-i18n="exp.culture.v2.title">Service</h3>
                    <p class="font-light text-sm text-mc-charcoal/70" data-i18n="exp.culture.v2.desc">Apporter des changements positifs dans l'entreprise et la communauté locale.</p>
                </div>
                <div class="reveal-up" style="transition-delay:100ms">
                    <h3 class="font-heading text-xl mb-2" data-i18n="exp.culture.v3.title">Collaboration</h3>
                    <p class="font-light text-sm text-mc-charcoal/70" data-i18n="exp.culture.v3.desc">On est tous dans le même domaine : s'entraider fait partie du modèle.</p>
                </div>
                <div class="reveal-up" style="transition-delay:150ms">
                    <h3 class="font-heading text-xl mb-2" data-i18n="exp.culture.v4.title">Viabilité</h3>
                    <p class="font-light text-sm text-mc-charcoal/70" data-i18n="exp.culture.v4.desc">Penser longévité pour l'entreprise et la famille, sur le plan financier et environnemental.</p>
                </div>
                <div class="reveal-up" style="transition-delay:200ms">
                    <h3 class="font-heading text-xl mb-2" data-i18n="exp.culture.v5.title">Transparence</h3>
                    <p class="font-light text-sm text-mc-charcoal/70" data-i18n="exp.culture.v5.desc">Dévoiler ce qui se passe derrière les rideaux.</p>
                </div>
                <div class="reveal-up" style="transition-delay:250ms">
                    <h3 class="font-heading text-xl mb-2" data-i18n="exp.culture.v6.title">Intégrité</h3>
                    <p class="font-light text-sm text-mc-charcoal/70" data-i18n="exp.culture.v6.desc">Agir comme il se doit.</p>
                </div>
                <div class="reveal-up" style="transition-delay:300ms">
                    <h3 class="font-heading text-xl mb-2" data-i18n="exp.culture.v7.title">Innovation</h3>
                    <p class="font-light text-sm text-mc-charcoal/70" data-i18n="exp.culture.v7.desc">La meilleure façon de prédire le futur, c'est de l'inventer.</p>
                </div>
                <div class="reveal-up" style="transition-delay:350ms">
                    <h3 class="font-heading text-xl mb-2" data-i18n="exp.culture.v8.title">Capacité d'adaptation</h3>
                    <p class="font-light text-sm text-mc-charcoal/70" data-i18n="exp.culture.v8.desc">Confronter le changement et s'adapter pour grandir.</p>
                </div>
                <div class="reveal-up" style="transition-delay:400ms">
                    <h3 class="font-heading text-xl mb-2" data-i18n="exp.culture.v9.title">Amusement</h3>
                    <p class="font-light text-sm text-mc-charcoal/70" data-i18n="exp.culture.v9.desc">Ne pas se prendre trop au sérieux.</p>
                </div>
            </div>
        </div>
    </section>
'''

FAQ_ENHANCED = {
    "exp.faq.a1": (
        "Un permis OACIQ valide est requis au Québec. Ensuite, un appel avec un recruteur eXp "
        "(MC Équipe) clarifie le modèle cloud, les formations, les outils, le Revenue Share et "
        "l'intégration. Nous vous guidons étape par étape."
    ),
    "exp.faq.a2": (
        "Le modèle vise à éviter les frais de bureau, de franchise et de redevance typiques des "
        "bannières traditionnelles. Les courtiers conservent souvent 80 à 100 % de leurs commissions "
        "selon leur parcours. Nous en faisons un tour transparent lors de l'appel, et notre article "
        "sur les frais chez eXp approfondit le sujet."
    ),
    "exp.faq.a3": (
        "Oui. Plusieurs courtiers rejoignent eXp et MC Équipe pour combiner le modèle national "
        "(technologie, réseau, Revenue Share) et un accompagnement local. Découvrez les avantages "
        "de notre équipe."
    ),
}


def fix_spaces(text: str) -> str:
    return re.sub(r"\s+-\s+", " - ", text)


def replace_middle(html: str) -> str:
    # From first why/linen section after header through end of culture-or-old-model, stop before FAQ charcoal
    pattern = re.compile(
        r"(</header>\s*)"
        r"<section class=\"py-32 bg-mc-linen\">.*?"
        r"(?=<section class=\"py-32 bg-mc-charcoal text-white\">)",
        re.S,
    )
    if not pattern.search(html):
        raise SystemExit("Could not find section to replace")
    return pattern.sub(r"\1" + ENRICHED + "\n", html, count=1)


def patch_faq_answers(html: str) -> str:
    # Update French FAQ answer paragraphs in HTML (data-i18n content)
    replacements = [
        (
            'data-i18n="exp.faq.a1">Un permis OACIQ valide est requis. Ensuite, un appel avec un recruteur eXp (nous) permet de clarifier le modèle, les frais, le Revenue Share et l\'intégration. Nous vous guidons étape par étape.</p>',
            f'data-i18n="exp.faq.a1">{FAQ_ENHANCED["exp.faq.a1"]}</p>',
        ),
        (
            'data-i18n="exp.faq.a2">La structure de frais diffère des bannières traditionnelles (partages, frais de plateforme, plafonds). Nous en faisons un tour transparent lors de l\'appel. Consultez aussi notre article dédié sur les frais chez eXp.</p>',
            f'data-i18n="exp.faq.a2">{FAQ_ENHANCED["exp.faq.a2"]}</p>',
        ),
        (
            'data-i18n="exp.faq.a3">Oui. Plusieurs courtiers rejoignent eXp et MC Équipe pour bénéficier du modèle national et d\'un accompagnement local. Découvrez les avantages de notre équipe.</p>',
            f'data-i18n="exp.faq.a3">{FAQ_ENHANCED["exp.faq.a3"]}</p>',
        ),
    ]
    for old, new in replacements:
        if old in html:
            html = html.replace(old, new)
        else:
            # already updated or slightly different - try loose replace by i18n key
            html = re.sub(
                rf'(data-i18n="{re.escape(old.split(chr(34))[1])}">)[^<]+',
                lambda m, n=new: n if False else m.group(0),
                html,
            )
    # Simpler: replace by key content if still old short versions
    html = re.sub(
        r'(data-i18n="exp\.faq\.a1">)[^<]+',
        r"\1" + FAQ_ENHANCED["exp.faq.a1"],
        html,
        count=1,
    )
    html = re.sub(
        r'(data-i18n="exp\.faq\.a2">)[^<]+',
        r"\1" + FAQ_ENHANCED["exp.faq.a2"],
        html,
        count=1,
    )
    html = re.sub(
        r'(data-i18n="exp\.faq\.a3">)[^<]+',
        r"\1" + FAQ_ENHANCED["exp.faq.a3"],
        html,
        count=1,
    )
    return html


def update_i18n() -> None:
    path = ROOT / "i18n.js"
    text = path.read_text(encoding="utf-8")
    # Insert/replace EN keys for new content after exp.why.p2
    block = """
    'exp.why.title': 'Where pros grow',
    'exp.why.p1':
      'eXp Realty is a global community built to transform the brokerage experience. Agents attend live training, collaborate in real time and access a professional environment designed to help them excel, wherever they are.',
    'exp.why.p2':
      'Compared with traditional offices, eXp\\'s virtual campus removes unnecessary commuting and opens international collaboration: coaching, meetings and best-practice sharing with industry experts.',
    'exp.why.p3':
      'At MC Équipe, we live this model in Quebec every day. As eXp recruiters, our role is to help you decide clearly, with no pressure, and to support your onboarding.',
    'exp.model.label': 'The model',
    'exp.model.title': 'What agents value at eXp',
    'exp.model.intro':
      'Four concrete pillars as presented for Quebec. We walk through them in detail on a call.',
    'exp.model.s1.title': 'Work from anywhere',
    'exp.model.s1.desc':
      'eXp\\'s virtual professional environment lets you collaborate and learn in real time without depending on a physical office. Training, coaching and team meetings are available from anywhere.',
    'exp.model.s1.desc2':
      'You build your practice while benefiting from a powerful network and collaboration that goes beyond Quebec.',
    'exp.model.s2.title': 'Shareholder opportunity',
    'exp.model.s2.desc':
      'Agents can build their business while having the opportunity to buy shares in eXp World Holdings, the parent company. Milestones (such as a first transaction) may also open equity rewards.',
    'exp.model.s2.desc2':
      'The idea: take part in the company\\'s growth, not just wear a brand. We clarify options and conditions in your conversation with us.',
    'exp.model.s3.title': 'Powerful technology',
    'exp.model.s3.desc':
      'Access to advanced brokerage tools (lead attraction, transactions, content marketing, optional advertising) without the extra fees typical of traditional models.',
    'exp.model.s3.desc2':
      'More than 15 hours of live training each week, plus technical, real-estate and financial support so your systems run efficiently wherever you are.',
    'exp.model.s4.title': 'Maximize your earnings',
    'exp.model.s4.desc':
      'The virtual-office model aims to remove traditional add-on costs: no desk fees, franchise fees or royalties. Agents typically keep 80 to 100% of their commissions depending on their path.',
    'exp.model.s4.desc2':
      'Revenue Share (sponsorship-related revenue sharing) and recognition programs such as Icon Agent awards complete the model. These shares do not reduce sponsored agents\\' commissions. We explain how it works without jargon.',
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
    'exp.faq.a1':
      'A valid OACIQ licence is required in Quebec. Then a call with an eXp recruiter (MC Équipe) clarifies the cloud model, training, tools, Revenue Share and onboarding. We guide you step by step.',
    'exp.faq.a2':
      'The model aims to avoid traditional desk, franchise and royalty fees. Agents often keep 80 to 100% of commissions depending on their path. We review this transparently on a call, and our fees article goes deeper.',
    'exp.faq.a3':
      'Yes. Many agents join eXp and MC Équipe to combine the national model (technology, network, Revenue Share) with local support. Discover what our team offers.',
"""
    # Replace from exp.why.title through exp.faq.a3 block in EN object - fragile; append keys if missing
    if "'exp.culture.label'" not in text:
        # insert before exp.faq.label
        text = text.replace(
            "    'exp.faq.label':",
            block + "\n    'exp.faq.label':",
            1,
        )
    # Update existing why/model keys lightly
    text = re.sub(
        r"'exp\.why\.title':\s*'[^']*',",
        "'exp.why.title': 'Where pros grow',",
        text,
        count=1,
    )
    path.write_text(fix_spaces(text), encoding="utf-8")
    print("i18n.js updated")


def main() -> None:
    for name in PAGES:
        path = ROOT / name
        html = path.read_text(encoding="utf-8")
        html = replace_middle(html)
        html = patch_faq_answers(html)
        html = re.sub(r"\s+-\s+", " - ", html)
        path.write_text(html, encoding="utf-8")
        print(f"Updated {name}")

    update_i18n()
    print("Done.")


if __name__ == "__main__":
    main()
