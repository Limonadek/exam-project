import { useState } from 'react';
import { Container, TextField, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useCreateApplicationMutation } from '../../__redux__/services/application';
import { useSelector } from 'react-redux';

export const CreateApplicationPage = () => {
    const [carRegistration, setCarRegistration] = useState('');
    const [violationDescription, setViolationDescription] = useState('');

    const [createApplication, {isLoading}] = useCreateApplicationMutation();
    const user = useSelector(state => state.userSlice)

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // Обработка данных формы

        createApplication({carNumber: carRegistration, description: violationDescription, userId: user.id}).then(() => {
          alert('Заявка отправлена')
          setCarRegistration('');
          setViolationDescription('');
        })
    };


    return (
        <div className='createPageRoot'>
            <Container maxWidth="sm">
                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Формирование заявления о нарушении</Typography>
                <Box
                    component="form"
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        fullWidth
                        label="Государственный регистрационный номер"
                        variant="outlined"
                        value={carRegistration}
                        onChange={e => setCarRegistration(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Описание нарушения"
                        variant="outlined"
                        value={violationDescription}
                        onChange={e => setViolationDescription(e.target.value)}
                        multiline
                        rows={4}
                        required
                        sx={{ mb: 2 }}
                    />
                    <LoadingButton 
                      loading={isLoading} 
                      disabled={carRegistration && violationDescription ? false : true} 
                      type="submit" 
                      variant="contained" 
                      color="primary"
                    >
                      Отправить заявление
                    </LoadingButton>
                </Box>
            </Container>
        </div>
    );
}