feat: Introduce pseudokid-dot-dev Astro portfolio

Summary
- Add new Astro portfolio site at pseudokid-dot-dev/
- Built from portfolio items initially dumped from Next.js site
- Framed as solo agency / dev freelance focused on product building
- Evolved with magazine (zine)-like design language
- Designed with Google Stitch (Gemini Flash 3 and Nano Banana model)
- Built with OpenCode (Kimi K2.5, MiniMax M2.5, Claude 4.6 Sonnet, Claude 4.6 Opus, Claude 4.5 Haiku, GPT 5.2 low, GPT 5.3 Codex)
- Design required multiple iterations between Stitch and OpenCode
- AI models struggled implementing intricate designs pixel by pixel
- Responsiveness is a challenge for an intricately layouted portfolio
- AI models used with guidance of Google Stitch, Gemini Flash, and Nano Banana
- Original dump/slide deck created in a week as portfolio export
- Intent was to feed dump to Kimi Slides to send slide deck to prospect
- Realized how organized the resulting slide deck was - sparked inspiration
- Goal: showcase and embody years of work through the years
- Includes homepage, brief pages, deck pages, 404, contact modal
- Integrates Vercel Speed Insights, Vercel Analytics, Mixpanel

Details (Detailed Breakdown)

Big Picture:
The portfolio started as a dump of items from the existing Next.js site. Rather than continuing to evolve the Next.js portfolio, the decision was made to build a fresh Astro-based portfolio with a different framing: solo agency / dev freelance focused on product building. This represents a clean break and new direction for the portfolio presence.

Key Context & Pivotal Moments:
- Design required multiple iterations between Google Stitch and OpenCode
- AI models had difficulty implementing intricate designs pixel by pixel
- Responsiveness is a challenge for an intricately layouted portfolio like this
- AI models used with guidance of Google Stitch, Gemini Flash, and Nano Banana
- The dump/slide deck basis was created in a week - portfolio export alone was intricate
- Never forget the role of Kimi Slides result which sparked the inspiration
- Original intent: feed dump to Kimi Slides to send slide deck to prospect
- Realized how organized the resulting slide deck was
- Decision: build full portfolio to showcase years of work
- Goal: embody work through the years

Specific Changes and Rationale:

1. **Added pseudokid-dot-dev/ directory**:
   - Complete Astro project with layouts, pages, components
   - Homepage, brief/[slug], deck/[group], 404 pages
   - Contact modal on all pages

2. **Added MANIFESTO.md**:
   - Origin story of how the portfolio came to be
   - Design philosophy and stack details

3. **Added AGENTS.md**:
   - Development guidelines for the Astro project

Testing Notes (Not Executed):
- Build needs verification: npm run build
- Needs deployment to Vercel
- All pages need testing post-deploy
- LCP optimization needed (4.2s on homepage)

Future Plans:
- Image optimization for LCP improvement (2.9MB hero image)
- Fix Mixpanel CDN loading (use script-tag approach instead of npm)
- Speed Insights / Analytics working but blocked by ad blockers

Breaking Changes:
None - new project addition.
