import hello from '../../assets/hello.png'
import './main.css';
import Chart from '../charts/charts'

import data from '../../assets/coleta.json'; 

const Main = () =>
{
  
  const chart1_data = [
    { x: data.length - 8, y: data[data.length - 9].temperatura},
    { x: data.length - 7, y: data[data.length - 8].temperatura},
    { x: data.length - 6, y: data[data.length - 7].temperatura},
    { x: data.length - 5, y: data[data.length - 6].temperatura},
    { x: data.length - 4, y: data[data.length - 5].temperatura},
    { x: data.length - 3, y: data[data.length - 4].temperatura},
    { x: data.length - 2, y: data[data.length - 3].temperatura},
    { x: data.length - 1, y: data[data.length - 2].temperatura},
  ];

  const chart2_data = [
    { x: data.length - 8, y: data[data.length - 9].condutividade},
    { x: data.length - 7, y: data[data.length - 8].condutividade},
    { x: data.length - 6, y: data[data.length - 7].condutividade},
    { x: data.length - 5, y: data[data.length - 6].condutividade},
    { x: data.length - 4, y: data[data.length - 5].condutividade},
    { x: data.length - 3, y: data[data.length - 4].condutividade},
    { x: data.length - 2, y: data[data.length - 3].condutividade},
    { x: data.length - 1, y: data[data.length - 2].condutividade},
  ];


  const chart3_data = [
    { x: data.length - 8, y: data[data.length - 9].turbidez},
    { x: data.length - 7, y: data[data.length - 8].turbidez},
    { x: data.length - 6, y: data[data.length - 7].turbidez},
    { x: data.length - 5, y: data[data.length - 6].turbidez},
    { x: data.length - 4, y: data[data.length - 5].turbidez},
    { x: data.length - 3, y: data[data.length - 4].turbidez},
    { x: data.length - 2, y: data[data.length - 3].turbidez},
    { x: data.length - 1, y: data[data.length - 2].turbidez},
  ];


  const chart4_data = [
    { x: data.length - 8, y: data[data.length - 9].PH},
    { x: data.length - 7, y: data[data.length - 8].PH},
    { x: data.length - 6, y: data[data.length - 7].PH},
    { x: data.length - 5, y: data[data.length - 6].PH},
    { x: data.length - 4, y: data[data.length - 5].PH},
    { x: data.length - 3, y: data[data.length - 4].PH},
    { x: data.length - 2, y: data[data.length - 3].PH},
    { x: data.length - 1, y: data[data.length - 2].PH},
  ];
  return (
    <main>
      <div className='main__container'>
        <div className='main__title'>
          <img src={hello} alt='hello'/>
          <div className='main__greating'>
            <h1>Dashboard Sensores </h1>
            <p>Bem vindo</p>
          </div>
        </div>

        <div className='main__cards'>
          <div className='card'>
            <i className='fa fa-temperature-three-quarters fa-2x text-red'></i>
            <div className='card_inner'>
              <p className='text-primary-p'>Temperatura</p> 
              <span className='font-bold text-title'>24.73</span>
            </div>
          </div>

          <div className='card'>
            <i className='fa fa-bolt fa-2x text-yellow'></i>
            <div className='card_inner'>
              <p className='text-primary-p'>Condutividade</p> 
              <span className='font-bold text-title'>208</span>
            </div>
          </div>

          <div className='card'>
            <i className='fa fa-droplet fa-2x text-lightblue'></i>
            <div className='card_inner'>
              <p className='text-primary-p'>Turbidez</p> 
              <span className='font-bold text-title'>0.08</span>
            </div>
          </div>

          <div className='card'>
            <i className='fa fa-biohazard fa-2x text-green'></i>
            <div className='card_inner'>
              <p className='text-primary-p'>PH</p> 
              <span className='font-bold text-title'>8.74</span>
            </div>
          </div>
        </div>

        <div className='charts'>
          <div className='charts__left'>
            <div className='charts__left__title'>
              <div>
                <h1>Histórico de Temperatura</h1>
                <p>Diário</p>
              </div>
            </div>
            <Chart data={chart1_data}/>
          </div>

          <div className='charts__right'>
            <div className='charts__right__title'>
              <div>
                <h1>Histórico de Condutividade</h1>
                <p>Diário</p>
              </div>
            </div>
            <Chart data={chart2_data}/>
          </div>
        </div>

        <div className='charts'>
          <div className='charts__left'>
            <div className='charts__left__title'>
              <div>
                <h1>Histórico de Turbidez</h1>
                <p>Diário</p>
              </div>
            </div>
            <Chart data={chart3_data}/>
          </div>

          <div className='charts__right'>
            <div className='charts__right__title'>
              <div>
                <h1>Histórico de PH</h1>
                <p>Diário</p>
              </div>
            </div>
            <Chart data={chart4_data}/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
