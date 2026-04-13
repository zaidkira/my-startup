# Design System Specification: Editorial Vitality

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **The Empathetic Editorial**. 

In the healthcare space, digital interfaces often feel cold, clinical, and overly transactional. This system breaks that mold by treating patient data and health metrics with the elegance of a high-end wellness journal. We move beyond the "app-in-a-box" aesthetic by utilizing intentional asymmetry, expansive whitespace, and sophisticated tonal layering. 

By prioritizing a "soft-touch" interface, we replace rigid structural lines with fluid transitions. This creates an environment of calm and trust, ensuring the user feels cared for rather than managed.

---

## 2. Color & Surface Philosophy
The palette is rooted in medical precision but executed with a "Living Interface" approach. 

### The Palette
- **Primary (Medical Blue):** Use `primary` (#0058c3) for high-level brand moments and `primary_container` (#0070f3) for interactive vibrancy.
- **Secondary (Energy Green):** `secondary` (#006c49) signals vitality and success.
- **Tertiary (Sleep Indigo):** `tertiary` (#4c42e2) provides a calming, deep-focus tone for rest and recovery metrics.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Traditional borders create visual noise and "trap" the eye. Instead:
- Define boundaries through background shifts (e.g., a `surface_container_low` section sitting on a `surface` background).
- Use the **Signature Texture**: Apply a subtle linear gradient from `primary` to `primary_container` (at a 15-degree angle) for hero elements to provide a "soul" that flat hex codes lack.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, semi-translucent sheets. 
- **Base Layer:** `surface` (#faf9ff).
- **Secondary Content:** `surface_container_low` (#f2f3fe).
- **Interactive Elevated Elements:** `surface_container_lowest` (#ffffff).
- **The Glass Rule:** For floating modals or navigation bars, use `surface` with 80% opacity and a `backdrop-blur` of 20px to create a frosted-glass effect that integrates the content with the background.

---

## 3. Typography: The Authoritative Voice
We use **Inter** as our typographic backbone, prioritizing legibility and a modern, neutral tone that adapts perfectly to both Latin and Arabic scripts.

- **Display (Large/Med):** `display-lg` (3.5rem). Used for hero metrics (e.g., daily step counts or heart rate). These should be kerned slightly tighter (-0.02em) to feel like a premium editorial.
- **Headline (Sm/Med):** `headline-md` (1.75rem). The primary entry point for section content. In RTL (Arabic) layouts, ensure the line height is increased by 10% to accommodate the script's ascending/descending characteristics.
- **Title (Sm/Med/Lg):** `title-lg` (1.375rem). Reserved for card titles and critical labels.
- **Body & Labels:** `body-md` (0.875rem) for all functional reading. 

**Typographic Intent:** Use high contrast in scale. Pair a `display-lg` metric with a `label-md` unit (e.g., "72 **BPM**") to create a clear visual anchor.

---

## 4. Elevation, Depth & Ghosting
We move away from the "shadow-heavy" look of 2010-era design.

- **The Layering Principle:** Achieve depth by stacking tokens. A `surface_container_lowest` card placed on a `surface_container_low` background provides sufficient contrast for the eye without needing a shadow.
- **Ambient Shadows:** When an element must float (like a FAB or floating header), use a multi-layered shadow: `box-shadow: 0 10px 30px rgba(24, 27, 35, 0.04), 0 4px 8px rgba(0, 88, 195, 0.06)`. This mimics natural light reflecting the primary brand color.
- **The "Ghost Border":** If a container requires a perimeter for accessibility, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Signature Components

### Buttons & Toggles
- **Primary Action:** Large rounded corners (`xl`: 1.5rem). Use the `primary` fill. For a premium touch, add a subtle inner glow (top-down white inner shadow at 10% opacity).
- **Toggles:** The track should use `surface_container_highest`. The "thumb" should be white (`surface_container_lowest`). When active, the track transitions to `secondary` (Energy Green).

### Cards & Lists
- **The Borderless Card:** Cards must never have a border. Use `md` (0.75rem / 12px) corner radius. Use `surface_container_low` as the card base.
- **Spacing over Dividers:** Forbid the use of line dividers in lists. Use `spacing.4` (1.4rem) or `spacing.6` (2rem) of vertical whitespace to separate list items. 
- **RTL Mirroring:** All components must be built with logical properties (e.g., `padding-inline-start` instead of `padding-left`) to ensure a seamless "Your Health First" experience in Arabic.

### Health Charts (Bespoke Component)
- Use `tertiary_container` for night-mode data visualization.
- Use a "Soft Path" approach: Data lines should be rounded (stroke-linejoin: round) to avoid sharp, aggressive angles in a healthcare context.

---

## 6. Do’s and Don’ts

### Do
- **Do** use intentional asymmetry. A large headline on the left (or right for RTL) balanced by a smaller metric on the opposite side creates an editorial rhythm.
- **Do** respect the whitespace. If a screen feels "full," increase the `surface` padding to `spacing.8` (2.75rem).
- **Do** ensure all interactive elements have a minimum tap target of 48px.

### Don’t
- **Don't** use pure black (#000000) for text. Use `on_surface` (#181b23) to maintain a soft, premium feel.
- **Don't** use standard "Drop Shadows" from a UI kit. They look cheap and break the "frosted glass" metaphor.
- **Don't** use high-contrast borders. The "No-Line" rule is absolute to maintain the editorial flow.