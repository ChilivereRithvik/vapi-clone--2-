"use client";

import { ApinodeFormType } from "@/components/flow-builder/api-request-node";
import { CallTransferNodeType } from "@/components/flow-builder/call-transfer-node";
import { ConditionFormType } from "@/components/flow-builder/conditionalNode";
import { EmailFormDataType } from "@/components/flow-builder/emailNode";
import { ModelFormValuesType } from "@/components/flow-builder/modelNode";
import { startNodeFormType } from "@/components/flow-builder/start-node";
import { WebhookFormValuesType } from "@/components/flow-builder/webHookNode";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { Node, Edge } from "reactflow";

interface EndCallFormData {
  endMessage?: string;
  reason?: string;
}

interface RouterFormData {
  routes?: Array<{
    condition: string;
    target: string;
  }>;
  defaultRoute?: string;
}

interface WhatsAppFormData {
  phoneNumber?: string;
  message?: string;
  templateId?: string;
}

// Union type for all possible form data
type NodeFormData =
  | startNodeFormType
  | ApinodeFormType
  | CallTransferNodeType
  | EmailFormDataType
  | ConditionFormType
  | ModelFormValuesType
  | WebhookFormValuesType
  | EndCallFormData
  | RouterFormData
  | WhatsAppFormData;

interface NodeWithFormData extends Omit<Node, "data"> {
  data: Node["data"] & {
    formData?: NodeFormData;
  };
  formData: NodeFormData;
}

interface FlowData {
  nodes: NodeWithFormData[];
  edges: Edge[];
  metadata: {
    createdAt: string;
    version: string;
    flowId?: string;
    flowName?: string;
  };
}

interface FlowContextType {
  nodeFormData: Record<string, NodeFormData>;
  updateNodeFormData: (nodeId: string, data: NodeFormData) => void;
  getNodeFormData: (nodeId: string) => NodeFormData | undefined;
  getCompleteFlowData: (nodes: Node[], edges: Edge[]) => FlowData;
  clearNodeFormData: (nodeId: string) => void;
  loadFlowFromJson: (jsonData: FlowData) => { nodes: Node[]; edges: Edge[] };
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const useFlowContext = (): FlowContextType => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlowContext must be used within a FlowProvider");
  }
  return context;
};

interface FlowProviderProps {
  children: ReactNode;
}

export const FlowProvider: React.FC<FlowProviderProps> = ({ children }) => {
  const [nodeFormData, setNodeFormData] = useState<
    Record<string, NodeFormData>
  >({});

  const updateNodeFormData = useCallback(
    (nodeId: string, data: NodeFormData): void => {
      console.log("Updating node form data for:", nodeId, data);
      setNodeFormData((prev) => ({
        ...prev,
        [nodeId]: { ...prev[nodeId], ...data },
      }));
    },
    []
  );

  const getNodeFormData = useCallback(
    (nodeId: string): NodeFormData | undefined => {
      return nodeFormData[nodeId];
    },
    [nodeFormData]
  );

  const clearNodeFormData = useCallback((nodeId: string): void => {
    setNodeFormData((prev) => {
      const newData = { ...prev };
      delete newData[nodeId];
      return newData;
    });
  }, []);

  const getCompleteFlowData = useCallback(
    (nodes: Node[], edges: Edge[]): FlowData => {
      const nodesWithFormData: NodeWithFormData[] = nodes.map((node) => ({
        ...node,
        formData: nodeFormData[node.id] || {},
      }));

      return {
        nodes: nodesWithFormData,
        edges,
        metadata: {
          createdAt: new Date().toISOString(),
          version: "1.0.0",
          flowId: "d1d7ba82-00bb-4e13-99c8-b26ab1fb349f",
          flowName: "Unknown work Flow",
        },
      };
    },
    [nodeFormData]
  );

  const loadFlowFromJson = useCallback(
    (jsonData: FlowData): { nodes: Node[]; edges: Edge[] } => {
      if (jsonData.nodes && Array.isArray(jsonData.nodes)) {
        const newNodeFormData: Record<string, NodeFormData> = {};

        jsonData.nodes.forEach((node: NodeWithFormData) => {
          if (node.formData) {
            newNodeFormData[node.id] = node.formData;
          }
        });

        setNodeFormData(newNodeFormData);

        const cleanNodes: Node[] = jsonData.nodes.map(
          (node: NodeWithFormData) => {
            const { formData, ...cleanNode } = node;
            return cleanNode;
          }
        );

        return {
          nodes: cleanNodes,
          edges: jsonData.edges || [],
        };
      }
      return { nodes: [], edges: [] };
    },
    []
  );

  const value: FlowContextType = {
    nodeFormData,
    updateNodeFormData,
    getNodeFormData,
    getCompleteFlowData,
    clearNodeFormData,
    loadFlowFromJson,
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};

// Export types for use in components
export type {
  NodeFormData,
  startNodeFormType,
  ApinodeFormType,
  CallTransferNodeType,
  EmailFormDataType,
  ConditionFormType,
  ModelFormValuesType,
  WebhookFormValuesType,
  EndCallFormData,
  RouterFormData,
  WhatsAppFormData,
  FlowData,
  NodeWithFormData,
};
