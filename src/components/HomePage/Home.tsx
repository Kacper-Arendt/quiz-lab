import React from 'react';
import {Button} from '../UI/Button';
import {LinkEl} from '../UI/Link';
import styled from 'styled-components';
import {useHistory} from 'react-router';
import {Wrapper} from '../UI/Wrapper';


const Element = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  width: 15rem;
  height: 15rem;
  background-color: rgba(0, 0, 0, 0.65);
  transition: all .3s;

  h1 {
    margin-bottom: .7rem;
    text-align: center;
    font-size: 2.4rem;
  }

  :active, :focus {
    border: .4rem solid orange;
  }
`

export const Home = () => {
    const history = useHistory();

    return (
        <Wrapper>
            <Element onClick={() => history.push('/game')}>
                <h1>Play</h1>
            </Element>

            <Element onClick={() => history.push('/login')}>
                <h1>Sing In</h1>
            </Element>
        </Wrapper>
    )
}