import { storageService } from '../../../js/services/storage.service.js';
import { utilService } from '../../../js/services/util.service.js';
import { mailService } from '../../mail/services/mail.service.js';

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
  sendNoteToMail,
  toggleLine,
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

function _getNoteById(notes, id) {
  let findNote = notes.find((note) => note.id === id);
  // console.log(findNote);
  return findNote;
}

/////////////////////filter////////////////////////

function getFilterTodosByTxt(todoNotes, filterBy) {
  let filterTodos = todoNotes.filter((todo) =>
    todo.info.label.includes(filterBy.txt)
  );
  return filterTodos;
}
function _getFilteredNotes(notes, filterBy) {
  console.log(filterBy);
  if (filterBy.txt === '' && filterBy.type === 'all') return notes;
  else if (filterBy.txt === '' && filterBy.type !== '')
    return notes.filter((note) => note.type === filterBy.type);
  else return filterByTxt(notes, filterBy);
}

function filterByTxt(notes, filterBy) {
  if (filterBy.txt === '') return notes;
  let videoAndImgNotes = notes.filter(
    (note) => note.type === 'note-img' || note.type === 'note-video'
  );
  let txtNotes = notes.filter((note) => note.type === 'note-txt');
  let todoNotes = notes.filter((note) => note.type === 'note-todos');
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

///////////features///////////////
function sendToTop(noteId) {
  console.log('onSend to top');
  let notes = _loadNotesFromStorage();
  let noteToTop = _getNoteById(notes, noteId);
  let noteToTopIdx = notes.findIndex((note) => note.id === noteId);
  notes.splice(noteToTopIdx, 1);
  notes.unshift(noteToTop);
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function toggleLine(noteId, idx) {
  let notes = _loadNotesFromStorage();
  let noteToChange = _getNoteById(notes, noteId);
  console.log(noteToChange.info.todos[idx].doneAt);
  if (noteToChange.info.todos[idx].doneAt === null)
    noteToChange.info.todos[idx].doneAt = Date.now();
  else if (noteToChange.info.todos[idx].doneAt)
    noteToChange.info.todos[idx].doneAt = null;

  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function duplicateNote(noteId) {
  let notes = _loadNotesFromStorage();
  let currNote = _getNoteById(notes, noteId);
  let noteToDuplicate = { ...currNote };
  noteToDuplicate.id = utilService.makeId();
  notes.unshift(noteToDuplicate);
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function saveBackgroundColor(noteId, color) {
  let notes = _loadNotesFromStorage();
  let noteToChange = _getNoteById(notes, noteId);
  noteToChange.style.backgroundColor = color;

  _saveNotesToStorage(notes);
  return Promise.resolve();
}

////////navigate function for adding note /////////////
function addNote(type, note) {
  if (type === 'txt') _addTxtNote(note);
  if (type === 'img') addImgNote(note);
  if (type === 'video') addVideoNote(note);
  if (type === 'todos') addTodosNote(note);
  return Promise.resolve();
}
///////////delete///////////////
function deleteNote(noteId) {
  let notes = _loadNotesFromStorage();
  var notesToSave = notes.filter((note) => note.id !== noteId);

  _saveNotesToStorage(notesToSave);
  return Promise.resolve();
}

/////////////////update notes ////////////////
function updateTxtNote(noteId, txt) {
  let notes = _loadNotesFromStorage();
  let noteUpdated = _getNoteById(notes, noteId);
  noteUpdated.info.txt = txt;
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function updateTodosNote(noteId, updatedTodo) {
  let todoArray = updatedTodo.todos.split(',');
  let todoWithText = todoArray.map((todo) => {
    return { txt: todo, doneAt: null };
  });
  let notes = _loadNotesFromStorage();
  let noteUpdated = _getNoteById(notes, noteId);
  noteUpdated.info.label = updatedTodo.title;
  noteUpdated.info.todos = todoWithText;

  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function updateImgNote(noteId, updateNote) {
  let notes = _loadNotesFromStorage();
  let noteUpdated = _getNoteById(notes, noteId);
  noteUpdated.info.url = updateNote.url;
  noteUpdated.info.title = updateNote.title;
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

function updateVideoNote(noteId, updateNote) {
  let notes = _loadNotesFromStorage();
  let noteUpdated = _getNoteById(notes, noteId);
  noteUpdated.info.url = updateNote.url;
  noteUpdated.info.title = updateNote.title;
  _saveNotesToStorage(notes);
  return Promise.resolve();
}

///////////////add notes//////////////////////

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

// //////////create notes ////////////////////////
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

function createTodosNote(note) {
  let todosTxt = note.todos.split(',');
  let TodosTxtAndTime = todosTxt.map((todo) => {
    return { txt: todo, doneAt: Date.now(), done: false };
  });

  return {
    style: {
      backgroundColor: utilService.getRandomColor(),
    },
    id: utilService.makeId(),
    type: 'note-todos',
    info: { label: note.title, todos: TodosTxtAndTime },
  };
}

function createTxtNote(note) {
  const noteTxt = note.txt;
  return {
    style: {
      backgroundColor: utilService.getRandomColor(),
    },
    id: utilService.makeId(),
    type: 'note-txt',
    isPinned: false,
    info: { txt: noteTxt },
  };
}

function sendNoteToMail(note) {
  console.log(note);
}

//////////////////// storage/////////////////////
function _saveNotesToStorage(Notes) {
  storageService.saveToStorage(KEY, Notes);
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(KEY);
}
