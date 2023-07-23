import React from 'react'
import { Datagrid as RaDatagrid,DatagridProps } from 'react-admin'

export function Datagrid(props: DatagridProps) {
  const { children, bulkActionButtons, ...rest } = props

  return (
    <RaDatagrid bulkActionButtons={bulkActionButtons || false} {...rest}>
      {children}
    </RaDatagrid>
  )
}
