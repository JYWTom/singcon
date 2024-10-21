<script lang="ts">
  import { onMount } from "svelte";
  import PocketBase from "pocketbase";

  const redirectUrl = import.meta.env.PUBLIC_REDIRECT;
  let mounted = false;
  let pb: PocketBase;
  let authMethods: Promise<import("pocketbase").AuthMethodsList>;
  let signedIn = false;
  onMount(() => {
    pb = new PocketBase(import.meta.env.PUBLIC_PB);
    // if (Date.now() > Date.parse("19 Dec 2023 00:15:59 GMT")) {
    /*do nothing*/
    // } else
    if (
      pb.authStore.isValid
      //&& pb.authStore?.model?.email.endsWith("twghwfns.edu.hk")
    ) {
      signedIn = true;
    } else {
      authMethods = pb.collection("users").listAuthMethods();
    }
    mounted = true;
  });
</script>

<div class={"text-center m-5"}>
  {#if !mounted}
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
      >Loading</button
    >
  {:else if signedIn}
    <a
      class="bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block"
      href="/vote/">Continue as {pb.authStore?.model?.email}</a
    >
  {:else}
    {#await authMethods}
      <button
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
        >Loading</button
      >
    {:then authMethods}
      {#each authMethods.authProviders as provider}
        <button
          class="bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block dark:bg-[#80FFEA] dark:text-[#21222C] dark:border-[#80FFEA]"
          on:click={() => {
            pb.authStore.clear();
            localStorage.setItem("provider", JSON.stringify(provider));
            window.location.href = provider.authUrl + redirectUrl;
          }}>Login with Google</button
        >
      {/each}
    {:catch error}
      <li>{error}</li>
    {/await}
  {/if}
</div>
