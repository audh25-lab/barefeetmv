export function generateIcon() {
  if (typeof document === "undefined") return

  const link =
    document.querySelector("link[rel='icon']") ||
    document.createElement("link")

  link.setAttribute("rel", "icon")
  link.setAttribute(
    "href",
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👣</text></svg>"
  )

  document.head.appendChild(link)
}
