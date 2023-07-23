import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import parse from 'autosuggest-highlight/parse'
import { throttle } from 'lodash'
import { useFormContext } from 'react-hook-form'

import { TextInputProps, useInput, useResourceContext, useTranslate } from 'react-admin'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab'
import { IconButton } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import { HttpRequest } from '../../../services'

interface PlacesTimelineInputProps extends TextInputProps {
  source: string
  useMainText?: boolean
  mapType?: string
  API_URL: string
  API_SEARCH_FIELD?: string
  API_MAP_TYPE?: string
}

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}
interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[]
}
interface PlaceType {
  description: string
  inputValue?: string
  structured_formatting?: StructuredFormatting
}

async function getPlacePredictions(
  API_URL: string,
  API_SEARCH_FIELD = 'search',
  API_MAP_TYPE = 'type',
  params: { search: string; mapType?: string },
  callback: (results?: readonly PlaceType[]) => void,
) {
  let url = `${API_URL}?${API_SEARCH_FIELD}=${params.search}`
  if (params.mapType) url += `&${API_MAP_TYPE}=${params.mapType}`
  const results = await HttpRequest.get(url)
  callback(results.data)
}

const filter = createFilterOptions<PlaceType>()

export function PlacesTimelineInput(props: PlacesTimelineInputProps) {
  const [values, setValues] = React.useState<PlaceType[]>([])
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<readonly PlaceType[]>([])
  const resource = useResourceContext()
  const translate = useTranslate()

  const { margin = 'dense', variant, fullWidth, API_URL, API_SEARCH_FIELD, API_MAP_TYPE } = props

  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
    isRequired,
    id,
  } = useInput({ source: props.source, validate: props.validate })

  const form = useFormContext()

  const fetch = React.useMemo(
    () =>
      throttle((input: string, callback: (results?: readonly PlaceType[]) => void) => {
        getPlacePredictions(
          API_URL,
          API_SEARCH_FIELD,
          API_MAP_TYPE,
          { search: input, mapType: props.mapType },
          callback,
        )
      }, 200),
    [],
  )

  useEffect(() => {
    if (field.value && Array.isArray(field.value) && field.value.length > 0) {
      const values: PlaceType[] = field.value.map((value) => ({ description: value } as PlaceType))
      setValues(values)
    }
  }, [])

  useEffect(() => {
    let active = true

    if (inputValue === '') {
      setOptions(values ? values : [])
      return undefined
    }

    fetch(inputValue, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = []
        if (values) {
          newOptions = values
        }
        if (results) {
          newOptions = [...newOptions, ...results]
        }
        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [values, inputValue, fetch])

  const removePlace = (placeIndex: number) => {
    const newValues = [...values]
    newValues.splice(placeIndex, 1)
    updateInputValue(newValues)
  }

  const updateInputValue = (values: PlaceType[]) => {
    const descriptionValues = values.map((value) => {
      return props.useMainText ? value?.structured_formatting?.main_text ?? value?.description : value?.description
    })
    form.setValue(props.source, descriptionValues, { shouldDirty: true })
    setValues(values)
  }

  const handleAutoCompleteOnChange = (_: any, newValues: (string | PlaceType)[]) => {
    const newValuePlaces: PlaceType[] = newValues.map((newValue) => {
      if (typeof newValue === 'string') return { description: newValue }
      if (newValue && newValue.inputValue) return { description: newValue.inputValue }
      return newValue
    })

    setOptions(newValuePlaces ? [...newValuePlaces, ...options] : options)
    updateInputValue(newValuePlaces)
  }

  const hasError = (isTouched || isSubmitted) && invalid

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          id={id}
          sx={{ minWidth: 300 }}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue
            }
            // Regular option
            return option.description
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params)

            const { inputValue } = params
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.description)
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                description: `${translate('ra.action.add')} "${inputValue}"`,
              })
            }

            return filtered
          }}
          options={options}
          autoComplete
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          freeSolo
          includeInputInList
          filterSelectedOptions
          multiple
          value={values}
          noOptionsText={translate(`resources.${resource}.fields.type_a_place`)}
          onChange={handleAutoCompleteOnChange}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              label={translate(`resources.${resource}.fields.add_location`)}
              fullWidth={fullWidth}
              variant={variant}
              margin={margin}
              required={isRequired}
              error={hasError}
              helperText={hasError ? translate(error?.message || '') : ''}
            />
          )}
          renderOption={(props, option) => {
            const matches = option?.structured_formatting?.main_text_matched_substrings || []
            const parts = option?.structured_formatting?.main_text
              ? parse(
                  option.structured_formatting.main_text,
                  matches.map((match: any) => [match.offset, match.offset + match.length]),
                )
              : []

            return (
              <li {...props}>
                <Grid container alignItems='center'>
                  <Grid item>
                    <Box component={LocationOnIcon} sx={{ color: 'text.secondary', mr: 2 }} />
                  </Grid>
                  <Grid item xs>
                    {parts.map((part: any, index: number) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                    <Typography variant='body2' color='text.secondary'>
                      {option?.structured_formatting?.secondary_text || option.description}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            )
          }}
          renderTags={() => null}
        />
      </Grid>
      <Grid item xs={12} md={8} lg={5}>
        <Timeline>
          {values?.map((value: PlaceType, index: number) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent sx={{ display: 'none' }}></TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                {index + 1 < values.length && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Grid container>
                  <Grid item xs={10}>
                    {value.description}
                  </Grid>
                  <Grid item>
                    <IconButton aria-label='delete' onClick={() => removePlace(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Grid>
    </Grid>
  )
}
