import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import parse from 'autosuggest-highlight/parse'
import { throttle } from 'lodash'

import { TextInputProps, useInput, useResourceContext, useTranslate } from 'react-admin'
import { HttpRequest } from '../../../services'
import { useFormContext } from 'react-hook-form'

interface MapsInputProps extends TextInputProps {
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
  inputValue?: string
  description: string
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

export function MapsInput(props: MapsInputProps) {
  const [value, setValue] = React.useState<PlaceType | null>(null)
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
    if (field.value) {
      const value = { description: field.value } as PlaceType
      setValue(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let active = true

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch(inputValue, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = []
        if (value) {
          newOptions = [value]
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
  }, [value, inputValue, fetch])

  const updateInputValue = (value: PlaceType | null) => {
    const valueToUse = props.useMainText
      ? value?.structured_formatting?.main_text ?? value?.description
      : value?.description

    if (value) {
      form.setValue(props.source, valueToUse, { shouldDirty: true })
    }

    const inputValue = valueToUse ? ({ description: valueToUse } as PlaceType) : null
    setValue(inputValue)
  }

  const handleAutoCompleteOnChange = (_: any, newValue: string | PlaceType | null) => {
    let newValuePlace: PlaceType | null
    if (typeof newValue === 'string') newValuePlace = { description: newValue }
    else if (newValue && newValue.inputValue) newValuePlace = { description: newValue.inputValue }
    else newValuePlace = newValue

    setOptions(newValuePlace ? [newValuePlace, ...options] : options)
    updateInputValue(newValuePlace)
  }

  const hasError = (isTouched || isSubmitted) && invalid

  const label = props.label != undefined ? props.label : translate(`resources.${resource}.fields.${props.source}`)

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
          value={value}
          noOptionsText={label}
          onChange={handleAutoCompleteOnChange}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              label={label}
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
                  matches?.map((match: any) => [match.offset, match.offset + match?.length]),
                )
              : []
            return (
              <li {...props}>
                <Grid container alignItems='center'>
                  <Grid item>
                    <Box component={LocationOnIcon} sx={{ color: 'text.secondary', mr: 2 }} />
                  </Grid>
                  <Grid item xs>
                    {parts?.map((part: any, index: number) => (
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
        />
      </Grid>
    </Grid>
  )
}
