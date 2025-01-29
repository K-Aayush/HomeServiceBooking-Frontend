import mop from "../assets/mop.png";
import cargo from "../assets/cargo-truck.png";
import electricity from "../assets/electricity.png";
import brush from "../assets/paintbrush.png";
import repair from "../assets/repairing.png";
import support from "../assets/support.png";
import paint from "../assets/paint.jpg";
import repairing from "../assets/repair.jpg";
import women from "../assets/women.jpg";
import women1 from "../assets/women1.jpg";
import delivery from "../assets/delivery.jpg";
import { PopularBusinessListType } from "./type";

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

export const PopularBusinessList: PopularBusinessListType[] = [
  {
    id: 1,
    name: "House Cleaning",
    about: "",
    address: "itahari, Sunsari",
    cateory: {
      name: "Cleaning",
    },
    contactPerson: "Aasma Gautam",
    email: "aasma@gmail.com",
    images: [women, women1],
  },
  {
    id: 2,
    name: "House Reparing",
    about: "",
    address: "Dharan, Sunsari",
    cateory: {
      name: "Repair",
    },
    contactPerson: "Pratham Neupane",
    email: "pratham@gmail.com",
    images: [repairing],
  },
  {
    id: 3,
    name: "House Painting",
    about: "",
    address: "Biratnagar, Morang",
    cateory: {
      name: "painting",
    },
    contactPerson: "Aadarsha Dhungana",
    email: "adarsha@gmail.com",
    images: [paint],
  },
  {
    id: 4,
    name: "Package Delivery",
    about: "",
    address: "Imadol, Lalitpur",
    cateory: {
      name: "Shifting",
    },
    contactPerson: "Aayush Karki",
    email: "ayush@gmail.com",
    images: [delivery],
  },
];
