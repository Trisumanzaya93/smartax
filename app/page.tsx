import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-[#F8E36A] flex flex-col items-center ">
      <div className="w-full max-w-360 h-full flex items-center justify-center relative overflow-hidden">
        <div className="w-[50%] h-full flex justify-center items-center pl-10">
          <Image src="/djp-logo.png" alt="city" className="absolute w-48 h-16 mt-5 top-0 left-0 bg-red-400" width={500} height={500} />
          <Image src="/city.png" alt="city" className="w-full h-1/2" width={500} height={500} />
        </div>
        <div className="w-[50%] flex">
          <div className="-ml-32 mt-20  animate-bounce">
            <Image src="/bee.png" alt="bee" className="w-60 drop-shadow-xl" width={300} height={300} />
          </div>
          <div className="flex flex-col">
            <div className="flex">
            <Image src="/icon-tax.png" alt="bee" className="w-20 mr-3" width={50} height={50} />
            <Image src="/icon-smartax.png" alt="city" className="w-96" width={300} height={100} />
            </div>
            <p className="text-4xl font-bold leading-12 text-gray-700 max-w-xl">
              Smart Machine Learning
            </p>
            <p className="text-4xl leading-12 text-gray-700 max-w-xl">
              for Adaptive Tax <br/> Education
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="/smartax"
                className="bg-[#06275D] text-white px-8 py-3 rounded-xl shadow hover:opacity-80 transition font-bold"
              >
                Go To Smartax
              </a>
              <a
                href="/about"
                className="bg-[#06275D] text-white px-8 py-3 rounded-xl shadow hover:opacity-80 transition font-bold"
              >
                Learn About Us
              </a>
            </div>
          </div>
        </div>


      </div>
        <div className=" w-full bg-[#06275D] text-white font-bold p-3 flex justify-center ">
          <div className="w-full max-w-360 pl-5">
          <p>LATSAR 2025-BDK MALANG KEMENTRIAN KEUANGAN</p>
          </div>
        </div>
    </main>
  );
}
