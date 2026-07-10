# Template Images

Place your template thumbnail images in this folder.

## Usage
Reference images in `public/website.json` under each template's `thumbnail` field using a root-relative path:

```json
"thumbnail": "/images/templates/your-image.jpg"
```

## Recommended Specs
- **Format**: JPG or WebP
- **Dimensions**: 1200 × 900 px (4:3 ratio)
- **Max file size**: 500 KB per image
- **Naming**: Use lowercase with hyphens, e.g. `royal-elegance.jpg`

## Example
```
public/
  images/
    templates/
      royal-elegance.jpg
      modern-minimalist.jpg
      floral-whisper.jpg
      midnight-gala.jpg
```
