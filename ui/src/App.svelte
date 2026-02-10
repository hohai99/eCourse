<script>
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";
  import { currentUser } from "./lib/pocketbase";
  import { isSidebarVisible } from "./lib/store";
  import NotFound from "./routes/NotFound.svelte";
  import Login from "./routes/Login.svelte";
  import MyCourses from "./routes/MyCourses.svelte";
  import Lesson from "./routes/Lesson.svelte";
  import Profile from "./routes/Profile.svelte";
  import Search from "./components/Search.svelte";
  import Alert from "./components/Alert.svelte";
  import "./lib/i18n";

  onMount(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        isSidebarVisible.set(false);
      } else {
        isSidebarVisible.set(true);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

{#if $currentUser}
  <Search />
  <Alert />
{/if}

<Router>
  <Route path="/" component={MyCourses} />
  <Route path="/login" component={Login} />
  <Route path="/profile" component={Profile} />
  <Route path="/:lessonTitle" component={Lesson} />
  <Route component={NotFound} />
</Router>
