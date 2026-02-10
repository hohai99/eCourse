<script>
  import { currentUser, pb } from "../lib/pocketbase";
  import Sidebar from "../components/Sidebar.svelte";
  import Title from "../components/Title.svelte";
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { showAlert, isSidebarVisible } from "../lib/store";
  import Icon from "@iconify/svelte";

  let oldPassword = "";
  let newPassword = "";
  let newPasswordConfirm = "";
  let isLoading = false;

  onMount(() => {
    if (!$currentUser) {
      navigate("/login");
    }
  });

  async function updatePassword() {
    if (newPassword !== newPasswordConfirm) {
      showAlert("New passwords do not match", "fail");
      return;
    }
    if (newPassword.length < 8) {
      showAlert("Password must be at least 8 characters", "fail");
      return;
    }

    isLoading = true;
    try {
      await pb.collection("users").update($currentUser.id, {
        oldPassword,
        password: newPassword,
        passwordConfirm: newPasswordConfirm,
      });
      showAlert("Password updated successfully", "success");
      oldPassword = "";
      newPassword = "";
      newPasswordConfirm = "";
    } catch {
      showAlert("Failed to update password. Check your old password.", "fail");
    }
    isLoading = false;
  }
</script>

<Title suffix="Profile" />

{#if $currentUser}
  <main class="flex h-dvh justify-between lg:overflow-x-hidden">
    <Sidebar />
    <section class="flex flex-1 flex-col gap-5 overflow-y-scroll bg-dark p-5">
      <div class="flex items-center gap-3">
        <button
          on:click={() => ($isSidebarVisible = !$isSidebarVisible)}
          class="group flex items-center justify-center rounded-full bg-transparent p-2 text-xl transition hover:bg-white/10"
        >
          <Icon
            class="flex-shrink-0 text-white/50 transition group-hover:text-white"
            icon="ph:list"
          />
        </button>
        <h1 class="text-xl font-medium text-white">Profile</h1>
      </div>

      <div class="max-w-2xl space-y-8 rounded-md bg-white/5 p-8">
        <div class="space-y-2">
            <h2 class="text-lg font-semibold text-white/80">User Information</h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label class="block text-sm text-white/50" for="username">Username</label>
                    <p id="username" class="text-base text-white">{$currentUser.username}</p>
                </div>
                <div>
                    <label class="block text-sm text-white/50" for="email">Email</label>
                    <p id="email" class="text-base text-white">{$currentUser.email}</p>
                </div>
            </div>
        </div>

        <div class="space-y-4">
            <h2 class="text-lg font-semibold text-white/80">Change Password</h2>
            <form on:submit|preventDefault={updatePassword} class="flex flex-col gap-4">
                <div class="space-y-1">
                    <label class="block text-sm text-white/50" for="oldPassword">Old Password</label>
                    <input
                        id="oldPassword"
                        type="password"
                        bind:value={oldPassword}
                        class="w-full rounded-md bg-white/5 p-2 outline outline-[1.5px] outline-white/10 transition-all focus:outline-white/20"
                        required
                    />
                </div>
                <div class="space-y-1">
                    <label class="block text-sm text-white/50" for="newPassword">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        bind:value={newPassword}
                        class="w-full rounded-md bg-white/5 p-2 outline outline-[1.5px] outline-white/10 transition-all focus:outline-white/20"
                        required
                        minlength="8"
                    />
                </div>
                <div class="space-y-1">
                    <label class="block text-sm text-white/50" for="confirmPassword">Confirm New Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        bind:value={newPasswordConfirm}
                        class="w-full rounded-md bg-white/5 p-2 outline outline-[1.5px] outline-white/10 transition-all focus:outline-white/20"
                        required
                        minlength="8"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    class="mt-2 flex w-fit items-center gap-2 rounded-md bg-main px-4 py-2 transition hover:bg-main/80 disabled:opacity-50"
                >
                    {#if isLoading}
                        Updating...
                        <Icon class="animate-spin" icon="fluent:spinner-ios-16-regular" />
                    {:else}
                        Update Password
                    {/if}
                </button>
            </form>
        </div>
      </div>
    </section>
  </main>
{/if}
