import styled from 'styled-components';
import { device } from 'styles/devices';
import { SaveButton } from 'common/Buttons';

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;

  background-color: white;
  padding: 20px;
  border-radius: 10px;

  > p {
    margin: 0px auto 0px 0px;
  }

  > div {
    width: 100%;
  }

  div {
    border-radius: 0;
  }

  @media ${device.desktop} {
    width: 50%;
  }
`;

export const FormModal = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;

  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;

  > p {
    margin: 5px auto 0px 0px;
    font-size: 16px;
    span {
      font-weight: 700;
    }
  }

  > div {
    width: 100%;
  }

  div {
    border-radius: 0;
  }

  @media ${device.desktop} {
    width: 50%;
  }
`;

export const CreateAccountButton = styled(SaveButton)`
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;
