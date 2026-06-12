import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import cover1 from '../assets/images/cover1.webp';
import cover2 from '../assets/images/cover2.webp';
import cover3 from '../assets/images/cover3.webp';
import cover4 from '../assets/images/cover4.webp';

import step1 from '../assets/images/step1.png';
import step2 from '../assets/images/step2.png';

import hashnodeLogo from '../assets/images/hashnode-logo.png';
import devLogo from '../assets/images/dev-logo.png';

import { THEMES } from '../utils/constants';
import WallOfLove from './walloflove';
import {
    AcvMark, Sparkle, Squiggle, Wave,
    IconBolt, IconHeart, IconType, IconPalette, IconDownload,
    IconBot, IconCode, IconLayers, IconImage, IconDevice, IconGrid,
} from './icons';

/* ---------------------------------------------------------------- */
/*  Scroll-triggered reveals                                        */
/* ---------------------------------------------------------------- */

const useReveal = () => {
    useEffect(() => {
        const nodes = Array.from(document.querySelectorAll('.reveal'));
        if (!('IntersectionObserver' in window)) {
            nodes.forEach((node) => node.classList.add('is-visible'));
            return undefined;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
        );
        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);
};

/* ---------------------------------------------------------------- */
/*  Content                                                         */
/* ---------------------------------------------------------------- */

const TICKER_ITEMS = [
    'Covers in seconds',
    'No design skills needed',
    'Seven themes',
    'PNG · JPEG · WebP · SVG',
    'Free & open source',
    'Unsplash built in',
    '100+ dev icons',
    'HTTP API',
    'AI agent skill',
    'Works offline',
];

const HERO_CARDS = [
    { img: cover2, label: 'sample № 02', rotate: '-8deg', anim: 'animate-bob-slow', pos: 'left-[2.5%] top-[15%] w-[19vw] max-w-[255px]' },
    { img: cover3, label: 'sample № 03', rotate: '6deg', anim: 'animate-bob-slower', pos: 'left-[6%] bottom-[5%] w-[16vw] max-w-[215px]' },
    { img: cover1, label: 'sample № 01', rotate: '7deg', anim: 'animate-bob', pos: 'right-[2.5%] top-[13%] w-[20vw] max-w-[270px]' },
    { img: cover4, label: 'sample № 04', rotate: '-6deg', anim: 'animate-bob-slow', pos: 'right-[5.5%] bottom-[4%] w-[16vw] max-w-[225px]' },
];

const STEPS = [
    {
        number: '01',
        Icon: IconType,
        accent: 'text-straw-500',
        chip: 'bg-straw-100 text-straw-600',
        rotate: '-rotate-1',
        title: 'Add your words',
        body: 'Type your blog title and author name. The live preview updates with every keystroke.',
        visual: 'step1',
    },
    {
        number: '02',
        Icon: IconPalette,
        accent: 'text-peach-500',
        chip: 'bg-peach-100 text-peach-600',
        rotate: 'rotate-[1.25deg]',
        title: 'Make it yours',
        body: 'Pick colors, fonts and patterns. Choose one of 100+ dev icons — or upload your own logo.',
        visual: 'step2',
    },
    {
        number: '03',
        Icon: IconDownload,
        accent: 'text-leaf-500',
        chip: 'bg-leaf-300/30 text-leaf-600',
        rotate: 'rotate-[-0.75deg]',
        title: 'Choose & download',
        body: 'Select one of seven themes and export as PNG, JPEG, WebP or SVG — sized for any platform.',
        visual: 'covers',
    },
];

const STAT_BADGES = [
    { big: '7M+', small: 'blog posts ship every day. A custom cover is how yours stands out from the pile.', border: 'border-straw-300', tilt: '-rotate-2', accent: 'text-straw-500' },
    { big: '100%', small: 'yours — your colors, your icons, your brand on every single cover.', border: 'border-peach-300', tilt: 'rotate-1', accent: 'text-peach-500' },
    { big: '$0', small: 'forever. Open source under MIT, no signup, and it even works offline as a PWA.', border: 'border-leaf-300', tilt: '-rotate-1', accent: 'text-leaf-500' },
];

const PLATFORM_STAMPS = [
    { name: 'Hashnode', img: hashnodeLogo, ring: 'border-straw-300 text-straw-600' },
    { name: 'Dev.to', img: devLogo, ring: 'border-berry-700/40 text-berry-800' },
    { name: 'Medium', ring: 'border-leaf-400 text-leaf-600' },
    { name: 'LinkedIn', ring: 'border-peach-400 text-peach-600' },
    { name: 'X / Twitter', ring: 'border-berry-700/40 text-berry-800' },
    { name: 'YouTube', ring: 'border-straw-300 text-straw-600' },
    { name: 'Instagram', ring: 'border-peach-400 text-peach-600' },
    { name: '+ custom sizes', ring: 'border-dashed border-berry-700/40 text-berry-700' },
];

const DEVICON_SAMPLES = ['react', 'python', 'docker', 'go', 'figma', 'github'];

/* ---------------------------------------------------------------- */
/*  Building blocks                                                 */
/* ---------------------------------------------------------------- */

const PolaroidCard = ({ card, floating }) => (
    <figure
        className={`${floating ? `hidden xl:block absolute ${card.pos} ${card.anim}` : 'block'} group`}
        style={{ zIndex: 5 }}
    >
        <div
            className="relative bg-cream-50 rounded-2xl border border-berry-900/10 shadow-warm p-2.5 pb-3 transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:scale-[1.04]"
            style={{ transform: `rotate(${card.rotate})` }}
        >
            <AcvMark className="absolute -top-5 -left-5 w-11 -rotate-12 drop-shadow-md" />
            <img src={card.img} alt="Example blog cover made with Advanced CoverView" className="rounded-xl w-full" loading="lazy" />
            <figcaption className="flex items-center justify-between pt-2 px-1">
                <span className="font-Fraunces italic text-berry-700/70 text-xs md:text-sm">{card.label}</span>
                <Sparkle className="w-3 h-3 text-peach-500" />
            </figcaption>
        </div>
    </figure>
);

const TickerBand = () => (
    <div className="relative my-2" aria-hidden="true">
        <div className="absolute inset-x-[-2%] top-1/2 -translate-y-1/2 rotate-[1.1deg] bg-peach-400/80 h-10 rounded-sm" />
        <div className="relative rotate-[-1.2deg] scale-x-[1.02] bg-berry-900 text-cream-100 py-3 shadow-warm overflow-hidden">
            <div className="marquee-track animate-marquee">
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
                        {TICKER_ITEMS.map((item, i) => (
                            <span key={`${copy}-${item}`} className="flex items-center">
                                <span className="font-Karla font-bold uppercase tracking-[0.18em] text-xs md:text-sm whitespace-nowrap px-6">{item}</span>
                                <Sparkle className={`w-3.5 h-3.5 shrink-0 ${i % 2 ? 'text-peach-300' : 'text-straw-300'}`} />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const StepVisual = ({ visual }) => {
    if (visual === 'covers') {
        return (
            <div className="grid grid-cols-2 gap-2.5 mt-6">
                {[cover1, cover3, cover4, cover2].map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt="Theme example"
                        loading="lazy"
                        className={`rounded-lg border border-berry-900/10 shadow-sm transition-transform duration-300 hover:scale-105 ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
                    />
                ))}
            </div>
        );
    }
    const shot = visual === 'step1' ? step1 : step2;
    return (
        <div className="relative mt-6">
            <span className={`tape ${visual === 'step2' ? 'tape-straw' : ''} -top-3 left-1/2 -translate-x-1/2 -rotate-3 z-10`} />
            <img src={shot} alt="Advanced CoverView editor screenshot" loading="lazy" className="rounded-xl border border-berry-900/10 shadow-warm w-full" />
        </div>
    );
};

const FeatureCard = ({ Icon, iconTone, title, children, className = '', delay = 0 }) => (
    <article
        className={`reveal bg-cream-50 rounded-[30px] border border-berry-900/10 shadow-warm p-7 md:p-8 hover:-translate-y-1.5 transition-transform duration-500 ease-out ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
    >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconTone}`}>
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-Fraunces font-semibold text-2xl tracking-tight mt-5">{title}</h3>
        {children}
    </article>
);

/* ---------------------------------------------------------------- */
/*  Page                                                            */
/* ---------------------------------------------------------------- */

const Home = () => {
    useReveal();

    return (
        <div className="grain bg-cream-100 text-berry-900 font-Karla overflow-x-hidden">

            {/* ════════════════ SECTION 01 · HERO ════════════════ */}
            <section className="relative">

                {/* warm background blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute -top-32 -left-24 w-[44vw] h-[44vw] max-w-[640px] max-h-[640px] rounded-full bg-straw-200/70 blur-[110px] animate-drift-slow" />
                    <div className="absolute -top-20 right-[-10%] w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] rounded-full bg-peach-200/80 blur-[100px] animate-drift" />
                    <div className="absolute bottom-[-18%] left-1/3 w-[34vw] h-[34vw] max-w-[480px] max-h-[480px] rounded-full bg-leaf-300/30 blur-[90px] animate-drift-slow" />
                    <Sparkle className="absolute top-[22%] left-[18%] w-4 text-straw-300 animate-sway" />
                    <Sparkle className="absolute top-[14%] right-[24%] w-3 text-peach-400 animate-sway" style={{ animationDelay: '1.2s' }} />
                    <Sparkle className="absolute bottom-[26%] right-[16%] w-5 text-straw-200 animate-sway" style={{ animationDelay: '2.1s' }} />
                    <Sparkle className="absolute top-[40%] left-[7%] w-3.5 text-peach-300 animate-sway hidden lg:block" style={{ animationDelay: '0.8s' }} />
                    <Sparkle className="absolute bottom-[18%] right-[7%] w-4 text-leaf-300 animate-sway hidden lg:block" style={{ animationDelay: '1.7s' }} />
                </div>

                {/* nav */}
                <nav className="relative z-20 max-w-7xl mx-auto flex items-center gap-6 px-5 md:px-8 py-5">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <AcvMark className="w-9 h-9 group-hover:rotate-6 transition-transform duration-300" />
                        <span className="font-Fraunces font-semibold text-lg md:text-xl tracking-tight whitespace-nowrap">Advanced CoverView</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-7 ml-auto font-bold text-sm text-berry-800">
                        <a href="#how" className="hover:text-straw-600 transition-colors">How it works</a>
                        <a href="#features" className="hover:text-straw-600 transition-colors">Features</a>
                        <Link to="/faq" className="hover:text-straw-600 transition-colors">FAQ</Link>
                        <a href="https://cover.soumendrak.com/api/" target="_blank" rel="noreferrer" className="hover:text-straw-600 transition-colors">API</a>
                    </div>
                    <a
                        href="https://github.com/soumendrak/Advanced-CoverView"
                        target="_blank"
                        rel="noreferrer"
                        className="md:ml-0 ml-auto btn-squish bg-berry-900 text-cream-100 rounded-full px-4 py-2 text-xs md:text-sm font-bold flex items-center gap-2 shadow-warm whitespace-nowrap"
                    >
                        <span aria-hidden="true">⭐</span> Star on GitHub
                    </a>
                </nav>

                {/* hero body */}
                <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-20 md:pb-28">

                    {/* floating cover samples (xl and up) */}
                    {HERO_CARDS.map((card) => <PolaroidCard key={card.label} card={card} floating />)}

                    <div className="max-w-3xl mx-auto text-center">
                        <p className="reveal inline-flex items-center gap-2 bg-cream-50/80 backdrop-blur border-2 border-dashed border-straw-300 text-berry-800 rounded-full px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.14em]">
                            <Sparkle className="w-4 h-4 text-straw-500" /> Free &amp; open-source cover maker
                        </p>

                        <h1
                            className="reveal font-Fraunces font-semibold text-berry-900 leading-[0.98] tracking-tight mt-7 text-[clamp(2.9rem,7.2vw,5.6rem)]"
                            style={{ transitionDelay: '90ms' }}
                        >
                            Beautiful covers
                            <br />
                            for your blog —
                            <br />
                            <em className="relative inline-block italic text-straw-500 whitespace-nowrap">
                                ready in seconds.
                                <Squiggle className="absolute -bottom-3 left-0 w-full h-3.5 text-peach-400" />
                            </em>
                        </h1>

                        <p
                            className="reveal text-berry-700/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-8"
                            style={{ transitionDelay: '180ms' }}
                        >
                            Type a title, pick a theme, download. Seven layouts, Unsplash photos,
                            100+ icons and every platform size — in the editor, over the HTTP API,
                            or straight from your AI agent.
                        </p>

                        <div
                            className="reveal flex flex-col sm:flex-row items-center justify-center gap-5 mt-10"
                            style={{ transitionDelay: '270ms' }}
                        >
                            <Link
                                to="/editor"
                                className="btn-squish btn-shine group bg-straw-600 text-cream-50 rounded-full px-9 py-4 font-extrabold text-lg shadow-pop flex items-center gap-3"
                            >
                                Start creating — it&apos;s free
                                <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
                            </Link>
                            <a
                                href="#how"
                                className="font-bold text-berry-800 underline decoration-wavy decoration-2 decoration-peach-500 underline-offset-8 hover:text-straw-600 transition-colors"
                            >
                                See how it works ↓
                            </a>
                        </div>

                        <p
                            className="reveal text-sm text-berry-700/70 font-semibold mt-9 flex items-center justify-center gap-2 flex-wrap"
                            style={{ transitionDelay: '360ms' }}
                        >
                            <span>PNG · JPEG · WebP · SVG</span>
                            <Sparkle className="w-2.5 h-2.5 text-straw-400" />
                            <span>7 themes</span>
                            <Sparkle className="w-2.5 h-2.5 text-peach-500" />
                            <span>13 platform sizes</span>
                            <Sparkle className="w-2.5 h-2.5 text-leaf-400" />
                            <span>No signup</span>
                        </p>
                    </div>

                    {/* cover samples (below xl) */}
                    <div className="xl:hidden grid grid-cols-2 gap-x-5 gap-y-7 max-w-xl mx-auto mt-16">
                        {HERO_CARDS.map((card) => (
                            <div key={card.label} className="reveal"><PolaroidCard card={card} /></div>
                        ))}
                    </div>
                </div>

                <TickerBand />
            </section>

            {/* ════════════════ SECTION 02 · HOW IT WORKS + FEATURES ════════════════ */}
            <section id="how" className="relative bg-cream-200 pb-24 scroll-mt-6">
                <Wave className="w-full h-[54px] md:h-[76px] block" fill="#FFF9F1" />

                {/* heading */}
                <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 text-center">
                    <span className="ghost-word absolute -top-2 md:top-6 left-1/2 -translate-x-1/2 -rotate-3 font-Fraunces italic font-semibold whitespace-nowrap text-[clamp(4rem,13vw,10.5rem)]">
                        cover art
                    </span>

                    <p className="reveal relative inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-leaf-600">
                        <IconBolt className="w-4 h-4" /> How it works
                    </p>
                    <h2 className="reveal relative font-Fraunces font-semibold tracking-tight leading-[1.02] text-[clamp(2.1rem,4.6vw,3.7rem)] mt-4 max-w-3xl mx-auto" style={{ transitionDelay: '90ms' }}>
                        From blank page to cover
                        <br className="hidden md:block" /> in <em className="italic text-peach-600">three</em> simple steps
                    </h2>
                </div>

                {/* steps + dotted connector */}
                <div className="relative max-w-7xl mx-auto px-5 md:px-8 mt-14 md:mt-20">
                    <svg
                        viewBox="0 0 1200 150"
                        preserveAspectRatio="none"
                        className="hidden lg:block absolute -top-12 left-0 w-full h-36 text-peach-500/60"
                        aria-hidden="true"
                    >
                        <path
                            d="M70 110 C250 30 420 26 600 80 C780 134 950 130 1130 44"
                            stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 16" fill="none"
                        />
                    </svg>

                    <div className="grid md:grid-cols-3 gap-7 lg:gap-9">
                        {STEPS.map((s, i) => (
                            <article
                                key={s.number}
                                className={`reveal relative bg-cream-50 rounded-[30px] border border-berry-900/10 shadow-warm p-7 md:p-8 ${s.rotate} hover:rotate-0 hover:-translate-y-2 transition-transform duration-500 ease-out`}
                                style={{ transitionDelay: `${i * 110}ms` }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`font-Fraunces italic font-semibold text-6xl md:text-7xl ${s.accent}`}>{s.number}</span>
                                    <span className={`${s.chip} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                                        <s.Icon className="w-6 h-6" />
                                    </span>
                                </div>
                                <h3 className="font-Fraunces font-semibold text-2xl md:text-[1.7rem] tracking-tight mt-4">{s.title}</h3>
                                <p className="text-berry-700/90 leading-relaxed mt-3">{s.body}</p>
                                <StepVisual visual={s.visual} />
                            </article>
                        ))}
                    </div>
                </div>

                {/* stat badges */}
                <div className="max-w-5xl mx-auto px-5 md:px-8 mt-20 md:mt-24 grid sm:grid-cols-3 gap-6">
                    {STAT_BADGES.map((stat, i) => (
                        <div
                            key={stat.big}
                            className={`reveal bg-cream-50 border-[3px] ${stat.border} ${stat.tilt} rounded-[26px] px-6 py-7 text-center shadow-warm hover:rotate-0 transition-transform duration-500`}
                            style={{ transitionDelay: `${i * 110}ms` }}
                        >
                            <div className={`font-Fraunces italic font-semibold text-5xl ${stat.accent}`}>{stat.big}</div>
                            <p className="text-sm md:text-[15px] text-berry-700/90 leading-relaxed mt-3">{stat.small}</p>
                        </div>
                    ))}
                </div>

                {/* the full toolkit */}
                <div id="features" className="max-w-7xl mx-auto px-5 md:px-8 mt-24 md:mt-32 scroll-mt-10">
                    <div className="text-center">
                        <p className="reveal inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-straw-600">
                            <IconBot className="w-5 h-5" /> The full toolkit
                        </p>
                        <h2 className="reveal font-Fraunces font-semibold tracking-tight leading-[1.02] text-[clamp(2rem,4.2vw,3.4rem)] mt-4" style={{ transitionDelay: '90ms' }}>
                            Way <em className="italic text-straw-500">more</em> than an editor
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-7 mt-12 md:mt-16">

                        <FeatureCard Icon={IconBot} iconTone="bg-straw-100 text-straw-600" title="Your AI agent makes the cover" className="lg:col-span-2">
                            <p className="text-berry-700/90 leading-relaxed mt-3 max-w-2xl">
                                One command installs the cover skill for Claude Code, Cursor, Codex and friends.
                                Describe your post — the agent picks a fitting icon and photo keyword, balances
                                your title across lines, and renders the finished cover through the API.
                            </p>
                            <div className="mt-6 bg-berry-950 rounded-2xl p-5 font-mono text-[13px] leading-relaxed shadow-warm overflow-x-auto">
                                <div className="flex gap-1.5 mb-3" aria-hidden="true">
                                    <span className="w-2.5 h-2.5 rounded-full bg-straw-500" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-peach-400" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-leaf-400" />
                                </div>
                                <p className="text-cream-100/95 whitespace-nowrap"><span className="text-peach-300">$</span> npx coverview-skill</p>
                                <p className="text-leaf-300 whitespace-nowrap">✔ skill installed → .agents/skills/coverview-cover</p>
                                <p className="text-cream-100/60 mt-2 whitespace-nowrap">› &quot;Create a cover for my Postgres migration post…&quot;</p>
                                <p className="text-leaf-300 whitespace-nowrap">✔ cover.png rendered via /api/generate</p>
                            </div>
                        </FeatureCard>

                        <FeatureCard Icon={IconCode} iconTone="bg-peach-100 text-peach-600" title="An HTTP API for everything" delay={110}>
                            <p className="text-berry-700/90 leading-relaxed mt-3">
                                Generate covers programmatically — every theme, icon, pattern, font and
                                platform size, returned as PNG or SVG. No browser needed.
                            </p>
                            <div className="mt-6 bg-cream-200/80 border border-berry-900/10 rounded-2xl p-4 font-mono text-[12.5px] text-berry-800 overflow-x-auto whitespace-nowrap">
                                GET /api/generate?title=Hello+World&amp;theme=modern&amp;icon=react
                            </div>
                            <a href="https://cover.soumendrak.com/api/" target="_blank" rel="noreferrer" className="inline-block font-bold text-straw-600 hover:text-straw-500 mt-5 underline decoration-wavy decoration-peach-400 underline-offset-4">
                                Open the Swagger docs ↗
                            </a>
                        </FeatureCard>

                        <FeatureCard Icon={IconDevice} iconTone="bg-leaf-300/30 text-leaf-600" title="Installable PWA">
                            <p className="text-berry-700/90 leading-relaxed mt-3">
                                Add Advanced CoverView to your phone or desktop and keep creating
                                covers offline.
                            </p>
                        </FeatureCard>

                        <FeatureCard Icon={IconDownload} iconTone="bg-straw-100 text-straw-600" title="Four export formats" delay={110}>
                            <p className="text-berry-700/90 leading-relaxed mt-3">
                                Download every cover as PNG, JPEG, WebP or SVG — or copy it straight
                                to your clipboard.
                            </p>
                        </FeatureCard>

                        <FeatureCard Icon={IconImage} iconTone="bg-peach-100 text-peach-600" title="Unsplash built in" delay={220}>
                            <p className="text-berry-700/90 leading-relaxed mt-3">
                                Search photos without leaving the editor — with pagination, search
                                persistence, scroll memory and image caching.
                            </p>
                        </FeatureCard>

                        <FeatureCard Icon={IconGrid} iconTone="bg-leaf-300/30 text-leaf-600" title="100+ icons & 16 patterns" className="lg:col-span-2">
                            <p className="text-berry-700/90 leading-relaxed mt-3 max-w-2xl">
                                Pick any devicon — react, python, docker and a hundred more — or upload your
                                own brand logo. Layer it over 16 SVG pattern backgrounds with quick color presets.
                            </p>
                            <div className="flex items-center gap-5 mt-6 text-3xl text-berry-700/80" aria-hidden="true">
                                {DEVICON_SAMPLES.map((name) => (
                                    <i key={name} className={`devicon-${name}-plain hover:text-straw-600 transition-colors`}></i>
                                ))}
                                <span className="text-sm font-bold text-berry-700/60 font-Karla">+ many more</span>
                            </div>
                        </FeatureCard>

                        <Link
                            to="/editor"
                            className="reveal btn-squish btn-shine group bg-gradient-to-br from-straw-500 to-peach-500 text-cream-50 rounded-[30px] shadow-peach-pop p-7 md:p-8 flex flex-col justify-between min-h-[180px]"
                            style={{ transitionDelay: '110ms' }}
                        >
                            <span className="font-Fraunces font-semibold text-2xl tracking-tight leading-snug">
                                No setup, no signup —<br />the editor is one click away.
                            </span>
                            <span className="font-extrabold text-lg mt-6 flex items-center gap-2">
                                Open the editor
                                <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
                            </span>
                        </Link>

                    </div>
                </div>

                {/* theme shelf marquee */}
                <div className="mt-24 md:mt-32">
                    <div className="text-center px-5">
                        <p className="reveal inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-peach-600">
                            <IconLayers className="w-4 h-4" /> The theme shelf
                        </p>
                        <h2 className="reveal font-Fraunces font-semibold tracking-tight leading-[1.02] text-[clamp(2rem,4.2vw,3.4rem)] mt-4" style={{ transitionDelay: '90ms' }}>
                            Seven themes, <em className="italic text-straw-500">zero</em> design stress
                        </h2>
                    </div>

                    <div className="reveal marquee-paused marquee-mask mt-12 overflow-hidden" style={{ transitionDelay: '160ms' }}>
                        <div className="marquee-track animate-marquee-slow py-4">
                            {[0, 1].map((copy) => (
                                <div key={copy} className="flex shrink-0 items-stretch" aria-hidden={copy === 1}>
                                    {THEMES.map((theme, i) => (
                                        <figure
                                            key={`${copy}-${theme.label}`}
                                            className={`w-60 md:w-72 shrink-0 mx-3.5 bg-cream-50 rounded-2xl border border-berry-900/10 shadow-warm p-3 ${i % 2 ? 'rotate-[0.9deg]' : 'rotate-[-0.9deg]'} hover:-translate-y-2 hover:rotate-0 transition-transform duration-300`}
                                        >
                                            <img src={theme.preview} alt={`${theme.label} theme preview`} loading="lazy" className="rounded-xl w-full border border-berry-900/5" />
                                            <figcaption className="flex items-center justify-between px-1.5 pt-2.5">
                                                <span className="font-Fraunces italic text-berry-800 capitalize">{theme.label}</span>
                                                <Sparkle className={`w-4 h-4 ${i % 2 ? 'text-peach-500' : 'text-straw-400'}`} />
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* platform stamps */}
                <div className="max-w-5xl mx-auto px-5 md:px-8 mt-20 md:mt-24 text-center">
                    <h3 className="reveal font-Fraunces font-semibold text-2xl md:text-3xl tracking-tight">
                        Sized for <em className="italic text-peach-600">every</em> platform
                    </h3>
                    <div className="reveal flex flex-wrap items-center justify-center gap-3.5 mt-8" style={{ transitionDelay: '110ms' }}>
                        {PLATFORM_STAMPS.map((p, i) => (
                            <span
                                key={p.name}
                                className={`inline-flex items-center gap-2 bg-cream-50 border-2 ${p.ring} rounded-full px-4 py-2 text-sm font-extrabold ${i % 2 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 hover:scale-105 transition-transform duration-300 shadow-sm`}
                            >
                                {p.img && <img src={p.img} alt="" className="w-5 h-5 object-contain" />}
                                {p.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* wall of love */}
                <div className="max-w-6xl mx-auto px-5 md:px-8 mt-24 md:mt-28">
                    <div className="text-center">
                        <p className="reveal inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-straw-600">
                            <IconHeart className="w-4 h-4" /> Wall of love
                        </p>
                        <h2 className="reveal font-Fraunces font-semibold tracking-tight leading-[1.02] text-[clamp(2rem,4.2vw,3.4rem)] mt-4" style={{ transitionDelay: '90ms' }}>
                            Loved by writers <em className="italic text-straw-500">everywhere</em>
                        </h2>
                    </div>
                    <div className="reveal mt-10 bg-cream-50 rounded-[32px] border border-berry-900/10 shadow-warm overflow-hidden" style={{ transitionDelay: '160ms' }}>
                        <WallOfLove />
                    </div>
                </div>
            </section>

            {/* ════════════════ SECTION 03 · FINAL CTA + FOOTER ════════════════ */}
            <section className="relative bg-berry-950 text-cream-100">
                <Wave className="w-full h-[54px] md:h-[76px] block" fill="#FFF3E4" />

                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute top-1/4 -left-24 w-[36vw] h-[36vw] max-w-[520px] max-h-[520px] rounded-full bg-straw-600/25 blur-[110px] animate-drift-slow" />
                    <div className="absolute bottom-0 right-[-8%] w-[38vw] h-[38vw] max-w-[560px] max-h-[560px] rounded-full bg-peach-500/20 blur-[120px] animate-drift" />
                    <AcvMark className="absolute -bottom-12 -left-10 w-48 opacity-[0.07] rotate-12" />
                    <AcvMark className="absolute top-16 right-8 w-32 opacity-[0.07] -rotate-12 hidden md:block" />
                    <Sparkle className="absolute top-[30%] left-[22%] w-3.5 text-peach-300/60 animate-sway" />
                    <Sparkle className="absolute top-[46%] right-[26%] w-3 text-straw-300/60 animate-sway" style={{ animationDelay: '1.4s' }} />
                </div>

                <div className="relative max-w-4xl mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-16 text-center">
                    <AcvMark className="reveal w-16 mx-auto animate-sway" />
                    <h2 className="reveal font-Fraunces font-semibold tracking-tight leading-[1.02] text-[clamp(2.5rem,6vw,4.6rem)] mt-7" style={{ transitionDelay: '90ms' }}>
                        Ready to make
                        <br />
                        your{' '}
                        <em className="italic bg-gradient-to-r from-peach-300 via-straw-300 to-straw-400 bg-clip-text text-transparent">next cover</em>?
                    </h2>
                    <p className="reveal text-cream-100/75 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mt-7" style={{ transitionDelay: '180ms' }}>
                        Open the editor, type a title, and download your cover
                        before your coffee cools. No account, no watermark.
                    </p>
                    <div className="reveal mt-10" style={{ transitionDelay: '270ms' }}>
                        <Link
                            to="/editor"
                            className="btn-squish btn-shine group inline-flex items-center gap-3 bg-gradient-to-r from-straw-500 to-peach-500 text-cream-50 rounded-full px-11 py-5 font-extrabold text-xl shadow-peach-pop"
                        >
                            Open the editor
                            <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
                        </Link>
                        <p className="text-cream-100/55 text-sm font-semibold mt-6 tracking-wide">
                            Free forever · No signup · Works offline · MIT licensed
                        </p>
                    </div>
                </div>

                <footer className="relative border-t border-cream-100/10">
                    <div className="max-w-7xl mx-auto px-5 md:px-8 py-9 flex flex-col-reverse md:flex-row items-center gap-6 md:justify-between">
                        <div className="flex flex-col items-center md:items-start gap-2.5 text-center md:text-left">
                            <div className="flex items-center gap-2.5">
                                <AcvMark className="w-8 h-8" />
                                <span className="font-Fraunces font-semibold text-lg">Advanced CoverView</span>
                            </div>
                            <span className="text-sm md:text-[15px] text-cream-100/75 leading-relaxed">
                                Made with <span aria-hidden="true">💛</span> by{' '}
                                <a href="https://soumendrak.com" target="_blank" rel="noreferrer" className="font-bold text-cream-100 underline decoration-wavy decoration-peach-500 underline-offset-4 hover:text-peach-300 transition-colors">
                                    Soumendra Kumar Sahoo
                                </a>
                                {' '}· original CoverView by{' '}
                                <a href="https://github.com/rutikwankhade/CoverView" target="_blank" rel="noreferrer" className="font-bold text-cream-100 underline decoration-wavy decoration-straw-400 underline-offset-4 hover:text-peach-300 transition-colors">
                                    Rutik Wankhade
                                </a>
                            </span>
                        </div>
                        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-bold text-cream-100/75">
                            <Link to="/faq" className="hover:text-peach-300 transition-colors">How to use</Link>
                            <a href="https://github.com/soumendrak/Advanced-CoverView" target="_blank" rel="noreferrer" className="hover:text-peach-300 transition-colors">GitHub</a>
                            <a href="https://cover.soumendrak.com/api/" target="_blank" rel="noreferrer" className="hover:text-peach-300 transition-colors">API docs</a>
                            <a href="https://soumendrak.com" target="_blank" rel="noreferrer" className="hover:text-peach-300 transition-colors">Buy me a coffee</a>
                        </nav>
                    </div>
                </footer>
            </section>
        </div>
    );
};

export default Home;
