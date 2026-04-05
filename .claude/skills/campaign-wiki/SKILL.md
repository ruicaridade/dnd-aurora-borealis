---
name: campaign-wiki
description: Manage a D&D campaign wiki in Obsidian — ingest session notes, update existing character/location/item/lore pages, and create new ones with proper cross-linking. Use this skill whenever the user mentions session notes, raw notes, adding campaign details, updating the wiki, creating character or location pages, or anything related to their D&D campaign vault. Also trigger when files appear in the _Raw Notes folder or the user pastes session content directly.
---

# Campaign Wiki Manager

You are managing an Obsidian vault for an ongoing D&D 5e campaign called **Aurora Borealis**. This vault is the canonical record of the campaign's lore, characters, locations, items, and session history. Your job is to keep it accurate, richly detailed, and well-linked.

## Setting — Exandria (Critical Role)

This campaign is set in **Exandria**, the world created by Matthew Mercer for **Critical Role**. Many locations, characters, items, and lore concepts originate from the published Critical Role material. The campaign adds a homebrew continent called **Akothis** and custom storylines built on top of the canonical setting.

### Cross-Referencing with Critical Role

Use the **Critical Role Fandom wiki API** to verify and enrich content:

```
https://criticalrole.fandom.com/api.php?action=parse&page=PAGE_NAME&prop=wikitext&format=json
```

**When to cross-reference:**
- When creating or updating pages for locations, characters, or items — check if they exist in CR canon
- When details seem incomplete — the CR wiki may have canonical geography, population, political structure, or history that enriches the page
- When placing locations geographically — verify which continent/region they belong to in canon
- When session notes introduce a name you don't recognise — it might be from published CR material

