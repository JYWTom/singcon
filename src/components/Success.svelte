<script lang="ts">
  import { onMount } from "svelte";
  import PocketBase from "pocketbase";
  import type { Record } from "pocketbase";

  let pb: PocketBase;
  let voted: Promise<Record>;
  let mounted = false;
  let date: Date;
  let updated: string;
  onMount(() => {
    pb = new PocketBase(import.meta.env.PUBLIC_PB);
    if (pb?.authStore?.model?.id) {
      voted = pb.collection("users").getOne(pb?.authStore?.model?.id);
    }
    date = new Date();
    mounted = true;
    const opt: Intl.DateTimeFormatOptions = {
      dateStyle: "short",
      timeStyle: "short",
    };
    updated = new Intl.DateTimeFormat("en-hk", opt).format(date);
  });

  interface candidates {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  }

  function matchString(vote: keyof candidates) {
    const options = {
      1: "Solo: 6E 伍智城 《ドライフラワー(乾燥花)》",
      2: "Duo: 5E 梁靖桐 4D 麥洪華 《十分錯》",
      3: "Solo: 5A 吳競翀 《時候不早》",
      4: "Duo: 5C 陳芊羽 5C 黄思姸 5E 許芯緹 《長相廝守》",
      5: "Solo: 5C 陳雋昇 《追》",
      6: "Duo: 5E 謝澔賢 5E 俞逸謙 《時光倒流一句話》",
      7: "Solo: 6B 姚詠語 《老派約會之必要》",
      8: "Duo: 5C 童明慧 5C 李佳樂 《小幸運》",
    };
    return options[vote];
  }
</script>

<div
  class="px-4 py-16 md:px-24 lg:px-8 lg:py-20 supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] h-screen"
>
  <div class="sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto">
    <p
      class="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase sm:text-center dark:text-[#F8F8F2] {mounted
        ? ''
        : 'invisible'}"
    >
      Last updated:
      {updated}
    </p>
    <div class="max-w-xl mb-5 md:mx-auto sm:text-center lg:max-w-xl">
      <div class="mb-4">
        <div
          class="inline-block max-w-lg font-sans text-3xl font-extrabold leading-none tracking-tight text-black transition-colors duration-200 hover:text-deep-purple-accent-700 sm:text-4xl dark:text-[#FFFFFF]"
        >
          <p>You{"'"}ve voted!</p>
        </div>
      </div>
      <p class="text-base text-gray-700 md:text-lg dark:text-[#F8F8F2]">
        {#if !mounted}
          Loading...<br class={"sm:hidden"} />
          <span class="invisible sm:hidden">Undefined</span>
        {:else}
          {#await voted}
            Loading...<br class={"sm:hidden"} />
            <span class="invisible sm:hidden">Undefined</span>
          {:then voted}
            You have voted <br class={"sm:hidden"} />{matchString(voted.vote)}
          {:catch _}
            Something went wrong.
          {/await}
        {/if}
      </p>
    </div>
    <div class="sm:text-center">
      <a
        href="/"
        aria-label=""
        class="bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block dark:bg-[#80FFEA] dark:text-[#21222C] dark:border-[#80FFEA]"
      >
        Go Back
      </a>
    </div>
  </div>
</div>
