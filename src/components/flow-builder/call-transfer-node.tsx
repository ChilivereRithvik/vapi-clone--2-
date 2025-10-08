import { Phone } from "lucide-react";
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";

interface phoneNumber {
  phoneNumber: string;
}

interface callTransferNodeData {
  nodeType: string;
  destination: {
    phoneNumber?: string;
    SIP?: string;
  };
}

export function CallTransferNode({ data }: { data: any }) {
  return (
    <NodeWithActions data={data} type="callTransfer">
      <Card className="min-w-[200px] border-2 border-blue-500 bg-card p-4">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-blue-500" />
          <div>
            <div className="font-semibold">Call Transfer</div>
            <div className="text-xs text-muted-foreground">
              {data.label || "Transfer call"}
            </div>
          </div>
        </div>
      </Card>
    </NodeWithActions>
  );
}
