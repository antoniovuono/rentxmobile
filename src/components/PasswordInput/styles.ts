import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface ContainerProps {
    isFocused: boolean;
}

export const Container = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
`;

export const IconContainer = styled.View<ContainerProps>`
    width: 55px;
    height: 56px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    margin-right: 2px;

    ${({ isFocused, theme }) =>
        isFocused &&
        css`
            border-bottom-width: 2px;
            border-bottom-color: ${theme.colors.main};
        `}
`;

export const InputText = styled(TextInput)<ContainerProps>`
    background-color: ${({ theme }) => theme.colors.background_secondary};
    flex: 1;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    padding: 0 23px;

    ${({ isFocused, theme }) =>
        isFocused &&
        css`
            border-bottom-width: 2px;
            border-bottom-color: ${theme.colors.main};
        `}
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`
    width: 55px;
    height: 56px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    margin-right: 2px;
`;
