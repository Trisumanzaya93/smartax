import { prisma } from "@/lib/prisma";
import data from './seminar.seed.json';
import mockMateri from"./materi.json";

async function main() {

  // await prisma.seminar.createMany({
  //   data
  // })

  await prisma.materi.createMany({
    data: [
      // {
      //   cluster: 2,
      //   question: "Salah memilih jenis SPT (Harusnya pakai 1770 malah 1770S)",
      //   answer:
      //     "Silahkan ke meja TPT terdekat atau hubungi Kring Pajak melalui 1500200 atau Live Chat melalui pajak.go.id",
      //   keywords: ["Salah spt", "salah jenis spt"],
      // },
      // {
      //   cluster: 2,
      //   question: "Salah mengisi status PTKP",
      //   answer:
      //     "Silahkan ke meja TPT terdekat atau hubungi Kring Pajak melalui 1500200 atau Live Chat melalui pajak.go.id",
      //   keywords: ["Salah status", "salah mengisi", "salah ptkp"],
      // },
      // {
      //   cluster: 3,
      //   question: "Tidak tahu tata cara melaporkan SPT Tahunan",
      //   answer:
      //     "Baik, sebelum memulai langkah melaporkan SPT Tahunan, siapkan NPWP, EFIN, bukti potong PPh, data harta dan utang terakhir serta email aktif.",
      //   keywords: ["Cara lapor", "lapor spt tahunan", "spt"],
      //   link: "https://youtu.be/vfXixW3BNqM?si=EtZZQDN0TpCnqiiN",
      // },
      // {
      //   cluster: 1,
      //   question: "Bagaimana caranya Aktivasi npwp",
      //   answer:
      //     "Siapkan NIK sesuai Dukcapil, NPWP, email aktif dan nomor HP. Aktivasi dilakukan melalui Coretax DJP.",
      //   keywords: ["Aktivasi npwp"],
      //   link: "https://youtu.be/61spGSQnceA?si=kaR-5gs9y_utWcdy",
      // },
      // {
      //   cluster: 1,
      //   question: "Tidak mengerti cara mendapatkan kode otoritas DJP",
      //   answer:
      //     "Login ke Coretax DJP, pilih menu profil dan ajukan permohonan kode otorisasi DJP.",
      //   keywords: ["Kode otoritas djp"],
      //   link: "https://youtu.be/RUV3lw9C21M?si=-N2aCeTLb1XqrfXB",
      // },
      // {
      //   cluster: 4,
      //   question: "Mengalami kendala/error pada website DJP Online",
      //   answer:
      //     "Silakan coba kembali beberapa saat atau hubungi Kring Pajak apabila gangguan berlanjut.",
      //   keywords: [
      //     "Kode eror",
      //     "Error 400",
      //     "error 404",
      //     "error 500",
      //     "kesalahan website djp",
      //     "server error",
      //   ],
      // },
      // {
      //   cluster: 4,
      //   question: "Bagaimana caranya mengubah data profil di DJP Online?",
      //   answer:
      //     "Apabila Anda ingin mengubah data diri, silakan datang ke KPP terdaftar atau lakukan pembaruan melalui DJP Online.",
      //   keywords: [
      //     "Ubah profil",
      //     "ganti data diri",
      //     "perubahan data pajak",
      //     "update profil djp online",
      //   ],
      //   link: "https://pajak.go.id/id/faq-laporan-tahunan",
      // },
      // {
      //   cluster: 3,
      //   question:
      //     "Saya telah memiliki NPWP sejak tahun 2014 dan tidak pernah lapor SPT, apakah saya dapat melaporkan SPT Tahunan mulai dari 2014?",
      //   answer:
      //     "Anda dapat melakukan pelaporan pajak sejak tahun memiliki NPWP. Pelaporan dilakukan bertahap sesuai ketentuan DJP.",
      //   keywords: [
      //     "Lapor tahun lalu",
      //     "lupa lapor pajak",
      //     "spt tahun lama",
      //     "e-filing tahun pajak lama",
      //   ],
      //   link: "https://pajak.go.id/id/faq-laporan-tahunan",
      // },
      // {
      //   cluster: 3,
      //   question: "Apakah ada sanksi apabila Saya tidak lapor pajak?",
      //   answer:
      //     "Apabila Anda tidak melaporkan atau terlambat melapor pajak, akan dikenakan sanksi administrasi sesuai ketentuan perpajakan.",
      //   keywords: [
      //     "Sanksi pajak",
      //     "denda spt",
      //     "denda 100 ribu",
      //     "sanksi pidana pajak",
      //     "tidak lapor spt",
      //   ],
      //   link: "https://pajak.go.id/id/faq-laporan-tahunan",
      // },
      // {
      //   cluster: -1,
      //   question: "Jawaban pertanyaan selain diatas",
      //   answer:
      //     "Mohon maaf, saat ini SMARTAX belum dapat menemukan informasi yang sesuai. Silakan datang ke KPP terdekat dengan membawa identitas diri.",
      //   keywords: ["fallback"],
      // },
      ...mockMateri
    ],
    skipDuplicates: true,
  });
  
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
