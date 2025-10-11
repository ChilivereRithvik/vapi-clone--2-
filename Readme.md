# React Flow Builder System Documentation

## Overview

The **React Flow Builder System** is a modular, context-driven visual workflow editor built using **React Flow**, **React Context API**, and **React Hook Form**. It allows users to visually create, edit, and connect nodes representing different operations (API calls, email, conditions, etc.), while maintaining synchronized form data and flow states.

---

## Architecture

### Core Layers

1. **Flow Builder UI Layer** – Handles drag-and-drop node creation and edge connections via `ReactFlow`.
2. **Context Layer (`FlowContext`)** – Manages all node form data globally using React Context.
3. **Form Layer (`NodeForm`)** – Provides node-specific configuration forms.
4. **Persistence Layer** – Handles saving, loading, and exporting flow data (JSON-based).

### Primary Components

| Component                           | Responsibility                                       |
| ----------------------------------- | ---------------------------------------------------- |
| `FlowBuilderPage`                   | Root entry point; wraps flow with providers.         |
| `FlowBuilderContent`                | Core canvas logic (nodes, edges, undo/redo, events). |
| `NodeForm`                          | Renders dynamic configuration forms per node type.   |
| `FlowContext`                       | Stores and syncs form data between nodes and forms.  |
| `ApiRequestNode`, `EmailNode`, etc. | Node visual and functional representations.          |
| `ExportJsonModal`                   | Displays/export/import JSON for the complete flow.   |

---

## Data Flow Overview

### 1. Node Creation

- A user drags a node type from the **NodesPanel** or clicks to add one.
- `FlowBuilderContent.addNode()` creates a new node object:

  ```ts
  const newNode: Node = {
    id: `${Date.now()}`,
    type,
    data: { label: `${type} node`, onAddNode, onDeleteNode },
    position,
  };
  setNodes((nds) => [...nds, newNode]);
  ```

### 2. Node Configuration

- On node click → `onNodeClick` opens the **NodeForm** sidebar.
- `NodeForm` retrieves existing data via `useFlowContext().getNodeFormData(node.id)`.
- Submitting a form calls `updateNodeFormData(node.id, formData)` in `FlowContext`.

### 3. Context Management (`FlowContext`)

- Maintains a `nodeFormData` dictionary mapping node IDs → form data.
- Provides API:

  ```ts
  updateNodeFormData(nodeId, data);
  getNodeFormData(nodeId);
  clearNodeFormData(nodeId);
  getCompleteFlowData(nodes, edges);
  loadFlowFromJson(jsonData);
  ```

- Each node’s form data persists even after UI updates or re-renders.

### 4. Flow Persistence

- **Save:**

  ```ts
  const completeFlowData = getCompleteFlowData(nodes, edges);
  localStorage.setItem("flowData", JSON.stringify(completeFlowData));
  ```

- **Export:** Shown in `ExportJsonModal` as a full JSON of nodes, edges, and metadata.
- **Import:** `loadFlowFromJson()` reconstructs the flow and repopulates `nodeFormData`.

---

## Key Modules

### 1. `FlowBuilderContent`

Handles all flow canvas operations:

- Node creation/deletion
- Edge connections
- Undo/redo functionality
- Hotkeys (`Ctrl+Z`, `Ctrl+Shift+Z`, `Delete`, `Ctrl+=/-` for zoom)
- JSON save/export triggers

```ts
const handleConnect = (connection: Connection) => {
  setEdges(addEdge({ ...connection, animated: true }, edges));
};
```

### 2. `NodeForm`

Dynamic renderer for configuration forms per node type.

```tsx
switch (type) {
  case "apiRequest":
    return (
      <ApinodeForm onSubmit={handleFormSave} defaultValues={existingData} />
    );
  case "email":
    return <EmailForm onSend={handleFormSave} defaultValues={existingData} />;
  // ...other node types
}
```

Each form:

- Uses `react-hook-form` + `zod` for validation.
- Calls `handleFormSave()` → triggers `updateNodeFormData()` from context.

### 3. `FlowContext`

Centralized data store for all node forms.

```ts
const [nodeFormData, setNodeFormData] = useState<Record<string, NodeFormData>>(
  {}
);

const updateNodeFormData = (nodeId, data) => {
  setNodeFormData((prev) => ({
    ...prev,
    [nodeId]: { ...prev[nodeId], ...data },
  }));
};
```

#### Responsibilities

- Maintain synchronized form data for all nodes.
- Merge updates on save.
- Provide `getCompleteFlowData()` for serialization.
- Reconstruct state via `loadFlowFromJson()`.

### 4. Node Components (e.g., `ApiRequestNode`)

Each node defines its visual representation and behavior.

```tsx
<Card className="border-2 border-green-500 p-4">
  <Webhook className="h-5 w-5 text-green-500" />
  <div className="font-semibold">API Request</div>
</Card>
```

Nodes receive handlers through `data` props:

```tsx
<NodeWithActions
  data={{ ...data, onAddNode, onDeleteNode }}
  type="apiRequest"
/>
```

---

## Node Lifecycle

| Step | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 1    | **Creation:** User drags or clicks to create a node.         |
| 2    | **Rendering:** Node appears on canvas with its type label.   |
| 3    | **Configuration:** NodeForm opens for user input.            |
| 4    | **Data Update:** Form data saved via `updateNodeFormData()`. |
| 5    | **Connection:** User connects nodes with edges.              |
| 6    | **Persistence:** Complete flow saved/exported as JSON.       |
| 7    | **Reload:** JSON re-imported; context rebuilds flow state.   |

---

## JSON Data Structure

### FlowData Example

```json
{
  "nodes": [
    {
      "id": "123456",
      "type": "apiRequest",
      "formData": {
        "url": "https://api.example.com",
        "method": "POST",
        "headers": [{ "key": "Content-Type", "value": "application/json" }]
      }
    }
  ],
  "edges": [{ "id": "e1-2", "source": "1", "target": "2" }],
  "metadata": {
    "createdAt": "2025-10-11T12:00:00Z",
    "version": "1.0.0",
    "flowId": "d1d7ba82-00bb-4e13-99c8-b26ab1fb349f",
    "flowName": "Unknown work Flow"
  }
}
```

---

## Node Lifecycle Summary

| Step         | Description                                             |
| ------------ | ------------------------------------------------------- |
| 1. Create    | User adds a node via drag/drop or click.                |
| 2. Configure | `NodeForm` opens and saves data to context.             |
| 3. Connect   | Nodes linked via edges using React Flow.                |
| 4. Persist   | Entire flow (nodes + edges + form data) saved/exported. |
| 5. Reload    | JSON re-imported → context repopulated with saved data. |

---

## Hotkeys

| Key                     | Action               |
| ----------------------- | -------------------- |
| `Ctrl + Z`              | Undo                 |
| `Ctrl + Shift + Z`      | Redo                 |
| `Delete`                | Delete selected node |
| `Ctrl + =` / `Ctrl + -` | Zoom in/out          |
| `F`                     | Fit view             |

---

## Best Practices

- Always wrap the editor in both providers:

  ```tsx
  <ReactFlowProvider>
    <FlowProvider>
      <FlowBuilderContent />
    </FlowProvider>
  </ReactFlowProvider>
  ```

- Use unique IDs for nodes (e.g., timestamps or UUIDs).
- Always update context using `updateNodeFormData` rather than direct state.
- Validate JSON before loading via `loadFlowFromJson`.

---
