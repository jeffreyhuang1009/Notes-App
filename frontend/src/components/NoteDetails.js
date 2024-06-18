import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useThemeContext } from "../hooks/useThemeContext";

// date fns
import { format } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

const NoteDetails = ({ note }) => {
    const { dispatch } = useNotesContext();
    const { user } = useAuthContext();
    const { theme } = useThemeContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }
        const response = await fetch('/api/notes/' + note._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_NOTE', payload: json });
        }
    };

    return (
        <div className="note-details" data-theme={theme}>
            <h4>{note.title}</h4>
            <p><strong>Body: </strong>{note.body}</p>
            <p className="time">{formattedDate}, {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
};

export default NoteDetails;

