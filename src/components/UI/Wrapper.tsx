import React from 'react';
import styled from "styled-components";

export const Div = styled.div<IProps>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${(props: IProps) => props.margin && props.margin};
`

interface IProps {
    margin?: string
    children: JSX.Element | JSX.Element[]
}

export const Wrapper = (props: IProps) => {
    return (
        <Div margin={props.margin}>
            {props.children}
        </Div>
    )
}