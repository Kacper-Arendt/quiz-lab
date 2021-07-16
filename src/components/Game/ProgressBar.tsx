import React from 'react';
import styled from 'styled-components';


const Bar = styled.div`
  width: 85%;
  background: white;
  height: 1.5rem;
  border: orange .25rem solid;
`
const Progress = styled.div`
    width: 20%;
    background: red;
    height: 100%;
`

export const ProgressBar = () => {
    return (
        <>
            <Bar>
                <Progress/>
            </Bar>
        </>
    )
}