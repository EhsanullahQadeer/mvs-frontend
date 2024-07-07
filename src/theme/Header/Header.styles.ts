/*************************************************************************
 * @file Header.styles.ts
 * @author End Quote
 * @desc Styled components for the header section.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import styled from 'styled-components';

export const Topbar = styled.div`
  width: 100%;
  padding: 12px 0;
  background-color: #141414;
  display: flex;
  justify-content: space-between;
`;

export const SearchContainer = styled.div`
  margin-left: 19px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 400px;
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  inset-y: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding-left: 12px;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  background-color: #0f0f0f;
  font-family: 'Mona-Sans-M', sans-serif;
  border: 1px solid #191919;
  color: #4c4c4c;
  font-size: 14px;
  border-radius: 100px;
  width: 400px;
  height: 45px;
  padding-left: 40px; /* Adjust padding for icon */
  padding-top: 2.5px;
  padding-bottom: 2.5px;
`;

export const NotificationButton = styled.button`
  position: relative;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuWrapper = styled.div`
  position: relative;
`;

export const MenuItemsWrapper = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  width: 230px;
  background-color: #111;
  border: 1px solid #545454;
  border-radius: 8px;
  padding: 10px;
`;

export const MenuItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#0014CD' : 'transparent')};
  &:hover {
    background-color: #0014cd;
  }
`;

export const MenuItemText = styled.p`
  color: #bbbbbb;
  font-family: 'Mona-Sans-M', sans-serif;
  font-size: 14px;
  padding-left: 8px;
`;
