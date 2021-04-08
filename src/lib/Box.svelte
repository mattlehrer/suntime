<script>
	import { format } from 'date-fns';

	let showDetails = false;

	export let text: string;
	export let start: Date;
	export let end: Date;
	export let gradient: string = `background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%);`;
</script>

<div
	class="h-full"
	style={gradient}
	on:mouseenter={() => (showDetails = true)}
	on:mouseleave={() => (showDetails = false)}
	on:focusin={() => (showDetails = true)}
	on:focusout={() => (showDetails = false)}
	tabindex="0"
>
	{#if showDetails}
		<div
			class="mix-blend-difference px-4 flex flex-col justify-between h-full items-end"
		>
			<div class="flex justify-between w-full">
				<p class="tabular-nums">
					{text}
				</p>
				<p class="tabular-nums">
					{format(start, 'h:mm:ss')}
				</p>
			</div>
			<p class="tabular-nums">
				{format(end, 'h:mm:ss')}
			</p>
		</div>
	{/if}
</div>
