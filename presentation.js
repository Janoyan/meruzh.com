
function initCanvas() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.documentElement.appendChild(canvas);

    let permanentSegments = [];
    let temporarySegments = [];
    let lastX = null;
    let lastY = null;

    function resizeCanvas() {
        // Make canvas the size of the full scrollable document
        canvas.width = Math.max(document.documentElement.scrollWidth, window.innerWidth);
        canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    }

    canvas.style.cssText = `
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        z-index: 999 !important;
        background: transparent !important;
        pointer-events: none !important;
        display: block !important;
    `;

    resizeCanvas();
    // Re-run resize on window change or if the body height changes
    window.addEventListener('resize', resizeCanvas);
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(document.body);

    // KEYBOARD CAPTURE
    window.addEventListener('keydown', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) {
            canvas.style.pointerEvents = 'auto';
        }
    }, true);

    window.addEventListener('keyup', (e) => {
        if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
            canvas.style.pointerEvents = 'none';
            lastX = null;
            lastY = null;
        }
    }, true);

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();

        // Filter 5-second lines
        temporarySegments = temporarySegments.filter(seg => (now - seg.time) < 2000);

        ctx.lineWidth = 3;
        ctx.lineCap = 'round';

        // Draw Permanent (Command/Ctrl) - Red
        ctx.strokeStyle = 'red';
        permanentSegments.forEach(seg => {
            ctx.beginPath();
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
            ctx.stroke();
        });

        // Draw Temporary (Shift) - Blue
        ctx.strokeStyle = 'blue';
        temporarySegments.forEach(seg => {
            ctx.beginPath();
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
            ctx.stroke();
        });

        requestAnimationFrame(render);
    }

    // MOUSE TRACKING
    const handleMove = (e) => {
        const isCmd = e.metaKey || e.ctrlKey;
        const isShift = e.shiftKey;

        if (!isCmd && !isShift) {
            lastX = null;
            lastY = null;
            return;
        }

        // Use pageX/Y so drawing is relative to the document, not the window
        const x = e.pageX;
        const y = e.pageY;

        if (lastX !== null && lastY !== null) {
            const segment = { x1: lastX, y1: lastY, x2: x, y2: y, time: Date.now() };
            if (isCmd) permanentSegments.push(segment);
            else if (isShift) temporarySegments.push(segment);
        }

        lastX = x;
        lastY = y;
    };

    // Listen on BOTH window (for general) and canvas (when auto-pointer-events is on)
    window.addEventListener('mousemove', handleMove, true);
    canvas.addEventListener('mousemove', handleMove);

    render();
}

function initKeyboardListeners(event) {
    if (event.key.toLowerCase() === "b") {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || selection.collapsed) return;

        const range = selection.getRangeAt(0);
        const span = document.createElement("span");

        // Metadata and Classes
        span.id = "drag-" + Date.now();
        span.classList.add("presentation", "presentation_highlight");

        // Styling for the draggable "clone"
        span.style.position = "absolute";
        span.style.cursor = "move";
        span.style.zIndex = "999"; // Ensure it sits on top

        // --- Drag Logic ---
        span.onmousedown = function(e) {
            let shiftX = e.clientX - span.getBoundingClientRect().left;
            let shiftY = e.clientY - span.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                span.style.left = (pageX - shiftX) + 'px';
                span.style.top = (pageY - shiftY) + 'px';
            }

            function onMouseMove(e) {
                moveAt(e.pageX, e.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
            };
        };

        span.ondragstart = function() { return false; };

        try {
            // 1. Get the visual coordinates of the selection
            const rect = range.getBoundingClientRect();

            // 2. CLONE the content instead of extracting it
            span.appendChild(range.cloneContents());

            // 3. Set position based on original text location
            span.style.left = (rect.left + window.scrollX) + "px";
            span.style.top = (rect.top + window.scrollY) + "px";

            // 4. Add to body (original text remains in its parent)
            document.body.appendChild(span);

            selection.removeAllRanges();
        } catch (e) {
            console.warn("Could not clone selection:", e);
        }
    }
}


if (localStorage.getItem('presentation')) {
    document.addEventListener("keydown", function (event) {
        initKeyboardListeners(event);
    });

    document.addEventListener("DOMContentLoaded", function (event) {
        initCanvas()
    });
}








