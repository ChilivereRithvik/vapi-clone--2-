"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Phone, Mail, Copy, Check } from "lucide-react";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
}

export function ShareModal({ open, onOpenChange, content }: ShareModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(content);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendSMS = () => {
    // Mock SMS sending
    console.log("Sending SMS to:", phoneNumber, "Message:", message);
    onOpenChange(false);
  };

  const handleSendWhatsApp = () => {
    // Mock WhatsApp sending
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    onOpenChange(false);
  };

  const handleSendEmail = () => {
    // Mock email sending
    const emailUrl = `mailto:${email}?subject=Call Transcript&body=${encodeURIComponent(
      message
    )}`;
    window.open(emailUrl, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono">
            Share Call Information
          </DialogTitle>
          <DialogDescription>
            Share this call transcript and summary via SMS, WhatsApp, or email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Copy Link */}
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={window.location.href}
                readOnly
                className="h-9"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={handleCopyLink}
            >
              <span className="sr-only">Copy</span>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Phone Number Input */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+91 9876543210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Message Content */}
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSendSMS}
              disabled={!phoneNumber || !message}
              className="w-full gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Send SMS
            </Button>
            <Button
              onClick={handleSendWhatsApp}
              disabled={!phoneNumber || !message}
              variant="outline"
              className="w-full gap-2 bg-transparent"
            >
              <Phone className="h-4 w-4" />
              Send WhatsApp
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={!email || !message}
              variant="outline"
              className="w-full gap-2 bg-transparent"
            >
              <Mail className="h-4 w-4" />
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
