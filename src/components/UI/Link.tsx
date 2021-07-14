import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
    to: string,
    value: string
}

const StyledLink = styled(Link)`
  margin-top: 1rem;
  padding: 0.3rem;
  font-size: 1.3rem;
  color: white;
  text-decoration: none;
  transition: all .4s;
  
  :hover{
    transform: scaleX(1.1);
    color: #888;
  }
`

export const LinkEl = (props: IProps) => {
    return (
        <StyledLink to={props.to}>{props.value}</StyledLink>
    )
}