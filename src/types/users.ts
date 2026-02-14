export interface SessionTable {
  id: number;
  date: string;
  time: string;
  status: number;
  teacher_id: number;
  created_at: string;
  updated_at: string;
  break: number;
  teacher?: Teacher;
}

export interface Session {
  id: number;
  student_id: number;
  sessiontable_id: number;
  reason: string | null;
  status: string;
  refund_status?: string;
  created_at?: string;
  updated_at?: string;
  cost?: number;
  session_table: SessionTable;
  student: Teacher; // Usually students and teachers share the same base User/Teacher fields in this project
  teacher: Teacher;
}

export interface TeacherFile {
  id: number;
  url: string;
  fileable_id: number;
  fileable_type: string;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: number;
  code: string | null;
  firstname: string;
  lastname: string;
  level: string | null;
  email: string;
  phone: string | null;
  type: string;
  balance: number;
  email_verified_at: string | null;
  intro: string;
  start_from: number;
  youtube_link: string;
  review: string;
  level_id: number | null;
  course_id: number | null;
  startdate: string;
  enddate: string;
  starttime: string;
  endtime: string;
  gender: string;
  image: string;
  cv: string;
  nationalid: string;
  whats: string;
  language_id: number | null;
  proficiency_id: number | null;
  country: string;
  timezone: string;
  source: string;
  accept_terms: number;
  isActive: number;
  lessons: number;
  students: number;
  reviewsCount: number | null;
  created_at: string;
  updated_at: string;
  file: TeacherFile;
}

export interface Wallet {
  id: number;
  totalAmount: number;
  date: string;
  amount: number;
  teacherAmount: number;
  adminAmount: number;
  balance: number;
  description: string | null;
  type: "credit" | "debit" | string;
  status: number;
  receiver: Teacher | null;
  sender: Teacher | null;
}

export interface User {
  id: number;
  image: string;
  firstname: string;
  lastname: string;
  level: string | null;
  gender: string;
  whats: string;
  accept_terms: number;
  email: string;
  phone: string | null;
  balance: number;
  start_from: number;
  type: string;
  country: string;
  timezone: string;
  source: string | null;
  sessions: Session[];
  teachers: Teacher[];
  wallets: Wallet[];
}