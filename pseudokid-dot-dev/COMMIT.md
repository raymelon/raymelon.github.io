feat: Optimize ASCII renderer images with Astro assets and IntersectionObserver

Summary

- Migrate LCP-critical images to src/assets/ with Astro Image component
- Add WebP conversion reducing file sizes by 54-87%
- Implement IntersectionObserver for render-on-visible performance
- Fix race conditions in ASCII renderers with { once: true } pattern
- Change loading strategy from lazy to eager for ASCII source images
- Enable experimental assets in Astro config

Problem:

The ASCII portrait renderer on the homepage was failing completely - the About Me section showed a blank canvas instead of the ASCII art portrait. This was caused by a fatal combination: source images had `loading="lazy"` attribute AND `style="display: none;"`, which prevented the browser from ever fetching the images (modern browsers skip lazy-loaded hidden images). Additionally, the source images were unoptimized PNGs and JPEGs (2.9MB, 392KB, 93KB), causing slow loading on mobile connections. End users on slow mobile data (11 Mbps) experienced sluggish performance across the site.

Solution:

Migrated the three LCP-critical images (hero portrait, about me portrait, ship section photo) from `public/` to `src/assets/` and leveraged Astro's experimental `<Image />` component for automatic WebP conversion and optimization. Changed loading strategy from `lazy` to `eager` for ASCII source images to ensure they fetch despite being visually hidden. Implemented IntersectionObserver to trigger ASCII rendering only when sections enter the viewport, improving performance. Fixed race conditions in the ASCII renderer JavaScript by using `{ once: true }` event listeners and checking `img.complete && naturalWidth > 0` before rendering.

Details (Detailed Breakdown)

Big Picture Solution:

This enables reliable ASCII portrait rendering while improving site performance through modern image optimization. The approach prioritizes compatibility over bleeding-edge features - we used Astro's experimental assets feature (available in v2.10.x) rather than upgrading to v3+. Trade-offs accepted: (1) Keeping `display: none` on source images (required for the ASCII pattern) but using `loading="eager"` to force fetch, and (2) Using IntersectionObserver polyfill pattern for broader browser support. This fits the broader goal of maintaining site functionality without major framework upgrades or breaking changes.

Key Context & Pivotal Moments:

Initially tried to fix the ASCII issue by changing `loading="lazy"` to `loading="eager"` on all images. This fixed the immediate render failure but hurt LCP scores because below-fold images were loading eagerly.

Mid-session realization: The real issue was the combination of `display: none` + `loading="lazy"` - browsers skip fetching lazy-loaded hidden images entirely. The fix needed to balance: (a) eager loading for hidden source images (so they fetch), and (b) lazy loading for visible content (to preserve LCP).

Critical pivot: Claude correctly identified that the solution was keeping `loading="lazy"` for performance BUT using IntersectionObserver to delay the ASCII render until the section is visible. This gives us both: images load lazily (good for LCP), but ASCII renders only when needed (good for performance). However, we also needed eager loading on the hidden source images themselves because `display: none` blocks lazy loading.

The "aha" insight: The original code worked because it used regular `<img>` with default `loading="eager"` - the browser would fetch even hidden images. When we migrated to Astro `<Image />` with explicit `loading="lazy"`, we broke this behavior. The fix was reverting to eager loading for source images while keeping the IntersectionObserver for render timing.

Users' pain (completely broken ASCII portraits) drove multiple iterations until we found the right balance between functionality and performance.

Specific Changes and Rationale:

1. **astro.config.mjs**:
   - How: Added `experimental: { assets: true }` configuration
   - Why: Enables Astro's built-in image optimization in v2.10.x without upgrading
   - Details: This is the minimal change to get WebP conversion and responsive images

2. **src/pages/index.astro - Image Imports**:
   - How: Added imports from `../assets/` for three images and changed from `<img>` to `<Image>` component
   - Why: Astro can only optimize images imported from `src/assets/`, not from `public/`
   - Details: 
     - `heroSource`: P_20200702_131755_mod.jpg (2.9MB → 1.37MB WebP, 54% reduction)
     - `introSource`: syncsignature-headshot-1706457210445 (3).png (392KB → 49KB WebP, 87% reduction)
     - `shipSource`: P_20181107_210050.jpg (93KB → 43KB WebP, 54% reduction)

3. **src/pages/index.astro - Loading Strategy**:
   - How: Changed `loading="lazy"` to `loading="eager"` on ASCII source images (intro, ship, testimonials)
   - Why: `display: none` + `loading="lazy"` prevents browser from fetching images entirely
   - Details: Hero already had eager loading (correct), but intro and ship were changed to lazy then reverted to eager

4. **src/pages/index.astro - IntersectionObserver Implementation**:
   - How: Replaced DOMContentLoaded init pattern with IntersectionObserver watching canvas elements
   - Why: Delays ASCII rendering until sections are visible, improving performance
   - Details: Uses `{ rootMargin: "200px" }` to start rendering slightly before entering viewport for smoother UX

5. **src/pages/index.astro - Race Condition Fixes**:
   - How: Changed from `img.onload = () => render()` to `img.addEventListener("load", render, { once: true })`
   - Why: Prevents duplicate renders and handles cached images correctly
   - Details: Also added check for `img.complete && img.naturalWidth > 0` before attaching listener

6. **File Migration**:
   - How: Moved three images from `public/` to `src/assets/`
   - Why: Astro's Image component requires assets in `src/assets/` for optimization
   - Details: Deleted from public, added to src/assets, imported in frontmatter

Testing Notes (Executed):

- Build passes: `npm run build` completed successfully with 69 pages generated
- WebP optimization verified: Build log shows size reductions (2957kb → 1370kb, 392kb → 49kb, 93kb → 43kb)
- Output HTML verified: All ASCII source images have `loading="eager"` in dist/index.html
- No console errors in build output

Testing Notes (Not Executed):

- Manual browser testing on mobile data connection
- Verification of ASCII render on first visit vs cached visit
- Lighthouse LCP score comparison

Future Plans:

- Apply same optimization pattern to portfolio ticker images (currently large PNGs in public/assets/portfolio/)
- Consider WebP conversion for all portfolio images to benefit deck and brief pages
- Investigate responsive images with srcset for mobile-optimized versions

Breaking Changes:

None. All changes are internal optimizations. Image URLs changed from `/P_*.jpg` to `/_astro/*.webp` but this is handled transparently by Astro's build process.

Validation Checklist:
☑ Phase 0 answers informed all sections
☑ Big Picture explains What + Why + Trade-offs
☑ Pivotal Moments captures: Initial failure + Mid-session insights + Critical pivots + Why it matters
☑ Each change connects back to Big Picture and Pivotal Moments
☑ Testing Notes explains verification
☑ Breaking Changes explicit
