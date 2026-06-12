import React, { useState } from 'react';
import Header from './Header';

const FAQS = [
    {
        q: 'What is Advanced CoverView?',
        a: <>Advanced CoverView is a tool to create cover images for your blogs quickly and easily — pick a theme, add your title, and download.</>,
    },
    {
        q: 'Is Advanced CoverView free?',
        a: <>Yes! Advanced CoverView is absolutely free to use. No signup, no watermark.</>,
    },
    {
        q: 'Can I upload my custom brand logo?',
        a: <>
            Yes. Just search and select <span className="font-bold">custom</span> in the icon section and you can
            upload your own logo to personalize your cover images.{' '}
            <a href="https://twitter.com/WankhadeRutik/status/1518270774335111168?s=20&t=XMjbJpGAC7anadJ690_DUg" className="text-straw-600 font-bold underline decoration-wavy decoration-peach-400 underline-offset-4" target="_blank" rel="noreferrer">See an example</a>.
        </>,
    },
    {
        q: 'Can I use it for non-technical or personal blogs?',
        a: <>Yes! Why not? Even though Advanced CoverView was built with technical blogs in mind, you can still use it for your personal blogs. Check out the stylish theme for more.</>,
    },
    {
        q: 'Why use Advanced CoverView?',
        a: <>Because it&apos;s simple, quick and easy to use. Why spend hours designing when you can create cover images in seconds?</>,
    },
    {
        q: 'How is this related to the original CoverView?',
        a: <>
            CoverView was originally created by{' '}
            <a href="https://github.com/rutikwankhade/CoverView" target="_blank" rel="noreferrer" className="font-bold text-straw-600 underline decoration-wavy decoration-peach-400 underline-offset-4">Rutik Wankhade</a>.
            {' '}Advanced CoverView is a fork by{' '}
            <a href="https://soumendrak.com" target="_blank" rel="noreferrer" className="font-bold text-straw-600 underline decoration-wavy decoration-peach-400 underline-offset-4">Soumendra Kumar Sahoo</a>{' '}
            that adds multi-format export, an HTTP API, an installable PWA, platform presets, an AI agent skill and more.
        </>,
    },
    {
        q: 'Want to support or sponsor the project?',
        a: <>
            If Advanced CoverView adds value in your life, you can{' '}
            <a href="https://soumendrak.com" target="_blank" rel="noreferrer" className="font-bold text-straw-600 underline decoration-wavy decoration-peach-400 underline-offset-4">sponsor me on GitHub</a>{' '}
            or{' '}
            <a href="https://soumendrak.com" target="_blank" rel="noreferrer" className="font-bold text-peach-600 underline decoration-wavy decoration-straw-300 underline-offset-4">buy me a coffee</a>.
        </>,
    },
];

const Faq = () => {

    const [showMsg, setShowMsg] = useState(false)

    return (
        <div className="min-h-screen bg-cream-100 text-berry-900 font-Karla">
            <Header />

            <div className="md:w-11/12 lg:w-9/12 max-w-6xl mx-auto md:p-10 lg:p-16 p-5">
                <p className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-leaf-600">Good questions</p>
                <h1 className="font-Fraunces font-semibold tracking-tight text-center text-[clamp(2rem,4.5vw,3.4rem)] mt-3">
                    Frequently asked <em className="italic text-straw-500">questions</em>
                </h1>

                <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-12 md:mt-16">

                    {FAQS.map((item, i) => (
                        <div key={item.q} className={`bg-cream-50 rounded-[24px] border border-berry-900/10 shadow-warm p-6 md:p-7 ${i % 2 ? 'md:rotate-[0.4deg]' : 'md:rotate-[-0.4deg]'} hover:rotate-0 transition-transform duration-300`}>
                            <p className="font-Fraunces font-semibold text-xl md:text-[1.35rem] tracking-tight pb-2.5">{item.q}</p>
                            <p className="text-[17px] leading-relaxed text-berry-700/90">{item.a}</p>
                        </div>
                    ))}

                </div>

                <div className="md:w-3/4 lg:w-1/2 mx-auto text-center mt-16 md:mt-20">
                    <button
                        onClick={() => setShowMsg(!showMsg)}
                        className="text-6xl text-center m-2 btn-squish inline-block"
                        aria-expanded={showMsg}
                    >💡</button>
                    <p className="text-xl font-Fraunces font-semibold">Want to know a secret? Click the bulb</p>

                </div>

                {
                    showMsg ?
                        <div className="animate-pop-in">
                            <h2 className="md:w-9/12 lg:w-7/12 font-Fraunces text-2xl md:text-3xl text-center mx-auto my-10 p-9 rounded-[28px] bg-cream-50 border-[3px] border-peach-300 shadow-warm -rotate-1">
                                Blog titles with a minimum of 8 words get <em className="italic text-straw-500">21% better</em> click-through.
                            </h2>
                        </div> :
                        <div></div>
                }

            </div>
        </div>
    );
}

export default Faq;
