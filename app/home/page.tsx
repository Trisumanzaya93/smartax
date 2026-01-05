"use client";

import Image from "next/image";
import { PlaceholdersAndVanishInput } from "../../components/ui/placeholders-and-vanish-input";
import { ClusterTable } from "@/components/ui/clusterTable";
import { ClusterFilter } from "@/components/ui/clusterFilter";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportClustersToCSV } from "@/lib/exportCsv";
import { createIssueFromText } from "./home.handler";
import { ClusterResult, DataResponse, ErrorResponse, IssueResult } from "./home.type";
import { toast } from "sonner";

// const data = {
//   "totalRows": 250,
//   "validRows": 250,
//   "invalidRows": 0,
//   "errors": [],
//   "data": [
//     {
//       "cluster": 0,
//       "count": 18,
//       "issues": [
//         {
//           "id": 3,
//           "rawText": "Tidak mengetahui cara menghitung PPh (kasus 2)"
//         },
//         {
//           "id": 4,
//           "rawText": "Tidak mengetahui cara lapor SPT (kasus 4)"
//         },
//         {
//           "id": 25,
//           "rawText": "Tidak tahu tata cara pembayaran (kasus 23)"
//         },
//         {
//           "id": 32,
//           "rawText": "Menghitung PPh pasal 21 mandiri sulit (kasus 30)"
//         },
//         {
//           "id": 63,
//           "rawText": "Tidak mengetahui cara menghitung PPh (kasus 62)"
//         },
//         {
//           "id": 65,
//           "rawText": "Tidak mengetahui cara lapor SPT (kasus 64)"
//         },
//         {
//           "id": 84,
//           "rawText": "Tidak tahu tata cara pembayaran (kasus 83)"
//         },
//         {
//           "id": 92,
//           "rawText": "Menghitung PPh pasal 21 mandiri sulit (kasus 90)"
//         },
//         {
//           "id": 124,
//           "rawText": "Tidak mengetahui cara menghitung PPh (kasus 122)"
//         },
//         {
//           "id": 127,
//           "rawText": "Tidak mengetahui cara lapor SPT (kasus 124)"
//         },
//         {
//           "id": 146,
//           "rawText": "Tidak tahu tata cara pembayaran (kasus 143)"
//         },
//         {
//           "id": 153,
//           "rawText": "Menghitung PPh pasal 21 mandiri sulit (kasus 150)"
//         },
//         {
//           "id": 183,
//           "rawText": "Tidak mengetahui cara menghitung PPh (kasus 182)"
//         },
//         {
//           "id": 186,
//           "rawText": "Tidak mengetahui cara lapor SPT (kasus 184)"
//         },
//         {
//           "id": 205,
//           "rawText": "Tidak tahu tata cara pembayaran (kasus 203)"
//         },
//         {
//           "id": 212,
//           "rawText": "Menghitung PPh pasal 21 mandiri sulit (kasus 210)"
//         },
//         {
//           "id": 244,
//           "rawText": "Tidak mengetahui cara menghitung PPh (kasus 242)"
//         },
//         {
//           "id": 247,
//           "rawText": "Tidak mengetahui cara lapor SPT (kasus 244)"
//         }
//       ],
//       "seminars": [
//         {
//           id: 1,
//           title: 'Seminar Pajak 101'
//         },
//         {
//           id: 2,
//           title: 'Seminar Pajak 102'
//         },
//         {
//           id: 3,
//           title: 'Pengantar Perpajakan,Asas pemungutan pajak",Microlearning,Template PPT sosialisasi SPT WP OP'
//         },
//         {
//           id: 4,
//           title: 'Seminar Pajak 104'
//         },
//         {
//           id: 5,
//           title: 'Microlearning Pajak'
//         }
//       ]
//     },
//     {
//       "cluster": 1,
//       "count": 57,
//       "issues": [
//         {
//           "id": 11,
//           "rawText": "Tidak tahu biaya dapat dikurangkan (kasus 7)"
//         },
//         {
//           "id": 17,
//           "rawText": "Minim pengetahuan PPN pemula (kasus 15)"
//         },
//         {
//           "id": 18,
//           "rawText": "Tidak tahu prosedur registrasi NPWP (kasus 16)"
//         },
//         {
//           "id": 19,
//           "rawText": "Tidak tahu aktivasi EFIN (kasus 17)"
//         },
//         {
//           "id": 23,
//           "rawText": "Tidak tahu PKP/Non-PKP (kasus 21)"
//         },
//         {
//           "id": 24,
//           "rawText": "Tidak tahu syarat PKP (kasus 22)"
//         },
//         {
//           "id": 26,
//           "rawText": "Tidak tahu deadline pembayaran (kasus 24)"
//         },
//         {
//           "id": 28,
//           "rawText": "Tidak tahu fungsi kode billing (kasus 26)"
//         },
//         {
//           "id": 35,
//           "rawText": "Tidak tahu pembetulan SPT (kasus 32)"
//         },
//         {
//           "id": 40,
//           "rawText": "Tidak tahu retur faktur (kasus 38)"
//         },
//         {
//           "id": 44,
//           "rawText": "Tidak tahu manfaat patuh pajak (kasus 42)"
//         },
//         {
//           "id": 48,
//           "rawText": "Tidak tahu pajak hibah (kasus 45)"
//         },
//         {
//           "id": 51,
//           "rawText": "Ketentuan pajak kripto tidak tahu (kasus 49)"
//         },
//         {
//           "id": 61,
//           "rawText": "Freelance pajak tidak tahu (kasus 59)"
//         },
//         {
//           "id": 69,
//           "rawText": "Tidak tahu biaya dapat dikurangkan (kasus 67)"
//         },
//         {
//           "id": 75,
//           "rawText": "Minim pengetahuan PPN pemula (kasus 75)"
//         },
//         {
//           "id": 78,
//           "rawText": "Tidak tahu prosedur registrasi NPWP (kasus 76)"
//         },
//         {
//           "id": 79,
//           "rawText": "Tidak tahu aktivasi EFIN (kasus 77)"
//         },
//         {
//           "id": 83,
//           "rawText": "Tidak tahu PKP/Non-PKP (kasus 81)"
//         },
//         {
//           "id": 85,
//           "rawText": "Tidak tahu syarat PKP (kasus 82)"
//         },
//         {
//           "id": 86,
//           "rawText": "Tidak tahu deadline pembayaran (kasus 84)"
//         },
//         {
//           "id": 88,
//           "rawText": "Tidak tahu fungsi kode billing (kasus 86)"
//         },
//         {
//           "id": 95,
//           "rawText": "Tidak tahu pembetulan SPT (kasus 92)"
//         },
//         {
//           "id": 100,
//           "rawText": "Tidak tahu retur faktur (kasus 98)"
//         },
//         {
//           "id": 104,
//           "rawText": "Tidak tahu manfaat patuh pajak (kasus 102)"
//         },
//         {
//           "id": 107,
//           "rawText": "Tidak tahu pajak hibah (kasus 105)"
//         },
//         {
//           "id": 111,
//           "rawText": "Ketentuan pajak kripto tidak tahu (kasus 109)"
//         },
//         {
//           "id": 121,
//           "rawText": "Freelance pajak tidak tahu (kasus 119)"
//         },
//         {
//           "id": 129,
//           "rawText": "Tidak tahu biaya dapat dikurangkan (kasus 127)"
//         },
//         {
//           "id": 138,
//           "rawText": "Minim pengetahuan PPN pemula (kasus 135)"
//         },
//         {
//           "id": 136,
//           "rawText": "Tidak tahu prosedur registrasi NPWP (kasus 136)"
//         },
//         {
//           "id": 139,
//           "rawText": "Tidak tahu aktivasi EFIN (kasus 137)"
//         },
//         {
//           "id": 143,
//           "rawText": "Tidak tahu PKP/Non-PKP (kasus 141)"
//         },
//         {
//           "id": 144,
//           "rawText": "Tidak tahu syarat PKP (kasus 142)"
//         },
//         {
//           "id": 147,
//           "rawText": "Tidak tahu deadline pembayaran (kasus 144)"
//         },
//         {
//           "id": 145,
//           "rawText": "Tidak tahu fungsi kode billing (kasus 146)"
//         },
//         {
//           "id": 154,
//           "rawText": "Tidak tahu pembetulan SPT (kasus 152)"
//         },
//         {
//           "id": 160,
//           "rawText": "Tidak tahu retur faktur (kasus 158)"
//         },
//         {
//           "id": 164,
//           "rawText": "Tidak tahu manfaat patuh pajak (kasus 162)"
//         },
//         {
//           "id": 167,
//           "rawText": "Tidak tahu pajak hibah (kasus 165)"
//         },
//         {
//           "id": 171,
//           "rawText": "Ketentuan pajak kripto tidak tahu (kasus 169)"
//         },
//         {
//           "id": 181,
//           "rawText": "Freelance pajak tidak tahu (kasus 179)"
//         },
//         {
//           "id": 189,
//           "rawText": "Tidak tahu biaya dapat dikurangkan (kasus 187)"
//         },
//         {
//           "id": 197,
//           "rawText": "Minim pengetahuan PPN pemula (kasus 195)"
//         },
//         {
//           "id": 198,
//           "rawText": "Tidak tahu prosedur registrasi NPWP (kasus 196)"
//         },
//         {
//           "id": 199,
//           "rawText": "Tidak tahu aktivasi EFIN (kasus 197)"
//         },
//         {
//           "id": 204,
//           "rawText": "Tidak tahu PKP/Non-PKP (kasus 201)"
//         },
//         {
//           "id": 203,
//           "rawText": "Tidak tahu syarat PKP (kasus 202)"
//         },
//         {
//           "id": 206,
//           "rawText": "Tidak tahu deadline pembayaran (kasus 204)"
//         },
//         {
//           "id": 208,
//           "rawText": "Tidak tahu fungsi kode billing (kasus 206)"
//         },
//         {
//           "id": 215,
//           "rawText": "Tidak tahu pembetulan SPT (kasus 212)"
//         },
//         {
//           "id": 220,
//           "rawText": "Tidak tahu retur faktur (kasus 218)"
//         },
//         {
//           "id": 224,
//           "rawText": "Tidak tahu manfaat patuh pajak (kasus 222)"
//         },
//         {
//           "id": 227,
//           "rawText": "Tidak tahu pajak hibah (kasus 225)"
//         },
//         {
//           "id": 231,
//           "rawText": "Ketentuan pajak kripto tidak tahu (kasus 229)"
//         },
//         {
//           "id": 241,
//           "rawText": "Freelance pajak tidak tahu (kasus 239)"
//         },
//         {
//           "id": 249,
//           "rawText": "Tidak tahu biaya dapat dikurangkan (kasus 247)"
//         }
//       ],
//       "seminars": [
//         {
//           id: 6,
//           title: 'Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201'
//         },
//         {
//           id: 7,
//           title: 'Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201 Seminar Pajak 201'
//         }
//       ]
//     },
//     // {
//     //   "cluster": 2,
//     //   "count": 69,
//     //   "issues": [
//     //     {
//     //       "id": 8,
//     //       "rawText": "Tidak mengikuti perubahan ketentuan pajak (kasus 8)"
//     //     },
//     //     {
//     //       "id": 13,
//     //       "rawText": "Tidak paham perhitungan pajak karyawan (kasus 11)"
//     //     },
//     //     {
//     //       "id": 15,
//     //       "rawText": "Tidak paham pajak pribadi vs badan (kasus 13)"
//     //     },
//     //     {
//     //       "id": 16,
//     //       "rawText": "Tidak mengerti kredit pajak (kasus 14)"
//     //     },
//     //     {
//     //       "id": 27,
//     //       "rawText": "Tidak paham bukti potong (kasus 25)"
//     //     },
//     //     {
//     //       "id": 31,
//     //       "rawText": "Ketentuan pajak influencer tidak paham (kasus 29)"
//     //     },
//     //     {
//     //       "id": 33,
//     //       "rawText": "Pajak badan tidak dipahami (kasus 31)"
//     //     },
//     //     {
//     //       "id": 38,
//     //       "rawText": "Kurang memahami e-faktur (kasus 36)"
//     //     },
//     //     {
//     //       "id": 43,
//     //       "rawText": "Minim literasi insentif pajak (kasus 41)"
//     //     },
//     //     {
//     //       "id": 45,
//     //       "rawText": "Konsekuensi pemeriksaan tidak dipahami (kasus 43)"
//     //     },
//     //     {
//     //       "id": 49,
//     //       "rawText": "Withholding tax tidak dimengerti (kasus 47)"
//     //     },
//     //     {
//     //       "id": 50,
//     //       "rawText": "PPN digital belum dipahami (kasus 48)"
//     //     },
//     //     {
//     //       "id": 52,
//     //       "rawText": "Pajak e-commerce tidak dipahami (kasus 50)"
//     //     },
//     //     {
//     //       "id": 53,
//     //       "rawText": "SKPKB tidak dipahami (kasus 53)"
//     //     },
//     //     {
//     //       "id": 56,
//     //       "rawText": "Fungsi SSP/SSPCP tidak paham (kasus 54)"
//     //     },
//     //     {
//     //       "id": 59,
//     //       "rawText": "Pajak warisan tidak paham (kasus 57)"
//     //     },
//     //     {
//     //       "id": 62,
//     //       "rawText": "Minim pemahaman pajak meski punya NPWP (kasus 60)"
//     //     },
//     //     {
//     //       "id": 70,
//     //       "rawText": "Tidak mengikuti perubahan ketentuan pajak (kasus 68)"
//     //     },
//     //     {
//     //       "id": 76,
//     //       "rawText": "Tidak paham perhitungan pajak karyawan (kasus 71)"
//     //     },
//     //     {
//     //       "id": 73,
//     //       "rawText": "Tidak paham pajak pribadi vs badan (kasus 73)"
//     //     },
//     //     {
//     //       "id": 77,
//     //       "rawText": "Tidak mengerti kredit pajak (kasus 74)"
//     //     },
//     //     {
//     //       "id": 87,
//     //       "rawText": "Tidak paham bukti potong (kasus 85)"
//     //     },
//     //     {
//     //       "id": 91,
//     //       "rawText": "Ketentuan pajak influencer tidak paham (kasus 89)"
//     //     },
//     //     {
//     //       "id": 93,
//     //       "rawText": "Pajak badan tidak dipahami (kasus 91)"
//     //     },
//     //     {
//     //       "id": 98,
//     //       "rawText": "Kurang memahami e-faktur (kasus 96)"
//     //     },
//     //     {
//     //       "id": 103,
//     //       "rawText": "Minim literasi insentif pajak (kasus 101)"
//     //     },
//     //     {
//     //       "id": 105,
//     //       "rawText": "Konsekuensi pemeriksaan tidak dipahami (kasus 103)"
//     //     },
//     //     {
//     //       "id": 109,
//     //       "rawText": "Withholding tax tidak dimengerti (kasus 107)"
//     //     },
//     //     {
//     //       "id": 110,
//     //       "rawText": "PPN digital belum dipahami (kasus 108)"
//     //     },
//     //     {
//     //       "id": 112,
//     //       "rawText": "Pajak e-commerce tidak dipahami (kasus 110)"
//     //     },
//     //     {
//     //       "id": 115,
//     //       "rawText": "SKPKB tidak dipahami (kasus 113)"
//     //     },
//     //     {
//     //       "id": 116,
//     //       "rawText": "Fungsi SSP/SSPCP tidak paham (kasus 114)"
//     //     },
//     //     {
//     //       "id": 119,
//     //       "rawText": "Pajak warisan tidak paham (kasus 117)"
//     //     },
//     //     {
//     //       "id": 122,
//     //       "rawText": "Minim pemahaman pajak meski punya NPWP (kasus 120)"
//     //     },
//     //     {
//     //       "id": 130,
//     //       "rawText": "Tidak mengikuti perubahan ketentuan pajak (kasus 128)"
//     //     },
//     //     {
//     //       "id": 133,
//     //       "rawText": "Tidak paham perhitungan pajak karyawan (kasus 131)"
//     //     },
//     //     {
//     //       "id": 135,
//     //       "rawText": "Tidak paham pajak pribadi vs badan (kasus 133)"
//     //     },
//     //     {
//     //       "id": 137,
//     //       "rawText": "Tidak mengerti kredit pajak (kasus 134)"
//     //     },
//     //     {
//     //       "id": 148,
//     //       "rawText": "Tidak paham bukti potong (kasus 145)"
//     //     },
//     //     {
//     //       "id": 152,
//     //       "rawText": "Ketentuan pajak influencer tidak paham (kasus 149)"
//     //     },
//     //     {
//     //       "id": 151,
//     //       "rawText": "Pajak badan tidak dipahami (kasus 151)"
//     //     },
//     //     {
//     //       "id": 158,
//     //       "rawText": "Kurang memahami e-faktur (kasus 156)"
//     //     },
//     //     {
//     //       "id": 163,
//     //       "rawText": "Minim literasi insentif pajak (kasus 161)"
//     //     },
//     //     {
//     //       "id": 165,
//     //       "rawText": "Konsekuensi pemeriksaan tidak dipahami (kasus 163)"
//     //     },
//     //     {
//     //       "id": 168,
//     //       "rawText": "Withholding tax tidak dimengerti (kasus 167)"
//     //     },
//     //     {
//     //       "id": 170,
//     //       "rawText": "PPN digital belum dipahami (kasus 168)"
//     //     },
//     //     {
//     //       "id": 172,
//     //       "rawText": "Pajak e-commerce tidak dipahami (kasus 170)"
//     //     },
//     //     {
//     //       "id": 175,
//     //       "rawText": "SKPKB tidak dipahami (kasus 173)"
//     //     },
//     //     {
//     //       "id": 176,
//     //       "rawText": "Fungsi SSP/SSPCP tidak paham (kasus 174)"
//     //     },
//     //     {
//     //       "id": 178,
//     //       "rawText": "Pajak warisan tidak paham (kasus 177)"
//     //     },
//     //     {
//     //       "id": 182,
//     //       "rawText": "Minim pemahaman pajak meski punya NPWP (kasus 180)"
//     //     },
//     //     {
//     //       "id": 190,
//     //       "rawText": "Tidak mengikuti perubahan ketentuan pajak (kasus 188)"
//     //     },
//     //     {
//     //       "id": 193,
//     //       "rawText": "Tidak paham perhitungan pajak karyawan (kasus 191)"
//     //     },
//     //     {
//     //       "id": 195,
//     //       "rawText": "Tidak paham pajak pribadi vs badan (kasus 193)"
//     //     },
//     //     {
//     //       "id": 196,
//     //       "rawText": "Tidak mengerti kredit pajak (kasus 194)"
//     //     },
//     //     {
//     //       "id": 207,
//     //       "rawText": "Tidak paham bukti potong (kasus 205)"
//     //     },
//     //     {
//     //       "id": 211,
//     //       "rawText": "Ketentuan pajak influencer tidak paham (kasus 209)"
//     //     },
//     //     {
//     //       "id": 213,
//     //       "rawText": "Pajak badan tidak dipahami (kasus 211)"
//     //     },
//     //     {
//     //       "id": 218,
//     //       "rawText": "Kurang memahami e-faktur (kasus 216)"
//     //     },
//     //     {
//     //       "id": 223,
//     //       "rawText": "Minim literasi insentif pajak (kasus 221)"
//     //     },
//     //     {
//     //       "id": 225,
//     //       "rawText": "Konsekuensi pemeriksaan tidak dipahami (kasus 223)"
//     //     },
//     //     {
//     //       "id": 229,
//     //       "rawText": "Withholding tax tidak dimengerti (kasus 227)"
//     //     },
//     //     {
//     //       "id": 230,
//     //       "rawText": "PPN digital belum dipahami (kasus 228)"
//     //     },
//     //     {
//     //       "id": 232,
//     //       "rawText": "Pajak e-commerce tidak dipahami (kasus 230)"
//     //     },
//     //     {
//     //       "id": 236,
//     //       "rawText": "SKPKB tidak dipahami (kasus 233)"
//     //     },
//     //     {
//     //       "id": 235,
//     //       "rawText": "Fungsi SSP/SSPCP tidak paham (kasus 234)"
//     //     },
//     //     {
//     //       "id": 239,
//     //       "rawText": "Pajak warisan tidak paham (kasus 237)"
//     //     },
//     //     {
//     //       "id": 242,
//     //       "rawText": "Minim pemahaman pajak meski punya NPWP (kasus 240)"
//     //     },
//     //     {
//     //       "id": 250,
//     //       "rawText": "Tidak mengikuti perubahan ketentuan pajak (kasus 248)"
//     //     }
//     //   ],
//     //   "seminars": []
//     // },
//     // {
//     //   "cluster": 3,
//     //   "count": 58,
//     //   "issues": [
//     //     {
//     //       "id": 6,
//     //       "rawText": "Bingung membedakan objek pajak (kasus 3)"
//     //     },
//     //     {
//     //       "id": 12,
//     //       "rawText": "Tidak tahu konsekuensi keterlambatan lapor (kasus 10)"
//     //     },
//     //     {
//     //       "id": 14,
//     //       "rawText": "Bingung pajak transaksi online (kasus 12)"
//     //     },
//     //     {
//     //       "id": 20,
//     //       "rawText": "Bingung update data WP (kasus 18)"
//     //     },
//     //     {
//     //       "id": 22,
//     //       "rawText": "Pajak penghasilan sampingan bingung (kasus 20)"
//     //     },
//     //     {
//     //       "id": 30,
//     //       "rawText": "Pajak sewa aset bingung (kasus 28)"
//     //     },
//     //     {
//     //       "id": 34,
//     //       "rawText": "Pajak kendaraan usaha bingung (kasus 33)"
//     //     },
//     //     {
//     //       "id": 37,
//     //       "rawText": "Pajak atas penjualan aset bingung (kasus 35)"
//     //     },
//     //     {
//     //       "id": 41,
//     //       "rawText": "Kesulitan lapor SPT nihil (kasus 39)"
//     //     },
//     //     {
//     //       "id": 42,
//     //       "rawText": "Pembetulan SPT bingung prosedurnya (kasus 40)"
//     //     },
//     //     {
//     //       "id": 47,
//     //       "rawText": "Luar negeri income bingung pajaknya (kasus 46)"
//     //     },
//     //     {
//     //       "id": 55,
//     //       "rawText": "Zakat pengurang pajak bingung (kasus 51)"
//     //     },
//     //     {
//     //       "id": 58,
//     //       "rawText": "Pelaporan harta bingung (kasus 56)"
//     //     },
//     //     {
//     //       "id": 60,
//     //       "rawText": "Pajak royalti bingung (kasus 58)"
//     //     },
//     //     {
//     //       "id": 66,
//     //       "rawText": "Bingung membedakan objek pajak (kasus 63)"
//     //     },
//     //     {
//     //       "id": 72,
//     //       "rawText": "Tidak tahu konsekuensi keterlambatan lapor (kasus 70)"
//     //     },
//     //     {
//     //       "id": 74,
//     //       "rawText": "Bingung pajak transaksi online (kasus 72)"
//     //     },
//     //     {
//     //       "id": 80,
//     //       "rawText": "Bingung update data WP (kasus 78)"
//     //     },
//     //     {
//     //       "id": 82,
//     //       "rawText": "Pajak penghasilan sampingan bingung (kasus 80)"
//     //     },
//     //     {
//     //       "id": 90,
//     //       "rawText": "Pajak sewa aset bingung (kasus 88)"
//     //     },
//     //     {
//     //       "id": 94,
//     //       "rawText": "Pajak kendaraan usaha bingung (kasus 93)"
//     //     },
//     //     {
//     //       "id": 97,
//     //       "rawText": "Pajak atas penjualan aset bingung (kasus 95)"
//     //     },
//     //     {
//     //       "id": 101,
//     //       "rawText": "Kesulitan lapor SPT nihil (kasus 99)"
//     //     },
//     //     {
//     //       "id": 102,
//     //       "rawText": "Pembetulan SPT bingung prosedurnya (kasus 100)"
//     //     },
//     //     {
//     //       "id": 108,
//     //       "rawText": "Luar negeri income bingung pajaknya (kasus 106)"
//     //     },
//     //     {
//     //       "id": 113,
//     //       "rawText": "Zakat pengurang pajak bingung (kasus 111)"
//     //     },
//     //     {
//     //       "id": 118,
//     //       "rawText": "Pelaporan harta bingung (kasus 116)"
//     //     },
//     //     {
//     //       "id": 120,
//     //       "rawText": "Pajak royalti bingung (kasus 118)"
//     //     },
//     //     {
//     //       "id": 125,
//     //       "rawText": "Bingung membedakan objek pajak (kasus 123)"
//     //     },
//     //     {
//     //       "id": 132,
//     //       "rawText": "Tidak tahu konsekuensi keterlambatan lapor (kasus 130)"
//     //     },
//     //     {
//     //       "id": 134,
//     //       "rawText": "Bingung pajak transaksi online (kasus 132)"
//     //     },
//     //     {
//     //       "id": 140,
//     //       "rawText": "Bingung update data WP (kasus 138)"
//     //     },
//     //     {
//     //       "id": 141,
//     //       "rawText": "Pajak penghasilan sampingan bingung (kasus 140)"
//     //     },
//     //     {
//     //       "id": 150,
//     //       "rawText": "Pajak sewa aset bingung (kasus 148)"
//     //     },
//     //     {
//     //       "id": 155,
//     //       "rawText": "Pajak kendaraan usaha bingung (kasus 153)"
//     //     },
//     //     {
//     //       "id": 156,
//     //       "rawText": "Pajak atas penjualan aset bingung (kasus 155)"
//     //     },
//     //     {
//     //       "id": 161,
//     //       "rawText": "Kesulitan lapor SPT nihil (kasus 159)"
//     //     },
//     //     {
//     //       "id": 162,
//     //       "rawText": "Pembetulan SPT bingung prosedurnya (kasus 160)"
//     //     },
//     //     {
//     //       "id": 169,
//     //       "rawText": "Luar negeri income bingung pajaknya (kasus 166)"
//     //     },
//     //     {
//     //       "id": 173,
//     //       "rawText": "Zakat pengurang pajak bingung (kasus 171)"
//     //     },
//     //     {
//     //       "id": 179,
//     //       "rawText": "Pelaporan harta bingung (kasus 176)"
//     //     },
//     //     {
//     //       "id": 180,
//     //       "rawText": "Pajak royalti bingung (kasus 178)"
//     //     },
//     //     {
//     //       "id": 185,
//     //       "rawText": "Bingung membedakan objek pajak (kasus 183)"
//     //     },
//     //     {
//     //       "id": 192,
//     //       "rawText": "Tidak tahu konsekuensi keterlambatan lapor (kasus 190)"
//     //     },
//     //     {
//     //       "id": 194,
//     //       "rawText": "Bingung pajak transaksi online (kasus 192)"
//     //     },
//     //     {
//     //       "id": 200,
//     //       "rawText": "Bingung update data WP (kasus 198)"
//     //     },
//     //     {
//     //       "id": 202,
//     //       "rawText": "Pajak penghasilan sampingan bingung (kasus 200)"
//     //     },
//     //     {
//     //       "id": 210,
//     //       "rawText": "Pajak sewa aset bingung (kasus 208)"
//     //     },
//     //     {
//     //       "id": 214,
//     //       "rawText": "Pajak kendaraan usaha bingung (kasus 213)"
//     //     },
//     //     {
//     //       "id": 217,
//     //       "rawText": "Pajak atas penjualan aset bingung (kasus 215)"
//     //     },
//     //     {
//     //       "id": 221,
//     //       "rawText": "Kesulitan lapor SPT nihil (kasus 219)"
//     //     },
//     //     {
//     //       "id": 222,
//     //       "rawText": "Pembetulan SPT bingung prosedurnya (kasus 220)"
//     //     },
//     //     {
//     //       "id": 228,
//     //       "rawText": "Luar negeri income bingung pajaknya (kasus 226)"
//     //     },
//     //     {
//     //       "id": 233,
//     //       "rawText": "Zakat pengurang pajak bingung (kasus 231)"
//     //     },
//     //     {
//     //       "id": 238,
//     //       "rawText": "Pelaporan harta bingung (kasus 236)"
//     //     },
//     //     {
//     //       "id": 240,
//     //       "rawText": "Pajak royalti bingung (kasus 238)"
//     //     },
//     //     {
//     //       "id": 246,
//     //       "rawText": "Bingung membedakan objek pajak (kasus 243)"
//     //     },
//     //     {
//     //       "id": 251,
//     //       "rawText": "Tidak tahu konsekuensi keterlambatan lapor (kasus 250)"
//     //     }
//     //   ],
//     //   "seminars": []
//     // },
//     // {
//     //   "cluster": 4,
//     //   "count": 34,
//     //   "issues": [
//     //     {
//     //       "id": 5,
//     //       "rawText": "Kesulitan memahami aturan perpajakan terbaru (kasus 1)"
//     //     },
//     //     {
//     //       "id": 10,
//     //       "rawText": "Salah isi formulir SPT (kasus 9)"
//     //     },
//     //     {
//     //       "id": 21,
//     //       "rawText": "Kesulitan memahami istilah pajak (kasus 19)"
//     //     },
//     //     {
//     //       "id": 29,
//     //       "rawText": "Kesulitan penyetoran pajak online (kasus 27)"
//     //     },
//     //     {
//     //       "id": 36,
//     //       "rawText": "Myriad data fact upload error (kasus 34)"
//     //     },
//     //     {
//     //       "id": 39,
//     //       "rawText": "Dalam menerbitkan faktur kesulitan (kasus 37)"
//     //     },
//     //     {
//     //       "id": 46,
//     //       "rawText": "CSV gagal upload (kasus 44)"
//     //     },
//     //     {
//     //       "id": 54,
//     //       "rawText": "Ketentuan keberatan pajak sulit (kasus 52)"
//     //     },
//     //     {
//     //       "id": 64,
//     //       "rawText": "Kesulitan memahami aturan perpajakan terbaru (kasus 61)"
//     //     },
//     //     {
//     //       "id": 71,
//     //       "rawText": "Salah isi formulir SPT (kasus 69)"
//     //     },
//     //     {
//     //       "id": 81,
//     //       "rawText": "Kesulitan memahami istilah pajak (kasus 79)"
//     //     },
//     //     {
//     //       "id": 89,
//     //       "rawText": "Kesulitan penyetoran pajak online (kasus 87)"
//     //     },
//     //     {
//     //       "id": 96,
//     //       "rawText": "Myriad data fact upload error (kasus 94)"
//     //     },
//     //     {
//     //       "id": 99,
//     //       "rawText": "Dalam menerbitkan faktur kesulitan (kasus 97)"
//     //     },
//     //     {
//     //       "id": 106,
//     //       "rawText": "CSV gagal upload (kasus 104)"
//     //     },
//     //     {
//     //       "id": 114,
//     //       "rawText": "Ketentuan keberatan pajak sulit (kasus 112)"
//     //     },
//     //     {
//     //       "id": 123,
//     //       "rawText": "Kesulitan memahami aturan perpajakan terbaru (kasus 121)"
//     //     },
//     //     {
//     //       "id": 131,
//     //       "rawText": "Salah isi formulir SPT (kasus 129)"
//     //     },
//     //     {
//     //       "id": 142,
//     //       "rawText": "Kesulitan memahami istilah pajak (kasus 139)"
//     //     },
//     //     {
//     //       "id": 149,
//     //       "rawText": "Kesulitan penyetoran pajak online (kasus 147)"
//     //     },
//     //     {
//     //       "id": 157,
//     //       "rawText": "Myriad data fact upload error (kasus 154)"
//     //     },
//     //     {
//     //       "id": 159,
//     //       "rawText": "Dalam menerbitkan faktur kesulitan (kasus 157)"
//     //     },
//     //     {
//     //       "id": 166,
//     //       "rawText": "CSV gagal upload (kasus 164)"
//     //     },
//     //     {
//     //       "id": 174,
//     //       "rawText": "Ketentuan keberatan pajak sulit (kasus 172)"
//     //     },
//     //     {
//     //       "id": 184,
//     //       "rawText": "Kesulitan memahami aturan perpajakan terbaru (kasus 181)"
//     //     },
//     //     {
//     //       "id": 191,
//     //       "rawText": "Salah isi formulir SPT (kasus 189)"
//     //     },
//     //     {
//     //       "id": 201,
//     //       "rawText": "Kesulitan memahami istilah pajak (kasus 199)"
//     //     },
//     //     {
//     //       "id": 209,
//     //       "rawText": "Kesulitan penyetoran pajak online (kasus 207)"
//     //     },
//     //     {
//     //       "id": 216,
//     //       "rawText": "Myriad data fact upload error (kasus 214)"
//     //     },
//     //     {
//     //       "id": 219,
//     //       "rawText": "Dalam menerbitkan faktur kesulitan (kasus 217)"
//     //     },
//     //     {
//     //       "id": 226,
//     //       "rawText": "CSV gagal upload (kasus 224)"
//     //     },
//     //     {
//     //       "id": 234,
//     //       "rawText": "Ketentuan keberatan pajak sulit (kasus 232)"
//     //     },
//     //     {
//     //       "id": 243,
//     //       "rawText": "Kesulitan memahami aturan perpajakan terbaru (kasus 241)"
//     //     },
//     //     {
//     //       "id": 252,
//     //       "rawText": "Salah isi formulir SPT (kasus 249)"
//     //     }
//     //   ],
//     //   "seminars": []
//     // },
//     // {
//     //   "cluster": 5,
//     //   "count": 14,
//     //   "issues": [
//     //     {
//     //       "id": 7,
//     //       "rawText": "Tidak paham kewajiban UMKM (kasus 5)"
//     //     },
//     //     {
//     //       "id": 9,
//     //       "rawText": "Tidak memahami tarif PPh final UMKM (kasus 6)"
//     //     },
//     //     {
//     //       "id": 57,
//     //       "rawText": "UMKM pajak rumahan tidak paham (kasus 55)"
//     //     },
//     //     {
//     //       "id": 67,
//     //       "rawText": "Tidak paham kewajiban UMKM (kasus 65)"
//     //     },
//     //     {
//     //       "id": 68,
//     //       "rawText": "Tidak memahami tarif PPh final UMKM (kasus 66)"
//     //     },
//     //     {
//     //       "id": 117,
//     //       "rawText": "UMKM pajak rumahan tidak paham (kasus 115)"
//     //     },
//     //     {
//     //       "id": 126,
//     //       "rawText": "Tidak paham kewajiban UMKM (kasus 125)"
//     //     },
//     //     {
//     //       "id": 128,
//     //       "rawText": "Tidak memahami tarif PPh final UMKM (kasus 126)"
//     //     },
//     //     {
//     //       "id": 177,
//     //       "rawText": "UMKM pajak rumahan tidak paham (kasus 175)"
//     //     },
//     //     {
//     //       "id": 188,
//     //       "rawText": "Tidak paham kewajiban UMKM (kasus 185)"
//     //     },
//     //     {
//     //       "id": 187,
//     //       "rawText": "Tidak memahami tarif PPh final UMKM (kasus 186)"
//     //     },
//     //     {
//     //       "id": 237,
//     //       "rawText": "UMKM pajak rumahan tidak paham (kasus 235)"
//     //     },
//     //     {
//     //       "id": 248,
//     //       "rawText": "Tidak paham kewajiban UMKM (kasus 245)"
//     //     },
//     //     {
//     //       "id": 245,
//     //       "rawText": "Tidak memahami tarif PPh final UMKM (kasus 246)"
//     //     }
//     //   ],
//     //   "seminars": []
//     // }
//   ]
// }

