"use client";

import type React from "react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import ReactFlow, {
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { Save, Code } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { FlowControls } from "@/components/flow-builder/flowcontrol";
import { CallTransferNode } from "@/components/flow-builder/call-transfer-node";
import { ApiRequestNode } from "@/components/flow-builder/api-request-node";
import { EndCallNode } from "@/components/flow-builder/end-call-node";
import { StartNode } from "@/components/flow-builder/start-node";
import { NodesPanel } from "@/components/flow-builder/nodesPanel";
import { EmailNode } from "@/components/flow-builder/emailNode";
import { NodeForm } from "@/components/flow-builder/nodeForm";
import { ConditionalNode } from "@/components/flow-builder/conditionalNode";
import { RouterNode } from "@/components/flow-builder/routerNode";
import { ModelNode } from "@/components/flow-builder/modelNode";
import { WebhookNode } from "@/components/flow-builder/webHookNode";

const nodeTypes = {
  callTransfer: CallTransferNode,
  endCall: EndCallNode,
  apiRequest: ApiRequestNode,
  startNode: StartNode,
  email: EmailNode,
  condition: ConditionalNode,
  route: RouterNode,
  model: ModelNode,
  webhook: WebhookNode,
};

export default function FlowBuilderPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addingFromNodeId, setAddingFromNodeId] = useState<string | null>(null);
  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>(
    []
  );
  const [historyIndex, setHistoryIndex] = useState(-1);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSheetOpen(true);
  }, []);

  const handleAddNode = useCallback((fromNodeId: string) => {
    setAddingFromNodeId(fromNodeId);
    setDialogOpen(true);
  }, []);

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  function addNode(type: string, position?: { x: number; y: number }) {
    const newNode: Node = {
      id: `${Date.now()}`,
      type, // This should be "startNode" for StartNode
      data: {
        label: `${type} node`,
        onAddNode: handleAddNode,
        onDeleteNode: handleDeleteNode,
      },
      position: position || {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }
  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    if (type) {
      const bounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      addNode(type, position);
    }
  }

  // Save history on node/edge change
  const saveHistory = (newNodes: Node[], newEdges: Edge[]) => {
    const newHistory = [
      ...history.slice(0, historyIndex + 1),
      { nodes: newNodes, edges: newEdges },
    ];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const onUndo = () => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const onRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleNodesChange = (changes: any) => {
    onNodesChange(changes);
    saveHistory(nodes, edges);
  };

  const handleEdgesChange = (changes: any) => {
    onEdgesChange(changes);
    saveHistory(nodes, edges);
  };

  const handleConnect = (connection: Connection) => {
    const newEdges = addEdge({ ...connection, animated: true }, edges);
    setEdges(newEdges);
    saveHistory(nodes, newEdges);
  };

  // Update existing nodes with action handlers
  const nodesWithHandlers = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      id: node.id,
      onAddNode: handleAddNode,
      onDeleteNode: handleDeleteNode,
    },
  }));

  return (
    <div className="h-full w-screen">
      <DashboardLayout showNavBar={false} padding="0">
        <div className="flex-1 h-full w-full justify-center items-center">
          <div className="absolute top-4 right-4 z-20 flex flex-row gap-2">
            <Button className="bg-gray-200 text-black-foreground flex items-center hover:bg-gray-300">
              <Code className="h-4 w-4" />
              <span>Code</span>
            </Button>
            <Button className="bg-primary text-primary-foreground flex items-center ">
              <Save className="h-4 w-4" />
              <span>Publish</span>
            </Button>
          </div>

          {sheetOpen && selectedNode && (
            <div className="absolute right-4 top-20 z-30 bg-white rounded-lg shadow-lg p-3 w-[350px] max-w-full">
              <NodeForm
                node={selectedNode}
                type={selectedNode?.type}
                onCancel={() => setSheetOpen(false)}
                onSave={() => setSheetOpen(false)}
              />
            </div>
          )}

          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="rounded-lg px-6 py-4  text-sm font-medium text-gray-400">
                Please drag and drop a node from the left panel to start
                building your flow.
              </div>
            </div>
          )}

          <div className="absolute z-10 m-4 flex space-x-2">
            <NodesPanel />
          </div>
          {/* Fixed ReactFlow container with proper height and explicit dimensions */}
          <div className="h-screen w-full min-h-0">
            <ReactFlow
              nodes={nodesWithHandlers}
              edges={edges}
              onNodesChange={handleNodesChange}
              onEdgesChange={handleEdgesChange}
              onConnect={handleConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              style={{ width: "100%", height: "100%" }}
              minZoom={0.1}
              maxZoom={2}
              onDrop={handleDrop}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
            >
              <MiniMap position="bottom-left" />

              <FlowControls onUndo={onUndo} onRedo={onRedo} />
              {/* <Controls /> */}
              <Background gap={12} size={1} />
            </ReactFlow>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
