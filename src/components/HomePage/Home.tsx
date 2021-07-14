import React from 'react';
import {Button} from '../UI/Button';
import {LinkEl} from '../UI/Link';
import styled from 'styled-components';
import {useHistory} from 'react-router';
import {Wrapper} from '../UI/Wrapper';
import {device} from '../../models/MediaQueries';


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


@media${device.laptop} {
  margin: 15vh 5vw;
}
 @media${device.desktop} {
  max-width: 28rem;
  max-height: 28rem;
}

  h1 {
    margin-bottom: .7rem;
    text-align: center;
    font-size: 2.4rem;
  }

  :active, :focus {
    transform: scale(.95);
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
                <h1>Sign In</h1>
            </Element>
        </Wrapper>
    )
}