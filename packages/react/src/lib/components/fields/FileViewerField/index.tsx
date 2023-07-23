import React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
import {
  FileField,
  FileFieldProps,
  Labeled,
  useLocaleState,
  useRecordContext,
  useResourceContext,
  useTranslate,
} from 'react-admin'
import { Image } from 'mui-image'

interface FileViewerFieldProps extends FileFieldProps {
  typeSource?: string
  useLabel?: boolean
}

export function FileViewerField(props: FileViewerFieldProps) {
  const { source = '', typeSource, useLabel, ...rest } = props

  const record = useRecordContext()

  let mimeType
  if (record?.rawFile?.type) {
    mimeType = record.rawFile.type
  }
  if (!record?.[source]) return null

  if (typeSource) mimeType = record[typeSource]

  if (mimeType) return <FileViewer source={source} mimeType={mimeType} useLabel={useLabel} {...rest} />

  return <FileField source={source} target='_blank' {...rest} />
}

interface FileViewerProps extends FileFieldProps {
  mimeType: string
  useLabel?: boolean
}

function FileViewer(props: FileViewerProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const { source = '', title, mimeType, useLabel } = props
  const record = useRecordContext()
  const [locale] = useLocaleState()
  const translate = useTranslate()
  const resource = useResourceContext()

  if (!record?.[source]) return null

  const fileName = title ? record?.[title] : 'file'

  const button = <Button onClick={handleOpen}>{fileName}</Button>

  return (
    <>
      {useLabel ? <Labeled label={`resources.${resource}.fields.${source}`}>{button}</Labeled> : button}
      <Dialog open={open} fullWidth onClose={handleClose} maxWidth='xl'>
        <DialogTitle textAlign='center'>{fileName}</DialogTitle>
        <DialogContent>
          <Grid container justifyContent='center'>
            <Grid item xs={11}>
              {mimeType.includes('pdf') && (
                <iframe
                  src={`/pdfjs/web/viewer.html?file=${record[source]}#locale=${locale}`}
                  style={{
                    width: '100%',
                    height: '75vh',
                  }}
                ></iframe>
              )}
              {mimeType.includes('image') && <Image src={record[source]} />}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>
            {translate('ra.action.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
