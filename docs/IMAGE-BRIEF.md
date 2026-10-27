# Image brief — 20 content images

Every image currently on the site is an SVG placeholder. This brief replaces all 20 with
photographic WebP files, one per slot, using the existing filenames so the templates only need
their extension changed.

> **Status (27 Oct 2026): all 20 slots are complete.** Each image was generated in the owner's
> ChatGPT session, downloaded at 1536×1024, cropped and converted by `tools/import-images.mjs`,
> then wired into `src/config.mjs` and `src/data/services.mjs`. The SVG placeholders have been
> deleted. Keep this brief as the spec for replacements or new slots.

## House style (applies to every prompt)

Append to each prompt:

> Photorealistic editorial interior photograph, 24–35mm lens at eye level, natural daylight,
> true-to-life materials, clean but lived-in, no visible branding or logos, no text or lettering,
> no people's faces. Brisbane, Queensland.

Rules:

- **No faces and no readable text.** Faces date badly and AI hands/faces are the fastest way to
  look fake; lettering is always garbled.
- **No finished-project claims.** These are illustrative renders. The visible caption on each
  page stays; the metadata records that they are AI-assisted (see `tools/import-images.mjs`).
- **Consistent palette:** warm grey and off-white tiles, brushed nickel or matte black tapware,
  oak or white cabinetry, green outside the window. This is what makes 20 separate generations
  look like one portfolio.

## Output specifications

| Property | Value |
| --- | --- |
| Format | WebP, quality 78, effort 5 |
| Hero | 1600 × 900 |
| All other slots | 1200 × 900 |
| Max weight | 200 KB per file (the import script fails the build above that) |
| Metadata | IPTC/XMP: description, creator, copyright, `DigitalSourceType = trainedAlgorithmicMedia` |

Generation at 1024 × 1024 or 1536 × 1024 is fine — the import script crops to the target ratio
with a centre-attention crop.

---

## 1. `hero-bathroom.webp` — 1600 × 900

Used: homepage hero, plus hero bands on service and location pages.

**Prompt**

> Newly renovated contemporary Brisbane bathroom. Large-format warm-grey porcelain tiles floor to
> ceiling, frameless walk-in shower with brushed nickel fittings, floating oak vanity with a stone
> top and undermount basin, round backlit mirror, one frosted window with soft morning light and a
> hint of subtropical green. Wide establishing view from the doorway.

**Alt:** `Contemporary Brisbane bathroom renovation with large-format tiling, walk-in shower and timber vanity`

---

## 2. `full-bathroom.webp` — 1200 × 900

Used: 15 placements across 12 pages, including the homepage feature and every location page.

**Prompt**

> Completed family bathroom in a Queensland home. Freestanding bath beneath a high window, large-
> format matte tiles in warm grey, walk-in shower with a matte black frame and niche shelf, wall-
> hung oak vanity, soft daylight, uncluttered styling with a rolled towel and a single plant.

**Alt:** `Full bathroom renovation with walk-in shower, freestanding bath and large-format tiles`

---

## 3. `apartment.webp` — 1200 × 900

**Prompt**

> Compact apartment bathroom in inner Brisbane. Space-saving wall-hung vanity, mirrored shaving
> cabinet, frameless shower screen, light grey rectified tiles, warm LED strip under the vanity,
> city apartment proportions, everything neat and precisely aligned.

**Alt:** `Apartment bathroom with space-saving wall-hung vanity and frameless shower`

---

## 4. `waterproofing.webp` — 1200 × 900

**Prompt**

> Construction photograph of bathroom waterproofing in progress. Fresh blue-grey membrane rolled
> onto the floor and up the wall junctions, roller texture and trowel marks visible, masking tape
> lines at the shower edges, a roller and bucket on a drop sheet, work light raking across the
> surface, three-quarter close view.

**Alt:** `Waterproofing membrane applied to a bathroom floor and wall junction`

---

## 5. `ensuite.webp` — 1200 × 900

**Prompt**

> Ensuite renovation with a double basin vanity in stone, two backlit round mirrors, large walk-in
> shower with a tiled niche, deep green-grey finger tiles on the shower wall, warm ambient lighting,
> generous but compact layout.

**Alt:** `Ensuite renovation with double basin vanity, large mirror and walk-in shower`

---

## 6. `queenslander.webp` — 1200 × 900

**Prompt**

> Bathroom inside a restored Queenslander. VJ panelling feature wall painted soft white, timber-look
> floor tiles, clawfoot bath, high-set sash window with a garden view, period architraves and a
> simple pendant, afternoon light.

**Alt:** `Queenslander bathroom renovation with VJ panelling and clawfoot bath`

---

## 7. `small-bathroom.webp` — 1200 × 900

**Prompt**

> Small bathroom renovation, roughly 2.4 × 1.8 metres. Compact wall-hung vanity, corner shower with
> a frameless screen, large-format light tiles to the ceiling, a mirror positioned to bounce light,
> recessed niche storage, every surface deliberate and uncluttered.

**Alt:** `Compact bathroom with wall-hung vanity, walk-in shower and light tiles`

---

