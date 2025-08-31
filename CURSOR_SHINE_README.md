# Global Cursor Shine Effect

This is a reusable JavaScript file that adds a modern following dot cursor effect with adjustable shine to any HTML page.

## Features

- ✨ Smooth following dot cursor with lag effect
- 🌟 Adjustable shine/halo around the cursor
- 🎨 Beautiful blue glow effect
- 📱 Works across all devices
- 🔧 Easy to customize and control

## How to Use

### 1. Include the Script

Add this line to your HTML file before the closing `</body>` tag:

```html
<script src="cursor-shine.js"></script>
```

### 2. Automatic Initialization

The cursor effect will automatically initialize when the page loads. It will:
- Hide the default cursor
- Create the shine and dot elements
- Start the smooth animation

## Customization

### Adjust Shine Size

You can dynamically change the shine size using the global function:

```javascript
// Set shine width and height (in pixels)
setCursorShineSize(300, 300);  // Larger shine
setCursorShineSize(150, 150);  // Smaller shine
setCursorShineSize(0, 0);      // Hide shine completely
```

### Manual Control

You can manually control the cursor effect:

```javascript
// Re-initialize the cursor effect
initCursorShine();

// Remove the cursor effect completely
removeCursorShine();
```

## Default Settings

- **Shine Size**: 220px × 220px
- **Dot Size**: 20px × 20px
- **Shine Color**: Light blue with gradient
- **Animation Speed**: Smooth lag effect (0.1 easing)
- **Z-Index**: Shine at 1000, dot at 1001

## Browser Compatibility

Works in all modern browsers that support:
- `requestAnimationFrame`
- CSS transforms
- ES6+ JavaScript features

## Files

- `cursor-shine.js` - The main script file
- All HTML files now include this script automatically

## Notes

- The effect automatically hides the default cursor on the body element
- The cursor elements are positioned fixed and won't interfere with page scrolling
- The effect is lightweight and optimized for performance

