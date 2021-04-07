<script>
	import type { SunTimes } from '@modern-dev/daylight';
	import { sun } from '@modern-dev/daylight';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	// https://github.com/modern-dev/daylight

	let date = new Date();
	let lat: number;
	let long: number;
	let city: string;
	let sunTimes: SunTimes;
	let times: HTMLElement;
	let innerHeight: number;
	let innerWidth: number;
	let timeTuples: {
		text: string;
		time: Date;
	}[];

	onMount(async () => {
		try {
			// const url = 'http://www.geoplugin.net/json.gp?';

			// const payload = await wretch(url).get().json();

			// console.log(payload, null, 2);

			// ({
			// 	geoplugin_latitude: lat,
			// 	geoplugin_longitude: long,
			// 	geoplugin_city: city,
			// } = payload);
			lat = 47.6631;
			long = -122.3029;
			city = 'Seattle';

			sunTimes = sun.getTimes(date, lat, long);
			const {
				astronomicalDawn,
				nauticalDawn,
				civilDawn,
				sunrise,
				transit,
				sunset,
				civilDusk,
				nauticalDusk,
				astronomicalDusk,
			} = sunTimes;
			console.log(sunTimes);

			// times = document.getElementById('times');

			timeTuples = [
				{ text: 'Astronomical Dawn Start', time: astronomicalDawn.start },
				{ text: 'Nautical Dawn Start', time: nauticalDawn.start },
				{ text: 'Civil Dawn Start', time: civilDawn.start },
				{
					text: 'Sunrise',
					time: new Date(
						sunrise.start.getTime() +
							(sunrise.end.getTime() - sunrise.start.getTime()) / 2,
					),
				},
				{ text: 'Solar Noon', time: transit },
				{
					text: 'Sunset',
					time: new Date(
						sunset.start.getTime() +
							(sunset.end.getTime() - sunset.start.getTime()) / 2,
					),
				},
				{ text: 'Civil Dusk End', time: civilDusk.end },
				{ text: 'Nautical Dusk End', time: nauticalDusk.end },
				{ text: 'Astronomical Dusk End', time: astronomicalDusk.end },
			];

			timeTuples.forEach(({ text, time }) => {
				const div = document.createElement('hr');
				div.classList.add(
					'absolute',
					'w-full',
					'text-white',
					'h-px',
					'border-0',
				);
				div.setAttribute('id', text);
				// const div = document.createElement('div');
				// div.classList.add(
				// 	'flex',
				// 	'flex-row',
				// 	'justify-between',
				// 	'absolute',
				// 	'w-full',
				// 	'text-sm',
				// 	'sm:text-base',
				// 	'px-4',
				// 	'sm:px-8',
				// );

				// const textP = document.createElement('p');
				// textP.innerText = text;
				// const timeP = document.createElement('p');
				// timeP.innerText = '>';
				// timeP.setAttribute(
				// 	'title',
				// 	time.toLocaleTimeString([], {
				// 		hour: '2-digit',
				// 		minute: '2-digit',
				// 		second: '2-digit',
				// 	}),
				// );
				// timeP.innerText = time.toLocaleTimeString([], {
				// 	hour: '2-digit',
				// 	minute: '2-digit',
				// 	second: '2-digit',
				// });
				// div.appendChild(textP);
				// div.appendChild(timeP);

				// calculate time since midnight for now
				// TODO: switch order to center current time?
				const sinceMidnight = getMsSinceMidnight(time);
				const dayMs = 24 * 60 * 60 * 1000 * 1.03; // +3% so times at bottom edge are on screen
				const percentOfDay = sinceMidnight / dayMs;
				div.style.top = `${percentOfDay * innerHeight}px;`;
				// div.style['mix-blend-mode'] = 'difference';
				// div.setAttribute('style', `'mix-blend-mode': difference`);

				if (text === 'Solar Noon') {
					div.classList.add(
						'bg-gradient-to-r',
						'from-current',
						'via-transparent',
						'to-current',
					);
				} else {
					div.classList.add('bg-white');
					div.style['mix-blend-mode'] = 'difference';
					// div.setAttribute('style', `'mix-blend-mode': difference`);
				}

				times.appendChild(div);
			});
		} catch (error) {
			console.error(error);
		}

		// astrodawn = document
		// 	.getElementById('astrodawn')
		// 	.setAttribute('style', `top: ${}%`);

		const interval = setInterval(() => {
			date = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	$: innerHeight &&
		timeTuples.forEach(({ text, time }) => {
			const div = document.getElementById(text);

			// calculate time since midnight for now
			// TODO: switch order to center current time
			const sinceMidnight = getMsSinceMidnight(time);
			const dayMs = 24 * 60 * 60 * 1000 * 1.03; // +3% so times at bottom edge are on screen
			const percentOfDay = sinceMidnight / dayMs;
			// console.log({ text, percentOfDay, innerHeight });

			div.setAttribute('style', `top: ${percentOfDay * innerHeight}px`);
		});

	function getMsSinceMidnight(d: Date) {
		const midnight = new Date(d);
		midnight.setHours(0, 0, 0, 0);
		return d.getTime() - midnight.getTime();
	}
</script>

<svelte:head>
	<title>Sun Time</title>
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth />

<div class="relative h-full">
	<div id="bg" class="fixed inset-0 h-full" />

	<main class="absolute inset-0 h-full text-gray-50">
		<div
			id="clock"
			class="min-h-full text-center grid place-content-center mix-blend-difference"
		>
			<p
				class="text-5xl text-center sm:text-6xl md:text-7xl font-extralight tabular-nums"
			>
				{format(date, 'hh:mm:ss')}
			</p>
			<p class="mt-2 text-sm md:text-xl">
				{format(date, 'PPP')}
				{format(date, 'B')}
			</p>
			<p class="font-thin mt-2 md:text-lg {city ? '' : 'invisible'}">
				<!-- visibility: hidden to keep line height, no jank/content shift -->
				{city ? city : 'Where are you?'}
			</p>
		</div>

		<div
			class="text-yellow-400 mix-blend-difference"
			id="times"
			bind:this={times}
		/>
	</main>
</div>

<style>
	#bg {
		background-image: linear-gradient(
			to bottom,
			rgba(249, 251, 240, 1) 10%,
			rgba(215, 253, 254, 1) 15%,
			rgba(167, 222, 253, 1) 20%,
			rgb(76, 122, 178) 30%,
			rgb(59, 96, 141) 35%,
			rgb(41, 67, 100) 40%,
			rgb(8, 13, 20) 100%
		);
		/* opacity: 0.75; */
	}
</style>
