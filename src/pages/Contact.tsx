import { useState } from "react";
import type { SubmitEvent, ChangeEvent } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  Users,
} from "lucide-react";
import { PageHero } from "../components/PageHero";
import submitContactInfo from "../network/helpers/submitContactInfo";

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email Us",
    content: "info@maslowsbridge.org",
    subContent: "We read every message",
    accent: (
      <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-mb-accent" />
    ),
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Visit Us",
    content: " 5339 E 34th St",
    subContent: "Indianapolis, IN 46218",
    accent: (
      <Users className="w-4 h-4 absolute -top-1 -right-1 text-mb-accent" />
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setFormState({ status: "loading", message: "" });
    try {
      await submitContactInfo(formData);
      setFormState({
        status: "success",
        message: "Thank you for reaching out! We will touch base soon!",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (e) {
      console.log(e);
      setFormState({
        status: "error",
        message:
          "We couldn’t send your message right now. Please try again in a moment, or email us at info@maslowsbridge.org.",
      });
    }
  }

  const inputClass =
    "focus-ring w-full rounded-lg border border-mb-ink/20 bg-transparent px-3 py-2 text-base text-mb-ink placeholder:text-mb-ink/35 outline-none transition-colors duration-200 focus:border-mb-accent focus:ring-2 focus:ring-mb-accent/20 hover:border-mb-ink/30";

  const textareaClass =
    "focus-ring w-full rounded-lg border border-mb-ink/20 bg-transparent px-3 py-2 text-base text-mb-ink placeholder:text-mb-ink/35 outline-none transition-colors duration-200 resize-none focus:border-mb-accent focus:ring-2 focus:ring-mb-accent/20 hover:border-mb-ink/30";

  return (
    <div className="bg-mb-cream">
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        subtitle="Questions, partnerships, or need support? Reach out—we read every message."
        variant="atmosphere"
        size="large"
        className="pb-14 pt-14 sm:pb-16 sm:pt-20"
      />

      <section className="flex items-center justify-center px-4 pb-24 pt-10 sm:pb-32 sm:pt-14">
        <div className="w-full max-w-6xl">
          <motion.div
            className="grid grid-cols-1 overflow-hidden rounded-2xl shadow-2xl lg:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {/* ── Left sidebar — dark navy ── */}
            <motion.div
              className="relative overflow-hidden bg-mb-surface p-8 text-white md:p-12"
              variants={itemVariants}
            >
              {/* Animated orbs */}
              <motion.div
                className="absolute right-10 top-20 h-40 w-40 rounded-full bg-mb-accent/10 blur-3xl"
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden
              />
              <motion.div
                className="absolute bottom-20 left-10 h-32 w-32 rounded-full bg-mb-hope/15 blur-3xl"
                animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                aria-hidden
              />

              <div className="relative z-10">
                {/* Eyebrow + heading */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="font-display mb-4 text-4xl font-light text-mb-text-on-dark md:text-5xl">
                    Contact
                  </h2>
                  <motion.div
                    className="h-1 bg-mb-accent"
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    aria-hidden
                  />
                </motion.div>

                <motion.p
                  className="mb-12 leading-relaxed text-white/80"
                  variants={itemVariants}
                >
                  We're here to help and answer any questions you might have. We
                  look forward to hearing from you and making a difference
                  together.
                </motion.p>

                {/* Contact info cards */}
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group"
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="relative shrink-0 rounded-lg bg-mb-accent/10 p-3 text-mb-accent transition-colors duration-300 group-hover:bg-mb-accent/20"
                            whileHover={{
                              rotate: [0, -5, 5, 0],
                              transition: { duration: 0.5 },
                            }}
                          >
                            {info.icon}
                            {info.accent}
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="mb-1 font-medium text-white transition-colors duration-300 group-hover:text-mb-accent">
                              {info.title}
                            </h3>
                            <p className="text-sm text-white/70">
                              {info.content}
                            </p>
                            <p className="mt-1 text-xs text-white/50">
                              {info.subContent}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Floating dots */}
                <motion.div
                  className="absolute bottom-8 right-8 h-3 w-3 rounded-full bg-mb-accent"
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden
                />
                <motion.div
                  className="absolute right-12 top-1/3 h-2 w-2 rounded-full bg-mb-hope"
                  animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  aria-hidden
                />
              </div>
            </motion.div>

            {/* ── Right — form ── */}
            <motion.div
              className="bg-white p-8 md:p-12"
              variants={itemVariants}
            >
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="font-display mb-2 text-3xl font-light text-mb-ink">
                  Send us a message
                </h2>
                <p className="text-mb-ink/60">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-mb-ink"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    className={inputClass}
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email-field"
                    className="mb-2 block text-sm font-medium text-mb-ink"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email-field"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </motion.div>

                {/* Phone */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-mb-ink"
                  >
                    Phone{" "}
                    <span className="text-sm font-normal text-mb-ink/40">
                      (Optional)
                    </span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                    inputMode="tel"
                    className={inputClass}
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-mb-ink"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help..."
                    required
                    rows={5}
                    className={textareaClass}
                  />
                </motion.div>

                {/* Success banner */}
                {formState.status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <p className="text-sm">{formState.message}</p>
                  </motion.div>
                )}

                {/* Error banner */}
                {formState.status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p className="text-sm">{formState.message}</p>
                  </motion.div>
                )}

                {/* Submit */}
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={formState.status === "loading"}
                    className="focus-ring flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-mb-accent px-6 py-3.5 text-base font-medium text-mb-surface shadow-sm transition-all duration-300 hover:bg-mb-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {formState.status === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>

              <motion.div
                variants={itemVariants}
                className="mt-8 border-t border-mb-ink/10 pt-8"
              >
                <p className="text-center text-sm text-mb-ink/60">
                  By submitting this form, you acknowledge our{" "}
                  <Link
                    to="/privacy-policy"
                    className="focus-ring font-medium text-mb-accent underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
