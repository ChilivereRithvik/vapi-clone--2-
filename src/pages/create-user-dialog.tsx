"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { X } from "lucide-react";

type CreateUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    dob: string;
    language: string;
    country: string;
    city: string;
    timezone: string;
    leadSource?: string;
    owner: string;
    context?: string;
    tags: string[];
    optIns: {
      sms: boolean;
      email: boolean;
      whatsapp: boolean;
    };
  };
  mode?: "create" | "edit";
};

export function CreateUserDialog({
  open,
  onOpenChange,
  user,
  mode = "create",
}: CreateUserDialogProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
    language: user?.language || "",
    country: user?.country || "",
    city: user?.city || "",
    timezone: user?.timezone || "",
    leadSource: user?.leadSource || "",
    owner: user?.owner || "",
    context: user?.context || "",
    tags: user?.tags || [],
    smsOptIn: user?.optIns.sms || false,
    emailOptIn: user?.optIns.email || false,
    whatsappOptIn: user?.optIns.whatsapp || false,
    smsConsentSource: "",
    emailConsentSource: "",
    whatsappConsentSource: "",
  });

  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email && !formData.phone) {
      newErrors.contact = "Either email or phone is required";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (
      formData.phone &&
      !/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/[-\s]/g, ""))
    ) {
      newErrors.phone = "Invalid phone format (use E.164)";
    }

    if (formData.dob && new Date(formData.dob) > new Date()) {
      newErrors.dob = "Date of birth must be in the past";
    }

    if (formData.smsOptIn && !formData.smsConsentSource) {
      newErrors.smsConsent = "Consent source required for SMS opt-in";
    }

    if (formData.emailOptIn && !formData.emailConsentSource) {
      newErrors.emailConsent = "Consent source required for email opt-in";
    }

    if (formData.whatsappOptIn && !formData.whatsappConsentSource) {
      newErrors.whatsappConsent = "Consent source required for WhatsApp opt-in";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    console.log(
      mode === "create" ? "Creating user:" : "Updating user:",
      formData
    );
    onOpenChange(false);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New User" : "Edit User"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new user to your system. Fields marked with * are required."
              : "Update user information. Fields marked with * are required."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Full name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="email@example.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            {errors.contact && (
              <p className="text-xs text-destructive">{errors.contact}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (E.164 format)</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1-555-0000"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  className={errors.dob ? "border-destructive" : ""}
                />
                {errors.dob && (
                  <p className="text-xs text-destructive">{errors.dob}</p>
                )}
              </div>
            </div>
          </div>

          {/* Location & Language */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Location & Language</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    setFormData({ ...formData, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                    <SelectItem value="Russian">Russian</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  placeholder="Country"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone (IANA)</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) =>
                    setFormData({ ...formData, timezone: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">
                      America/New_York
                    </SelectItem>
                    <SelectItem value="America/Chicago">
                      America/Chicago
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      America/Los_Angeles
                    </SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                    <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                    <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
                    <SelectItem value="Asia/Dubai">Asia/Dubai</SelectItem>
                    <SelectItem value="Australia/Sydney">
                      Australia/Sydney
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Lead Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Lead Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leadSource">Lead Source</Label>
                <Select
                  value={formData.leadSource}
                  onValueChange={(value) =>
                    setFormData({ ...formData, leadSource: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Google Ads">Google Ads</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Owner</Label>
                <Select
                  value={formData.owner}
                  onValueChange={(value) =>
                    setFormData({ ...formData, owner: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                    <SelectItem value="Michael Brown">Michael Brown</SelectItem>
                    <SelectItem value="David Kim">David Kim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="context">Context / Notes</Label>
              <Textarea
                id="context"
                value={formData.context}
                onChange={(e) =>
                  setFormData({ ...formData, context: e.target.value })
                }
                placeholder="Additional context about this user..."
                rows={3}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                placeholder="Add tag..."
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>
          </div>

          {/* Opt-ins & Consent */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Opt-ins & Consent</h3>
            <div className="space-y-4 rounded-lg border p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-opt-in" className="font-normal">
                    SMS Opt-in
                  </Label>
                  <Switch
                    id="sms-opt-in"
                    checked={formData.smsOptIn}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, smsOptIn: checked })
                    }
                  />
                </div>
                {formData.smsOptIn && (
                  <div className="space-y-2 pl-4">
                    <Label htmlFor="sms-consent" className="text-xs">
                      Consent Source <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="sms-consent"
                      value={formData.smsConsentSource}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          smsConsentSource: e.target.value,
                        })
                      }
                      placeholder="e.g., Website signup form"
                      className={errors.smsConsent ? "border-destructive" : ""}
                    />
                    {errors.smsConsent && (
                      <p className="text-xs text-destructive">
                        {errors.smsConsent}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-opt-in" className="font-normal">
                    Email Opt-in
                  </Label>
                  <Switch
                    id="email-opt-in"
                    checked={formData.emailOptIn}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, emailOptIn: checked })
                    }
                  />
                </div>
                {formData.emailOptIn && (
                  <div className="space-y-2 pl-4">
                    <Label htmlFor="email-consent" className="text-xs">
                      Consent Source <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email-consent"
                      value={formData.emailConsentSource}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emailConsentSource: e.target.value,
                        })
                      }
                      placeholder="e.g., Newsletter subscription"
                      className={
                        errors.emailConsent ? "border-destructive" : ""
                      }
                    />
                    {errors.emailConsent && (
                      <p className="text-xs text-destructive">
                        {errors.emailConsent}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="whatsapp-opt-in" className="font-normal">
                    WhatsApp Opt-in
                  </Label>
                  <Switch
                    id="whatsapp-opt-in"
                    checked={formData.whatsappOptIn}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, whatsappOptIn: checked })
                    }
                  />
                </div>
                {formData.whatsappOptIn && (
                  <div className="space-y-2 pl-4">
                    <Label htmlFor="whatsapp-consent" className="text-xs">
                      Consent Source <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="whatsapp-consent"
                      value={formData.whatsappConsentSource}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsappConsentSource: e.target.value,
                        })
                      }
                      placeholder="e.g., Customer support request"
                      className={
                        errors.whatsappConsent ? "border-destructive" : ""
                      }
                    />
                    {errors.whatsappConsent && (
                      <p className="text-xs text-destructive">
                        {errors.whatsappConsent}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "create" ? "Create User" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
