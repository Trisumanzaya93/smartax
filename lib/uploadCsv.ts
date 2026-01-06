export async function uploadCSV(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch('/api/issue/upload', {
    method: 'POST',
    body: formData
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Upload gagal')
  }

  const json = await res.json();
  return json.data; // ⬅️ karena successResponse
}
