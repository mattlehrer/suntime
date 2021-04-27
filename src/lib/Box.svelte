<script>
	import { format } from 'date-fns';

	let showDetails = false;

	export let text: string;
	export let start: Date;
	export let end: Date;
	export let gradient: string = `background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%);`;
</script>

<div
	class="h-full anim"
	style={gradient}
	on:mouseenter={() => (showDetails = true)}
	on:mouseleave={() => (showDetails = false)}
	on:focusin={() => (showDetails = true)}
	on:focusout={() => (showDetails = false)}
	tabindex="0"
>
	{#if showDetails}
		<div
			class="mix-blend-difference flex justify-between h-full w-full items-end relative"
		>
			<div class="flex flex-col justify-center h-full ml-4">
				<p class="tabular-nums">
					{text}
				</p>
			</div>
			<div class="flex flex-col justify-between h-full center mr-4">
				<p class="tabular-nums">
					{format(start, 'h:mm:ss')}
				</p>
				<p class="tabular-nums">
					{format(end, 'h:mm:ss')}
				</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.center {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(0, -50%);
		min-height: 3.75rem;
	}

	/* @keyframes Box-highlight {
		to {
			background: red;
		}
	} */

	/* .anim:hover {
		animation: Box-highlight infinite 3s ease-in-out alternate;
	} */
</style>
