import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen flex justify-center bg-white relative overflow-hidden">
      <div className="w-full max-w-360 relative z-10">
      {/* Background pattern (hexagon soft) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -bottom-24 left-1/3 w-150 h-150 bg-yellow-300 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-3">
          <Image src="/djp-logo.png" alt="city" className="absolute w-48 h-16 mt-5 top-0 left-0 z-10 bg-red-400" width={500} height={500} />
        </div>

        {/* <div className="text-3xl font-extrabold tracking-wide">
          SMART<span className="text-black">AX</span>
        </div> */}

        <div className="flex">
        <Image src="/icon-tax.png" alt="bee" className="w-10 mr-3" width={50} height={50} />
        <Image src="/icon-smartax.png" alt="city" className="w-56" width={300} height={100} />
        </div>
      </header>

      {/* Content */}
      <section className="h-full px-10 py-12 max-w-360">
        <div className="space-y-6 text-gray-800 leading-relaxed">
          <p>
            <strong>SMARTAX</strong> dikembangkan sebagai inisiatif pembelajaran
            perpajakan yang memanfaatkan machine learning untuk menghadirkan
            edukasi yang lebih adaptif, terarah, dan berbasis kebutuhan nyata
            Wajib Pajak. Kami percaya bahwa peningkatan kepatuhan tidak hanya
            bergantung pada regulasi, tetapi juga pada kemampuan organisasi
            untuk memahami karakteristik setiap Wajib Pajak secara lebih
            mendalam.
          </p>

          <p>
            Melalui pemetaan variabel masalah dan integrasi pengetahuan yang
            dimiliki DJP, SMARTAX dirancang untuk memberikan rekomendasi materi,
            metode, dan media edukasi yang paling relevan. Platform ini menjadi
            jembatan antara data dan kebijakan pembinaan kepatuhan.
          </p>

          <p>
            SMARTAX hadir untuk mendukung transformasi digital DJP, mendorong
            kemajuan pengetahuan, pengambilan keputusan berbasis data, serta
            model pelayanan edukasi yang modern dan adaptif. Dengan SMARTAX,
            terdapat komitmen menghadirkan solusi inovatif yang membantu KPP
            meningkatkan kualitas pembinaan, memperkuat kepatuhan, dan pada
            akhirnya mengoptimalkan penerimaan negara.
          </p>
        </div>
      </section>
      <div className="w-full max-w-360 relative">
        <Image src="/bee.png" alt="bee" className="w-24 drop-shadow-xl absolute bottom-36 right-10  animate-bounce" width={300} height={300} />
      </div>
      </div>


      <div className="w-full absolute bottom-0 bg-[#06275D] text-white font-bold p-3 flex justify-center">
        <div className="w-full max-w-360 pl-5">
          <p>LATSAR 2025-BDK MALANG KEMENTRIAN KEUANGAN</p>
        </div>
      </div>
    </main>
  );
}
