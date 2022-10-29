import { Box, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { ReactComponent as CrossX } from '../../../assets/icons/outlined/cross-x.svg?svgr';
import { ReactComponent as DocFile } from '../../../assets/icons/outlined/doc-file.svg?svgr';
import { useAppDispatch } from '../../../store/hooks';
import { setDocuments } from '../../../store/vendor';

const DocDropZone = (props:any) => {
  const dispatch = useAppDispatch();

  const [myFiles, setMyFiles] = useState<any>([])

  const onDrop = useCallback(acceptedFiles => {
    setMyFiles([...myFiles, ...acceptedFiles])
    dispatch(setDocuments({id: props.id, files: [...myFiles, ...acceptedFiles]}));
  }, [myFiles])

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  const removeFile = (file:string) => () => {
    const newFiles = [...myFiles]
    newFiles.splice(newFiles.indexOf(file), 1)
    setMyFiles(newFiles);
    dispatch(setDocuments({id: props.id, files: newFiles}));
  }

  /*const removeAll = () => {
    setMyFiles([])
  }*/

  const files = myFiles.map((file: any) => (

      <Box
        key={file.name}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F6F6F6',
          borderRadius: '3.2rem',
          padding: '1.2rem 1.8rem',
          cursor: 'pointer',
          minWidth: 'fit-content',
          height: '4rem',
          '&:not(:last-child)': { marginRight: '1.4rem', marginBottom: '1.4rem' }
        }}
        onClick={removeFile(file)}
      >
        <DocFile />
        <Typography
          variant="h6"
          sx={{
            marginLeft: '.6rem',
            marginRight: '1.6rem',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '8rem',
            overflow: 'hidden'
          }}
        >
          {file.name}
        </Typography>
        <CrossX />
      </Box>

  ));

  return (
    <Box sx={{'&:not(:last-child)':{ marginBottom: '2.8rem' }}}>
      <Typography
        variant="h6"
        sx={{ marginBottom: '.8rem' }}
      >
        {props.title}
      </Typography>
      {myFiles.length > 0 ?
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
          {files}
        </Box>
        :
        <Box sx={{border: '2px dashed #DFDFDF', borderRadius: '4rem'}} {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} multiple={props.multiple || false} />
          <Typography variant="h6" sx={{color: '#EB4F5A', textAlign: 'center', padding: '1.2rem', lineHeight: '1.6rem'}}>Выберите файл или перетащите его сюда</Typography>
        </Box>
      }
    </Box>
  );
};

export default DocDropZone;