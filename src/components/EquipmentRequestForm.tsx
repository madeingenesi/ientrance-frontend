"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface EquipmentRequestFormData {
  firstName: string;
  lastName: string;
  email: string;
  request: string;
}

/** Maps catalogue node names (tenantName) to recipient emails */
export const NODE_TO_EMAIL: Record<string, string> = {
  "CNR IMEM Parma": "cnr-imem@ientrance.eu",
  "CNR IMM Catania": "cnr-imm@ientrance.eu",
  "CNR IPCB Napoli": "cnr-ipcb@ientrance.eu",
  "CNR ISM Potenza": "cnr-ism-pz@ientrance.eu",
  "CNR ISM Roma": "cnr-ism-rm@ientrance.eu",
  "CNR ISMN 11 Bologna": "cnr-ismn@ientrance.eu",
  "CNR ISMN 8 Bologna": "cnr-ismn@ientrance.eu",
  "CNR NANO Modena": "cnr-nano@ientrance.eu",
  "CNR STEMS Napoli": "cnr-stems@ientrance.eu",
  INRIM: "inrim@ientrance.eu",
  POLITO: "polito@ientrance.eu",
  "ROMA 3": "roma3@ientrance.eu",
  UNIBO: "unibo@ientrance.eu",
  UNISAP: "unisap@ientrance.eu",
};

interface EquipmentRequestFormProps {
  onBack: () => void;
  onSubmit: (data: EquipmentRequestFormData) => void;
}

export function EquipmentRequestForm({ onBack, onSubmit }: EquipmentRequestFormProps) {
  const [formData, setFormData] = useState<EquipmentRequestFormData>({
    firstName: "",
    lastName: "",
    email: "",
    request: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className="flex flex-col gap-4 p-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="text-sm font-medium">
          First name
        </label>
        <Input
          id="firstName"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          required
          className="rounded-md border"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="lastName" className="text-sm font-medium">
          Last name
        </label>
        <Input
          id="lastName"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          required
          className="rounded-md border"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
          className="rounded-md border"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="request" className="text-sm font-medium">
          Request
        </label>
        <Textarea
          id="request"
          placeholder="Describe your request..."
          value={formData.request}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, request: e.target.value }))
          }
          required
          className="min-h-[120px] rounded-md border"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-black rounded-none text-white"
        >
          Send request
        </Button>
      </div>
    </form>
  );
}