## 8. `laundry.webp` — 1200 × 900

**Prompt**

> Laundry renovation with built-in cabinetry, stone bench, undermount sink, subway tile splashback,
> front-loading washer and dryer stacked in joinery, hanging rail with folded linen, warm task
> lighting, tidy and styled.

**Alt:** `Laundry renovation with built-in cabinetry, stone bench and subway tiles`

---

## 9. `tiling.webp` — 1200 × 900

**Prompt**

> Close view of a tiler's work in progress. Large-format porcelain tiles being set on a bathroom
> wall with levelling clips and spacers, notched adhesive ridges, a trowel at the edge of frame,
> shallow depth of field, natural side light, dust in the air.

**Alt:** `Tiler setting out large-format bathroom tiles with levelling clips`

---

## 10. `about-team.webp` — 1200 × 900

**Prompt**

> Documentary photograph of a small renovation crew on a Brisbane bathroom site, seen from behind and
> slightly above at a distance, reviewing plans spread on a trestle table, dust sheets, tool bags and
> a level nearby, morning light through a bare window. Faces not visible.

**Alt:** `Renovation team reviewing plans on a Brisbane bathroom site`

---

## 11. `kitchen.webp` — 1200 × 900

**Prompt**

> Kitchen renovation in a Queensland home adjacent to a bathroom project. Shaker-profile cabinetry in
> soft white, stone island bench, tiled splashback, two pendant lights, warm daylight, styled but
> lived-in with a bowl of fruit and a chopping board.

**Alt:** `Modern kitchen with island bench, stone benchtop and tiled splashback`

---

## 12. `process.webp` — 1200 × 900

**Prompt**

> Bathroom stripped back to studs and slab. Sheeted walls, new plumbing rough-in visible, dust
> extraction hose, materials stacked neatly, site protected with drop sheets, work light on a stand,
> wide angle showing the room's bones.

**Alt:** `Bathroom stripped to studs during renovation, with new plumbing rough-in`

---

## 13. `accessible.webp` — 1200 × 900

**Prompt**

> Accessible bathroom renovation. Level-entry roll-in shower with a linear drain, brushed stainless
> grab rail, wall-hung vanity with knee clearance, slip-resistant floor tiles, wide door opening,
> bright even lighting, calm neutral palette.

**Alt:** `Accessible bathroom with level-entry shower and grab rail`

---

## 14. `commercial.webp` — 1200 × 900

**Prompt**

> Commercial bathroom refurbishment in a Brisbane office building. Cubicles with privacy panels,
> trough-style solid surface basin, sensor taps, durable grey tiles, ceiling downlights, clean
> minimal specifier aesthetic, no people.

**Alt:** `Commercial bathroom refurbishment with cubicles and solid surface basins`

---

## 15. `gallery-1.webp` — 1200 × 900

**Prompt**

> Bathroom with a freestanding stone bath set against a full-height picture window onto a subtropical
> garden, travertine-look tiles, a low stool and a single fern, late afternoon light.

**Alt:** `Freestanding bath beside a garden window in a renovated bathroom`

---

## 16. `gallery-2.webp` — 1200 × 900

**Prompt**

> Ensuite with a double shower, twin rain heads, a long niche shelf, charcoal tiles and warm accent
> lighting under the bench, dark and moody but clean.

**Alt:** `Double shower with twin rain heads and niche shelf in a dark-tiled ensuite`

---

## 17. `gallery-3.webp` — 1200 × 900

**Prompt**

> Family bathroom with a bath-and-shower combination, neutral palette with a soft grey tile and a
> timber vanity, a step stool and folded towels, friendly and practical.

**Alt:** `Family bathroom with bath and shower combination and timber vanity`

---

## 18. `gallery-4.webp` — 1200 × 900

**Prompt**

> Powder room with a floating stone basin, round mirror, textured finger tiles, brass tapware and
> moody directional lighting, small space treated like a jewel box.

**Alt:** `Powder room with floating stone basin and brass tapware`

---

## 19. `gallery-5.webp` — 1200 × 900

**Prompt**

> Laundry with a butler's sink, herringbone splashback, brass hanging rail with linen, stone bench
> and open shelving, soft daylight from a side window.

**Alt:** `Laundry with butler's sink and herringbone tile splashback`

---

## 20. `gallery-6.webp` — 1200 × 900

**Prompt**

> Heritage Queenslander bathroom with a clawfoot bath, white subway tiles, black tapware, timber
> floor and a garden view through a sash window, soft green light.

**Alt:** `Heritage bathroom with clawfoot bath, subway tiles and black tapware`

---

## Workflow

1. Generate at 1024 px or larger; download the full-size file (not the thumbnail).
2. Save into `incoming/` using the slot name, e.g. `incoming/hero-bathroom.png`.
3. `npm install` once, then `npm run images:import` — it crops, converts to WebP, writes metadata and reports weight.
4. `npm run images:list` to see which slots are done, then `npm run build && npm run check`.
5. Swap the `.svg` references for `.webp` in `src/` once a slot exists (the build fails if a page points at a missing file, so the two steps stay in sync).
