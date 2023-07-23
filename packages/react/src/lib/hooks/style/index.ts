import { useMediaQuery, Theme } from '@mui/material'

export function useScreenSize() {
  const isXSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  return {
    isXSmall,
    isSmall,
  }
}
