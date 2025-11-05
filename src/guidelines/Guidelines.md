**
# General Guidelines

* Mobile-first kawaii UI — soft shapes, pastel colors, and smooth shadows.
* Always center content around the main character (the pet). Vertical axis alignment is crucial.
* Use Auto Layout instead of absolute positioning whenever possible.
* Keep layouts clean and light — the character should always remain the visual focus.
* Base spacing unit: 8px.
* Rounded corners: 16–24px.
* Shadows: soft blur (16–24px), opacity around 15%.
* No harsh black lines — use slightly tinted grays or white outlines instead.

--------------

# Design System Guidelines

## Colors
* **Primary background:** pastel gradient (soft peach → beige → pink).
* **Accent colors:**  
  * Pink: `#FFB6C1`  
  * Blue: `#A6E3E9`  
  * Lilac: `#BDB2FF`  
  * Yellow: `#FFF2B2`  
* **Text:** warm gray `#3A3A3A`.
* **Currency / coins:** gold `#FAD77B`.
* Colors should always look soft and friendly — never oversaturated.

--------------

# Typography
* Font: **Poppins** or **Nunito Rounded**.
* Font sizes:  
  * Headings — 18–20px, semi-bold.  
  * Body text — 14px.  
  * Captions — 12px.
* Text color: neutral dark gray (#3A3A3A). Backgrounds: light and clean.
* No uppercase text — only sentence case for friendly readability.

--------------

# Components

## Buttons
* Corner radius: fully rounded (pill-shaped / rounded-full).
* Height: 52px (large buttons), 44px (small buttons).
* Padding: 24px horizontal (px-6).
* Color palette:
  * **Shop:** blue `#A6E3E9`
  * **Friends:** pink `#F9B4C9`
  * **Messages:** lilac `#C9B6FF`
* Text: white, bold, centered.
* Icon size: 20×20px, white line art.
* Hover or active state: slightly brighter with an inner glow or soft shadow.

## Status Icons (Hunger, Fun, Energy)
* Size: 40×40px.
* Transparent background.
* White outline, soft drop shadow (3–5px, `#00000015`).
* Minimal details, rounded forms.
* Color coding:
  * Hunger — peach pink.
  * Fun — lilac-blue.
  * Energy — soft yellow.
* Labels and numbers appear below (font 12px).

## Progress Indicators
* Rounded corners (radius 12px).
* Background — light pastel.
* Fill — soft gradient in accent color.
* Example gradient: `#FFD6E8 → #F9A8D4`.
* Smooth animation when values change.

## Speech Bubble (Pop-up above character)
* Shape: oval “thought bubble” without sharp pointer.
* Background: white (90% opacity), soft shadow.
* Text centered inside.
* Close button: small, circular, light gray background.
* Add small emoji (heart or sparkle) for emotion.

--------------

# Character Screen (Home)
* Character always centered vertically.
* Top section — progress and coins.
* Middle section — character + speech bubble.
* Bottom — Hunger, Fun, Energy icons, then navigation buttons.
* Background wallpapers may change but must always keep neutral space around the character.

## Character Interactivity
* **The character is fully interactive** — users can tap/click on Papi.
* On tap:
  * Bounce animation (scale and wiggle, 600ms duration).
  * Random emoji particles fly up from tap position.
  * Different emojis based on character's emotional state.
* Hover effect: slight scale increase (1.05x) on desktop.
* Tap effect: slight scale decrease (0.95x) for tactile feedback.
* **No reaction when sleeping** — taps are ignored if character is in "sleepy" state.
* Use `cursor: pointer` to indicate interactivity.

--------------

# Bottom Navigation Bar
* Minimum 3 buttons, maximum 4.
* Each button: rounded rectangle with icon + text.
* Active state: stronger shadow and subtle glow.
* Equal spacing between buttons (use Auto Layout).

--------------

# Style and Mood
* Emotional tone: cozy, cute, and caring.
* Avoid black, harsh shadows, or sharp edges.
* Use micro animations (e.g., small bounce on tap).
* Every element should feel “alive” and welcoming.

--------------

# Icon System (App-Wide)

These icons are **used throughout the app**, not in the shop.  
They must stay visually consistent and simple since they are displayed small on-screen.

## General Rules
* Size: **32×32 px** maximum.
* Transparent background.
* **White outline** (2px stroke) with a **small soft shadow**.
* Minimal elements — focus on clear recognizable shapes.
* No text inside icons.
* Slight inner gradient allowed, but keep it subtle.
* Rounded corners, no sharp edges.

## Icons List

1. **Home Icon** — simple kawaii-style house with a small heart above the roof.  
2. **Hunger Icon (Food)** — minimalist bowl or bone with small sparkle detail.  
3. **Fun Icon (Toys)** — cute ball or rattle with a rounded shape.  
4. **Wave Icon** — waving hand, soft rounded palm outline.  
5. **Party Hat Icon** — small festive hat with star or confetti detail on top.  
6. **Energy Icon** — stylized lightning bolt or banana with soft rounded edges.

Each icon should look consistent in line thickness, glow, and minimal color accent — for example, a white outline with a soft pastel drop shadow (pink, yellow, or blue depending on category).

--------------

# Kawaii Personality Notes
* Everything should look kind, cute, and emotionally warm.
* The UI must feel like it’s “smiling” — playful but calm.
* No harsh contrast — prefer smooth transitions and rounded balance.
* Prioritize harmony between character, colors, and interface.

**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
