import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from "@expo/vector-icons";
import { TextInputProps } from 'react-native';

import {
 Container,
 InputText,
 IconContainer,
 ChangePasswordVisibilityButton
} from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps){
const [isPasswordVisible, setIsPasswordVisible ] = useState(true);
const [isFocused, setIsFocused] = useState(false);
const [isFilled, setIsFilled] = useState(false);

function handlePasswordVisibility() {
    setIsPasswordVisible(prevState => !isPasswordVisible);
}

function handleInputFocus() {
    setIsFocused(true);
}

function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
}

const theme = useTheme();
return (
  <Container> 
      <IconContainer isFocused={isFocused}>
            <Feather 
                name={iconName}
                size={24}
                color={(isFocused || isFilled) ? theme.colors.main: theme.colors.text_detail}
            
            />
      </IconContainer>
      <InputText 
          secureTextEntry={isPasswordVisible} 
          {...rest} onFocus={handleInputFocus} 
          onBlur={handleInputBlur} 
          isFocused={isFocused}
     />

      <ChangePasswordVisibilityButton 
            activeOpacity={0.7} 
            onPress={handlePasswordVisibility}  
          >
      <Feather 
                name={isPasswordVisible ? 'eye' : 'eye-off'}
                size={24}
                color={theme.colors.text_detail}
      />
      </ChangePasswordVisibilityButton>
  </Container>
  );
}