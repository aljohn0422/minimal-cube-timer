<script lang="ts">
    import App from "../App.svelte";
    import { solves, Solve } from "../store/timer";
    import Controls from "./controls.svelte";

    function ma(array: Solve[], window: number): number {
        const len = array.length;
        let summ = 0;
        array.slice(len - window, len).forEach((ele) => {
            summ += ele.time;
        });
        summ /= window;
        return summ;
    }
    $: {
        const len = $solves.length;
        if (len >= 3) {
            solves.update((n) => {
                n[len - 1].mean3 = ma($solves, 3);
                return n;
            });
        }
        if (len >= 5) {
            solves.update((n) => {
                n[len - 1].avg5 = ma($solves, 5);
                return n;
            });
        }
        if (len >= 12) {
            solves.update((n) => {
                n[len - 1].avg12 = ma($solves, 12);
                return n;
            });
        }
    }
</script>

<div class="flex w-3/4">
    <!-- {@debug $solves} -->
    {#if $solves.length > 0}
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th class="px-4">#</th>
                    <th class="text-left w-24">Time</th>
                    <th class="text-left">Scramble</th>
                    <th class="text-left">mo3</th>
                    <th class="text-left">ao5</th>
                    <th class="text-left">ao12</th>
                </tr>
            </thead>
            <tbody>
                {#each [...$solves].reverse() as solve, i (solve.timestamp)}
                    <tr>
                        <td class="text-center">{$solves.length - i}</td>
                        <td>{solve.time}</td>
                        <td>{solve.scramble.join(" ")}</td>
                        <td>{solve.mean3 ? solve.mean3.toFixed(3) : "-"}</td>
                        <td>{solve.avg5 ? solve.avg5.toFixed(3) : "-"}</td>
                        <td>{solve.avg12 ? solve.avg12.toFixed(3) : "-"}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>
