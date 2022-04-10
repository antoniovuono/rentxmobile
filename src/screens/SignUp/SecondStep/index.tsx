import React from 'react';
import { useTheme } from 'styled-components';
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bullet } from '../../../components/Bullet';
import {
    Container,
    Header,
    BulletsWrapper,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';
import { BackButton } from '../../../components/BackButton';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

export function SecondStep() {
    const navigation = useNavigation();
    const theme = useTheme();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleGoBack} />
                        <BulletsWrapper>
                            <Bullet active />
                            <Bullet />
                        </BulletsWrapper>
                    </Header>

                    <Title>Crie sua{'\n'}conta</Title>
                    <SubTitle>
                        Faça seu cadastro de{'\n'}
                        forma rápida e fácil
                    </SubTitle>

                    <Form>
                        <FormTitle>1. Senha</FormTitle>
                        <PasswordInput iconName="lock" placeholder="Senha" />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Repetir senha"
                        />
                    </Form>

                    <Button title="Cadastrar" color={theme.colors.success} />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
