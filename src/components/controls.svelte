<script lang="ts">
    import { solves, Solve } from "../store/timer";
    function reset() {
        solves.update((n) => (n = <Solve[]>[]));
    }
</script>

{#if $solves.length > 0}
    <button class="m-4 px-2 hover:bg-slate-100" on:click={reset}>Reset</button>
{/if}
<!-- {@debug $solves} -->
