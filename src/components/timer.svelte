<script lang="ts">
    import { count, scramble, solves, Solve } from "../store/timer";

    let time = 0;
    let timer: NodeJS.Timer;
    let timeout: NodeJS.Timeout;
    let isRunning = false;
    let isReady = false;

    $: displayTime = time.toFixed(2);

    let color: string;
    $: {
        if (isRunning) color = "text-gray-600";
        else if (isReady) color = "text-emerald-500";
        else color = "text-gray-600";
    }

    function start(event) {
        clearTimeout(timeout);
        if (!isRunning && !isReady) return;

        if (event.code != "Space") return;

        if (!isRunning && isReady) {
            isReady = false;
            isRunning = true;
            const startTime = new Date().getTime();
            timer = setInterval(() => {
                const currTime = new Date().getTime();
                time = currTime - startTime;
                time /= 1000;
            }, 10);
        } else {
            onFinish();
            resetState();
            count.update((val) => val + 1);
        }
    }

    function ready(event) {
        if (event.code != "Space") return;

        timeout = setTimeout(() => {
            isReady = true;
            time = 0;
        }, 400);
    }

    function onFinish() {
        const result: Solve = {
            time: time,
            scramble: $scramble,
            timestamp: new Date(),
        };
        solves.update((p) => {
            p.push(result);
            return p;
        });
    }

    function resetState() {
        clearInterval(timer);
        isRunning = false;
        isReady = false;
    }

    window.addEventListener("keydown", ready, false);
    window.addEventListener("keyup", start, false);
</script>

<div class="timer w-1/2 text-center {color} flex justify-center items-center">
    {displayTime}
</div>

<style>
    .timer {
        font-size: 200px;
        height: 50vh;
        font-family: "Fira Code";
    }
</style>
