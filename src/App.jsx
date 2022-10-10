import { useEffect, useRef, useState } from 'react'
import { ActionIcon, Button, Card, Center, Container, Grid, Text, TextInput, Tooltip } from "@mantine/core";
import { IconArrowsShuffle, IconCheck, IconDownload } from '@tabler/icons';
import { pickRandom, randomBetween, setFieldValue } from './utils';
import { Canvas } from './Canvas';
import useFontFaceObserver from 'use-font-face-observer';

const animales = [
  "Oso",
  "Yaguareté",
  "Venado",
  "Yacaré",
  "Hornero",
  "Yarará",
  "Cóndor",
  "Armadillo",
  "Escuerzo",
  "Carpincho",
  "Aguará Guazú",
  "Guanaco",
  "Huemul",
  "Mono Carayá",
  "Tucán",
  "Tero",
  "Chancho",
  "Centauro",
];

const adjetivos = [
  "Atrevido",
  "Reventado",
  "Aplastado",
  "Chocado",
  "Metiche",
  "Bocón",
  "Distraído",
  "Faenado",
  "Baleado",
  "Ladrón",
  "Flojo",
  "Alopécico",
];

function App() {

  const [animal, setAnimal] = useState('');
  const [adjetivo, setAdjetivo] = useState('');
  const [kilometros, setKilometros] = useState('100');
  const [recentlyDownloaded, setRecentlyDownloaded] = useState(false);
  const isFontLoaded = useFontFaceObserver([{
    family: 'Roadgeek 2000 Series C',
  }]);
  const canvasRef = useRef(null);

  useEffect(() => {
    setRandom();
  }, []);

  function handleRandomPickClick() {
    setRandom();
  }

  function randomizeAnimal() {
    setAnimal(pickRandom(animales));
  }

  function randomizeAdjetivo() {
    setAdjetivo(pickRandom(adjetivos));
  }

  function randomizeKilometros() {
    setKilometros(randomBetween(10, 300));
  }

  function setRandom() {
    randomizeAnimal();
    randomizeAdjetivo();
    randomizeKilometros();
  }

  function handleDownloadCanvas() {
    const url = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `Cartel_${animal}-${adjetivo}.png`;
    link.href = url;
    link.click();

    setRecentlyDownloaded(true);
    setTimeout(() => {
      setRecentlyDownloaded(false);
    }, 3000);
  }

  return (
    <Center>
      <Container size="xs" py="md">
        <Grid>
          <Grid.Col xs={12}>
            <Card shadow="sm" radius="md">
              <Card.Section>
                <Canvas
                  forwardedRef={canvasRef}
                  animal={animal}
                  adjetivo={adjetivo}
                  kilometros={kilometros}
                  canUpdate={isFontLoaded}
                />
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col xs={12}>
            <Card shadow="sm" radius="md">
              <Text weight={700}>Generador de Localidades Ficticias 📍🇦🇷</Text>
              <Text color="dimmed">
                Elegí uno al azar o armalo vos mismo! 👌
              </Text>
              <TextInput
                label="Animal"
                placeholder="Carpincho"
                withAsterisk
                value={animal}
                maxLength={15}
                onChange={setFieldValue(setAnimal)}
                rightSection={(
                  <Tooltip label="Elegir al azar">
                    <ActionIcon onClick={randomizeAnimal}>
                      <IconArrowsShuffle size={18} />
                    </ActionIcon>
                  </Tooltip>
                )}
              />
              <TextInput
                label="Adjetivo"
                placeholder="Extraviado"
                withAsterisk
                value={adjetivo}
                maxLength={15}
                onChange={setFieldValue(setAdjetivo)}
                rightSection={(
                  <Tooltip label="Elegir al azar">
                    <ActionIcon onClick={randomizeAdjetivo}>
                      <IconArrowsShuffle size={18} />
                    </ActionIcon>
                  </Tooltip>
                )}
              />
              <TextInput
                maxLength={3}
                inputMode="numeric"
                label="Kilómetros"
                placeholder="120"
                withAsterisk
                value={kilometros}
                onChange={setFieldValue(setKilometros)}
                rightSection={(
                  <Tooltip label="Elegir al azar">
                    <ActionIcon onClick={randomizeKilometros}>
                      <IconArrowsShuffle size={18} />
                    </ActionIcon>
                  </Tooltip>
                )}
              />
              <Button
                fullWidth
                color={recentlyDownloaded ? 'green' : 'blue'}
                variant='light'
                mt="md"
                size='md'
                leftIcon={recentlyDownloaded ? <IconCheck size={18}/> : <IconDownload size={18} />}
                onClick={handleDownloadCanvas}
                >
                {recentlyDownloaded ? "Listo!" : "Descargar"}
              </Button>
              <Button
                fullWidth
                variant='gradient'
                mt="md"
                size='md'
                leftIcon={<IconArrowsShuffle size={18} />}
                gradient={{from: 'teal', to: 'blue'}}
                onClick={handleRandomPickClick}
              >
                Elegir al azar
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Center>
  )
}

export default App
