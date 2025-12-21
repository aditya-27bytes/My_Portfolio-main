import { useState } from "react";
import { Send, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-12 pb-24 lg:pb-12 animate-fade-up">
      <h2 className="text-3xl font-semibold mb-2">
        Get In <span className="gradient-text">Touch</span>
      </h2>
      <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-border h-[300px] lg:h-full min-h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122270.77aboron7!2d75.0624!3d15.3647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7549734c4d3%3A0x4c0e9b6f2b2e9fc8!2sHubli%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1703001234567!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map - Hubli, Karnataka"
          />
        </div>

        {/* Contact Form */}
        <div className="glass-card rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Based in</p>
              <p className="font-medium">Hubli, Karnataka, India</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                className="contact-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={255}
                className="contact-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={1000}
                rows={5}
                className="contact-input resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
