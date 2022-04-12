import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
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
import { Confirmation } from '../../Confirmation';

interface IUserParams {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    };
}

export function SecondStep() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation();
    const theme = useTheme();
    const route = useRoute();

    const { user } = route.params as IUserParams;

    function handleGoBack() {
        navigation.goBack();
    }

    function handleRegister() {
        if (!password || !passwordConfirm) {
            return Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Informe a senha e a confirmaçāo dela !',
            });
        }

        if (password !== passwordConfirm) {
            return Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'As senhas precisam ser iguais',
            });
        }

        // Enviar para API e cadastrar !

        navigation.navigate('Confirmation', {
            nextScreenRoute: 'SignIn',
            title: 'Conta criada!',
            message: `Agora é só fazer login\ne aproveitar`,
        });
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
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Repetir senha"
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>

                    <Button
                        title="Cadastrar"
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
