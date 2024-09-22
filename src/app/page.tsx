import { BitcoinCalculator } from "@/components/bitcoin-calculator";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-[url('/btc-bg.jpg')] bg-cover bg-center">
    <div className="min-h-screen p-8 flex flex-col items-center justify-center gap-4 backdrop-blur-sm bg-black/30">
      <BitcoinCalculator />
      <Footer />
    </div>
    </div>
  );
}
