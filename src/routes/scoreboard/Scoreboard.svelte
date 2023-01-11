<script>
import { userList } from "$lib/stores/userList.js";
import { Shadow } from "svelte-loading-spinners";
import Error from "../+error.svelte";
import ranks from "$lib/ranks.json";
let promise;

if (!$userList) {
  promise = requestJson();
}

async function requestJson() {
  const req = await fetch("/api/requests/users.json");
  let response = await req.text();
  let json = JSON.parse(response);
  $userList = json;
  if (req.ok) return json;
  else return new Error(response);
}
</script>

{#if !$userList}
  {#await promise}
    <div class="flex items-center justify-center content-center mt-32">
      <Shadow size="60" color="#7E22CE" unit="px" duration="2.5s" />
    </div>
  {/await}
{:else}
  <div class="flex flex-col">
    <div class="flex justify-center">
      <div
        class="stats bg-purple-700 text-white shadow-xl hover:shadow-gray-700">
        <div class="stat place-items-center">
          <div class="stat-title">Nutzeranzahl</div>
          <div class="stat-value">{Object.keys($userList).length}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Insgesammte Punkte</div>
          <div class="stat-value">
            {$userList
              .map((x) => x.points)
              .reduce((accumulator, value) => {
                return accumulator + value;
              }, 0)
              .toLocaleString("de")}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="divider"></div>

  <h2 class="mb-5 ml-5 text-3xl">Ränge:</h2>
  <div class="flex justify-center">
    <div class="mb-5 w-fit">
      <div class="mx-5 grid md:grid-flow-row md:grid-cols-3 gap-10">
        <table class="table table-zebra w-full">
          <thead
            ><tr>
              <th>Ab Punktzahl</th>
              <th>Rangname</th>
              <th>Rangicon</th>
            </tr></thead>
          <tbody>
            {#each Object.keys(ranks) as key}
              {#if key <= 2800}
                <tr>
                  <th>{key}</th>
                  <th>{ranks[key].name}</th>
                  <th><i class="fa-solid fa-{ranks[key].picture}"></i></th>
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
        <table class="table table-zebra w-full">
          <thead
            ><tr>
              <th>Ab Punktzahl</th>
              <th>Rangname</th>
              <th>Rangicon</th>
            </tr></thead>
          <tbody>
            {#each Object.keys(ranks) as key}
              {#if key > 2800 && key <= 8500}
                <tr>
                  <th>{key}</th>
                  <th>{ranks[key].name}</th>
                  <th><i class="fa-solid fa-{ranks[key].picture}"></i></th>
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
        <table class="table table-zebra w-full">
          <thead
            ><tr>
              <th>Ab Punktzahl</th>
              <th>Rangname</th>
              <th>Rangicon</th>
            </tr></thead>
          <tbody>
            {#each Object.keys(ranks) as key}
              {#if key > 8500}
                <tr>
                  <th>{key}</th>
                  <th>{ranks[key].name}</th>
                  <th><i class="fa-solid fa-{ranks[key].picture}"></i></th>
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <h2 class="text-3xl ml-5">Scoreboard:</h2>
  <div class="flex justify-center mt-2">
    <div class="mb-5 md:w-2/3">
      <div class="md:mx-5 grid grid-cols-1">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Punkte</th>
              <th>Username</th>
              <th>Rang</th>
              <th>Icon</th>
            </tr>
          </thead>
          <tbody>
            {#each $userList as user}
              <tr>
                <th>{user.points}</th>
                <th>{user.username}</th>
                <th
                  >{ranks[
                    Object.keys(ranks).find(
                      (key) =>
                        Object.keys(ranks)
                          .map((key) => parseInt(key))
                          .filter((key) => user.points >= key)
                          .pop() == key
                    )
                  ].name}</th>
                <th
                  ><i
                    class="fa-solid fa-{ranks[
                      Object.keys(ranks).find(
                        (key) =>
                          Object.keys(ranks)
                            .map((key) => parseInt(key))
                            .filter((key) => user.points >= key)
                            .pop() == key
                      )
                    ].picture}"></i
                  ></th>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}
