import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Github, Linkedin, Send, Check, Copy } from 'lucide-react';
import { useProfile } from '../../hooks/usePortfolioData';
import Section from './Section';

const EMAIL = 'anirudh23.dev@gmail.com';
type S = 'idle' | 'sending' | 'sent' | 'error';

const Contact: React.FC = () => {
  const { profile } = useProfile();
  const [state, setState] = useState<S>('idle');
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') || ''), email = String(fd.get('email') || ''), message = String(fd.get('message') || '');
    const sid = import.meta.env.VITE_EMAILJS_SERVICE_ID, tid = import.meta.env.VITE_EMAILJS_TEMPLATE_ID, key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!sid || !tid || !key) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Portfolio message from ${name}`)}&body=${encodeURIComponent(`${message}\n\n${name} (${email})`)}`;
      return;
    }
    setState('sending');
    try {
      await emailjs.send(sid, tid, { name, email, message, time: new Date().toLocaleString() }, { publicKey: key });
      setState('sent'); form.reset(); setTimeout(() => setState('idle'), 4000);
    } catch { setState('error'); }
  };

  const copy = async () => { try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* blocked */ } };
  const field = 'w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 outline-none focus:border-teal-300 transition-colors placeholder:text-gray-600';

  return (
    <Section id="contact" eyebrow="07 / Contact" title="Let's work together.">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-gray-300 leading-relaxed max-w-md">I am looking for analytics, consulting and software roles. The fastest way to reach me is email.</p>
          <button onClick={copy} className="mt-6 inline-flex items-center gap-3 rounded-lg border border-white/15 px-5 py-3 font-mono hover:border-teal-300 transition-colors" aria-label="Copy email address">
            <Mail size={18} className="text-teal-300" /> {EMAIL} {copied ? <Check size={16} className="text-teal-300" /> : <Copy size={16} className="text-gray-500" />}
          </button>
          <div className="mt-6 flex gap-5 text-gray-400">
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Github size={18} /> GitHub</a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Linkedin size={18} /> LinkedIn</a>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block"><span className="sr-only">Name</span><input name="name" required placeholder="Your name" className={field} autoComplete="name" /></label>
            <label className="block"><span className="sr-only">Email</span><input name="email" type="email" required placeholder="Your email" className={field} autoComplete="email" /></label>
          </div>
          <label className="block"><span className="sr-only">Message</span><textarea name="message" required rows={5} placeholder="How can I help?" className={field} /></label>
          <button disabled={state === 'sending'} className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-teal-300 text-black font-semibold hover:bg-teal-200 disabled:opacity-60 transition-colors"><Send size={16} />{state === 'sending' ? 'Sending…' : 'Send message'}</button>
          <p role="status" className="text-sm h-5">
            {state === 'sent' && <span className="text-teal-300">Message sent. Thank you!</span>}
            {state === 'error' && <span className="text-red-400">Could not send. Please email {EMAIL} directly.</span>}
          </p>
        </form>
      </div>
    </Section>
  );
};
export default Contact;
