<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  Chart.defaults.font.size = 25;
  let canvasRef: HTMLCanvasElement;

  interface stat {
    count: number;
    vote: number;
  }

  interface StatArray {
    [index: number]: number;
  }

  const options: StatArray = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };

  async function getData() {
    const data = await fetch(import.meta.env.PUBLIC_PB + "/stats");
    return data.json();
  }

  onMount(async () => {
    getData().then((r: stat[]) => {
      for (let i of r) {
        options[i.vote] = i.count;
      }
      console.log(options);
      const solo = [
        { house: "Red", count: options[1] },
        { house: "Yellow", count: options[3] },
        { house: "Blue", count: options[5] },
        { house: "Green", count: options[7] },
      ];
      const duo = [
        { house: "Red", count: options[2] },
        { house: "Yellow", count: options[4] },
        { house: "Blue", count: options[6] },
        { house: "Green", count: options[8] },
      ];
      new Chart(canvasRef, {
        type: "bar",
        data: {
          labels: solo.map((row) => row.house),
          datasets: [
            {
              data: solo.map((row) => row.count),
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 205, 86, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(96, 204, 102, 1)",
              ],
            },
            {
              data: duo.map((row) => row.count),
              backgroundColor: [
                "rgba(255, 99, 132, 0.4)",
                "rgba(255, 205, 86, 0.4)",
                "rgba(54, 162, 235, 0.4)",
                "rgba(96, 204, 102, 0.4)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 205, 86)",
                "rgb(54, 162, 235)",
                "rgb(96, 204, 102)",
              ],
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
              maxHeight: 60,
              labels: {
                boxWidth: 0,
                padding: 20,
              },
            },
            title: {
              display: false,
            },
          },
        },
      });
    });
  });
</script>

<div class=" justify-items-center flex px-[10vw] pt-[10vh] min-h-screen">
  <canvas bind:this={canvasRef} class="max-h-[80vh]" />
</div>
