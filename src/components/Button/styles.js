import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border-radius: 0%;
    background-color: ${({ theme }) => theme.COLORS.GREEN};
    color: ${({ theme }) => theme.COLORS.WHITE};
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease, filter 0.3s ease;

    &:hover{
        background-color: #1A9F63;
        filter: brightness(0.9);
    }
`;