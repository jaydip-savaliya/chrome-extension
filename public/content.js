(function () {
    if (document.getElementById("floating-bubble")) return; 

    let bubble = document.createElement("div");
    bubble.id = "floating-bubble";
    bubble.innerText = "⚡";
    document.body.appendChild(bubble);

    let style = document.createElement("style");
    style.innerHTML = `
        #floating-bubble {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #007bff;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            border-radius: 50%;
            cursor: grab;
            z-index: 9999;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
            user-select: none;
        }
        #floating-bubble:active {
            cursor: grabbing;
        }
    `;
    document.head.appendChild(style);

    let isDragging = false;
    let offsetX, offsetY;

    // Start dragging
    bubble.addEventListener("mousedown", (event) => {
        isDragging = true;
        offsetX = event.clientX - bubble.getBoundingClientRect().left;
        offsetY = event.clientY - bubble.getBoundingClientRect().top;
        bubble.style.cursor = "grabbing";
    });

    // Move the bubble
    document.addEventListener("mousemove", (event) => {
        if (!isDragging) return;
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.right = "auto"; // Allow free movement
        bubble.style.bottom = "auto";
    });

    // Stop dragging
    document.addEventListener("mouseup", () => {
        isDragging = false;
        bubble.style.cursor = "grab";
    });

    // Open popup when clicked
    bubble.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent conflicts with drag
        if (!isDragging) {
            chrome.runtime.sendMessage({ action: "openPopup" });
        }
    });
})();
