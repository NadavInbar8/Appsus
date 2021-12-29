import { storageService } from '../../../js/services/storage.service.js';
import { utilService } from '../../../js/services/util.service.js';

export const NoteService = {
  query,
  addNote,
  deleteNote,
  updateTxtNote,
  updateTodosNote,
  updateImgNote,
  updateVideoNote,
};

const KEY = 'NotesDB';

function query(filterBy = null) {
  let notes = _loadNotesFromStorage();

  if (!notes || !notes.length) {
    console.log('from server');
    return axios
      .get('apps/keep/services/notes.json')
      .then((res) => {
        console.log(res.data);
        _saveNotesToStorage(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log('cannot get answer: ', err);
        throw err;
      });
  } else {
    if (!filterBy) return Promise.resolve(notes);
    const FilteredNotes = _getFilteredMails(notes, filterBy);
    console.log(FilteredNotes);

    return Promise.resolve(FilteredNotes);
  }
}

function addNote(type, note) {
  if (type === 'txt') _addTxtNote(note);
  if (type === 'img') addImgNote(note);
  if (type === 'video') addVideoNote(note);
  if (type === 'todos') addTodosNote(note);
  return Promise.resolve();
}

function deleteNote(noteId) {
  console.log(noteId);
  let notes = _loadNotesFromStorage();
  var notesToSave = notes.filter((note) => note.id !== noteId);
  console.log(notesToSave);

  _saveNotesToStorage(notesToSave);
  return Promise.resolve();
}

function addVideoNote(note) {
  console.log(note, 'in service');
  let notes = _loadNotesFromStorage();
  let addedNote = createVideoNote(note);
  notes.unshift(addedNote);
  _saveNotesToStorage(notes);
}

function createVideoNote(note) {
  return {
    id: utilService.makeId(),
    type: 'note-video',
    info: {
      url: note.url,
      title: note.title,
    },
    style: {
      backgroundColor: utilService.getRandomColor(),
    },
  };
}

function addImgNote(note) {
  let notes = _loadNotesFromStorage();
  let addedNote = createImgNote(note);
  notes.unshift(addedNote);
  _saveNotesToStorage(notes);
}

function updateTxtNote(noteId, txt) {
  let notes = _loadNotesFromStorage();
  let noteUpdated = notes.find((note) => note.id === noteId);
  noteUpdated.info.txt = txt;
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function updateTodosNote(noteId, updatedTodo) {
  console.log(updatedTodo);
  let todoArray = updatedTodo.todos.split(',');
  let todoWithText = todoArray.map((todo) => {
    return { txt: todo, doneAt: Date.now() };
  });
  let notes = _loadNotesFromStorage();
  let noteUpdated = notes.find((note) => note.id === noteId);
  noteUpdated.info.label = updatedTodo.title;
  noteUpdated.info.todos = todoWithText;
  console.log(updatedTodo);
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function updateImgNote(noteId, updateNote) {
  console.log(updateNote);
  let notes = _loadNotesFromStorage();
  let noteUpdated = notes.find((note) => note.id === noteId);
  noteUpdated.info.url = updateNote.url;
  noteUpdated.info.title = updateNote.title;
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function updateVideoNote(noteId, updateNote) {
  let notes = _loadNotesFromStorage();
  let noteUpdated = notes.find((note) => note.id === noteId);
  noteUpdated.info.url = updateNote.url;
  noteUpdated.info.title = updateNote.title;
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function createImgNote(note) {
  return {
    id: utilService.makeId(),
    type: 'note-img',
    info: {
      url: note.url,
      title: note.title,
    },
    style: {
      backgroundColor: utilService.getRandomColor(),
    },
  };
}

function _addTxtNote(note) {
  let notes = _loadNotesFromStorage();
  let addedNote = createTxtNote(note);
  notes.unshift(addedNote);
  _saveNotesToStorage(notes);
}

function addTodosNote(note) {
  let notes = _loadNotesFromStorage();

  let addedNote = createTodosNote(note);
  notes.unshift(addedNote);
  _saveNotesToStorage(notes);
  console.log(note);
}

function createTodosNote(note) {
  let todosTxt = note.todos.split(',');
  let TodosTxtAndTime = todosTxt.map((todo) => {
    return { txt: todo, doneAt: Date.now() };
  });
  console.log(TodosTxtAndTime);
  return {
    id: utilService.makeId(),
    type: 'note-todos',
    info: { label: note.title, todos: TodosTxtAndTime },
  };
}

// function createTodosNote(note) {}

function createTxtNote(note) {
  const noteTxt = note.txt;
  return {
    id: utilService.makeId(),
    type: 'note-txt',
    isPinned: false,
    info: { txt: noteTxt },
  };
}

function _saveNotesToStorage(Notes) {
  storageService.saveToStorage(KEY, Notes);
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(KEY);
}
