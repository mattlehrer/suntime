const COLORS = {
	night: `hsl(0, 0%, 0%)`,
	astronomical: `hsl(210, 100%, 9.02%)`,
	nautical: `hsl(231.09, 100%, 25.1%)`,
	civil: `hsl(231.09, 100%, 37%)`,
	sun: `hsl(33.88, 100%, 40.98%)`,
	noon: `hsl(233.06, 100%, 66.08%)`,
	light: `rgb(107,138,169)`,
	bright: `rgb(255,203,112)`,
};

export const gradients = {
	preDawn: `background: linear-gradient(180deg, ${COLORS.night} 0%, ${COLORS.night} 100%);`,
	astronomicalDawn: `background: linear-gradient(180deg, ${COLORS.astronomical} 0%, ${COLORS.astronomical} 100%);`,
	nauticalDawn: `background: linear-gradient(180deg, ${COLORS.nautical} 0%, ${COLORS.nautical} 100%);`,
	civilDawn: `background: linear-gradient(180deg, ${COLORS.civil} 0%, ${COLORS.civil} 100%);`,
	sunrise: `background: linear-gradient(180deg, ${COLORS.sun} 0%, ${COLORS.sun} 100%);`,
	day: `background: linear-gradient(180deg, ${COLORS.sun} 0%, ${COLORS.bright} 5%, ${COLORS.light} 10%,${COLORS.light} 90%, ${COLORS.bright} 95%, ${COLORS.sun} 100%);`,
	// afternoon: `background: linear-gradient(180deg, ${COLORS.bright} -50%, ${COLORS.light} 80%, ${COLORS.sun} 100%);`,
	sunset: `background: linear-gradient(180deg, ${COLORS.sun} 0%, ${COLORS.sun} 100%);`,
	civilDusk: `background: linear-gradient(180deg, ${COLORS.civil} 0%, ${COLORS.civil} 100%);`,
	nauticalDusk: `background: linear-gradient(180deg, ${COLORS.nautical} 0%, ${COLORS.nautical} 100%);`,
	astronomicalDusk: `background: linear-gradient(180deg, ${COLORS.astronomical} 0%, ${COLORS.astronomical} 100%);`,
	postDusk: `background: linear-gradient(180deg, ${COLORS.night} 0%, ${COLORS.night} 100%);`,
};
