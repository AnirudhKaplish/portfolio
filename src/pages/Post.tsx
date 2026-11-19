import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { POSTS } from '../hooks/data/posts';

const Post: React.FC = () => {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  useEffect(() => {
    if (!post) return;
    const prev = document.title;
    document.title = `${post.title} | Anirudh Kaplish`;
    return () => { document.title = prev; };
  }, [post]);
  if (!post) return <Navigate to="/classic#writing" replace />;
  const idx = POSTS.indexOf(post);
  const next = POSTS[(idx + 1) % POSTS.length];

  return (
    <article className="mx-auto max-w-2xl px-5 pt-28 pb-24">
      <Link to="/classic#writing" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"><ArrowLeft size={16} /> All writing</Link>
      <p className="mt-8 font-mono text-xs text-teal-300">{post.date} · {post.readTime} read</p>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight">{post.title}</h1>
      <div className="mt-4 flex flex-wrap gap-1.5">{post.tags.map((t) => <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-xs font-mono text-gray-300">{t}</span>)}</div>
      <div className="mt-10 space-y-5 text-gray-300 text-lg leading-relaxed">
        {post.blocks.map((b, i) => {
          if (b.type === 'h') return <h2 key={i} className="pt-4 text-2xl font-semibold text-white">{b.text}</h2>;
          if (b.type === 'code') return <pre key={i} className="overflow-x-auto rounded-lg border border-white/10 bg-[#0d1117] p-4 text-sm font-mono text-teal-100 custom-scrollbar"><code>{b.text}</code></pre>;
          if (b.type === 'list') return <ul key={i} className="list-disc pl-6 space-y-2">{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
          return <p key={i}>{b.text}</p>;
        })}
      </div>
      <Link to={`/blog/${next.slug}`} className="mt-16 block rounded-xl border border-white/10 p-5 hover:border-teal-300/50 transition-colors">
        <p className="font-mono text-xs text-gray-500">Next post</p><p className="mt-1 font-semibold">{next.title}</p>
      </Link>
    </article>
  );
};
export default Post;
