import styled from "styled-components";

const HeaderContainer = styled.div`
  width: calc(100% - 32px);
  background-color: #191970;
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  elevation: 8px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <b>The Shoppies</b>
    </HeaderContainer>
  );
};

export default Header;
