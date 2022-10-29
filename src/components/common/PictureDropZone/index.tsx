import { Box, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as CrossX } from '../../../assets/icons/outlined/cross-x.svg?svgr';
import { ReactComponent as AddPlus } from '../../../assets/icons/outlined/add-plus.svg?svgr';
import { setMediaFile } from '../../../store/product';
import { useAppDispatch } from '../../../store/hooks';

const DropZoneLabel = ({ firstTitle }: { firstTitle: string }) => {
  return (
    <Box sx={{
      backgroundColor: '#EB4F5A',
      width: 'fit-content',
      color: 'white',
      fontSize: 10,
      padding: '3px 6px',
      borderRadius: '1.2rem',
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 1
    }}
    >
      {firstTitle}
    </Box>
  );
};

interface IPictureDropZone {
  firstTitle: string,
  multiple?: boolean,
}

const PictureDropZone = (props: IPictureDropZone) => {
  const dispatch = useAppDispatch();
  const [myFiles, setMyFiles] = useState<File[]>([]);

  const onDrop = useCallback(acceptedFiles => {
    setMyFiles(acceptedFiles.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    setMyFiles([...myFiles, ...acceptedFiles]);
    dispatch(setMediaFile([...myFiles, ...acceptedFiles]));
  }, [myFiles]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeFile = (file: File) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const files = myFiles.map((file: any) => (
    <Box
      key={file.name}
      sx={{
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: '.8rem',
        width: 80,
        height: 80,
        position: 'relative',
        backgroundImage: `url(${file.preview})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden'
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          margin: '4px',
          padding: '3px',
          backgroundColor: '#1A202C',
          opacity: 0.7,
          '&:hover': { backgroundColor: '#EB4F5A' }
        }}
        onClick={removeFile(file)}
      >
        <CrossX style={{ color: 'white' }} />
      </IconButton>
    </Box>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Box sx={{ '&:not(:last-child)': { marginBottom: '2.8rem' } }}>
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'row', '& > div:not(:first-of-type)': { ml: 2 } }}>

        {myFiles.length > 0 &&
        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'row', '& > div:not(:first-of-type)': { ml: 2 } }}>
          {files}
          <DropZoneLabel firstTitle={props.firstTitle} />
        </Box>
        }
        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: '.8rem',
            width: 80,
            height: 80,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          {...getRootProps({ className: 'dropzone' })}
        >
          <input
            {...getInputProps()}
            multiple={props.multiple}
          />
          <AddPlus style={{ color: '#DFDFDF' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default PictureDropZone;