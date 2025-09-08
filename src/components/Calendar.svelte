<script>
  import { createEventDispatcher } from "svelte";

  export let events = {};

  const dispatch = createEventDispatcher();

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Temas astronômicos para cada mês
  const monthThemes = [
    {
      name: "Janeiro",
      theme: "Big Bang e Estruturas",
      class: "janeiro",
      description: "Do Big Bang às primeiras galáxias e quasares.",
    },
    {
      name: "Fevereiro",
      theme: "Galáxias Antigas",
      class: "fevereiro",
      description: "Explosões cósmicas e aglomerados globulares.",
    },
    {
      name: "Março",
      theme: "Espirais e Sistemas",
      class: "marco",
      description: "Galáxias espirais, Andrômeda e primeiros planetas.",
    },
    {
      name: "Abril",
      theme: "",
      class: "abril",
      description: "Nenhum evento registrado neste mês.",
    },
    {
      name: "Maio",
      theme: "Via Láctea",
      class: "maio",
      description: "Formação do disco espiral da nossa galáxia.",
    },
    {
      name: "Junho",
      theme: "",
      class: "junho",
      description: "Nenhum evento registrado neste mês.",
    },
    {
      name: "Julho",
      theme: "Energia Escura",
      class: "julho",
      description: "Expansão do universo acelera.",
    },
    {
      name: "Agosto",
      theme: "",
      class: "agosto",
      description: "Nenhum evento registrado neste mês.",
    },
    {
      name: "Setembro",
      theme: "Sistema Solar",
      class: "setembro",
      description: "Nascimento do Sol, Terra, Lua e oceanos.",
    },
    {
      name: "Outubro",
      theme: "Fotossíntese",
      class: "outubro",
      description: "Oxigênio e vida celular mais complexa.",
    },
    {
      name: "Novembro",
      theme: "Eucariontes",
      class: "novembro",
      description: "Células com núcleo e reprodução sexual.",
    },
    {
      name: "Dezembro",
      theme: "Vida Complexa e Humanos",
      class: "dezembro",
      description: "Explosão Cambriana até Homo sapiens e civilizações.",
    },
  ];

  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Ano bissexto cósmico

  function formatDate(month, day) {
    return `${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function hasEvent(month, day) {
    const dateKey = formatDate(month, day);
    return events[dateKey] && events[dateKey].length > 0;
  }

  function handleDayClick(month, day) {
    const dateKey = formatDate(month, day);
    dispatch("dayClick", {
      date: dateKey,
      day: day,
      month: months[month],
      events: events[dateKey] || [],
    });
  }

  function getFirstEventTitle(month, day) {
    const dateKey = formatDate(month, day);
    const dayEvents = events[dateKey];
    return dayEvents && dayEvents.length > 0 ? dayEvents[0].title : "";
  }
</script>

<div class="calendar-container">
  {#each monthThemes as monthData, monthIndex}
    <div class="month-bg {monthData.class}">
      <div class="relative z-10">
        <div class="text-center mb-6">
          <h2
            class="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent"
          >
            {monthData.name}
          </h2>
          <div
            class="flex items-center justify-center space-x-2 text-sm text-gray-300"
          >
            <span class="font-medium">{monthData.theme}</span>
            <span class="w-1 h-1 bg-purple-400 rounded-full"></span>
            <span class="italic">{monthData.description}</span>
          </div>
        </div>

        <div class="days-grid grid grid-cols-7 gap-2 md:gap-3">
          {#each Array(daysInMonth[monthIndex]) as _, dayIndex}
            {@const day = dayIndex + 1}
            {@const hasEvents = hasEvent(monthIndex, day)}

            <button
              class="day-button relative aspect-square p-2 rounded-lg border border-gray-500/20
         bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-sm
         hover:from-purple-900/50 hover:to-blue-900/50 group
         transition-all duration-300 text-sm md:text-base font-medium
         {hasEvents
                ? 'ring-2 ring-purple-300/80 bg-gradient-to-br from-purple-900/60 to-blue-900/60 shadow-lg shadow-purple-500/25'
                : ''}"
              on:click={() => handleDayClick(monthIndex, day)}
              title={getFirstEventTitle(monthIndex, day)}
            >
              <span class="relative z-10 text-gray-100">{day}</span>

              <!-- Tooltip customizado -->
              {#if hasEvents}
                <div
                  class="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                px-3 py-2 bg-gradient-to-r from-purple-900 to-blue-900
                text-white text-xs rounded-lg shadow-xl border border-purple-400/30
                opacity-0 group-hover:opacity-100 transition-all duration-300
                pointer-events-none z-50 backdrop-blur-sm
                max-w-48 text-center whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  <div class="font-medium text-purple-100">
                    {getFirstEventTitle(monthIndex, day)}
                  </div>
                  <!-- Setinha do tooltip -->
                  <div
                    class="absolute top-full left-1/2 transform -translate-x-1/2
                  border-4 border-transparent border-t-purple-800"
                  ></div>
                </div>

                <!-- Indicador de evento existente -->
                <div
                  class="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-r from-purple-300 to-blue-300
                rounded-full animate-pulse shadow-lg shadow-purple-400/50"
                ></div>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-lg"
                ></div>
              {/if}

              <!-- Efeito de brilho sutil -->
              <div
                class="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-0
              bg-gradient-to-br from-white/5 to-transparent"
              ></div>
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .calendar-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .days-grid {
    max-width: 700px;
    margin: 0 auto;
  }

  .day-button:hover {
    box-shadow:
      0 8px 25px rgba(124, 58, 237, 0.3),
      0 3px 10px rgba(0, 0, 0, 0.2);
  }

  .days-grid {
    padding: 0 0.75rem;
  }

  .day-button {
    margin: 2px;
    padding: 0.5rem;
  }

  @media (max-width: 768px) {
    .days-grid {
      gap: 1px;
      padding: 0 0.75rem;
    }

    .day-button {
      margin: 2px;
      padding: 0.5rem;
      font-size: 0.75rem;
    }
  }

  @keyframes pulse-glow {
    0%,
    100% {
      opacity: 1;
      box-shadow: 0 0 5px rgba(147, 51, 234, 0.5);
    }
    50% {
      opacity: 0.7;
      box-shadow: 0 0 10px rgba(147, 51, 234, 0.8);
    }
  }

  .animate-pulse {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .tooltip {
  transform: translateX(-50%) translateY(-0.5rem);
}

.tooltip::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(88, 28, 135, 0.95);
}

@media (max-width: 768px) {
  .tooltip {
    max-width: 200px;
    font-size: 0.65rem;
    padding: 0.375rem 0.5rem;
  }
}
</style>
