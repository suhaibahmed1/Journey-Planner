// backend/src/routes/trips.js
import { Router } from 'express';
const router = Router();

// Trips data
const trips = [
  // 🇵🇰 Pakistan Tours
  {
    id: 1,
    title: "Hunza Valley Explorer",
    category: "pakistan",
    location: "Hunza, Gilgit-Baltistan",
    price: "PKR 35,000",
    duration: "5 Days",
    groupSize: "8-12 people",
    rating: 4.8,
    image: "/Hunza-Valley.jpeg",
    description:
      "Experience the breathtaking beauty of Hunza Valley with its stunning landscapes, ancient forts, and rich culture.",
    highlights: ["Karimabad", "Baltit Fort", "Attabad Lake", "Eagle's Nest"],
  },
  {
    id: 2,
    title: "Skardu Adventure",
    category: "pakistan",
    location: "Skardu, Gilgit-Baltistan",
    price: "PKR 60,000",
    duration: "7 Days",
    groupSize: "8-15 people",
    rating: 4.9,
    image: "/Skardu.jpg",
    description:
      "Discover the gateway to K2 with pristine lakes, dramatic landscapes, and mountain adventures.",
    highlights: ["Shangrila Resort", "Satpara Lake", "Deosai Plains", "Shigar Fort"],
  },
  {
    id: 3,
    title: "Naran Kaghan Valley",
    category: "pakistan",
    location: "Naran, KPK",
    price: "PKR 25,000",
    duration: "4 Days",
    groupSize: "10-15 people",
    rating: 4.7,
    image: "/Naran-kaghan.jpg",
    description:
      "Explore the lush green valleys, crystal-clear lakes, and majestic mountains of Naran Kaghan.",
    highlights: ["Saif ul Malook", "Lalazar", "Babusar Top", "Lulusar Lake"],
  },
  {
    id: 4,
    title: "Swat Valley Paradise",
    category: "pakistan",
    location: "Swat, KPK",
    price: "PKR 40,000",
    duration: "5 Days",
    groupSize: "8-12 people",
    rating: 4.6,
    image: "/Swat-Valley.jpg",
    description:
      "Visit the Switzerland of Pakistan with its green meadows, rivers, and historical sights.",
    highlights: ["Kalam", "Mahodand Lake", "Ushu Forest", "Malam Jabba"],
  },
  {
    id: 5,
    title: "Fairy Meadows Trek",
    category: "pakistan",
    location: "Fairy Meadows, Gilgit-Baltistan",
    price: "PKR 75,000",
    duration: "7 Days",
    groupSize: "6-8 people",
    rating: 4.9,
    image: "/Fairy-Meadows.jpg",
    description:
      "Trek to the base camp of Nanga Parbat and experience the magical Fairy Meadows.",
    highlights: ["Nanga Parbat Base Camp", "Beyal Camp", "Raikot Bridge", "Tato Village"],
  },
  {
    id: 6,
    title: "Neelum Valley Getaway",
    category: "pakistan",
    location: "Neelum Valley, Azad Kashmir",
    price: "PKR 30,000",
    duration: "6 Days",
    groupSize: "8-14 people",
    rating: 4.7,
    image: "/Neelum-Valley.jpg",
    description:
      "Explore the lush, scenic Neelum Valley with crystal-clear rivers, forested mountains, and picturesque villages.",
    highlights: ["Keran", "Sharda", "Arang Kel", "Ratti Gali Lake"],
  },
  // 🌍 International Tours
  {
    id: 7,
    title: "Umrah Package Premium",
    category: "international",
    location: "Makkah & Madinah, Saudi Arabia",
    price: "PKR 250,000",
    duration: "10 Days",
    groupSize: "20-30 people",
    rating: 4.8,
    image: "/Umrah.jpg",
    description:
      "Complete Umrah package with comfortable accommodation near Haram and guided spiritual journey.",
    highlights: ["5-star Hotels", "Ziyarat Tours", "Transportation", "Visa Processing"],
  },
  {
    id: 8,
    title: "Hajj Package Deluxe",
    category: "international",
    location: "Saudi Arabia",
    price: "PKR 850,000",
    duration: "15 Days",
    groupSize: "15-25 people",
    rating: 4.9,
    image: "/Hajj.jpg",
    description:
      "Premium Hajj package with all rituals guidance and luxury accommodation.",
    highlights: ["Mina Camps", "Arafat", "Muzdalifah", "Complete Guidance"],
  },
  {
    id: 9,
    title: "Switzerland Alpine Tour",
    category: "international",
    location: "Switzerland",
    price: "PKR 400,000",
    duration: "7 Days",
    groupSize: "10-15 people",
    rating: 4.9,
    image: "/Alpine.jpg",
    description:
      "Discover the majestic Swiss Alps with pristine lakes, charming villages, and scenic train rides.",
    highlights: ["Jungfraujoch", "Interlaken", "Lucerne", "Rhine Falls"],
  },
  {
    id: 10,
    title: "Italy Cultural Experience",
    category: "international",
    location: "Italy",
    price: "PKR 320,000",
    duration: "8 Days",
    groupSize: "12-18 people",
    rating: 4.7,
    image: "/Italy.jpg",
    description:
      "Explore the rich history, art, and cuisine of Italy from Rome to Venice.",
    highlights: ["Colosseum", "Vatican City", "Florence", "Venice Canals"],
  },
  {
    id: 11,
    title: "Malaysia Singapore Delight",
    category: "international",
    location: "Malaysia & Singapore",
    price: "PKR 240,000",
    duration: "6 Days",
    groupSize: "15-20 people",
    rating: 4.6,
    image: "/Malaysia.jpg",
    description:
      "Experience the modern cities, cultural diversity, and delicious cuisine of Southeast Asia.",
    highlights: ["Petronas Towers", "Genting Highlands", "Marina Bay", "Universal Studios"],
  },
  {
    id: 12,
    title: "Vietnam Adventure",
    category: "international",
    location: "Vietnam",
    price: "PKR 280,000",
    duration: "8 Days",
    groupSize: "10-15 people",
    rating: 4.8,
    image: "/Vietnam.jpg",
    description:
      "Discover the natural beauty and rich culture of Vietnam from Hanoi to Ho Chi Minh City.",
    highlights: ["Ha Long Bay", "Sapa Rice Terraces", "Hoi An", "Mekong Delta"],
  },
];

// Route
router.get('/', (req, res) => {
  res.json(trips);
});

export default router;

