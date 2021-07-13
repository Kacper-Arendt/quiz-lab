import React from 'react';
import styled from "styled-components";

export const Div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface IProps {
    children: JSX.Element|JSX.Element[]
}

export const Wrapper = (props: IProps) => {
    return (
        <Div>
            {props.children}
        </Div>
    )
}