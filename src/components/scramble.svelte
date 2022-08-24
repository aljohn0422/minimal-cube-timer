<script>
    import scramby from "scramby";
    import { onMount } from "svelte";
    import { count, scramble } from "../store/timer";
    const scrambler = scramby();

    let str;
    onMount(() => {
        str = generate();
    });

    $: {
        $count;
        str = generate();
    }

    function generate() {
        let s = scrambler.getRandomScramble().scrambleString;
        scramble.set(s.split(" "));
        s = s.replaceAll(" ", "&nbsp;&nbsp;");
        return s;
    }
</script>

<div class="text-center text-2xl">{@html str}</div>
