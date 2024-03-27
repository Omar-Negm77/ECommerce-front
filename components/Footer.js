import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledFooter = styled.header`
  background-color: #222;
  color: #fff;

  display: flex;
  margin-top: auto;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;

  &:hover {
    color: #fff;
  }
  align-items: center;
  justify-content: center;
`;

export default function Footer() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledFooter>
      <Center>
        <Wrapper>
          <NavLink href={"/"}>
            <h3> Copyright Ecommerce2024, Inc.</h3>
          </NavLink>
        </Wrapper>
      </Center>
    </StyledFooter>
  );
}
