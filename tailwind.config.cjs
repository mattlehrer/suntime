const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');

module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,css,svelte}'],
	// purge: {
	// 	content: ['./src/**/*.{html, css, svelte}'],
	// 	options: {
	// 		defaultExtractor: (content) => [
	// 			// This is an internal Tailwind function that we're not supposed to be allowed to use
	// 			// So if this stops working, please open an issue at
	// 			// https://github.com/svelte-add/tailwindcss/issues
	// 			// rather than bothering Tailwind Labs about it
	// 			...tailwindExtractor(content),
	// 			// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
	// 			...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
	// 				([_match, group, ..._rest]) => group,
	// 			),
	// 		],
	// 		keyframes: true,
	// 	},
	// },
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
