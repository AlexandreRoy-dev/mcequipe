#!/usr/bin/env python3
"""Build recruitment URL variants + per-broker pages; strip em dashes site-wide."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAIN = "devenir-courtier-exp-quebec.html"
CANONICAL = f"https://mcequipe.ca/{MAIN}"
ALIASES = [
    "rejoindre-exp-realty-quebec.html",
    "recrutement-exp-quebec.html",
]

EM = "\u2014"  # —
EN = "\u2013"  # –


def strip_dashes(text: str) -> str:
    text = text.replace(EM, " - ")
    text = text.replace(EN, "-")
    # collapse accidental " -  - " from double replacements
    text = re.sub(r"\s+-\s+-\s+", " - ", text)
    return text


def make_main(src: str) -> str:
    text = src
    text = text.replace("https://mcequipe.ca/rejoindre-exp.html", CANONICAL)
    text = text.replace('href="rejoindre-exp.html"', f'href="{MAIN}"')
    text = text.replace(
        'name="page" value="rejoindre-exp"',
        'name="page" value="devenir-courtier-exp-quebec"',
    )
    text = text.replace(
        'name="source" value="recrutement-exp"',
        'name="source" value="devenir-courtier-exp-quebec"',
    )
    return text


def make_alias(main_html: str, alias: str) -> str:
    slug = alias.replace(".html", "")
    text = main_html
    text = text.replace(
        f'<a href="{MAIN}" class="hover-trigger text-mc-sand transition-colors" data-i18n="nav.rejoindre">Rejoindre</a>',
        f'<a href="{alias}" class="hover-trigger text-mc-sand transition-colors" data-i18n="nav.rejoindre">Rejoindre</a>',
        1,
    )
    text = text.replace(
        'name="page" value="devenir-courtier-exp-quebec"',
        f'name="page" value="{slug}"',
    )
    text = text.replace(
        'name="source" value="devenir-courtier-exp-quebec"',
        f'name="source" value="{slug}"',
    )
    return text


def make_broker_page(main_html: str, *, first: str, last: str, slug: str, email: str, phone: str, phone_href: str, photo: str, role_fr: str) -> str:
    """Personalized recruitment landing for one broker."""
    full = f"{first} {last}"
    title = f"{full} - Recrutement eXp Québec | MC Équipe"
    desc = (
        f"{full}, recruteur eXp Realty au Québec. Discutez du modèle eXp, "
        f"du changement de bannière et de l'accompagnement MC Équipe."
    )
    url = f"https://mcequipe.ca/{slug}"

    text = main_html
    # Meta
    text = re.sub(
        r"<title[^>]*>.*?</title>",
        f"<title>{title}</title>",
        text,
        count=1,
        flags=re.S,
    )
    text = re.sub(
        r'<meta name="description"[^>]*>',
        f'<meta name="description" content="{desc}">',
        text,
        count=1,
    )
    text = re.sub(
        r'<link rel="canonical"[^>]*>',
        f'<link rel="canonical" href="{url}">',
        text,
        count=1,
    )
    text = re.sub(
        r'<meta property="og:title"[^>]*>',
        f'<meta property="og:title" content="{title}">',
        text,
        count=1,
    )
    text = re.sub(
        r'<meta property="og:description"[^>]*>',
        f'<meta property="og:description" content="{desc}">',
        text,
        count=1,
    )
    text = re.sub(
        r'<meta property="og:url"[^>]*>',
        f'<meta property="og:url" content="{url}">',
        text,
        count=1,
    )
    text = re.sub(
        r'<meta property="og:image"[^>]*>',
        f'<meta property="og:image" content="https://mcequipe.ca/{photo}">',
        text,
        count=1,
    )

    # FAQ recruiter answer → this person
    text = text.replace(
        "Mathieu Michaud et Catherine Aubé accompagnent les courtiers intéressés à rejoindre eXp Realty au Québec. Ils présentent le modèle, répondent aux questions et proposent l'accompagnement MC Équipe.",
        f"{full} accompagne les courtiers intéressés à rejoindre eXp Realty au Québec. {first} présente le modèle, répond aux questions et propose l'accompagnement MC Équipe.",
    )

    # Hero
    text = text.replace(
        'data-i18n="exp.hero.tag">Recrutement eXp Realty</span>',
        f'data-i18n="exp.hero.tag">{full} - Recrutement eXp Québec</span>',
    )
    text = text.replace(
        'data-i18n="exp.hero.title" data-i18n-html>Devenir courtier <br><span class="italic text-mc-sand">eXp Realty au Québec.</span></h1>',
        f'data-i18n="exp.hero.title" data-i18n-html>Recrutement eXp Québec <br><span class="italic text-mc-sand">avec {first}.</span></h1>',
    )
    text = text.replace(
        "Vous envisagez de rejoindre eXp, de changer de bannière ou de parler à un recruteur eXp? Voici les réponses essentielles — et l'accompagnement MC Équipe.",
        f"Vous envisagez de rejoindre eXp ou de changer de bannière? {first} vous répond clairement, sans pression, avec l'accompagnement MC Équipe.",
    )
    text = text.replace(
        "Voici les réponses essentielles - et l'accompagnement MC Équipe.",
        f"{first} vous répond clairement, sans pression, avec l'accompagnement MC Équipe.",
    )

    # Contact section
    text = text.replace(
        'data-i18n="exp.contact.title" data-i18n-html>Parler à un <br><span class="italic text-mc-sand">recruteur eXp.</span></h2>',
        f'data-i18n="exp.contact.title" data-i18n-html>Parler avec <br><span class="italic text-mc-sand">{first}.</span></h2>',
    )
    text = text.replace(
        "Remplissez le formulaire ou planifiez un appel. Nous répondrons à vos questions sur eXp, le changement de bannière et l'intégration.",
        f"Remplissez le formulaire ou écrivez à {first}. Vous discuterez d'eXp, du changement de bannière et de l'intégration.",
    )
    old_contact = """                    <div class="space-y-6">
                        <div>
                            <p class="text-[10px] uppercase tracking-widest text-mc-charcoal/50 mb-1" data-i18n="index.contact.phone">Téléphone</p>
                            <p class="font-light text-sm">Mathieu : (418) 655-8090</p>
                            <p class="font-light text-sm">Catherine : (418) 952-0925</p>
                        </div>
                        <div>
                            <p class="text-[10px] uppercase tracking-widest text-mc-charcoal/50 mb-1" data-i18n="index.contact.email">Courriel</p>
                            <a href="mailto:info@mcequipe.com" class="font-light text-sm hover:text-mc-sand transition-colors">info@mcequipe.com</a>
                        </div>
                    </div>"""
    new_contact = f"""                    <div class="space-y-6">
                        <div class="flex items-center gap-4 mb-2">
                            <img src="{photo}" alt="{full}" class="w-16 h-16 rounded-full object-cover grayscale">
                            <div>
                                <p class="font-heading text-lg">{full}</p>
                                <p class="text-[10px] uppercase tracking-widest text-mc-charcoal/50">{role_fr}</p>
                            </div>
                        </div>
                        <div>
                            <p class="text-[10px] uppercase tracking-widest text-mc-charcoal/50 mb-1" data-i18n="index.contact.phone">Téléphone</p>
                            <a href="tel:{phone_href}" class="font-light text-sm hover:text-mc-sand transition-colors">{phone}</a>
                        </div>
                        <div>
                            <p class="text-[10px] uppercase tracking-widest text-mc-charcoal/50 mb-1" data-i18n="index.contact.email">Courriel</p>
                            <a href="mailto:{email}" class="font-light text-sm hover:text-mc-sand transition-colors">{email}</a>
                        </div>
                        <a href="{first.lower()}.html" class="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] border-b border-mc-charcoal/30 pb-1 hover:text-mc-ocean hover:border-mc-ocean transition-colors">Voir le profil {first} →</a>
                    </div>"""
    if old_contact in text:
        text = text.replace(old_contact, new_contact)
    else:
        print(f"WARN: contact block not found for {full}")

    # Form hidden fields
    text = text.replace(
        'name="sujet" value="Recrutement eXp"',
        f'name="sujet" value="Recrutement eXp - {full}"',
    )
    text = text.replace(
        'name="page" value="devenir-courtier-exp-quebec"',
        f'name="page" value="{slug.replace(".html", "")}"',
    )
    text = text.replace(
        'name="source" value="devenir-courtier-exp-quebec"',
        f'name="source" value="{slug.replace(".html", "")}"',
    )
    text = text.replace(
        'name="_subject" value="MC Équipe - Recrutement eXp"',
        f'name="_subject" value="MC Équipe - Recrutement eXp ({full})"',
    )
    # Insert recruteur field after source
    if 'name="recruteur"' not in text:
        text = text.replace(
            f'name="source" value="{slug.replace(".html", "")}">',
            f'name="source" value="{slug.replace(".html", "")}">\n'
            f'                        <input type="hidden" name="recruteur" value="{full}">',
        )

    # Nav rejoindre → this page
    text = text.replace(
        f'<a href="{MAIN}" class="hover-trigger text-mc-sand transition-colors" data-i18n="nav.rejoindre">Rejoindre</a>',
        f'<a href="{slug}" class="hover-trigger text-mc-sand transition-colors" data-i18n="nav.rejoindre">Rejoindre</a>',
        1,
    )

    # Team section CTA still points to rejoindre-mc-equipe
    return strip_dashes(text)


def update_site_links() -> None:
    for path in list(ROOT.rglob("*.html")) + list(ROOT.rglob("*.js")) + list(ROOT.rglob("*.xml")):
        if ".git" in path.parts or "scripts" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        original = text
        # Don't rewrite the redirect file's target incorrectly
        if path.name == "rejoindre-exp.html":
            continue
        text = text.replace("rejoindre-exp.html", MAIN)
        text = text.replace("https://mcequipe.ca/rejoindre-exp.html", CANONICAL)
        if text != original:
            path.write_text(text, encoding="utf-8")
            print(f"  Links updated: {path.relative_to(ROOT)}")


def strip_sitewide() -> None:
    exts = {".html", ".js", ".css", ".xml", ".md", ".json"}
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in exts:
            continue
        if ".git" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        new = strip_dashes(text)
        if new != text:
            path.write_text(new, encoding="utf-8")
            print(f"  Dashes cleaned: {path.relative_to(ROOT)}")


def patch_bios() -> None:
    mathieu = ROOT / "mathieu.html"
    catherine = ROOT / "catherine.html"

    mathieu_link = """
            <a href="recrutement-exp-quebec-mathieu-michaud.html" class="hover-trigger inline-flex items-center gap-3 mt-6 text-[10px] uppercase tracking-[0.2em] text-mc-ocean border-b border-mc-ocean/40 pb-1 hover:text-mc-charcoal hover:border-mc-charcoal transition-colors" data-i18n="mathieu.recruit.link">
                Mathieu Michaud - Recrutement eXp Québec
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>"""

    catherine_link = """
            <a href="recrutement-exp-quebec-catherine-aube.html" class="hover-trigger inline-flex items-center gap-3 mt-8 text-[10px] uppercase tracking-[0.2em] text-mc-ocean border-b border-mc-ocean/40 pb-1 hover:text-mc-charcoal hover:border-mc-charcoal transition-colors" data-i18n="catherine.recruit.link">
                Catherine Aubé - Recrutement eXp Québec
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>"""

    m = mathieu.read_text(encoding="utf-8")
    if "recrutement-exp-quebec-mathieu-michaud.html" not in m:
        # insert after military link or after CTA block
        needle = 'data-i18n="mathieu.military.link">'
        idx = m.find(needle)
        if idx != -1:
            end = m.find("</a>", idx) + 4
            m = m[:end] + "\n" + mathieu_link + m[end:]
        else:
            m = m.replace(
                "</div>\n\n        <div class=\"w-full lg:w-1/2 reveal-up\">\n            <div class=\"aspect-[3/4]",
                mathieu_link + "\n        </div>\n\n        <div class=\"w-full lg:w-1/2 reveal-up\">\n            <div class=\"aspect-[3/4]",
                1,
            )
        mathieu.write_text(m, encoding="utf-8")
        print("  Added Mathieu recruit link")

    c = catherine.read_text(encoding="utf-8")
    if "recrutement-exp-quebec-catherine-aube.html" not in c:
        needle = 'data-i18n="catherine.cta">'
        idx = c.find(needle)
        if idx != -1:
            # find closing of the mt-12 flex div after phone
            block_end = c.find("</div>\n        </div>\n\n        <div class=\"w-full lg:w-1/2 reveal-up\">", idx)
            if block_end != -1:
                # insert before the closing of left column - after phone row's parent
                insert_at = c.find(
                    "            </div>\n\n        <div class=\"w-full lg:w-1/2 reveal-up\">",
                    idx,
                )
                if insert_at != -1:
                    c = c[:insert_at] + catherine_link + "\n" + c[insert_at:]
                else:
                    c = c.replace(
                        '                    (418) 952-0925\n                </a>\n            </div>\n        </div>',
                        '                    (418) 952-0925\n                </a>\n            </div>'
                        + catherine_link
                        + "\n        </div>",
                        1,
                    )
        catherine.write_text(c, encoding="utf-8")
        print("  Added Catherine recruit link")


def update_sitemap(main_html_slugs: list[str]) -> None:
    path = ROOT / "sitemap.xml"
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8")
    # replace old rejoindre-exp entry
    text = text.replace(
        "https://mcequipe.ca/rejoindre-exp.html",
        CANONICAL,
    )
    for slug in main_html_slugs:
        loc = f"https://mcequipe.ca/{slug}"
        if loc not in text:
            entry = (
                f"  <url>\n"
                f"    <loc>{loc}</loc>\n"
                f"    <changefreq>monthly</changefreq>\n"
                f"    <priority>0.8</priority>\n"
                f"  </url>\n"
            )
            text = text.replace("</urlset>", entry + "</urlset>")
    path.write_text(text, encoding="utf-8")
    print("  sitemap.xml updated")


def main() -> None:
    src_path = ROOT / "rejoindre-exp.html"
    raw = src_path.read_text(encoding="utf-8")
    if "FAQPage" not in raw:
        if (ROOT / MAIN).exists() and "FAQPage" in (ROOT / MAIN).read_text(encoding="utf-8"):
            raw = (ROOT / MAIN).read_text(encoding="utf-8")
        else:
            raise SystemExit("Source recruitment page content not found")

    main_html = strip_dashes(make_main(raw))
    if "FAQPage" not in main_html:
        raise SystemExit("Could not find full recruitment page content")

    (ROOT / MAIN).write_text(main_html, encoding="utf-8")
    print(f"Wrote {MAIN}")

    for alias in ALIASES:
        (ROOT / alias).write_text(make_alias(main_html, alias), encoding="utf-8")
        print(f"Wrote {alias}")

    mathieu_slug = "recrutement-exp-quebec-mathieu-michaud.html"
    catherine_slug = "recrutement-exp-quebec-catherine-aube.html"

    (ROOT / mathieu_slug).write_text(
        make_broker_page(
            main_html,
            first="Mathieu",
            last="Michaud",
            slug=mathieu_slug,
            email="mathieu@mcequipe.com",
            phone="(418) 655-8090",
            phone_href="4186558090",
            photo="images/mathieu.webp",
            role_fr="Courtier & recruteur eXp Québec",
        ),
        encoding="utf-8",
    )
    print(f"Wrote {mathieu_slug}")

    (ROOT / catherine_slug).write_text(
        make_broker_page(
            main_html,
            first="Catherine",
            last="Aubé",
            slug=catherine_slug,
            email="catherine@mcequipe.com",
            phone="(418) 952-0925",
            phone_href="4189520925",
            photo="images/catherine.webp",
            role_fr="Courtière & recruteure eXp Québec",
        ),
        encoding="utf-8",
    )
    print(f"Wrote {catherine_slug}")

    redirect = """<!DOCTYPE html>
<html lang="fr-CA">
<head>
    <meta charset="UTF-8">
    <title>Redirection…</title>
    <link rel="canonical" href="https://mcequipe.ca/devenir-courtier-exp-quebec.html">
    <meta http-equiv="refresh" content="0;url=devenir-courtier-exp-quebec.html">
    <script>location.replace('devenir-courtier-exp-quebec.html' + location.search + location.hash);</script>
</head>
<body>
    <p><a href="devenir-courtier-exp-quebec.html">Continuer vers Devenir courtier eXp Québec</a></p>
</body>
</html>
"""
    (ROOT / "rejoindre-exp.html").write_text(redirect, encoding="utf-8")
    print("Redirected rejoindre-exp.html -> main")

    print("\nUpdating site links...")
    update_site_links()

    print("\nPatching bio pages...")
    patch_bios()

    print("\nUpdating sitemap...")
    update_sitemap(
        [
            MAIN,
            *ALIASES,
            mathieu_slug,
            catherine_slug,
        ]
    )

    print("\nStripping em/en dashes site-wide...")
    strip_sitewide()

    print("\nDone.")


if __name__ == "__main__":
    main()
