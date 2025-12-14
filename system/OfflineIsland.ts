export class OfflineIsland {
  private cache: Record<string, any> = {}

  store(key: string, value: any) {
    this.cache[key] = value
    localStorage.setItem("barefeet-island", JSON.stringify(this.cache))
  }

  load(key: string) {
    const data = localStorage.getItem("barefeet-island")
    if (!data) return null
    this.cache = JSON.parse(data)
    return this.cache[key]
  }
}