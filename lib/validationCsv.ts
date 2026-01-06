const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const REQUIRED_HEADERS = ['Materi', 'Metode', 'Media']

export async function validateCSVHeaders(file: File) {
  const text = await file.text()
  const [headerLine] = text.split('\n')
  const headers = headerLine.split(',').map(h => h.trim())

  const missing = REQUIRED_HEADERS.filter(h => !headers.includes(h))

  if (missing.length > 0) {
    return `Header CSV tidak lengkap: ${missing.join(', ')}`
  }

  return null
}


export function validateCSVFile(file: File) {
  // 1️⃣ Extension check
  if (!file.name.toLowerCase().endsWith('.csv')) {
    return 'File harus berformat .csv'
  }

  // 2️⃣ MIME type check (tidak 100% reliable, tapi OK untuk UX)
  if (!['text/csv', 'application/vnd.ms-excel'].includes(file.type)) {
    return 'File bukan CSV yang valid'
  }

  // 3️⃣ Size check
  if (file.size > MAX_FILE_SIZE) {
    return 'Ukuran file maksimal 2MB'
  }

  return null
}
