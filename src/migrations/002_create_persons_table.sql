CREATE TABLE person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id VARCHAR(20),
    name VARCHAR(50) NOT NULL,
    position INTEGER,
    FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE
);

CREATE INDEX idx_person_room_id ON person(room_id);