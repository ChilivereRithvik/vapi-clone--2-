"use client";

import type React from "react";
import { useCallback, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { Phone, PhoneOff, Webhook, ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
// import { useRouter } from "next/navigation";

// Custom node types
const nodeTypes = {
  callTransfer: CallTransferNode,
  endCall: EndCallNode,
  apiRequest: ApiRequestNode,
};

function CallTransferNode({ data }: { data: any }) {
  return (
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
  );
}

function EndCallNode({ data }: { data: any }) {
  return (
    <Card className="min-w-[200px] border-2 border-red-500 bg-card p-4">
      <div className="flex items-center gap-2">
        <PhoneOff className="h-5 w-5 text-red-500" />
        <div>
          <div className="font-semibold">End Call</div>
          <div className="text-xs text-muted-foreground">
            {data.label || "Terminate call"}
          </div>
        </div>
      </div>
    </Card>
  );
}

function ApiRequestNode({ data }: { data: any }) {
  return (
    <Card className="min-w-[200px] border-2 border-green-500 bg-card p-4">
      <div className="flex items-center gap-2">
        <Webhook className="h-5 w-5 text-green-500" />
        <div>
          <div className="font-semibold">API Request</div>
          <div className="text-xs text-muted-foreground">
            {data.label || "Make API call"}
          </div>
        </div>
      </div>
    </Card>
  );
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 50 },
  },
];

const initialEdges: Edge[] = [];

export default function FlowBuilderPage() {
  //   const router = useRouter();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSheetOpen(true);
  }, []);

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type,
      data: { label: `${type} node` },
      position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                <Link to="/call-flows" />;
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Flow Builder</h1>
              <p className="text-muted-foreground">
                Design your agent's conversation flow
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => addNode("callTransfer")}>
              <Phone className="mr-2 h-4 w-4" />
              Call Transfer
            </Button>
            <Button variant="outline" onClick={() => addNode("endCall")}>
              <PhoneOff className="mr-2 h-4 w-4" />
              End Call
            </Button>
            <Button variant="outline" onClick={() => addNode("apiRequest")}>
              <Webhook className="mr-2 h-4 w-4" />
              API Request
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Flow
            </Button>
          </div>
        </div>

        <Card className="h-[calc(100vh-200px)] overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background gap={12} size={1} />
          </ReactFlow>
        </Card>
      </div>

      {/* Node Configuration Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Configure Node</SheetTitle>
            <SheetDescription>
              {selectedNode?.type === "callTransfer" &&
                "Configure call transfer settings"}
              {selectedNode?.type === "endCall" &&
                "Configure end call behavior"}
              {selectedNode?.type === "apiRequest" &&
                "Configure API request parameters"}
              {!selectedNode?.type && "Select a node to configure"}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Call Transfer Configuration */}
            {selectedNode?.type === "callTransfer" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="transfer-number">Transfer Phone Number</Label>
                  <Input id="transfer-number" placeholder="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transfer-message">Transfer Message</Label>
                  <Textarea
                    id="transfer-message"
                    placeholder="Please hold while I transfer you..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transfer-timeout">Timeout (seconds)</Label>
                  <Input
                    id="transfer-timeout"
                    type="number"
                    defaultValue="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transfer-fallback">Fallback Action</Label>
                  <Select>
                    <SelectTrigger id="transfer-fallback">
                      <SelectValue placeholder="Select fallback" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="voicemail">
                        Send to Voicemail
                      </SelectItem>
                      <SelectItem value="retry">Retry Transfer</SelectItem>
                      <SelectItem value="end">End Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* End Call Configuration */}
            {selectedNode?.type === "endCall" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="end-message">Goodbye Message</Label>
                  <Textarea
                    id="end-message"
                    placeholder="Thank you for calling. Have a great day!"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-action">After Call Action</Label>
                  <Select>
                    <SelectTrigger id="end-action">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="email">Send Email Summary</SelectItem>
                      <SelectItem value="sms">Send SMS</SelectItem>
                      <SelectItem value="webhook">Trigger Webhook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-survey">Post-Call Survey</Label>
                  <Select>
                    <SelectTrigger id="end-survey">
                      <SelectValue placeholder="Select survey" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Survey</SelectItem>
                      <SelectItem value="satisfaction">
                        Satisfaction Survey
                      </SelectItem>
                      <SelectItem value="nps">NPS Survey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* API Request Configuration */}
            {selectedNode?.type === "apiRequest" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="api-url">API Endpoint URL</Label>
                  <Input
                    id="api-url"
                    placeholder="https://api.example.com/endpoint"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-method">HTTP Method</Label>
                  <Select>
                    <SelectTrigger id="api-method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-headers">Headers (JSON)</Label>
                  <Textarea
                    id="api-headers"
                    placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-body">Request Body (JSON)</Label>
                  <Textarea
                    id="api-body"
                    placeholder='{"key": "value"}'
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-timeout">Timeout (seconds)</Label>
                  <Input id="api-timeout" type="number" defaultValue="10" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-retry">Retry on Failure</Label>
                  <Select>
                    <SelectTrigger id="api-retry">
                      <SelectValue placeholder="Select retry policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Retry</SelectItem>
                      <SelectItem value="once">Retry Once</SelectItem>
                      <SelectItem value="twice">Retry Twice</SelectItem>
                      <SelectItem value="three">Retry 3 Times</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setSheetOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setSheetOpen(false)}>
                Save Configuration
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
