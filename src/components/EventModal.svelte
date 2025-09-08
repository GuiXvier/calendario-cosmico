<script>
  import { createEventDispatcher } from 'svelte';
  import { X, Clock, Calendar, Star } from 'lucide-svelte';
  
  export let isOpen = false;
  export let selectedDate = '';
  export let selectedMonth = '';
  export let selectedDay = '';
  export let events = [];
  
  const dispatch = createEventDispatcher();
  
  function closeModal() {
    dispatch('close');
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  
  // Ordenar eventos por horário se existir
  $: sortedEvents = events.sort((a, b) => {
    if (!a.time || !b.time) return 0;
    return a.time.localeCompare(b.time);
  });
  
  function formatTime(time) {
    if (!time) return '';
    const [hours, minutes, seconds] = time.split(':');
    return `${hours}:${minutes}:${seconds}`;
  }
</script>

{#if isOpen}
  <!-- Backdrop -->
  <div 
    class="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
    on:click={handleBackdropClick}
    on:keydown={(e) => e.key === 'Escape' && closeModal()}
    role="dialog"
    aria-modal="true"
  >
    <!-- Modal Content -->
    <div class="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl 
                rounded-2xl border border-purple-500/30 shadow-2xl 
                max-w-2xl w-full max-h-[90vh] overflow-y-auto
                transform transition-all duration-300">
      
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-700/50">
        <div class="flex items-center space-x-3">
          <Calendar class="w-6 h-6 text-purple-400" />
          <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {selectedDay} de {selectedMonth}
          </h2>
        </div>
        
        <button
          on:click={closeModal}
          class="p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
          aria-label="Fechar modal"
        >
          <X class="w-5 h-5 text-gray-400 hover:text-white" />
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-6">
        {#if events.length === 0}
          <div class="text-center py-12">
            <Star class="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
            <p class="text-xl text-gray-400 mb-2">Nada registrado neste dia cósmico</p>
            <p class="text-sm text-gray-500">O universo aguarda em silêncio...</p>
          </div>
        {:else}
          <div class="space-y-6">
            {#each sortedEvents as event, index}
              <div class="event-card bg-gradient-to-r from-purple-900/20 to-blue-900/20 
                          rounded-lg p-5 border border-purple-500/20 
                          hover:border-purple-400/40 transition-all duration-300">
                
                <div class="flex items-start space-x-4">
                  {#if event.time}
                    <div class="flex-shrink-0">
                      <div class="bg-gradient-to-br from-purple-600 to-blue-600 
                                  rounded-lg p-3 text-center min-w-[80px]">
                        <Clock class="w-4 h-4 mx-auto mb-1 text-white" />
                        <span class="text-xs text-white font-mono">
                          {formatTime(event.time)}
                        </span>
                      </div>
                    </div>
                  {:else}
                    <div class="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 
                                rounded-full mt-3 animate-pulse"></div>
                  {/if}
                  
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-white mb-2 leading-tight">
                      {event.title}
                    </h3>
                    
                    {#if event.description}
                      <p class="text-gray-300 leading-relaxed text-sm">
                        {event.description}
                      </p>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
      
      <!-- Footer -->
      <div class="px-6 pb-6">
        <div class="text-center text-xs text-gray-500 italic">
          {#if events.length > 0}
            {events.length} evento{events.length !== 1 ? 's' : ''} cósmico{events.length !== 1 ? 's' : ''}
          {:else}
            Calendário Cósmico • História do Universo
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .event-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.2);
  }
  
  :global(.modal-backdrop) {
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>