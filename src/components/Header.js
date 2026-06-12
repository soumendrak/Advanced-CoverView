import React from 'react';
import { Link } from 'react-router-dom'
import { AcvMark } from './icons'

const Header = () => {

	const tweetText = encodeURIComponent(`Check out Advanced CoverView - Create beautiful cover images for your blogs in seconds! Try it at https://cover.soumendrak.com by @soumendrak_`)

	return (

		<div className="bg-cream-100 font-Karla text-berry-900 md:px-4 px-2 py-3 flex items-center border-b-2 border-dashed border-peach-200">
			<Link to="/" className="flex items-center gap-2.5 group">
				<AcvMark className="w-8 h-8 mx-1 group-hover:rotate-6 transition-transform duration-300" />
				<h1 className="font-Fraunces font-semibold md:text-xl text-lg tracking-tight whitespace-nowrap">Advanced CoverView</h1>
			</Link>

			<div className="ml-auto md:mr-2 flex items-center gap-2">
				<Link to="/faq" className="text-berry-800 hover:text-straw-600 transition-colors text-sm font-bold mx-2 hidden md:inline-block">How to use</Link>
				<a href="https://github.com/soumendrak/Advanced-CoverView" target="_blank" rel="noreferrer" className="btn-squish bg-berry-900 hover:bg-berry-800 px-4 py-1.5 rounded-full text-cream-100 md:text-sm md:flex hidden items-center text-xs font-bold shadow-warm">⭐ Star on GitHub</a>
				<a href={`https://x.com/intent/tweet?text=${tweetText}`} className="btn-squish bg-straw-600 hover:bg-straw-500 md:text-sm text-xs rounded-full px-4 py-1.5 font-bold text-cream-50 shadow-pop">Share on X</a>
			</div>

		</div>

	);
}

export default Header;
