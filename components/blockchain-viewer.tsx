"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Link, Clock, CheckCircle, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Transaction {
  id: string
  vehicleNumber: string
  amount: number
  timestamp: string
  blockchainHash: string
  status: string
}

interface Block {
  index: number
  timestamp: string
  transactions: Transaction[]
  previousHash: string
  hash: string
  nonce: number
}

interface BlockchainViewerProps {
  transactions: Transaction[]
}

export default function BlockchainViewer({ transactions }: BlockchainViewerProps) {
  const { toast } = useToast()

  // Simulate blockchain blocks
  const generateBlocks = (): Block[] => {
    const blocks: Block[] = []
    const transactionsPerBlock = 3

    for (let i = 0; i < Math.ceil(transactions.length / transactionsPerBlock); i++) {
      const blockTransactions = transactions.slice(i * transactionsPerBlock, (i + 1) * transactionsPerBlock)

      if (blockTransactions.length > 0) {
        const previousHash = i === 0 ? "0000000000000000" : blocks[i - 1].hash
        const blockData = {
          index: i + 1,
          timestamp: blockTransactions[0]?.timestamp || new Date().toISOString(),
          transactions: blockTransactions,
          previousHash,
          hash: generateHash(i + 1, blockTransactions, previousHash),
          nonce: Math.floor(Math.random() * 1000000),
        }
        blocks.push(blockData)
      }
    }

    return blocks
  }

  const generateHash = (index: number, transactions: Transaction[], previousHash: string): string => {
    const data = `${index}${JSON.stringify(transactions)}${previousHash}`
    // Simulate SHA-256 hash
    return `0000${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
  }

  const blocks = generateBlocks()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Hash copied successfully",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Blockchain Explorer
          </CardTitle>
          <CardDescription>View the immutable blockchain ledger of all toll transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{blocks.length}</div>
              <div className="text-sm text-gray-600">Total Blocks</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{transactions.length}</div>
              <div className="text-sm text-gray-600">Total Transactions</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {blocks.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="text-center py-8">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blocks yet</h3>
            <p className="text-gray-500">Blocks will appear here as transactions are processed</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <Card key={block.index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {block.index}
                    </div>
                    Block #{block.index}
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(block.timestamp).toLocaleString()}
                  </span>
                  <span>{block.transactions.length} transactions</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Block Hash */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Block Hash:</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(block.hash)} className="h-6 px-2">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="font-mono text-xs bg-gray-100 p-2 rounded break-all">{block.hash}</div>
                </div>

                {/* Previous Hash */}
                {block.previousHash !== "0000000000000000" && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-600">Previous Hash:</span>
                    <div className="font-mono text-xs bg-gray-100 p-2 rounded break-all">{block.previousHash}</div>
                  </div>
                )}

                {/* Transactions */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-600">Transactions:</span>
                  <div className="space-y-2">
                    {block.transactions.map((tx) => (
                      <div key={tx.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{tx.vehicleNumber}</span>
                          <span className="font-bold text-green-600">${tx.amount.toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                          Hash: {tx.blockchainHash.substring(0, 32)}...
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Block Details */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <span className="text-sm text-gray-600">Nonce:</span>
                    <div className="font-mono text-sm">{block.nonce}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Difficulty:</span>
                    <div className="font-mono text-sm">0000</div>
                  </div>
                </div>

                {/* Chain Link */}
                {index < blocks.length - 1 && (
                  <div className="flex justify-center pt-2">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Link className="h-4 w-4" />
                      <span className="text-sm">Linked to next block</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
