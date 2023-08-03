import '../../../../../node_modules/react-vis/dist/style.css'
import { XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis';

const Chart = ({data}) =>
{

  return (
    <div className={{ marginTop: '15px' }}>
      <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries data={data} />
      </XYPlot>
    </div>
  );
}

export default Chart;
