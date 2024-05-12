// notetype.ts
export interface NoteType {
    id: string;
    title: string;
    content: string;
    tags: string[];
    color: string;
    createdTime: string;
    isPinned: boolean;
    isArchived: boolean;
}
