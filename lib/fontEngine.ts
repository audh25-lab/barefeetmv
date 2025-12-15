export function injectFontStyle() {
  if (typeof document === "undefined") return

  const style = document.createElement("style")

  style.innerHTML = `
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont,
                   "Segoe UI", sans-serif;
    }
  `

  document.head.appendChild(style)
}
