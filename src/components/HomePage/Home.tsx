import React from 'react';
import styled, {keyframes} from 'styled-components';
import {useHistory} from 'react-router';

import {Wrapper} from '../UI/UIComponents';
import {device} from '../../models/Models';

export const MoveFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-15rem);
    -webkit-filter: blur(0px);
  }
  50% {
    -webkit-filter: blur(2px);
  }
  80% {
    transform: translateX(1rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    -webkit-filter: blur(0px);
  }
`
const Element = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  width: 50vw;
  height: 50vw;
  max-width: 25rem;
  max-height: 25rem;
  background-color: rgba(0, 0, 0, 0.65);
  transition: all .2s;
  animation-name: ${MoveFromLeft};
  animation-duration: 1s;

  :last-child {
    animation-duration: 1.3s;
  }


  h1 {
    margin-bottom: .7rem;
    text-align: center;
    font-size: 2.4rem;
  }

  :hover {
    transform: scale(1.05);
    -webkit-box-shadow: 0px 0px 10px 0px #000;
    box-shadow: 0px 0px 10px 0px #000;
  }

  :active, :focus {
    transform: scale(.98);
    border: .4rem solid orange;
  }

@media${device.laptop} {
  margin: 15vh 5vw;
}
`


export const Home = () => {
    const history = useHistory();

    return (
        <Wrapper>

            <Element onClick={() => history.push('/game')}>
                <h1>Play</h1>
            </Element>

            <Element onClick={() => history.push('/user')}>
                <h1>Profile</h1>
            </Element>
        </Wrapper>
    )
}