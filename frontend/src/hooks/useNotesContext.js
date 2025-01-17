import { NotesContext } from "../context/NoteContext";
import { useContext } from "react";

export const useNotesContext = () => {
    const context = useContext(NotesContext);

    if (!context) {
        throw new Error("useNotesContext must be used within a NotesContextProvider");
    }
    
    return context;
};