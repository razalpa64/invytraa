# Hero Section Video

Place your hero background video in this folder.

## Usage
Reference the video in `public/website.json` under the `hero` object's `video` field:

```json
"hero": {
  "headline": "...",
  "subheading": "...",
  "video": "/videos/hero-bg.mp4"
}
```

When a `video` path is set, it will **automatically replace** the static background image in the Hero section.
If `video` is empty (`""`) or omitted, the Hero falls back to the static background image — no code changes needed.

## Recommended Specs
- **Format**: MP4 (H.264 codec for broadest browser support)
- **Resolution**: 1920 × 1080 px (1080p)
- **Duration**: 15–30 seconds, looping seamlessly
- **Max file size**: 8–15 MB (compress with HandBrake or ffmpeg for best results)
- **Naming**: `hero-bg.mp4`

## Compression tip (ffmpeg)
```bash
ffmpeg -i original.mp4 -vcodec h264 -an -vf "scale=1920:1080" -crf 28 hero-bg.mp4
```
(`-an` strips audio — not needed for a muted background video)
