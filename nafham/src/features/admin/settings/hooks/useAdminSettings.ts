import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminSettings, updateAdminSettings, PlatformSetting } from "@/services/adminSettingsApi";

export function useAdminSettings() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("platform");
  const [successMessage, setSuccessMessage] = useState("");
  
  // Default structure to avoid undefined errors
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});

  const { data: settingsData, isLoading } = useQuery({
    queryKey: ["adminSettings"],
    queryFn: getAdminSettings,
  });

  // Populate form data from backend when available
  useEffect(() => {
    if (settingsData && settingsData.data) {
      const initialData: Record<string, string | boolean> = {};
      settingsData.data.forEach((setting: PlatformSetting) => {
        // Parse boolean strings back to boolean for toggle switches
        if (setting.value === "true") {
          initialData[setting.key] = true;
        } else if (setting.value === "false") {
          initialData[setting.key] = false;
        } else {
          initialData[setting.key] = setting.value;
        }
      });
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [settingsData]);

  const updateMutation = useMutation({
    mutationFn: updateAdminSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminSettings"] });
      setSuccessMessage("تم حفظ الإعدادات بنجاح");
      setTimeout(() => setSuccessMessage(""), 3000);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name: string) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSave = () => {
    // Transform formData back into the array of objects expected by the API
    const settingsToUpdate = Object.entries(formData).map(([key, value]) => {
      let category = "GENERAL";
      let isPublic = false;

      // Assign categories based on key prefix or name
      if (key.startsWith("STRIPE_") || key.startsWith("PAYMOB_") || key === "CURRENCY") {
        category = "PAYMENTS";
      } else if (key.startsWith("SOCIAL_")) {
        category = "SOCIAL";
        isPublic = true;
      } else if (key === "SITE_NAME" || key === "SITE_DESCRIPTION" || key === "MAINTENANCE_MODE" || key === "PLATFORM_LOGO") {
        category = "PLATFORM";
        isPublic = true;
      } else if (key === "ALLOW_REGISTRATION" || key === "REQUIRE_EMAIL_VERIFICATION") {
        category = "REGISTRATION";
        isPublic = true;
      } else if (key === "OPENAI_API_KEY") {
        category = "AI_API_KEYS";
        isPublic = false;
      } else if (key === "CHATBOT_ENABLED") {
        category = "CHATBOT";
        isPublic = true;
      }

      return {
        key,
        value: String(value), // convert boolean to string
        category,
        isPublic
      };
    });

    updateMutation.mutate(settingsToUpdate);
  };

  return {
    activeTab,
    setActiveTab,
    formData,
    setFormData,
    handleChange,
    handleToggle,
    isSaving: updateMutation.isPending,
    isLoading,
    successMessage,
    handleSave,
  };
}
