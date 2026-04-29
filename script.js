let buttons = document.querySelectorAll(".magic-btn");

let symbols = ["{ }", "</>", "const", "API", "JS", "CSS", "HTML", "()", "=>"];

buttons.forEach(button => {
  let interval;

  button.addEventListener("mouseenter", () => {
    interval = setInterval(() => {
      let span = document.createElement("span");
      span.className = "code-particle";

      span.innerText = symbols[Math.floor(Math.random() * symbols.length)];

      let rect = button.getBoundingClientRect();

      let offset = 5;
      let side = Math.floor(Math.random() * 4);

      let startX;
      let startY;
      let x;
      let y;

      if (side === 0) {
      
        startX = rect.left + Math.random() * rect.width;
        startY = rect.top - offset;

        x = (Math.random() - 0.5) * 100 + "px";
        y = -Math.random() * 150 + "px";
      }

      if (side === 1) {
       
        startX = rect.left + Math.random() * rect.width;
        startY = rect.bottom + offset;

        x = (Math.random() - 0.5) * 100 + "px";
        y = Math.random() * 150 + "px";
      }

      if (side === 2) {
       
        startX = rect.left - offset;
        startY = rect.top + Math.random() * rect.height;

        x = -Math.random() * 150 + "px";
        y = (Math.random() - 0.5) * 100 + "px";
      }

      if (side === 3) {
       
        startX = rect.right + offset;
        startY = rect.top + Math.random() * rect.height;

        x = Math.random() * 150 + "px";
        y = (Math.random() - 0.5) * 100 + "px";
      }

      span.style.left = startX + "px";
      span.style.top = startY + "px";

      span.style.setProperty("--x", x);
      span.style.setProperty("--y", y);

      span.style.fontSize = 10 + Math.random() * 6 + "px";

      document.body.appendChild(span);

      setTimeout(() => {
        span.remove();
      }, 800);
    }, 100);
  });

  button.addEventListener("mouseleave", () => {
    clearInterval(interval);
  });
});