export default function Home() {
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [firstLoad, setFirstLoad] = useState(true);
  const [data, setData] = useState<ClusterResult[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(selectedCluster);

  const clusters = useMemo(
    () => (data.map((d: ClusterResult) => d.cluster)),
    [data]
  );

  const filteredData = useMemo(() => {
    return data.filter((cluster) => {
      // filter cluster
      if (
        selectedCluster !== "all" &&
        cluster.cluster !== Number(selectedCluster)
      ) {
        return false;
      }

      // search
      if (!search) return true;

      const s = search.toLowerCase();

      const issueMatch = cluster.issues.some((i) =>
        i.rawText.toLowerCase().includes(s)
      );

      const seminarMatch = cluster.seminars.some((sem) =>
        sem.title.toLowerCase().includes(s)
      );

      return issueMatch || seminarMatch;
    });
  }, [data, search, selectedCluster]);

  const placeholders = [
    "Kesulitan memahami aturan perpajakan terbaru?",
    "Tidak mengetahui cara menghitung PPh?",
    "Tidak memahami tarif PPh final UMKM?",
    "Kesulitan memahami istilah pajak",
    "Tidak tahu tata cara pembayaran?",
  ];

  const mappedErrorMessages = (errorMessages: string) => {
    switch (errorMessages) {
      case "text_required":
        toast.error("input text wajib diisi",{ position: "top-right" });
        break;

      case "text_too_short":
        toast.warning("input text terlalu pendek, jelaskan lebih detail",{ position: "top-right" });
        break;

      case "text_too_long":
        toast.warning("input text terlalu panjang, mohon diringkas",{ position: "top-right" });
        break;

      case "text_ml_service_error":
        toast.error(
          "Layanan analisis sedang bermasalah, coba lagi nanti"
        );
        break;

      default:
        toast.error("Terjadi kesalahan yang tidak diketahui");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const result = await createIssueFromText(text);
      setData(result.clusters);
      setFirstLoad(false);
    } catch (error) {
      console.log(error);
      const message = error instanceof Error ? error.message : String(error);
      mappedErrorMessages(message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center relative">
      <div className="w-full h-full max-w-360">
        <div className="w-full max-w-360 h-full flex flex-col justify-center items-center relative">
          <Image src="/djp-logo.png" alt="city" className="absolute w-48 h-16 mt-5 top-0 left-0 z-10" width={500} height={500} />
          {firstLoad ? <div className="h-160 flex flex-col justify-center  items-center px-4">
            <h1 className="mb-1 text-6xl text-center sm:text-5xl dark:text-white text-black">
              SMARTAX
            </h1>
            <h2 className="mb-10 sm:mb-20 text-lg text-center sm:text-5xl dark:text-white text-black">
              Let the data teach smarter.
            </h2>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div> :
            <div className="  h-full w-full flex flex-col px-10 mt-20">
                <div className="w-full absolute top-28 right-0 left-0 px-10 flex justify-between bg-white  z-10">
                  <ClusterFilter
                    clusters={clusters}
                    search={search}
                    selectedCluster={selectedCluster}
                    onSearchChange={setSearch}
                    onClusterChange={setSelectedCluster}

                  />

                  <Button
                    className="bg-[#06275D]"
                    variant="default"
                    onClick={() => exportClustersToCSV(search || selectedCluster !== "all" ? filteredData : data)}
                    disabled={filteredData.length === 0 || data.length === 0}
                  >
                    <Download className="mr-2 h-4 w-4 " />
                    Export CSV
                  </Button>
                </div>
              <div className=" h-full w-full max-w-360 mt-32">
                <div className="w-full h-3/4 flex mb-36 overflow-scroll">
                  <ClusterTable data={search || selectedCluster !== "all" ? filteredData : data} />
                </div>
              </div>

              <div className="absolute bottom-20 w-full">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          }

        </div>

      </div>
        <div className="w-full absolute bottom-0 bg-[#06275D] text-white font-bold p-3 flex justify-center">
          <div className="w-full max-w-360 pl-5">
            <p>LATSAR 2025-BDK MALANG KEMENTRIAN KEUANGAN</p>
          </div>
        </div>
    </div>
  );
}
