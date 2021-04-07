import { sun } from '@modern-dev/daylight';
import { add, areIntervalsOverlapping, compareAsc } from 'date-fns';

export type TimeBox = {
	name: string;
	start: Date;
	end: Date;
};

export const timeboxes = ({
	date,
	lat,
	long,
}: {
	date: Date;
	lat: number;
	long: number;
}): TimeBox[] => {
	// date will be in one of 11 boxes:
	// night,
	// astronomicalDawn,
	// nauticalDawn,
	// civilDawn,
	// sunrise,
	// morning,
	// afternoon,
	// sunset,
	// civilDusk,
	// nauticalDusk,
	// astronomicalDusk,

	// and one box will be duplicated across the top and bottom of the screen when running from 12 hours before to 12 hours after the current time

	const twelveHoursBefore = add(date, { hours: -12 });
	const twelveHourseFromNow = add(date, { hours: 12 });
	const outputRange: TimeSpan = {
		start: twelveHoursBefore,
		end: twelveHourseFromNow,
	};

	let output: TimeBox[] = [];

	let yesterdaysTimes: { [key: string]: TimeSpan } = {};
	let tomorrowsTimes: { [key: string]: TimeSpan } = {};
	let todaysTimes: { [key: string]: TimeSpan } = {};
	let transit: Date, dawn: Date, dusk: Date;

	// transit, dawn, and dusk are Dates and the rest are TimeSpans
	({ transit, dawn, dusk, ...todaysTimes } = sun.getTimes(date, lat, long));
	// add morning and afternoon periods
	todaysTimes = {
		...todaysTimes,
		morning: { start: todaysTimes.sunrise.end, end: transit },
		afternoon: { start: transit, end: todaysTimes.sunset.start },
	};

	({ transit, dawn, dusk, ...yesterdaysTimes } = sun.getTimes(
		add(date, { days: -1 }),
		lat,
		long,
	));
	yesterdaysTimes = {
		...yesterdaysTimes,
		morning: { start: yesterdaysTimes.sunrise.end, end: transit },
		afternoon: { start: transit, end: yesterdaysTimes.sunset.start },
	};

	({ transit, dawn, dusk, ...tomorrowsTimes } = sun.getTimes(
		add(date, { days: 1 }),
		lat,
		long,
	));
	tomorrowsTimes = {
		...tomorrowsTimes,
		morning: { start: tomorrowsTimes.sunrise.end, end: transit },
		afternoon: { start: transit, end: tomorrowsTimes.sunset.start },
	};

	// add night to today, needs to reference other days
	todaysTimes = {
		...todaysTimes,
		preDawn: {
			start: yesterdaysTimes.astronomicalDusk.end,
			end: todaysTimes.astronomicalDawn.start,
		},
		postDusk: {
			start: todaysTimes.astronomicalDusk.end,
			end: tomorrowsTimes.astronomicalDawn.start,
		},
	};

	output = [
		...Object.entries(yesterdaysTimes)
			.filter(([, span]) => areIntervalsOverlapping(outputRange, span))
			.map(([name, span]) => ({ name, ...span })),
		...Object.entries(todaysTimes)
			.filter(([, span]) => areIntervalsOverlapping(outputRange, span))
			.map(([name, span]) => ({ name, ...span })),
		...Object.entries(tomorrowsTimes)
			.filter(([, span]) => areIntervalsOverlapping(outputRange, span))
			.map(([name, span]) => ({ name, ...span })),
	].sort(({ end: aEnd }, { end: bEnd }) => compareAsc(aEnd, bEnd));
	output[0].start = outputRange.start;
	output[output.length - 1].end = outputRange.end;

	return output;
};

type TimeSpan = {
	start: Date;
	end: Date;
};
