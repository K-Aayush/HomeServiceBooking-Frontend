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
import electric from "../assets/electricy.jpg";
import plumbing from "../assets/plumbing.jpg";
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
  ...Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: [
      "House Cleaning",
      "Car Repairing",
      "Furniture Shifting",
      "Plumbing Services",
      "House Painting",
      "Electrician Service",
    ][i % 6],
    about: "Quality service for your needs.",
    address: [
      "Itahari, Sunsari",
      "Dharan, Sunsari",
      "Biratnagar, Morang",
      "Imadol, Lalitpur",
      "Pokhara, Kaski",
      "Butwal, Rupandehi",
    ][i % 6],
    category: {
      name: [
        "Cleaning",
        "Repair",
        "Shifting",
        "Plumbing",
        "Painting",
        "Electric",
      ][i % 6],
    },
    contactPerson: [
      "Aasma Gautam",
      "Pratham Neupane",
      "Aadarsha Dhungana",
      "Aayush Karki",
      "Sandesh Poudel",
      "Sujan Acharya",
    ][i % 6],
    email: `business${i + 1}@gmail.com`,
    images: [
      [women, women1],
      [repairing],
      [delivery],
      [plumbing],
      [paint],
      [electric],
    ][i % 6],
  })),
];
