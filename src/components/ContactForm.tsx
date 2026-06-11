import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import submitContactInfo from "../network/helpers/submitContactInfo";

const inputClass =
  "focus-ring w-full rounded-lg border border-mb-ink/20 bg-transparent px-3 py-2 text-base text-mb-ink placeholder:text-mb-ink/35 outline-none transition-colors duration-200 focus:border-mb-accent focus:ring-2 focus:ring-mb-accent/20 hover:border-mb-ink/30";

const textareaClass =
  "focus-ring w-full rounded-lg border border-mb-ink/20 bg-transparent px-3 py-2 text-base text-mb-ink placeholder:text-mb-ink/35 outline-none transition-colors duration-200 resize-none focus:border-mb-accent focus:ring-2 focus:ring-mb-accent/20 hover:border-mb-ink/30";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const key = import.meta.env.PUBLIC_EMAIL_JS_PUBLIC_KEY;
    if (key) emailjs.init(key);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setLoading(true);
    try {
      await submitContactInfo(formData);
      setSuccessMessage(
        "Thank you for reaching out! We will touch base soon!",
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setErrorMessage(
        "We couldn\u2019t send your message right now. Please try again in a moment, or email us at info@maslowsbridge.org.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-mb-ink">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
          autoComplete="name"
          className={inputClass}
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div>
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
          placeholder="your.email@example.com"
          required
          autoComplete="email"
          className={inputClass}
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-mb-ink">
          Phone{" "}
          <span className="text-sm font-normal text-mb-ink/40">(Optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          autoComplete="tel"
          inputMode="tel"
          className={inputClass}
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-mb-ink">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us how we can help..."
          required
          rows={5}
          className={textareaClass}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
        />
      </div>

      {successMessage ? (
        <div
          className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
          role="status"
        >
          <svg
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm">{successMessage}</p>
        </div>
      ) : null}
      {errorMessage ? (
        <div
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
          role="alert"
        >
          <svg
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-sm">{errorMessage}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="focus-ring flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-mb-accent px-6 py-3.5 text-base font-medium text-mb-surface shadow-sm transition-all duration-300 hover:bg-mb-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span
          className={`contact-submit-loading flex items-center gap-2 ${loading ? "" : "hidden"}`}
        >
          <svg
            className="h-5 w-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          Sending...
        </span>
        <span
          className={`contact-submit-idle flex items-center gap-2 ${loading ? "hidden" : ""}`}
        >
          Send Message
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5"
            />
          </svg>
        </span>
      </button>
    </form>
  );
}
