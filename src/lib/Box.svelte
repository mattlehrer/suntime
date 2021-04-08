<script>
	export let text: string;
	export let gradient: string = `background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%);`;
</script>

<p class="h-full" style={gradient}>
	{text}
</p>
