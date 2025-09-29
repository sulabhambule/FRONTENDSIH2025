// Admin-specific type definitions
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin: string;
  status: "active" | "inactive" | "suspended";
}

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  year: number;
  semester: number;
  cgpa: number;
  totalPoints: number;
  activities: Activity[];
  projects: Project[];
  internships: Internship[];
  status: "active" | "graduated" | "dropped";
  profileImage?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
  subjects: string[];
  clubsAdvised: string[];
  studentsGuided: number;
  approvalsPending: number;
  rating: number;
  profileImage?: string;
}

export interface Activity {
  id: string;
  title: string;
  type: "club" | "competition" | "workshop" | "volunteer" | "certification";
  domain: string;
  points: number;
  date: string;
  status: "approved" | "pending" | "rejected";
  verifiedBy?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  duration: string;
  teamSize: number;
  status: "completed" | "ongoing" | "planned";
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  stipend?: number;
  certificate: boolean;
  status: "completed" | "ongoing" | "upcoming";
}

export interface Report {
  id: string;
  title: string;
  type: "NAAC" | "NIRF" | "AICTE" | "Internal" | "Custom";
  generatedBy: string;
  generatedAt: string;
  filters: ReportFilters;
  status: "generated" | "generating" | "failed";
  downloadUrl?: string;
}

export interface ReportFilters {
  departments?: string[];
  years?: number[];
  semesters?: number[];
  domains?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SystemStats {
  totalStudents: number;
  totalTeachers: number;
  totalClubs: number;
  pendingApprovals: number;
  totalActivities: number;
  averageCGPA: number;
  placementRate: number;
  activeProjects: number;
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  name: string;
  department: string;
  year: number;
  totalPoints: number;
  activities: number;
  profileImage?: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  weightage: number;
  color: string;
  isActive: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "general" | "urgent" | "achievement" | "reminder";
  targetAudience: "all" | "students" | "teachers" | "department";
  targetDepartments?: string[];
  createdBy: string;
  createdAt: string;
  scheduledFor?: string;
  status: "draft" | "scheduled" | "sent";
}

export interface RecentActivityItem {
  id: string;
  type: "approval" | "achievement" | "report" | "alert";
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

export interface QuickStat {
  label: string;
  value: number;
  change: string;
  trend: "up" | "down" | "neutral";
}

// Enhanced Student interface for Student Management
export interface StudentData {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  year: number;
  semester: number;
  cgpa: number;
  totalPoints: number;
  status: "active" | "graduated" | "dropped";
  profileImage?: string;
  phone: string;
  address: string;
  parentContact: string;
  admissionDate: string;
  activities: Activity[];
  projects: Project[];
  internships: Internship[];
  aiInsights: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    careerFit: string[];
    placementReadiness: number;
  };
}

// Enhanced Teacher interface for Teacher Management
export interface TeacherData {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
  experience: number;
  qualification: string;
  specialization: string[];
  subjects: string[];
  clubsAdvised: string[];
  studentsGuided: number;
  approvalsPending: number;
  approvalsCompleted: number;
  rating: number;
  status: "active" | "on_leave" | "inactive";
  profileImage?: string;
  phone: string;
  address: string;
  joinDate: string;
  publications: Array<{
    title: string;
    journal: string;
    year: number;
    citations: number;
  }>;
  achievements: Array<{
    title: string;
    year: number;
    organization: string;
  }>;
  contributionMetrics: {
    teachingHours: number;
    researchProjects: number;
    studentsPlaced: number;
    clubActivities: number;
    workshopsConducted: number;
    papersPublished: number;
  };
}

// Approval interfaces for Teacher Management
export interface ApprovalItem {
  id: string;
  type: "activity" | "project" | "internship" | "certificate";
  title: string;
  studentName: string;
  submittedDate: string;
  priority: "high" | "medium" | "low";
}

export interface TeacherApproval {
  teacherId: string;
  teacherName: string;
  pendingApprovals: ApprovalItem[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
