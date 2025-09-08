<script>
  import { onMount } from "svelte";
  import Calendar from "./components/Calendar.svelte";
  import EventModal from "./components/EventModal.svelte";
  import { Sparkles, Clock, Github } from "lucide-svelte";

  let cosmicEvents = {};
  let isLoading = true;
  let error = null;

  // Modal state
  let modalOpen = false;
  let selectedDate = "";
  let selectedMonth = "";
  let selectedDay = "";
  let selectedEvents = [];

  onMount(async () => {
    try {
      const response = await fetch("/cosmos.json");
      if (!response.ok) {
        throw new Error("Falha ao carregar eventos cósmicos");
      }
      cosmicEvents = await response.json();
    } catch (err) {
      error = err.message;
      console.error("Erro ao carregar cosmos.json:", err);
    } finally {
      isLoading = false;
    }
  });

  function handleDayClick(event) {
    const { date, day, month, events } = event.detail;
    selectedDate = date;
    selectedDay = day;
    selectedMonth = month;
    selectedEvents = events;
    modalOpen = true;
  }

  function closeModal() {
    modalOpen = false;
  }

  // Contar total de eventos
  $: totalEvents = Object.values(cosmicEvents).reduce(
    (sum, events) => sum + events.length,
    0,
  );

  function createStars() {
    const stars = [];
    for (let i = 1; i <= 120; i++) {
      const size =
        i <= 80
          ? Math.random() * 1.5 + 1 // Pequenas: 1-2.5px
          : i <= 100
            ? Math.random() * 1 + 2.5 // Médias: 2.5-3.5px
            : Math.random() * 1 + 3.5; // Grandes: 3.5-4.5px

      stars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: size,
        delay: Math.random() * 4,
        brightness: i > 100 ? "bright" : "normal",
      });
    }
    return stars;
  }

  const stars = createStars();
</script>

<main class="min-h-screen cosmic-bg relative overflow-x-hidden">
  <!-- Campo de estrelas expandido -->
  {#each stars as star}
    <div
      class="star"
      class:bright={star.brightness === "bright"}
      style="
      top: {star.top}%; 
      left: {star.left}%; 
      width: {star.size}px; 
      height: {star.size}px;
      animation-delay: {star.delay}s;
    "
    ></div>
  {/each}

  <!-- Header -->
  <header class="relative z-10 pt-8 pb-6">
    <div class="container mx-auto px-4 text-center">
      <div class="flex items-center justify-center mb-4">
        <Sparkles class="w-8 h-8 text-purple-300 mr-3 animate-pulse" />
        <h1
          class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-lg overflow-hidden whitespace-nowrap text-ellipsis"
        >
          Calendário Cósmico
        </h1>
        <Sparkles class="w-8 h-8 text-blue-300 ml-3 animate-pulse" />
      </div>

      <p
        class="text-lg md:text-xl text-gray-200 mb-4 max-w-3xl mx-auto leading-relaxed"
      >
        Uma jornada pela história do universo condensada em um ano
      </p>

      <div
        class="flex items-center justify-center space-x-6 text-sm text-gray-300"
      >
        <div class="flex items-center space-x-2">
          <Clock class="w-4 h-4" />
          <span>13.8 bilhões de anos</span>
        </div>
        {#if !isLoading}
          <div class="flex items-center space-x-2">
            <Sparkles class="w-4 h-4" />
            <span>{totalEvents} eventos cósmicos</span>
          </div>
        {/if}
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <div class="container mx-auto px-4 pb-12 relative z-10">
    {#if isLoading}
      <div class="flex flex-col items-center justify-center py-20">
        <div class="relative">
          <div
            class="w-16 h-16 border-4 border-purple-400/20 border-t-purple-300 rounded-full animate-spin"
          ></div>
          <Sparkles
            class="absolute inset-0 w-6 h-6 text-purple-300 m-auto animate-pulse"
          />
        </div>
        <p class="mt-6 text-gray-200 text-lg">Carregando eventos cósmicos...</p>
      </div>
    {:else if error}
      <div class="text-center py-20">
        <div
          class="bg-red-950/40 border border-red-400/30 rounded-lg p-6 max-w-md mx-auto backdrop-blur-sm"
        >
          <h2 class="text-xl font-semibold text-red-300 mb-2">Erro Cósmico</h2>
          <p class="text-gray-200">{error}</p>
        </div>
      </div>
    {:else}
      <!-- Instruções de uso -->
      <div
        class="bg-gradient-to-r from-purple-950/30 to-blue-950/30 rounded-lg p-6 mb-8 border border-purple-400/20 backdrop-blur-sm"
      >
        <div class="text-center">
          <h2 class="text-xl font-semibold text-purple-200 mb-2">Como usar</h2>
          <p class="text-gray-200">
            Clique em qualquer dia para descobrir os eventos cósmicos que
            aconteceram naquela data. Dias com eventos possuem um <span
              class="inline-block w-2 h-2 bg-purple-300 rounded-full animate-pulse mx-1"
            ></span> indicador brilhante.
          </p>
        </div>
      </div>

      <!-- Calendar Component -->
      <Calendar events={cosmicEvents} on:dayClick={handleDayClick} />
    {/if}
  </div>

  <!-- Footer -->
  <footer class="relative z-10 py-8 mt-16 border-t border-gray-600/20">
    <div class="container mx-auto px-4 text-center">
      <p class="text-gray-300 text-sm mb-4">
        Baseado no conceito de Calendário Cósmico de Carl Sagan
      </p>

      <div
        class="flex items-center justify-center space-x-6 text-xs text-gray-400"
      >
        <div class="flex items-center space-x-2">
          <Github class="w-4 h-4" />
          <span>Projeto Open Source</span>
        </div>
        <span>•</span>
        <span>Svelte + Vite + TailwindCSS</span>
        <span>•</span>
        <span>Made by Guilherme Xavier</span>
      </div>
    </div>
  </footer>
</main>

<!-- Event Modal -->
<EventModal
  bind:isOpen={modalOpen}
  {selectedDate}
  {selectedMonth}
  {selectedDay}
  events={selectedEvents}
  on:close={closeModal}
/>
