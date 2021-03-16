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
				{ name: 'Astronomical Dawn Start', time: astronomicalDawn.start },
				{ name: 'Nautical Dawn Start', time: nauticalDawn.start },
				{ name: 'Civil Dawn Start', time: civilDawn.start },
				{
					name: 'Sunrise',
					time: new Date(
						sunrise.start.getTime() +
							(sunrise.end.getTime() - sunrise.start.getTime()) / 2,
					),
				},
				{ name: 'Solar Noon', time: transit },
				{
					name: 'Sunset',
					time: new Date(
						sunset.start.getTime() +
							(sunset.end.getTime() - sunset.start.getTime()) / 2,
					),
				},
				{ name: 'Civil Dusk End', time: civilDusk.end },
				{ name: 'Nautical Dusk End', time: nauticalDusk.end },
				{ name: 'Astronomical Dusk End', time: astronomicalDusk.end },
			];

			// astronomicalDawn
			const astronomicalDawnDiv = document.createElement('div');
			astronomicalDawnDiv.classList.add('flex', 'flex-row', 'justify-between');
			const astronomicalDawnText = document.createElement('p');
			astronomicalDawnText.innerText = 'Astronomical Dawn Start';
			const astronomicalDawnTime = document.createElement('p');
			astronomicalDawnTime.innerText = astronomicalDawn.start.toLocaleTimeString(
				[],
				{
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				},
			);
			astronomicalDawnDiv.appendChild(astronomicalDawnText);
			astronomicalDawnDiv.appendChild(astronomicalDawnTime);
			times.appendChild(astronomicalDawnDiv);

			// nauticalDawn
			const nauticalDawnDiv = document.createElement('div');
			nauticalDawnDiv.classList.add('flex', 'flex-row', 'justify-between');
			const nauticalDawnText = document.createElement('p');
			nauticalDawnText.innerText = 'Nautical Dawn Start';
			const nauticalDawnTime = document.createElement('p');
			nauticalDawnTime.innerText = nauticalDawn.start.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});
			nauticalDawnDiv.appendChild(nauticalDawnText);
			nauticalDawnDiv.appendChild(nauticalDawnTime);
			times.appendChild(nauticalDawnDiv);

			// civilDawn
			const civilDawnDiv = document.createElement('div');
			civilDawnDiv.classList.add('flex', 'flex-row', 'justify-between');
			const civilDawnText = document.createElement('p');
			civilDawnText.innerText = 'Civil Dawn Start';
			const civilDawnTime = document.createElement('p');
			civilDawnTime.innerText = civilDawn.start.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});
			civilDawnDiv.appendChild(civilDawnText);
			civilDawnDiv.appendChild(civilDawnTime);
			times.appendChild(civilDawnDiv);

			// sunrise
			const sunriseDiv = document.createElement('div');
			sunriseDiv.classList.add('flex', 'flex-row', 'justify-between');
			const sunriseText = document.createElement('p');
			sunriseText.innerText = 'Sunrise';
			const sunriseTime = document.createElement('p');
			sunriseTime.innerText = new Date(
				sunrise.start.getTime() +
					(sunrise.end.getTime() - sunrise.start.getTime()) / 2,
			).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});
			sunriseDiv.appendChild(sunriseText);
			sunriseDiv.appendChild(sunriseTime);
			times.appendChild(sunriseDiv);

			// transit
			const transitDiv = document.createElement('div');
			transitDiv.classList.add('flex', 'flex-row', 'justify-between');
			const transitText = document.createElement('p');
			transitText.innerText = 'Solar Noon';
			const transitTime = document.createElement('p');
			transitTime.innerText = transit.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});
			transitDiv.appendChild(transitText);
			transitDiv.appendChild(transitTime);
			times.appendChild(transitDiv);

			// sunset
			const sunsetDiv = document.createElement('div');
			sunsetDiv.classList.add('flex', 'flex-row', 'justify-between');
			const sunsetText = document.createElement('p');
			sunsetText.innerText = 'Sunset';
			const sunsetTime = document.createElement('p');
			sunsetTime.innerText = new Date(
				sunset.start.getTime() +
					(sunset.end.getTime() - sunset.start.getTime()) / 2,
			).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});
			sunsetDiv.appendChild(sunsetText);
			sunsetDiv.appendChild(sunsetTime);
			times.appendChild(sunsetDiv);

			// civilDusk
			const civilDuskDiv = document.createElement('div');
			civilDuskDiv.classList.add('flex', 'flex-row', 'justify-between');
			const civilDuskText = document.createElement('p');
			civilDuskText.innerText = 'Civil Dusk End';
			const civilDuskTime = document.createElement('p');
			civilDuskTime.innerText = civilDusk.end.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});
			civilDuskDiv.appendChild(civilDuskText);
			civilDuskDiv.appendChild(civilDuskTime);
			times.appendChild(civilDuskDiv);

			// nauticalDusk
			const nauticalDuskDiv = document.createElement('div');
			nauticalDuskDiv.classList.add('flex', 'flex-row', 'justify-between');
			const nauticalDuskText = document.createElement('p');
			nauticalDuskText.innerText = 'Nautical Dusk End';
			const nauticalDuskTime = document.createElement('p');
			nauticalDuskTime.innerText = nauticalDusk.end.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});
			nauticalDuskDiv.appendChild(nauticalDuskText);
			nauticalDuskDiv.appendChild(nauticalDuskTime);
			times.appendChild(nauticalDuskDiv);

			// astronomicalDusk
			const astronomicalDuskDiv = document.createElement('div');
			astronomicalDuskDiv.classList.add('flex', 'flex-row', 'justify-between');
			const astronomicalDuskText = document.createElement('p');
			astronomicalDuskText.innerText = 'Astronomical Dusk End';
			const astronomicalDuskTime = document.createElement('p');
			astronomicalDuskTime.innerText = astronomicalDusk.end.toLocaleTimeString(
				[],
				{
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				},
			);
			astronomicalDuskDiv.appendChild(astronomicalDuskText);
			astronomicalDuskDiv.appendChild(astronomicalDuskTime);
			times.appendChild(astronomicalDuskDiv);
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
</script>

<svelte:head>
	<title>Sun Time</title>
</svelte:head>

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
