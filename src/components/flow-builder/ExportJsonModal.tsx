"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download, X, Check, Edit2 } from "lucide-react";
import type { FlowData } from "@/contexts/FlowContext";
import Editor from "@monaco-editor/react";

type ExportJsonModalProps = {
  open: boolean;
  onClose: () => void;
  flowData: FlowData;
  onApplyJson?: (newJson: FlowData) => void;
};

export default function ExportJsonModal({
  open,
  onClose,
  flowData,
  onApplyJson,
}: ExportJsonModalProps) {
  const [copied, setCopied] = useState(false);
  const [jsonString, setJsonString] = useState(
    JSON.stringify(flowData, null, 2)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset JSON when modal opens or flowData changes
  useEffect(() => {
    setJsonString(JSON.stringify(flowData, null, 2));
    setIsEditing(false);
    setError(null);
  }, [flowData, open]);

  // ✅ Copy JSON to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // ✅ Download JSON as file
  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flow-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ✅ Apply edited JSON
  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonString);
      setError(null);
      setIsEditing(false);
      onApplyJson?.(parsed);
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl w-[50vw] h-[70vh] max-w-[1000px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-6 pb-4">
          <h2 className="text-xl font-semibold">Flow JSON Data</h2>
          <button
            className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex gap-2 px-6 py-3 border-b bg-gray-50">
          <Button onClick={handleCopy} variant="outline" size="sm">
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>

          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>

          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleApply} variant="default" size="sm">
                Apply Changes
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setJsonString(JSON.stringify(flowData, null, 2));
                  setError(null);
                }}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          )}

          {isEditing && (
            <div className="ml-auto text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-md">
              Edit mode enabled
            </div>
          )}
        </div>

        {/* Error display */}
        {error && (
          <div className="mx-6 mt-3 px-4 py-2 bg-red-50 border border-red-200 rounded-md">
            <div className="text-red-700 text-sm font-medium">{error}</div>
          </div>
        )}

        {/* JSON Editor Container */}
        <div className="flex-1 p-6 pt-3 min-h-0">
          <div className="h-full border rounded-lg overflow-hidden bg-white">
            <Editor
              height="100%"
              defaultLanguage="json"
              value={jsonString}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
                minimap: { enabled: false },
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                readOnly: !isEditing,
                lineNumbers: "on",
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
                scrollbar: {
                  vertical: "visible",
                  horizontal: "visible",
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10,
                },
                bracketPairColorization: {
                  enabled: true,
                },
                formatOnPaste: true,
                formatOnType: true,
              }}
              onChange={(value) => {
                if (isEditing && value !== undefined) {
                  setJsonString(value);
                  setError(null);
                }
              }}
              onValidate={(markers) => {
                if (isEditing && markers.length > 0) {
                  setError("Invalid JSON syntax - check highlighted errors");
                } else if (isEditing) {
                  setError(null);
                }
              }}
              loading={
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-400">Loading editor...</div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
