import React from 'react';
import styled from 'styled-components';

interface Iprops {
    currentQuestion: number,
}

const Bar = styled.div`
  width: 100%;
  background: white;
  height: 1rem;
  border-radius: 20rem;
  margin: 0 0 1.5rem;

`
const Progress = styled.div <Iprops>`
  width: ${(props: Iprops) => props.currentQuestion && props.currentQuestion + '%'};
  background: #84BF04;
  height: 100%;
  border-radius: 20rem;


`

export const ProgressBar = (props: Iprops) => {
    const progress = props.currentQuestion / 5 * 100;

    return (
        <>
            <Bar>
                <Progress currentQuestion={progress} />
            </Bar>
        </>
    )
}