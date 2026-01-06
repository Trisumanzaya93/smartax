import fs from 'fs'
import { parse } from 'csv-parse'

/**
 * RESULT FORMAT:
 * [
 *   { title: "Materi,Metode,Media", cluster: 1 },
 *   ...
 * ]
 */

const seeds = []

function assignCluster(materi, metode = '', media = '') {
  const text = `${materi} ${metode} ${media}`.toLowerCase()

  // ===== Cluster 5 — UMKM (paling spesifik, taruh atas)
  if (
    text.includes('umkm') ||
    text.includes('usaha mikro') ||
    text.includes('usaha kecil')
  ) {
    return 5
  }

  // ===== Cluster 4 — Teknis / Sistem
  if (
    text.includes('e-faktur') ||
    text.includes('e-bupot') ||
    text.includes('aplikasi') ||
    text.includes('sistem') ||
    text.includes('upload') ||
    text.includes('error') ||
    text.includes('validasi') ||
    text.includes('csv')
  ) {
    return 4
  }

  // ===== Cluster 3 — Kasus / Praktik / Simulasi (🔥 FOKUS TUNING)
  if (
    text.includes('kasus') ||
    text.includes('studi') ||
    text.includes('contoh') ||
    text.includes('praktik') ||
    text.includes('simulasi') ||
    text.includes('latihan') ||
    text.includes('analisis') ||
    text.includes('penerapan')
  ) {
    return 3
  }

  // ===== Cluster 2 — Regulasi / Ketentuan
  if (
    text.includes('ppn') ||
    text.includes('ketentuan') ||
    text.includes('peraturan') ||
    text.includes('regulasi') ||
    text.includes('pajak badan') ||
    text.includes('undang-undang')
  ) {
    return 2
  }

  // ===== Cluster 0 — PPh / Pelaporan
  if (
    text.includes('pph') ||
    text.includes('spt') ||
    text.includes('pelaporan') ||
    text.includes('pembayaran') ||
    text.includes('pemotongan')
  ) {
    return 0
  }

  // ===== Cluster 1 — Dasar / Administrasi (default aman)
  return 1
}


fs.createReadStream('data/seminar.csv')
  .pipe(
    parse({
      columns: true,
      trim: true,
      skip_empty_lines: true
    })
  )
  .on('data', (row) => {
    if (!row.Materi) return

    seeds.push({
      title: `${row.Materi},${row.Metode},${row.Media}`,
      cluster: assignCluster(row.Materi, row.Metode, row.Media)
    })
  })
  .on('end', () => {
    fs.writeFileSync(
      'prisma/seminar.seed.json',
      JSON.stringify(seeds, null, 2)
    )

    console.log(`✅ Generated ${seeds.length} seminar seeds`)
  })
  .on('error', (err) => {
    console.error('❌ Error parsing CSV:', err)
  })
