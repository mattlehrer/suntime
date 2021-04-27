<script>
	import Box from '$lib/Box.svelte';
	import { gradients } from '$lib/gradients';
	import type { TimeBox } from '$lib/timeboxes';
	import { timeboxes } from '$lib/timeboxes';
	import { toSentenceCase } from '$lib/utils';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	// https://github.com/modern-dev/daylight

	let date = new Date();
	let lat: number;
	let long: number;
	let city: string;
	let timeBoxes: HTMLElement;
	let innerHeight: number;
	let boxes: TimeBox[] = [];

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

			date = new Date();
			boxes = timeboxes({ date, lat, long });
			console.log({ boxes });
		} catch (error) {
			console.error(error);
		}

		const interval = setInterval(() => {
			date = new Date();
			boxes = timeboxes({ date, lat, long });
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	function percentOfDay(start: Date, end: Date): number {
		return (100 * (end.getTime() - start.getTime())) / (1000 * 60 * 60 * 24);
	}
</script>

<svelte:head>
	<title>Sun Time</title>
</svelte:head>

<svelte:window bind:innerHeight />

<div class="relative h-full bg-black">
	<main class="absolute inset-0 h-full text-gray-50">
		<div
			id="clock"
			class="min-h-full text-center grid place-content-center mix-blend-difference"
		>
			<p
				class="text-5xl text-center sm:text-6xl md:text-7xl font-extralight tabular-nums"
			>
				{format(date, 'h:mm:ss aaa')}
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
			class="text-yellow-400 mix-blend-difference absolute inset-0 flex flex-col"
			id="times"
			bind:this={timeBoxes}
		>
			{#each boxes as box}
				<div style="height:{percentOfDay(box.start, box.end)}%;">
					<Box
						text={toSentenceCase(box.name)}
						gradient={gradients[box.name]}
						start={box.start}
						end={box.end}
					/>
				</div>
			{/each}
		</div>
	</main>
</div>
