import { TableCell, TableRow } from '@material-ui/core';
import React from 'react'


const Resources = (props) => {
  const {id, image, name, birthday, gender, job} = props;

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell><img src={image} alt='profile'/></TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{birthday}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{job}</TableCell>
    </TableRow>
  )
}

export default Resources