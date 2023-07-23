import React from 'react'

import { DatagridProps, SimpleList, SimpleListProps } from 'react-admin'
import { useScreenSize } from '../../hooks/style'

import { Datagrid } from '../Datagrid'

type ResponsiveDatagridProps = SimpleListProps & DatagridProps

export function ResponsiveDatagrid(props: ResponsiveDatagridProps) {
  const { isSmall } = useScreenSize()
  const { primaryText, secondaryText, tertiaryText, linkType, rowClick, children } = props

  return isSmall ? (
    <SimpleList
      primaryText={primaryText || (() => '')}
      secondaryText={secondaryText}
      tertiaryText={tertiaryText}
      linkType={linkType ?? 'show'}
    />
  ) : (
    <Datagrid rowClick={rowClick ?? 'show'}>{children}</Datagrid>
  )
}
