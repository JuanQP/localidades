import { useEffect, useRef, useState } from 'react'
import { ActionIcon, Button, Card, Center, Container, Grid, Group, Text, TextInput, Tooltip } from "@mantine/core";
import { IconArrowsShuffle, IconCheck, IconCopy, IconDownload } from '@tabler/icons';
import { pickRandom, randomBetween, setFieldValue } from './utils';
import { Canvas } from './Canvas';

const animales = [
  "Oso Hormiguero",
  "Yaguareté",
  "Venado",
  "Vicuña",
  "Yacaré",
  "Hornero",
  "Yarará",
  "Cóndor Andino",
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
  const [recentlyCopied, setRecentlyCopied] = useState(false);
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
  }

  function handleCopyImage() {
    const editedImage = document
      .getElementById('edited-image')
      .getElementsByTagName('img')[0]
      .cloneNode(true);
    let div = document.createElement('div');
    div.contentEditable = true;
    div.appendChild( editedImage );
    document.body.appendChild( div );
    div.focus();
    window.getSelection().selectAllChildren( div );
    document.execCommand('Copy');  // technically deprecated
    document.body.removeChild( div );

    setRecentlyCopied(true);
    setTimeout(() => {
      setRecentlyCopied(false);
    }, 3000);
  }

  return (
    <Center>
      <Container size="xs" py="md">
        <Grid>
          <Grid.Col xs={12}>
            <Canvas
              forwardedRef={canvasRef}
              animal={animal}
              adjetivo={adjetivo}
              kilometros={kilometros}
            />
          </Grid.Col>
          <Grid.Col xs={12}>
            <Card shadow="sm">
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
              <Group grow>
                <Button
                  color={recentlyCopied ? 'green' : 'blue'}
                  variant='light'
                  mt="md"
                  size='md'
                  leftIcon={recentlyCopied ? <IconCheck size={18}/> : <IconCopy size={18} />}
                  onClick={handleCopyImage}
                >
                  {recentlyCopied ? "Listo!" : "Copiar"}
                </Button>
                <Button
                  variant='light'
                  mt="md"
                  size='md'
                  leftIcon={<IconDownload size={18} />}
                  onClick={handleDownloadCanvas}
                >
                  Descargar
                </Button>
              </Group>
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
