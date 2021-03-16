<script>
	import type { SunTimes } from '@modern-dev/daylight';
	import { sun } from '@modern-dev/daylight';
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

			times = document.getElementById('times');

			const timeTuples = [
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
				const div = document.createElement('div');
				div.classList.add('flex', 'flex-row', 'justify-between', 'relative');
				const textP = document.createElement('p');
				textP.innerText = text;
				const timeP = document.createElement('p');
				timeP.innerText = time.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				});

				// calculate time since midnight for now
				// TODO: switch order to center current time
				const sinceMidnight = getMsSinceMidnight(time);
				const dayMs = 24 * 60 * 60 * 1000 * 1.03; // +3% so times at bottom edge are on screen
				const percentOfDay = sinceMidnight / dayMs;

				console.log({ sinceMidnight, dayMs, percentOfDay });

				div.setAttribute(
					'style',
					`top: ${((percentOfDay * innerHeight) / innerWidth) * 100}%`,
				);

				div.appendChild(textP);
				div.appendChild(timeP);
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
	<div id="bg" class="absolute inset-0 h-full" />

	<main class="absolute inset-0 h-full text-gray-50">
		<div class="grid min-h-full text-center place-content-center">
			<p class="text-center text-7xl font-extralight tabular-nums">
				{date
					.toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
					})
					.slice(0, -3)}
			</p>
			<p class="text-xl">
				{date.toLocaleDateString([], {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</p>
			<p class="text-lg font-thin">
				{city ? city : ''}
			</p>
		</div>

		<div class="absolute inset-0 px-4 text-red-500" id="times" />
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
