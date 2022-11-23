<script>
import { page } from "$app/stores";
</script>

<div class="flex h-screen w-screen content-center items-center justify-center">
  <div class="card w-96 bg-base-300 shadow-xl">
    <div class="card-title mt-5 justify-center text-center text-5xl font-bold">
      {$page.status}
    </div>
    <div class="divider"></div>
    <div class="card-body flex justify-center">
      <img src="https://j.gifs.com/5y8xPR.gif" alt="gif" />
      <p class="mt-5 text-center text-2xl">{$page.error?.message}</p>
      <p class="text-center">
        Wer will auch auf die Seite {$page.url.pathname}?
      </p>
      <div class="divider"></div>
      <a class="underline" href="/"
        ><i class="fa-solid fa-arrow-left mr-3"></i>Zurück zur Startseite</a>
    </div>
  </div>
</div>
