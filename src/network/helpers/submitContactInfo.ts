import emailjs from "@emailjs/browser";

export default async function submitContactInfo(contactInfo: ContactFormData) {
  const { name, email, message, phone } = contactInfo;
  const { VITE_SERVICE_ID, VITE_TEMPLATE_ID, VITE_TO_EMAIL } = import.meta.env;
  return emailjs.send(VITE_SERVICE_ID, VITE_TEMPLATE_ID, {
    to_email: VITE_TO_EMAIL,
    from_name: name,
    from_email: email,
    time: new Date().toTimeString(),
    message,
    phone,
  });
}
