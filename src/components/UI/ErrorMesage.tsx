import styled from "styled-components";

 const P = styled.p`
    margin: 0 .2rem .2rem;
    text-align: center;
    line-height: 120%;
`

export const Error = (props: { value: string | null}) => {
    return (
        <P>{props.value}</P>
    )
}