import { useState, useMemo } from 'react';
import { CourseLearningData, LearnItem, dummyCourseLearningData } from '../data/learningData';

export function useCourseLearning(courseId: string) {
  // In a real app, we would fetch data based on courseId
  const [data, setData] = useState<CourseLearningData | null>(dummyCourseLearningData);
  
  // Track the currently active item (video or quiz)
  // Default to the first item in the first module
  const initialItem = data?.modules[0]?.items[0] || null;
  const [activeItem, setActiveItem] = useState<LearnItem | null>(initialItem);

  // Track expanded modules in the sidebar
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Expand the first module by default
    if (data?.modules[0]) {
      return { [data.modules[0].id]: true };
    }
    return {};
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleSelectItem = (item: LearnItem) => {
    setActiveItem(item);
  };

  // Quiz Logic (State specifically for interactive quizzes)
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  const handleQuizComplete = (quizId: string, score: number) => {
    setQuizScores(prev => ({ ...prev, [quizId]: score }));
    
    // Optimistically mark as complete in our local data
    if (data) {
      const newData = { ...data };
      for (const module of newData.modules) {
        const item = module.items.find(i => i.id === quizId);
        if (item) {
          item.isCompleted = true;
          break;
        }
      }
      setData(newData);
    }
  };

  const markVideoComplete = (videoId: string) => {
    if (data) {
      const newData = { ...data };
      for (const module of newData.modules) {
        const item = module.items.find(i => i.id === videoId);
        if (item) {
          item.isCompleted = true;
          break;
        }
      }
      setData(newData);
    }
  };

  const progressPercentage = useMemo(() => {
    if (!data) return 0;
    let totalItems = 0;
    let completedItems = 0;

    data.modules.forEach(module => {
      module.items.forEach(item => {
        totalItems++;
        if (item.isCompleted) completedItems++;
      });
    });

    if (totalItems === 0) return 0;
    return Math.round((completedItems / totalItems) * 100);
  }, [data]);

  return {
    course: data,
    activeItem,
    expandedModules,
    progressPercentage,
    quizScores,
    toggleModule,
    handleSelectItem,
    handleQuizComplete,
    markVideoComplete
  };
}
