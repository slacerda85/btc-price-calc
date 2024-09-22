import { BitcoinCalculator } from "@/components/bitcoin-calculator";

export default function Home() {
  return (
    <div className="bg-[url('/btc-bg.jpg')] bg-cover bg-center">
    <div className="min-h-screen p-8 flex items-center justify-items-center backdrop-blur-sm bg-black/30">
      <BitcoinCalculator />
    </div>
    </div>
  );
}
