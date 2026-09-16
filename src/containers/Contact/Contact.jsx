import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Section from "../../components/Section";
import SocialLinks from "../../components/SocialLinks";
import WindowCard from "../../components/WindowCard";
import { profile } from "../../data/portfolio";
import { DUR, EASE, TRAVEL, reveal, slideX } from "../../utils/motion";
import "./Contact.scss";

const contactCards = [
  { icon: <FiMail />, label: "email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: <FiPhone />, label: "phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  { icon: <FiMapPin />, label: "location", value: profile.location, href: "" },
];

const Contact = () => {
  const form = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(form.current);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      form.current.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong sending your message. Please try emailing me directly.");
    }
  };

  return (
    <Section
      id="contact"
      index="05"
      eyebrow="Get In Touch"
      rightMeta={<>REPLY TIME <span>~24H</span></>}
      title="Let's build something together"
      subtitle="Have a role, project, or idea in mind? My inbox is open."
    >
      <div className="contact__layout">
        <motion.div
          className="contact__info"
          {...reveal(slideX(-TRAVEL.md), { once: true, amount: 0.4 })}
        >
          <WindowCard path="~/contact/info" tag="static">
            <div className="contact__cards">
              {contactCards.map((card) => {
                const Wrapper = card.href ? "a" : "div";
                return (
                  <Wrapper key={card.label} href={card.href || undefined} className="contact__card">
                    <span className="contact__card-icon">{card.icon}</span>
                    <div>
                      <p className="contact__card-label mono">{card.label}</p>
                      <p className="contact__card-value">{card.value}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
            <SocialLinks className="contact__socials" />
          </WindowCard>
        </motion.div>

        <motion.div {...reveal(slideX(TRAVEL.md), { once: true, amount: 0.4 })}>
          <WindowCard
            path="~/contact/compose"
            tag={status === "sending" ? "sending…" : "draft"}
            dotColor="var(--accent-2)"
            scrambleTag
          >
            <form ref={form} onSubmit={handleSubmit} className="contact__form">
              <AnimatePresence mode="wait" initial={false}>
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    className="contact__success"
                    initial={{ opacity: 0, y: TRAVEL.xs }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -TRAVEL.xs }}
                    transition={{ duration: DUR.sm, ease: EASE.snap }}
                  >
                    <FiCheckCircle />
                    <h3>Message sent!</h3>
                    <p>Thanks for reaching out — I'll get back to you soon.</p>
                    <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    className="contact__fields"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: DUR.sm }}
                  >
                    {[
                      { id: "name", type: "text", placeholder: "Jane Doe" },
                      { id: "email", type: "email", placeholder: "jane@company.com" },
                    ].map((field) => (
                      <div className="contact__field" key={field.id}>
                        <label htmlFor={field.id} className="mono">
                          &gt; {field.id}
                        </label>
                        <input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          required
                          placeholder={field.placeholder}
                          onFocus={() => setFocused(field.id)}
                          onBlur={() => setFocused("")}
                        />
                        <motion.span
                          className="contact__rail"
                          animate={{ scaleX: focused === field.id ? 1 : 0 }}
                          transition={{ duration: DUR.xs, ease: EASE.snap }}
                        />
                      </div>
                    ))}

                    <div className="contact__field">
                      <label htmlFor="message" className="mono">
                        &gt; message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project or opportunity..."
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused("")}
                      />
                      <motion.span
                        className="contact__rail"
                        animate={{ scaleX: focused === "message" ? 1 : 0 }}
                        transition={{ duration: DUR.xs, ease: EASE.snap }}
                      />
                    </div>

                    {status === "error" && <p className="contact__error">{errorMsg}</p>}

                    <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
                      {status === "sending" ? "Sending..." : "Send Message ⏎"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </WindowCard>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
