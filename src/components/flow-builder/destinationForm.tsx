/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { callTransferNodeSchema } from "./call-transfer-node";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Trash } from "lucide-react";

type FormValues = z.infer<typeof callTransferNodeSchema>;

export function DestinationSection() {
  const { control, watch } = useFormContext<FormValues>();
  const type = watch("destination.type");
  const mode = watch("destination.transferPlan.transferMode");

  return (
    <div className="space-y-3 rounded-lg border p-4 shadow-sm">
      <h3 className="text-md font-semibold">Configure Destination</h3>

      {/* Type */}
      <FormField
        control={control}
        name="destination.type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Destination Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PhoneNumber">Phone Number</SelectItem>
                <SelectItem value="SIP">SIP</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {/* Phone number fields */}
      {type === "PhoneNumber" && (
        <>
          <FormField
            control={control}
            name="destination.phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+14155551234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="destination.enforceE164"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Enforce E164 format</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="destination.extension"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extension (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="1234" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="destination.callerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caller ID (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+14155551234" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </>
      )}

      {/* SIP fields */}
      {type === "SIP" && (
        <FormField
          control={control}
          name="destination.transferPlan.sipUri"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SIP URI</FormLabel>
              <FormControl>
                <Input placeholder="sip:user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="destination.messageToCustomer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Message to Customer</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter message before transfer..."
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="destination.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter details for AI decision..."
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="destination.transferPlan.transferMode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Transfer Mode</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Blind Transfer">Blind Transfer</SelectItem>
                <SelectItem value="SIP">SIP</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}

const MESSAGE_TYPES = [
  { id: "requestStart", label: "Request Start" },
  { id: "requestComplete", label: "Request Complete" },
  { id: "requestFailed", label: "Request Failed" },
  { id: "requestResponseDelayed", label: "Request Response Delayed" },
];

export function MessageSection() {
  const { control, watch } = useFormContext<FormValues>();
  const requestStartType = watch("messages.requestStart.type");

  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  // Add state for conditions per section
  const [conditions, setConditions] = useState<
    Record<
      string,
      Array<{ parameter: string; operator: string; value: string }>
    >
  >({});

  const toggleSection = (sectionId: string) => {
    setSelectedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const removeSection = (sectionId: string) => {
    setSelectedSections((prev) => prev.filter((id) => id !== sectionId));
    setConditions((prev) => {
      const copy = { ...prev };
      delete copy[sectionId];
      return copy;
    });
  };

  // Add condition for a section
  const addCondition = (sectionId: string) => {
    setConditions((prev) => ({
      ...prev,
      [sectionId]: [
        ...(prev[sectionId] || []),
        { parameter: "", operator: "", value: "" },
      ],
    }));
  };

  // Remove condition for a section
  const removeCondition = (sectionId: string, idx: number) => {
    setConditions((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((_, i) => i !== idx),
    }));
  };

  // Update condition value
  const updateCondition = (
    sectionId: string,
    idx: number,
    field: keyof { parameter: string; operator: string; value: string },
    val: string
  ) => {
    setConditions((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].map((cond, i) =>
        i === idx ? { ...cond, [field]: val } : cond
      ),
    }));
  };

  return (
    <div className="rounded-lg border p-3 shadow-sm space-y-1">
      <Popover>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-md font-semibold">Message Configuration</h3>

          {/* + Add Message Button with Multi-Select Popover */}
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              + Add Message
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent>
          <h4 className="text-sm font-medium ">Select message types</h4>
          <div>
            {MESSAGE_TYPES.map((type) => (
              <div
                key={type.id}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => toggleSection(type.id)}
              >
                <Checkbox
                  checked={selectedSections.includes(type.id)}
                  onCheckedChange={() => toggleSection(type.id)}
                />
                <span className="text-sm">{type.label}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Render all active sections */}
      <div className=" space-y-8">
        {selectedSections.map((section) => (
          <div key={section} className="space-y-4 border rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium ">
                {MESSAGE_TYPES.find((t) => t.id === section)?.label}
              </h4>
              <Trash
                className="h-4 w-4 text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={() => removeSection(section)}
              />
            </div>

            {/* Section-specific form fields */}
            {section === "requestStart" && (
              <>
                <FormField
                  control={control}
                  name="messages.requestStart.type"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="default" id="default" />
                            <Label
                              htmlFor="default"
                              className="text-sm font-medium"
                            >
                              Default (Server will use Default message)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="none" />
                            <Label
                              htmlFor="none"
                              className="text-sm font-medium"
                            >
                              None (No message will be played)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label
                              htmlFor="custom"
                              className="text-sm font-medium"
                            >
                              Custom
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {requestStartType === "custom" && (
                  <FormField
                    control={control}
                    name="messages.requestStart.message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your custom start message"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}

            {section === "requestComplete" && (
              <>
                <FormField
                  control={control}
                  name="messages.requestComplete.content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter completion message..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {section === "requestFailed" && (
              <>
                <FormField
                  control={control}
                  name="messages.requestFailed.content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter failure message..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {section === "requestResponseDelayed" && (
              <>
                <FormField
                  control={control}
                  name="messages.requestResponseDelayed.content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter delay message..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="messages.requestResponseDelayed.timingMs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delay Timing (ms)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Add Condition Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addCondition(section)}
              className="mb-2"
            >
              + Add Condition
            </Button>

            {/* Render Conditions */}
            {(conditions[section] || []).map((cond, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <Input
                  placeholder="Parameter"
                  value={cond.parameter}
                  onChange={(e) =>
                    updateCondition(section, idx, "parameter", e.target.value)
                  }
                  className="w-1/3"
                />
                <Select
                  value={cond.operator}
                  onValueChange={(val) =>
                    updateCondition(section, idx, "operator", val)
                  }
                >
                  <SelectTrigger className="w-1/4">
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="=">=</SelectItem>
                    <SelectItem value="!=">!=</SelectItem>
                    <SelectItem value=">">{">"}</SelectItem>
                    <SelectItem value="<">{"<"}</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Value"
                  value={cond.value}
                  onChange={(e) =>
                    updateCondition(section, idx, "value", e.target.value)
                  }
                  className="w-1/3"
                />
                <Trash
                  className="h-4 w-4 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={() => removeCondition(section, idx)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
