module.exports = {
	plugins: {
		// Some plugins, like postcss-nested, need to run before Tailwind

		'@tailwindcss/jit': {},

		// But others, like autoprefixer, need to run after

		autoprefixer: {},
	},
};
