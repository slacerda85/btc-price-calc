"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

export function BitcoinCalculator() {
  const [electricityCost, setElectricityCost] = useState<number>(0.15)
  const [txFeePerBlock, setTxFeePerBlock] = useState<number>(0.1)
  const [blockSubsidy, setBlockSubsidy] = useState<number>(3.125)
  const [useSatoshis, setUseSatoshis] = useState<boolean>(false)
  const [hashRate, setHashRate] = useState<number>(650) // Default to 650 EH/s
  
  const calculateEstimatedPrice = (): number => {
    const blocksPerDay = 144; // 144 blocks are mined per day on average
    const revenuePerBlock = txFeePerBlock * (useSatoshis ? 1e-8 : 1); // Convert Satoshis to BTC if needed
    const revenuePerDay = revenuePerBlock * blocksPerDay;
    const blockSubsidyPerDay = blockSubsidy * blocksPerDay;
    const totalRevenuePerDay = revenuePerDay + blockSubsidyPerDay;
  
    // Assuming the total hash power is given in EH/s (Exahashes per second)
    // We need to convert this to TH/s for our previous calculations
    const totalHashPowerTHs = hashRate * 1e6; // Convert EH/s to TH/s
  
    // Using the same hardware efficiency as before for simplicity
    const hardwareEfficiency = 473; // TH/s per unit
    const powerConsumptionPerUnit = 5676; // Watts per unit
  
    // Calculate the number of units needed for the network hash rate
    const unitsNeeded = totalHashPowerTHs / hardwareEfficiency;
  
    // Total power consumption in kW
    const totalPowerConsumption = (unitsNeeded * powerConsumptionPerUnit) / 1000; // Convert to kW
  
    // Total electricity cost for the network per day
    const totalElectricityCostPerDay = totalPowerConsumption * 24 * electricityCost;
  
    // Now, calculate the cost per Bitcoin based on electricity cost divided by total revenue in BTC
    const costPerBitcoin = totalElectricityCostPerDay / totalRevenuePerDay;
  
    return costPerBitcoin;
  }

  const estimatedPrice = isNaN(calculateEstimatedPrice()) ? 0 : calculateEstimatedPrice();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className='flex items-center gap-x-2'>
          <Image src="/btc-logo.png" alt="Bitcoin Logo" width={36} height={36} />
          Bitcoin Price Estimator
          </CardTitle>
        <CardDescription>Calculate estimated Bitcoin price based on electricity cost, transaction fees, and network hash rate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="electricity-cost">Electricity Cost (USD per kWh)</Label>
          <Input
            id="electricity-cost"
            type="number"
            value={electricityCost}
            onChange={(e) => setElectricityCost(parseFloat(e.target.value))}
            step="0.01"
            min="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transaction-fee">
            Avg Transaction Fees per block ({useSatoshis ? "Satoshis" : "BTC"})
          </Label>
          <Input
            id="transaction-fee"
            type="number"
            value={txFeePerBlock}
            onChange={(e) => setTxFeePerBlock(parseFloat(e.target.value))}
            step={useSatoshis ? "1" : "0.00000001"}
            min="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transaction-fee">
           Block subsidy ({useSatoshis ? "Satoshis" : "BTC"})
          </Label>
          <Input
            id="block-subsidy"
            type="number"
            value={blockSubsidy}
            onChange={(e) => setBlockSubsidy(parseFloat(e.target.value))}
            step={useSatoshis ? "1" : "0.00000001"}
            min="0"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="fee-unit"
            checked={useSatoshis}
            onCheckedChange={setUseSatoshis}
            disabled
          />
          <Label htmlFor="fee-unit" aria-disabled={true}>Use Satoshis</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hash-rate">Network Hash Rate (EH/s)</Label>
          <Input
            id="hash-rate"
            type="number"
            value={hashRate}
            onChange={(e) => setHashRate(parseFloat(e.target.value))}
            step="1"
            min="0"
          />
        </div>
        <div className="pt-4">
          <Label>Estimated Bitcoin Price (USD)</Label>
          <div className="text-2xl font-bold">${
          estimatedPrice.toFixed(2)
          }</div>
        </div>
      </CardContent>
    </Card>
  )
}