import { TableCell, TableRow } from '@material-ui/core';
import React from 'react'
import ResourceDelete from './ResourceDelete';


const Resources = (props) => {
  const {id, image, name, birthday, gender, job} = props;

  return (
    <TableRow>
      <TableCell align='center'>{id}</TableCell>
      <TableCell align='center'><img src={image} width={64} alt='profile'/></TableCell>
      <TableCell align='center'>{name}</TableCell>
      <TableCell align='center'>{birthday}</TableCell>
      <TableCell align='center'>{gender}</TableCell>
      <TableCell align='center'>{job}</TableCell>
      <TableCell align='center'><ResourceDelete id={id} /></TableCell>
    </TableRow>
  )
}

export default Resources