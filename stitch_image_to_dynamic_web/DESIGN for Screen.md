---
name: CreatorNE
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#4a4455'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#7b7487'
  outline-variant: '#ccc3d8'
  surface-tint: '#732ee4'
  primary: '#630ed4'
  on-primary: '#ffffff'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#d2bbff'
  secondary: '#4b41e1'
  on-secondary: '#ffffff'
  secondary-container: '#645efb'
  on-secondary-container: '#fffbff'
  tertiary: '#9b005c'
  on-tertiary: '#ffffff'
  tertiary-container: '#bf2076'
  on-tertiary-container: '#ffdde7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cd'
  on-tertiary-fixed: '#3e0022'
  on-tertiary-fixed-variant: '#8c0053'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system for this platform is built on the pillars of **Modernity, Vibrancy, and Professionalism**. It serves as a high-energy conduit between professional brands and creative individuals. The visual language is defined by a "Digital Premium" aesthetic—combining the clean structure of modern SaaS with the expressive energy of the creator economy.

The UI should evoke a sense of boundless opportunity and structured growth. We achieve this through a mix of **Minimalism** (to keep the focus on creator content) and **Glassmorphism** (to add depth and a high-tech feel to the networking aspect). The interface prioritizes clarity and "breathing room," ensuring that even data-dense brand dashboards feel approachable and inspiring.

## Colors
The palette is anchored by a high-vibrancy **Vibrant Purple** (Primary) and a stable **Deep Blue** (Secondary). 

- **Primary (#7C3AED):** Used for main action triggers, progress indicators, and active states. It represents creativity and the "Creator" half of the platform.
- **Secondary (#4F46E5):** Used for navigation elements, brand-side utility, and professional context. It represents the "Connect" and business stability.
- **Tertiary/Accent (#EC4899):** A punchy pink used sparingly for highlights, new feature badges, or "Growth" metrics.
- **Neutrals:** A spectrum of soft, cool grays (Slate/Gray) are used for typography and borders to keep the UI light and airy. 
- **Gradients:** Primary actions should utilize a linear gradient from Primary to Secondary (135deg) to signify the bridge between creators and brands.

## Typography
This design system utilizes **Inter** exclusively to ensure maximum legibility and a systematic, clean appearance. 

- **Headlines:** Use tighter letter-spacing and bold weights to create a strong visual anchor.
- **Body:** Standard weights with generous line-heights are essential to maintain the "Modern" feel and ensure readability across long creator bios or brand briefs.
- **Labels:** Use semibold weights and slight tracking (letter-spacing) for small metadata and button text to differentiate them from body copy.

## Layout & Spacing
The layout follows a **Fluid Grid** philosophy within a maximum container width of 1280px. 

- **The 8px Rule:** All spacing between elements must be a multiple of 8px. 
- **Canvas:** Use 16px margins on mobile and 24px-40px on desktop to maintain a feeling of openness.
- **Grid:** A 12-column system is used for desktop. For the Creator Feed, a "Masonry" or "Variable Card" layout is preferred over rigid rows to reflect the creative nature of the content.
- **Vertical Rhythm:** Large sections should be separated by `xl` (64px) spacing to allow the brand's vibrant colors to breathe without overwhelming the user.

## Elevation & Depth
Depth is communicated through **Ambient Shadows** and **Tonal Layers** rather than heavy borders.

- **Level 0 (Background):** #F9FAFB. The base canvas.
- **Level 1 (Cards):** White (#FFFFFF) with a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.05)).
- **Level 2 (Hover/Active):** Slightly more pronounced shadow (0px 10px 30px rgba(124, 58, 237, 0.1)) to provide tactile feedback.
- **Overlays:** Use a 20px backdrop blur (Glassmorphism) with a 70% white tint for modals and navigation bars to maintain context of the content behind them.

## Shapes
The shape language is friendly and approachable, defined by **Large Border Radii**.

- **Cards:** Use a minimum of 16px radius. For large featured content, this can scale up to 24px.
- **Interactive Elements:** Buttons and Input fields use a 12px radius, providing a distinct "squircle" look that feels more modern than standard 4px corners.
- **Chips/Avatars:** These should remain fully rounded (pill-shaped or circular) to contrast against the structured cards.

## Components
- **Buttons:**
    - *Primary:* Linear gradient (#7C3AED to #4F46E5) with white text. High-drop shadow on hover.
    - *Secondary:* White background with a 1px soft gray border or Primary-colored text.
- **Cards:** The primary container for the UI. Cards must have a 16px padding minimum, 16px border radius, and the standard Level 1 shadow.
- **Input Fields:** Soft gray background (#F3F4F6) with no border in resting state. On focus, transition to a white background with a 2px Primary border.
- **Chips:** Small, pill-shaped tags used for "Niches" (e.g., Tech, Lifestyle). Use a low-opacity version of the Primary color (e.g., Primary at 10% opacity) with Primary colored text.
- **Creator Profiles:** Circular avatars with a 3px gradient border to signify "Active" or "Premium" status.
- **Progress Bars:** Use the Secondary-to-Primary gradient for the fill to visualize "Growth" metrics.