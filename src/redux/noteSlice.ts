import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { NoteType } from '../types/NoteType';

// 상태의 타입을 정의합니다.
interface NotesState {
    items: NoteType[];
    colors: string[];
    trash: NoteType[];
    archivedItems: NoteType[];
    activeColor: string;
    tags: string[];
    selectedTag?: string;
    filteredNotes: NoteType[];
}

// 모든 노트로부터 유니크한 태그들을 추출하는 함수입니다.
// 함수에 대한 반환 타입을 명시적으로 정의합니다.
const regenerateTags = (notes: NoteType[]): string[] => {
    const allTags = notes.flatMap((note) => note.tags || []);
    const uniqueTags = [...new Set(allTags)];
    return Array.from(uniqueTags);
};

// 초기 상태를 위한 타입을 정의합니다.
const initialState: NotesState = {
    items: [],
    trash: [],
    archivedItems: [],
    colors: ['#FFC2C2', '#FDF6D6', '#A1FFDE', '#B5C1FF', '#ffffff'],
    activeColor: '#FFC2C2',
    tags: [],
    filteredNotes: [], // 초기화
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // 액션 페이로드의 타입을 명시합니다.
        addNote: {
            reducer: (state, action: PayloadAction<NoteType>) => {
                state.items.push(action.payload);
            },
            prepare: (note: Omit<NoteType, 'id'>) => ({
                payload: { id: nanoid(), ...note },
            }),
        },
        addTag: (state, action: PayloadAction<string>) => {
            const tag = action.payload;
            if (!state.tags.includes(tag)) {
                state.tags.push(tag);
            }
        },
        selectTag: (state, action: PayloadAction<string>) => {
            state.selectedTag = action.payload;
            const allNotes = [...state.items, ...state.archivedItems];
            state.filteredNotes = allNotes.filter((note) => note.tags?.includes(action.payload));
        },
        togglePinNote: (state, action: PayloadAction<string>) => {
            const note = state.items.find((note) => note.id === action.payload);
            if (note) {
                note.isPinned = !note.isPinned;
            }
        },
        removeNote: (state, action: PayloadAction<string>) => {
            const index = state.items.findIndex((note) => note.id === action.payload);
            const archivedIndex = state.archivedItems.findIndex((note) => note.id === action.payload);

            if (index !== -1) {
                const [note] = state.items.splice(index, 1);
                state.trash = state.trash || []; // trash 배열이 정의되지 않았을 경우를 대비하여 기본값 설정
                state.trash.push(note);
            } else if (archivedIndex !== -1) {
                state.archivedItems.splice(archivedIndex, 1);
            }
            state.tags = regenerateTags(state.items);
        },
        //휴지통에서 노트 삭제할 경우 영구적으로 삭제
        emptyTrash: (state) => {
            state.trash = [];
        },
        deleteNoteInTrash: (state, action: PayloadAction<string>) => {
            const selectedNoteIndex = state.trash.findIndex((note) => note.id === action.payload);
            console.log('selectedNoteIndex:', selectedNoteIndex); // 인덱스 로그 확인
            if (selectedNoteIndex !== -1) {
                state.trash.splice(selectedNoteIndex, 1);
            } else {
                console.log('Note ID not found in trash:', action.payload); // 노트 ID 로그
            }
        },
        //휴지통에서 노트 다시 복원하기
        restoreFromTrash: (state, action: PayloadAction<string>) => {
            const index = state.trash.findIndex((note) => note.id === action.payload);
            if (index !== -1) {
                const [note] = state.trash.splice(index, 1);
                state.items.push(note);
            }
            state.tags = regenerateTags(state.items);
        },
        archiveNote: (state, action: PayloadAction<string>) => {
            const index = state.items.findIndex((note) => note.id === action.payload);
            const archivedIndex = state.archivedItems.findIndex((note) => note.id === action.payload);

            if (index !== -1) {
                const note = state.items[index];
                // 노트를 아카이브 상태로 전환
                note.isArchived = true;
                // archivedItems가 없으면 배열을 만들어줘야 한다.
                if (!state.archivedItems) {
                    state.archivedItems = [];
                }
                const [archivedNote] = state.items.splice(index, 1);
                state.archivedItems.push(archivedNote);
            } else if (archivedIndex !== -1) {
                const note = state.archivedItems[archivedIndex];
                // 노트의 아카이브 상태를 해제
                note.isArchived = false;
                state.items.push(...state.archivedItems.splice(archivedIndex, 1));
            }
            state.tags = regenerateTags([...state.items, ...state.archivedItems]);
        },
    },
});

// 생성된 액션 생성자 함수를 export합니다.
export const {
    addNote,
    addTag,
    removeNote,
    selectTag,
    archiveNote,
    togglePinNote,
    emptyTrash,
    deleteNoteInTrash,
    restoreFromTrash,
} = notesSlice.actions;

// 리듀서를 export합니다.
export default notesSlice.reducer;
