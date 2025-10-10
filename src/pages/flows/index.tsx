"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
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
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { Save, Code, Copy } from "lucide-react";
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
import { WhatsAppNode } from "@/components/flow-builder/whatsAppNode";
import ExportJsonModal from "@/components/flow-builder/ExportJsonModal";
import {
  FlowProvider,
  useFlowContext,
  type FlowData,
} from "@/contexts/FlowContext";

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
  whatsApp: WhatsAppNode,
};

function FlowBuilderContent() {
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
  const [copied, setCopied] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const reactFlowInstance = useReactFlow();
  const { getCompleteFlowData, clearNodeFormData } = useFlowContext();

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
      // Clear form data for deleted node
      clearNodeFormData(nodeId);
    },
    [setNodes, setEdges, clearNodeFormData]
  );

  // Updated save functionality with proper typing
  const handleSave = useCallback((): void => {
    const completeFlowData: FlowData = getCompleteFlowData(nodes, edges);
    console.log("Complete Flow Data with Form Data:", completeFlowData);

    // Save to localStorage
    localStorage.setItem("flowData", JSON.stringify(completeFlowData));

    // Show success message
    alert(
      "Flow saved successfully! Check console for complete data including all form inputs."
    );
  }, [nodes, edges, getCompleteFlowData]);

  // Add load functionality
  // const handleLoadFlow = useCallback((): void => {
  //   const input: HTMLInputElement = document.createElement("input");
  //   input.type = "file";
  //   input.accept = ".json";
  //   input.onchange = (e: Event) => {
  //     const file = (e.target as HTMLInputElement).files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = (e: ProgressEvent<FileReader>) => {
  //         try {
  //           const jsonData: FlowData = JSON.parse(e.target?.result as string);
  //           const { nodes: loadedNodes, edges: loadedEdges } =
  //             loadFlowFromJson(jsonData);
  //           setNodes(loadedNodes);
  //           setEdges(loadedEdges);
  //           console.log("Flow loaded successfully with form data");
  //         } catch (error) {
  //           console.error("Error loading flow:", error);
  //           alert("Error loading flow file");
  //         }
  //       };
  //       reader.readAsText(file);
  //     }
  //   };
  //   input.click();
  // }, [loadFlowFromJson, setNodes, setEdges]);

  function addNode(type: string, position?: { x: number; y: number }) {
    const newNode: Node = {
      id: `${Date.now()}`,
      type,
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

  const handleNodesChange = (changes: Parameters<typeof onNodesChange>[0]) => {
    onNodesChange(changes);
    saveHistory(nodes, edges);
  };

  const handleEdgesChange = (changes: Parameters<typeof onEdgesChange>[0]) => {
    onEdgesChange(changes);
    saveHistory(nodes, edges);
  };

  const handleConnect = (connection: Connection): void => {
    const newEdges: Edge[] = addEdge({ ...connection, animated: true }, edges);
    setEdges(newEdges);
    saveHistory(nodes, newEdges);
  };

  const nodesWithHandlers = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      id: node.id,
      onAddNode: handleAddNode,
      onDeleteNode: handleDeleteNode,
    },
  }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        onUndo();
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") {
        e.preventDefault();
        onRedo();
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedNode) handleDeleteNode(selectedNode.id);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "=") {
        e.preventDefault();
        reactFlowInstance.zoomIn();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        reactFlowInstance.zoomOut();
      }

      if (e.key.toLowerCase() === "f") {
        reactFlowInstance.fitView();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUndo, onRedo, reactFlowInstance, selectedNode, handleDeleteNode]);

  // Add handler for applying new JSON
  const handleApplyJson = useCallback(
    (newJson: FlowData) => {
      if (newJson.nodes && newJson.edges) {
        setNodes(newJson.nodes);
        setEdges(newJson.edges);
      }
    },
    [setNodes, setEdges]
  );

  return (
    <div className="h-full w-screen">
      <DashboardLayout showNavBar={false} padding="0">
        <div className="flex-1 h-full w-full justify-center items-center">
          <div className="absolute top-4 right-4 z-20 flex flex-row gap-2">
            <Button
              onClick={() => setExportModalOpen(true)}
              className="bg-gray-200 text-black-foreground flex items-center hover:bg-gray-300"
            >
              <Code className="h-4 w-4" />
              <span>View JSON</span>
            </Button>
            <Button className="bg-primary text-primary-foreground flex items-center ">
              <Save className="h-4 w-4" />
              <span>Publish</span>
            </Button>
            <Button
              onClick={handleSave}
              className="bg-primary text-primary-foreground flex items-center "
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </Button>
          </div>

          <div className="absolute left-4 top-26 z-20"></div>
          <ExportJsonModal
            open={exportModalOpen}
            onClose={() => setExportModalOpen(false)}
            flowData={getCompleteFlowData(nodes, edges)}
            onApplyJson={handleApplyJson}
          />

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

          <div className="absolute left-4 top-4 z-20 bg-gradient-to-b from-background to-muted/20  rounded-lg shadow p-2 max-w-sm flex flex-col gap-1">
            <div className="font-semibold text-sm">
              <span className="font-normal">Unknown work Flow</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-mono">
                d1d7ba82-00bb-4e13-99c8-b26ab1fb349f…
              </span>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  navigator.clipboard.writeText(
                    "d1d7ba82-00bb-4e13-99c8-b26ab1fb349f"
                  ); // copy full ID
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500); // reset after 1.5s
                }}
                className="rounded hover:bg-gray-200 transition-colors cursor-pointer"
                // title="Copy full ID"
                // size={2}
              >
                <Copy className="w-2 h-2 text-gray-600" />
              </Button>
              {copied && (
                <span className="text-green-500 text-xs">Copied!</span>
              )}
            </div>
          </div>
          <div className="absolute left-4 top-26 z-20">
            <NodesPanel />
          </div>

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
              proOptions={{ hideAttribution: true }}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
            >
              <MiniMap position="bottom-left" />
              <FlowControls onUndo={onUndo} onRedo={onRedo} />
              <Background gap={12} size={1} />
            </ReactFlow>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default function FlowBuilderPage() {
  return (
    <ReactFlowProvider>
      <FlowProvider>
        <FlowBuilderContent />
      </FlowProvider>
    </ReactFlowProvider>
  );
}
