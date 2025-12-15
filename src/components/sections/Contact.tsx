import { useState } from "react";
import { Send, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email via API endpoint
      const apiUrl = import.meta.env.VITE_API_URL || "/api";
      const response = await fetch(`${apiUrl}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          projectType: formData.projectType,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", subject: "", projectType: "", message: "" });
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        toast({
          title: "Error",
          description: errorData.error || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: `Connection error: ${error instanceof Error ? error.message : "Please ensure backend server is running on port 5000"}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <label htmlFor="phone" className="sr-only">Your Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your Phone (Optional)"
                value={formData.phone}
                onChange={handleChange}
                maxLength={20}
                className="contact-input"
              />
            </div>

            <div>
              <label htmlFor="subject" className="sr-only">Project Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Project Subject"
                value={formData.subject}
                onChange={handleChange}
                maxLength={100}
                className="contact-input"
              />
            </div>

            <div>
              <label htmlFor="projectType" className="sr-only">Project Type</label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="contact-input"
              >
                <option value="">Select Project Type</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="fullstack">Full Stack</option>
                <option value="ai">AI/ML</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
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
