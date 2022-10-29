import React from 'react';
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {useDeleteFeedbackNoteMutation, useGetFeedbackNotesQuery} from "../../../../../api/feedback";
import {INote} from "../../../../../types/feedback";
import moment from "moment/moment";
import LikesDislikes from "../../../../common/LikesDislikes";
import ColoredAvatar from "../../../../common/ColoredAvatar";

interface INoteProps {
    note: INote;
}

const Note = ({note}: INoteProps) => {
    const [deleteNote] = useDeleteFeedbackNoteMutation();

    function handleDelete() {
        deleteNote(note.id);
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: 1}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <ColoredAvatar name={note.userName} picture={note.userPicturePath} size={44} sx={{mr: '1.6rem'}}/>
                <Typography variant='h5'>{note.userName}</Typography>
                <Typography sx={{
                    ml: 'auto',
                    color: 'secondary.dark',
                    fontSize: '1.2rem',
                    fontWeight: '500'
                }}>{moment(note.created).startOf('minute').fromNow()}</Typography>
            </Box>
            <Box sx={{ml: '6rem'}}>
                <Typography sx={{fontSize: '1.4rem', mb: 2}}>{note.note}</Typography>
                <Box sx={{display: 'flex'}}>
                    <Button color='secondary' variant='text' sx={{color: 'text.primary'}} >Изменить </Button>
                    <Button color='primary' variant='text' sx={{mr: 'auto'}} onClick={handleDelete}>Удалить</Button>
                    <LikesDislikes likeCount={note.likeCount} dislikeCount={note.dislikeCount} alignLeft/>
                </Box>
            </Box>
        </Box>
    )
}

interface INotes {
    id: string;
}

const Notes = ({id}: INotes) => {
    const {data: notes, isLoading: notesLoading} = useGetFeedbackNotesQuery(id);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            mt: 4,
            '& > div:not(:last-of-type)': {mb: 6}
        }}>
            {notesLoading ?
                <Box sx={{width: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem'}}>
                    <CircularProgress/>
                </Box> :
                notes?.data?.map(note => <Note key={note.id} note={note}/>)
            }
        </Box>
    );
};

export default Notes;