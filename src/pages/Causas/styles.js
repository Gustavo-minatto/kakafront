import styled from "styled-components";

export const Container = styled.div`
  padding: 10px;
  header{
    padding: 10px;
    margin-top: 10px;
    h1{
      text-align: center;
    }
    button{
      background: none;
      color: ${({ theme }) => theme.COLORS.GOLDEN};
      display: flex;
      align-items: center;
      font-size: 18px;
    }
  }

  form{
    display:flex;
    flex-direction: column;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  margin: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: ${({ theme }) => theme.COLORS.GRAY};
    color: ${({ theme }) => theme.COLORS.WHITE};
    th {
      background-color: ${({ theme }) => theme.COLORS.GOLDEN};
    }

    th, td {
      padding: 5px;
      text-align: center;
      border: 1px solid #ddd;
    }

    button{
      padding: 5px;
      margin-right: 10px;
      color: black;
      background: none;
      &:last-child{
        color: red;
      }
    }


    @media (max-width: 768px) {
      td:nth-child(2),
      td:nth-child(3), 
      td:nth-child(4),
      td:nth-child(5),   
      td:nth-child(6),  
      td:nth-child(7),  
      td:nth-child(8),  
      th:nth-child(2),
      th:nth-child(3),
      th:nth-child(4),
      th:nth-child(5),
      th:nth-child(6),
      th:nth-child(7),
      th:nth-child(8) {
        display: none;
      }

    }
  }
`;