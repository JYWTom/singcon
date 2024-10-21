<script lang="ts">
  import PocketBase from "pocketbase";
  import { onMount } from "svelte";
  const pb = new PocketBase(import.meta.env.PUBLIC_PB);
  const redirectUrl = import.meta.env.PUBLIC_REDIRECT;
  let status = "Authenticating...";
  let err = "";
  onMount(() => {
    const params = new URL(window.location.href).searchParams;
    const provider = JSON?.parse(localStorage.getItem("provider") ?? "");
    if (provider) {
      if (provider.state !== params.get("state")) {
        pb.authStore.clear();
        status = "State Parameters Don't Match.";
      }
    }

    // authenticate
    pb.collection("users")
      .authWithOAuth2Code(
        "google",
        params?.get("code") ?? "",
        provider.codeVerifier,
        redirectUrl,
        {
          emailVisibility: false,
        },
      )
      .then((authData) => {
        console.log(authData);
        // if (String(authData.meta?.email)?.endsWith('twghwfns.edu.hk')) {
        status = "Signed In. Redirecting...";
        window.location.href = "../vote/";
        // } else {
        //   pb.authStore.clear();
        //   status = 'Please Use School Account and Sign In Again.';
        // }
      })
      .catch((er) => {
        status = "Failed to Exchange Code.";
        err = er;
      });
  });
</script>

<body>
  <div
    class={"mx-auto px-3.5 bg-zinc-100 supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] h-screen dark:bg-[#21222C]"}
  >
    <div class="flex-column">
      <div class={"pt-10"}>
        <h1
          class={"text-center font-bold sm:text-4xl text-2xl dark:text-[#F8F8F2]"}
        >
          {status}
        </h1>
        <p class="text-center dark:text-[#F8F8F2]">{err}</p>
      </div>
    </div>
  </div>
</body>
