import mop from "../assets/mop.png";
import cargo from "../assets/cargo-truck.png";
import electricity from "../assets/electricity.png";
import brush from "../assets/paintbrush.png";
import repair from "../assets/repairing.png";
import support from "../assets/support.png";
import { CheckCircle, MessageCircle, Shield, Star } from "lucide-react";

export const BusinessCategories = [
  {
    id: 1,
    name: "Cleaning",
    icon: mop,
  },
  {
    id: 2,
    name: "Repair",
    icon: repair,
  },
  {
    id: 3,
    name: "Painting",
    icon: brush,
  },
  {
    id: 4,
    name: "Shifting",
    icon: cargo,
  },
  {
    id: 5,
    name: "Plumbing",
    icon: support,
  },
  {
    id: 6,
    name: "Electric",
    icon: electricity,
  },
];

// Team members data
export const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300",
    bio: "With over 15 years of experience in the service industry, Sarah founded the platform to connect quality service providers with customers.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Michael leads our technology team, ensuring a seamless and secure platform experience for all users.",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Priya oversees day-to-day operations and ensures service quality standards are maintained across the platform.",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Marketing Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "David drives our marketing strategies to connect more customers with quality service providers.",
  },
];

// Benefits data
export const benefits = [
  {
    id: 1,
    title: "Verified Professionals",
    description:
      "All service providers undergo thorough background checks and verification",
    icon: <Shield className="w-10 h-10 text-primary" />,
  },
  {
    id: 2,
    title: "Quality Guarantee",
    description:
      "We stand behind the quality of every service booked through our platform",
    icon: <CheckCircle className="w-10 h-10 text-primary" />,
  },
  {
    id: 3,
    title: "Secure Payments",
    description:
      "Your payment information is protected with industry-leading encryption",
    icon: <Star className="w-10 h-10 text-primary" />,
  },
  {
    id: 4,
    title: "Direct Communication",
    description:
      "Chat directly with service providers to discuss your specific needs",
    icon: <MessageCircle className="w-10 h-10 text-primary" />,
  },
];
