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
  saveBackgroundColor,
  sendToTop,
  duplicateNote,
};

const KEY = 'NotesDB';

function query(filterBy = null) {
  let notes = _loadNotesFromStorage();

  if (!notes || !notes.length) {
    return axios
      .get('apps/keep/services/notes.json')
      .then((res) => {
        _saveNotesToStorage(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log('cannot get answer: ', err);
        throw err;
      });
  } else {
    if (!filterBy) return Promise.resolve(notes);
    const FilteredNotes = _getFilteredNotes(notes, filterBy);
    console.log(FilteredNotes);

    return Promise.resolve(FilteredNotes);
  }
}

function _getFilteredNotes(notes, filterBy) {
  console.log(filterBy);
  if (filterBy.txt === '' && filterBy.type === '') return notes;
  else if (filterBy.txt === '' && filterBy.type !== '')
    return notes.filter((note) => note.type === filterBy.type);
  else return filterByTxt(notes, filterBy);
}

function filterByTxt(notes, filterBy) {
  let videoAndImgNotes = notes.filter(
    (note) => note.type === 'note-img' || note.type === 'note-video'
  );
  // console.log(videoAndImgNotes);

  let txtNotes = notes.filter((note) => note.type === 'note-txt');
  // console.log(txtNotes);

  let todoNotes = notes.filter((note) => note.type === 'note-todos');
  // console.log(todoNotes);

  let filterVideosAndImgs = videoAndImgNotes.filter((note) =>
    note.info.title.includes(filterBy.txt)
  );
  let filterTxtNotes = txtNotes.filter((note) =>
    note.info.txt.includes(filterBy.txt)
  );
  let filterTodos = getFilterTodosByTxt(todoNotes, filterBy);

  let finalFilter = filterVideosAndImgs.concat(filterTxtNotes, filterTodos);
  return finalFilter;
}

function sendToTop(noteId) {
  console.log('onSend to top');
  let notes = _loadNotesFromStorage();
  let noteToTop = notes.find((note) => note.id === noteId);
  let noteToTopIdx = notes.findIndex((note) => note.id === noteId);
  notes.splice(noteToTopIdx, 1);
  notes.unshift(noteToTop);
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function duplicateNote(noteId) {
  let notes = _loadNotesFromStorage();
  let noteToDuplicate = notes.find((note) => note.id === noteId);
  noteToDuplicate.id = utilService.makeId();
  notes.unshift(noteToDuplicate);
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function saveBackgroundColor(noteId, color) {
  console.log(color);
  let notes = _loadNotesFromStorage();
  let noteToChange = notes.find((note) => note.id === noteId);
  noteToChange.style.backgroundColor = color;

  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function getFilterTodosByTxt(todoNotes, filterBy) {
  let filterTodos = todoNotes.filter((todo) =>
    todo.info.label.includes(filterBy.txt)
  );
  return filterTodos;
}

function addNote(type, note) {
  if (type === 'txt') _addTxtNote(note);
  if (type === 'img') addImgNote(note);
  if (type === 'video') addVideoNote(note);
  if (type === 'todos') addTodosNote(note);
  return Promise.resolve();
}

function deleteNote(noteId) {
  let notes = _loadNotesFromStorage();
  var notesToSave = notes.filter((note) => note.id !== noteId);

  _saveNotesToStorage(notesToSave);
  return Promise.resolve();
}

function addVideoNote(note) {
  let notes = _loadNotesFromStorage();
  let addedNote = createVideoNote(note);
  notes.unshift(addedNote);
  _saveNotesToStorage(notes);
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
  let todoArray = updatedTodo.todos.split(',');
  let todoWithText = todoArray.map((todo) => {
    return { txt: todo, doneAt: Date.now() };
  });
  let notes = _loadNotesFromStorage();
  let noteUpdated = notes.find((note) => note.id === noteId);
  noteUpdated.info.label = updatedTodo.title;
  noteUpdated.info.todos = todoWithText;

  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function updateImgNote(noteId, updateNote) {
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
}

function createTodosNote(note) {
  let todosTxt = note.todos.split(',');
  let TodosTxtAndTime = todosTxt.map((todo) => {
    return { txt: todo, doneAt: Date.now() };
  });

  return {
    style: {
      backgroundColor: '#00d',
    },
    id: utilService.makeId(),
    type: 'note-todos',
    info: { label: note.title, todos: TodosTxtAndTime },
  };
}

// function createTodosNote(note) {}

function createTxtNote(note) {
  const noteTxt = note.txt;
  return {
    style: {
      backgroundColor: '#00d',
    },
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
