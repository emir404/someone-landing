"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const easeOutExpo = [0.16, 1, 0.3, 1];
const WAITLIST_STORAGE_KEY = "someone_waitlist_joined";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user has already joined on mount
  useEffect(() => {
    const hasJoined = localStorage.getItem(WAITLIST_STORAGE_KEY);
    if (hasJoined) {
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 409) {
        // Email already exists - still mark as success
        localStorage.setItem(WAITLIST_STORAGE_KEY, email);
        setIsSubmitted(true);
        setEmail("");
      } else if (!response.ok) {
        setError(data.error || "Something went wrong");
      } else {
        // Success
        localStorage.setItem(WAITLIST_STORAGE_KEY, email);
        setIsSubmitted(true);
        setEmail("");
      }
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FF4100] overflow-x-hidden">
      <div className="px-6 md:px-12 lg:px-30">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <main className="px-6 md:px-12 lg:px-30 pt-16 md:pt-24 pb-16">
          <section className="flex flex-col items-start gap-12 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.2, ease: easeOutExpo }}
              className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-[-0.02em] leading-[0.9]"
              style={{ fontVariationSettings: "'opsz' 30" }}
            >
              Own your name <br />
              on the internet
            </motion.h1>

            <div className="min-h-[108px] sm:min-h-[50px] flex items-start">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: easeOutExpo }}
                    className="h-[50px] px-5 rounded-full bg-white flex items-center gap-2.5"
                    style={{ fontVariationSettings: "'opsz' 6" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.15,
                      }}
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF4100] shrink-0"
                    >
                      <motion.svg
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </motion.div>
                    <span className="text-lg font-medium text-black leading-none">
                      You&apos;re on the waitlist!
                    </span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{
                      opacity: 0,
                      scale: 0.98,
                      filter: "blur(8px)",
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.5,
                      ease: easeOutExpo,
                    }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 w-full sm:w-auto"
                  >
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder="emir@witharc.co"
                        className="w-full sm:w-80"
                        disabled={isSubmitting}
                        required
                      />
                    <motion.div
                      initial={false}
                      animate={{ width: isSubmitting ? 50 : "auto" }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full overflow-hidden"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {isSubmitting ? (
                            <motion.svg
                              key="spinner"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{
                                duration: 0.25,
                                ease: "easeOut",
                              }}
                              className="w-5 h-5 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </motion.svg>
                          ) : (
                            <motion.span
                              key="text"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{
                                duration: 0.25,
                                ease: "easeOut",
                              }}
                              className="whitespace-nowrap"
                            >
                              Join Waitlist
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                    </div>
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="text-white/90 text-sm font-medium"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </section>
        </main>

        {/* Email Panel - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.8, ease: easeOutExpo }}
          className="hidden lg:block absolute top-0 right-0 z-10"
        >
          <img
            src="/email.png"
            alt="Email notifications"
            className="w-[20rem] xl:w-[38rem] h-auto"
            style={{ filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))" }}
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 1, ease: easeOutExpo }}
        className="px-6 md:px-12 lg:px-30 pb-12"
      >
        <img
          src="/profile.png"
          alt="Profile preview"
          className="w-[140%] max-w-none md:w-full md:max-w-full h-auto rounded-3xl"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
