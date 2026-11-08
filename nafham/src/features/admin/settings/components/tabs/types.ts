import React from "react";

export interface SettingsTabProps {
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleToggle: (key: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  role?: string;
}
