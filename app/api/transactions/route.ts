import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (in production, use a real database)
const transactions: any[] = []

// Simulate blockchain hash generation
function generateBlockchainHash(data: any): string {
  const timestamp = Date.now()
  const dataString = JSON.stringify(data) + timestamp
  // Simulate SHA-256 hash
  return `0x${Math.random().toString(16).substring(2, 15)}${Math.random().toString(16).substring(2, 15)}${Math.random().toString(16).substring(2, 15)}${Math.random().toString(16).substring(2, 15)}`
}

// Simulate blockchain verification
function verifyOnBlockchain(transaction: any): boolean {
  // Simulate network delay and verification process
  return Math.random() > 0.1 // 90% success rate
}

export async function GET() {
  return NextResponse.json({ transactions })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { vehicleNumber, vehicleType, tollBooth, amount } = body

    // Validate input
    if (!vehicleNumber || !vehicleType || !tollBooth || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create transaction
    const transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      vehicleNumber,
      vehicleType,
      tollBooth,
      amount: Number.parseFloat(amount),
      timestamp: new Date().toISOString(),
      blockchainHash: generateBlockchainHash({ vehicleNumber, vehicleType, tollBooth, amount }),
      status: "pending",
    }

    // Simulate blockchain processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Verify on blockchain
    const isVerified = verifyOnBlockchain(transaction)

    if (isVerified) {
      transaction.status = "confirmed"
      transactions.unshift(transaction) // Add to beginning of array

      return NextResponse.json({
        success: true,
        transaction,
        message: "Transaction confirmed on blockchain",
      })
    } else {
      transaction.status = "failed"
      return NextResponse.json({ error: "Blockchain verification failed" }, { status: 500 })
    }
  } catch (error) {
    console.error("Transaction processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
