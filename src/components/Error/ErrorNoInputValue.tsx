import styled from 'styled-components';

const ErrorNoInputValue = () => {
  return (
    <ErrorContainer>
      <ErrorMessage>모든 항목을 입력해주세요</ErrorMessage>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  width: 100%;
  height: 20px;
  margin-top: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default ErrorNoInputValue;
