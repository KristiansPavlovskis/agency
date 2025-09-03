// Global Mouse Shine Cursor Effect
// This file provides a modern following dot cursor effect with adjustable shine
// that can be applied to any HTML page

(function() {
  'use strict';
  
  let cursorDot = null;
  let cursorShine = null;
  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let isInitialized = false;
  let isVisible = false;

  // Shine size (adjustable)
  let shineWidth = 220;  // default width of the shine/halo
  let shineHeight = 220; // default height of the shine/halo

  // Responsive breakpoint for laptop/desktop (768px is typical tablet breakpoint)
  const DESKTOP_BREAKPOINT = 1024;

  // Check if current screen size supports cursor effect
  function isDesktopSize() {
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  }

  // Show/hide cursor elements based on screen size
  function updateCursorVisibility() {
    const shouldShow = isDesktopSize();
    
    if (shouldShow && !isVisible) {
      // Show cursor effect
      if (cursorDot) cursorDot.style.display = 'block';
      if (cursorShine) cursorShine.style.display = 'block';
      isVisible = true;
    } else if (!shouldShow && isVisible) {
      // Hide cursor effect
      if (cursorDot) cursorDot.style.display = 'none';
      if (cursorShine) cursorShine.style.display = 'none';
      isVisible = false;
    }
  }

  // Create the following dot and shine
  function createCursorElements() {
    if (!cursorShine) {
      cursorShine = document.createElement('div');
      cursorShine.style.position = 'fixed';
      cursorShine.style.width = shineWidth + 'px';
      cursorShine.style.height = shineHeight + 'px';
      cursorShine.style.pointerEvents = 'none';
      cursorShine.style.borderRadius = '50%';
      cursorShine.style.transform = 'translate(-50%, -50%)';
      cursorShine.style.zIndex = '1000';
      cursorShine.style.background = 'radial-gradient(ellipse at center, rgba(202, 244, 255, 0.35) 0%, rgba(202, 244, 255, 0.18) 40%, rgba(202, 244, 255, 0.08) 65%, rgba(202, 244, 255, 0) 80%)';
      cursorShine.style.filter = 'blur(12px)';
      cursorShine.style.transition = 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease';
      cursorShine.style.display = 'none'; // Initially hidden until we check screen size
      document.body.appendChild(cursorShine);
    }

    if (!cursorDot) {
      cursorDot = document.createElement('div');
      cursorDot.style.position = 'fixed';
      cursorDot.style.width = '20px';
      cursorDot.style.height = '20px';
      cursorDot.style.background = 'rgba(202, 244, 255, 0.9)';
      cursorDot.style.borderRadius = '50%';
      cursorDot.style.pointerEvents = 'none';
      cursorDot.style.zIndex = '1001';
      cursorDot.style.transform = 'translate(-50%, -50%)';
      cursorDot.style.boxShadow = '0 0 25px rgba(202, 244, 255, 0.8), 0 0 60px rgba(202, 244, 255, 0.4)';
      cursorDot.style.display = 'none'; // Initially hidden until we check screen size
      document.body.appendChild(cursorDot);
    }
  }

  // Expose a helper to manually adjust shine size
  window.setCursorShineSize = function(width, height) {
    shineWidth = Math.max(0, Number(width) || 0);
    shineHeight = Math.max(0, Number(height) || 0);
    if (cursorShine) {
      cursorShine.style.width = shineWidth + 'px';
      cursorShine.style.height = shineHeight + 'px';
    }
  };

  // Update mouse position
  function handleMouseMove(e) {
    if (!isVisible) return; // Only track mouse if cursor is visible
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  // Animate the dot with lag
  function animateDot() {
    if (!cursorDot || !cursorShine) {
      createCursorElements();
    }
    
    // Only animate if cursor is visible
    if (!isVisible) {
      requestAnimationFrame(animateDot);
      return;
    }
    
    // Smooth following with lag
    dotX += (mouseX - dotX) * 0.1;
    dotY += (mouseY - dotY) * 0.1;
    
    if (cursorShine) {
      cursorShine.style.left = dotX + 'px';
      cursorShine.style.top = dotY + 'px';
    }
    if (cursorDot) {
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
    }
    
    requestAnimationFrame(animateDot);
  }

  // Initialize the cursor effect
  function initCursorShine() {
    if (isInitialized) return;

    // Create cursor elements
    createCursorElements();
    
    // Check initial visibility
    updateCursorVisibility();
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add resize listener for responsive behavior
    window.addEventListener('resize', updateCursorVisibility);
    
    // Start animation
    animateDot();
    
    isInitialized = true;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursorShine);
  } else {
    initCursorShine();
  }

  // Expose initialization function globally
  window.initCursorShine = initCursorShine;
  
  // Expose cleanup function
  window.removeCursorShine = function() {
    if (cursorDot) {
      cursorDot.remove();
      cursorDot = null;
    }
    if (cursorShine) {
      cursorShine.remove();
      cursorShine = null;
    }
    document.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', updateCursorVisibility);
    isInitialized = false;
    isVisible = false;
  };

})();
