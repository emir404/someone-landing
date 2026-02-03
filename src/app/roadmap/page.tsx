"use client";

import { motion } from "motion/react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import Header from "@/components/Header";

const roadmapItems = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "completed",
    items: [
      "Launch waitlist",
      "Build core identity system",
      "Design profile cards",
    ],
  },
  {
    phase: "Phase 2",
    title: "Beta Launch",
    status: "in-progress",
    items: [
      "Invite first 1,000 users",
      "Custom profile themes",
      "Social links integration",
    ],
  },
  {
    phase: "Phase 3",
    title: "Public Launch",
    status: "upcoming",
    items: [
      "Open registration",
      "Analytics dashboard",
      "API access",
    ],
  },
  {
    phase: "Phase 4",
    title: "Expansion",
    status: "upcoming",
    items: [
      "Team profiles",
      "Verified badges",
      "Premium features",
    ],
  },
];

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-[#FF4100]">
      <Header />

      <main className="flex flex-col items-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12 md:mt-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight italic">
            Roadmap
          </h1>
          <p className="text-white/80 mt-4 text-lg max-w-md mx-auto">
            See what we&apos;re building and what&apos;s coming next
          </p>
        </motion.div>

        <div className="mt-12 md:mt-16 w-full max-w-2xl space-y-6">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm text-gray-500 font-medium">{item.phase}</span>
                  <h3 className="text-xl font-bold text-black">{item.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === "completed" && (
                    <>
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">Completed</span>
                    </>
                  )}
                  {item.status === "in-progress" && (
                    <>
                      <ClockIcon className="w-5 h-5 text-[#FF4100]" />
                      <span className="text-sm text-[#FF4100] font-medium">In Progress</span>
                    </>
                  )}
                  {item.status === "upcoming" && (
                    <span className="text-sm text-gray-400 font-medium">Upcoming</span>
                  )}
                </div>
              </div>
              <ul className="space-y-2">
                {item.items.map((listItem) => (
                  <li key={listItem} className="flex items-center gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    {listItem}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
