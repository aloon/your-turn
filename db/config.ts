import { defineDb, defineTable, column } from 'astro:db';

// https://astro.build/db/config

const Person = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    roomId: column.text({ references: () => Room.columns.id }),
    name: column.text(),
    position: column.number(),
  }
})

const Room = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    alterDate: column.date(),
  }
})

export default defineDb({
  tables: {Person, Room}
});
