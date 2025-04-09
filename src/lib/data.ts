import mop from "../assets/mop.png";
import cargo from "../assets/cargo-truck.png";
import electricity from "../assets/electricity.png";
import brush from "../assets/paintbrush.png";
import repair from "../assets/repairing.png";
import support from "../assets/support.png";

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
    image:
      "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "With over 15 years of experience in the service industry, Sarah founded the platform to connect quality service providers with customers.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Michael leads our technology team, ensuring a seamless and secure platform experience for all users.",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1590649880765-91b1956b8276?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Priya oversees day-to-day operations and ensures service quality standards are maintained across the platform.",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1508243771214-6e95d137426b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "David drives our marketing strategies to connect more customers with quality service providers.",
  },
];

// Sample service categories
export const categories = [
  { id: 1, name: "Home Cleaning", icon: "🧹", count: 124 },
  { id: 2, name: "Plumbing", icon: "🔧", count: 89 },
  { id: 3, name: "Electrical", icon: "⚡", count: 76 },
  { id: 4, name: "Gardening", icon: "🌱", count: 52 },
  { id: 5, name: "Painting", icon: "🎨", count: 67 },
  { id: 6, name: "Moving", icon: "📦", count: 43 },
  { id: 7, name: "Appliance Repair", icon: "🔌", count: 58 },
  { id: 8, name: "Pest Control", icon: "🐜", count: 31 },
];

// Sample featured services
export const featuredServices = [
  {
    id: 1,
    title: "Professional Home Cleaning",
    provider: "CleanPro Services",
    rating: 4.8,
    reviews: 156,
    price: 80,
    image: "/placeholder.svg?height=300&width=400",
    location: "New York, NY",
  },
  {
    id: 2,
    title: "Expert Plumbing Solutions",
    provider: "Quick Fix Plumbing",
    rating: 4.7,
    reviews: 124,
    price: 95,
    image: "/placeholder.svg?height=300&width=400",
    location: "Boston, MA",
  },
  {
    id: 3,
    title: "Electrical Installation & Repair",
    provider: "PowerUp Electricians",
    rating: 4.9,
    reviews: 203,
    price: 110,
    image: "/placeholder.svg?height=300&width=400",
    location: "Chicago, IL",
  },
  {
    id: 4,
    title: "Garden Maintenance & Design",
    provider: "Green Thumb Gardens",
    rating: 4.6,
    reviews: 87,
    price: 75,
    image: "/placeholder.svg?height=300&width=400",
    location: "Seattle, WA",
  },
];
