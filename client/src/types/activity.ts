// Activity-related type definitions
export interface Activity {
  id: string | number;
  title: string;
  type: string;
  category: string;
  description: string;
  startDate: string;
  endDate?: string;
  organization?: string;
  location?: string;
  isOngoing: boolean;
  status: "pending" | "approved" | "under_review" | "rejected";
  progress: number;
  skills: string[];
  achievements: string[];
  learningOutcomes: string[];
  documentation: File[] | string[];
  certificateUrl?: string;
  projectUrl?: string;
  mentorName?: string;
  mentorEmail?: string;
  mentorPhone?: string;
  impactMetrics: {
    duration?: string;
    participants?: string;
    budget?: string;
    reach?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityFormData
  extends Omit<
    Activity,
    "id" | "status" | "progress" | "createdAt" | "updatedAt"
  > {
  // Form-specific properties can be added here
}

export interface ActivityType {
  category: string;
  icon: React.ComponentType<any>;
  items: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
