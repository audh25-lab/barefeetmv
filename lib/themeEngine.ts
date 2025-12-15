export function applyTheme() {
  if (typeof document === "undefined") return

  const hour = new Date().getHours()
  const isNight = hour >= 18 || hour < 6

  document.body.style.background = isNight ? "#0a2540" : "#f5fbff"
  document.body.style.color = isNight ? "#ffffff" : "#000000"
}
