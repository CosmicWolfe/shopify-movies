import styled from 'styled-components';
import './Header.css';


const HeaderContainer = styled.div`
    width: 100%;
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
            The Shoppies
        </HeaderContainer>
    );
};

export default Header;