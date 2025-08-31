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

  // Shine size (adjustable)
  let shineWidth = 220;  // default width of the shine/halo
  let shineHeight = 220; // default height of the shine/halo

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
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  // Animate the dot with lag
  function animateDot() {
    if (!cursorDot || !cursorShine) {
      createCursorElements();
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

           // Keep default cursor visible
           // document.body.style.cursor = 'none'; // Removed to keep default cursor visible

           // Create cursor elements
           createCursorElements();
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
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
           // document.body.style.cursor = ''; // Removed since we're not hiding the cursor
           isInitialized = false;
         };

})();
