import styled from "styled-components";

 const P = styled.p`
    color: red;
    margin: .8rem 0;
    text-align: center;
    line-height: 140%;
`

export const Error = (props: { value: string | null}) => {
    return (
        <P>{props.value}</P>
    )
}