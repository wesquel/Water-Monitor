#include <avr/wdt.h>
#include <avr/interrupt.h>
#include <avr/sleep.h>
#include <avr/power.h>

int previousADCSRA;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  start_sleeping();
  sleep_disable();
  wake_up();
  
  digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
  delay(1000);                      // wait for a second
  digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
}

void start_sleeping()
{
  MCUSR = 0; // clear reset flags
  WDTCSR |= bit (WDCE) | bit (WDE); // allow changes, disable reset, enable watchdog interrupt
  WDTCSR = bit (WDIE) | bit (WDP3) | bit (WDP0); // set interval
  wdt_reset(); // start watchdog timer
  set_sleep_mode (SLEEP_MODE_PWR_DOWN);
  sleep_enable();

  MCUCR = bit (BODS) | bit (BODSE); // turn off brown-out enable in software
  MCUCR = bit (BODS); 
    
  previousADCSRA = ADCSRA;    
  ADCSRA &= ~(1<<ADEN); //Disable ADC
  ACSR = (1<<ACD); //Disable the analog comparator
  DIDR0 = 0x3F; //Disable digital input buffers on all ADC0-ADC5 pins
  DIDR1 = (1<<AIN1D)|(1<<AIN0D); //Disable digital input buffer on AIN1/0

  power_twi_disable();
  power_spi_disable();
  power_usart0_disable(); //Needed for serial.print
  power_timer0_disable(); //Needed for delay and millis()
  power_timer1_disable();
  power_timer2_disable(); //Needed for asynchronous 32kHz operation

  sleep_cpu(); // power down
}

void wake_up()
{
  power_twi_enable();
  power_spi_enable();
  power_usart0_enable();
  power_timer0_enable();
  power_timer1_enable();
  power_timer2_enable();
  power_adc_enable();
  ADCSRA = previousADCSRA;
}

ISR (WDT_vect){
  wdt_disable();
}