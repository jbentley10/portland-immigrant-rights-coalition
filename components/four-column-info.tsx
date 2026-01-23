import React from "react";
import {
  Eye,
  Phone,
  AlertCircle,
  Users,
  Heart,
  Shield,
  FileText,
  MapPin,
  Clock,
  CheckCircle,
  Info,
  HelpCircle,
  Home,
  Mail,
  Globe,
  BookOpen,
  Calendar,
  Award,
  Target,
  Briefcase
} from "lucide-react";
import { parseMarkdownLinks } from "@/lib/parseMarkdownLinks";

export type IconType =
  | "Eye"
  | "Phone"
  | "AlertCircle"
  | "Users"
  | "Heart"
  | "Shield"
  | "FileText"
  | "MapPin"
  | "Clock"
  | "CheckCircle"
  | "Info"
  | "HelpCircle"
  | "Home"
  | "Mail"
  | "Globe"
  | "BookOpen"
  | "Calendar"
  | "Award"
  | "Target"
  | "Briefcase";

export interface ColumnItem {
  icon: IconType;
  heading: string;
  body: string;
}

interface FourColumnInfoProps {
  heading?: string;
  column1: ColumnItem;
  column2: ColumnItem;
  column3: ColumnItem;
  column4: ColumnItem;
}

const iconMap = {
  Eye,
  Phone,
  AlertCircle,
  Users,
  Heart,
  Shield,
  FileText,
  MapPin,
  Clock,
  CheckCircle,
  Info,
  HelpCircle,
  Home,
  Mail,
  Globe,
  BookOpen,
  Calendar,
  Award,
  Target,
  Briefcase
};

function InfoColumn({ icon, heading, body }: ColumnItem) {
  const Icon = iconMap[icon] || Info; // Fallback to Info icon if icon not found

  return (
    <div className="flex flex-col items-center text-center px-4 md:px-6">
      <div className="mb-6">
        <Icon className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">
        {heading}
      </h3>
      <p className="text-base md:text-lg text-primary leading-relaxed max-w-sm">
        {parseMarkdownLinks(body)}
      </p>
    </div>
  );
}

export default function FourColumnInfo({ heading, column1, column2, column3, column4 }: FourColumnInfoProps) {
  const columns = [column1, column2, column3, column4];

  return (
    <div className="component-container py-12 md:py-16">
      {heading && (
        <h2 className="text-primary text-center mb-12 md:mb-16">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
        {columns.map((column, index) => (
          <InfoColumn
            key={index}
            icon={column.icon}
            heading={column.heading}
            body={column.body}
          />
        ))}
      </div>
    </div>
  );
}
