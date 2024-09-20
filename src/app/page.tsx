import { BitcoinCalculator } from "@/components/bitcoin-calculator";

export default function Home() {
  return (
    <div className="bg-black  flex items-center justify-items-center min-h-screen p-8">
      <BitcoinCalculator />
    </div>
  );
}
