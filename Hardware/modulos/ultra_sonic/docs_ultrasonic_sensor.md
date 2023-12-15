# Sensor de Ultra Som HCSR04 

## O que é?

É um módulo que inclui um transmissor e receptor ultrasônico
e seu circuito de controle.  
O sensor mede a distância através do ultra som, ele consegue
medir de 2cm - 400cm, com uma precisão de até 3mm.

## Funcionamento

O módulo emite um ultrasom de 40KHz que após colidir com um 
obstáculo salta de volta ao módulo. Usando o tempo de viagem 
do som e sua velocidade, ele consegue calcular a distância 
entre o sensor e o obstáculo.

## Como Usar

De acordo com o datasheet o módulo segue os seguintes passos.

### Inicializar a Medição

Para inicializar a medição devemos manter o pino de `Trig` HIGH por pelo menos 10us.

### Envio do Sinal

O módulo irá enviar 8 sinais de ultra som de 40KHz. Se o sinal retornar, o módulo 
vai emitar uma saída HIGH com largura proporcional à distância do obstáculo.

### Calculo da Distância

A distancia pode ser calculada pela seguinte fórmula `range = high_level_time * velocity(340m/s)/2`.
Podemos usar também estas fórmulas: `high_level_time / 58` para distancia em cm ou 
`high_level_time / 148` para distancia em polegadas.  

Obs: velocity = 340m/s = 34000cm/s = 0.032cm/us

### Reiniciando a Medição

É recomendado esperar pelo menos 60 ms antes de iniciar uma nova leitura.
