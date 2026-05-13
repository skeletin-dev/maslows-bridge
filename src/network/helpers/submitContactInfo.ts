import emailjs from "@emailjs/browser";

export default async function submitContactInfo(contactInfo: ContactFormData) {
  const { name, email, message, phone } = contactInfo;
  const { PUBLIC_SERVICE_ID, PUBLIC_TEMPLATE_ID, PUBLIC_TO_EMAIL } = import.meta
    .env;
  return emailjs.send(PUBLIC_SERVICE_ID!, PUBLIC_TEMPLATE_ID!, {
    to_email: PUBLIC_TO_EMAIL,
    from_name: name,
    from_email: email,
    time: new Date().toTimeString(),
    message,
    phone,
  });
}
