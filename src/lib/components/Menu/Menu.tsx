import { useRef } from "react";
import { useUser } from "~/lib/context/middlecat";
import Popup from "~/lib/components/Common/components/Popup";
import styled from "styled-components";
import { useRouter } from "next/router";
import MenuButtonGroup from "~/lib/components/Annotator/components/MenuButtonGroup";
import { DarkModeButton } from "~/lib/components/Common/components/Theme";
import { FaArrowLeft, FaUser } from "react-icons/fa";

interface MenuProps {
  children: React.ReactNode;
  back?: boolean;
}

const Menu = ({ children, back }: MenuProps) => {
  const userButtonRef = useRef<HTMLDivElement>(null);
  const { user, AuthForm } = useUser();
  const router = useRouter();

  return (
    <>
      <MenuBar>
        {back && (
          <div className="Back" onClick={() => router.back()}>
            <FaArrowLeft />
          </div>
        )}
        {children}

        <div className="RightSide">
          <MenuButtonGroup>
            <DarkModeButton />
            <div ref={userButtonRef}>
              <FaUser />
            </div>
          </MenuButtonGroup>
        </div>
      </MenuBar>
      <Popup triggerRef={userButtonRef}>
        <PopupContent>
          <AuthForm />
        </PopupContent>
      </Popup>
    </>
  );
};

export const MenuLink = (props: {
  label: string;
  route: string;
  active?: boolean;
}) => {
  const router = useRouter();

  return (
    <li
      key={"menulink " + props.label}
      className={props.active ? "active" : ""}
      onClick={(e) => {
        console.log(props.route);
        e.preventDefault();
        e.stopPropagation();
        router.push(props.route);
      }}
    >
      {props.label}
    </li>
  );
};

const MenuBar = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 3px 10px 0px 10px;
  gap: 1rem;
  font-size: 1.6rem;
  color: var(--text);

  .RightSide {
    padding-top: 5px;
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
  }

  li {
    cursor: pointer;
    padding: 1.5rem 0.5rem 0.5rem 0.5rem;

    &.active {
      border-bottom: 2px solid var(--primary);
    }
  }
  .Back {
    font-size: 2rem;
    color: var(--primary-text);
    cursor: pointer;
  }
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  font-size: 1.5rem;
  svg {
    margin-right: 1rem;
  }
  .authform {
    margin: auto;
    display: flex;
    justify-content: center;
  }
`;

export default Menu;
