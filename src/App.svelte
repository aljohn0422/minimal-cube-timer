<script lang="ts">
	import Tailwind from "./Tailwind.svelte";
	import Timer from "./components/timer.svelte";
	import Scramble from "./components/scramble.svelte";
	import Solves from "./components/solves.svelte";
	import Controls from "./components/controls.svelte";
</script>

<main>
	<Tailwind />
	<div class="flex flex-col w-full h-full items-center justify-center">
		<Timer />
		<Scramble />
		<Controls />
		<Solves />
	</div>
</main>

<style>
</style>
