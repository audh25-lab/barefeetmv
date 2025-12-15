export async function syncToCloud(data: any) {
  await fetch("/api/sync", {
    method: "POST",
    body: JSON.stringify(data)
  })
}