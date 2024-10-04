<script lang="ts">
  import Person from "./Person.svelte";
  import AddPerson from "./AddPerson.svelte";
  import Done from './Done.svelte';

  let peopleNames: string[] = [];
  let roomId: string = "";

  const peopleNamesElement = document.getElementById(
    "people-names"
  ) as HTMLElement;
  if (peopleNamesElement) {
    peopleNames = JSON.parse(peopleNamesElement.dataset.people as string);
    roomId = peopleNamesElement.dataset.roomId as string;
  }

  const remove = (index: number) => {
    peopleNames = [
      ...peopleNames.slice(0, index),
      ...peopleNames.slice(index + 1),
    ];
    sendToServer();
  };

  const up = (index: number) => {
    if (index > 0) {
      const personToMove = peopleNames[index];
      peopleNames = [
        ...peopleNames.slice(0, index - 1),
        personToMove,
        ...peopleNames.slice(index - 1, index),
        ...peopleNames.slice(index + 1),
      ];
      sendToServer();
    }
  };

  const down = (index: number) => {
    if (index < peopleNames.length - 1) {
      const personToMove = peopleNames[index];
      peopleNames = [
        ...peopleNames.slice(0, index),
        ...peopleNames.slice(index + 1, index + 2),
        personToMove,
        ...peopleNames.slice(index + 2),
      ];
      sendToServer();
    }
  };

  const add = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    const personToAdd = document.getElementById(
      "add-person"
    ) as HTMLInputElement;
    if (!personToAdd) return;
    peopleNames = [...peopleNames, personToAdd.value];
    personToAdd.value = "";
    sendToServer();
  };

  const queued = () => {
    if (peopleNames.length > 0) {
        const firstName = peopleNames[0];
        peopleNames = [...peopleNames.slice(1), firstName];
        sendToServer();
    }
  };

  const sendToServer = async () => {
    try {
      const response = await fetch(`/api/room/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ names: peopleNames }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
</script>

<Done onQueue={queued} />

{#each peopleNames as name, i}
  <Person
    position={i}
    allPeople={peopleNames}
    onDelete={() => remove(i)}
    onUp={() => up(i)}
    onDown={() => down(i)}
  />
{/each}
<AddPerson onAdd={add} />
