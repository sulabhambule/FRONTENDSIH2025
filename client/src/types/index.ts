export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar?: string;
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  semester: string;
  studentCount: number;
  schedule: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  class: string;
  semester: string;
  avatar?: string;
  attendance: number;
  cgpa: number;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  advisorId: string;
}

export interface Activity {
  id: string;
  title: string;
  type: "competition" | "workshop" | "volunteer" | "certificate";
  studentId: string;
  studentName: string;
  description: string;
  proof?: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  comments?: string;
}

export interface DashboardStats {
  totalClasses: number;
  totalStudents: number;
  clubsAsAdvisor: number;
  pendingApprovals: number;
  averageAttendance: number;
}
