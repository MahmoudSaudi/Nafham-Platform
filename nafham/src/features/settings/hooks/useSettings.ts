import { useState } from "react";

export function useSettings() {
  const [activeTab, setActiveTab] = useState("account");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "أحمد خالد",
    email: "ahmed@example.com",
    bio: "طالب طموح يسعى لتعلم مهارات جديدة في مجالات البرمجة والتصميم.",
    notificationsEmail: true,
    notificationsPush: false,
    theme: "light",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleToggle = (name: string) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name as keyof typeof formData] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    
    // Mock API call
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("تم حفظ التعديلات بنجاح!");
      
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  return {
    activeTab,
    setActiveTab,
    formData,
    handleChange,
    handleToggle,
    isSaving,
    successMessage,
    handleSave
  };
}