**How to handle canon vs. homebrew:**
- If a location/character/item exists in the CR wiki, use its canonical details as a foundation (geography, political structure, demographics, etc.) and layer the campaign's custom events on top
- If it doesn't exist in the CR wiki, it's homebrew — document it based purely on session notes and user input
- If the campaign contradicts CR canon (e.g., a city that's intact in CR but destroyed in the campaign), the campaign version takes precedence — but note the canonical baseline where useful for context

**Key canonical elements in this campaign:**
- **Exandria** — the world (continents: Tal'Dorei, Wildemount, Marquet, Issylra, Shattered Teeth + homebrew Akothis)
- **Wildemount** locations — Rexxentrum, Zadash, Nicodranas, Alfield, Palebank Village (Greying Wildlands)
- **The Calamity**, **Tiamat**, **Bahamut**, **Avernus** — canonical D&D/CR lore adapted for the campaign
- **Akothis** and its locations (Nanaze, Shalarag, Jinsan, Dumglod, Drar, etc.) — entirely homebrew

## Vault Structure

```
Aurora Borealis Campaign/
├── Aurora Borealis.md          # Campaign overview and navigation hub
├── Characters/
│   ├── Party/                  # Player characters
│   ├── NPCs/                   # Named non-player characters
│   └── Antagonists/            # Villains and enemies
├── Locations/
│   ├── Exandria/               # The world — hierarchical geographic structure
│   │   ├── Akothis/            # Homebrew continent (primary campaign setting)
│   │   ├── Wildemount/         # CR canon continent
│   │   └── Tal'Dorei/          # CR canon continent
│   ├── Planes/                 # Other planes of existence (Avernus, pocket dimensions)
│   └── Vehicles/               # Ships, vehicles (The Golden Minnow, Sand Witch)
├── Items/
│   ├── Vestiges of Divergence/  # Legendary living artifacts that grow with their wielders
│   ├── Artifacts/               # Unique powerful items (Chalice of Souls, Dragon Mask, etc.)
│   └── Wondrous Items/          # General magical items, weapons, rings, consumables
├── Lore/
│   ├── Gods & Deities/          # Bahamut, Tiamat, Pelor, Falazure, Raven Queen
│   ├── Fiends & Fey/            # Demon lords, archfey (Orcus, Titania)
│   ├── Factions/                # Organizations (Black Senate, Cobalt Soul)
│   ├── History/                 # Historical events and figures (The Calamity, Vespin Chloras)
│   ├── Cosmology/               # Planes, metaphysics (Mechanus, Vestiges of Divergence)
│   └── Creatures/               # Monster/creature types (Frostmourns)
├── Sessions/                   # Processed session logs (Session 01.md, etc.)
├── _Raw Notes/                 # Unprocessed session notes dropped here
├── Images/                     # Visual assets
└── scripts/                    # Utility scripts
```

Locations use a **hierarchical geographic structure**: World → Continent → City/Region → Sub-location. Cities that contain named sub-locations (e.g., Shalarag with its Citadel, Church, and Obsidian Prison) get their own subfolder. When any folder grows large enough that scrolling becomes tedious (~15-20 files), subdivide further.

## Core Workflow

Every interaction follows one of two paths. Choosing the right path is important — read the criteria carefully.

### Path A — Session Ingestion

**Only** use this path when one of these conditions is met:
- A file in `_Raw Notes/` has "session" in its filename (e.g., `session-55.md`, `Session Notes.md`)
- The user explicitly says they want to create a new session (e.g., "process these session notes", "here's what happened in our latest session", "add this as session 55")

If neither condition is met, use **Path B** instead. A message describing events or new information about the campaign is a direct update, not a session — even if it contains a lot of detail. Session logs are specifically for recording what happened during actual play sessions at the table.

1. **Read the raw notes.** Check `_Raw Notes/` for any files. If the user pasted notes directly, use those.
2. **Determine the session number.** Look at existing files in `Sessions/` and increment. If the filename or content says "session N", use that number.
3. **Review for clarity.** Read through the notes carefully. If anything is ambiguous, contradictory, or unclear — ask the user before proceeding. Don't guess at plot details. Examples of things to ask about:
   - A name that could refer to multiple characters
   - An event that contradicts established lore
   - Unclear cause-and-effect ("they fought and then the city fell" — who destroyed it?)
4. **Write the session log** to `Sessions/Session NN.md` using the session format (see Templates below).
5. **Update the wiki.** This is the most important step. Go through every entity mentioned in the session and:
   - **Existing pages**: Add new information to the relevant sections. New events go under the appropriate heading, new relationships get added to the Relationships section, status changes get reflected in Basic Information.
   - **New entities**: Create pages for any new named character, location, item, or lore concept (see "When to Create a Page" below).
6. **Update the hub.** If a new party member, key NPC, or antagonist appeared, update `Aurora Borealis.md` accordingly.
7. **Clean up.** If the notes came from `_Raw Notes/`, move or delete the raw file after processing.

### Path B — Direct Updates

This is the default path. If the user provides information about characters, locations, items, or events without explicitly requesting a session log, treat it as a direct wiki update. Do **not** create a session file.

Read the relevant existing pages first, make the changes, create new pages as needed, and ensure cross-links are consistent. Update the hub if significant new entities are introduced.

## When to Create a Page

Create a new wiki page when:
- A character **introduces themselves by name** — always
- A **location is visited or named** — always. Even if the party just passes through, if it has a name, it gets a page
- An **item of significance** is found, purchased, or referenced — magic items always; mundane items only if they're plot-relevant
- A **lore concept** is introduced that will be referenced again — factions, historical events, deities, prophecies
- Any entity is **referenced on two or more existing pages** — it deserves its own page

Do NOT create pages for:
- Unnamed guards, shopkeepers, or other background characters who don't interact meaningfully
- Generic locations ("a tavern", "the road") with no name
- Throwaway items with no narrative significance

When in doubt about borderline cases, ask the user.

## Cross-Linking Rules

This is critical for the wiki's usefulness.

- **No broken links. Ever.** Every `[[wiki link]]` must point to a page that exists. If you add a link, the target page must already exist or you must create it in the same update. Before finishing any update, verify that every link you wrote or modified has a corresponding file.
- **Every mention** of a character, location, item, or lore entry that has its own page must be wrapped in `[[wiki links]]`. No exceptions.
- On first mention in a section, use the full link: `[[Kallum]]`. Don't over-link — once per section is enough for the same entity.
- For display names that differ from filenames, use `[[Filename|Display Name]]`. Example: `[[Laudna Briarwood|Laudna]]`.
- **Avoid duplicate filenames** across folders. If two files share the same name, links become ambiguous. Merge duplicates or use distinct names.
- When creating or updating a page, scan for any names that match existing pages and link them.
- When creating a new page, also scan existing pages that mention this entity and add links there too. Use Grep to find references.

## Writing Style

- **Rich but factual.** Write like a campaign encyclopedia, not a novel. Capture details — physical descriptions, exact words spoken, emotional reactions, tactical decisions — but keep the prose clear and direct.
- **Preserve exact quotes.** If the session notes include memorable dialogue, keep it as a blockquote: `> "exact words here"`
- **Capture the small details.** A throwaway comment from an NPC about their past, a weird environmental detail in a dungeon, a seemingly insignificant item — these often become important later. When in doubt, include it.
- **Bold key terms** on first mention in a section for scanability.
- **Use `---` horizontal rules** to separate major sections.
- **Bullet points** for events and facts. Prose paragraphs for overviews and descriptions.

## Templates

### Session Log

```markdown
---
session: [number]
date: [real-world date, YYYY-MM-DD]
location: [primary location(s)]
---
# Session [number] - [Title]

- Event bullet points using [[wiki links]] for all named entities
- Each major beat gets its own bullet
- Sub-bullets for details within a beat
```

The title should be evocative — capture the session's tone or central event. Look at existing sessions for the style (e.g., "Session 54 - Sucking and Blowing").

### Character (NPC / Party / Antagonist)

```markdown
# [Character Name]

## Basic Information

| | |
|---|---|
| **Race** | [Race] |
| **Class** | [Class, if known] |
| **Title/Role** | [Title or role] |
| **Location** | [[Current location]] |
| **Status** | [Active / Deceased / Missing / etc.] |

---

## [Relevant narrative sections — History, Role in the Campaign, Background, etc.]

- Key facts as bullet points with [[wiki links]]

---

## Relationships

- **[[Character Name]]** — Description of the relationship.
```

Only include rows in Basic Information that are known. Don't add empty or "Unknown" rows. The narrative sections should be named based on what's actually relevant to the character — don't force a rigid structure. A shopkeeper might just have "Role in the Campaign", while a major NPC might have "History", "Powers", "The Betrayal", etc.

### Location

```markdown
# [Location Name]

[One-paragraph introduction placing this location geographically and narratively.]

---

## Overview

[Expanded description — geography, culture, political context, atmosphere.]

---

## Key Locations

### [Sub-location Name]
- Details about this place within the larger location

---

## Events

- Bullet points of things that happened here, with [[wiki links]]

---

## Connections

- Geographic and narrative connections to other [[locations]]

---

## Notable NPCs

- [[NPC Name]] — brief description of their connection to this place
```

Not every location needs all sections. A small tavern might just have an intro and Key Locations. A major city needs the full treatment.

### Item

```markdown
---
type: [Weapon / Armor / Wondrous Item / Vestige of Divergence / etc.]
rarity: [Common / Uncommon / Rare / Very Rare / Legendary / Artifact]
wielder: [Current wielder, if any]
status: [Dormant / Awakened / Exalted / Active / Lost / etc.]
---
# [Item Name]

[Brief description of the item's appearance and nature.]

## History

- How it was found/acquired, with [[wiki links]]

## Notable Uses

- Significant moments where the item was used in the campaign
```

### Lore Entry

```markdown
# [Concept Name]

[Introductory paragraph explaining what this is and why it matters.]

---

## [Relevant sections — these vary widely by topic]

- Historical events, theological concepts, faction details, etc.

---

## Legacy / Current Relevance

- How this lore connects to the present-day campaign
```

## Categorization

Place new files in the right folder:

- **Party members** → `Characters/Party/`
- **Friendly or neutral named NPCs** → `Characters/NPCs/`
- **Villains, corrupted characters, hostile named enemies** → `Characters/Antagonists/`
- **Named places** → `Locations/` using the geographic hierarchy:
  - Places on Akothis → `Locations/Exandria/Akothis/` (or a city subfolder if it's a sub-location)
  - Places on Wildemount → `Locations/Exandria/Wildemount/`
  - Places on Tal'Dorei → `Locations/Exandria/Tal'Dorei/`
  - Other planes, pocket dimensions → `Locations/Planes/`
  - Ships, vehicles → `Locations/Vehicles/`
  - **Cross-reference with the CR wiki** to determine the correct continent/region for canonical locations
- **Named items** → `Items/` using subcategories:
  - Vestiges of Divergence → `Items/Vestiges of Divergence/`
  - Unique powerful artifacts → `Items/Artifacts/`
  - All other magical items (weapons, rings, wondrous items, consumables) → `Items/Wondrous Items/`
- **Lore entries** → `Lore/` using subcategories:
  - Gods and deities (Bahamut, Tiamat, Pelor, etc.) → `Lore/Gods & Deities/`
  - Demon lords, archfey, powerful extraplanar beings → `Lore/Fiends & Fey/`
  - Organizations and factions → `Lore/Factions/`
  - Historical events and historical figures → `Lore/History/`
  - Planes, metaphysical concepts, broad magical systems → `Lore/Cosmology/`
  - Monster and creature types → `Lore/Creatures/`

If context makes it unclear whether someone is an NPC or Antagonist, default to NPC and note their ambiguity — the user can reclassify later.

## Handling Contradictions

The campaign has been running for years. If new session notes contradict something on an existing page:

1. Don't silently overwrite. Flag it to the user: "The existing page for X says Y, but the session notes say Z. Which is correct?"
2. If the contradiction is clearly a retcon by the DM, update the page and note it was revised.
3. If it's ambiguous, ask.

## After Every Update

Before finishing, do a quick sanity check:

- Did every named entity get linked?
- Did any new entity deserve its own page?
- Are the Relationships sections on affected pages up to date?
- Does `content/index.md` need updating (new party members, key NPCs, antagonists)?
- Is the information you added consistent with what's already in the vault?

## Committing and Pushing

After completing any wiki update, **always commit and push the changes** so the published website stays in sync. The vault content lives in a separate git repository (the `content/` submodule), so you need to commit inside `content/` and then update the parent repo.

1. **Commit inside `content/`:**
   ```bash
   cd content && git add -A && git commit -m "<descriptive message>" && git push && cd ..
   ```
2. **Update the submodule reference in the parent repo:**
   ```bash
   git add content && git commit -m "Update content submodule" && git push
   ```

This ensures both the vault repo and the Quartz site repo stay up to date, and the GitHub Pages deployment triggers automatically.
