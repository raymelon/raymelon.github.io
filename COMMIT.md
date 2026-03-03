perf: Convert portfolio images to WebP and optimize ticker loading

Summary
- Convert 92 portfolio images from PNG/JPG to WebP (86.6% size reduction)
- Update all JSON references to use .webp extensions
- Change hero ticker from loading="eager" to loading="lazy"
- Fix ASCII canvas race condition and cache hit issues
- Add IntersectionObserver-based rendering with {once: true} guards

Problem: Portfolio images were 32MB of PNG/JPG causing slow mobile loading (11Mbps 4G struggling); hero ticker blocked critical content with eager loading; ASCII canvas occasionally failed to render due to race conditions with lazy-loaded source images

Solution: Batch convert all images to WebP for 86% size reduction, defer non-critical ticker loading with lazy attribute, implement robust image loading pattern with IntersectionObserver and single-fire guards for ASCII renderers

Details (Detailed Breakdown)

Big Picture Solution:

This enables mobile users on slow connections to load the portfolio efficiently. The 32MB of portfolio assets shrinks to 4MB - the difference between a site that loads in seconds versus one that times out on 4G. The approach prioritizes immediate performance gains over architectural purity - we batch-converted existing PNG/JPG files rather than migrating to src/assets/ and using Astro Image component. Trade-off accepted: keeping files in public/ means no build-time optimization, but it avoids breaking the dynamic asset resolution system used by deck/brief pages. This fits the broader goal of making the portfolio fast on mobile without major refactoring.

Key Context & Pivotal Moments:

Initially the hero ticker was failing to load on 11Mbps mobile data because all 15+ images loaded eagerly with `loading="eager"`, competing for bandwidth with critical content. This completely blocked the ticker from appearing on slow connections.

Mid-session pivot: Realized the real issue wasn't just eager loading - it was that portfolio images were massive PNG files (1.3MB each). Changing to lazy loading alone wouldn't solve the bandwidth problem. The "aha" moment was understanding that WebP conversion would deliver 80%+ size reduction immediately.

Critical realization: The original ASCII canvas occasionally failed to render because of a race condition between `img.onload` assignment and `img.complete` check. When images were cached, `complete` was true but `onload` wouldn't fire. Without the single-trigger guard pattern using `{once: true}`, the canvas would stay blank on repeat visits.

Another critical pivot: Initially tried using Astro's `<Image />` component with lazy loading, but this broke ASCII rendering entirely because `loading="lazy"` + `display: none` meant images never loaded. The fix was keeping eager loading for ASCII source images but using IntersectionObserver to defer the actual render until the section was visible.

The user's pain (slow mobile loading, broken ticker, missing ASCII art) drove these pragmatic solutions over more "proper" but complex approaches.

Specific Changes and Rationale:

1. **Converted 92 portfolio images to WebP**:
   - How: Created scripts/convert-to-webp.mjs using sharp library to batch convert all PNG/JPG in public/assets/portfolio/
   - Why: WebP delivers 80-90% size reduction vs PNG while maintaining quality. A 1.3MB PNG becomes ~150KB WebP.
   - Details: Quality set to 80 for optimal balance. 32.45MB original → 4.34MB WebP (86.6% reduction). Generated WebP files alongside originals.

2. **Updated portfolio-slides.json (src/data/ and ../dump/)**:
   - How: Replaced all .png/.jpg/.jpeg extensions with .webp in both JSON files
   - Why: These JSON files define the slide data used by deck and brief pages. Without updating extensions, pages would 404 on image requests.
   - Details: 112 lines changed in each file. All asset references now point to WebP versions.

3. **Updated ImageTicker.astro**:
   - How: Changed video thumbnail mappings from .png to .webp; changed render functions to use `loading="lazy"` instead of `loading="eager"`
   - Why: Ticker is below the fold on mobile - no need to load eagerly and compete with critical content. Lazy loading defers until ticker is visible.
   - Details: 2 video thumbnails updated, 2 render functions changed (single images + collage images). Ticker now loads progressively.

4. **Updated index.astro ImageTicker references**:
   - How: Changed all src attributes in the ImageTicker images array from .png/.jpg to .webp
   - Why: The homepage ticker passes image filenames to ImageTicker component. These needed to match the new WebP files.
   - Details: ~20 image references updated including collage images arrays.

5. **Fixed ASCII renderer race conditions**:
   - How: Replaced simple `img.onload = render` pattern with `triggerRender()` function that checks `img.complete && img.naturalWidth > 0` first, then uses `img.addEventListener("load", render, {once: true})` as fallback
   - Why: Cached images have `complete=true` but `onload` won't fire. The old pattern would miss rendering on repeat visits. `{once: true}` prevents double-firing.
   - Details: Applied to 5 ASCII renderers (hero, about, ship, testimonials, portfolio cards).

6. **Added IntersectionObserver for ASCII rendering**:
   - How: Implemented observer with 200px rootMargin watching canvas elements; triggers render only when section is about to enter viewport
   - Why: Allows keeping `loading="eager"` on source images (so they actually load despite `display:none`) while deferring the expensive ASCII render until needed
   - Details: Observer unobserve()s after first trigger to prevent re-renders. Falls back to immediate render if already visible.

Testing Notes (Partially Executed):

- Build passes: npm run build succeeds with all 69 pages
- WebP files generated: 92 images converted successfully
- Lazy loading verified: loading="lazy" appears in generated JS
- ASCII eager loading maintained: hero/intro/ship images still use eager for source images
- Mobile testing: Need to verify on 11Mbps 4G connection
- Ticker loading: Need to confirm progressive loading on slow connections

Future Plans:

- Add skeleton/placeholder states for ticker while images load
- Consider srcset for responsive image sizes on mobile vs desktop
- Monitor real-world LCP scores post-deployment
- Evaluate if further optimization needed for 4G users

Breaking Changes:

None for modern browsers. WebP has 96.5% browser support. IE11 and very old Safari versions will not display images, but these represent <4% of traffic and are not the target audience.

Migration Note: Original PNG/JPG files preserved in public/assets/portfolio/ alongside WebP versions. If rollback needed, simply revert JSON references.
